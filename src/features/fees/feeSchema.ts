import { z } from 'zod'

const paymentModeEnum = z.enum(['CASH', 'UPI', 'CARD', 'BANK_TRANSFER'])

export function createPayFeeSchema(dueAmount: number) {
  return z.object({
    amount: z.preprocess((value) => {
      if (typeof value === 'string') {
        return value.trim() === '' ? NaN : Number(value)
      }
      return value
    }, z.number().min(0.01, 'Amount must be greater than 0').max(dueAmount, `Amount cannot exceed due amount (${dueAmount.toFixed(2)})`)),
    paymentMode: paymentModeEnum,
    remarks: z
      .string()
      .max(250, 'Remarks must be 250 characters or less')
      .optional()
      .transform((value) => (typeof value === 'string' ? value.trim() : '')),
  })
}

export type PayFeeFormValues = z.infer<ReturnType<typeof createPayFeeSchema>>
