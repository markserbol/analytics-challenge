import { create } from 'zustand'
import type { NormalizedPost } from '../hooks/use-posts'

interface DashboardState {
  // Platform filter state
  platformFilter: 'all' | 'instagram' | 'tiktok'
  setPlatformFilter: (filter: 'all' | 'instagram' | 'tiktok') => void

  // Sort state
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
  setSortColumn: (column: string | null) => void
  setSortDirection: (direction: 'asc' | 'desc') => void
  setSorting: (column: string | null, direction: 'asc' | 'desc') => void

  // Selected post for modal
  selectedPost: NormalizedPost | null
  setSelectedPost: (post: NormalizedPost | null) => void

  // Chart view type
  chartViewType: 'line' | 'bar'
  setChartViewType: (type: 'line' | 'bar') => void
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
  setSorting: (column, direction) => set({ sortColumn: column, sortDirection: direction }),

  // Selected post - ephemeral modal state
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),

  // Chart view preference - UI state
  chartViewType: 'line',
  setChartViewType: (type) => set({ chartViewType: type }),
}))
