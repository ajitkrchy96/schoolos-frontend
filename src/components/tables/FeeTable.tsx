import { Button } from '../forms/Button'
import type { FeeRecord } from '../../types/fee'

interface FeeTableProps {
  fees: FeeRecord[]
  onPay: (fee: FeeRecord) => void
  onHistory: (fee: FeeRecord) => void
}

const statusStyles: Record<string, string> = {
  PAID: 'bg-emerald-100 text-emerald-700',
  PARTIAL: 'bg-amber-100 text-amber-700',
  PENDING: 'bg-rose-100 text-rose-700',
}

export function FeeTable({ fees, onPay, onHistory }: FeeTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Student Name</th>
            <th className="px-5 py-4 font-semibold">Admission No</th>
            <th className="px-5 py-4 font-semibold">Class</th>
            <th className="px-5 py-4 font-semibold">Total Fee</th>
            <th className="px-5 py-4 font-semibold">Paid Amount</th>
            <th className="px-5 py-4 font-semibold">Due Amount</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-4 align-top text-slate-700">{fee.studentName}</td>
              <td className="px-5 py-4 align-top text-slate-700">{fee.admissionNo}</td>
              <td className="px-5 py-4 align-top text-slate-700">{fee.className}</td>
              <td className="px-5 py-4 align-top text-slate-700">${(fee.totalAmount ?? 0).toFixed(2)}</td>
              <td className="px-5 py-4 align-top text-slate-700">${(fee.paidAmount ?? 0).toFixed(2)}</td>
              <td className="px-5 py-4 align-top text-slate-700">${(fee.dueAmount ?? 0).toFixed(2)}</td>
              <td className="px-5 py-4 align-top">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[fee.status]}`}>
                  {fee.status}
                </span>
              </td>
              <td className="px-5 py-4 align-top text-slate-700">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" type="button" onClick={() => onPay(fee)} disabled={fee.dueAmount <= 0}>
                    Pay Fee
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => onHistory(fee)}>
                    View History
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
