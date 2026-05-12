import { useQuery } from '@tanstack/react-query'
import { masterService } from '../../services/masterService'
import type { Class } from '../../types/master'

const MASTER_QUERY_KEY = ['master'] as const

export const masterQueryKeys = {
  classes: [...MASTER_QUERY_KEY, 'classes'] as const,
  sections: [...MASTER_QUERY_KEY, 'sections'] as const,
  subjects: [...MASTER_QUERY_KEY, 'subjects'] as const,
  teachers: [...MASTER_QUERY_KEY, 'teachers'] as const,
  academicYears: [...MASTER_QUERY_KEY, 'academic-years'] as const,
}

export function useClassesQuery() {
  return useQuery<Class[], Error>({
    queryKey: masterQueryKeys.classes,
    queryFn: masterService.fetchClasses,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  })
}