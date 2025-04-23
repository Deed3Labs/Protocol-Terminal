"use client"

import { useState, useEffect } from "react"

export interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  lastUpdated: Date
}

interface CoinGeckoResponse {
  [id: string]: {
    usd: number
    usd_24h_change: number
    last_updated_at: number
  }
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<{
    ethereum: CryptoPrice
    bitcoin: CryptoPrice
  }>({
    ethereum: {
      symbol: "ETH",
      name: "Ethereum",
      price: 3450.75,
      change24h: 2.35,
      lastUpdated: new Date(),
    },
    bitcoin: {
      symbol: "BTC",
      name: "Bitcoin",
      price: 62150.25,
      change24h: 1.75,
      lastUpdated: new Date(),
    },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [lastSuccessfulFetch, setLastSuccessfulFetch] = useState<Date | null>(null)

  const fetchPrices = async () => {
    try {
      setError(null)

      // Try multiple API endpoints to improve reliability
      const endpoints = [
        // Primary endpoint - CoinGecko public API
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true",
        // Backup endpoint - Alternative free crypto API
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD",
      ]

      let response = null
      let data = null
      let usingBackupApi = false

      // Try primary endpoint first
      try {
        response = await fetch(endpoints[0], {
          cache: "no-store",
          headers: { Accept: "application/json" },
        })

        if (!response.ok) {
          throw new Error(`Primary API error: ${response.status}`)
        }

        data = await response.json()
      } catch (primaryError) {
        console.warn("Primary API failed:", primaryError)

        // Try backup endpoint
        try {
          usingBackupApi = true
          response = await fetch(endpoints[1], {
            cache: "no-store",
            headers: { Accept: "application/json" },
          })

          if (!response.ok) {
            throw new Error(`Backup API error: ${response.status}`)
          }

          const backupData = await response.json()

          // Convert backup API format to match our expected format
          data = {
            bitcoin: {
              usd: backupData.RAW.BTC.USD.PRICE,
              usd_24h_change: backupData.RAW.BTC.USD.CHANGEPCT24HOUR,
              last_updated_at: Math.floor(backupData.RAW.BTC.USD.LASTUPDATE / 1000),
            },
            ethereum: {
              usd: backupData.RAW.ETH.USD.PRICE,
              usd_24h_change: backupData.RAW.ETH.USD.CHANGEPCT24HOUR,
              last_updated_at: Math.floor(backupData.RAW.ETH.USD.LASTUPDATE / 1000),
            },
          }
        } catch (backupError) {
          console.error("Backup API also failed:", backupError)
          throw new Error("All API endpoints failed")
        }
      }

      if (!usingBackupApi && (!data.bitcoin || !data.ethereum)) {
        throw new Error("Invalid data received from API")
      }

      setPrices({
        ethereum: {
          symbol: "ETH",
          name: "Ethereum",
          price: data.ethereum.usd,
          change24h: Number.parseFloat(data.ethereum.usd_24h_change.toFixed(2)),
          lastUpdated: new Date(data.ethereum.last_updated_at * 1000),
        },
        bitcoin: {
          symbol: "BTC",
          name: "Bitcoin",
          price: data.bitcoin.usd,
          change24h: Number.parseFloat(data.bitcoin.usd_24h_change.toFixed(2)),
          lastUpdated: new Date(data.bitcoin.last_updated_at * 1000),
        },
      })

      setLastSuccessfulFetch(new Date())
      setRetryCount(0)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching crypto prices:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch prices")
      setRetryCount((prev) => prev + 1)

      // If we fail to fetch, use realistic simulated data
      // with small random changes to simulate real-time updates
      const now = new Date()
      const timeSinceLastSuccess = lastSuccessfulFetch ? now.getTime() - lastSuccessfulFetch.getTime() : 0

      // If it's been more than 30 minutes since last successful fetch,
      // use more conservative random changes
      const volatilityFactor = timeSinceLastSuccess > 30 * 60 * 1000 ? 0.2 : 1

      setPrices((prevPrices) => {
        const getRandomChange = () => (Math.random() * 2 - 1) * 0.5 * volatilityFactor // -0.5% to +0.5%

        const ethChange = getRandomChange()
        const btcChange = getRandomChange()

        return {
          ethereum: {
            ...prevPrices.ethereum,
            price: Number.parseFloat((prevPrices.ethereum.price * (1 + ethChange / 100)).toFixed(2)),
            change24h: Number.parseFloat((prevPrices.ethereum.change24h + ethChange / 5).toFixed(2)),
            lastUpdated: now,
          },
          bitcoin: {
            ...prevPrices.bitcoin,
            price: Number.parseFloat((prevPrices.bitcoin.price * (1 + btcChange / 100)).toFixed(2)),
            change24h: Number.parseFloat((prevPrices.bitcoin.change24h + btcChange / 5).toFixed(2)),
            lastUpdated: now,
          },
        }
      })

      if (isLoading) setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch immediately on mount
    fetchPrices()

    // Then fetch every 60 seconds to avoid rate limiting
    const interval = setInterval(fetchPrices, 60000)

    return () => clearInterval(interval)
  }, [])

  // Add exponential backoff for retries
  useEffect(() => {
    if (retryCount > 0 && retryCount <= 5) {
      const backoffTime = Math.min(1000 * Math.pow(2, retryCount - 1), 60000)
      const retryTimer = setTimeout(() => {
        console.log(`Retrying fetch (attempt ${retryCount})...`)
        fetchPrices()
      }, backoffTime)

      return () => clearTimeout(retryTimer)
    }
  }, [retryCount])

  return {
    ...prices,
    isLoading,
    error,
    refresh: fetchPrices,
  }
}
