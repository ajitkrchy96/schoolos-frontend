interface StatCardProps {
  label: string
  value: string | number
  accent?: string
  description?: string
}

export function StatCard({ label, value, accent = 'bg-indigo-500', description }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{label}</p>
        <div className={`h-3 w-16 rounded-full ${accent}`} />
      </div>
      <p className="mt-5 text-4xl font-semibold text-slate-900">{value}</p>
      {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
    </div>
  )
}
