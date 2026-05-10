import axios from 'axios'
import axiosClient from '../../api/axiosClient'
import type { LoginRequest, LoginResponse } from '../../types/auth'

export const authService = {
  login: async (payload: LoginRequest) => {
    console.debug('[authService] login request', payload)

    try {
      const response = await axiosClient.post<LoginResponse>('/auth/login', payload)
      console.debug('[authService] login response raw', response.data)
      return response.data
    } catch (error) {
      console.error('[authService] login failed', error)

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as { message?: string } | undefined
        const apiMessage = responseData?.message ?? error.message

        const message =
          error.response?.status === 401
            ? apiMessage || 'Invalid username or password.'
            : apiMessage || 'Unable to authenticate. Please try again.'

        const thrownError = new Error(message) as Error & { cause?: unknown }
        thrownError.cause = error
        throw thrownError
      }

      throw error instanceof Error ? error : new Error('Unable to authenticate. Please try again.')
    }
  },
}
