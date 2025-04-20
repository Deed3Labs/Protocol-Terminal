"use client"

import { AssetGrid } from "@/components/dashboard/asset-grid"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AssetCategoryViewProps {
  category: string
}

export function AssetCategoryView({ category }: AssetCategoryViewProps) {
  const categoryTitle = category === "real-estate" ? "Real Estate" : category === "vehicles" ? "Vehicles" : "Equipment"

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">{categoryTitle} Assets</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-zinc-500" />
            <Input
              type="search"
              placeholder={`Search ${categoryTitle.toLowerCase()}...`}
              className="w-64 pl-8 h-8 bg-zinc-900 border-zinc-700 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="terminal-card p-6">
        <AssetGrid category={category} />
      </div>
    </div>
  )
}
