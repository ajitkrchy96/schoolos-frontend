import { type ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">SchoolOS</h1>
          <p className="mt-2 text-slate-400">Secure enterprise access for school administrators and staff.</p>
        </div>
        {children}
      </div>
    </div>
  )
}
