"\"use client"

import { AssetCard } from "@/components/asset-card"

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
    name: "Agricultural Land",
    description: "20-acre agricultural land with irrigation system and storage facilities.",
    image: "/placeholder.svg?height=400&width=400",
    price: "$650,000",
    location: "Rural Route 7, Iowa",
    category: "real-estate",
    status: "Pending",
    tokenId: "0x9i0j1k2l",
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
  },
]

interface AssetGridProps {
  category?: string
}

export function AssetGrid({ category }: AssetGridProps) {
  const filteredAssets = category ? assets.filter((asset) => asset.category === category) : assets

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredAssets.map((asset) => (
        <AssetCard key={asset.id} {...asset} />
      ))}
    </div>
  )
}
