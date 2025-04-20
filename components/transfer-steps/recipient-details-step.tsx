"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Copy, QrCode, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface RecipientDetailsStepProps {
  onNext: () => void
  onBack: () => void
}

export function RecipientDetailsStep({ onNext, onBack }: RecipientDetailsStepProps) {
  const [recipientType, setRecipientType] = useState("individual")
  const [walletAddress, setWalletAddress] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [notes, setNotes] = useState("")

  const isFormValid = () => {
    if (!walletAddress) return false

    if (recipientType === "individual") {
      return !!name
    } else {
      return !!companyName && !!registrationNumber
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Recipient Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter the details of the recipient who will receive the tokenized asset.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Recipient Type</Label>
          <RadioGroup
            defaultValue="individual"
            value={recipientType}
            onValueChange={setRecipientType}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Individual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entity" id="entity" />
              <Label htmlFor="entity" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 21V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v13" />
                  <path d="M2 21h20" />
                  <path d="M10 9h4" />
                  <path d="M10 13h4" />
                  <path d="M10 17h4" />
                </svg>
                Company/Entity
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wallet">Wallet Address</TabsTrigger>
            <TabsTrigger value="email">Email Invitation</TabsTrigger>
          </TabsList>
          <TabsContent value="wallet" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="wallet-address">Recipient Wallet Address</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <QrCode className="h-3.5 w-3.5" />
                      <span className="text-xs">Scan QR</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Scan QR Code</DialogTitle>
                      <DialogDescription>Scan a wallet QR code to automatically fill the address.</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-6">
                      <div className="w-48 h-48 bg-muted flex items-center justify-center rounded-lg border">
                        <p className="text-sm text-muted-foreground">Camera access required</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-2">
                <Input
                  id="wallet-address"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the recipient's wallet address. Double-check to ensure it's correct.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="recipient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll send an email invitation to the recipient with instructions to claim the asset.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {recipientType === "individual" ? (
          <div className="space-y-2">
            <Label htmlFor="name">Recipient Name</Label>
            <Input id="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company/Entity Name</Label>
              <Input
                id="company-name"
                placeholder="Legal entity name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration-number">Registration Number</Label>
              <Input
                id="registration-number"
                placeholder="Business/Entity registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Transfer Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Add any notes or messages for the recipient"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
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
