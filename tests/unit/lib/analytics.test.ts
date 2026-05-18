import { describe, it, expect } from 'vitest'

// Mock analytics functions
const getProjectMetrics = (raidds: any[]) => ({
  total_raidd: raidds.length,
  open_raidd: raidds.filter(r => r.status === 'open').length,
  high_severity: raidds.filter(r => r.severity === 'high').length,
  medium_severity: raidds.filter(r => r.severity === 'medium').length,
  low_severity: raidds.filter(r => r.severity === 'low').length
})

const getRiskTrends = (raidds: any[], granularity: 'daily' | 'weekly' | 'monthly') => {
  const trends = raidds.reduce((acc, r) => {
    const date = new Date(r.created_at).toDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  return Object.entries(trends).map(([date, count]) => ({ date, count }))
}

const getLessonsHeatmap = (lessons: any[]) => {
  return {
    technical: lessons.filter(l => l.category === 'technical').length,
    process: lessons.filter(l => l.category === 'process').length,
    people: lessons.filter(l => l.category === 'people').length
  }
}

describe('Analytics Calculations', () => {
  const mockRaidds = [
    { id: '1', severity: 'high', status: 'open', created_at: '2026-05-01' },
    { id: '2', severity: 'high', status: 'open', created_at: '2026-05-02' },
    { id: '3', severity: 'medium', status: 'closed', created_at: '2026-05-03' },
    { id: '4', severity: 'low', status: 'open', created_at: '2026-05-04' }
  ]

  describe('getProjectMetrics', () => {
    it('should count total RAIDD entries', () => {
      const metrics = getProjectMetrics(mockRaidds)
      expect(metrics.total_raidd).toBe(4)
    })

    it('should count open RAIDD entries', () => {
      const metrics = getProjectMetrics(mockRaidds)
      expect(metrics.open_raidd).toBe(3)
    })

    it('should count by severity', () => {
      const metrics = getProjectMetrics(mockRaidds)
      expect(metrics.high_severity).toBe(2)
      expect(metrics.medium_severity).toBe(1)
      expect(metrics.low_severity).toBe(1)
    })

    it('should return zero for empty data', () => {
      const metrics = getProjectMetrics([])
      expect(metrics.total_raidd).toBe(0)
      expect(metrics.open_raidd).toBe(0)
    })
  })

  describe('getRiskTrends', () => {
    it('should generate daily trends', () => {
      const trends = getRiskTrends(mockRaidds, 'daily')
      expect(trends.length).toBeGreaterThan(0)
      expect(trends[0]).toHaveProperty('date')
      expect(trends[0]).toHaveProperty('count')
    })

    it.skip('should accumulate counts per date', () => {
      const duplicates = [...mockRaidds, { id: '5', created_at: '2026-05-01' }]
      const trends = getRiskTrends(duplicates, 'daily')
      const may01 = trends.find(t => t.date.includes('May 01'))
      expect(may01?.count).toBe(2)
    })
  })

  describe('getLessonsHeatmap', () => {
    const mockLessons = [
      { id: '1', category: 'technical' },
      { id: '2', category: 'technical' },
      { id: '3', category: 'process' },
      { id: '4', category: 'people' }
    ]

    it('should count lessons by category', () => {
      const heatmap = getLessonsHeatmap(mockLessons)
      expect(heatmap.technical).toBe(2)
      expect(heatmap.process).toBe(1)
      expect(heatmap.people).toBe(1)
    })

    it('should return zero for missing categories', () => {
      const heatmap = getLessonsHeatmap([])
      expect(heatmap.technical).toBe(0)
      expect(heatmap.process).toBe(0)
      expect(heatmap.people).toBe(0)
    })
  })
})
