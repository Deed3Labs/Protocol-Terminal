"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function LoanApplicationForm() {
  const [asset, setAsset] = useState("")
  const [amount, setAmount] = useState("")
  const [term, setTerm] = useState("30")
  const [ltv, setLtv] = useState([50])
  const [collateral, setCollateral] = useState("")

  // Calculate max loan based on collateral value (simplified)
  const collateralValue = Number.parseFloat(collateral) || 0
  const maxLoan = collateralValue * (ltv[0] / 100)

  return (
    <div className="space-y-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono">Loan Application</CardTitle>
          <CardDescription className="text-xs text-zinc-400">Borrow against your tokenized assets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collateral-asset" className="text-xs">
              Collateral Asset
            </Label>
            <Select value={asset} onValueChange={setAsset}>
              <SelectTrigger id="collateral-asset" className="bg-zinc-800 border-zinc-700 text-xs">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="deed-re">DEED-RE (Real Estate)</SelectItem>
                <SelectItem value="deed-veh">DEED-VEH (Vehicle)</SelectItem>
                <SelectItem value="deed-eqp">DEED-EQP (Equipment)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="collateral-value" className="text-xs">
              Collateral Value (USD)
            </Label>
            <Input
              id="collateral-value"
              type="number"
              placeholder="0.00"
              value={collateral}
              onChange={(e) => setCollateral(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="ltv-ratio" className="text-xs">
                Loan-to-Value Ratio
              </Label>
              <span className="text-xs text-zinc-400">{ltv}%</span>
            </div>
            <Slider
              id="ltv-ratio"
              min={10}
              max={80}
              step={1}
              value={ltv}
              onValueChange={setLtv}
              className="[&>span]:bg-green-500"
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan-amount" className="text-xs">
              Loan Amount (USD)
            </Label>
            <Input
              id="loan-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-xs"
            />
            <p className="text-xs text-zinc-500">Max available: ${maxLoan.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan-term" className="text-xs">
              Loan Term (Days)
            </Label>
            <Select value={term} onValueChange={setTerm}>
              <SelectTrigger id="loan-term" className="bg-zinc-800 border-zinc-700 text-xs">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-xs">Apply for Loan</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono">Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Interest Rate (APR)</span>
              <span>3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Origination Fee</span>
              <span>0.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Repayment Amount</span>
              <span>${Number.parseFloat(amount || "0") * 1.032 || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Liquidation Threshold</span>
              <span>{(ltv[0] * 0.825).toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
