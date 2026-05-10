import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { attendanceService } from './attendanceService'
import type { AttendanceRecord, AttendanceSummary, MarkAttendanceRequest } from '../../types/attendance'

const ATTENDANCE_QUERY_KEY = ['attendance'] as const

export const attendanceQueryKeys = {
  summary: (date: string) => [...ATTENDANCE_QUERY_KEY, 'summary', date] as const,
  byDate: (date: string) => [...ATTENDANCE_QUERY_KEY, 'by-date', date] as const,
  student: (studentId: string) => [...ATTENDANCE_QUERY_KEY, 'student', studentId] as const,
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
  return useQuery<{ records: AttendanceRecord[] }, Error>({
    queryKey: attendanceQueryKeys.byDate(date),
    queryFn: () => attendanceService.fetchAttendanceByDate(date),
    enabled: Boolean(date),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  })
}

export function useMarkAttendanceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MarkAttendanceRequest) => attendanceService.markAttendance(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.summary(variables.date) })
      queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.byDate(variables.date) })
    },
  })
}
