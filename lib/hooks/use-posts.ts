import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '../supabase/client'
import { Database } from '../database.types'
import type { AnalyticsSummaryResponse, DailyMetricsResponse } from '../types/api'
import { normalizePost } from '../types/normalize-post'
export type { NormalizedPost } from '../types/normalize-post'

type Post = Database['public']['Tables']['posts']['Row']

// Query Keys Factory Pattern
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    filtered: (platform?: string) => ['posts', { platform }] as const,
  },
  analytics: {
    summary: ['analytics', 'summary'] as const,
  },
  dailyMetricsApi: {
    range: (days: number) => ['daily-metrics-api', { days }] as const,
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
      return (data as Post[]).map(normalizePost)
    },
  })
}

// Fetch analytics summary from API route
export function useAnalyticsSummary() {
  return useQuery<AnalyticsSummaryResponse>({
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

// Fetch daily metrics from Edge API
export function useDailyMetrics(days: number = 30) {
  return useQuery<DailyMetricsResponse>({
    queryKey: queryKeys.dailyMetricsApi.range(days),
    queryFn: async () => {
      const response = await fetch(`/api/metrics/daily?days=${days}`)
      if (!response.ok) {
        throw new Error('Failed to fetch daily metrics')
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
      // Type assertion required: Supabase generated types have insert inference issues
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
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
