export type AttendanceStatus = 'PRESENT' | 'ABSENT'

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  date: string
  status: AttendanceStatus
  className: string
  sectionName: string
}

export interface AttendanceSummary {
  present: number
  absent: number
  total: number
}

export interface MarkAttendanceRequest {
  studentId: string
  date: string
  status: AttendanceStatus
}
