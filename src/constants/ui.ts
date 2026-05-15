import {
  Dashboard as DashboardIcon,
  School as StudentsIcon,
  Paid as FeesIcon,
  CalendarToday as AttendanceIcon,
  Notifications as NotificationsIcon,
  People as UsersIcon,
  PersonOff as StudentStatusIcon,
} from '@mui/icons-material'

export const SIDEBAR_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Users',
    path: '/users',
    icon: UsersIcon,
    adminOnly: true,
  },
  {
    label: 'Students',
    path: '/students',
    icon: StudentsIcon,
  },
  {
    label: 'Student Status',
    path: '/student-status',
    icon: StudentStatusIcon,
  },
  {
    label: 'Fees',
    path: '/fees',
    icon: FeesIcon,
  },
  {
    label: 'Attendance',
    path: '/attendance',
    icon: AttendanceIcon,
  },
  {
    label: 'Notifications',
    path: '/notifications',
    icon: NotificationsIcon,
  },
]
