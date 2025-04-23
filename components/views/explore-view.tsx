"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, SlidersHorizontal, Grid, List, LayoutGrid, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { AssetCard } from "@/components/asset-card"
import { MapPlaceholder } from "@/components/map-placeholder"

// Sample asset data
const mockAssets = [
  {
    id: "1",
    name: "Agricultural Land",
    description: "Fertile farmland for agriculture",
    image: "/placeholder.svg?height=400&width=400",
    price: "$2.4M",
    location: "Iowa City, IA",
    category: "real-estate",
    status: "pending",
    tokenId: "0x130",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 41.6611, lng: -91.5302 },
  },
  {
    id: "2",
    name: "Commercial Building",
    description: "Office space in business district",
    image: "/placeholder.svg?height=400&width=400",
    price: "$2.4M",
    location: "Chicago, IL",
    category: "real-estate",
    status: "verified",
    tokenId: "0x125",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    id: "3",
    name: "Construction Excavator",
    description: "Heavy machinery for construction",
    image: "/placeholder.svg?height=400&width=400",
    price: "$180,000",
    location: "Dallas, TX",
    category: "equipment",
    status: "verified",
    tokenId: "0x127",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 32.7767, lng: -96.797 },
  },
  {
    id: "4",
    name: "Delivery Truck Fleet",
    description: "Commercial delivery vehicles",
    image: "/placeholder.svg?height=400&width=400",
    price: "$275,000",
    location: "Detroit, MI",
    category: "vehicles",
    status: "verified",
    tokenId: "0x129",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 42.3314, lng: -83.0458 },
  },
  {
    id: "5",
    name: "Suburban House",
    description: "Spacious family home with garden",
    image: "/placeholder.svg?height=400&width=400",
    price: "$850,000",
    location: "Los Angeles, CA",
    category: "real-estate",
    status: "pending",
    tokenId: "0x124",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "6",
    name: "Beachfront Property",
    description: "Beautiful property with ocean view",
    image: "/placeholder.svg?height=400&width=400",
    price: "$3.2M",
    location: "San Diego, CA",
    category: "real-estate",
    status: "verified",
    tokenId: "0x128",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 32.7157, lng: -117.1611 },
  },
  {
    id: "7",
    name: "Vintage Car Collection",
    description: "Rare vintage automobiles",
    image: "/placeholder.svg?height=400&width=400",
    price: "$1.8M",
    location: "Detroit, MI",
    category: "vehicles",
    status: "pending",
    tokenId: "0x129",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 42.3314, lng: -83.0458 },
  },
  {
    id: "8",
    name: "Industrial Warehouse",
    description: "Large storage facility",
    image: "/placeholder.svg?height=400&width=400",
    price: "$1.5M",
    location: "Portland, OR",
    category: "real-estate",
    status: "verified",
    tokenId: "0x131",
    creator: "Deed Protocol",
    edition: "1",
    totalEditions: "1",
    coordinates: { lat: 45.5051, lng: -122.675 },
  },
]

export function ExploreView() {
  const router = useRouter()
  const { addToHistory, setActiveView } = useTerminal()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact" | "map">("grid")
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [isComparing, setIsComparing] = useState(false)
  const [selectedMapAsset, setSelectedMapAsset] = useState<string | null>(null)

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (id: string) => {
    router.push(`/asset/${id}`)
    addToHistory(`view --asset=${id}`)
    setActiveView("asset-detail")
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
    addToHistory(`${favorites[id] ? "unfavorite" : "favorite"} --asset=${id}`)
  }

  const handleTransfer = (id: string) => {
    addToHistory(`transfer --asset=${id}`)
    setActiveView("transfer")
  }

  const handleCompare = () => {
    if (selectedAssets.length >= 2) {
      addToHistory(`compare --assets=${selectedAssets.join(",")}`)
      setActiveView("asset-comparison")
    }
  }

  const toggleCompareMode = () => {
    setIsComparing(!isComparing)
    if (!isComparing) {
      setSelectedAssets([])
    }
  }

  const handleAssetSelect = (id: string) => {
    setSelectedAssets((prev) => {
      if (prev.includes(id)) {
        return prev.filter((assetId) => assetId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleMapAssetSelect = (id: string) => {
    setSelectedMapAsset(id === selectedMapAsset ? null : id)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-zinc-950">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-1">Explore Assets</h1>
        <p className="text-zinc-400 mb-6">Browse and discover tokenized real-world assets</p>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search by name, description"
              className="pl-10 bg-zinc-900 border-zinc-800 h-10 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button variant="outline" className="h-10 px-4 border-zinc-800 text-zinc-400 hover:text-white">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {isComparing ? (
              <Button
                variant="default"
                className="h-10 px-4"
                onClick={handleCompare}
                disabled={selectedAssets.length < 2}
              >
                Compare Assets
              </Button>
            ) : (
              <Button
                variant="outline"
                className="h-10 px-4 border-zinc-800 text-zinc-400 hover:text-white"
                onClick={toggleCompareMode}
              >
                Compare Assets
              </Button>
            )}

            <div className="flex border border-zinc-800 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-none ${viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-none ${viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-none ${viewMode === "compact" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                onClick={() => setViewMode("compact")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-none ${viewMode === "map" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-0">
        {viewMode === "map" ? (
          <MapPlaceholder
            assets={filteredAssets}
            selectedAssetId={selectedMapAsset}
            onAssetSelect={handleMapAssetSelect}
            onAssetDetails={handleViewDetails}
          />
        ) : (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                : viewMode === "list"
                  ? "grid-cols-1 gap-3"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            }`}
          >
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                {...asset}
                onViewDetails={handleViewDetails}
                onToggleFavorite={toggleFavorite}
                onTransfer={handleTransfer}
                favorite={favorites[asset.id]}
                isSelectable={isComparing}
                isSelected={selectedAssets.includes(asset.id)}
                onSelect={handleAssetSelect}
                compact={viewMode === "compact"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
