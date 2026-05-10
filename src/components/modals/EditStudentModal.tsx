import type { Student } from '../../types/student'
import type { StudentFormValues } from '../../features/students/studentSchema'
import { StudentFormModal } from './StudentFormModal'

interface EditStudentModalProps {
  isOpen: boolean
  student: Student | null
  onClose: () => void
  onUpdate: (payload: StudentFormValues) => void
  isSubmitting?: boolean
}

export function EditStudentModal({ isOpen, student, onClose, onUpdate, isSubmitting = false }: EditStudentModalProps) {
  if (!student) {
    return null
  }

  return (
    <StudentFormModal
      isOpen={isOpen}
      title="Edit student"
      submitLabel="Update student"
      initialValues={{
        firstName: student.firstName,
        lastName: student.lastName,
        gender: student.gender,
        dob: student.dob,
        admissionNo: student.admissionNo,
        phone: student.phone,
        classId: student.classId,
        sectionId: student.sectionId,
        fatherName: student.fatherName,
        motherName: student.motherName,
        parentPhone: student.parentPhone,
        parentEmail: student.parentEmail,
        parentAddress: student.parentAddress,
        status: student.status,
      }}
      onClose={onClose}
      onSubmit={onUpdate}
      isSubmitting={isSubmitting}
    />
  )
}
