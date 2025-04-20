"use client"

import { useState } from "react"
import { Copy, ExternalLink, QrCode, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function WalletView() {
  const { addToHistory } = useTerminal()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    addToHistory("wallet --refresh")
    setTimeout(() => {
      setIsRefreshing(false)
      addToHistory("wallet balance updated")
    }, 1500)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    addToHistory(`copy --text="${text}"`)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Wallet</h1>
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
      <p className="text-sm text-zinc-400 mb-6">Manage your connected wallets and view your balances.</p>

      <div className="terminal-card mb-6">
        <h3 className="text-xs font-medium mb-4">CONNECTED WALLET</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="text-xs">ETH</span>
            </div>
            <div>
              <div className="text-sm font-medium">Ethereum Wallet</div>
              <div className="text-xs text-zinc-500">Connected via MetaMask</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <QrCode className="h-3.5 w-3.5 mr-1" />
            Show QR
          </Button>
        </div>

        <div className="space-y-2 border border-zinc-800 rounded-md p-3 font-mono">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">Address:</div>
            <div className="flex items-center gap-1">
              <div className="text-xs">0x1a2b...3c4d</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleCopy("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t")}
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">View on Explorer</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">ETH Balance:</div>
            <div className="text-xs">3.45 ETH</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">USD Value:</div>
            <div className="text-xs">$11,203.45</div>
          </div>
        </div>
      </div>

      <div className="terminal-card mb-6">
        <h3 className="text-xs font-medium mb-4">TOKENS</h3>
        <div className="space-y-3">
          {[
            { name: "USDC", balance: "1,250.00", value: "$1,250.00" },
            { name: "LINK", balance: "45.75", value: "$685.50" },
            { name: "UNI", balance: "12.5", value: "$112.25" },
          ].map((token, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-xs">{token.name.substring(0, 3)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{token.name}</div>
                  <div className="text-xs text-zinc-500">{token.balance}</div>
                </div>
              </div>
              <div className="text-sm">{token.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal-card">
        <h3 className="text-xs font-medium mb-4">ACTIONS</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="h-9 text-xs justify-start">
            Send Assets
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs justify-start">
            Receive Assets
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs justify-start">
            Swap Tokens
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs justify-start">
            Transaction History
          </Button>
        </div>
      </div>
    </div>
  )
}
