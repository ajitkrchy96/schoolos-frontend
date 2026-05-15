import { useMemo, useState } from 'react'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { Pagination } from '../components/common/Pagination'
import { StudentStatusTable } from '../components/tables/StudentStatusTable'
import {
  useActiveStudentsQuery,
  useInactiveStudentsQuery,
} from '../hooks/students/useStudentStatusQuery'
import { useUpdateStudentStatusMutation } from '../hooks/students/useUpdateStudentStatusMutation'

const PAGE_SIZE = 10

type Tab = 'active' | 'inactive'

export default function StudentStatusManagementPage() {
  const [activeTab, setActiveTab] = useState<Tab>('active')
  const [activePage, setActivePage] = useState(1)
  const [inactivePage, setInactivePage] = useState(1)

  const activeQuery = useActiveStudentsQuery(activePage - 1, PAGE_SIZE)
  const inactiveQuery = useInactiveStudentsQuery(inactivePage - 1, PAGE_SIZE)
  const statusMutation = useUpdateStudentStatusMutation()

  const currentQuery = activeTab === 'active' ? activeQuery : inactiveQuery
  const currentPage = activeTab === 'active' ? activePage : inactivePage
  const setCurrentPage = activeTab === 'active' ? setActivePage : setInactivePage

  const students = useMemo(() => currentQuery.data?.content ?? [], [currentQuery.data])
  const totalPages = Math.max(1, Math.ceil((currentQuery.data?.totalElements ?? 0) / PAGE_SIZE))

  const handleStatusChange = async (studentId: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    try {
      await statusMutation.mutateAsync({ studentId, status: newStatus })
    } catch (error) {
      console.error('Failed to update student status:', error)
    }
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'active', label: 'Active Students' },
    { id: 'inactive', label: 'Inactive Students' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Student Status Management</h2>
          <p className="text-sm text-slate-500">Activate or deactivate student accounts.</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (tab.id === 'active') {
                setActivePage(1)
              } else {
                setInactivePage(1)
              }
            }}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === tab.id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {currentQuery.isLoading ? (
        <LoadingSpinner />
      ) : currentQuery.isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
          <h3 className="text-lg font-semibold">Unable to load students</h3>
          <p className="mt-2 text-sm text-rose-700">There was a problem fetching the student list.</p>
        </div>
      ) : students.length === 0 ? (
        <EmptyState
          title={activeTab === 'active' ? 'No active students' : 'No inactive students'}
          description={
            activeTab === 'active'
              ? 'All students are currently inactive.'
              : 'No students are currently inactive.'
          }
        />
      ) : (
        <>
          <StudentStatusTable
            students={students}
            isLoading={statusMutation.isPending}
            onStatusChange={handleStatusChange}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  )
}
