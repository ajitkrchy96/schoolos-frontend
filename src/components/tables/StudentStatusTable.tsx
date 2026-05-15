import type { Student } from '../../types/student'
import { StudentStatusActionButton } from '../buttons/StudentStatusActionButton'

interface StudentStatusTableProps {
  students: Student[]
  isLoading: boolean
  onStatusChange: (studentId: string, newStatus: 'ACTIVE' | 'INACTIVE') => void
}

export function StudentStatusTable({ students, isLoading, onStatusChange }: StudentStatusTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Name</th>
            <th className="px-5 py-4 font-semibold">Admission No.</th>
            <th className="px-5 py-4 font-semibold">Class</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-4 align-top text-slate-700">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-5 py-4 align-top text-slate-700">{student.admissionNo}</td>
              <td className="px-5 py-4 align-top text-slate-700">{student.classId}</td>
              <td className="px-5 py-4 align-top">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    student.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {student.status}
                </span>
              </td>
              <td className="px-5 py-4 align-top">
                <StudentStatusActionButton
                  student={student}
                  isLoading={isLoading}
                  onStatusChange={onStatusChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
