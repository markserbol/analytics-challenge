import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Database } from '@/lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

export async function GET() {
  try {
    const supabase = await createClient()

    // 1. Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Fetch all posts for the current user
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)

    if (postsError) {
      throw postsError
    }

    // 3. Handle empty state
    if (!posts || posts.length === 0) {
      return NextResponse.json({
        totalEngagement: 0,
        averageEngagementRate: 0,
        topPerformingPost: null,
        trendPercentage: 0,
        trendDirection: 'neutral',
        postsCount: 0,
      })
    }

    // Type assertion for posts array
    const typedPosts = posts as Post[]

    // 4. Calculate total engagement (likes + comments + shares)
    const totalEngagement = typedPosts.reduce(
      (sum, post) => sum + (post.likes + post.comments + post.shares),
      0
    )

    // 5. Calculate average engagement rate
    const validEngagementRates = typedPosts
      .filter((post) => post.engagement_rate !== null)
      .map((post) => post.engagement_rate as number)

    const averageEngagementRate =
      validEngagementRates.length > 0
        ? validEngagementRates.reduce((sum, rate) => sum + rate, 0) / validEngagementRates.length
        : 0

    // 6. Find top performing post (by total engagement)
    const topPerformingPost = typedPosts.reduce((top, post) => {
      const postEngagement = post.likes + post.comments + post.shares
      const topEngagement = top.likes + top.comments + top.shares
      return postEngagement > topEngagement ? post : top
    }, typedPosts[0])

    // 7. Calculate trend (last 7 days vs previous 7 days)
    const now = new Date()
    const last7Days = new Date(now)
    last7Days.setDate(now.getDate() - 7)
    const previous7Days = new Date(now)
    previous7Days.setDate(now.getDate() - 14)

    const recentPosts = typedPosts.filter((post) => new Date(post.posted_at) >= last7Days)
    const previousPosts = typedPosts.filter(
      (post) => new Date(post.posted_at) >= previous7Days && new Date(post.posted_at) < last7Days
    )

    const recentEngagement = recentPosts.reduce(
      (sum, post) => sum + (post.likes + post.comments + post.shares),
      0
    )
    const previousEngagement = previousPosts.reduce(
      (sum, post) => sum + (post.likes + post.comments + post.shares),
      0
    )

    let trendPercentage = 0
    let trendDirection: 'up' | 'down' | 'neutral' = 'neutral'

    if (previousEngagement > 0) {
      trendPercentage = ((recentEngagement - previousEngagement) / previousEngagement) * 100
      trendDirection = trendPercentage > 0 ? 'up' : trendPercentage < 0 ? 'down' : 'neutral'
    } else if (recentEngagement > 0) {
      trendPercentage = 100
      trendDirection = 'up'
    }

    // 8. Return aggregated data
    return NextResponse.json({
      totalEngagement,
      averageEngagementRate: Math.round(averageEngagementRate * 100) / 100,
      topPerformingPost: {
        id: topPerformingPost.id,
        caption: topPerformingPost.caption,
        platform: topPerformingPost.platform,
        engagement: topPerformingPost.likes + topPerformingPost.comments + topPerformingPost.shares,
        thumbnail_url: topPerformingPost.thumbnail_url,
      },
      trendPercentage: Math.round(Math.abs(trendPercentage) * 10) / 10,
      trendDirection,
      postsCount: typedPosts.length,
    })
  } catch (error) {
    console.error('Error fetching analytics summary:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
