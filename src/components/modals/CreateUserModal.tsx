import { useState } from 'react'
import { UserRole } from '../../types/user'
import { useCreateUserMutation } from '../../features/users/useUserQuery'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const [form, setForm] = useState({ username: '', email: '', fullName: '', password: '', role: UserRole.TEACHER })
  const [error, setError] = useState<string | null>(null)
  const createUserMutation = useCreateUserMutation()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      await createUserMutation.mutateAsync(form)
      setForm({ username: '', email: '', fullName: '', password: '', role: UserRole.TEACHER })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-slate-900">Create new user</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            type="text"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="johndoe"
            required
          />
          <TextInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
            required
          />
          <TextInput
            label="Full name"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="John Doe"
            required
          />
          <TextInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="••••••••"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as UserRole }))}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value={UserRole.TEACHER}>Teacher</option>
              <option value={UserRole.ADMIN}>Admin</option>
            </select>
          </div>
          {error && <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? 'Creating...' : 'Create user'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
