"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PageLoaderProps {
  messages: string[]
  firstLetters?: string
  className?: string
}

export function PageLoader({ messages, firstLetters, className }: PageLoaderProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, messages[currentMessageIndex]])
        setCurrentMessageIndex((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, messages])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <div className={cn("p-4 font-mono text-green-500", className)}>
      <div className="mb-6">
        <h2 className="text-xl mb-1">Initializing...</h2>
        <div className="h-1 bg-zinc-800 w-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(currentMessageIndex / messages.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        {displayedMessages.map((message, index) => (
          <div key={index} className="flex items-start">
            <span className="text-yellow-500 mr-2 w-6 text-center">{firstLetters ? firstLetters[index] : ">"}</span>
            <span>{message}</span>
          </div>
        ))}

        {currentMessageIndex < messages.length && (
          <div className="flex items-start">
            <span className="text-yellow-500 mr-2 w-6 text-center">
              {firstLetters ? firstLetters[currentMessageIndex] : ">"}
            </span>
            <span className="flex">
              <span className={cn("ml-0.5 -mt-0.5", cursorVisible ? "opacity-100" : "opacity-0")}>█</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
