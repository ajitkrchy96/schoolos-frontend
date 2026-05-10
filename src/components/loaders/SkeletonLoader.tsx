export function SkeletonLoader() {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-950/5">
      <div className="h-4 w-1/3 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-3">
        <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-200" />
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  )
}
