"use client"

import { ArrowDown, ArrowUp, Shield, AlertTriangle, AlertCircle } from "lucide-react"

interface RiskMetric {
  name: string
  score: number
  change: number
  description: string
  level: "low" | "medium" | "high" | "critical"
}

export function ProtocolRiskMetrics() {
  const riskMetrics: RiskMetric[] = [
    {
      name: "Smart Contract Risk",
      score: 15,
      change: -2,
      description: "Risk of vulnerabilities in smart contract code",
      level: "low",
    },
    {
      name: "Liquidity Risk",
      score: 42,
      change: 5,
      description: "Risk of insufficient liquidity for asset transfers",
      level: "medium",
    },
    {
      name: "Counterparty Risk",
      score: 28,
      change: -3,
      description: "Risk of counterparty default in transactions",
      level: "medium",
    },
    {
      name: "Oracle Risk",
      score: 67,
      change: 12,
      description: "Risk of price oracle manipulation or failure",
      level: "high",
    },
    {
      name: "Regulatory Risk",
      score: 35,
      change: 0,
      description: "Risk of regulatory changes affecting protocol",
      level: "medium",
    },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUp className="h-3 w-3 text-red-500" />
    } else if (change < 0) {
      return <ArrowDown className="h-3 w-3 text-green-500" />
    } else {
      return <span className="h-3 w-3">-</span>
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <Shield className="h-4 w-4 text-green-500" />
      case "medium":
        return <Shield className="h-4 w-4 text-yellow-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  // Calculate overall risk score (weighted average)
  const overallRiskScore = Math.round(riskMetrics.reduce((acc, metric) => acc + metric.score, 0) / riskMetrics.length)

  const overallRiskLevel =
    overallRiskScore < 25 ? "low" : overallRiskScore < 50 ? "medium" : overallRiskScore < 75 ? "high" : "critical"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black border border-terminal-green p-4 rounded">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {getRiskIcon(overallRiskLevel)}
              <span className="ml-2 text-sm font-mono">Overall Risk Score</span>
            </div>
            <span className="text-lg font-mono font-bold">{overallRiskScore}/100</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getRiskColor(overallRiskLevel)}`}
              style={{ width: `${overallRiskScore}%` }}
            ></div>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            The protocol currently has a {overallRiskLevel} risk profile. Regular security audits recommended.
          </p>
        </div>

        <div className="bg-black border border-terminal-green p-4 rounded">
          <h4 className="text-sm font-mono mb-2">Risk Assessment Summary</h4>
          <ul className="text-xs space-y-1 text-zinc-300">
            <li>• Smart contract risk is low with recent audit clearance</li>
            <li>• Liquidity risk is moderate and requires monitoring</li>
            <li>• Oracle risk is elevated due to recent market volatility</li>
            <li>• Regulatory compliance is currently satisfactory</li>
          </ul>
          <div className="mt-2 pt-2 border-t border-zinc-800">
            <p className="text-xs text-terminal-green">Next scheduled risk assessment: May 15, 2025</p>
          </div>
        </div>
      </div>

      <div className="bg-black border border-terminal-green rounded overflow-hidden">
        <div className="p-4">
          <h4 className="text-sm font-mono mb-2">Risk Metrics Breakdown</h4>
          <div className="space-y-4">
            {riskMetrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getRiskIcon(metric.level)}
                    <span className="ml-2 text-xs font-mono">{metric.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-mono mr-2">{metric.score}/100</span>
                    <div className="flex items-center">
                      {getChangeIcon(metric.change)}
                      <span className="text-xs ml-1">{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getRiskColor(metric.level)}`}
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-zinc-500">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
