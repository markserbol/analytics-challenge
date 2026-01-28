import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '../supabase/client'
import { Database } from '../database.types'

type Post = Database['public']['Tables']['posts']['Row']
type DailyMetric = Database['public']['Tables']['daily_metrics']['Row']

// Query Keys Factory Pattern
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    filtered: (platform?: string) => ['posts', { platform }] as const,
  },
  dailyMetrics: {
    all: ['daily-metrics'] as const,
    range: (days: number) => ['daily-metrics', { days }] as const,
  },
  analytics: {
    summary: ['analytics', 'summary'] as const,
  },
}

// Fetch all posts for the current user
export function usePosts(platform?: 'instagram' | 'tiktok') {
  const supabase = createClient()

  return useQuery({
    queryKey: queryKeys.posts.filtered(platform),
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('*')
        .order('posted_at', { ascending: false })

      if (platform) {
        query = query.eq('platform', platform)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Post[]
    },
  })
}

// Fetch daily metrics for the last N days
export function useDailyMetrics(days: number = 30) {
  const supabase = createClient()

  return useQuery({
    queryKey: queryKeys.dailyMetrics.range(days),
    queryFn: async () => {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const { data, error } = await supabase
        .from('daily_metrics')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (error) throw error
      return data as DailyMetric[]
    },
  })
}

// Fetch analytics summary from API route
export function useAnalyticsSummary() {
  return useQuery({
    queryKey: queryKeys.analytics.summary,
    queryFn: async () => {
      const response = await fetch('/api/analytics/summary')
      if (!response.ok) {
        throw new Error('Failed to fetch analytics summary')
      }
      return response.json()
    },
  })
}

// Example mutation for creating a post (if needed later)
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: Database['public']['Tables']['posts']['Insert']) => {
      const supabase = createClient()
      // Type assertion needed due to Supabase client type inference issue
      const { data, error } = await supabase
        .from('posts')
        .insert(post as any)
        .select()
        .single()

      if (error) throw error
      return data as Post
    },
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
