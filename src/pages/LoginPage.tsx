import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../features/auth/authService'
import { Button } from '../components/forms/Button'
import { TextInput } from '../components/forms/TextInput'

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    console.log('[LoginPage] handleSubmit')

    try {
      const response = await authService.login({ username: form.username, password: form.password })
      setAuth(response)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      
      console.error('[LoginPage] login error', err)
      const message = err instanceof Error ? err.message : 'Unable to sign in'
      //alert('LOGIN CLICKED ERROR '+ message)
      setError(message === 'Network Error' ? 'Unable to reach the authentication service.' : message)
    } finally {
      setLoading(false)
      //alert('LOGIN CLICKED END')
    }
  }

  return (
    <div className="rounded-3xl bg-slate-950 p-8 shadow-2xl shadow-slate-950/20">
      <h2 className="text-3xl font-semibold text-white">Welcome back</h2>
      <p className="mt-2 text-slate-400">Login to manage your school operations with SchoolOS.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          type="text"
          value={form.username}
          onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
          placeholder="admin"
        />
        <TextInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="••••••••"
        />
        {error && <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
