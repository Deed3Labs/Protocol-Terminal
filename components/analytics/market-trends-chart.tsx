"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from "recharts"

interface MarketTrendsChartProps {
  timeRange?: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all"
  detailed?: boolean
}

export function MarketTrendsChart({ timeRange = "1m", detailed = false }: MarketTrendsChartProps) {
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

      // Calculate values with some randomness for realistic fluctuation
      const realEstateIndex = 100 + i * 2 + (Math.random() * 10 - 5)
      const vehicleIndex = 100 + i * 1 + (Math.random() * 15 - 7.5)
      const equipmentIndex = 100 + i * 0.5 + (Math.random() * 8 - 4)
      const overallIndex = realEstateIndex * 0.6 + vehicleIndex * 0.3 + equipmentIndex * 0.1

      data.push({
        date: date.toLocaleDateString(),
        realEstate: Math.round(realEstateIndex * 10) / 10,
        vehicles: Math.round(vehicleIndex * 10) / 10,
        equipment: Math.round(equipmentIndex * 10) / 10,
        overall: Math.round(overallIndex * 10) / 10,
      })
    }

    return data
  }

  const data = generateData()

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
        <YAxis domain={["dataMin - 5", "dataMax + 5"]} stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
        <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} labelStyle={{ color: "#999" }} />
        <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />

        <Line
          type="monotone"
          dataKey="overall"
          stroke="#10b981"
          activeDot={{ r: 8 }}
          name="Overall Index"
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="realEstate" stroke="#3b82f6" name="Real Estate" strokeWidth={1.5} />
        <Line type="monotone" dataKey="vehicles" stroke="#f59e0b" name="Vehicles" strokeWidth={1.5} />
        <Line type="monotone" dataKey="equipment" stroke="#ec4899" name="Equipment" strokeWidth={1.5} />

        {detailed && <Brush dataKey="date" height={30} stroke="#666" />}
      </LineChart>
    </ResponsiveContainer>
  )
}
