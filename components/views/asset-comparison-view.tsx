"use client"

import { useState, useEffect } from "react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, X, Plus, Building2, Car, Tractor } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample asset data - in a real app, this would come from your data store
const assets = [
  {
    id: "1",
    name: "Luxury Condo #42",
    description: "Modern 3-bedroom luxury condominium in downtown with panoramic city views.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$850,000",
    priceValue: 850000,
    location: "123 Main St, New York, NY",
    category: "real-estate",
    status: "Verified",
    tokenId: "0x1a2b3c4d",
    acquisitionDate: "2024-10-15",
    favorite: true,
    appreciation: "+8.2%",
    appreciationValue: 8.2,
    roi: "12.4%",
    roiValue: 12.4,
    risk: "Low",
    yearBuilt: "2020",
    size: "2,100 sq ft",
    bedrooms: "3",
    bathrooms: "2.5",
    amenities: ["Pool", "Gym", "Concierge", "Parking"],
    maintenanceFee: "$850/month",
    propertyTax: "$12,000/year",
    lastInspection: "2024-09-01",
    insuranceCost: "$3,200/year",
    occupancyStatus: "Owner-occupied",
    rentalIncome: "N/A",
    capRate: "N/A",
    projectedGrowth: "5.2%/year",
    neighborhood: "Downtown",
    walkScore: "92/100",
    transitScore: "95/100",
    schoolDistrict: "Manhattan District 2",
  },
  {
    id: "2",
    name: "Commercial Building",
    description: "5-story commercial building with retail space on ground floor and offices above.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$2,400,000",
    priceValue: 2400000,
    location: "456 Business Ave, Chicago, IL",
    category: "real-estate",
    status: "Verified",
    tokenId: "0x5e6f7g8h",
    acquisitionDate: "2024-08-22",
    favorite: false,
    appreciation: "+10.4%",
    appreciationValue: 10.4,
    roi: "15.2%",
    roiValue: 15.2,
    risk: "Medium",
    yearBuilt: "2005",
    size: "12,500 sq ft",
    floors: "5",
    occupancyRate: "92%",
    tenants: "8",
    leaseTerms: "3-5 years",
    annualIncome: "$216,000",
    operatingExpenses: "$84,000/year",
    capRate: "5.5%",
    noi: "$132,000",
    zoning: "Commercial C-2",
    lastRenovation: "2018",
    elevators: "2",
    parkingSpaces: "15",
    propertyTax: "$32,000/year",
    insuranceCost: "$18,500/year",
    projectedGrowth: "4.8%/year",
    neighborhood: "Business District",
    walkScore: "88/100",
    transitScore: "90/100",
  },
  {
    id: "4",
    name: "Tesla Model S",
    description: "2023 Tesla Model S Plaid, fully loaded with all options and FSD.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$110,000",
    priceValue: 110000,
    location: "Miami, FL",
    category: "vehicles",
    status: "Verified",
    tokenId: "0x3m4n5o6p",
    acquisitionDate: "2024-11-30",
    favorite: false,
    appreciation: "-13.6%",
    appreciationValue: -13.6,
    roi: "-8.2%",
    roiValue: -8.2,
    risk: "High",
    year: "2023",
    make: "Tesla",
    model: "Model S Plaid",
    mileage: "12,500 miles",
    color: "Midnight Silver",
    vin: "5YJ3E1EA1PF123456",
    range: "396 miles",
    batteryCapacity: "100 kWh",
    motorType: "Tri Motor",
    horsepower: "1,020 hp",
    acceleration: "0-60 mph in 1.99s",
    topSpeed: "200 mph",
    autopilot: "Full Self-Driving",
    seatingCapacity: "5",
    chargingSpeed: "250 kW",
    warranty: "4 years/50,000 miles",
    batteryWarranty: "8 years/150,000 miles",
    maintenanceCost: "$600/year",
    insuranceCost: "$2,800/year",
    registrationFee: "$1,200/year",
    projectedDepreciation: "15%/year",
  },
  {
    id: "5",
    name: "Construction Excavator",
    description: "2020 Caterpillar 320 Hydraulic Excavator with 1,200 hours.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$180,000",
    priceValue: 180000,
    location: "Dallas, TX",
    category: "equipment",
    status: "Verified",
    tokenId: "0x7q8r9s0t",
    acquisitionDate: "2024-12-10",
    favorite: false,
    appreciation: "-8.3%",
    appreciationValue: -8.3,
    roi: "-5.1%",
    roiValue: -5.1,
    risk: "Medium",
    year: "2020",
    make: "Caterpillar",
    model: "320 GC",
    hours: "1,200",
    enginePower: "121 hp",
    operatingWeight: "21.9 tons",
    maxDigDepth: "22 ft 8 in",
    bucketCapacity: "1.19 cu yd",
    fuelCapacity: "86 gal",
    hydraulicSystem: "Standard",
    undercarriage: "Standard",
    cabFeatures: "A/C, Heated Seat, Bluetooth",
    attachments: ["Standard Bucket", "Hydraulic Thumb"],
    maintenanceHistory: "Full service at 1,000 hours",
    warranty: "Extended warranty until 2025",
    maintenanceCost: "$8,500/year",
    insuranceCost: "$4,200/year",
    rentalPotential: "$12,000/month",
    projectedDepreciation: "10%/year",
    certifications: "OSHA Compliant",
  },
  {
    id: "6",
    name: "Yacht - Sea Breeze",
    description: "42-foot luxury yacht with 3 cabins, fully equipped galley, and navigation systems.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$320,000",
    priceValue: 320000,
    location: "San Diego, CA",
    category: "vehicles",
    status: "Pending",
    tokenId: "0x1u2v3w4x",
    acquisitionDate: "2025-02-18",
    favorite: true,
    appreciation: "+6.3%",
    appreciationValue: 6.3,
    roi: "9.7%",
    roiValue: 9.7,
    risk: "High",
    year: "2019",
    make: "Sea Ray",
    model: "Sundancer 420",
    length: "42 ft",
    beam: "13 ft",
    draft: "3 ft 8 in",
    engines: "Twin Cummins 550 HP",
    fuelCapacity: "300 gal",
    waterCapacity: "100 gal",
    cabins: "3",
    heads: "2",
    maxCapacity: "12 persons",
    hullMaterial: "Fiberglass",
    cruisingSpeed: "28 knots",
    maxSpeed: "32 knots",
    range: "300 nautical miles",
    generator: "Onan 11.5 kW",
    airConditioning: "16,000 BTU",
    electronics: "Raymarine Navigation Suite",
    maintenanceCost: "$18,000/year",
    insuranceCost: "$8,500/year",
    dockingFee: "$1,800/month",
    winterStorage: "$6,000/season",
    projectedDepreciation: "8%/year",
  },
]

