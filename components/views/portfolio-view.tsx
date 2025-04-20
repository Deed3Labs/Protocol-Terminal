"use client"

import { useState } from "react"
import { AssetValueChart } from "@/components/analytics/asset-value-chart"
import { AssetDistributionChart } from "@/components/analytics/asset-distribution-chart"
import { AssetPerformanceTable } from "@/components/analytics/asset-performance-table"
import { PortfolioSummary } from "@/components/analytics/portfolio-summary"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PortfolioView() {
  const [timeRange, setTimeRange] = useState<"1m" | "3m" | "6m" | "1y" | "2y" | "all">("1y")

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Portfolio Analysis</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search portfolio..."
              className="w-64 pl-8 h-8 bg-zinc-900 border-zinc-700 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <PortfolioSummary />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="terminal-card lg:col-span-2">
            <h3 className="text-xs font-medium mb-4">PORTFOLIO PERFORMANCE</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-zinc-500">Asset value trends over time</div>
              <div className="flex items-center gap-1">
                {["1m", "3m", "6m", "1y", "2y", "all"].map((range) => (
                  <Button
                    key={range}
                    variant="ghost"
                    size="sm"
                    className={`h-6 px-2 text-xs ${timeRange === range ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                    onClick={() => setTimeRange(range as any)}
                  >
                    {range.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
            <div className="h-[400px]">
              <AssetValueChart detailed />
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">ASSET ALLOCATION</h3>
            <div className="h-[400px]">
              <AssetDistributionChart detailed />
            </div>
          </div>
        </div>

        <div className="terminal-card">
          <h3 className="text-xs font-medium mb-4">DETAILED ASSET PERFORMANCE</h3>
          <AssetPerformanceTable detailed />
        </div>
      </div>
    </div>
  )
}
