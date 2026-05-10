import axiosClient from '../../api/axiosClient'
import type { NotificationItem } from '../../types/notification'

export const notificationService = {
  fetchNotifications: async () => {
    const response = await axiosClient.get<{ items: NotificationItem[] }>('/notifications')
    return response.data
  },
  sendReminder: async (payload: { title: string; message: string; category: string }) => {
    const response = await axiosClient.post('/notifications/send', payload)
    return response.data
  },
}
