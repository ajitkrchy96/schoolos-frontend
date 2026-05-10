interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6">{description}</p>
    </div>
  )
}
