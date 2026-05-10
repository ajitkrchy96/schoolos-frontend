import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { studentService } from './studentService'
import type { CreateStudentRequest, StudentListResponse, UpdateStudentRequest } from '../../types/student'

const STUDENT_QUERY_KEY = ['students'] as const

export const studentQueryKeys = {
  lists: (page: number, search: string) => [...STUDENT_QUERY_KEY, 'list', page, search] as const,
  detail: (studentId: string) => [...STUDENT_QUERY_KEY, 'detail', studentId] as const,
}

export function useStudentsQuery(page: number, pageSize: number, search: string) {
  return useQuery<StudentListResponse, Error, StudentListResponse, ReturnType<typeof studentQueryKeys.lists>>({
    queryKey: studentQueryKeys.lists(page, search),
    queryFn: () => studentService.fetchStudents({ page, pageSize, search: search.trim() }),
    staleTime: 1000 * 60 * 2,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useCreateStudentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateStudentRequest) => studentService.createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEY })
    },
  })
}

export function useUpdateStudentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ studentId, payload }: { studentId: string; payload: UpdateStudentRequest }) =>
      studentService.updateStudent(studentId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.detail(variables.studentId) })
    },
  })
}

export function useDeleteStudentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (studentId: string) => studentService.deleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEY })
    },
  })
}
