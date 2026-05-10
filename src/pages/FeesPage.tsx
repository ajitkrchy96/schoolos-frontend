import { useQuery } from '@tanstack/react-query'
import type { Fee } from '../types/fee'
import { feeService } from '../features/fees/feeService'
import { DataTable } from '../components/tables/DataTable'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Button } from '../components/forms/Button'

export default function FeesPage() {
  const { data, isLoading, isError } = useQuery<{ items: Fee[] }>({
    queryKey: ['fees'],
    queryFn: feeService.fetchFees,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Fees</h2>
          <p className="text-sm text-slate-500">Review pending payments and process fee collection.</p>
        </div>
        <Button type="button">Send reminder</Button>
      </div>

      {isError ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700">Unable to load fees information.</div>
      ) : (
        <DataTable
          columns={[
            { label: 'Student', accessor: 'studentName' },
            { label: 'Due date', accessor: 'dueDate' },
            { label: 'Amount', accessor: 'amount' },
            { label: 'Status', accessor: 'status' },
          ]}
          data={data?.items ?? []}
          emptyMessage="No fee records available."
        />
      )}
    </div>
  )
}
