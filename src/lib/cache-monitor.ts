// Cache monitoring utilities for development
import { getCacheStats } from '@/lib/ghost'

export function logCacheStats() {
  if (process.env.NODE_ENV === 'development') {
    const stats = getCacheStats()
    console.log('Ghost API Cache Stats:', {
      total: stats.totalEntries,
      fresh: stats.freshEntries,
      stale: stats.staleEntries,
      hitRate:
        stats.totalEntries > 0
          ? ((stats.freshEntries / stats.totalEntries) * 100).toFixed(1) + '%'
          : '0%',
    })
  }
}

// Call this in development to monitor cache performance
if (process.env.NODE_ENV === 'development') {
  // Log cache stats every 5 minutes in development
  setInterval(logCacheStats, 5 * 60 * 1000)
}
