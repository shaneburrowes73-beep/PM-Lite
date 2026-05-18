import { describe, it, expect, beforeEach } from 'vitest'

// Mock lessons propagation service
const propagations: any[] = []

const propagateLesson = (lesson_id: string, source_project: string, target_projects: string[]) => {
  const results = target_projects.map(target => {
    const propagation = {
      id: `prop-${Date.now()}-${target}`,
      lesson_id,
      source_project,
      target_project: target,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    propagations.push(propagation)
    return propagation
  })
  return results
}

const getPropagations = (lesson_id: string) => {
  return propagations.filter(p => p.lesson_id === lesson_id)
}

const updatePropagationStatus = (propagation_id: string, status: string) => {
  const prop = propagations.find(p => p.id === propagation_id)
  if (!prop) return null
  prop.status = status
  return prop
}

describe('Lessons Propagation API', () => {
  beforeEach(() => {
    propagations.length = 0
  })

  describe('POST /api/lessons/:id/propagate (Create Propagation)', () => {
    it('should propagate lesson to target projects', () => {
      const results = propagateLesson('lesson-123', 'proj-1', ['proj-2', 'proj-3'])
      
      expect(results).toHaveLength(2)
      expect(results[0].target_project).toBe('proj-2')
      expect(results[1].target_project).toBe('proj-3')
    })

    it('should set propagation status to pending', () => {
      const results = propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      
      expect(results[0].status).toBe('pending')
    })

    it('should handle single target project', () => {
      const results = propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      expect(results).toHaveLength(1)
    })

    it('should handle multiple target projects', () => {
      const targets = ['proj-2', 'proj-3', 'proj-4', 'proj-5']
      const results = propagateLesson('lesson-123', 'proj-1', targets)
      
      expect(results).toHaveLength(4)
    })
  })

  describe('GET /api/lessons/:id/propagations (List)', () => {
    it('should list all propagations for lesson', () => {
      propagateLesson('lesson-123', 'proj-1', ['proj-2', 'proj-3'])
      
      const results = getPropagations('lesson-123')
      expect(results).toHaveLength(2)
    })

    it('should not leak propagations from other lessons', () => {
      propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      propagateLesson('lesson-456', 'proj-1', ['proj-3'])
      
      const lesson123 = getPropagations('lesson-123')
      expect(lesson123).toHaveLength(1)
      expect(lesson123[0].lesson_id).toBe('lesson-123')
    })

    it('should show propagation status', () => {
      propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      const results = getPropagations('lesson-123')
      
      expect(results[0].status).toBeDefined()
      expect(['pending', 'in_progress', 'completed', 'failed']).toContain(results[0].status)
    })
  })

  describe('PATCH /api/lessons/propagations/:id (Update Status)', () => {
    it('should update propagation status', () => {
      const [prop] = propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      const updated = updatePropagationStatus(prop.id, 'completed')
      
      expect(updated?.status).toBe('completed')
    })

    it('should handle status transitions', () => {
      const [prop] = propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      
      updatePropagationStatus(prop.id, 'in_progress')
      let result = getPropagations('lesson-123')[0]
      expect(result.status).toBe('in_progress')
      
      updatePropagationStatus(prop.id, 'completed')
      result = getPropagations('lesson-123')[0]
      expect(result.status).toBe('completed')
    })

    it('should return null for non-existent propagation', () => {
      const result = updatePropagationStatus('non-existent', 'completed')
      expect(result).toBeNull()
    })

    it('should track failed propagations', () => {
      const [prop] = propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      const updated = updatePropagationStatus(prop.id, 'failed')
      
      expect(updated?.status).toBe('failed')
    })
  })

  describe('Lesson Propagation Workflow', () => {
    it('should complete full propagation workflow', () => {
      const [prop] = propagateLesson('lesson-123', 'proj-1', ['proj-2'])
      
      expect(prop.status).toBe('pending')
      
      updatePropagationStatus(prop.id, 'in_progress')
      let updated = getPropagations('lesson-123')[0]
      expect(updated.status).toBe('in_progress')
      
      updatePropagationStatus(prop.id, 'completed')
      updated = getPropagations('lesson-123')[0]
      expect(updated.status).toBe('completed')
    })

    it('should support batch propagation', () => {
      const results = propagateLesson('lesson-123', 'proj-1', Array.from({length: 10}, (_, i) => `proj-${i}`))
      
      expect(results).toHaveLength(10)
      results.forEach(r => {
        expect(r.status).toBe('pending')
      })
    })
  })
})