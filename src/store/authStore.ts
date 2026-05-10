import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoginResponse } from '../types/auth'

interface AuthState {
  accessToken: string | null
  user: LoginResponse['user'] | null
  isAuthenticated: boolean
  role: string | null
  setAuth: (payload: LoginResponse) => void
  clearAuth: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
      setAuth: (payload) => {
        const accessToken = payload.accessToken ?? payload.token ?? null
        const user = payload.user ?? null

        return set({
          accessToken,
          user,
          role: user?.role ?? null,
          isAuthenticated: Boolean(accessToken),
        })
      },
      clearAuth: () => set({ accessToken: null, user: null, role: null, isAuthenticated: false }),
      logout: () => set({ accessToken: null, user: null, role: null, isAuthenticated: false }),
    }),
    {
      name: 'schoolos-auth-storage',
      partialize: (state) => ({ accessToken: state.accessToken, user: state.user, role: state.role, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
