import axiosClient from '../../api/axiosClient'
import type {
  AssignFeeRequest,
  FeePayment,
  FeeSummary,
  FeesListResponse,
  PayFeeRequest,
} from '../../types/fee'

const SCHOOL_ID = '1'

export const feeService = {
  fetchFees: async (page = 0, size = 10, search = '') => {
    const response = await axiosClient.get<FeesListResponse>(`/schools/${SCHOOL_ID}/fees`, {
      params: {
        page,
        size,
        ...(search ? { search } : {}),
      },
    })
    return response.data
  },

  fetchSummary: async () => {
    const response = await axiosClient.get<FeeSummary>(`/schools/${SCHOOL_ID}/fees/summary`)
    return response.data
  },

  assignFee: async (payload: AssignFeeRequest) => {
    const response = await axiosClient.post(`/schools/${SCHOOL_ID}/fees/student-fee`, payload)
    return response.data
  },

  payFee: async (studentFeeId: string | number, payload: PayFeeRequest) => {
    const response = await axiosClient.post<FeePayment>(`/schools/${SCHOOL_ID}/fees/pay/${studentFeeId}`, payload)
    return response.data
  },

  fetchPaymentHistory: async (studentFeeId: string | number) => {
    const response = await axiosClient.get<FeePayment[]>(`/schools/${SCHOOL_ID}/fees/payments/${studentFeeId}`)
    return response.data
  },
}
