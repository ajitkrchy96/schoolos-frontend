import axiosClient from '../../api/axiosClient'
import type { Fee } from '../../types/fee'

export const feeService = {
  fetchFees: async () => {
    const response = await axiosClient.get<{ items: Fee[] }>('/fees')
    return response.data
  },
  payFee: async (feeId: string) => {
    const response = await axiosClient.post<Fee>(`/fees/${feeId}/pay`)
    return response.data
  },
}
