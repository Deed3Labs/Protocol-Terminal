"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function CommandLine() {
  const { addToHistory, setActiveView } = useTerminal()
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string[]>([
    "Welcome to Deed Protocol Analytics Terminal v1.0.0",
    "Type 'help' to see available commands",
  ])
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!command.trim()) return

    // Add command to history
    const newHistory = [...history, command]
    setHistory(newHistory)
    setHistoryIndex(-1)

    // Add to terminal history
    addToHistory(command)

    // Process command
    const parts = command.split(" ")
    const mainCommand = parts[0].toLowerCase()
    let response = ""

    switch (mainCommand) {
      case "help":
        response = `
Available commands:
  help                 - Show this help message
  view [section]       - Switch to a specific view (overview, portfolio, market, transactions, alerts)
  filter [options]     - Filter data by various criteria
  timerange [range]    - Set time range (1d, 1w, 1m, 3m, 6m, 1y, all)
  tokenize             - Start tokenization process for a new asset
  transfer             - Start transfer process for an asset
  validate             - Validate an asset
  clear                - Clear the terminal output
`
        break
      case "view":
        if (parts.length > 1) {
          const section = parts[1].toLowerCase()
          if (["overview", "portfolio", "market", "transactions", "alerts"].includes(section)) {
            setActiveView(section)
            response = `Switched to ${section} view`
          } else {
            response = `Invalid section: ${section}. Available sections: overview, portfolio, market, transactions, alerts`
          }
        } else {
          response = "Usage: view [section]"
        }
        break
      case "filter":
        response = "Filtering data with options: " + parts.slice(1).join(" ")
        break
      case "timerange":
        if (parts.length > 1) {
          const range = parts[1].toLowerCase()
          if (["1d", "1w", "1m", "3m", "6m", "1y", "all"].includes(range)) {
            response = `Time range set to ${range}`
          } else {
            response = `Invalid time range: ${range}. Available ranges: 1d, 1w, 1m, 3m, 6m, 1y, all`
          }
        } else {
          response = "Usage: timerange [range]"
        }
        break
      case "tokenize":
        setActiveView("tokenize")
        response = "Starting tokenization process..."
        break
      case "transfer":
        setActiveView("transfer")
        response = "Starting transfer process..."
        break
      case "validate":
        setActiveView("validate")
        response = "Starting validation process..."
        break
      case "clear":
        setOutput([])
        setCommand("")
        return
      default:
        response = `Command not found: ${command}`
    }

    // Update output
    setOutput((prev) => [...prev, `> ${command}`, ...response.trim().split("\n")])
    setCommand("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand("")
      }
    }
  }

  return (
    <div className="terminal-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium">COMMAND LINE</h3>
        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setOutput([])}>
          Clear
        </Button>
      </div>

      <div
        ref={outputRef}
        className="font-mono text-xs bg-black p-2 rounded-md h-32 overflow-y-auto mb-2 terminal-scrollbar"
      >
        {output.map((line, index) => (
          <div key={index} className={line.startsWith(">") ? "text-green-500" : "text-zinc-300"}>
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2">
        <div className="flex items-center text-green-500">
          <ChevronRight className="h-3 w-3 mr-1" />
        </div>
        <Input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="flex-1 h-7 bg-black border-zinc-800 text-xs font-mono"
          autoComplete="off"
        />
        <Button
          type="submit"
          size="sm"
          variant="outline"
          className="h-7 px-2 bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300"
        >
          <Send className="h-3 w-3" />
          <span className="sr-only">Execute</span>
        </Button>
      </form>
    </div>
  )
}
