"use client"

import * as React from "react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("w-full", className)} ref={ref} {...props}>
      {children}
    </div>
  )
})
Chart.displayName = "Chart"

const ChartContainer = ({
  data,
  xField,
  categories,
  colors,
  children,
  startEndOnly = false,
}: {
  data: any[]
  xField: string
  categories: string[]
  colors: string[]
  children: React.ReactNode
  startEndOnly?: boolean
}) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data}>{children}</ComposedChart>
    </ResponsiveContainer>
  )
}

const ChartGrid = ({ horizontal, vertical }: { horizontal?: boolean; vertical?: boolean }) => {
  return <CartesianGrid stroke="#333" strokeDasharray="3 3" horizontal={horizontal} vertical={vertical} />
}

const ChartLine = ({ name, dataKey, stroke }: { name: string; dataKey?: string; stroke?: string }) => {
  return <Line type="monotone" dataKey={name} stroke={stroke} name={name} strokeWidth={2} />
}

const ChartArea = ({ name, dataKey }: { name: string; dataKey?: string }) => {
  return <Area type="monotone" dataKey={name} stroke="#8884d8" fill="#8884d8" name={name} />
}

const ChartXAxis = () => {
  return <XAxis dataKey="date" stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
}

const ChartYAxis = () => {
  return <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
}

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} labelStyle={{ color: "#999" }}>
      {children}
    </Tooltip>
  )
}

const ChartTooltipContent = () => {
  return null
}

const ChartPie = ({
  data,
  nameKey,
  valueKey,
  colorKey,
}: { data: any[]; nameKey: string; valueKey: string; colorKey: string }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry[colorKey]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} labelStyle={{ color: "#999" }} />
        <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

const ChartLegend = () => {
  return <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />
}

export {
  Chart,
  ChartGrid,
  ChartLine,
  ChartArea,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartPie,
  ChartLegend,
}
