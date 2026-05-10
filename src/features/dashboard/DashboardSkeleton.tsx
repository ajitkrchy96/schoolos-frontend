export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-5 lg:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6">
            <div className="h-5 w-32 rounded-full bg-slate-200" />
            <div className="mt-6 h-10 w-3/4 rounded-3xl bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6">
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6">
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
