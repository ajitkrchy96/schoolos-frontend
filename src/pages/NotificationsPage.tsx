import { useQuery } from '@tanstack/react-query'
import type { NotificationItem } from '../types/notification'
import { notificationService } from '../features/notifications/notificationService'
import { DataTable } from '../components/tables/DataTable'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Button } from '../components/forms/Button'

export default function NotificationsPage() {
  const { data, isLoading, isError } = useQuery<{ items: NotificationItem[] }>({
    queryKey: ['notifications'],
    queryFn: notificationService.fetchNotifications,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500">Monitor notification history and send reminders.</p>
        </div>
        <Button type="button">Send alert</Button>
      </div>

      {isError ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-700">Unable to load notifications.</div>
      ) : (
        <DataTable
          columns={[
            { label: 'Title', accessor: 'title' },
            { label: 'Category', accessor: 'category' },
            { label: 'Status', accessor: 'status' },
            { label: 'Date', accessor: 'createdAt' },
          ]}
          data={data?.items ?? []}
          emptyMessage="You have no notifications yet."
        />
      )}
    </div>
  )
}
