import { type SelectHTMLAttributes } from 'react'

interface SelectOption {
  id: number | string
  name: string
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string
  options: SelectOption[]
  isLoading?: boolean
  isError?: boolean
  error?: string
  placeholder?: string
}

export function FormSelect({
  label,
  options,
  isLoading = false,
  isError = false,
  error,
  placeholder = 'Select an option',
  className = '',
  ...props
}: FormSelectProps) {
  if (isLoading) {
    return (
      <label className={`block text-sm font-medium text-slate-700 ${className}`}>
        <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
        <div className="h-12 w-full animate-pulse rounded-3xl bg-slate-200" />
      </label>
    )
  }

  return (
    <label className={`block text-sm font-medium text-slate-700 ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <select
        {...props}
        className={`w-full rounded-3xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
          isError ? 'border-rose-300' : 'border-slate-300'
        } ${props.disabled ? 'cursor-not-allowed bg-slate-50' : ''} ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className="mt-2 block text-xs text-rose-600">{error}</span>}
      {isError && !error && <span className="mt-2 block text-xs text-rose-600">Failed to load options</span>}
    </label>
  )
}