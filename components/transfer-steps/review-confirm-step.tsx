"use client"

import { useState } from "react"
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ReviewConfirmStepProps {
  onNext: () => void
  onBack: () => void
}

export function ReviewConfirmStep({ onNext, onBack }: ReviewConfirmStepProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCodeValid, setIsCodeValid] = useState(false)

  // Sample data - in a real app, this would come from the previous steps
  const transferDetails = {
    asset: {
      name: "Luxury Condo #42",
      tokenId: "0x1a2b3c4d",
      location: "123 Main St, New York, NY",
      category: "Real Estate",
    },
    recipient: {
      name: "Jane Smith",
      walletAddress: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
    },
    payment: {
      type: "Sale",
      amount: "$850,000",
      method: "Cryptocurrency (ETH)",
      escrow: "Enabled",
    },
    fees: {
      networkFee: "$25",
      serviceFee: "$85",
      total: "$110",
    },
  }

  const handleConfirm = () => {
    setIsConfirmDialogOpen(true)
  }

  const handleVerifyCode = () => {
    setIsProcessing(true)

    // Simulate verification delay
    setTimeout(() => {
      setIsProcessing(false)
      setIsCodeValid(confirmationCode === "123456") // In a real app, this would validate against a real code
    }, 1500)
  }

  const handleFinalConfirm = () => {
    setIsConfirmDialogOpen(false)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Review & Confirm</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review all details of the asset transfer before confirming.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Please review all details carefully. Once confirmed, this transfer cannot be easily reversed.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-md font-medium">Asset Details</h3>
          <div className="rounded-md border p-4 space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Asset Name:</div>
              <div className="text-sm">{transferDetails.asset.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Token ID:</div>
              <div className="text-sm font-mono">{transferDetails.asset.tokenId}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Location:</div>
              <div className="text-sm">{transferDetails.asset.location}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Category:</div>
              <div className="text-sm">{transferDetails.asset.category}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-medium">Recipient Details</h3>
          <div className="rounded-md border p-4 space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Recipient Name:</div>
              <div className="text-sm">{transferDetails.recipient.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Wallet Address:</div>
              <div className="text-sm font-mono truncate">{transferDetails.recipient.walletAddress}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-medium">Payment Details</h3>
          <div className="rounded-md border p-4 space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Transfer Type:</div>
              <div className="text-sm">{transferDetails.payment.type}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Amount:</div>
              <div className="text-sm">{transferDetails.payment.amount}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Payment Method:</div>
              <div className="text-sm">{transferDetails.payment.method}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Escrow:</div>
              <div className="text-sm">{transferDetails.payment.escrow}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-medium">Fees & Costs</h3>
          <div className="rounded-md border p-4 space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Network Fee:</div>
              <div className="text-sm">{transferDetails.fees.networkFee}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Service Fee:</div>
              <div className="text-sm">{transferDetails.fees.serviceFee}</div>
            </div>
            <div className="grid grid-cols-2 gap-1 border-t pt-2 mt-2">
              <div className="text-sm font-medium">Total Fees:</div>
              <div className="text-sm font-medium">{transferDetails.fees.total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleConfirm}>
          Confirm Transfer <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Asset Transfer</DialogTitle>
            <DialogDescription>
              To complete this transfer, please enter the verification code sent to your email and connected phone
              number.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Didn't receive a code?{" "}
                <a href="#" className="text-primary">
                  Resend code
                </a>
              </p>
            </div>
            {isCodeValid === false && confirmationCode.length > 0 && !isProcessing && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid Code</AlertTitle>
                <AlertDescription>The verification code you entered is incorrect. Please try again.</AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            {isCodeValid ? (
              <Button onClick={handleFinalConfirm}>Complete Transfer</Button>
            ) : (
              <Button onClick={handleVerifyCode} disabled={confirmationCode.length < 6 || isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isProcessing ? "Verifying..." : "Verify Code"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
