import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from './userService'
import type { CreateUserRequest, UpdateUserRequest } from '../../types/user'

export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, search?: string) => [...userQueryKeys.lists(), { page, pageSize, search }] as const,
  details: () => [...userQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
}

export function useUsersQuery(page = 1, pageSize = 10, search?: string) {
  return useQuery({
    queryKey: userQueryKeys.list(page, pageSize, search),
    queryFn: () => userService.fetchUsers(page, pageSize, search),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: userQueryKeys.detail(userId),
    queryFn: () => userService.fetchUserById(userId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateUserRequest) => userService.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
    },
  })
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: UpdateUserRequest }) => userService.updateUser(userId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(data.id) })
    },
  })
}

export function useDisableUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => userService.disableUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() })
    },
  })
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: ({ userId, newPassword }: { userId: string; newPassword: string }) =>
      userService.resetPassword(userId, newPassword),
  })
}
