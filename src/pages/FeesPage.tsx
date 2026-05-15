import { useMemo, useState } from 'react'
import { Button } from '../components/forms/Button'
import { EmptyState } from '../components/common/EmptyState'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Pagination } from '../components/common/Pagination'
import { StatCard } from '../components/cards/StatCard'
import { FeeTable } from '../components/tables/FeeTable'
import { PayFeeModal } from '../components/modals/PayFeeModal'
import { PaymentHistoryModal } from '../components/modals/PaymentHistoryModal'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  useFeesQuery,
  useFeesSummaryQuery,
  usePayFeeMutation,
  usePaymentHistoryQuery,
} from '../features/fees/useFeesQuery'
import type { FeeRecord, PayFeeRequest } from '../types/fee'
import { TextInput } from '../components/forms/TextInput'

const PAGE_SIZE = 10

export default function FeesPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)

  const debouncedSearch = useDebouncedValue(searchTerm, 350)
  const feeQuery = useFeesQuery(page - 1, PAGE_SIZE, debouncedSearch)
  const summaryQuery = useFeesSummaryQuery()
  const payMutation = usePayFeeMutation()
  const paymentHistoryQuery = usePaymentHistoryQuery(selectedFee?.id ?? '', showHistoryModal && Boolean(selectedFee?.id))

  const fees = useMemo(() => feeQuery.data?.content ?? [], [feeQuery.data])
  const totalPages = Math.max(1, feeQuery.data?.totalPages ?? 1)
  const isLoading = feeQuery.isLoading || summaryQuery.isLoading

  const handlePay = async (payload: PayFeeRequest) => {
    if (!selectedFee) return
    try {
      await payMutation.mutateAsync({ studentFeeId: selectedFee.id, payload })
      setShowPaymentModal(false)
      setSelectedFee(null)
    } catch (error) {
      console.error('Failed to submit fee payment', error)
    }
  }

  const handleHistory = (fee: FeeRecord) => {
    setSelectedFee(fee)
    setShowHistoryModal(true)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Fees</h2>
          <p className="text-sm text-slate-500">Manage fee collections, payment history, and school-wide fee health.</p>
        </div>
        <Button
          type="button"
          onClick={() => {
            if (fees.length > 0) {
              setSelectedFee(fees[0])
              setShowPaymentModal(true)
            }
          }}
          disabled={!fees.length}
        >
          Pay fee
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard label="Total students" value={summaryQuery.data?.totalStudents ?? '-'} accent="bg-slate-500" />
          <StatCard label="Paid students" value={summaryQuery.data?.paidStudents ?? '-'} accent="bg-emerald-500" />
          <StatCard label="Partial students" value={summaryQuery.data?.partialStudents ?? '-'} accent="bg-amber-500" />
          <StatCard label="Pending students" value={summaryQuery.data?.pendingStudents ?? '-'} accent="bg-rose-500" />
          {/* <StatCard label="Total collected" value={`₹${summaryQuery.data?.totalCollected.toLocaleString() ?? '-'}`} accent="bg-sky-500" /> */}
          <StatCard
            label="Total collected"
            value={`₹${(summaryQuery.data?.totalCollected ?? 0).toLocaleString()}`}
            accent="bg-sky-500"
          />
          {/* <StatCard label="Total due" value={`₹${summaryQuery.data?.totalDue.toLocaleString() ?? '-'}`} accent="bg-indigo-500" /> */}
          <StatCard
            label="Total due"
            value={`₹${(summaryQuery.data?.totalDue ?? 0).toLocaleString()}`}
            accent="bg-indigo-500"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div>
          <TextInput
            label="Search fees"
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search by student name or admission number"
          />
        </div>
        <div className="flex items-end justify-end">
          <p className="text-sm text-slate-500">Showing page {page}</p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : feeQuery.isError || summaryQuery.isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
          <h3 className="text-lg font-semibold">Unable to load fees</h3>
          <p className="mt-2 text-sm text-rose-700">
            {feeQuery.error instanceof Error
              ? feeQuery.error.message
              : summaryQuery.error instanceof Error
              ? summaryQuery.error.message
              : 'There was a problem loading fee data.'}
          </p>
        </div>
      ) : fees.length === 0 ? (
        <EmptyState title="No fee records" description="No fee records match your search criteria." />
      ) : (
        <>
          <FeeTable
            fees={fees}
            onPay={(fee) => {
              setSelectedFee(fee)
              setShowPaymentModal(true)
            }}
            onHistory={handleHistory}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <PayFeeModal
        isOpen={showPaymentModal && Boolean(selectedFee)}
        fee={selectedFee}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedFee(null)
        }}
        onPay={handlePay}
        isLoading={payMutation.isPending}
      />

      <PaymentHistoryModal
        isOpen={showHistoryModal && Boolean(selectedFee)}
        paymentHistory={paymentHistoryQuery.data ?? []}
        onClose={() => {
          setShowHistoryModal(false)
          setSelectedFee(null)
        }}
        isLoading={paymentHistoryQuery.isLoading}
      />
    </div>
  )
}
