import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import type { CryptoPrice } from "@/hooks/use-crypto-prices"

interface CryptoPriceDisplayProps {
  crypto: CryptoPrice
  isLoading?: boolean
  compact?: boolean
}

export function CryptoPriceDisplay({ crypto, isLoading = false, compact = false }: CryptoPriceDisplayProps) {
  const { symbol, price, change24h } = crypto
  const isPositive = change24h >= 0

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="font-medium">{symbol}</span>
        <RefreshCw className="h-3 w-3 animate-spin text-zinc-400" />
      </div>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <span className="font-medium">{symbol}</span>
        <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>{isPositive ? "↑" : "↓"}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="font-medium">{symbol}</span>
      <span className="text-zinc-300">{formattedPrice}</span>
      <span className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
        {Math.abs(change24h)}%
      </span>
    </div>
  )
}
