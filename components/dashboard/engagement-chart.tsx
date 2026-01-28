'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDailyMetrics } from '@/lib/hooks/use-posts'
import { useDashboardStore } from '@/lib/stores/dashboard-store'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function EngagementChart() {
  const chartViewType = useDashboardStore((state) => state.chartViewType)
  const setChartViewType = useDashboardStore((state) => state.setChartViewType)
  const { data: metrics, isLoading, error } = useDailyMetrics(30)

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive">Failed to load metrics data</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-[140px]" />
            <Skeleton className="h-9 w-[120px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  const chartData = {
    labels: metrics?.data.map((m) => new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) ?? [],
    datasets: [
      {
        label: 'Engagement',
        data: metrics?.data.map((m) => m.engagement) ?? [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Reach',
        data: metrics?.data.map((m) => m.reach) ?? [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Engagement Over Time</CardTitle>
          <Select value={chartViewType} onValueChange={(value: 'line' | 'bar') => setChartViewType(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartViewType === 'line' ? (
            <Line data={chartData} options={options} />
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
