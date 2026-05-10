import axiosClient from '../../api/axiosClient'
import type { FeePaymentRequest, PendingFeeListResponse, PaymentRecord } from '../../types/fee'

const SCHOOL_ID = '1'

export const feeService = {
  fetchPendingFees: async () => {
    const response = await axiosClient.get<PendingFeeListResponse>(`/schools/${SCHOOL_ID}/fees/pending`)
    return response.data
  },

  fetchStudentFees: async (studentId: string) => {
    const response = await axiosClient.get<PendingFeeListResponse>(`/schools/${SCHOOL_ID}/fees/student/${studentId}`)
    return response.data
  },

  payFee: async (studentFeeId: string, payload: FeePaymentRequest) => {
    const response = await axiosClient.post<PaymentRecord>(`/schools/${SCHOOL_ID}/fees/pay/${studentFeeId}`, payload)
    return response.data
  },

  fetchPaymentHistory: async (studentFeeId: string) => {
    const response = await axiosClient.get<{ items: PaymentRecord[] }>(`/schools/${SCHOOL_ID}/fees/payments/${studentFeeId}`)
    return response.data
  },

  fetchReceipt: async (paymentId: string) => {
    const response = await axiosClient.get<{ receiptUrl: string }>(`/schools/${SCHOOL_ID}/fees/receipt/${paymentId}`)
    return response.data
  },
}
