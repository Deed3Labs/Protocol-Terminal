"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  Building2,
  Car,
  Tractor,
  Grid,
  List,
  ChevronDown,
  Star,
  ArrowUpDown,
  ChevronUp,
  BarChart2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { AssetCard } from "@/components/asset-card"

// Sample asset data
const assets = [
  {
    id: "1",
    name: "Luxury Condo #42",
    description: "Modern 3-bedroom luxury condominium in downtown with panoramic city views.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$850,000",
    location: "123 Main St, New York, NY",
    category: "real-estate",
    status: "Verified",
    tokenId: "0x1a2b3c4d",
    acquisitionDate: "2024-10-15",
    favorite: true,
  },
  {
    id: "2",
    name: "Commercial Building",
    description: "5-story commercial building with retail space on ground floor and offices above.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$2.4M",
    location: "456 Business Ave, Chicago, IL",
    category: "real-estate",
    status: "Verified",
    tokenId: "0x5e6f7g8h",
    acquisitionDate: "2024-08-22",
    favorite: false,
  },
  {
    id: "3",
    name: "Agricultural Land",
    description: "20-acre agricultural land with irrigation system and storage facilities.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$650,000",
    location: "Rural Route 7, Iowa",
    category: "real-estate",
    status: "Pending",
    tokenId: "0x9i0j1k2l",
    acquisitionDate: "2025-01-05",
    favorite: true,
  },
  {
    id: "4",
    name: "Tesla Model S",
    description: "2023 Tesla Model S Plaid, fully loaded with all options and FSD.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$110,000",
    location: "Miami, FL",
    category: "vehicles",
    status: "Verified",
    tokenId: "0x3m4n5o6p",
    acquisitionDate: "2024-11-30",
    favorite: false,
  },
  {
    id: "5",
    name: "Construction Excavator",
    description: "2020 Caterpillar 320 Hydraulic Excavator with 1,200 hours.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$180,000",
    location: "Dallas, TX",
    category: "equipment",
    status: "Verified",
    tokenId: "0x7q8r9s0t",
    acquisitionDate: "2024-12-10",
    favorite: false,
  },
  {
    id: "6",
    name: "Yacht - Sea Breeze",
    description: "42-foot luxury yacht with 3 cabins, fully equipped galley, and navigation systems.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$320,000",
    location: "San Diego, CA",
    category: "vehicles",
    status: "Pending",
    tokenId: "0x1u2v3w4x",
    acquisitionDate: "2025-02-18",
    favorite: true,
  },
]