export function AssetComparisonView() {
  const { setActiveView, addToHistory } = useTerminal()
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [availableAssets, setAvailableAssets] = useState(assets)
  const [isSelectingAssets, setIsSelectingAssets] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Initialize with 2 assets if none selected
  useEffect(() => {
    if (selectedAssets.length === 0 && !isSelectingAssets) {
      setSelectedAssets([assets[0].id, assets[1].id])
    }
  }, [selectedAssets, isSelectingAssets])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleAssetSelect = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter((id) => id !== assetId))
    } else {
      setSelectedAssets([...selectedAssets, assetId])
    }
  }

  const handleAddAsset = () => {
    setIsSelectingAssets(true)
  }

  const handleRemoveAsset = (assetId: string) => {
    setSelectedAssets(selectedAssets.filter((id) => id !== assetId))
  }

  const handleFinishSelection = () => {
    setIsSelectingAssets(false)
  }

  const handleBackToAssets = () => {
    addToHistory("cd /assets")
    setActiveView("collection")
  }

  const getComparisonAssets = () => {
    return assets.filter((asset) => selectedAssets.includes(asset.id))
  }

  const comparisonAssets = getComparisonAssets()

  // Get all unique keys from all assets for comparison
  const getAllKeys = (category: string) => {
    const keys = new Set<string>()
    comparisonAssets.forEach((asset) => {
      Object.keys(asset).forEach((key) => {
        // Filter keys based on category
        if (
          category === "overview" &&
          ["name", "category", "price", "location", "status", "tokenId", "acquisitionDate"].includes(key)
        ) {
          keys.add(key)
        } else if (
          category === "financial" &&
          ["price", "appreciation", "roi", "risk", "projectedGrowth", "projectedDepreciation"].includes(key)
        ) {
          keys.add(key)
        } else if (
          category === "specifications" &&
          ![
            "id",
            "name",
            "description",
            "image",
            "price",
            "priceValue",
            "location",
            "category",
            "status",
            "tokenId",
            "acquisitionDate",
            "favorite",
            "appreciation",
            "appreciationValue",
            "roi",
            "roiValue",
            "risk",
          ].includes(key)
        ) {
          keys.add(key)
        }
      })
    })
    return Array.from(keys)
  }

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "real-estate":
        return <Building2 className="h-4 w-4 text-zinc-400" />
      case "vehicles":
        return <Car className="h-4 w-4 text-zinc-400" />
      case "equipment":
        return <Tractor className="h-4 w-4 text-zinc-400" />
      default:
        return null
    }
  }

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/Id$/, "ID")
  }

  const renderValue = (asset: any, key: string) => {
    if (key === "category") {
      return (
        <div className="flex items-center gap-2">
          {renderCategoryIcon(asset[key])}
          <span className="capitalize">{asset[key].replace("-", " ")}</span>
        </div>
      )
    }

    if (key === "status") {
      return <Badge variant={asset[key] === "Verified" ? "default" : "secondary"}>{asset[key]}</Badge>
    }

    if (key === "risk") {
      return (
        <Badge variant={asset[key] === "Low" ? "outline" : asset[key] === "Medium" ? "secondary" : "destructive"}>
          {asset[key]}
        </Badge>
      )
    }

    if (key === "appreciation" || key === "roi") {
      const value = asset[key]
      const isPositive = !value.startsWith("-")
      return <Badge variant={isPositive ? "default" : "destructive"}>{value}</Badge>
    }

    if (Array.isArray(asset[key])) {
      return asset[key].join(", ")
    }

    return asset[key] || "N/A"
  }

  if (isSelectingAssets) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Select Assets to Compare</h1>
            <p className="text-sm text-zinc-400 mt-1">Choose up to 4 assets for side-by-side comparison</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={handleFinishSelection}
              disabled={selectedAssets.length < 2}
            >
              Done ({selectedAssets.length} selected)
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableAssets.map((asset) => (
            <div
              key={asset.id}
              className={`terminal-card p-0 overflow-hidden border-2 ${
                selectedAssets.includes(asset.id) ? "border-green-500" : "border-transparent"
              }`}
            >
              <div className="aspect-square relative">
                <img src={asset.image || "/placeholder.svg"} alt={asset.name} className="h-full w-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge variant={asset.status === "Verified" ? "default" : "secondary"}>{asset.status}</Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedAssets.includes(asset.id)}
                    onCheckedChange={() => handleAssetSelect(asset.id)}
                    className="h-5 w-5 border-2 border-white bg-black/50 data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{asset.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  {renderCategoryIcon(asset.category)}
                  <span className="text-xs text-zinc-500 capitalize">{asset.category.replace("-", " ")}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-2 line-clamp-2">{asset.description}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-zinc-500">Value</div>
                  <div className="text-sm font-bold">{asset.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8" onClick={handleBackToAssets}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Assets
          </Button>
          <h1 className="text-lg font-semibold tracking-tight">Asset Comparison</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={handleAddAsset}
            disabled={selectedAssets.length >= 4}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Asset
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="terminal-card overflow-hidden">
              <div className="flex">
                {comparisonAssets.map((asset) => (
                  <div key={asset.id} className="flex-1 border-r last:border-r-0 border-zinc-800 p-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 text-zinc-500 hover:text-white"
                      onClick={() => handleRemoveAsset(asset.id)}
                      disabled={comparisonAssets.length <= 2}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <div className="aspect-video relative mb-4">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.name}
                        className="h-full w-full object-cover rounded-md"
                      />
                      <Badge
                        variant={asset.status === "Verified" ? "default" : "secondary"}
                        className="absolute top-2 right-2"
                      >
                        {asset.status}
                      </Badge>
                    </div>
                    <h3 className="font-medium mb-2">{asset.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      {renderCategoryIcon(asset.category)}
                      <span className="text-xs text-zinc-500 capitalize">{asset.category.replace("-", " ")}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-4 line-clamp-3">{asset.description}</p>
                    <div className="text-sm font-bold mb-2">{asset.price}</div>
                    <div className="text-xs text-zinc-500">{asset.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-0">
            <div className="terminal-card overflow-hidden">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Metric</TableHead>
                      {comparisonAssets.map((asset) => (
                        <TableHead key={asset.id}>{asset.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getAllKeys("financial").map((key) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{formatKey(key)}</TableCell>
                        {comparisonAssets.map((asset) => (
                          <TableCell
                            key={asset.id}
                            className={
                              key === "appreciation" || key === "roi"
                                ? asset[key]?.startsWith("-")
                                  ? "text-red-400"
                                  : "text-green-400"
                                : ""
                            }
                          >
                            {renderValue(asset, key)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-0">
            <div className="terminal-card overflow-hidden">
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Specification</TableHead>
                      {comparisonAssets.map((asset) => (
                        <TableHead key={asset.id}>{asset.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getAllKeys("specifications").map((key) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{formatKey(key)}</TableCell>
                        {comparisonAssets.map((asset) => (
                          <TableCell key={asset.id}>{renderValue(asset, key)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          Comparing <span className="font-medium">{comparisonAssets.length}</span> assets
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Export Comparison
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Share Comparison</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
