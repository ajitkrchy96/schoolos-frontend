import { z } from 'zod'

export const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  dob: z.string().min(1, 'Date of birth is required'),
  admissionNo: z.string().min(1, 'Admission number is required'),
  phone: z.string().min(1, 'Phone is required'),
  classId: z.string().min(1, 'Class ID is required'),
  sectionId: z.string().min(1, 'Section ID is required'),
  fatherName: z.string().min(1, 'Father name is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  parentPhone: z.string().min(1, 'Parent phone is required'),
  parentEmail: z.string().email('Invalid email address'),
  parentAddress: z.string().min(1, 'Parent address is required'),
  status: z.enum(['ACTIVE', 'INACTIVE']),
})

export type StudentFormValues = z.infer<typeof studentSchema>
