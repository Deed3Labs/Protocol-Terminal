"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

interface AssetPerformanceTableProps {
  detailed?: boolean
}

export function AssetPerformanceTable({ detailed = false }: AssetPerformanceTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const assets = [
    {
      name: "Luxury Condo #42",
      category: "Real Estate",
      initialValue: "$850,000",
      currentValue: "$920,000",
      appreciation: "+8.2%",
      status: "positive",
      lastUpdated: "2025-04-15",
      roi: "12.4%",
      risk: "Low",
    },
    {
      name: "Commercial Building",
      category: "Real Estate",
      initialValue: "$2,400,000",
      currentValue: "$2,650,000",
      appreciation: "+10.4%",
      status: "positive",
      lastUpdated: "2025-04-10",
      roi: "15.2%",
      risk: "Medium",
    },
    {
      name: "Agricultural Land",
      category: "Real Estate",
      initialValue: "$650,000",
      currentValue: "$685,000",
      appreciation: "+5.4%",
      status: "positive",
      lastUpdated: "2025-04-12",
      roi: "7.8%",
      risk: "Low",
    },
    {
      name: "Tesla Model S",
      category: "Vehicles",
      initialValue: "$110,000",
      currentValue: "$95,000",
      appreciation: "-13.6%",
      status: "negative",
      lastUpdated: "2025-04-18",
      roi: "-8.2%",
      risk: "High",
    },
    {
      name: "Construction Excavator",
      category: "Equipment",
      initialValue: "$180,000",
      currentValue: "$165,000",
      appreciation: "-8.3%",
      status: "negative",
      lastUpdated: "2025-04-05",
      roi: "-5.1%",
      risk: "Medium",
    },
    {
      name: "Yacht - Sea Breeze",
      category: "Vehicles",
      initialValue: "$320,000",
      currentValue: "$340,000",
      appreciation: "+6.3%",
      status: "positive",
      lastUpdated: "2025-04-08",
      roi: "9.7%",
      risk: "High",
    },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedAssets = [...assets].sort((a, b) => {
    let comparison = 0

    switch (sortColumn) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "category":
        comparison = a.category.localeCompare(b.category)
        break
      case "initialValue":
        comparison =
          Number.parseFloat(a.initialValue.replace(/[^0-9.-]+/g, "")) -
          Number.parseFloat(b.initialValue.replace(/[^0-9.-]+/g, ""))
        break
      case "currentValue":
        comparison =
          Number.parseFloat(a.currentValue.replace(/[^0-9.-]+/g, "")) -
          Number.parseFloat(b.currentValue.replace(/[^0-9.-]+/g, ""))
        break
      case "appreciation":
        comparison =
          Number.parseFloat(a.appreciation.replace(/[^0-9.-]+/g, "")) -
          Number.parseFloat(b.appreciation.replace(/[^0-9.-]+/g, ""))
        break
      case "roi":
        comparison =
          Number.parseFloat(a.roi.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(b.roi.replace(/[^0-9.-]+/g, ""))
        break
      case "risk":
        const riskOrder = { Low: 1, Medium: 2, High: 3 }
        comparison = riskOrder[a.risk as keyof typeof riskOrder] - riskOrder[b.risk as keyof typeof riskOrder]
        break
      default:
        comparison = 0
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="rounded-md border border-zinc-800">
      <Table className="terminal-table">
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              <div className="flex items-center">
                Asset Name
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("initialValue")}>
              <div className="flex items-center">
                Initial Value
                {sortColumn === "initialValue" ? (
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("currentValue")}>
              <div className="flex items-center">
                Current Value
                {sortColumn === "currentValue" ? (
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("appreciation")}>
              <div className="flex items-center">
                Appreciation
                {sortColumn === "appreciation" ? (
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
            {detailed && (
              <>
                <TableHead className="cursor-pointer" onClick={() => handleSort("roi")}>
                  <div className="flex items-center">
                    ROI
                    {sortColumn === "roi" ? (
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
                <TableHead className="cursor-pointer" onClick={() => handleSort("risk")}>
                  <div className="flex items-center">
                    Risk
                    {sortColumn === "risk" ? (
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
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow key={asset.name} className="hover:bg-zinc-900">
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.initialValue}</TableCell>
              <TableCell>{asset.currentValue}</TableCell>
              <TableCell>
                <Badge variant={asset.status === "positive" ? "default" : "destructive"}>{asset.appreciation}</Badge>
              </TableCell>
              {detailed && (
                <>
                  <TableCell>
                    <Badge variant={Number.parseFloat(asset.roi) > 0 ? "default" : "destructive"}>{asset.roi}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={asset.risk === "Low" ? "outline" : asset.risk === "Medium" ? "secondary" : "destructive"}
                    >
                      {asset.risk}
                    </Badge>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
