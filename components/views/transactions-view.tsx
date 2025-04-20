"use client"

import { TransactionLog } from "@/components/analytics/transaction-log"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function TransactionsView() {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Transaction History</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-64 pl-8 h-8 bg-zinc-900 border-zinc-700 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="terminal-card">
          <h3 className="text-xs font-medium mb-4">TRANSACTION HISTORY</h3>
          <TransactionLog />
        </div>
      </div>
    </div>
  )
}
