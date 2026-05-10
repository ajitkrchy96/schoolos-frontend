import { useState } from 'react'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'

export type PaymentMethod = 'CASH' | 'UPI' | 'CARD' | 'BANK_TRANSFER'

interface PayFeeModalProps {
  isOpen: boolean
  feeId?: string
  balance?: number
  onClose: () => void
  onPay: (payload: { amount: number; method: PaymentMethod; reference: string }) => void
  isLoading?: boolean
}

const paymentModes: PaymentMethod[] = ['CASH', 'UPI', 'CARD', 'BANK_TRANSFER']

export function PayFeeModal({ isOpen, feeId, balance, onClose, onPay, isLoading = false }: PayFeeModalProps) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<PaymentMethod>('CASH')
  const [reference, setReference] = useState('')

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Pay fee</h2>
            <p className="text-sm text-slate-500">Complete the payment details for {feeId ?? 'selected fee'}.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <TextInput
            label="Amount"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder={balance ? `Max ${balance}` : '0.00'}
          />
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Payment method</label>
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value as PaymentMethod)}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {paymentModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <TextInput
            label="Reference"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="Transaction reference"
          />
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Balance</p>
            <p>${balance?.toLocaleString() ?? '0.00'}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Close
          </Button>
          <Button type="button" onClick={() => onPay({ amount: Number(amount), method, reference })} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Submit payment'}
          </Button>
        </div>
      </div>
    </div>
  )
}
