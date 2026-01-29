import type { Database } from '../database.types'

type Post = Database['public']['Tables']['posts']['Row']

// Normalized post with non-nullable numeric fields
export type NormalizedPost = Omit<Post, 'likes' | 'comments' | 'shares' | 'saves' | 'reach' | 'impressions' | 'engagement_rate'> & {
  likes: number
  comments: number
  shares: number
  saves: number
  reach: number
  impressions: number
  engagement_rate: number
}

// Helper to normalize post data
export function normalizePost(post: Post): NormalizedPost {
  return {
    ...post,
    likes: post.likes ?? 0,
    comments: post.comments ?? 0,
    shares: post.shares ?? 0,
    saves: post.saves ?? 0,
    reach: post.reach ?? 0,
    impressions: post.impressions ?? 0,
    engagement_rate: post.engagement_rate ?? 0,
  }
}
