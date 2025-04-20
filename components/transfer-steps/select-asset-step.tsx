"use client"

import { useState } from "react"
import Image from "next/image"
import { Building2, Car, Check, ChevronRight, Tractor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Sample asset data - in a real app, this would come from an API or blockchain
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
  },
  {
    id: "3",
    name: "Tesla Model S",
    description: "2023 Tesla Model S Plaid, fully loaded with all options and FSD.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$110,000",
    location: "Miami, FL",
    category: "vehicles",
    status: "Verified",
    tokenId: "0x3m4n5o6p",
  },
]

interface SelectAssetStepProps {
  onNext: () => void
}

export function SelectAssetStep({ onNext }: SelectAssetStepProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tokenId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "real-estate":
        return <Building2 className="h-4 w-4" />
      case "vehicles":
        return <Car className="h-4 w-4" />
      case "equipment":
        return <Tractor className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Select Asset to Transfer</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the tokenized asset you want to transfer to another wallet or entity.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search-assets">Search Assets</Label>
          <Input
            id="search-assets"
            placeholder="Search by name or token ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1"
          />
        </div>

        <RadioGroup value={selectedAsset || ""} onValueChange={setSelectedAsset}>
          <div className="space-y-4 mt-4">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedAsset === asset.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={asset.id} id={`asset-${asset.id}`} className="sr-only" />
                  <Label htmlFor={`asset-${asset.id}`} className="flex flex-col sm:flex-row gap-4 cursor-pointer">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={asset.image || "/placeholder.svg"} alt={asset.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{asset.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {asset.status}
                          </Badge>
                        </div>
                        {selectedAsset === asset.id && <Check className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        {getCategoryIcon(asset.category)}
                        <span className="capitalize">{asset.category.replace("-", " ")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{asset.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Token ID: </span>
                          <span className="font-mono">{asset.tokenId}</span>
                        </div>
                        <div className="font-medium">{asset.price}</div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">No assets found matching your search.</p>
              </div>
            )}
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!selectedAsset}>
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
