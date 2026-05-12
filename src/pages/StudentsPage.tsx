import { useMemo, useState } from 'react'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Button } from '../components/forms/Button'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { Pagination } from '../components/common/Pagination'
import { CreateStudentModal } from '../components/modals/CreateStudentModal'
import { EditStudentModal } from '../components/modals/EditStudentModal'
import { DeleteStudentDialog } from '../components/modals/DeleteStudentDialog'
import { StudentTable } from '../components/tables/StudentTable'
import { useCreateStudentMutation, useDeleteStudentMutation, useStudentsQuery, useUpdateStudentMutation } from '../features/students/useStudentQuery'
import type { Student } from '../types/student'

const PAGE_SIZE = 10

export default function StudentsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const debouncedSearch = useDebouncedValue(search, 300)
  const { data, isLoading, isError, error } = useStudentsQuery(page, PAGE_SIZE, debouncedSearch)
  const createMutation = useCreateStudentMutation()
  const updateMutation = useUpdateStudentMutation()
  const deleteMutation = useDeleteStudentMutation()

  const students = useMemo(() => data?.content ?? [], [data])

  const totalPages = Math.max(
    1,
    Math.ceil((data?.totalElements ?? 0) / PAGE_SIZE),
  )

  const handleCreate = async (payload: Omit<Student, 'id'>) => {
    // await createMutation.mutateAsync(payload)
    await createMutation.mutateAsync({
    ...payload,
    schoolId: 1,
    })
    setIsCreateOpen(false)
    setPage(1)
  }

  const handleUpdate = async (payload: Omit<Student, 'id'>) => {
    if (!selectedStudent) return
    await updateMutation.mutateAsync({ studentId: selectedStudent.id, 
      payload: {
      ...payload,
      schoolId: 1,
    }, })
    setIsEditOpen(false)
    setSelectedStudent(null)
  }

  const handleDelete = async () => {
    if (!selectedStudent) return
    await deleteMutation.mutateAsync(selectedStudent.id)
    setIsDeleteOpen(false)
    setSelectedStudent(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Students</h2>
          <p className="text-sm text-slate-500">Manage student records, filters, and enrollment details.</p>
        </div>
        <Button type="button" onClick={() => setIsCreateOpen(true)}>
          Add student
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            setPage(0)
          }}
          placeholder="Search students"
          className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
          <h3 className="text-lg font-semibold">Unable to load students</h3>
          <p className="mt-2 text-sm text-rose-700">{error instanceof Error ? error.message : 'There was a problem fetching records.'}</p>
        </div>
      ) : students.length === 0 ? (
        <EmptyState title="No students found" description="Try a different search or add a new student." />
      ) : (
        <>
          <StudentTable
            students={students}
            onEdit={(student) => {
              setSelectedStudent(student)
              setIsEditOpen(true)
            }}
            onDelete={(student) => {
              setSelectedStudent(student)
              setIsDeleteOpen(true)
            }}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <CreateStudentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        isSubmitting={createMutation.isPending}
      />
      <EditStudentModal
        isOpen={isEditOpen}
        student={selectedStudent}
        onClose={() => {
          setIsEditOpen(false)
          setSelectedStudent(null)
        }}
        onUpdate={handleUpdate}
        isSubmitting={updateMutation.isPending}
      />
      <DeleteStudentDialog
        isOpen={isDeleteOpen}
        studentName={selectedStudent?.firstName ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'this student'}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
