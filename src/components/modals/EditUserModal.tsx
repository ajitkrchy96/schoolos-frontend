import { useState, useEffect } from 'react'
import { User, UserRole } from '../../types/user'
import { useUpdateUserMutation, useResetPasswordMutation } from '../../features/users/useUserQuery'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'

interface EditUserModalProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
}

export function EditUserModal({ isOpen, user, onClose }: EditUserModalProps) {
  const [form, setForm] = useState({ email: '', fullName: '', role: UserRole.TEACHER })
  const [resetPassword, setResetPassword] = useState('')
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const updateUserMutation = useUpdateUserMutation()
  const resetPasswordMutation = useResetPasswordMutation()

  useEffect(() => {
    if (user) {
      setForm({ email: user.email, fullName: user.fullName, role: user.role })
      setResetPassword('')
      setShowResetPassword(false)
    }
  }, [user])

  if (!isOpen || !user) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      await updateUserMutation.mutateAsync({
        userId: user.id,
        payload: form,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
    }
  }

  const handleResetPassword = async () => {
    if (!resetPassword.trim()) {
      setError('Password cannot be empty')
      return
    }

    try {
      await resetPasswordMutation.mutateAsync({ userId: user.id, newPassword: resetPassword })
      setResetPassword('')
      setShowResetPassword(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-slate-900">Edit user: {user.username}</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <TextInput
            label="Full name"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="John Doe"
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

          {showResetPassword && (
            <div className="space-y-2 rounded-3xl border border-amber-200 bg-amber-50 p-4">
              <label className="block text-sm font-semibold text-slate-800">New password</label>
              <TextInput
                type="password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button
                type="button"
                onClick={handleResetPassword}
                className="w-full"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset password'}
              </Button>
            </div>
          )}

          {error && <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowResetPassword(!showResetPassword)}>
              {showResetPassword ? 'Cancel password reset' : 'Reset password'}
            </Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className="flex-1" disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
