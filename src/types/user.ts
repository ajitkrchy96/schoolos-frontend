export const UserRole = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
} as const

export type UserRole = typeof UserRole[keyof typeof UserRole]

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export type UserStatus = typeof UserStatus[keyof typeof UserStatus]

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  username: string
  email: string
  fullName: string
  password: string
  role: UserRole
}

export interface UpdateUserRequest {
  email?: string
  fullName?: string
  role?: UserRole
  status?: UserStatus
}

export interface ResetPasswordRequest {
  userId: string
  newPassword: string
}

export interface UsersListResponse {
  items: User[]
  total: number
  page: number
  pageSize: number
}
