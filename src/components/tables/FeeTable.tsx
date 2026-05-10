import { Button } from '../forms/Button'
import type { Fee } from '../../types/fee'

interface FeeTableProps {
  fees: Fee[]
  onPay: (fee: Fee) => void
  onHistory: (fee: Fee) => void
}

export function FeeTable({ fees, onPay, onHistory }: FeeTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Student</th>
            <th className="px-5 py-4 font-semibold">Due date</th>
            <th className="px-5 py-4 font-semibold">Amount</th>
            <th className="px-5 py-4 font-semibold">Balance</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-4 align-top text-slate-700">{fee.studentName}</td>
              <td className="px-5 py-4 align-top text-slate-700">{fee.dueDate}</td>
              <td className="px-5 py-4 align-top text-slate-700">${fee.amount.toLocaleString()}</td>
              <td className="px-5 py-4 align-top text-slate-700">${fee.balance.toLocaleString()}</td>
              <td className="px-5 py-4 align-top text-slate-700">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    fee.status === 'PAID'
                      ? 'bg-emerald-500/10 text-emerald-700'
                      : fee.status === 'OVERDUE'
                      ? 'bg-rose-500/10 text-rose-700'
                      : 'bg-amber-500/10 text-amber-700'
                  }`}
                >
                  {fee.status}
                </span>
              </td>
              <td className="px-5 py-4 align-top text-slate-700">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" type="button" onClick={() => onPay(fee)}>
                    Pay
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => onHistory(fee)}>
                    History
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
