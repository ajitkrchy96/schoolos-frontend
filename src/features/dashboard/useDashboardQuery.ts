import { useQuery } from '@tanstack/react-query'
import { dashboardService } from './dashboardService'
import { useAuthStore } from '../../store/authStore'
import type { DashboardResponse } from '../../types/dashboard'

const DEFAULT_SCHOOL_ID = '1'

export const dashboardQueryKey = (schoolId: string) => ['dashboard', 'school', schoolId] as const

export function useDashboardQuery(schoolId?: string) {
  const userSchoolId = useAuthStore((state) => state.user?.schoolId)
  const resolvedSchoolId = schoolId ?? String(userSchoolId ?? DEFAULT_SCHOOL_ID)

  return useQuery<DashboardResponse, Error>({
    queryKey: dashboardQueryKey(resolvedSchoolId),
    queryFn: () => dashboardService.fetchSummary(resolvedSchoolId),
    enabled: Boolean(resolvedSchoolId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
