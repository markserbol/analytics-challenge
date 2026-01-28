import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { Database } from '@/lib/database.types'

type DailyMetric = Database['public']['Tables']['daily_metrics']['Row']

export const runtime = 'edge'

export async function GET(request: Request) {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.headers.get('cookie')?.split(';').map(cookie => {
            const [name, ...rest] = cookie.trim().split('=')
            return { name, value: rest.join('=') }
          }) ?? []
        },
        setAll() {},
      },
    }
  )
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const daysParam = searchParams.get('days')
    const days = daysParam ? parseInt(daysParam, 10) : 30

    // Validate days parameter
    if (isNaN(days) || days < 1 || days > 365) {
      return NextResponse.json(
        { error: 'Invalid days parameter. Must be between 1 and 365.' },
        { status: 400 }
      )
    }

    // 1. Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - days)

    const startDateStr = startDate.toISOString().split('T')[0]

    // 3. Fetch daily metrics for the user within the date range
    const { data: metrics, error: metricsError } = await supabase
      .from('daily_metrics')
      .select('date, engagement, reach')
      .eq('user_id', user.id)
      .gte('date', startDateStr)
      .order('date', { ascending: true })

    if (metricsError) {
      throw metricsError
    }

    // 4. Handle empty state - return empty array with date range
    if (!metrics || metrics.length === 0) {
      // Generate empty data points for the requested range
      const emptyMetrics = []
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - (days - 1 - i))
        emptyMetrics.push({
          date: date.toISOString().split('T')[0],
          engagement: 0,
          reach: 0,
        })
      }

      return NextResponse.json({
        data: emptyMetrics,
        days,
        isEmpty: true,
      })
    }

    // Type assertion for metrics array
    const typedMetrics = metrics as DailyMetric[]

    // 5. Fill in missing dates with zero values
    const metricsMap = new Map(typedMetrics.map((m) => [m.date, m]))
    const completeMetrics = []

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      const dateStr = date.toISOString().split('T')[0]

      if (metricsMap.has(dateStr)) {
        completeMetrics.push(metricsMap.get(dateStr))
      } else {
        completeMetrics.push({
          date: dateStr,
          engagement: 0,
          reach: 0,
        })
      }
    }

    // 6. Return the metrics
    return NextResponse.json({
      data: completeMetrics,
      days,
      isEmpty: false,
    })
  } catch (error) {
    console.error('Error fetching daily metrics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
