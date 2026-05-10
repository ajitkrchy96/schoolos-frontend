import { useMemo, useState } from 'react'
import { useAttendanceByDateQuery, useAttendanceSummaryQuery, useMarkAttendanceMutation } from '../features/attendance/useAttendanceQuery'
import { AttendanceTable } from '../components/tables/AttendanceTable'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { Button } from '../components/forms/Button'
import { StatCard } from '../components/cards/StatCard'
import { MarkAttendanceModal } from '../components/modals/MarkAttendanceModal'
import type { AttendanceRecord } from '../types/attendance'

const DEFAULT_DATE = new Date().toISOString().slice(0, 10)

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DATE)
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null)
  const [isMarkOpen, setIsMarkOpen] = useState(false)

  const summaryQuery = useAttendanceSummaryQuery(selectedDate)
  const attendanceQuery = useAttendanceByDateQuery(selectedDate)
  const markAttendanceMutation = useMarkAttendanceMutation()

  const records = useMemo(() => attendanceQuery.data?.records ?? [], [attendanceQuery.data])

  const handleMarkAttendance = async (payload: { studentId: string; date: string; status: 'PRESENT' | 'ABSENT' }) => {
    await markAttendanceMutation.mutateAsync(payload)
    setIsMarkOpen(false)
    setSelectedRecord(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Attendance</h2>
          <p className="text-sm text-slate-500">Track student attendance, filter by date, and update records.</p>
        </div>
        <Button type="button" onClick={() => setIsMarkOpen(true)}>
          Mark attendance
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block text-sm font-semibold text-slate-800">Select date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Showing attendance for</p>
          <p className="mt-2 font-semibold text-slate-900">{selectedDate}</p>
        </div>
      </div>

      {attendanceQuery.isLoading || summaryQuery.isLoading ? (
        <LoadingSpinner />
      ) : attendanceQuery.isError || summaryQuery.isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
          <h3 className="text-lg font-semibold">Unable to load attendance</h3>
          <p className="mt-2 text-sm text-rose-700">There was a problem fetching attendance records for the selected date.</p>
        </div>
      ) : records.length === 0 ? (
        <EmptyState title="No attendance records" description="No attendance has been recorded for this date yet." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <AttendanceTable
            records={records}
            onMark={(record) => {
              setSelectedRecord(record)
              setIsMarkOpen(true)
            }}
          />
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <h3 className="text-lg font-semibold text-slate-900">Summary</h3>
            <div className="mt-6 grid gap-4">
              <StatCard label="Present" value={summaryQuery.data?.present ?? 0} accent="bg-emerald-500" />
              <StatCard label="Absent" value={summaryQuery.data?.absent ?? 0} accent="bg-rose-500" />
              <StatCard label="Total" value={summaryQuery.data?.total ?? 0} accent="bg-slate-500" />
            </div>
          </div>
        </div>
      )}

      <MarkAttendanceModal
        isOpen={isMarkOpen}
        studentId={selectedRecord?.studentId}
        studentName={selectedRecord?.studentName}
        date={selectedDate}
        onClose={() => {
          setIsMarkOpen(false)
          setSelectedRecord(null)
        }}
        onSubmit={handleMarkAttendance}
        isLoading={markAttendanceMutation.isPending}
      />
    </div>
  )
}
