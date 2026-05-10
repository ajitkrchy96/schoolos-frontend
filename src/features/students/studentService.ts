import axiosClient from '../../api/axiosClient'
import type { Student } from '../../types/student'

export interface StudentQueryParams {
  search?: string
  page?: number
  pageSize?: number
}

export const studentService = {
  fetchStudents: async (params: StudentQueryParams) => {
    const response = await axiosClient.get<{ items: Student[]; total: number }>('/students', {
      params,
    })
    return response.data
  },
}
