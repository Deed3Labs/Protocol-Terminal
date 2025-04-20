"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jan", value: 3200000 },
  { month: "Feb", value: 3250000 },
  { month: "Mar", value: 3400000 },
  { month: "Apr", value: 3380000 },
  { month: "May", value: 3500000 },
  { month: "Jun", value: 3650000 },
  { month: "Jul", value: 3800000 },
  { month: "Aug", value: 3950000 },
  { month: "Sep", value: 4050000 },
  { month: "Oct", value: 4150000 },
  { month: "Nov", value: 4200000 },
  { month: "Dec", value: 4250000 },
]

export function AssetValueChart() {
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} domain={[3000000, 4500000]} />
        <Tooltip formatter={(value) => [`$${(Number(value)).toLocaleString()}`, "Portfolio Value"]} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Portfolio Value" />
      </LineChart>
    </ResponsiveContainer>
  )
}
