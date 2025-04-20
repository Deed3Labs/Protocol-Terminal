"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

interface AssetValueChartProps {
  timeRange?: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all"
  category?: string
  detailed?: boolean
}

export function AssetValueChart({ timeRange = "1m", category, detailed = false }: AssetValueChartProps) {
  // Generate data based on timeRange
  const generateData = () => {
    const data = []
    const now = new Date()
    let interval = 1
    let format = "MMM DD"
    let points = 12

    switch (timeRange) {
      case "1d":
        interval = 2
        format = "HH:mm"
        points = 12
        break
      case "1w":
        interval = 1
        format = "ddd"
        points = 7
        break
      case "1m":
        interval = 3
        format = "MMM DD"
        points = 10
        break
      case "3m":
        interval = 1
        format = "MMM"
        points = 3
        break
      case "6m":
        interval = 1
        format = "MMM"
        points = 6
        break
      case "1y":
        interval = 1
        format = "MMM"
        points = 12
        break
      case "all":
        interval = 1
        format = "YYYY"
        points = 5
        break
    }

    // Base values for different categories
    let baseValue = 3200000
    let volatility = 0.05

    if (category === "real-estate") {
      baseValue = 2800000
      volatility = 0.03
    } else if (category === "vehicles") {
      baseValue = 850000
      volatility = 0.08
    } else if (category === "equipment") {
      baseValue = 600000
      volatility = 0.06
    }

    // Generate data points
    for (let i = 0; i < points; i++) {
      const date = new Date(now)

      if (timeRange === "1d") {
        date.setHours(now.getHours() - (points - i) * interval)
      } else if (timeRange === "1w") {
        date.setDate(now.getDate() - (points - i) * interval)
      } else if (timeRange === "1m") {
        date.setDate(now.getDate() - (points - i) * interval)
      } else if (timeRange === "3m" || timeRange === "6m") {
        date.setMonth(now.getMonth() - (points - i) * interval)
      } else if (timeRange === "1y") {
        date.setMonth(now.getMonth() - (points - i) * interval)
      } else if (timeRange === "all") {
        date.setFullYear(now.getFullYear() - (points - i) * interval)
      }

      // Calculate value with some randomness for realistic fluctuation
      const randomFactor = 1 + (Math.random() * volatility * 2 - volatility)
      // Add an upward trend over time
      const trendFactor = 1 + i * 0.01
      const value = baseValue * randomFactor * trendFactor

      data.push({
        date: date.toLocaleDateString(),
        value: Math.round(value),
        // Add additional metrics for detailed view
        projected: detailed ? Math.round(value * (1 + Math.random() * 0.05)) : undefined,
        benchmark: detailed ? Math.round(value * (0.9 + Math.random() * 0.1)) : undefined,
      })
    }

    return data
  }

  const data = generateData()

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="date" stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
        <YAxis
          tickFormatter={formatYAxis}
          domain={["auto", "auto"]}
          stroke="#666"
          tick={{ fill: "#999", fontSize: 10 }}
        />
        <Tooltip
          formatter={(value: number) => [formatTooltipValue(value), "Value"]}
          contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
          labelStyle={{ color: "#999" }}
        />
        <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />

        {detailed && <ReferenceLine y={data[0].value} stroke="#666" strokeDasharray="3 3" />}

        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          activeDot={{ r: 8 }}
          name="Portfolio Value"
          strokeWidth={2}
        />

        {detailed && (
          <>
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#60a5fa"
              strokeDasharray="5 5"
              name="Projected Value"
              strokeWidth={1.5}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#f59e0b"
              strokeDasharray="3 3"
              name="Market Benchmark"
              strokeWidth={1.5}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
