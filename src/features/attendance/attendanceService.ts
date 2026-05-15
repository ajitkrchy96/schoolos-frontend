import axiosClient from '../../api/axiosClient'
import type {
  AttendanceRecord,
  AttendanceSummary,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '../../types/attendance'

const SCHOOL_ID = '1'

export const attendanceService = {
  fetchAttendanceByDate: async (date: string) => {
    const response = await axiosClient.get<AttendanceRecord[]>(`/schools/${SCHOOL_ID}/attendance/date`, {
      params: { date },
    })
    return response.data
  },

  createAttendance: async (payload: CreateAttendanceRequest) => {
    const response = await axiosClient.post(`/schools/${SCHOOL_ID}/attendance`, payload)
    return response.data
  },

  updateAttendance: async (attendanceId: number, payload: UpdateAttendanceRequest) => {
    const response = await axiosClient.patch(`/schools/${SCHOOL_ID}/attendance/${attendanceId}`, payload)
    return response.data
  },

  fetchAttendanceSummary: async (date: string) => {
    const response = await axiosClient.get<AttendanceSummary>(`/schools/${SCHOOL_ID}/attendance/summary`, {
      params: { date },
    })
    console.log('SUMMARY RESPONSE', response.data)
    return response.data
  },
}
