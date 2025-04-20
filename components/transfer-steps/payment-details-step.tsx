"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CreditCard, DollarSign, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PaymentDetailsStepProps {
  onNext: () => void
  onBack: () => void
}

export function PaymentDetailsStep({ onNext, onBack }: PaymentDetailsStepProps) {
  const [transferType, setTransferType] = useState("sale")
  const [paymentMethod, setPaymentMethod] = useState("crypto")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [cryptoCurrency, setCryptoCurrency] = useState("ETH")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [escrowEnabled, setEscrowEnabled] = useState(true)

  const isFormValid = () => {
    if (transferType === "gift") return true

    if (paymentMethod === "crypto") {
      return !!amount && !!cryptoCurrency
    } else {
      return !!amount && !!cardNumber && !!cardName && !!cardExpiry && !!cardCvc
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Payment Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Specify the payment details for this asset transfer.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Transfer Type</Label>
          <RadioGroup
            defaultValue="sale"
            value={transferType}
            onValueChange={setTransferType}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Sale
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gift" id="gift" />
              <Label htmlFor="gift">Gift/No Payment</Label>
            </div>
          </RadioGroup>
        </div>

        {transferType === "sale" && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Payment Amount</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Payment information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Enter the agreed-upon payment amount for the asset transfer.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Payment Method</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="escrow"
                    checked={escrowEnabled}
                    onCheckedChange={(checked) => setEscrowEnabled(checked === true)}
                  />
                  <Label htmlFor="escrow" className="text-sm">
                    Use Escrow Service
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Escrow information</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Escrow holds payment until all transfer conditions are met, providing security for both
                          parties.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                </TabsList>
                <TabsContent value="crypto" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="crypto-currency">Select Cryptocurrency</Label>
                    <Select value={cryptoCurrency} onValueChange={setCryptoCurrency}>
                      <SelectTrigger id="crypto-currency">
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                        <SelectItem value="USDT">Tether (USDT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <div className="text-sm">
                      <div className="font-medium">Payment Instructions:</div>
                      <p className="mt-1 text-muted-foreground">
                        Payment will be processed through the blockchain when you confirm the transfer.
                        {escrowEnabled && " Funds will be held in escrow until the transfer is complete."}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="flex items-center">
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <CreditCard className="h-4 w-4 text-muted-foreground -ml-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-cvc">CVC</Label>
                      <Input
                        id="card-cvc"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <div className="text-sm">
                      <div className="font-medium">Payment Processing:</div>
                      <p className="mt-1 text-muted-foreground">
                        Your card will be charged when the transfer is confirmed.
                        {escrowEnabled && " Funds will be held in escrow until the transfer is complete."}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}

        {transferType === "gift" && (
          <div className="rounded-md border p-4 bg-muted/50">
            <div className="text-sm">
              <div className="font-medium">Gift Transfer</div>
              <p className="mt-1 text-muted-foreground">
                You've selected to transfer this asset as a gift with no payment required. The recipient will receive
                the asset at no cost.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
