import { Button } from '../forms/Button'
import type { Student } from '../../types/student'

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
}

export function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Name</th>
            <th className="px-5 py-4 font-semibold">Admission</th>
            <th className="px-5 py-4 font-semibold">Class</th>
            <th className="px-5 py-4 font-semibold">Parent</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-4 align-top text-slate-700">
                <div className="font-semibold text-slate-900">{student.firstName} {student.lastName}</div>
                <div className="text-xs text-slate-500">{student.gender} • {student.dob}</div>
              </td>
              <td className="px-5 py-4 align-top text-slate-700">{student.admissionNo}</td>
              <td className="px-5 py-4 align-top text-slate-700">{student.classId}/{student.sectionId}</td>
              <td className="px-5 py-4 align-top text-slate-700">{student.fatherName}</td>
              <td className="px-5 py-4 align-top text-slate-700">{student.status}</td>
              <td className="px-5 py-4 align-top text-slate-700">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" type="button" onClick={() => onEdit(student)}>
                    Edit
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => onDelete(student)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
