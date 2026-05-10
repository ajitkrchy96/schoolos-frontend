import { useState } from 'react'
import { User } from '../types/user'
import { useUsersQuery, useDisableUserMutation } from '../features/users/useUserQuery'
import { useAuthStore } from '../store/authStore'
import { UserTable } from '../components/tables/UserTable'
import { CreateUserModal } from '../components/modals/CreateUserModal'
import { EditUserModal } from '../components/modals/EditUserModal'
import { Button } from '../components/forms/Button'
import { DashboardSkeleton } from '../features/dashboard/DashboardSkeleton'

export default function UsersPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const userRole = useAuthStore((state) => state.role)
  const { data, isLoading, isError } = useUsersQuery(1, 10, searchTerm)
  const disableUserMutation = useDisableUserMutation()

  // Only admins can access this page
  if (userRole !== 'ADMIN') {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
        <h2 className="text-xl font-semibold">Access denied</h2>
        <p className="mt-2 text-sm text-rose-700">You do not have permission to manage users.</p>
      </div>
    )
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
        <h2 className="text-xl font-semibold">Unable to load users</h2>
        <p className="mt-2 text-sm text-rose-700">There was a problem fetching the users list. Please try again.</p>
      </div>
    )
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const handleDisable = async (userId: string) => {
    if (confirm('Are you sure you want to disable this user?')) {
      try {
        await disableUserMutation.mutateAsync(userId)
      } catch (err) {
        console.error('Failed to disable user:', err)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Users</h2>
          <p className="text-sm text-slate-500">Manage school staff, assign roles, and control access.</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>Add user</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username, email, or name"
          className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <UserTable users={data.items} onEdit={handleEdit} onDisable={handleDisable} isLoading={disableUserMutation.isPending} />

      <CreateUserModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />

      <EditUserModal isOpen={editModalOpen} user={selectedUser} onClose={() => setEditModalOpen(false)} />
    </div>
  )
}
