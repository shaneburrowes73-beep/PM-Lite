import { vi } from 'vitest'

export const mockSupabaseClient = {
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: {} })
  }))
}

export function mockProject(overrides = {}) {
  return {
    id: 'proj_123',
    name: 'Test Project',
    description: 'Test Description',
    ownerId: 'user_123',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export function mockUser(overrides = {}) {
  return {
    id: 'user_123',
    email: 'user@example.com',
    name: 'Test User',
    role: 'owner',
    ...overrides
  }
}

export function mockRaidd(overrides = {}) {
  return {
    id: 'raidd_123',
    projectId: 'proj_123',
    title: 'Test RAIDD',
    context: 'Test context',
    riskLevel: 'medium',
    status: 'open',
    createdBy: 'user_123',
    createdAt: new Date(),
    ...overrides
  }
}

export function mockLesson(overrides = {}) {
  return {
    id: 'lesson_123',
    raiddId: 'raidd_123',
    sourceProjectId: 'proj_123',
    title: 'Test Lesson',
    description: 'Test lesson description',
    category: 'process',
    createdAt: new Date(),
    ...overrides
  }
}

export function mockComment(overrides = {}) {
  return {
    id: 'comment_123',
    raiddId: 'raidd_123',
    userId: 'user_123',
    text: 'Test comment',
    role: 'contributor',
    createdAt: new Date(),
    ...overrides
  }
}

export function mockRoles(overrides = {}) {
  return {
    userId: 'user_123',
    projectId: 'proj_123',
    role: 'contributor',
    createdAt: new Date(),
    ...overrides
  }
}

export function mockMetrics(overrides = {}) {
  return {
    total: 10,
    high: 2,
    medium: 5,
    low: 3,
    avgResolutionDays: 5,
    ...overrides
  }
}
