"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export function LendingMarket() {
  return (
    <div className="space-y-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono">Market Overview</CardTitle>
          <CardDescription className="text-xs text-zinc-400">Current lending and borrowing rates</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50">
                <TableHead className="text-xs">Asset</TableHead>
                <TableHead className="text-xs">Total Supply</TableHead>
                <TableHead className="text-xs">Supply APY</TableHead>
                <TableHead className="text-xs">Total Borrowed</TableHead>
                <TableHead className="text-xs">Borrow APR</TableHead>
                <TableHead className="text-xs">Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">ETH</TableCell>
                <TableCell className="text-xs">$24.5M</TableCell>
                <TableCell className="text-xs text-green-500 flex items-center">
                  3.2% <TrendingUp className="h-3 w-3 ml-1" />
                </TableCell>
                <TableCell className="text-xs">$15.9M</TableCell>
                <TableCell className="text-xs text-amber-500">4.1%</TableCell>
                <TableCell className="text-xs">65%</TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">USDC</TableCell>
                <TableCell className="text-xs">$42.1M</TableCell>
                <TableCell className="text-xs text-green-500 flex items-center">
                  5.1% <TrendingUp className="h-3 w-3 ml-1" />
                </TableCell>
                <TableCell className="text-xs">$34.5M</TableCell>
                <TableCell className="text-xs text-amber-500">6.2%</TableCell>
                <TableCell className="text-xs">82%</TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">WBTC</TableCell>
                <TableCell className="text-xs">$18.7M</TableCell>
                <TableCell className="text-xs text-green-500">2.1%</TableCell>
                <TableCell className="text-xs">$5.2M</TableCell>
                <TableCell className="text-xs text-amber-500 flex items-center">
                  3.5% <TrendingDown className="h-3 w-3 ml-1" />
                </TableCell>
                <TableCell className="text-xs">28%</TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">DEED-RE</TableCell>
                <TableCell className="text-xs">$12.4M</TableCell>
                <TableCell className="text-xs text-green-500">4.8%</TableCell>
                <TableCell className="text-xs">$10.0M</TableCell>
                <TableCell className="text-xs text-amber-500">5.9%</TableCell>
                <TableCell className="text-xs">81%</TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">DEED-VEH</TableCell>
                <TableCell className="text-xs">$5.8M</TableCell>
                <TableCell className="text-xs text-green-500">6.2%</TableCell>
                <TableCell className="text-xs">$3.9M</TableCell>
                <TableCell className="text-xs text-amber-500">7.5%</TableCell>
                <TableCell className="text-xs">67%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono">Recent Market Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50">
                <TableHead className="text-xs">Transaction</TableHead>
                <TableHead className="text-xs">Asset</TableHead>
                <TableHead className="text-xs">Amount</TableHead>
                <TableHead className="text-xs">Value (USD)</TableHead>
                <TableHead className="text-xs">Time</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">Supply</TableCell>
                <TableCell className="text-xs">ETH</TableCell>
                <TableCell className="text-xs">125.0</TableCell>
                <TableCell className="text-xs">$290,125</TableCell>
                <TableCell className="text-xs">5 mins ago</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">Borrow</TableCell>
                <TableCell className="text-xs">USDC</TableCell>
                <TableCell className="text-xs">50,000</TableCell>
                <TableCell className="text-xs">$50,000</TableCell>
                <TableCell className="text-xs">12 mins ago</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">Repay</TableCell>
                <TableCell className="text-xs">DEED-RE</TableCell>
                <TableCell className="text-xs">2.0</TableCell>
                <TableCell className="text-xs">$30,000</TableCell>
                <TableCell className="text-xs">25 mins ago</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">Liquidation</TableCell>
                <TableCell className="text-xs">DEED-VEH</TableCell>
                <TableCell className="text-xs">5.0</TableCell>
                <TableCell className="text-xs">$75,000</TableCell>
                <TableCell className="text-xs">42 mins ago</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                    Liquidated
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-zinc-800/50">
                <TableCell className="text-xs">Withdraw</TableCell>
                <TableCell className="text-xs">WBTC</TableCell>
                <TableCell className="text-xs">3.5</TableCell>
                <TableCell className="text-xs">$120,750</TableCell>
                <TableCell className="text-xs">1 hour ago</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono">Lending Protocol Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Reserve Factor</span>
              <span>10%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Liquidation Threshold</span>
              <span>82.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Liquidation Penalty</span>
              <span>5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Protocol Fee</span>
              <span>0.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Total Value Locked</span>
              <span>$103.5M</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
