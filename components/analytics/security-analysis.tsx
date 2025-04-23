"use client"

import { CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react"

interface SecurityCheck {
  name: string
  status: "pass" | "fail" | "warning"
  details: string
  timestamp: string
  category: "smart-contract" | "protocol" | "operational"
}

export function SecurityAnalysis() {
  const securityChecks: SecurityCheck[] = [
    {
      name: "Smart Contract Audit",
      status: "pass",
      details: "No critical vulnerabilities found in latest audit",
      timestamp: "2025-04-15",
      category: "smart-contract",
    },
    {
      name: "Access Control Review",
      status: "pass",
      details: "All access controls properly implemented",
      timestamp: "2025-04-15",
      category: "smart-contract",
    },
    {
      name: "Reentrancy Protection",
      status: "warning",
      details: "Minor reentrancy risk in secondary functions",
      timestamp: "2025-04-15",
      category: "smart-contract",
    },
    {
      name: "Oracle Security",
      status: "warning",
      details: "Price oracle redundancy recommended",
      timestamp: "2025-04-12",
      category: "protocol",
    },
    {
      name: "Governance Security",
      status: "pass",
      details: "Multi-sig controls in place and functioning",
      timestamp: "2025-04-10",
      category: "protocol",
    },
    {
      name: "Liquidity Protection",
      status: "pass",
      details: "Liquidity protection mechanisms active",
      timestamp: "2025-04-10",
      category: "protocol",
    },
    {
      name: "Admin Key Security",
      status: "pass",
      details: "Admin keys secured with hardware wallets",
      timestamp: "2025-04-08",
      category: "operational",
    },
    {
      name: "Incident Response Plan",
      status: "fail",
      details: "Incident response plan needs updating",
      timestamp: "2025-04-05",
      category: "operational",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return <span className="px-1.5 py-0.5 text-xs rounded bg-green-900 text-green-300">PASS</span>
      case "fail":
        return <span className="px-1.5 py-0.5 text-xs rounded bg-red-900 text-red-300">FAIL</span>
      case "warning":
        return <span className="px-1.5 py-0.5 text-xs rounded bg-yellow-900 text-yellow-300">WARNING</span>
      default:
        return <span className="px-1.5 py-0.5 text-xs rounded bg-gray-800 text-gray-300">UNKNOWN</span>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "smart-contract":
        return <span className="text-blue-500">SC</span>
      case "protocol":
        return <span className="text-purple-500">PR</span>
      case "operational":
        return <span className="text-orange-500">OP</span>
      default:
        return <span className="text-gray-500">--</span>
    }
  }

  // Group checks by category
  const smartContractChecks = securityChecks.filter((check) => check.category === "smart-contract")
  const protocolChecks = securityChecks.filter((check) => check.category === "protocol")
  const operationalChecks = securityChecks.filter((check) => check.category === "operational")

  // Calculate security score
  const passedChecks = securityChecks.filter((check) => check.status === "pass").length
  const totalChecks = securityChecks.length
  const securityScore = Math.round((passedChecks / totalChecks) * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black border border-terminal-green p-4 rounded">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-terminal-green" />
              <span className="ml-2 text-sm font-mono">Security Score</span>
            </div>
            <span className="text-lg font-mono font-bold">{securityScore}/100</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full bg-terminal-green" style={{ width: `${securityScore}%` }}></div>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            {passedChecks} of {totalChecks} security checks passing. {totalChecks - passedChecks} issues require
            attention.
          </p>
        </div>

        <div className="bg-black border border-terminal-green p-4 rounded">
          <h4 className="text-sm font-mono mb-2">Security Recommendations</h4>
          <ul className="text-xs space-y-1 text-zinc-300">
            <li>• Update incident response plan</li>
            <li>• Implement oracle redundancy</li>
            <li>• Review reentrancy protection in secondary functions</li>
            <li>• Schedule next security audit for May 2025</li>
          </ul>
          <div className="mt-2 pt-2 border-t border-zinc-800">
            <p className="text-xs text-terminal-green">Last full security review: April 15, 2025</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-black border border-terminal-green rounded overflow-hidden">
          <div className="border-b border-zinc-800 px-4 py-2">
            <h4 className="text-xs font-mono font-semibold">SMART CONTRACT SECURITY</h4>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {smartContractChecks.map((check, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 mr-2">{getStatusIcon(check.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono">{check.name}</span>
                      {getStatusBadge(check.status)}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{check.details}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{check.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black border border-terminal-green rounded overflow-hidden">
          <div className="border-b border-zinc-800 px-4 py-2">
            <h4 className="text-xs font-mono font-semibold">PROTOCOL SECURITY</h4>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {protocolChecks.map((check, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 mr-2">{getStatusIcon(check.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono">{check.name}</span>
                      {getStatusBadge(check.status)}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{check.details}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{check.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black border border-terminal-green rounded overflow-hidden">
          <div className="border-b border-zinc-800 px-4 py-2">
            <h4 className="text-xs font-mono font-semibold">OPERATIONAL SECURITY</h4>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {operationalChecks.map((check, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 mr-2">{getStatusIcon(check.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono">{check.name}</span>
                      {getStatusBadge(check.status)}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{check.details}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{check.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
