import { useState } from 'react'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'

interface PayFeeModalProps {
  isOpen: boolean
  feeId?: string
  onClose: () => void
  onPay: (amount: number) => void
}

export function PayFeeModal({ isOpen, feeId, onClose, onPay }: PayFeeModalProps) {
  const [amount, setAmount] = useState('')

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Pay fee</h2>
            <p className="text-sm text-slate-500">Process payment for fee {feeId || 'record'}.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <TextInput
            label="Payment amount"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Close
          </Button>
          <Button type="button" onClick={() => onPay(Number(amount))}>
            Submit payment
          </Button>
        </div>
      </div>
    </div>
  )
}
