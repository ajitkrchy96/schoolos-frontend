export interface NotificationItem {
  id: string
  title: string
  category: 'Fee' | 'Attendance' | 'General'
  status: 'Sent' | 'Failed' | 'Draft'
  createdAt: string
}
