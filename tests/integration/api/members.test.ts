import { describe, it, expect, beforeEach } from 'vitest'

// Mock members service
const members: any[] = []

const addMember = (project_id: string, user_id: string, role: string) => {
  const exists = members.find(m => m.project_id === project_id && m.user_id === user_id)
  if (exists) return null

  const member = {
    id: `member-${Date.now()}`,
    project_id,
    user_id,
    role,
    created_at: new Date().toISOString()
  }
  members.push(member)
  return member
}

const getMembers = (project_id: string) => {
  return members.filter(m => m.project_id === project_id)
}

const updateMemberRole = (project_id: string, user_id: string, newRole: string) => {
  const member = members.find(m => m.project_id === project_id && m.user_id === user_id)
  if (!member) return null
  
  const ownerCount = members.filter(m => m.project_id === project_id && m.role === 'owner').length
  if (member.role === 'owner' && ownerCount === 1) return null // Prevent removing last owner
  
  member.role = newRole
  return member
}

const removeMember = (project_id: string, user_id: string) => {
  const idx = members.findIndex(m => m.project_id === project_id && m.user_id === user_id)
  if (idx === -1) return false
  members.splice(idx, 1)
  return true
}

describe('Members API', () => {
  beforeEach(() => {
    members.length = 0
  })

  describe('POST /api/members (Invite)', () => {
    it('should add member to project', () => {
      const member = addMember('proj-123', 'user-456', 'contributor')
      expect(member?.user_id).toBe('user-456')
      expect(member?.role).toBe('contributor')
    })

    it('should prevent duplicate members', () => {
      addMember('proj-123', 'user-456', 'contributor')
      const duplicate = addMember('proj-123', 'user-456', 'manager')
      expect(duplicate).toBeNull()
    })

    it('should assign correct role', () => {
      const owner = addMember('proj-123', 'user-123', 'owner')
      const contributor = addMember('proj-123', 'user-456', 'contributor')
      
      expect(owner?.role).toBe('owner')
      expect(contributor?.role).toBe('contributor')
    })
  })

  describe('GET /api/members (List)', () => {
    it('should list project members', () => {
      addMember('proj-123', 'user-123', 'owner')
      addMember('proj-123', 'user-456', 'contributor')
      
      const result = getMembers('proj-123')
      expect(result).toHaveLength(2)
    })

    it('should not leak members from other projects', () => {
      addMember('proj-123', 'user-123', 'owner')
      addMember('proj-456', 'user-789', 'owner')
      
      const proj123Members = getMembers('proj-123')
      expect(proj123Members).toHaveLength(1)
      expect(proj123Members[0].user_id).toBe('user-123')
    })
  })

  describe('PATCH /api/members/:userId (Update Role)', () => {
    it('should update member role', () => {
      addMember('proj-123', 'user-456', 'contributor')
      const updated = updateMemberRole('proj-123', 'user-456', 'manager')
      
      expect(updated?.role).toBe('manager')
    })

    it('should prevent removing last owner', () => {
      addMember('proj-123', 'user-123', 'owner')
      const result = updateMemberRole('proj-123', 'user-123', 'contributor')
      
      expect(result).toBeNull()
    })

    it('should allow demoting owner if another exists', () => {
      addMember('proj-123', 'user-123', 'owner')
      addMember('proj-123', 'user-456', 'owner')
      
      const result = updateMemberRole('proj-123', 'user-123', 'manager')
      expect(result?.role).toBe('manager')
    })
  })

  describe('DELETE /api/members/:userId (Remove)', () => {
    it('should remove member from project', () => {
      addMember('proj-123', 'user-456', 'contributor')
      const removed = removeMember('proj-123', 'user-456')
      
      expect(removed).toBe(true)
      expect(getMembers('proj-123')).toHaveLength(0)
    })

    it('should return false for non-existent member', () => {
      const removed = removeMember('proj-123', 'user-999')
      expect(removed).toBe(false)
    })
  })
})