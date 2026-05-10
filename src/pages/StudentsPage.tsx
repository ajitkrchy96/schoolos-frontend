import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { Student } from '../types/student'
import { studentService } from '../features/students/studentService'
import { DataTable } from '../components/tables/DataTable'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Button } from '../components/forms/Button'

export default function StudentsPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useQuery<{ items: Student[]; total: number }>({
    queryKey: ['students', search],
    queryFn: () => studentService.fetchStudents({ search, page: 1, pageSize: 10 }),
  })

  const tableData = useMemo(() => data?.items ?? [], [data])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Students</h2>
          <p className="text-sm text-slate-500">Manage student records, filters, and enrollment details.</p>
        </div>
        <Button type="button">Add student</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search students"
          className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      {isError ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700">Unable to load student list.</div>
      ) : (
        <DataTable<Student>
          columns={[
            { label: 'Name', accessor: 'firstName' },
            { label: 'Grade', accessor: 'grade' },
            { label: 'Section', accessor: 'section' },
            { label: 'Roll', accessor: 'rollNumber' },
            { label: 'Status', accessor: 'status' },
          ]}
          data={tableData}
          emptyMessage="No students match your criteria."
        />
      )}
    </div>
  )
}
