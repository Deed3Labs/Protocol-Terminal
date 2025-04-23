"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

interface MarketIndicatorsProps {
  detailed?: boolean
}

export function MarketIndicators({ detailed = false }: MarketIndicatorsProps) {
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const indicators = [
    {
      name: "BTC/USD",
      value: "$67,245.82",
      change: "+2.4%",
      status: "positive",
      volume: "$42.8B",
      marketCap: "$1.32T",
      dominance: "52.4%",
    },
    {
      name: "ETH/USD",
      value: "$3,245.17",
      change: "+3.8%",
      status: "positive",
      volume: "$18.5B",
      marketCap: "$389.7B",
      dominance: "15.5%",
    },
    {
      name: "Total Market Cap",
      value: "$2.51T",
      change: "+1.7%",
      status: "positive",
      volume: "$124.6B",
      marketCap: "-",
      dominance: "100%",
    },
    {
      name: "DeFi TVL",
      value: "$48.2B",
      change: "-0.8%",
      status: "negative",
      volume: "$8.4B",
      marketCap: "-",
      dominance: "1.9%",
    },
    {
      name: "NFT Market Cap",
      value: "$12.8B",
      change: "+5.2%",
      status: "positive",
      volume: "$1.2B",
      marketCap: "-",
      dominance: "0.5%",
    },
    {
      name: "Fear & Greed Index",
      value: "72",
      change: "+4",
      status: "positive",
      volume: "-",
      marketCap: "-",
      dominance: "-",
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

  const sortedIndicators = [...indicators].sort((a, b) => {
    let comparison = 0

    switch (sortColumn) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "value":
        // Handle special case for Fear & Greed Index which is just a number
        if (a.name === "Fear & Greed Index" && b.name === "Fear & Greed Index") {
          comparison = Number(a.value) - Number(b.value)
        } else if (a.name === "Fear & Greed Index") {
          comparison = -1
        } else if (b.name === "Fear & Greed Index") {
          comparison = 1
        } else {
          comparison =
            Number.parseFloat(a.value.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(b.value.replace(/[^0-9.-]+/g, ""))
        }
        break
      case "change":
        comparison =
          Number.parseFloat(a.change.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(b.change.replace(/[^0-9.-]+/g, ""))
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
                Indicator
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("value")}>
              <div className="flex items-center">
                Value
                {sortColumn === "value" ? (
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("change")}>
              <div className="flex items-center">
                24h Change
                {sortColumn === "change" ? (
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
                <TableHead>24h Volume</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Dominance</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedIndicators.map((indicator) => (
            <TableRow key={indicator.name} className="hover:bg-zinc-900">
              <TableCell className="font-medium">{indicator.name}</TableCell>
              <TableCell>{indicator.value}</TableCell>
              <TableCell>
                <Badge variant={indicator.status === "positive" ? "default" : "destructive"}>{indicator.change}</Badge>
              </TableCell>
              {detailed && (
                <>
                  <TableCell>{indicator.volume}</TableCell>
                  <TableCell>{indicator.marketCap}</TableCell>
                  <TableCell>{indicator.dominance}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
