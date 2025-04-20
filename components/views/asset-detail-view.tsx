"use client"

import { useState } from "react"
import {
  Building2,
  Car,
  Tractor,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
  Share2,
  History,
  BarChart3,
  Shield,
  DollarSign,
  ExternalLink,
  Download,
  Pencil,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTerminal } from "@/components/terminal/terminal-provider"

// Sample asset data - in a real app, this would come from an API or blockchain
const assetData = {
  id: "1",
  name: "Luxury Condo #42",
  description:
    "Modern 3-bedroom luxury condominium in downtown with panoramic city views. Features include hardwood floors, granite countertops, stainless steel appliances, and floor-to-ceiling windows. Building amenities include 24/7 concierge, fitness center, rooftop pool, and underground parking.",
  image: "/placeholder.svg?height=400&width=400",
  price: "$850,000",
  location: "123 Main St, New York, NY",
  category: "real-estate",
  status: "Verified",
  tokenId: "0x1a2b3c4d5e6f7g8h9i0j",
  acquisitionDate: "2024-10-15",
  lastVerified: "2025-03-22",
  ownershipHistory: [
    { date: "2024-10-15", event: "Initial Tokenization", from: "N/A", to: "0x7a8b9c0d1e2f" },
    { date: "2024-12-03", event: "Transfer", from: "0x7a8b9c0d1e2f", to: "0x3f4g5h6i7j8" },
    { date: "2025-02-18", event: "Transfer", from: "0x3f4g5h6i7j8", to: "Current Owner" },
  ],
  documents: [
    { name: "Property Deed", type: "PDF", size: "1.2 MB", date: "2024-10-10", verified: true },
    { name: "Inspection Report", type: "PDF", size: "3.5 MB", date: "2024-09-28", verified: true },
    { name: "Floor Plans", type: "DWG", size: "2.8 MB", date: "2024-10-05", verified: true },
    { name: "Title Insurance", type: "PDF", size: "0.9 MB", date: "2024-10-12", verified: true },
  ],
  specifications: {
    size: "1,850 sq ft",
    bedrooms: 3,
    bathrooms: 2.5,
    yearBuilt: 2020,
    parking: "2 spaces",
    amenities: ["Concierge", "Fitness Center", "Pool", "Underground Parking", "Security System"],
  },
  financials: {
    purchasePrice: "$850,000",
    currentValue: "$875,000",
    annualAppreciation: "2.9%",
    propertyTax: "$12,500/year",
    maintenanceFee: "$850/month",
    insuranceCost: "$2,400/year",
  },
  blockchain: {
    network: "Ethereum",
    contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    tokenStandard: "ERC-721",
    lastTransaction: "2025-03-15",
    gasUsed: "0.0045 ETH",
  },
}

interface AssetDetailViewProps {
  assetId?: string
}

