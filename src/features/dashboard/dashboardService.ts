import axiosClient from '../../api/axiosClient'
import type { DashboardResponse } from '../../types/dashboard'

export const dashboardService = {
  fetchSummary: async (schoolId: string) => {
    const response = await axiosClient.get<DashboardResponse>(`/schools/${schoolId}/dashboard`)
    return response.data
  },
}
