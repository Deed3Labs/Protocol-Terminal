"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts"
import { useState } from "react"

interface AssetDistributionChartProps {
  detailed?: boolean
}

export function AssetDistributionChart({ detailed = false }: AssetDistributionChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const data = [
    { name: "Real Estate", value: 2800000, color: "#0088FE" },
    { name: "Vehicles", value: 850000, color: "#00C49F" },
    { name: "Equipment", value: 600000, color: "#FFBB28" },
  ]

  const detailedData = [
    { name: "Residential", value: 1500000, color: "#0088FE" },
    { name: "Commercial", value: 1300000, color: "#1E88E5" },
    { name: "Luxury Vehicles", value: 550000, color: "#00C49F" },
    { name: "Standard Vehicles", value: 300000, color: "#26A69A" },
    { name: "Heavy Equipment", value: 400000, color: "#FFBB28" },
    { name: "Light Equipment", value: 200000, color: "#FFC107" },
  ]

  const chartData = detailed ? detailedData : data

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        {detailed && (
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff" fontSize={12}>
            {`${payload.name}: ${(percent * 100).toFixed(0)}%`}
          </text>
        )}
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={detailed ? 60 : 0}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          label={({ name, percent }) => (detailed ? "" : `${name} ${(percent * 100).toFixed(0)}%`)}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [formatTooltipValue(value), "Value"]}
          contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
          labelStyle={{ color: "#999" }}
        />
        <Legend
          layout={detailed ? "vertical" : "horizontal"}
          verticalAlign={detailed ? "middle" : "bottom"}
          align={detailed ? "right" : "center"}
          wrapperStyle={{ fontSize: "10px", color: "#999", paddingLeft: detailed ? "20px" : "0" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
