"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ProtocolMetricsProps {
  timeRange?: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all"
  detailed?: boolean
}

export function ProtocolMetrics({ timeRange = "1m", detailed = false }: ProtocolMetricsProps) {
  // Generate data based on timeRange
  const generateData = () => {
    const data = []
    const now = new Date()
    let interval = 1
    let points = 12

    switch (timeRange) {
      case "1d":
        interval = 2
        points = 12
        break
      case "1w":
        interval = 1
        points = 7
        break
      case "1m":
        interval = 3
        points = 10
        break
      case "3m":
        interval = 9
        points = 10
        break
      case "6m":
        interval = 18
        points = 10
        break
      case "1y":
        interval = 36
        points = 12
        break
      case "all":
        interval = 60
        points = 10
        break
    }

    // Generate data points
    for (let i = 0; i < points; i++) {
      const date = new Date(now)

      if (timeRange === "1d") {
        date.setHours(now.getHours() - (points - i) * interval)
      } else if (timeRange === "1w") {
        date.setDate(now.getDate() - (points - i) * interval)
      } else if (timeRange === "1m" || timeRange === "3m" || timeRange === "6m") {
        date.setDate(now.getDate() - (points - i) * interval)
      } else if (timeRange === "1y" || timeRange === "all") {
        date.setDate(now.getDate() - (points - i) * interval)
      }

      // Base values with upward trend and some volatility
      const baseTVL = 120000000 + i * 2000000 + (Math.random() * 10000000 - 5000000)
      const baseVolume = 8000000 + i * 400000 + (Math.random() * 2000000 - 1000000)
      const baseTransactions = 8000 + i * 400 + (Math.random() * 1000 - 500)
      const baseActiveUsers = 4000 + i * 200 + (Math.random() * 500 - 250)

      data.push({
        date: date.toLocaleDateString(),
        tvl: Math.round(baseTVL / 1000000), // In millions
        volume: Math.round(baseVolume / 1000000), // In millions
        transactions: Math.round(baseTransactions),
        activeUsers: Math.round(baseActiveUsers),
      })
    }

    return data
  }

  const data = generateData()

  const formatYAxis = (value: number) => {
    return `${value}M`
  }

  const formatTooltipValue = (value: number, name: string) => {
    if (name === "tvl" || name === "volume") {
      return `$${value}M`
    }
    return value
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
          yAxisId="left"
          tickFormatter={formatYAxis}
          domain={["auto", "auto"]}
          stroke="#666"
          tick={{ fill: "#999", fontSize: 10 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={["auto", "auto"]}
          stroke="#666"
          tick={{ fill: "#999", fontSize: 10 }}
        />
        <Tooltip
          formatter={formatTooltipValue}
          contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
          labelStyle={{ color: "#999" }}
        />
        <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="tvl"
          stroke="#10b981"
          activeDot={{ r: 8 }}
          name="TVL ($M)"
          strokeWidth={2}
        />
        <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#3b82f6" name="Volume ($M)" strokeWidth={1.5} />
        {detailed && (
          <>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="transactions"
              stroke="#f59e0b"
              name="Transactions"
              strokeWidth={1.5}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="activeUsers"
              stroke="#ec4899"
              name="Active Users"
              strokeWidth={1.5}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
