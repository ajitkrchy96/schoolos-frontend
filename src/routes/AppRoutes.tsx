import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleProtectedRoute } from './RoleProtectedRoute'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import UsersPage from '../pages/UsersPage'
import StudentsPage from '../pages/StudentsPage'
import StudentStatusManagementPage from '../pages/StudentStatusManagementPage'
import FeesPage from '../pages/FeesPage'
import AttendancePage from '../pages/AttendancePage'
import NotificationsPage from '../pages/NotificationsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route
          path="users"
          element={
            <RoleProtectedRoute requiredRole="ADMIN">
              <UsersPage />
            </RoleProtectedRoute>
          }
        />
        <Route path="students" element={<StudentsPage />} />
        <Route path="student-status" element={<StudentStatusManagementPage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
