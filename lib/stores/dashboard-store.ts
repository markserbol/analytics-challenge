import { create } from 'zustand'
import { Database } from '../database.types'

type Post = Database['public']['Tables']['posts']['Row']

interface DashboardState {
  // Platform filter state
  platformFilter: 'all' | 'instagram' | 'tiktok'
  setPlatformFilter: (filter: 'all' | 'instagram' | 'tiktok') => void

  // Sort state
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
  setSortColumn: (column: string | null) => void
  setSortDirection: (direction: 'asc' | 'desc') => void

  // Selected post for modal
  selectedPost: Post | null
  setSelectedPost: (post: Post | null) => void

  // Chart view type
  chartViewType: 'line' | 'area'
  setChartViewType: (type: 'line' | 'area') => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Platform filter - UI state that doesn't need to persist
  platformFilter: 'all',
  setPlatformFilter: (filter) => set({ platformFilter: filter }),

  // Sort state - could be in URL but keeping in Zustand for simplicity
  sortColumn: null,
  sortDirection: 'desc',
  setSortColumn: (column) => set({ sortColumn: column }),
  setSortDirection: (direction) => set({ sortDirection: direction }),

  // Selected post - ephemeral modal state
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),

  // Chart view preference - UI state
  chartViewType: 'area',
  setChartViewType: (type) => set({ chartViewType: type }),
}))
