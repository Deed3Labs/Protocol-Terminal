"use client"

import { useState } from "react"
import { CheckCircle2, Copy, Download, ExternalLink, Share2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"

export function TransferCompleteStep() {
  const [copied, setCopied] = useState(false)

  // Sample data - in a real app, this would come from the transfer result
  const transferResult = {
    transactionId: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    timestamp: "April 19, 2025 at 3:42 PM",
    blockExplorerUrl: "https://etherscan.io/tx/0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transferResult.transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-300" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Transfer Complete!</h2>
        <p className="mt-2 text-center text-muted-foreground">
          The asset has been successfully transferred to the recipient.
        </p>
      </div>

      <Alert className="bg-muted">
        <div className="space-y-2">
          <div className="font-medium">Transaction Details</div>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transaction ID:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs truncate max-w-[180px] sm:max-w-xs">
                  {transferResult.transactionId}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                  {copied ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  <span className="sr-only">Copy transaction ID</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Timestamp:</span>
              <span>{transferResult.timestamp}</span>
            </div>
          </div>
        </div>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium">Transaction Receipt</div>
          <p className="text-sm text-muted-foreground">
            A detailed receipt has been sent to your email. You can also download it here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download Receipt
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" /> Share Details
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href={transferResult.blockExplorerUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> View on Block Explorer
            </a>
          </Button>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <div className="font-medium">Next Steps</div>
          <p className="text-sm text-muted-foreground">
            The recipient has been notified of this transfer. Here are some next steps you might want to take:
          </p>
        </div>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li>Update your records to reflect this transfer</li>
          <li>Notify relevant parties (e.g., insurance providers, property managers)</li>
          <li>Complete any remaining offline paperwork if required</li>
          <li>Schedule a follow-up with the recipient if needed</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/collection">View My Assets</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
