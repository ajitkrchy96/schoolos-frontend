import { useQuery } from '@tanstack/react-query'
import { masterService } from '../../services/masterService'
import type { Section } from '../../types/master'

import { masterQueryKeys } from './useClassesQuery'

export function useSectionsQuery() {
  return useQuery<Section[], Error>({
    queryKey: masterQueryKeys.sections,
    queryFn: masterService.fetchSections,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  })
}