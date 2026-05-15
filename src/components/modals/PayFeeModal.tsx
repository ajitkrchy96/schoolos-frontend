import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'
import { createPayFeeSchema, type PayFeeFormValues } from '../../features/fees/feeSchema'
import type { FeeRecord, PaymentMode } from '../../types/fee'

const paymentModes: PaymentMode[] = ['CASH', 'UPI', 'CARD', 'BANK_TRANSFER']

interface PayFeeModalProps {
  isOpen: boolean
  fee?: FeeRecord | null
  onClose: () => void
  onPay: (payload: PayFeeFormValues) => void
  isLoading?: boolean
}

export function PayFeeModal({ isOpen, fee, onClose, onPay, isLoading = false }: PayFeeModalProps) {
  const dueAmount = fee?.dueAmount ?? 0
  const payFeeSchema = createPayFeeSchema(dueAmount)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PayFeeFormValues>({
    resolver: zodResolver(payFeeSchema) as Resolver<PayFeeFormValues>,
    defaultValues: {
      amount: 0,
      paymentMode: 'UPI',
      remarks: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset({ amount: 0, paymentMode: 'UPI', remarks: '' })
    }
  }, [isOpen, reset])

  if (!isOpen || !fee) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Pay Fee</h2>
            <p className="text-sm text-slate-500">Record a payment for {fee.studentName}.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onPay)}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Student Name" value={fee.studentName} disabled />
            <TextInput label="Admission No" value={fee.admissionNo} disabled />
            <TextInput label="Class" value={fee.className ?? ''} disabled />
            <TextInput label="Total Fee" value={`₹${(fee.totalAmount ?? 0).toFixed(2)}`} disabled />
            <TextInput label="Paid Amount" value={`₹${(fee.paidAmount ?? 0).toFixed(2)}`} disabled />
            <TextInput label="Due Amount" value={`₹${(fee.dueAmount ?? 0).toFixed(2)}`} disabled />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800">Payment Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('amount', { valueAsNumber: true })}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="0.00"
              />
              {errors.amount && <p className="mt-2 text-sm text-rose-600">{errors.amount.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">Payment Mode</label>
              <select
                {...register('paymentMode')}
                className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {paymentModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode.replace('_', ' ')}
                  </option>
                ))}
              </select>
              {errors.paymentMode && <p className="mt-2 text-sm text-rose-600">{errors.paymentMode.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">Remarks</label>
            <textarea
              {...register('remarks')}
              rows={4}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Optional notes for this payment"
            />
            {errors.remarks && <p className="mt-2 text-sm text-rose-600">{errors.remarks.message}</p>}
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit payment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
