import { type ReactNode, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { SIDEBAR_ITEMS } from '../constants/ui'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const role = useAuthStore((state) => state.role)
  const logout = useAuthStore((state) => state.logout)

  const breadcrumb = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean)
    return parts.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' / ')
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`z-20 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
          <div className="flex h-20 items-center justify-between px-5 py-4">
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight">SchoolOS</p>
              {!collapsed && <p className="text-xs text-slate-500">Enterprise portal</p>}
            </div>
            <button
              type="button"
              className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
              onClick={() => setCollapsed((value) => !value)}
            >
              {collapsed ? '➜' : '←'}
            </button>
          </div>

          <nav className="flex-1 px-2 py-4">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">{user?.name?.charAt(0)}</div>
              {!collapsed && (
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">{user?.name ?? 'Admin User'}</p>
                  <p className="text-xs text-slate-500">{role ?? 'Administrator'}</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                type="button"
                onClick={logout}
                className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 shadow-sm shadow-slate-950/5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Workspace</p>
                <h1 className="text-xl font-semibold text-slate-900">{breadcrumb || 'Dashboard'}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-950/5 sm:flex">
                  <span className="text-slate-600">Quick action</span>
                  <button className="rounded-xl bg-indigo-600 px-3 py-2 text-sm text-white transition hover:bg-indigo-500">
                    New message
                  </button>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Team view active</div>
              </div>
            </div>
          </header>

          <section className="p-6">{children}</section>
        </main>
      </div>
    </div>
  )
}
