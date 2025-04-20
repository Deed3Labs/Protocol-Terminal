"use client"
import { MarketTrendsChart } from "@/components/analytics/market-trends-chart"
import { AssetValueChart } from "@/components/analytics/asset-value-chart"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function MarketView() {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Market Data</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search market data..."
              className="w-64 pl-8 h-8 bg-zinc-900 border-zinc-700 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="terminal-card">
          <h3 className="text-xs font-medium mb-4">MARKET TRENDS</h3>
          <div className="h-[400px]">
            <MarketTrendsChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">REAL ESTATE MARKET INDEX</h3>
            <div className="h-[300px]">
              <AssetValueChart category="real-estate" />
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">VEHICLE MARKET INDEX</h3>
            <div className="h-[300px]">
              <AssetValueChart category="vehicles" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
