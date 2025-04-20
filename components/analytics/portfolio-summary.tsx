"use client"

import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioSummaryProps {
  detailed?: boolean
}

export function PortfolioSummary({ detailed = false }: PortfolioSummaryProps) {
  const metrics = [
    {
      name: "Total Assets",
      value: "24",
      change: "+3",
      trend: "up",
    },
    {
      name: "Total Value",
      value: "$4.25M",
      change: "+12.4%",
      trend: "up",
    },
    {
      name: "Monthly Change",
      value: "+$125K",
      change: "+3.2%",
      trend: "up",
    },
    {
      name: "Annual Return",
      value: "$510K",
      change: "+13.7%",
      trend: "up",
    },
    {
      name: "Pending Transfers",
      value: "3",
      change: "-1",
      trend: "down",
    },
    {
      name: "Verification Rate",
      value: "98%",
      change: "+2%",
      trend: "up",
    },
  ]

  return (
    <div className="terminal-card">
      <h3 className="text-xs font-medium mb-4">PORTFOLIO SUMMARY</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase">{metric.name}</div>
            <div className="text-lg font-mono">{metric.value}</div>
            <div className="flex items-center">
              {metric.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500 mr-1" />}
              {metric.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
              {metric.trend === "neutral" && <TrendingUp className="h-3 w-3 text-zinc-500 mr-1" />}
              <span
                className={cn(
                  "text-xs",
                  metric.trend === "up" && "text-green-500",
                  metric.trend === "down" && "text-red-500",
                  metric.trend === "neutral" && "text-zinc-500",
                )}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
