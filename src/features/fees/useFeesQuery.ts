import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { feeService } from './feeService'
import type { FeePaymentRequest, PendingFeeListResponse, PaymentRecord } from '../../types/fee'

const FEE_QUERY_KEY = ['fees'] as const

export const feeQueryKeys = {
  pending: () => [...FEE_QUERY_KEY, 'pending'] as const,
  history: (studentFeeId: string) => [...FEE_QUERY_KEY, 'history', studentFeeId] as const,
}

export function useFeesQuery() {
  return useQuery<PendingFeeListResponse, Error>({
    queryKey: feeQueryKeys.pending(),
    queryFn: feeService.fetchPendingFees,
    staleTime: 1000 * 60 * 2,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function usePaymentHistoryQuery(studentFeeId: string, enabled = false) {
  return useQuery<{ items: PaymentRecord[] }, Error>({
    queryKey: feeQueryKeys.history(studentFeeId),
    queryFn: () => feeService.fetchPaymentHistory(studentFeeId),
    enabled,
    staleTime: 1000 * 60 * 1,
    retry: 1,
  })
}

export function usePayFeeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ studentFeeId, payload }: { studentFeeId: string; payload: FeePaymentRequest }) =>
      feeService.payFee(studentFeeId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feeQueryKeys.pending() })
    },
  })
}
