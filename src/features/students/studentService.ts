import axiosClient from '../../api/axiosClient'
import type { CreateStudentRequest, Student, StudentListResponse, UpdateStudentRequest } from '../../types/student'

const SCHOOL_ID = '1'

export const studentService = {
  fetchStudents: async (params: { search?: string; page?: number; pageSize?: number }) => {
    const endpoint = params.search ? `/schools/${SCHOOL_ID}/students/search` : `/schools/${SCHOOL_ID}/students`
    const requestParams: Record<string, string | number> = {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 10,
    }

    if (params.search) {
      requestParams.searchTerm = params.search
    }

    const response = await axiosClient.get<StudentListResponse>(endpoint, {
      params: requestParams,
    })

    return response.data
  },

  fetchStudentById: async (studentId: string) => {
    const response = await axiosClient.get<Student>(`/schools/${SCHOOL_ID}/students/${studentId}`)
    return response.data
  },

  createStudent: async (payload: CreateStudentRequest) => {
    const response = await axiosClient.post<Student>(`/schools/${SCHOOL_ID}/students`, payload)
    return response.data
  },

  updateStudent: async (studentId: string, payload: UpdateStudentRequest) => {
    const response = await axiosClient.put<Student>(`/schools/${SCHOOL_ID}/students/${studentId}`, payload)
    return response.data
  },

  deleteStudent: async (studentId: string) => {
    const response = await axiosClient.delete<{ message: string }>(`/schools/${SCHOOL_ID}/students/${studentId}`)
    return response.data
  },
}
