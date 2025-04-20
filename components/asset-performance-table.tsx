"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const assets = [
  {
    name: "Luxury Condo #42",
    category: "Real Estate",
    initialValue: "$850,000",
    currentValue: "$920,000",
    appreciation: "+8.2%",
    status: "positive",
  },
  {
    name: "Commercial Building",
    category: "Real Estate",
    initialValue: "$2,400,000",
    currentValue: "$2,650,000",
    appreciation: "+10.4%",
    status: "positive",
  },
  {
    name: "Agricultural Land",
    category: "Real Estate",
    initialValue: "$650,000",
    currentValue: "$685,000",
    appreciation: "+5.4%",
    status: "positive",
  },
  {
    name: "Tesla Model S",
    category: "Vehicles",
    initialValue: "$110,000",
    currentValue: "$95,000",
    appreciation: "-13.6%",
    status: "negative",
  },
  {
    name: "Construction Excavator",
    category: "Equipment",
    initialValue: "$180,000",
    currentValue: "$165,000",
    appreciation: "-8.3%",
    status: "negative",
  },
  {
    name: "Yacht - Sea Breeze",
    category: "Vehicles",
    initialValue: "$320,000",
    currentValue: "$340,000",
    appreciation: "+6.3%",
    status: "positive",
  },
]

export function AssetPerformanceTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Initial Value</TableHead>
            <TableHead>Current Value</TableHead>
            <TableHead>Appreciation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.name}>
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.initialValue}</TableCell>
              <TableCell>{asset.currentValue}</TableCell>
              <TableCell>
                <Badge variant={asset.status === "positive" ? "default" : "destructive"}>{asset.appreciation}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
