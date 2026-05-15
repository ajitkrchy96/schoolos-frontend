import { z } from 'zod'

export const markAttendanceSchema = z.object({
  attendanceId: z.number().nullable(),
  studentId: z.coerce.number().min(1, 'Student ID is required'),
  studentName: z.string().min(1, 'Student name is required'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['PRESENT', 'ABSENT']),
})

export type MarkAttendanceValues = z.infer<typeof markAttendanceSchema>
