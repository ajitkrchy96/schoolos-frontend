import axiosClient from '../../api/axiosClient'
import type { User, CreateUserRequest, UpdateUserRequest, UsersListResponse } from '../../types/user'

export const userService = {
  fetchUsers: async (page = 1, pageSize = 10, search?: string) => {
    const response = await axiosClient.get<UsersListResponse>('/users', {
      params: { page, pageSize, search },
    })
    return response.data
  },

  fetchUserById: async (userId: string) => {
    const response = await axiosClient.get<User>(`/users/${userId}`)
    return response.data
  },

  createUser: async (payload: CreateUserRequest) => {
    const response = await axiosClient.post<User>('/users', payload)
    return response.data
  },

  updateUser: async (userId: string, payload: UpdateUserRequest) => {
    const response = await axiosClient.put<User>(`/users/${userId}`, payload)
    return response.data
  },

  resetPassword: async (userId: string, newPassword: string) => {
    const response = await axiosClient.post<{ message: string }>(`/users/${userId}/reset-password`, {
      newPassword,
    })
    return response.data
  },

  disableUser: async (userId: string) => {
    const response = await axiosClient.patch<User>(`/users/${userId}`, { status: 'INACTIVE' })
    return response.data
  },

  deleteUser: async (userId: string) => {
    const response = await axiosClient.delete<{ message: string }>(`/users/${userId}`)
    return response.data
  },
}
