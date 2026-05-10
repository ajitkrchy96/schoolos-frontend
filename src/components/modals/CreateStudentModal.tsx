import type { StudentFormValues } from '../../features/students/studentSchema'
import { StudentFormModal } from './StudentFormModal'

interface CreateStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: StudentFormValues) => void
  isSubmitting?: boolean
}

export function CreateStudentModal({ isOpen, onClose, onCreate, isSubmitting = false }: CreateStudentModalProps) {
  return (
    <StudentFormModal
      isOpen={isOpen}
      title="Add student"
      submitLabel="Create student"
      onClose={onClose}
      onSubmit={onCreate}
      isSubmitting={isSubmitting}
    />
  )
}
