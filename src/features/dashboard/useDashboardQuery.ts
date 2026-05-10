import { useQuery } from '@tanstack/react-query'
import { dashboardService } from './dashboardService'
import type { DashboardResponse } from '../../types/dashboard'

const DASHBOARD_SCHOOL_ID = '1'

export const dashboardQueryKey = (schoolId: string) => ['dashboard', 'school', schoolId] as const

export function useDashboardQuery(schoolId = DASHBOARD_SCHOOL_ID) {
  return useQuery<DashboardResponse, Error>({
    queryKey: dashboardQueryKey(schoolId),
    queryFn: () => dashboardService.fetchSummary(schoolId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
