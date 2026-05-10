import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../forms/Button'
import { TextInput } from '../forms/TextInput'
import { markAttendanceSchema, type MarkAttendanceValues } from '../../features/attendance/attendanceSchema'

interface MarkAttendanceModalProps {
  isOpen: boolean
  studentId?: string
  studentName?: string
  date: string
  onClose: () => void
  onSubmit: (payload: MarkAttendanceValues) => void
  isLoading?: boolean
}

export function MarkAttendanceModal({ isOpen, studentId, studentName, date, onClose, onSubmit, isLoading = false }: MarkAttendanceModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MarkAttendanceValues>({
    resolver: zodResolver(markAttendanceSchema),
    defaultValues: {
      studentId: studentId ?? '',
      date,
      status: 'PRESENT',
    },
  })

  useEffect(() => {
    reset({ studentId: studentId ?? '', date, status: 'PRESENT' })
  }, [date, studentId, reset])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Mark attendance</h2>
            <p className="text-sm text-slate-500">Record attendance for {studentName ?? 'a student'} on {date}.</p>
          </div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Student ID" value={studentId ?? ''} disabled {...register('studentId')} />
          <TextInput label="Date" type="date" {...register('date')} />
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Status</label>
            <select
              {...register('status')}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
            </select>
            {errors.status && <p className="text-sm text-rose-600">{errors.status.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving…' : 'Save attendance'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
