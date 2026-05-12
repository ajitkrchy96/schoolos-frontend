import { useQuery } from '@tanstack/react-query'
import { masterService } from '../../services/masterService'
import type { Subject } from '../../types/master'

import { masterQueryKeys } from './useClassesQuery'

export function useSubjectsQuery() {
  return useQuery<Subject[], Error>({
    queryKey: masterQueryKeys.subjects,
    queryFn: masterService.fetchSubjects,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  })
}