import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentStatusService } from '../../services/studentStatusService'

export function useUpdateStudentStatusMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ studentId, status }: { studentId: string; status: 'ACTIVE' | 'INACTIVE' }) =>
      studentStatusService.updateStudentStatus(studentId, { status }),
    onSuccess: () => {
      // Invalidate all student status queries to refetch both active and inactive lists
      queryClient.invalidateQueries({ queryKey: ['student-status'] })
    },
  })
}
