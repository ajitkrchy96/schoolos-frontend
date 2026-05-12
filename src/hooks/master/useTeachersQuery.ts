import { useQuery } from '@tanstack/react-query'
import { masterService } from '../../services/masterService'
import type { Teacher } from '../../types/master'

import { masterQueryKeys } from './useClassesQuery'

export function useTeachersQuery() {
  return useQuery<Teacher[], Error>({
    queryKey: masterQueryKeys.teachers,
    queryFn: masterService.fetchTeachers,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  })
}