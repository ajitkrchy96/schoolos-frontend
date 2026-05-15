import type { FeePayment } from '../../types/fee'

interface PaymentHistoryModalProps {
  isOpen: boolean
  paymentHistory: FeePayment[]
  onClose: () => void
  isLoading?: boolean
}

export function PaymentHistoryModal({ isOpen, paymentHistory, onClose, isLoading = false }: PaymentHistoryModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Payment history</h2>
            <p className="text-sm text-slate-500">Review previous payments for this fee record.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
            <p className="font-semibold text-slate-900">No payments found</p>
            <p className="mt-2 text-sm text-slate-500">This fee record does not have payment history yet.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Payment Mode</th>
                  <th className="px-5 py-4 font-semibold">Payment Date</th>
                  <th className="px-5 py-4 font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.paymentId} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-4 align-top text-slate-700">${payment.amount.toFixed(2)}</td>
                    <td className="px-5 py-4 align-top text-slate-700">{payment.paymentMode.replace('_', ' ')}</td>
                    <td className="px-5 py-4 align-top text-slate-700">{new Date(payment.paymentDate).toLocaleString()}</td>
                    <td className="px-5 py-4 align-top text-slate-700">{payment.remarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isLoading && <p className="mt-4 text-sm text-slate-500">Loading history...</p>}
      </div>
    </div>
  )
}
