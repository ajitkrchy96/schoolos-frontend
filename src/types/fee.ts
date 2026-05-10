export interface Fee {
  id: string
  studentName: string
  dueDate: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
  receiptUrl?: string
}
