export interface AttendanceRecord {
  id: string
  studentName: string
  date: string
  status: 'Present' | 'Absent' | 'Late'
  className: string
}

export interface AttendanceSummary {
  present: number
  absent: number
  late: number
  total: number
}