export function MyAssetsView() {
  const { addToHistory, setActiveView } = useTerminal()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    assets.reduce((acc, asset) => ({ ...acc, [asset.id]: asset.favorite }), {}),
  )
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [isComparing, setIsComparing] = useState(false)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    addToHistory(`filter --category=${category}`)
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    addToHistory(`sort --column=${column} --direction=${sortDirection === "asc" ? "desc" : "asc"}`)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
    addToHistory(`${favorites[id] ? "unfavorite" : "favorite"} --asset=${id}`)
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

  const handleViewDetails = (id: string) => {
    addToHistory(`view --asset=${id}`)
    setActiveView("asset-detail")
  }

  const handleTransfer = (id: string) => {
    addToHistory(`transfer --asset=${id}`)
    setActiveView("transfer")
  }

  const filteredAssets = assets.filter((asset) => {
    // Filter by category
    if (activeCategory !== "all" && asset.category !== activeCategory) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !asset.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !asset.tokenId.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    let comparison = 0

    switch (sortColumn) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "price":
        comparison =
          Number.parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      case "category":
        comparison = a.category.localeCompare(b.category)
        break
      case "date":
        comparison = new Date(a.acquisitionDate).getTime() - new Date(b.acquisitionDate).getTime()
        break
      default:
        comparison = 0
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">My Assets</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your tokenized real-world assets</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="w-full sm:w-64 pl-8 h-8 bg-zinc-900 border-zinc-700 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isComparing ? (
            <Button
              variant="default"
              size="sm"
              className="h-8"
              onClick={handleCompare}
              disabled={selectedAssets.length < 2}
            >
              <BarChart2 className="h-3.5 w-3.5 mr-1" />
              Compare ({selectedAssets.length})
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-8 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
              onClick={() => setActiveView("tokenize")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Asset
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => handleCategoryChange("all")}
            >
              All Assets
            </Button>
            <Button
              variant={activeCategory === "real-estate" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => handleCategoryChange("real-estate")}
            >
              <Building2 className="h-3.5 w-3.5 mr-1" />
              Real Estate
            </Button>
            <Button
              variant={activeCategory === "vehicles" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => handleCategoryChange("vehicles")}
            >
              <Car className="h-3.5 w-3.5 mr-1" />
              Vehicles
            </Button>
            <Button
              variant={activeCategory === "equipment" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => handleCategoryChange("equipment")}
            >
              <Tractor className="h-3.5 w-3.5 mr-1" />
              Equipment
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isComparing ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={toggleCompareMode}
            >
              <BarChart2 className="h-3.5 w-3.5 mr-1" />
              {isComparing ? "Cancel Compare" : "Compare Assets"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Assets</DropdownMenuItem>
                <DropdownMenuItem>Verified Only</DropdownMenuItem>
                <DropdownMenuItem>Pending Verification</DropdownMenuItem>
                <DropdownMenuItem>Favorites</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center border border-zinc-800 rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={`h-7 w-7 p-0 rounded-none ${viewMode === "grid" ? "bg-zinc-800" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-7 w-7 p-0 rounded-none ${viewMode === "list" ? "bg-zinc-800" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                {...asset}
                favorite={favorites[asset.id]}
                isSelectable={isComparing}
                isSelected={selectedAssets.includes(asset.id)}
                onSelect={handleAssetSelect}
                onToggleFavorite={toggleFavorite}
                onViewDetails={handleViewDetails}
                onTransfer={handleTransfer}
                compact={false}
              />
            ))}
          </div>
        ) : (
          <div className="terminal-card">
            <Table>
              <TableHeader>
                <TableRow>
                  {isComparing && <TableHead className="w-[30px]"></TableHead>}
                  <TableHead className={isComparing ? "w-[30px]" : "w-[30px]"}>
                    {!isComparing && <span className="sr-only">Favorite</span>}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Name
                      {sortColumn === "name" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ChevronDown className="ml-1 h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden sm:table-cell" onClick={() => handleSort("category")}>
                    <div className="flex items-center">
                      Category
                      {sortColumn === "category" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ChevronDown className="ml-1 h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                    <div className="flex items-center">
                      Value
                      {sortColumn === "price" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ChevronDown className="ml-1 h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("status")}>
                    <div className="flex items-center">
                      Status
                      {sortColumn === "status" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ChevronDown className="ml-1 h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden lg:table-cell" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Acquisition Date
                      {sortColumn === "date" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-3 w-3" />
                        ) : (
                          <ChevronDown className="ml-1 h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    {isComparing && (
                      <TableCell>
                        <Checkbox
                          checked={selectedAssets.includes(asset.id)}
                          onCheckedChange={() => handleAssetSelect(asset.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      {!isComparing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleFavorite(asset.id)}
                        >
                          {favorites[asset.id] ? (
                            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                          ) : (
                            <Star className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        {asset.category === "real-estate" && <Building2 className="h-3.5 w-3.5 text-zinc-500" />}
                        {asset.category === "vehicles" && <Car className="h-3.5 w-3.5 text-zinc-500" />}
                        {asset.category === "equipment" && <Tractor className="h-3.5 w-3.5 text-zinc-500" />}
                        <span className="capitalize">{asset.category.replace("-", " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell>{asset.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={asset.status === "Verified" ? "default" : "secondary"}>{asset.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(asset.acquisitionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleViewDetails(asset.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs hidden sm:inline-flex"
                          onClick={() => handleTransfer(asset.id)}
                        >
                          Transfer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          Showing <span className="font-medium">{sortedAssets.length}</span> of{" "}
          <span className="font-medium">{assets.length}</span> assets
        </div>
        <div className="flex items-center gap-2">
          {isComparing ? (
            <Button
              variant="default"
              size="sm"
              className="h-7 text-xs"
              onClick={handleCompare}
              disabled={selectedAssets.length < 2}
            >
              <BarChart2 className="h-3.5 w-3.5 mr-1" />
              Compare Selected ({selectedAssets.length})
            </Button>
          ) : (
            <>
              <Button variant="outline" size="sm" className="h-7 text-xs hidden sm:inline-flex">
                Export Assets
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setActiveView("tokenize")}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Asset
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
