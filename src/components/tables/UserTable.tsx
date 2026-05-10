import { User } from '../../types/user'
import { RoleBadge, StatusBadge } from '../badges/UserBadges'
import { Button } from '../forms/Button'

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDisable: (userId: string) => void
  isLoading?: boolean
}

export function UserTable({ users, onEdit, onDisable, isLoading }: UserTableProps) {
  if (!users?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
        No users found.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Username</th>
            <th className="px-5 py-4 font-semibold">Full name</th>
            <th className="px-5 py-4 font-semibold">Email</th>
            <th className="px-5 py-4 font-semibold">Role</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-4 align-top text-slate-900">{user.username}</td>
              <td className="px-5 py-4 align-top text-slate-700">{user.fullName}</td>
              <td className="px-5 py-4 align-top text-slate-700">{user.email}</td>
              <td className="px-5 py-4 align-top">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-5 py-4 align-top">
                <StatusBadge status={user.status} />
              </td>
              <td className="flex gap-2 px-5 py-4">
                <Button onClick={() => onEdit(user)} variant="secondary" className="px-3 py-2 text-xs">
                  Edit
                </Button>
                <Button onClick={() => onDisable(user.id)} variant="ghost" className="px-3 py-2 text-xs" disabled={isLoading}>
                  Disable
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
