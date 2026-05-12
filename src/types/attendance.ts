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
  presentCount: number
  absentCount: number
  total: number
}

export interface MarkAttendanceRequest {
  studentId: number
  date: string
  status: AttendanceStatus
}
