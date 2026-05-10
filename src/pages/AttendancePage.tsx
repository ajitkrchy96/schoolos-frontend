import { useQuery } from '@tanstack/react-query'
import type { AttendanceRecord, AttendanceSummary } from '../types/attendance'
import { attendanceService } from '../features/attendance/attendanceService'
import { DataTable } from '../components/tables/DataTable'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Button } from '../components/forms/Button'

export default function AttendancePage() {
  const { data, isLoading, isError } = useQuery<{ records: AttendanceRecord[]; summary: AttendanceSummary }>({
    queryKey: ['attendance'],
    queryFn: attendanceService.fetchAttendance,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Attendance</h2>
          <p className="text-sm text-slate-500">Track student presence, absence, and attendance status.</p>
        </div>
        <Button type="button">Mark attendance</Button>
      </div>

      {isError ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700">Unable to load attendance records.</div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div>
            <DataTable
              columns={[
                { label: 'Student', accessor: 'studentName' },
                { label: 'Date', accessor: 'date' },
                { label: 'Status', accessor: 'status' },
                { label: 'Class', accessor: 'className' },
              ]}
              data={data?.records ?? []}
              emptyMessage="No attendance records found."
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <h3 className="text-lg font-semibold text-slate-900">Summary</h3>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p>Present: {data?.summary.present ?? 0}</p>
              <p>Absent: {data?.summary.absent ?? 0}</p>
              <p>Late: {data?.summary.late ?? 0}</p>
              <p>Total: {data?.summary.total ?? 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
