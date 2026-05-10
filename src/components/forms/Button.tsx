import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold transition ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
