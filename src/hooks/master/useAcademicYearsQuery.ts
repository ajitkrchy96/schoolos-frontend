import { useQuery } from '@tanstack/react-query'
import { masterService } from '../../services/masterService'
import type { AcademicYear } from '../../types/master'

import { masterQueryKeys } from './useClassesQuery'

export function useAcademicYearsQuery() {
  return useQuery<AcademicYear[], Error>({
    queryKey: masterQueryKeys.academicYears,
    queryFn: masterService.fetchAcademicYears,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  })
}