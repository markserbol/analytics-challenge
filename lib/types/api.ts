// API Response Types

export interface AnalyticsSummaryResponse {
  totalEngagement: number
  averageEngagementRate: number
  topPerformingPost: {
    id: string
    caption: string | null
    platform: 'instagram' | 'tiktok'
    engagement: number
    thumbnail_url: string | null
  } | null
  trendPercentage: number
  trendDirection: 'up' | 'down' | 'neutral'
  postsCount: number
}

export interface DailyMetricsResponse {
  metrics: Array<{
    date: string
    engagement: number
    reach: number
  }>
  days: number
  isEmpty: boolean
}

export interface ErrorResponse {
  error: string
}
