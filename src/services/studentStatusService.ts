import axiosClient from '../api/axiosClient'
import type { Student } from '../types/student'

const SCHOOL_ID = '1'

export interface StudentStatusChangeRequest {
  status: 'ACTIVE' | 'INACTIVE'
}

export const studentStatusService = {
  fetchActiveStudents: async (page: number = 0, pageSize: number = 10) => {
    const response = await axiosClient.get<{ content: Student[]; totalElements: number }>(
      `/schools/${SCHOOL_ID}/students`,
      {
        params: {
          status: 'ACTIVE',
          page,
          size: pageSize,
        },
      }
    )
    return response.data
  },

  fetchInactiveStudents: async (page: number = 0, pageSize: number = 10) => {
    const response = await axiosClient.get<{ content: Student[]; totalElements: number }>(
      `/schools/${SCHOOL_ID}/students`,
      {
        params: {
          status: 'INACTIVE',
          page,
          size: pageSize,
        },
      }
    )
    return response.data
  },

  updateStudentStatus: async (studentId: string, payload: StudentStatusChangeRequest) => {
    const response = await axiosClient.patch<Student>(
      `/schools/${SCHOOL_ID}/students/${studentId}/status`,
      payload
    )
    return response.data
  },
}
