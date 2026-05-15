import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { feeService } from './feeService'
import type {
  AssignFeeRequest,
  FeePayment,
  FeeSummary,
  FeesListResponse,
  PayFeeRequest,
} from '../../types/fee'

const FEE_QUERY_KEY = ['fees'] as const

export const feeQueryKeys = {
  list: (page: number, size: number, search: string) => [...FEE_QUERY_KEY, 'list', page, size, search] as const,
  summary: () => [...FEE_QUERY_KEY, 'summary'] as const,
  history: (studentFeeId: string | number) => [...FEE_QUERY_KEY, 'history', studentFeeId] as const,
}

export function useFeesQuery(page = 0, size = 10, search = '') {
  return useQuery<FeesListResponse, Error>({
    queryKey: feeQueryKeys.list(page, size, search),
    queryFn: () => feeService.fetchFees(page, size, search),
    staleTime: 1000 * 60 * 2,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useFeesSummaryQuery() {
  return useQuery<FeeSummary, Error>({
    queryKey: feeQueryKeys.summary(),
    queryFn: feeService.fetchSummary,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function usePaymentHistoryQuery(studentFeeId: string | number, enabled = false) {
  return useQuery<FeePayment[], Error>({
    queryKey: feeQueryKeys.history(studentFeeId),
    queryFn: () => feeService.fetchPaymentHistory(studentFeeId),
    enabled,
    staleTime: 1000 * 60 * 1,
    retry: 1,
    select: (payments) => [...payments].sort((a, b) => Date.parse(b.paymentDate) - Date.parse(a.paymentDate)),
  })
}

export function usePayFeeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ studentFeeId, payload }: { studentFeeId: string | number; payload: PayFeeRequest }) =>
      feeService.payFee(studentFeeId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEE_QUERY_KEY })
    },
  })
}

export function useAssignFeeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ payload }: { payload: AssignFeeRequest }) => feeService.assignFee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEE_QUERY_KEY })
    },
  })
}
