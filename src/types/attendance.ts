export type AttendanceStatus = 'PRESENT' | 'ABSENT'

export interface AttendanceRecord {
  attendanceId: number | null
  studentId: number
  studentName: string
  className: string
  date: string
  status: AttendanceStatus | null
}

export interface AttendanceSummary {
  presentCount : number
  absentCount: number
  total: number
}

export interface CreateAttendanceRequest {
  studentId: number
  date: string
  status: AttendanceStatus
}

export interface UpdateAttendanceRequest {
  status: AttendanceStatus
}
