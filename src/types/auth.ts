export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  schoolId?: number
  username?: string
  fullName?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token?: string
  accessToken?: string
  refreshToken?: string
  user?: UserProfile
}
