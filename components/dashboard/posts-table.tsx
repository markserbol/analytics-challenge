'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePosts, NormalizedPost } from '@/lib/hooks/use-posts'
import { useDashboardStore } from '@/lib/stores/dashboard-store'
import { ArrowUpDown, Instagram, Video, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export function PostsTable() {
  const platformFilter = useDashboardStore((state) => state.platformFilter)
  const setPlatformFilter = useDashboardStore((state) => state.setPlatformFilter)
  const sortColumn = useDashboardStore((state) => state.sortColumn)
  const sortDirection = useDashboardStore((state) => state.sortDirection)
  const setSorting = useDashboardStore((state) => state.setSorting)
  const setSelectedPost = useDashboardStore((state) => state.setSelectedPost)

  const { data: posts, isLoading, error } = usePosts(
    platformFilter === 'all' ? undefined : platformFilter
  )

  const sortedPosts = posts ? [...posts].sort((a, b) => {
    if (!sortColumn) return 0

    let aValue: number | string = 0
    let bValue: number | string = 0

    switch (sortColumn) {
      case 'posted_at':
        aValue = new Date(a.posted_at).getTime()
        bValue = new Date(b.posted_at).getTime()
        break
      case 'engagement':
        aValue = a.likes + a.comments + a.shares
        bValue = b.likes + b.comments + b.shares
        break
      case 'engagement_rate':
        aValue = a.engagement_rate
        bValue = b.engagement_rate
        break
      default:
        return 0
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  }) : []

  const handleSort = (column: 'posted_at' | 'engagement' | 'engagement_rate') => {
    if (sortColumn === column) {
      setSorting(column, sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSorting(column, 'desc')
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive">Failed to load posts</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Posts</CardTitle>
          <Select
            value={platformFilter}
            onValueChange={(value) => setPlatformFilter(value as 'all' | 'instagram' | 'tiktok')}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No posts found. Create your first post to see analytics!
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8"
                      onClick={() => handleSort('posted_at')}
                    >
                      Posted
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8"
                      onClick={() => handleSort('engagement')}
                    >
                      Engagement
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8"
                      onClick={() => handleSort('engagement_rate')}
                    >
                      Rate
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPosts.map((post, index) => {
                  const totalEngagement = post.likes + post.comments + post.shares
                  return (
                    <motion.tr
                      key={post.id}
                      className="border-b transition-colors cursor-pointer hover:bg-muted/50 data-[state=selected]:bg-muted"
                      onClick={() => setSelectedPost(post)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: 'easeOut'
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {post.platform === 'instagram' ? (
                            <Instagram className="h-4 w-4 text-pink-600" />
                          ) : (
                            <Video className="h-4 w-4" />
                          )}
                          <span className="capitalize">{post.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {post.caption}
                      </TableCell>
                      <TableCell>
                        {new Date(post.posted_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{totalEngagement.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">
                            ({post.likes}L / {post.comments}C / {post.shares}S)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.engagement_rate.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        {post.permalink ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a
                              href={post.permalink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled
                          >
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
