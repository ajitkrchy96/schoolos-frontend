interface ConfirmModalProps {
  title: string
  message: string
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export function ConfirmModal({
  title,
  message,
  isOpen,
  onCancel,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ConfirmModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-8 flex justify-end gap-3">
          <button className="rounded-3xl border border-slate-300 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
