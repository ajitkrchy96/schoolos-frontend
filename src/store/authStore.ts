import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoginResponse, UserProfile } from '../types/auth'

interface AuthState {
  accessToken: string | null
  user: UserProfile | null
  isAuthenticated: boolean
  role: string | null

  setAuth: (payload: LoginResponse) => void
  clearAuth: () => void
  logout: () => void
}

const fallbackUser: UserProfile = {
  id: '1',
  name: 'School Admin',
  email: 'admin@schoolos.com',
  role: 'ADMIN',
  schoolId: 1,
  username: 'admin',
  fullName: 'School Admin',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      role: null,
      isAuthenticated: false,

      setAuth: (payload) => {
        console.log('[authStore] setAuth payload', payload)

        const accessToken = payload.accessToken ?? payload.token ?? null

        const user = payload.user ?? fallbackUser

        set({
          accessToken,
          user,
          role: user.role,
          isAuthenticated: Boolean(accessToken),
        })
      },

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          role: null,
          isAuthenticated: false,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'schoolos-auth-storage',

      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)