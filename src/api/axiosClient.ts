import axios, { type AxiosError } from 'axios'
import { useAuthStore } from '../store/authStore'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }

    const message =
      error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
        ? (error.response.data as any).message
        : error.message

    return Promise.reject(new Error(message ?? 'Unable to complete request'))
  },
)

export default axiosClient
