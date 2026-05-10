import { UserRole, UserStatus } from '../../types/user'

interface RoleBadgeProps {
  role: UserRole
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const styles = {
    [UserRole.ADMIN]: 'bg-indigo-100 text-indigo-700',
    [UserRole.TEACHER]: 'bg-blue-100 text-blue-700',
  }

  const labels = {
    [UserRole.ADMIN]: 'Admin',
    [UserRole.TEACHER]: 'Teacher',
  }

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[role]}`}>{labels[role]}</span>
}

interface StatusBadgeProps {
  status: UserStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    [UserStatus.ACTIVE]: 'bg-emerald-100 text-emerald-700',
    [UserStatus.INACTIVE]: 'bg-slate-100 text-slate-700',
  }

  const labels = {
    [UserStatus.ACTIVE]: 'Active',
    [UserStatus.INACTIVE]: 'Inactive',
  }

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{labels[status]}</span>
}
