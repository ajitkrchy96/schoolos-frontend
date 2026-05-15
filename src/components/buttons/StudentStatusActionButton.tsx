import type { Student } from '../../types/student'
import { Button } from '../forms/Button'

interface StudentStatusActionButtonProps {
  student: Student
  isLoading: boolean
  onStatusChange: (studentId: string, newStatus: 'ACTIVE' | 'INACTIVE') => void
}

export function StudentStatusActionButton({
  student,
  isLoading,
  onStatusChange,
}: StudentStatusActionButtonProps) {
  const isActive = student.status === 'ACTIVE'

  return (
    <Button
      variant={isActive ? 'secondary' : 'primary'}
      onClick={() => onStatusChange(student.id, isActive ? 'INACTIVE' : 'ACTIVE')}
      disabled={isLoading}
      className="text-xs"
    >
      {isLoading ? 'Updating...' : isActive ? 'Deactivate' : 'Activate'}
    </Button>
  )
}
