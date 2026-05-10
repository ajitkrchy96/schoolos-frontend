import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface RoleProtectedRouteProps {
  children: ReactNode
  requiredRole?: string
}

export function RoleProtectedRoute({ children, requiredRole }: RoleProtectedRouteProps) {
  const userRole = useAuthStore((state) => state.role)
  const location = useLocation()

  // If no required role is specified, allow access
  if (!requiredRole) {
    return <>{children}</>
  }

  // Check if user has the required role
  if (userRole !== requiredRole) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return <>{children}</>
}
