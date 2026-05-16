export type ApplicationStatus = 'READY' | 'ERROR' | 'IN_PROGRESS' | 'PLANNING'
export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type ItemStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'

export interface Application {
  id: string
  name: string
  description: string | null
  status: ApplicationStatus
  priority: Priority
  url: string | null
  github_url: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface OutstandingItem {
  id: string
  application_id: string
  title: string
  description: string | null
  priority: Priority
  next_steps: string | null
  status: ItemStatus
  due_date: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  user_id: string
  name: string
  email: string
  role: string
  created_at: string
}

export interface ApplicationWithItems extends Application {
  outstanding_items: OutstandingItem[]
  assigned_member: TeamMember | null
}
