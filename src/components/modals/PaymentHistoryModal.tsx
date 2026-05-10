import { Button } from '../forms/Button'
import type { PaymentRecord } from '../../types/fee'

interface PaymentHistoryModalProps {
  isOpen: boolean
  paymentHistory: PaymentRecord[]
  onClose: () => void
  onDownloadReceipt: (receiptUrl: string | undefined) => void
  isLoading?: boolean
}

export function PaymentHistoryModal({ isOpen, paymentHistory, onClose, onDownloadReceipt, isLoading = false }: PaymentHistoryModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Payment history</h2>
            <p className="text-sm text-slate-500">Review previous payments and download receipts.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Method</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 align-top text-slate-700">{payment.paymentDate}</td>
                  <td className="px-5 py-4 align-top text-slate-700">${payment.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 align-top text-slate-700">{payment.method}</td>
                  <td className="px-5 py-4 align-top text-slate-700">{payment.status}</td>
                  <td className="px-5 py-4 align-top text-slate-700">
                    <Button variant="ghost" type="button" onClick={() => onDownloadReceipt(payment.receiptUrl)}>
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isLoading && <p className="mt-4 text-sm text-slate-500">Loading history...</p>}
      </div>
    </div>
  )
}
