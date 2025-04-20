"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { SelectAssetStep } from "@/components/transfer-steps/select-asset-step"
import { RecipientDetailsStep } from "@/components/transfer-steps/recipient-details-step"
import { LegalVerificationStep } from "@/components/transfer-steps/legal-verification-step"
import { PaymentDetailsStep } from "@/components/transfer-steps/payment-details-step"
import { ReviewConfirmStep } from "@/components/transfer-steps/review-confirm-step"
import { TransferCompleteStep } from "@/components/transfer-steps/transfer-complete-step"

const steps = [
  { id: "select-asset", title: "Select Asset" },
  { id: "recipient", title: "Recipient Details" },
  { id: "legal", title: "Legal Verification" },
  { id: "payment", title: "Payment Details" },
  { id: "review", title: "Review & Confirm" },
  { id: "complete", title: "Complete" },
]

export function TransferWorkflow() {
  const [currentStep, setCurrentStep] = useState("select-asset")
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const goToStep = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId)
    if (stepIndex <= currentStepIndex) {
      setCurrentStep(stepId)
    }
  }

  return (
    <div className="space-y-8">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1">
              <button
                onClick={() => goToStep(step.id)}
                className={cn(
                  "group flex w-full flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  index <= currentStepIndex
                    ? "border-primary hover:border-primary/80"
                    : "border-muted-foreground/20 hover:border-muted-foreground/40",
                  index < currentStepIndex && "cursor-pointer",
                )}
                disabled={index > currentStepIndex}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStepIndex ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {index + 1}. {step.title}
                </span>
                <span className="text-sm">
                  {index < currentStepIndex && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Check className="h-3 w-3" /> Completed
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <Card className="p-6">
        <Tabs value={currentStep} className="space-y-6">
          <TabsContent value="select-asset" className="space-y-6 mt-0">
            <SelectAssetStep onNext={goToNextStep} />
          </TabsContent>

          <TabsContent value="recipient" className="space-y-6 mt-0">
            <RecipientDetailsStep onNext={goToNextStep} onBack={goToPreviousStep} />
          </TabsContent>

          <TabsContent value="legal" className="space-y-6 mt-0">
            <LegalVerificationStep onNext={goToNextStep} onBack={goToPreviousStep} />
          </TabsContent>

          <TabsContent value="payment" className="space-y-6 mt-0">
            <PaymentDetailsStep onNext={goToNextStep} onBack={goToPreviousStep} />
          </TabsContent>

          <TabsContent value="review" className="space-y-6 mt-0">
            <ReviewConfirmStep onNext={goToNextStep} onBack={goToPreviousStep} />
          </TabsContent>

          <TabsContent value="complete" className="space-y-6 mt-0">
            <TransferCompleteStep />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
