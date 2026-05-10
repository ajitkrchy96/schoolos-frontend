import { z } from 'zod'

export const markAttendanceSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['PRESENT', 'ABSENT']),
})

export type MarkAttendanceValues = z.infer<typeof markAttendanceSchema>
