# Project Overview

SchoolOS is a React + TypeScript frontend for a school management system. The current implementation is focused on enterprise-grade administration workflows for students, attendance, fees, and student status management. It targets a backend API at `http://localhost:8080/api` and is designed to be a single-page application with authenticated admin access.

# Tech Stack

- React 19.2.5
- TypeScript 6.0.2
- Vite 8.0.11
- Tailwind CSS 4.3.0
- React Router DOM 7
- React Query 5 (@tanstack/react-query)
- Axios 1.6.0
- Zod 4.x
- react-hook-form 7.x
- Zustand 4.5.0
- MUI icons / material for iconography
- ESLint and TypeScript for static checks

# Frontend Architecture

The app is structured into feature modules, reusable UI components, hooks, layouts, pages, services, and API type definitions.

- `src/pages/` contains route-level screens.
- `src/components/` contains reusable UI primitives and modal implementations.
- `src/features/` contains feature-specific services, query hooks, and validation schemas.
- `src/hooks/` contains custom hooks such as debounced input and data-fetching helpers.
- `src/services/` contains cross-cutting service modules like student status.
- `src/types/` contains DTO and contract types for API payloads.
- `src/api/axiosClient.ts` centralizes Axios configuration.
- `src/routes/` defines protected route wrappers and route structure.
- `src/store/` contains Zustand auth persistence.

# Backend Architecture

The frontend expects a REST backend with the following patterns:

- Base URL from `VITE_API_BASE_URL` or fallback to `http://localhost:8080/api`
- School-scoped endpoints under `/schools/1/...`
- Standard paginated list endpoints with `page`, `size`, and search params
- Authentication via `/auth/login`
- JSON request/response contract shape

The frontend is currently coupled to a single hardcoded school ID: `1`.

# Authentication Flow

- `LoginPage` submits `username` and `password` to `authService.login()`.
- Successful login response is stored in Zustand auth store (`useAuthStore`).
- Auth store persists `accessToken`, `user`, `role`, and `isAuthenticated` to local storage.
- `ProtectedRoute` blocks unauthenticated access and redirects to `/login`.
- `RoleProtectedRoute` restricts `/users` to the `ADMIN` role.
- `AdminLayout` displays the authenticated admin UI and provides a logout button.

# Axios Client Configuration

- Centralized Axios instance in `src/api/axiosClient.ts`
- Base URL set from environment or fallback to `http://localhost:8080/api`
- Common headers: `Content-Type: application/json`, `Accept: application/json`
- 15 second timeout
- Request interceptor injects `Authorization: Bearer <token>` when a token exists in auth store
- Response interceptor extracts backend error messages and converts them to `Error`
- 401 response handling is detected and logged, but automatic logout is currently disabled for development

# React Query Usage

React Query is used for data fetching, caching, and mutation state across features.

- Query keys are feature-scoped and include relevant dimensions like `page`, `search`, and `date`
- Queries use `staleTime` and retry strategies
- Mutations invalidate related query keys to keep UI fresh
- `useQueryClient` is used for invalidation after successful changes

# Routing Structure

Routes are defined in `src/routes/AppRoutes.tsx`:

- `/login` → `LoginPage` wrapped by `AuthLayout`
- `/dashboard` → `DashboardPage`
- `/users` → `UsersPage` protected by `RoleProtectedRoute(requiredRole="ADMIN")`
- `/students` → `StudentsPage`
- `/student-status` → `StudentStatusManagementPage`
- `/fees` → `FeesPage`
- `/attendance` → `AttendancePage`
- `/notifications` → `NotificationsPage`
- wildcard `*` redirects to `/dashboard`

# Layout Structure

- `AuthLayout` provides a centered login container with dark styling.
- `AdminLayout` provides the authenticated admin shell with:
  - collapsible sidebar navigation
  - breadcrumb-style page title
  - top header actions
  - user profile card and logout control

# Students Module

The Students feature includes:

- `studentService` for REST interactions:
  - `fetchStudents`
  - `fetchStudentById`
  - `createStudent`
  - `updateStudent`
  - `deleteStudent`
