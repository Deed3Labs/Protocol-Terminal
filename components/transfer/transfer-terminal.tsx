"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import React from "react"

const steps = [
  { id: "select-asset", title: "Select Asset" },
  { id: "recipient", title: "Recipient Details" },
  { id: "legal", title: "Legal Verification" },
  { id: "payment", title: "Payment Details" },
  { id: "review", title: "Review & Confirm" },
  { id: "complete", title: "Complete" },
]

export function TransferWorkflow() {
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStepIndex
                    ? "bg-green-500 text-black cursor-pointer"
                    : index === currentStepIndex
                      ? "bg-primary text-black"
                      : "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {index < currentStepIndex ? <Check className="h-4 w-4" /> : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-24 ${index < currentStepIndex ? "bg-green-500" : "bg-zinc-800"}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex mt-2 text-xs text-zinc-500">
          {steps.map((step, index) => (
            <React.Fragment key={`label-${step.id}`}>
              <div className="w-8 text-center">{index + 1}</div>
              <div className={`w-24 text-center ${index < steps.length - 1 ? "" : ""}`}>{step.title}</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="terminal-card p-6">
        <div className="text-center">
          <p className="text-zinc-400">Transfer workflow interface would be displayed here.</p>
          <p className="text-zinc-500 text-sm mt-2">
            This is a placeholder for the transfer workflow steps that would normally be displayed.
          </p>
        </div>
      </div>
    </div>
  )
}
