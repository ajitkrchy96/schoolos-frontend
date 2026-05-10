import axiosClient from '../api/axiosClient'

export const apiService = {
  get: async <T>(path: string, params?: Record<string, unknown>) => {
    const response = await axiosClient.get<T>(path, { params })
    return response.data
  },
  post: async <T, U>(path: string, payload: U) => {
    const response = await axiosClient.post<T>(path, payload)
    return response.data
  },
}