- `StudentsPage` for search, paging, table display, and modal orchestration
- `StudentFormModal` for create/edit form UI
- `studentSchema` for zod validation
- modals: `CreateStudentModal`, `EditStudentModal`, `DeleteStudentDialog`

Implementation details:

- Search is debounced using `useDebouncedValue`.
- Pagination uses `page` state and `Pagination` component.
- Create and update operations add `schoolId: 1` to payloads.
- Student list is rendered with `StudentTable`.
- `admissionNo` is optional in schema and displayed read-only in edit mode.

# Student Status Module

The student status management flow separates active and inactive students.

- `studentStatusService` fetches active/inactive students with `status` query params.
- `useActiveStudentsQuery` and `useInactiveStudentsQuery` provide paginated data.
- `StudentStatusManagementPage` renders tabbed lists for active and inactive records.
- Status updates are performed via `studentStatusService.updateStudentStatus()`.

# Attendance Module

Attendance is managed by date with both listing and summary.

- `attendanceService` exposes:
  - `fetchAttendanceByDate(date)`
  - `createAttendance(payload)`
  - `updateAttendance(attendanceId, payload)`
  - `fetchAttendanceSummary(date)`
- `useAttendanceByDateQuery` and `useAttendanceSummaryQuery` are query hooks.
- `useCreateAttendanceMutation` invalidates both the date list and summary after creation.
- `useUpdateAttendanceMutation` invalidates the attendance query key after update.
- `AttendancePage` includes:
  - date filter input
  - summary cards
  - attendance table
  - `MarkAttendanceModal` for create/update actions

# Fees Module

Fees management supports list view, summaries, payment, and payment history.

- `feeService` exposes:
  - `fetchFees(page, size, search)`
  - `fetchSummary()`
  - `assignFee(payload)`
  - `payFee(studentFeeId, payload)`
  - `fetchPaymentHistory(studentFeeId)`
- `useFeesQuery`, `useFeesSummaryQuery`, and `usePaymentHistoryQuery` retrieve data.
- `usePayFeeMutation` and `useAssignFeeMutation` invalidate fees-related queries after success.
- `FeesPage` supports search, pagination, summary cards, pay modals, and history modals.
- `PaymentHistoryModal` sorts payments descending by date.

# API Contracts

Important endpoints:

- `POST /auth/login`
- `GET /schools/1/students` and `GET /schools/1/students/search`
- `GET /schools/1/students/:id`
- `POST /schools/1/students`
- `PUT /schools/1/students/:id`
- `DELETE /schools/1/students/:id`
- `PATCH /schools/1/students/:id/status`
- `GET /schools/1/attendance/date?date=YYYY-MM-DD`
- `POST /schools/1/attendance`
- `PATCH /schools/1/attendance/:attendanceId`
- `GET /schools/1/attendance/summary?date=YYYY-MM-DD`
- `GET /schools/1/fees?page=&size=&search=`
- `GET /schools/1/fees/summary`
- `POST /schools/1/fees/student-fee`
- `POST /schools/1/fees/pay/:studentFeeId`
- `GET /schools/1/fees/payments/:studentFeeId`

Payload examples:

- Login request:
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

