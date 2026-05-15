import { useQuery } from '@tanstack/react-query'
import { studentStatusService } from '../../services/studentStatusService'
import type { Student } from '../../types/student'

const STUDENT_STATUS_QUERY_KEY = ['student-status'] as const

export const studentStatusQueryKeys = {
  active: (page: number) => [...STUDENT_STATUS_QUERY_KEY, 'active', page] as const,
  inactive: (page: number) => [...STUDENT_STATUS_QUERY_KEY, 'inactive', page] as const,
}

export function useActiveStudentsQuery(page: number, pageSize: number = 10) {
  return useQuery<{ content: Student[]; totalElements: number }, Error>({
    queryKey: studentStatusQueryKeys.active(page),
    queryFn: () => studentStatusService.fetchActiveStudents(page, pageSize),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
}

export function useInactiveStudentsQuery(page: number, pageSize: number = 10) {
  return useQuery<{ content: Student[]; totalElements: number }, Error>({
    queryKey: studentStatusQueryKeys.inactive(page),
    queryFn: () => studentStatusService.fetchInactiveStudents(page, pageSize),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
}
