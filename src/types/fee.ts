export type FeeStatus = 'PENDING' | 'PARTIAL' | 'PAID'
export type PaymentMode = 'CASH' | 'UPI' | 'CARD' | 'BANK_TRANSFER'

export interface FeeRecord {
  id: string | number
  studentId: string | number
  studentName: string
  admissionNo: string
  className: string
  totalAmount: number
  paidAmount: number
  dueAmount: number
  status: FeeStatus
}

export interface FeesListResponse {
  content: FeeRecord[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export interface FeeSummary {
  totalStudents: number
  paidStudents: number
  partialStudents: number
  pendingStudents: number
  totalCollected: number
  totalDue: number
}

export interface FeePayment {
  paymentId: string | number
  amount: number
  paymentMode: PaymentMode
  paymentDate: string
  remarks: string
}

export interface PayFeeRequest {
  amount: number
  paymentMode: PaymentMode
  remarks: string
}

export interface AssignFeeRequest {
  studentId: string | number
  totalFee: number
}
