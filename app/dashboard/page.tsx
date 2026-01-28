import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user.email}</span>
            <form action={handleSignOut}>
              <Button variant="outline" type="submit">Sign Out</Button>
            </form>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Cards Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Summary cards will go here */}
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600">Total Engagement</p>
                <p className="text-3xl font-bold text-slate-900">Loading...</p>
              </div>
            </div>
          </section>

          {/* Chart Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Engagement Trend</h2>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              {/* Chart will go here */}
              <p className="text-slate-600">Chart loading...</p>
            </div>
          </section>

          {/* Posts Table Section */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Posts</h2>
            <div className="bg-white rounded-lg border border-slate-200">
              {/* Posts table will go here */}
              <p className="p-6 text-slate-600">Posts table loading...</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
