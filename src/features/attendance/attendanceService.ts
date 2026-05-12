import axiosClient from '../../api/axiosClient'
import type { AttendanceRecord, AttendanceSummary, MarkAttendanceRequest } from '../../types/attendance'

const SCHOOL_ID = '1'

export const attendanceService = {
  // markAttendance: async (payload: MarkAttendanceRequest) => {
  //   const response = await axiosClient.post(`/schools/${SCHOOL_ID}/attendance`, [payload])
  //   return response.data
  // },

  markAttendance: async (payload: MarkAttendanceRequest) => {
  const requestPayload = [
    {
      studentId: Number(payload.studentId),
      date: payload.date,
      status: payload.status,
    },
  ]

  console.log('ATTENDANCE REQUEST', requestPayload)

  const response = await axiosClient.post(
    `/schools/${SCHOOL_ID}/attendance`,
    requestPayload,
  )

  console.log('ATTENDANCE RESPONSE', response.data)

  return response.data
},

  fetchAttendanceByDate: async (date: string) => {
    // const response = await axiosClient.get<{ records: AttendanceRecord[] }>(`/schools/${SCHOOL_ID}/attendance/date`, {
    //   params: { date },
    // })
    // return response.data
        const response = await axiosClient.get<AttendanceRecord[]>(`/schools/${SCHOOL_ID}/attendance/date`, {
      params: { date },
    })
    return response.data
  },

  fetchStudentAttendance: async (studentId: string) => {
    const response = await axiosClient.get<{ records: AttendanceRecord[] }>(`/schools/${SCHOOL_ID}/attendance/student/${studentId}`)
    return response.data
  },

  fetchAttendanceSummary: async (date: string) => {
    const response = await axiosClient.get<AttendanceSummary>(`/schools/${SCHOOL_ID}/attendance/summary`, {
      params: { date },
    })
    return response.data
  },
}
