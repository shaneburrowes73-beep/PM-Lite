export const STATUS_COLORS: Record<string, string> = {
  READY: 'bg-green-100 text-green-800 border-green-300',
  ERROR: 'bg-red-100 text-red-800 border-red-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  PLANNING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
}

export const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: 'bg-red-100 text-red-800',
  HIGH: 'bg-orange-100 text-orange-800',
  MEDIUM: 'bg-blue-100 text-blue-800',
  LOW: 'bg-gray-100 text-gray-800',
}

export const STATUS_LABELS: Record<string, string> = {
  READY: '✅ Ready',
  ERROR: '❌ Error',
  IN_PROGRESS: '⚙️ In Progress',
  PLANNING: '📋 Planning',
}

export const PRIORITY_LABELS: Record<string, string> = {
  CRITICAL: '🔴 Critical',
  HIGH: '🟠 High',
  MEDIUM: '🟡 Medium',
  LOW: '🟢 Low',
}
