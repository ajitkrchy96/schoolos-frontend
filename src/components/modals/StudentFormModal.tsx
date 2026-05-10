import { useState } from 'react'
import type { Student } from '../../types/student'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'

interface StudentFormModalProps {
  isOpen: boolean
  student?: Student
  onClose: () => void
  onSave: (payload: Omit<Student, 'id'>) => void
}

export function StudentFormModal({ isOpen, student, onClose, onSave }: StudentFormModalProps) {
  const [form, setForm] = useState<Omit<Student, 'id'>>({
    firstName: student?.firstName ?? '',
    lastName: student?.lastName ?? '',
    grade: student?.grade ?? '',
    section: student?.section ?? '',
    rollNumber: student?.rollNumber ?? '',
    status: student?.status ?? 'Active',
  })

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{student ? 'Edit Student' : 'Add Student'}</h2>
            <p className="text-sm text-slate-500">Complete the form to save the student record.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <TextInput
            label="First name"
            value={form.firstName}
            onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
          />
          <TextInput
            label="Last name"
            value={form.lastName}
            onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
          />
          <TextInput
            label="Grade"
            value={form.grade}
            onChange={(event) => setForm((prev) => ({ ...prev, grade: event.target.value }))}
          />
          <TextInput
            label="Section"
            value={form.section}
            onChange={(event) => setForm((prev) => ({ ...prev, section: event.target.value }))}
          />
          <TextInput
            label="Roll number"
            value={form.rollNumber}
            onChange={(event) => setForm((prev) => ({ ...prev, rollNumber: event.target.value }))}
          />
          <TextInput
            label="Status"
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as 'Active' | 'Inactive' }))}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button className="rounded-3xl border border-slate-300 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50" onClick={onClose}>
            Cancel
          </button>
          <Button type="button" onClick={() => onSave(form)}>
            Save student
          </Button>
        </div>
      </div>
    </div>
  )
}
