"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Filter, Grid, List, MoreHorizontal, Plus, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for assets
const assetData = [
  {
    id: "asset-001",
    name: "Downtown Commercial Building",
    type: "Commercial",
    location: "123 Main St, New York, NY",
    value: "$2,450,000",
    tokenized: true,
    status: "active",
    lastUpdated: "2023-04-15",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "asset-002",
    name: "Residential Apartment Complex",
    type: "Residential",
    location: "456 Park Ave, Chicago, IL",
    value: "$1,850,000",
    tokenized: true,
    status: "active",
    lastUpdated: "2023-04-10",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "asset-003",
    name: "Industrial Warehouse",
    type: "Industrial",
    location: "789 Factory Rd, Detroit, MI",
    value: "$950,000",
    tokenized: false,
    status: "pending",
    lastUpdated: "2023-04-05",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "asset-004",
    name: "Retail Shopping Center",
    type: "Retail",
    location: "321 Market St, San Francisco, CA",
    value: "$3,200,000",
    tokenized: true,
    status: "active",
    lastUpdated: "2023-04-01",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "asset-005",
    name: "Office Building",
    type: "Commercial",
    location: "555 Business Blvd, Austin, TX",
    value: "$1,750,000",
    tokenized: false,
    status: "inactive",
    lastUpdated: "2023-03-28",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "asset-006",
    name: "Vacation Rental Property",
    type: "Residential",
    location: "777 Beach Dr, Miami, FL",
    value: "$875,000",
    tokenized: true,
    status: "active",
    lastUpdated: "2023-03-25",
    image: "/placeholder.svg?height=100&width=200",
  },
]

export function AssetManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter assets based on search query
  const filteredAssets = assetData.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6 p-4 font-mono">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-terminal-green">My Assets</h2>
        <Button className="bg-terminal-green text-black hover:bg-terminal-green/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Asset
        </Button>
      </div>

      <Card className="bg-black border-terminal-green">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-terminal-green" />
              <Input
                placeholder="Search assets..."
                className="pl-8 bg-black border-terminal-green text-terminal-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black border-terminal-green text-terminal-green">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-terminal-green/20" />
                  <DropdownMenuItem>Type</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Tokenized</DropdownMenuItem>
                  <DropdownMenuItem>Value</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black border-terminal-green text-terminal-green">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-terminal-green/20" />
                  <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Value (High-Low)</DropdownMenuItem>
                  <DropdownMenuItem>Value (Low-High)</DropdownMenuItem>
                  <DropdownMenuItem>Last Updated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center border border-terminal-green rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "grid" ? "bg-terminal-green/20" : ""} text-terminal-green hover:bg-terminal-green/10`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "list" ? "bg-terminal-green/20" : ""} text-terminal-green hover:bg-terminal-green/10`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-black border border-terminal-green grid grid-cols-4 mb-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-terminal-green data-[state=active]:text-black">
                All
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
              >
                Inactive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAssets.map((asset) => (
                      <Card key={asset.id} className="bg-black border-terminal-green overflow-hidden">
                        <div className="relative h-40">
                          <img
                            src={asset.image || "/placeholder.svg"}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Badge
                              className={`
                              ${
                                asset.status === "active"
                                  ? "bg-green-500"
                                  : asset.status === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                              } 
                              text-black
                            `}
                            >
                              {asset.status}
                            </Badge>
                            {asset.tokenized && <Badge className="bg-blue-500 text-black">Tokenized</Badge>}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-terminal-green truncate">{asset.name}</h3>
                              <p className="text-xs text-terminal-green/70">
                                {asset.type} • {asset.location}
                              </p>
                              <p className="text-sm font-bold text-terminal-green mt-2">{asset.value}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-terminal-green hover:bg-terminal-green/10"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-black border-terminal-green text-terminal-green"
                              >
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                                <DropdownMenuItem>Transfer</DropdownMenuItem>
                                <DropdownMenuItem>Tokenize</DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-terminal-green/20" />
                                <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between border border-terminal-green p-3 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 overflow-hidden rounded">
                            <img
                              src={asset.image || "/placeholder.svg"}
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-terminal-green">{asset.name}</h3>
                            <p className="text-xs text-terminal-green/70">
                              {asset.type} • {asset.location}
                            </p>
                            <div className="flex gap-1 mt-1">
                              <Badge
                                className={`
                                ${
                                  asset.status === "active"
                                    ? "bg-green-500"
                                    : asset.status === "pending"
                                      ? "bg-yellow-500"
                                      : "bg-gray-500"
                                } 
                                text-black text-xs
                              `}
                              >
                                {asset.status}
                              </Badge>
                              {asset.tokenized && <Badge className="bg-blue-500 text-black text-xs">Tokenized</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-terminal-green">{asset.value}</p>
                            <p className="text-xs text-terminal-green/70">Last updated: {asset.lastUpdated}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-terminal-green hover:bg-terminal-green/10"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-black border-terminal-green text-terminal-green"
                            >
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                              <DropdownMenuItem>Transfer</DropdownMenuItem>
                              <DropdownMenuItem>Tokenize</DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-terminal-green/20" />
                              <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <div className="flex items-center justify-center h-40 border border-dashed border-terminal-green rounded-md">
                <p className="text-terminal-green">Active assets will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="flex items-center justify-center h-40 border border-dashed border-terminal-green rounded-md">
                <p className="text-terminal-green">Pending assets will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="mt-0">
              <div className="flex items-center justify-center h-40 border border-dashed border-terminal-green rounded-md">
                <p className="text-terminal-green">Inactive assets will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
