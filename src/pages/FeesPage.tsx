import { useMemo, useState } from 'react'
import { Button } from '../components/forms/Button'
import { EmptyState } from '../components/common/EmptyState'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { FeeTable } from '../components/tables/FeeTable'
import { PayFeeModal } from '../components/modals/PayFeeModal'
import { PaymentHistoryModal } from '../components/modals/PaymentHistoryModal'
import { useFeesQuery, usePayFeeMutation, usePaymentHistoryQuery } from '../features/fees/useFeesQuery'
import type { Fee, FeePaymentRequest } from '../types/fee'

export default function FeesPage() {
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)

  const { data, isLoading, isError, error } = useFeesQuery()
  const payMutation = usePayFeeMutation()
  const paymentHistoryQuery = usePaymentHistoryQuery(selectedFee?.id ?? '', showHistoryModal && Boolean(selectedFee?.id))

  const fees = useMemo(() => data?.items ?? [], [data])

  const handlePay = async (payload: FeePaymentRequest) => {
    if (!selectedFee) return
    await payMutation.mutateAsync({ studentFeeId: selectedFee.id, payload })
    setShowPaymentModal(false)
    setSelectedFee(null)
  }

  const handleViewHistory = (fee: Fee) => {
    setSelectedFee(fee)
    setShowHistoryModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Fees</h2>
          <p className="text-sm text-slate-500">Review pending payments and manage student fee activity.</p>
        </div>
        <Button type="button" onClick={() => setShowPaymentModal(true)}>
          Pay fee
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
          <h3 className="text-lg font-semibold">Unable to load fees</h3>
          <p className="mt-2 text-sm text-rose-700">{error instanceof Error ? error.message : 'There was a problem loading fees.'}</p>
        </div>
      ) : fees.length === 0 ? (
        <EmptyState title="No pending fees" description="There are no pending fee records for your school right now." />
      ) : (
        <FeeTable
          fees={fees}
          onPay={(fee) => {
            setSelectedFee(fee)
            setShowPaymentModal(true)
          }}
          onHistory={handleViewHistory}
        />
      )}

      <PayFeeModal
        isOpen={showPaymentModal}
        feeId={selectedFee?.id}
        balance={selectedFee?.balance}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedFee(null)
        }}
        onPay={handlePay}
        isLoading={payMutation.isPending}
      />

      <PaymentHistoryModal
        isOpen={showHistoryModal}
        paymentHistory={paymentHistoryQuery.data?.items ?? []}
        onClose={() => {
          setShowHistoryModal(false)
          setSelectedFee(null)
        }}
        onDownloadReceipt={(receiptUrl) => {
          if (receiptUrl) {
            window.open(receiptUrl, '_blank')
          }
        }}
        isLoading={paymentHistoryQuery.isLoading}
      />
    </div>
  )
}