- Create student request:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "gender": "Female",
    "dob": "2012-09-01",
    "admissionNo": "A123",
    "phone": "9876543210",
    "classId": 3,
    "sectionId": 2,
    "fatherName": "John Doe",
    "motherName": "Mary Doe",
    "parentPhone": "9876543210",
    "parentEmail": "parent@example.com",
    "parentAddress": "123 School St",
    "status": "ACTIVE"
  }
  ```

- Create attendance request:
  ```json
  {
    "studentId": 45,
    "date": "2026-05-15",
    "status": "PRESENT"
  }
  ```

- Update attendance request:
  ```json
  {
    "status": "ABSENT"
  }
  ```

- Pay fee request:
  ```json
  {
    "amount": 5000,
    "paymentMode": "UPI",
    "remarks": "Quarterly tuition"
  }
  ```

- Assign fee request:
  ```json
  {
    "studentId": 45,
    "totalFee": 15000
  }
  ```

# DTO Structures

- `Student` / `StudentListResponse`
- `AttendanceRecord`, `AttendanceSummary`, `CreateAttendanceRequest`, `UpdateAttendanceRequest`
- `FeeRecord`, `FeesListResponse`, `FeeSummary`, `FeePayment`, `PayFeeRequest`, `AssignFeeRequest`
- `LoginResponse` / `UserProfile` in auth types

# Important Enum Values

- Student status: `ACTIVE`, `INACTIVE`
- Attendance status: `PRESENT`, `ABSENT`
- Fee status: `PENDING`, `PARTIAL`, `PAID`
- Payment mode: `CASH`, `UPI`, `CARD`, `BANK_TRANSFER`
- User role: `ADMIN`

# Validation Rules

- `firstName`, `lastName`, `fatherName`, `motherName`, `parentAddress` are required non-empty strings
- `gender` must be one of `Male`, `Female`, or `Other`
- `dob` must be a non-empty string
- `phone` and `parentPhone` must be exactly 10 digits
- `parentEmail` must be a valid email
- `classId` and `sectionId` must be numeric IDs greater than 0
- `status` must be `ACTIVE` or `INACTIVE`
- `admissionNo` is currently optional in schema and defaulted to an empty string

# Business Rules

- School context is hardcoded to `schoolId = 1` across services
- Student search and paging support debounced filtering and backend pagination params
- Active/inactive student views are separate tabs with dedicated queries
- Attendance is tracked by date and supports both create and update operations
- Fee workflow supports list, summary, payment, and payment history retrieval
- Admin-only access is enforced for user management routes

# Enterprise Workflow Decisions

- Centralize API calls via feature services for maintainability
- Keep auth state in a persisted Zustand store for seamless session recovery
- Use React Query for caching, query invalidation, and shared server-state logic
- Separate page-level routing from layout concerns using `ProtectedRoute` and `RoleProtectedRoute`
- Use modal components for create/edit/delete interactions rather than separate pages
- Keep search/pagination parameters in component state and reflect them in query keys
- Use stable query invalidation after mutations to refresh summaries and detail lists

# Current Completed Features

- Login / auth persistence
- Protected admin layout and route guard
- Students CRUD with search and pagination
- Student status management with active/inactive views
- Attendance by date with summary cards and mark/update modal
- Fees list, summary, payment modal, and payment history modal
- Central Axios client with token injection
- Modular feature services and query hook patterns

# Pending Features

- Back-end contract validation for all payload and response shapes
- Automatic logout on 401 responses
- UI wiring for fee assignment flow
- Additional user experience polish and error handling improvements
- Role-based navigation enhancement beyond `ADMIN` only
- Potential page index normalization between front-end and back-end

# Known Issues

- `schoolId` is hardcoded to `1`, limiting multi-school support
- Axios 401 auto-logout is disabled in the response interceptor
- `admissionNo` is optional in the form schema, which may allow empty admission values
- Page numbering may be inconsistent between UI state and backend expectation
- Search/pagination resets to page `0` or `1` in different components, which may require alignment

# Folder Structure

- `src/api` — Axios client
- `src/assets` — static assets
- `src/components` — UI components, tables, forms, modals
- `src/constants` — enums, routes, storage keys, UI config
- `src/features` — feature services, hooks, validation schemas
- `src/hooks` — reusable hooks such as debouncing and master data queries
- `src/layouts` — auth and admin layout wrappers
- `src/pages` — route page screens
- `src/routes` — routing definitions and protected wrappers
- `src/services` — auxiliary backend service modules
- `src/store` — Zustand auth store
- `src/types` — shared API contract and domain types
- `src/utils` — formatting utilities

# Development Notes

- Use `npm run dev` to start the Vite development server.
- `npm run build` runs TypeScript build and Vite production build.
- Authentication state persists in local storage under `schoolos-auth-storage`.
- Query invalidation is the chosen refresh strategy after mutations.
- Backend base URL is configurable through `VITE_API_BASE_URL`.

# Future Enhancements

- Add multi-school support and remove hardcoded school context
- Implement full admin user management and roles beyond `ADMIN`
- Add dedicated student detail and fee assignment flows
- Add notification alerts and global error handling UI
- Introduce a shared design system component library for consistent controls
- Add E2E tests for workflow coverage and contract validation
