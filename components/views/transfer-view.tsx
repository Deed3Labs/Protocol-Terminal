"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"

import { SelectAssetStep } from "@/components/transfer-steps/select-asset-step"
import { RecipientDetailsStep } from "@/components/transfer-steps/recipient-details-step"
import { LegalVerificationStep } from "@/components/transfer-steps/legal-verification-step"
import { PaymentDetailsStep } from "@/components/transfer-steps/payment-details-step"
import { ReviewConfirmStep } from "@/components/transfer-steps/review-confirm-step"
import { TransferCompleteStep } from "@/components/transfer-steps/transfer-complete-step"
import React from "react"

const steps = [
  { id: "select-asset", title: "Select Asset" },
  { id: "recipient", title: "Recipient Details" },
  { id: "legal", title: "Legal Verification" },
  { id: "payment", title: "Payment Details" },
  { id: "review", title: "Review & Confirm" },
  { id: "complete", title: "Complete" },
]

export function TransferView() {
  const { addToHistory } = useTerminal()
  const [currentStep, setCurrentStep] = useState("select-asset")
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      const nextStep = steps[nextIndex].id
      setCurrentStep(nextStep)
      addToHistory(`transfer --next-step=${nextStep}`)
    }
  }

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      const prevStep = steps[prevIndex].id
      setCurrentStep(prevStep)
      addToHistory(`transfer --prev-step=${prevStep}`)
    }
  }

  const goToStep = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId)
    if (stepIndex <= currentStepIndex) {
      setCurrentStep(stepId)
      addToHistory(`transfer --goto-step=${stepId}`)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Transfer Asset</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        Transfer ownership of your tokenized real-world asset to another wallet or entity.
      </p>

      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(step.id)}
                disabled={index > currentStepIndex}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                  index < currentStepIndex
                    ? "bg-green-500 text-black cursor-pointer"
                    : index === currentStepIndex
                      ? "bg-primary text-black"
                      : "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {index < currentStepIndex ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-3 sm:w-8 md:w-12 lg:w-24 ${
                    index < currentStepIndex ? "bg-green-500" : "bg-zinc-800"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop labels - hidden on small screens */}
        <div className="hidden sm:flex mt-2 text-xs text-zinc-500">
          {steps.map((step, index) => (
            <React.Fragment key={`label-${step.id}`}>
              <div className="w-6 sm:w-8 text-center">{index + 1}</div>
              <div className={`w-3 sm:w-8 md:w-12 lg:w-24 text-center ${index < steps.length - 1 ? "" : ""}`}>
                {step.title}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile labels - only shown on small screens */}
        <div className="flex sm:hidden mt-2 justify-between text-[10px] text-zinc-500 px-1">
          {steps.map((step, index) => (
            <div key={`mobile-${step.id}`} className="text-center">
              {index === 0
                ? "Asset"
                : index === 1
                  ? "Recip"
                  : index === 2
                    ? "Legal"
                    : index === 3
                      ? "Pay"
                      : index === 4
                        ? "Review"
                        : "Done"}
            </div>
          ))}
        </div>
      </div>

      <div className="terminal-card">
        {currentStep === "select-asset" && <SelectAssetStep onNext={goToNextStep} />}

        {currentStep === "recipient" && <RecipientDetailsStep onNext={goToNextStep} onBack={goToPreviousStep} />}

        {currentStep === "legal" && <LegalVerificationStep onNext={goToNextStep} onBack={goToPreviousStep} />}

        {currentStep === "payment" && <PaymentDetailsStep onNext={goToNextStep} onBack={goToPreviousStep} />}

        {currentStep === "review" && <ReviewConfirmStep onNext={goToNextStep} onBack={goToPreviousStep} />}

        {currentStep === "complete" && <TransferCompleteStep />}
      </div>
    </div>
  )
}
