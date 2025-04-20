"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionLogProps {
  detailed?: boolean
  limit?: number
}

export function TransactionLog({ detailed = false, limit }: TransactionLogProps) {
  const [sortColumn, setSortColumn] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const transactions = [
    {
      id: "TX-2025-001",
      date: "2025-04-18",
      type: "Transfer",
      asset: "Luxury Condo #42",
      from: "0x1a2b...3c4d",
      to: "0x5e6f...7g8h",
      value: "$920,000",
      status: "Completed",
      hash: "0x8f4e...2a1b",
    },
    {
      id: "TX-2025-002",
      date: "2025-04-15",
      type: "Tokenize",
      asset: "Office Building #7",
      from: "N/A",
      to: "0x1a2b...3c4d",
      value: "$1,450,000",
      status: "Completed",
      hash: "0x7d3f...9c2e",
    },
    {
      id: "TX-2025-003",
      date: "2025-04-12",
      type: "Validate",
      asset: "Agricultural Land",
      from: "N/A",
      to: "N/A",
      value: "N/A",
      status: "Completed",
      hash: "0x6c2d...8b1a",
    },
    {
      id: "TX-2025-004",
      date: "2025-04-10",
      type: "Transfer",
      asset: "Tesla Model S",
      from: "0x9i0j...1k2l",
      to: "0x1a2b...3c4d",
      value: "$95,000",
      status: "Completed",
      hash: "0x5b1c...7a0z",
    },
    {
      id: "TX-2025-005",
      date: "2025-04-08",
      type: "Tokenize",
      asset: "Yacht - Sea Breeze",
      from: "N/A",
      to: "0x3m4n...5o6p",
      value: "$320,000",
      status: "Completed",
      hash: "0x4a0b...6z9y",
    },
    {
      id: "TX-2025-006",
      date: "2025-04-05",
      type: "Transfer",
      asset: "Construction Excavator",
      from: "0x7q8r...9s0t",
      to: "0x1u2v...3w4x",
      value: "$165,000",
      status: "Pending",
      hash: "0x3z9y...5x7w",
    },
    {
      id: "TX-2025-007",
      date: "2025-04-03",
      type: "Validate",
      asset: "Commercial Building",
      from: "N/A",
      to: "N/A",
      value: "N/A",
      status: "Completed",
      hash: "0x2y8x...4w6v",
    },
    {
      id: "TX-2025-008",
      date: "2025-04-01",
      type: "Tokenize",
      asset: "Residential Apartment #12",
      from: "N/A",
      to: "0x9i0j...1k2l",
      value: "$580,000",
      status: "Failed",
      hash: "0x1x7w...3v5u",
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

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0

    switch (sortColumn) {
      case "id":
        comparison = a.id.localeCompare(b.id)
        break
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case "type":
        comparison = a.type.localeCompare(b.type)
        break
      case "asset":
        comparison = a.asset.localeCompare(b.asset)
        break
      case "value":
        if (a.value === "N/A" && b.value === "N/A") {
          comparison = 0
        } else if (a.value === "N/A") {
          comparison = -1
        } else if (b.value === "N/A") {
          comparison = 1
        } else {
          comparison =
            Number.parseFloat(a.value.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(b.value.replace(/[^0-9.-]+/g, ""))
        }
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      default:
        comparison = 0
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const limitedTransactions = limit ? sortedTransactions.slice(0, limit) : sortedTransactions

  return (
    <div className="rounded-md border border-zinc-800">
      <Table className="terminal-table">
        <TableHeader>
          <TableRow>
            {detailed && (
              <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                <div className="flex items-center">
                  ID
                  {sortColumn === "id" ? (
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
            )}
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              <div className="flex items-center">
                Date
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
              <div className="flex items-center">
                Type
                {sortColumn === "type" ? (
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("asset")}>
              <div className="flex items-center">
                Asset
                {sortColumn === "asset" ? (
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
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
              </>
            )}
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
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
            {detailed && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {limitedTransactions.map((tx) => (
            <TableRow key={tx.id} className="hover:bg-zinc-900">
              {detailed && <TableCell className="font-mono text-xs">{tx.id}</TableCell>}
              <TableCell>{tx.date}</TableCell>
              <TableCell>
                <Badge variant={tx.type === "Transfer" ? "default" : tx.type === "Tokenize" ? "secondary" : "outline"}>
                  {tx.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{tx.asset}</TableCell>
              {detailed && (
                <>
                  <TableCell className="font-mono text-xs">{tx.from}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.to}</TableCell>
                </>
              )}
              <TableCell>{tx.value}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    tx.status === "Completed" ? "default" : tx.status === "Pending" ? "secondary" : "destructive"
                  }
                >
                  {tx.status}
                </Badge>
              </TableCell>
              {detailed && (
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-3 w-3" />
                    <span className="sr-only">View Details</span>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
