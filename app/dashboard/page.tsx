'use client'

import { SummaryCards } from '@/components/dashboard/summary-cards'
import { EngagementChart } from '@/components/dashboard/engagement-chart'
import { PostsTable } from '@/components/dashboard/posts-table'
import { PostDetailModal } from '@/components/dashboard/post-detail-modal'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
      } else {
        setUserEmail(user.email ?? '')
      }
    }
    
    checkUser()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{userEmail}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Cards Section */}
          <SummaryCards />

          {/* Chart Section */}
          <EngagementChart />

          {/* Posts Table Section */}
          <PostsTable />
        </div>
      </main>

      {/* Post Detail Modal */}
      <PostDetailModal />
    </div>
  )
}
