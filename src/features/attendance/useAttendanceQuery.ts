import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { attendanceService } from './attendanceService'
import type {
  AttendanceRecord,
  AttendanceSummary,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '../../types/attendance'

const ATTENDANCE_QUERY_KEY = ['attendance'] as const

export const attendanceQueryKeys = {
  summary: (date: string) => [...ATTENDANCE_QUERY_KEY, 'summary', date] as const,
  byDate: (date: string) => [...ATTENDANCE_QUERY_KEY, 'by-date', date] as const,
}

export function useAttendanceSummaryQuery(date: string) {
  return useQuery<AttendanceSummary, Error>({
    queryKey: attendanceQueryKeys.summary(date),
    queryFn: () => attendanceService.fetchAttendanceSummary(date),
    enabled: Boolean(date),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
}

export function useAttendanceByDateQuery(date: string) {
  return useQuery<AttendanceRecord[], Error>({
    queryKey: attendanceQueryKeys.byDate(date),
    queryFn: () => attendanceService.fetchAttendanceByDate(date),
    enabled: Boolean(date),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  })
}

export function useCreateAttendanceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateAttendanceRequest) => attendanceService.createAttendance(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.summary(variables.date) })
      queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.byDate(variables.date) })
    },
  })
}

export function useUpdateAttendanceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ attendanceId, payload }: { attendanceId: number; payload: UpdateAttendanceRequest }) =>
      attendanceService.updateAttendance(attendanceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY })
    },
  })
}
