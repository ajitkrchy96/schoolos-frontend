export type StudentGender = 'Male' | 'Female' | 'Other'
export type StudentStatus = 'ACTIVE' | 'INACTIVE'

export interface Student {
  id: string
  firstName: string
  lastName: string
  gender: StudentGender
  dob: string
  admissionNo: string
  phone: string
  classId: string
  sectionId: string
  fatherName: string
  motherName: string
  parentPhone: string
  parentEmail: string
  parentAddress: string
  status: StudentStatus
}

export interface StudentListResponse {
  items: Student[]
  total: number
}

export interface CreateStudentRequest {
  firstName: string
  lastName: string
  gender: StudentGender
  dob: string
  admissionNo: string
  phone: string
  classId: string
  sectionId: string
  fatherName: string
  motherName: string
  parentPhone: string
  parentEmail: string
  parentAddress: string
  status: StudentStatus
}

export type UpdateStudentRequest = CreateStudentRequest
