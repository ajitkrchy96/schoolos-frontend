export function LoadingSpinner() {
  return (
    <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-slate-500">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        <span>Loading data...</span>
      </div>
    </div>
  )
}
