export const mockSupabaseClient = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    neq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: {}, error: null }),
    data: [],
    error: null
  })),
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null })
  }
}

export const mockProject = {
  id: 'proj-123',
  name: 'Test Project',
  owner_id: 'user-123',
  status: 'active',
  created_at: new Date().toISOString()
}

export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  role: 'owner'
}

export const mockRaidd = {
  id: 'raidd-123',
  project_id: 'proj-123',
  entry_id: 'test-entry',
  severity: 'high',
  status: 'open',
  created_at: new Date().toISOString()
}

export const mockLesson = {
  id: 'lesson-123',
  project_id: 'proj-123',
  title: 'Test Lesson',
  category: 'technical',
  impact: 'high',
  created_at: new Date().toISOString()
}

export const mockComment = {
  id: 'comment-123',
  raidd_id: 'raidd-123',
  user_id: 'user-123',
  content: 'Test comment',
  created_at: new Date().toISOString()
}

export const mockMetrics = {
  total_raidd: 100,
  open_raidd: 45,
  high_severity: 12,
  avg_resolution_time: 3.5,
  total_lessons: 28
}

export const mockRoles = {
  owner: ['create_project', 'edit_project', 'delete_project', 'manage_members', 'view_all'],
  manager: ['edit_project', 'manage_members', 'view_all', 'create_raidd'],
  contributor: ['create_raidd', 'create_comment', 'view_all'],
  viewer: ['view_all']
}