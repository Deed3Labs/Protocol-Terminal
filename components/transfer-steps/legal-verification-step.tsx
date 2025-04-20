"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, ChevronLeft, ChevronRight, FileCheck, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

interface LegalVerificationStepProps {
  onNext: () => void
  onBack: () => void
}

export function LegalVerificationStep({ onNext, onBack }: LegalVerificationStepProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({
    deed: 0,
    title: 0,
    identity: 0,
  })
  const [uploadStatus, setUploadStatus] = useState<Record<string, "idle" | "uploading" | "complete">>({
    deed: "idle",
    title: "idle",
    identity: "idle",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [legalDisclosureAccepted, setLegalDisclosureAccepted] = useState(false)
  const [transferAuthorized, setTransferAuthorized] = useState(false)

  const handleFileUpload = (documentType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    // Simulate file upload with progress
    setUploadStatus((prev) => ({ ...prev, [documentType]: "uploading" }))

    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress((prev) => ({ ...prev, [documentType]: progress }))

      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus((prev) => ({ ...prev, [documentType]: "complete" }))
      }
    }, 300)
  }

  const isFormValid = () => {
    return (
      uploadStatus.deed === "complete" &&
      uploadStatus.title === "complete" &&
      uploadStatus.identity === "complete" &&
      termsAccepted &&
      legalDisclosureAccepted &&
      transferAuthorized
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Legal Verification</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload required legal documents and complete verification steps to proceed with the transfer.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Legal Requirements</AlertTitle>
        <AlertDescription>
          Transferring ownership of real-world assets requires proper documentation to ensure legal compliance. All
          documents will be verified before the transfer is completed.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-md font-medium">Required Documents</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deed-upload" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Deed/Ownership Document
              </Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="deed-upload"
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    onChange={(e) => handleFileUpload("deed", e)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {uploadStatus.deed === "complete"
                        ? "Document uploaded"
                        : uploadStatus.deed === "uploading"
                          ? "Uploading..."
                          : "Upload deed or ownership document"}
                    </span>
                  </div>
                </div>
                {uploadStatus.deed === "complete" && <FileCheck className="h-5 w-5 text-green-500" />}
              </div>
              {uploadStatus.deed === "uploading" && <Progress value={uploadProgress.deed} className="h-1" />}
              <p className="text-xs text-muted-foreground">
                Upload the current deed or ownership document for the asset.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title-upload" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Title/Registration Document
              </Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="title-upload"
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    onChange={(e) => handleFileUpload("title", e)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {uploadStatus.title === "complete"
                        ? "Document uploaded"
                        : uploadStatus.title === "uploading"
                          ? "Uploading..."
                          : "Upload title or registration document"}
                    </span>
                  </div>
                </div>
                {uploadStatus.title === "complete" && <FileCheck className="h-5 w-5 text-green-500" />}
              </div>
              {uploadStatus.title === "uploading" && <Progress value={uploadProgress.title} className="h-1" />}
              <p className="text-xs text-muted-foreground">
                Upload the title certificate, registration document, or equivalent.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identity-upload" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Identity Verification
              </Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="identity-upload"
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    onChange={(e) => handleFileUpload("identity", e)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {uploadStatus.identity === "complete"
                        ? "Document uploaded"
                        : uploadStatus.identity === "uploading"
                          ? "Uploading..."
                          : "Upload identity verification document"}
                    </span>
                  </div>
                </div>
                {uploadStatus.identity === "complete" && <FileCheck className="h-5 w-5 text-green-500" />}
              </div>
              {uploadStatus.identity === "uploading" && <Progress value={uploadProgress.identity} className="h-1" />}
              <p className="text-xs text-muted-foreground">
                Upload a government-issued ID or other identity verification document.
              </p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="legal-terms">
            <AccordionTrigger>Legal Terms & Conditions</AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-muted-foreground space-y-4 max-h-40 overflow-y-auto border rounded-md p-4">
                <p>
                  This Asset Transfer Agreement ("Agreement") is entered into as of the date of electronic acceptance,
                  by and between the current asset owner ("Transferor") and the designated recipient ("Transferee").
                </p>
                <p>
                  1. The Transferor agrees to transfer all rights, title, and interest in the specified tokenized asset
                  to transfer all rights, title, and interest in the specified tokenized asset to the Transferee,
                  subject to the terms and conditions set forth in this Agreement.
                </p>
                <p>
                  2. The Transferee acknowledges that they have conducted due diligence on the asset and accepts the
                  asset in its current condition.
                </p>
                <p>
                  3. Both parties acknowledge that this transfer is subject to applicable laws and regulations governing
                  the ownership and transfer of real-world assets.
                </p>
                <p>
                  4. The transfer of the tokenized asset on the blockchain represents the transfer of the legal rights
                  to the underlying real-world asset, as permitted by applicable law.
                </p>
                <p>
                  5. This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction
                  where the asset is located.
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I have read and agree to the terms and conditions
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="legal-disclosure"
              checked={legalDisclosureAccepted}
              onCheckedChange={(checked) => setLegalDisclosureAccepted(checked === true)}
            />
            <Label htmlFor="legal-disclosure" className="text-sm">
              I understand that transferring this asset may have legal and tax implications, and I have consulted with
              appropriate professionals as needed.
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="transfer-authorization"
              checked={transferAuthorized}
              onCheckedChange={(checked) => setTransferAuthorized(checked === true)}
            />
            <Label htmlFor="transfer-authorization" className="text-sm">
              I confirm that I am legally authorized to transfer this asset and all information provided is accurate and
              complete.
            </Label>
          </div>
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
