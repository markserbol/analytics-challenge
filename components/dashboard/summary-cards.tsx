'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAnalyticsSummary } from '@/lib/hooks/use-posts'
import { TrendingUp, TrendingDown, Activity, Target, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

export function SummaryCards() {
  const { data: summary, isLoading, error } = useAnalyticsSummary()

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">Failed to load analytics</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[60px] mb-1" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: 'Total Engagement',
      value: summary?.totalEngagement.toLocaleString() ?? '0',
      description: `${summary?.trendPercentage && summary.trendPercentage > 0 ? '+' : ''}${summary?.trendPercentage?.toFixed(1) ?? 0}% from last period`,
      icon: Activity,
      trend: summary?.trendPercentage ?? 0,
    },
    {
      title: 'Engagement Rate',
      value: `${summary?.averageEngagementRate?.toFixed(2) ?? '0.00'}%`,
      description: 'Average across all posts',
      icon: Target,
      trend: null,
    },
    {
      title: 'Top Post',
      value: summary?.topPerformingPost?.engagement.toLocaleString() ?? 'N/A',
      description: summary?.topPerformingPost 
        ? `${summary.topPerformingPost.platform} - ${new Date(summary.topPerformingPost.posted_at).toLocaleDateString()}`
        : 'No posts yet',
      icon: Trophy,
      trend: null,
    },
    {
      title: 'Total Posts',
      value: summary?.postsCount?.toString() ?? '0',
      description: 'Across all platforms',
      icon: Activity,
      trend: null,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: 'easeOut'
            }}
          >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {card.trend !== null && card.trend !== undefined && (
                  <>
                    {card.trend > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : card.trend < 0 ? (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    ) : null}
                  </>
                )}
                <span>{card.description}</span>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
