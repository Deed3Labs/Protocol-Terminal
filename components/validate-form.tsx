"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function ValidateForm() {
  const { addToHistory } = useTerminal()
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<"valid" | "invalid" | null>(null)
  const [nftDetails, setNftDetails] = useState<{
    name: string
    tokenId: string
    contract: string
    owner: string
    createdAt: string
    blockchain: string
  } | null>(null)

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)
    setValidationResult(null)
    addToHistory("validate --asset --address=0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t")

    // Simulate validation delay
    setTimeout(() => {
      setIsValidating(false)
      // For demo purposes, we'll randomly determine if it's valid or not
      const isValid = Math.random() > 0.3
      setValidationResult(isValid ? "valid" : "invalid")
      addToHistory(`validation result: ${isValid ? "VALID" : "INVALID"}`)

      if (isValid) {
        setNftDetails({
          name: "Cosmic Voyager #42",
          tokenId: "42",
          contract: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
          owner: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
          createdAt: "2023-04-15T14:32:26Z",
          blockchain: "Ethereum",
        })
      } else {
        setNftDetails(null)
      }
    }, 2000)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Validate Asset</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        Verify the authenticity and ownership of any tokenized real-world asset by entering its details.
      </p>

      <div className="terminal-card">
        <Tabs defaultValue="address">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="address">By Address</TabsTrigger>
            <TabsTrigger value="image">By Image</TabsTrigger>
          </TabsList>
          <TabsContent value="address" className="mt-4">
            <form onSubmit={handleValidate}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contract-address" className="text-xs text-zinc-400">
                    Token Address
                  </Label>
                  <Input id="contract-address" placeholder="0x1234..." required className="terminal-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token-id" className="text-xs text-zinc-400">
                    Asset ID
                  </Label>
                  <Input id="token-id" placeholder="42" required className="terminal-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-type" className="text-xs text-zinc-400">
                    Asset Type
                  </Label>
                  <Input id="asset-type" placeholder="Real Estate" required className="terminal-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs text-zinc-400">
                    Location
                  </Label>
                  <Input id="location" placeholder="New York" required className="terminal-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blockchain" className="text-xs text-zinc-400">
                    Blockchain
                  </Label>
                  <select
                    id="blockchain"
                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="solana">Solana</option>
                    <option value="binance">Binance Smart Chain</option>
                  </select>
                </div>
                <Button type="submit" className="w-full" disabled={isValidating}>
                  {isValidating ? "Validating..." : "Validate Asset"}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="image" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nft-image" className="text-xs text-zinc-400">
                  Upload Asset Image
                </Label>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-zinc-800 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-zinc-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                      >
                        <span>Upload a file</span>
                        <Input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <Button className="w-full" disabled>
                Validate by Image
              </Button>
              <p className="text-center text-sm text-zinc-500">
                Note: Image validation is in beta and may not be as accurate as address validation.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {validationResult && (
          <div className="mt-6">
            {validationResult === "valid" ? (
              <Alert className="border-green-500 bg-green-950/30 text-green-300">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <AlertTitle>Valid Tokenized Asset</AlertTitle>
                <AlertDescription>This Tokenized Asset has been verified as authentic.</AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-500 bg-red-950/30 text-red-300">
                <XCircle className="h-5 w-5 text-red-500" />
                <AlertTitle>Invalid Tokenized Asset</AlertTitle>
                <AlertDescription>
                  We could not verify this Tokenized Asset. It may be counterfeit or the details provided may be
                  incorrect.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {nftDetails && (
          <div className="mt-6 rounded-lg border border-zinc-800 p-4">
            <h3 className="mb-4 font-medium">Asset Details</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium text-zinc-400">Name:</div>
                <div className="col-span-2 text-sm">{nftDetails.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium text-zinc-400">Asset ID:</div>
                <div className="col-span-2 text-sm">{nftDetails.tokenId}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium text-zinc-400">Token Address:</div>
                <div className="col-span-2 text-sm truncate">{nftDetails.contract}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium text-zinc-400">Owner:</div>
                <div className="col-span-2 text-sm truncate">{nftDetails.owner}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium text-zinc-400">Created:</div>
                <div className="col-span-2 text-sm">{new Date(nftDetails.createdAt).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium text-zinc-400">Blockchain:</div>
                <div className="col-span-2 text-sm">{nftDetails.blockchain}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
