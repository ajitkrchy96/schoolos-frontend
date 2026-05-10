import { type InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextInput({ label, error, className = '', ...props }: TextInputProps) {
  return (
    <label className={`block text-sm font-medium text-slate-700 ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <input
        {...props}
        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      {error && <span className="mt-2 block text-xs text-rose-600">{error}</span>}
    </label>
  )
}
