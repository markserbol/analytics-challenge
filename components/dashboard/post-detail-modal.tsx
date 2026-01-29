'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '@/lib/stores/dashboard-store'
import { Instagram, Video, Heart, MessageCircle, Share2, TrendingUp, Calendar, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export function PostDetailModal() {
  const selectedPost = useDashboardStore((state) => state.selectedPost)
  const setSelectedPost = useDashboardStore((state) => state.setSelectedPost)

  if (!selectedPost) return null

  const totalEngagement = selectedPost.likes + selectedPost.comments + selectedPost.shares

  return (
    <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {selectedPost.platform === 'instagram' ? (
              <Instagram className="h-5 w-5 text-pink-600" />
            ) : (
              <Video className="h-5 w-5" />
            )}
            <span className="capitalize font-semibold">{selectedPost.platform}</span>
          </div>
          <DialogTitle className="text-2xl">Post Details</DialogTitle>
          <DialogDescription>
            Posted on {new Date(selectedPost.posted_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Content</h3>
            <p className="text-base">{selectedPost.caption}</p>
          </div>

          {/* Thumbnail */}
          {selectedPost.thumbnail_url && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Preview</h3>
              <img 
                src={selectedPost.thumbnail_url} 
                alt="Post thumbnail" 
                className="w-full max-h-[400px] object-cover rounded-lg"
              />
            </div>
          )}

          {/* View on Platform Button */}
          {selectedPost.permalink && (
            <div>
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
              >
                <a 
                  href={selectedPost.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View on {selectedPost.platform === 'instagram' ? 'Instagram' : 'TikTok'}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          {/* Engagement Stats */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Engagement Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 p-4 bg-muted rounded-lg"
              >
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{selectedPost.likes.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 p-4 bg-muted rounded-lg"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{selectedPost.comments.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Comments</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 p-4 bg-muted rounded-lg"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{selectedPost.shares.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Shares</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 p-4 bg-muted rounded-lg"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalEngagement.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Engagement</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                </div>
                <p className="text-2xl font-bold">{selectedPost.engagement_rate?.toFixed(2)}%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Days Since Posted</p>
                </div>
                <p className="text-2xl font-bold">
                  {Math.floor((Date.now() - new Date(selectedPost.posted_at).getTime()) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Post ID: {selectedPost.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
