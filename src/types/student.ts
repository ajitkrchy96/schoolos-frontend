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
  classId: number
  sectionId: number
  fatherName: string
  motherName: string
  parentPhone: string
  parentEmail: string
  parentAddress: string
  status: StudentStatus
}

export interface StudentListResponse {
  content: Student[]
  totalElements: number
}

export interface CreateStudentRequest {
  firstName: string
  lastName: string
  gender: StudentGender
  dob: string
  admissionNo: string
  phone: string
  classId: number
  sectionId: number
  fatherName: string
  motherName: string
  parentPhone: string
  parentEmail: string
  parentAddress: string
  status: StudentStatus
  schoolId: number
}

export type UpdateStudentRequest = CreateStudentRequest
