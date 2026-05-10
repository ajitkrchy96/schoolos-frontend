export type FeeStatus = 'PENDING' | 'PAID' | 'OVERDUE'
export type PaymentMethod = 'CASH' | 'UPI' | 'CARD' | 'BANK_TRANSFER'

export interface Fee {
  id: string
  studentId: string
  studentName: string
  dueDate: string
  amount: number
  paidAmount: number
  balance: number
  status: FeeStatus
  className: string
  receiptUrl?: string
}

export interface PendingFeeListResponse {
  items: Fee[]
  total: number
}

export interface PaymentRecord {
  id: string
  amount: number
  method: PaymentMethod
  status: 'COMPLETED' | 'FAILED' | 'PENDING'
  paymentDate: string
  reference: string
  receiptUrl?: string
}

export interface FeePaymentRequest {
  amount: number
  method: PaymentMethod
  reference: string
}
