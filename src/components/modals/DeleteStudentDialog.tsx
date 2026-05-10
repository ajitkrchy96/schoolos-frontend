import { ConfirmModal } from './ConfirmModal'

interface DeleteStudentDialogProps {
  isOpen: boolean
  studentName: string
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteStudentDialog({ isOpen, studentName, onClose, onConfirm, isLoading = false }: DeleteStudentDialogProps) {
  return (
    <ConfirmModal
      title="Delete student"
      message={`Are you sure you want to delete ${studentName}? This action cannot be undone.`}
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={onConfirm}
      confirmLabel={isLoading ? 'Deleting...' : 'Delete'}
      cancelLabel="Cancel"
    />
  )
}
