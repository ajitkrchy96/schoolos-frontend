import { useDashboardQuery } from '../features/dashboard/useDashboardQuery'
import { DashboardSkeleton } from '../features/dashboard/DashboardSkeleton'
import { StatCard } from '../components/cards/StatCard'

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboardQuery()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
        <h2 className="text-xl font-semibold">Unable to load dashboard</h2>
        <p className="mt-3 text-sm text-rose-700">{error?.message ?? 'There was a problem fetching your dashboard data. Please refresh the page.'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-5 lg:grid-cols-2">
        <StatCard label="Total students" value={data.totalStudents} accent="bg-indigo-500" />
        <StatCard label="Present today" value={data.presentToday} accent="bg-emerald-500" />
        <StatCard label="Absent today" value={data.absentToday} accent="bg-rose-500" />
        <StatCard label="Pending fees" value={data.pendingFeesCount} accent="bg-amber-500" />
        <StatCard label="Collected" value={`$${data.totalCollectedAmount.toLocaleString()}`} accent="bg-sky-500" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <h2 className="text-lg font-semibold text-slate-900">Pending fee summary</h2>
          <p className="mt-3 text-sm text-slate-500">This captures the current fee backlog for the school.</p>
          <div className="mt-6 space-y-4 text-slate-700">
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
              <span className="text-sm">Pending invoices</span>
              <span className="font-semibold">{data.pendingFeesCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
              <span className="text-sm">Pending amount</span>
              <span className="font-semibold">${data.totalPendingAmount.toLocaleString()}</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 xl:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Operations overview</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Daily attendance</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{data.presentToday}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Today's absences</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{data.absentToday}</p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Revenue collected so far</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">${data.totalCollectedAmount.toLocaleString()}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
