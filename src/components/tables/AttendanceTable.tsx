import type { AttendanceRecord } from '../../types/attendance'
import { Button } from '../forms/Button'

interface AttendanceTableProps {
  records: AttendanceRecord[]
  onMark: (record: AttendanceRecord) => void
}

export function AttendanceTable({ records, onMark }: AttendanceTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Student</th>
            <th className="px-5 py-4 font-semibold">Date</th>
            <th className="px-5 py-4 font-semibold">Class</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.attendanceId ?? record.studentId} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-4 align-top text-slate-700">{record.studentName}</td>
              <td className="px-5 py-4 align-top text-slate-700">{record.date}</td>
              <td className="px-5 py-4 align-top text-slate-700">{record.className}</td>
              <td className="px-5 py-4 align-top">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    record.status === 'PRESENT'
                      ? 'bg-emerald-100 text-emerald-700'
                      : record.status === 'ABSENT'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {record.status ?? 'Not Marked'}
                </span>
              </td>
              <td className="px-5 py-4 align-top text-slate-700">
                <Button variant="secondary" type="button" onClick={() => onMark(record)}>
                  {record.attendanceId == null ? 'Mark' : 'Update'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
