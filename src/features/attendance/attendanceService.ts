import axiosClient from '../../api/axiosClient'
import type { AttendanceRecord, AttendanceSummary } from '../../types/attendance'

export const attendanceService = {
  fetchAttendance: async () => {
    const response = await axiosClient.get<{ records: AttendanceRecord[]; summary: AttendanceSummary }>('/attendance')
    return response.data
  },
  markAttendance: async (payload: { studentId: string; date: string; status: string }) => {
    const response = await axiosClient.post('/attendance/mark', payload)
    return response.data
  },
}