export function AssetDetailView({ assetId = "1" }: AssetDetailViewProps) {
  const { addToHistory, setActiveView } = useTerminal()
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, you would fetch the asset data based on the assetId
  const asset = assetData

  const handleBack = () => {
    addToHistory("cd ../my-assets")
    setActiveView("my-assets")
  }

  const handleTransfer = () => {
    addToHistory(`transfer --asset=${asset.id}`)
    setActiveView("transfer")
  }

  const getCategoryIcon = () => {
    switch (asset.category) {
      case "real-estate":
        return <Building2 className="h-5 w-5 text-zinc-400" />
      case "vehicles":
        return <Car className="h-5 w-5 text-zinc-400" />
      case "equipment":
        return <Tractor className="h-5 w-5 text-zinc-400" />
      default:
        return <Building2 className="h-5 w-5 text-zinc-400" />
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold tracking-tight">Asset Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column - Asset image and basic info */}
        <div className="lg:col-span-1">
          <div className="terminal-card p-0 overflow-hidden">
            <div className="aspect-square relative">
              <img src={asset.image || "/placeholder.svg"} alt={asset.name} className="h-full w-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant={asset.status === "Verified" ? "default" : "secondary"}>{asset.status}</Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                {getCategoryIcon()}
                <span className="text-xs uppercase text-zinc-400">{asset.category.replace("-", " ")}</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{asset.name}</h2>
              <div className="flex items-center gap-1 text-sm text-zinc-400 mb-4">
                <MapPin className="h-3.5 w-3.5" />
                <span>{asset.location}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Token ID</div>
                  <div className="text-sm font-mono">
                    {asset.tokenId.substring(0, 8)}...{asset.tokenId.substring(asset.tokenId.length - 4)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Value</div>
                  <div className="text-lg font-bold">{asset.price}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Acquisition Date</div>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-zinc-400" />
                    {new Date(asset.acquisitionDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Last Verified</div>
                  <div className="text-sm flex items-center">
                    <Shield className="h-3.5 w-3.5 mr-1 text-zinc-400" />
                    {new Date(asset.lastVerified).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="default" className="w-full" onClick={handleTransfer}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Transfer Asset
                </Button>
                <Button variant="outline" className="w-full">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Tabs with detailed information */}
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="overview"
            className="terminal-card"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              addToHistory(`view --tab=${value}`)
            }}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm text-zinc-400">{asset.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Size</span>
                    <span className="text-xs">{asset.specifications.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Bedrooms</span>
                    <span className="text-xs">{asset.specifications.bedrooms}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Bathrooms</span>
                    <span className="text-xs">{asset.specifications.bathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Year Built</span>
                    <span className="text-xs">{asset.specifications.yearBuilt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Parking</span>
                    <span className="text-xs">{asset.specifications.parking}</span>
                  </div>
                </div>

                <h4 className="text-xs font-medium mt-3 mb-1">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {asset.specifications.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Financial Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Purchase Price</span>
                    <span className="text-xs">{asset.financials.purchasePrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Current Value</span>
                    <span className="text-xs">{asset.financials.currentValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Annual Appreciation</span>
                    <span className="text-xs">{asset.financials.annualAppreciation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Property Tax</span>
                    <span className="text-xs">{asset.financials.propertyTax}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Maintenance Fee</span>
                    <span className="text-xs">{asset.financials.maintenanceFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Insurance Cost</span>
                    <span className="text-xs">{asset.financials.insuranceCost}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <BarChart3 className="h-3.5 w-3.5 mr-1" />
                  View Analytics
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  Financial Report
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Asset Documents</h3>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  Upload Document
                </Button>
              </div>

              <div className="space-y-2">
                {asset.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-zinc-800 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-zinc-400" />
                      <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="text-xs text-zinc-400">
                          {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.verified && (
                        <Badge variant="default" className="h-5 text-xs">
                          Verified
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-dashed border-zinc-800 rounded-md p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-zinc-500" />
                <p className="text-sm text-zinc-400 mb-2">Drag and drop additional documents here</p>
                <Button variant="outline" size="sm" className="text-xs">
                  Browse Files
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Ownership History</h3>

              <div className="space-y-4">
                {asset.ownershipHistory.map((event, index) => (
                  <div
                    key={index}
                    className={`relative pl-6 ${index !== asset.ownershipHistory.length - 1 ? "pb-6" : ""}`}
                  >
                    {index !== asset.ownershipHistory.length - 1 && (
                      <div className="absolute left-[9px] top-3 h-full w-px bg-zinc-800" />
                    )}
                    <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                    <div className="text-sm font-medium">{event.event}</div>
                    <div className="text-xs text-zinc-400 mb-1">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="text-xs">
                      {event.from === "N/A" ? (
                        <span>Initial tokenization</span>
                      ) : (
                        <span>
                          From: <span className="font-mono">{event.from}</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs">
                      To: <span className="font-mono">{event.to}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <History className="h-3.5 w-3.5 mr-1" />
                  Full History
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Export History
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="blockchain" className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Blockchain Details</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Network</span>
                  <span className="text-xs">{asset.blockchain.network}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Token Standard</span>
                  <span className="text-xs">{asset.blockchain.tokenStandard}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Last Transaction</span>
                  <span className="text-xs">{asset.blockchain.lastTransaction}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Gas Used</span>
                  <span className="text-xs">{asset.blockchain.gasUsed}</span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-xs text-zinc-400">Contract Address</span>
                  <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-md">
                    <span className="text-xs font-mono truncate">{asset.blockchain.contractAddress}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-yellow-600/20 rounded-md p-3 flex items-start mt-4">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-yellow-600 font-medium">Security Notice</p>
                  <p className="text-xs text-zinc-400">
                    Always verify blockchain transactions through official explorers. Never share your private keys or
                    seed phrases.
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  View on Explorer
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  Verify Ownership
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
