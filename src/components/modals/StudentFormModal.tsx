import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'
import { studentSchema, type StudentFormValues } from '../../features/students/studentSchema'

interface StudentFormModalProps {
  isOpen: boolean
  title: string
  submitLabel: string
  initialValues?: StudentFormValues
  isSubmitting?: boolean
  onClose: () => void
  onSubmit: (payload: StudentFormValues) => void
}

export function StudentFormModal({
  isOpen,
  title,
  submitLabel,
  initialValues,
  isSubmitting = false,
  onClose,
  onSubmit,
}: StudentFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: 'Male',
      dob: '',
      admissionNo: '',
      phone: '',
      classId: '',
      sectionId: '',
      fatherName: '',
      motherName: '',
      parentPhone: '',
      parentEmail: '',
      parentAddress: '',
      status: 'ACTIVE',
    },
  })

  useEffect(() => {
    reset(initialValues ?? {
      firstName: '',
      lastName: '',
      gender: 'Male',
      dob: '',
      admissionNo: '',
      phone: '',
      classId: '',
      sectionId: '',
      fatherName: '',
      motherName: '',
      parentPhone: '',
      parentEmail: '',
      parentAddress: '',
      status: 'ACTIVE',
    })
  }, [initialValues, reset])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">Complete the form to save the student record.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="First name" error={errors.firstName?.message} {...register('firstName')} />
          <TextInput label="Last name" error={errors.lastName?.message} {...register('lastName')} />
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Gender</label>
            <select
              {...register('gender')}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <TextInput label="Date of birth" type="date" error={errors.dob?.message} {...register('dob')} />
          <TextInput label="Admission No." error={errors.admissionNo?.message} {...register('admissionNo')} />
          <TextInput label="Phone" error={errors.phone?.message} {...register('phone')} />
          <TextInput label="Class ID" error={errors.classId?.message} {...register('classId')} />
          <TextInput label="Section ID" error={errors.sectionId?.message} {...register('sectionId')} />
          <TextInput label="Father's name" error={errors.fatherName?.message} {...register('fatherName')} />
          <TextInput label="Mother's name" error={errors.motherName?.message} {...register('motherName')} />
          <TextInput label="Parent phone" error={errors.parentPhone?.message} {...register('parentPhone')} />
          <TextInput label="Parent email" type="email" error={errors.parentEmail?.message} {...register('parentEmail')} />
          <TextInput label="Parent address" error={errors.parentAddress?.message} {...register('parentAddress')} />
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Status</label>
            <select
              {...register('status')}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <button className="rounded-3xl border border-slate-300 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50" type="button" onClick={onClose}>
              Cancel
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
