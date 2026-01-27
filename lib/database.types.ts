export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          user_id: string
          platform: 'instagram' | 'tiktok'
          caption: string | null
          thumbnail_url: string | null
          media_type: 'image' | 'video' | 'carousel'
          posted_at: string
          likes: number
          comments: number
          shares: number
          saves: number
          reach: number
          impressions: number
          engagement_rate: number | null
          permalink: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: 'instagram' | 'tiktok'
          caption?: string | null
          thumbnail_url?: string | null
          media_type: 'image' | 'video' | 'carousel'
          posted_at: string
          likes?: number
          comments?: number
          shares?: number
          saves?: number
          reach?: number
          impressions?: number
          engagement_rate?: number | null
          permalink?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: 'instagram' | 'tiktok'
          caption?: string | null
          thumbnail_url?: string | null
          media_type?: 'image' | 'video' | 'carousel'
          posted_at?: string
          likes?: number
          comments?: number
          shares?: number
          saves?: number
          reach?: number
          impressions?: number
          engagement_rate?: number | null
          permalink?: string | null
          created_at?: string
        }
      }
      daily_metrics: {
        Row: {
          id: string
          user_id: string
          date: string
          engagement: number
          reach: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          engagement?: number
          reach?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          engagement?: number
          reach?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
