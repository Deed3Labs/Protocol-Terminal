"use client"

import { FileCheck, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface AuditRecord {
  date: string
  auditor: string
  result: "pass" | "fail" | "partial"
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
  reportUrl: string
  summary: string
}

export function SecurityAuditHistory() {
  const auditHistory: AuditRecord[] = [
    {
      date: "2025-04-15",
      auditor: "BlockSec Labs",
      result: "pass",
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 2,
      lowIssues: 5,
      reportUrl: "#",
      summary: "All critical and high issues resolved. Two medium issues with mitigations in place.",
    },
    {
      date: "2025-01-10",
      auditor: "ChainGuard Security",
      result: "partial",
      criticalIssues: 0,
      highIssues: 1,
      mediumIssues: 3,
      lowIssues: 7,
      reportUrl: "#",
      summary: "One high severity issue identified and mitigated. Three medium issues addressed.",
    },
    {
      date: "2024-10-22",
      auditor: "Secure Protocol Foundation",
      result: "fail",
      criticalIssues: 1,
      highIssues: 2,
      mediumIssues: 4,
      lowIssues: 8,
      reportUrl: "#",
      summary: "Critical vulnerability in asset transfer function. All issues addressed in v2.3.0.",
    },
    {
      date: "2024-07-05",
      auditor: "BlockSec Labs",
      result: "pass",
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 1,
      lowIssues: 4,
      reportUrl: "#",
      summary: "Clean audit with only minor issues identified. All addressed in subsequent release.",
    },
  ]

  const getResultIcon = (result: string) => {
    switch (result) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <FileCheck className="h-4 w-4 text-gray-500" />
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "pass":
        return <span className="px-1.5 py-0.5 text-xs rounded bg-green-900 text-green-300">PASS</span>
      case "fail":
        return <span className="px-1.5 py-0.5 text-xs rounded bg-red-900 text-red-300">FAIL</span>
      case "partial":
        return <span className="px-1.5 py-0.5 text-xs rounded bg-yellow-900 text-yellow-300">PARTIAL</span>
      default:
        return <span className="px-1.5 py-0.5 text-xs rounded bg-gray-800 text-gray-300">UNKNOWN</span>
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black border border-terminal-green p-4 rounded">
          <div className="flex items-center mb-2">
            <FileCheck className="h-4 w-4 text-terminal-green" />
            <span className="ml-2 text-sm font-mono">Audit Summary</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Total Audits:</span>
              <span className="font-mono">{auditHistory.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Last Audit:</span>
              <span className="font-mono">{auditHistory[0].date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Last Auditor:</span>
              <span className="font-mono">{auditHistory[0].auditor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Last Result:</span>
              <span className="font-mono">{auditHistory[0].result.toUpperCase()}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-zinc-800">
            <p className="text-xs text-terminal-green">Next scheduled audit: July 15, 2025</p>
          </div>
        </div>

        <div className="bg-black border border-terminal-green p-4 rounded">
          <h4 className="text-sm font-mono mb-2">Issue Resolution Status</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Critical Issues</span>
                <span className="font-mono text-red-500">0 open</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-green-500 w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">High Issues</span>
                <span className="font-mono text-red-500">0 open</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-green-500 w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Medium Issues</span>
                <span className="font-mono text-yellow-500">2 open</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-yellow-500 w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Low Issues</span>
                <span className="font-mono text-yellow-500">3 open</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-yellow-500 w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black border border-terminal-green rounded overflow-hidden">
        <div className="border-b border-zinc-800 px-4 py-2">
          <h4 className="text-xs font-mono font-semibold">AUDIT HISTORY</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-zinc-900">
                <th className="px-4 py-2 text-left font-mono">Date</th>
                <th className="px-4 py-2 text-left font-mono">Auditor</th>
                <th className="px-4 py-2 text-left font-mono">Result</th>
                <th className="px-4 py-2 text-left font-mono">Issues</th>
                <th className="px-4 py-2 text-left font-mono">Summary</th>
                <th className="px-4 py-2 text-left font-mono">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {auditHistory.map((audit, index) => (
                <tr key={index} className="hover:bg-zinc-900">
                  <td className="px-4 py-3 font-mono">{audit.date}</td>
                  <td className="px-4 py-3">{audit.auditor}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {getResultIcon(audit.result)}
                      <span className="ml-1">{getResultBadge(audit.result)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {audit.criticalIssues > 0 && (
                        <span className="px-1 bg-red-900 text-red-300 rounded">{audit.criticalIssues}C</span>
                      )}
                      {audit.highIssues > 0 && (
                        <span className="px-1 bg-orange-900 text-orange-300 rounded">{audit.highIssues}H</span>
                      )}
                      {audit.mediumIssues > 0 && (
                        <span className="px-1 bg-yellow-900 text-yellow-300 rounded">{audit.mediumIssues}M</span>
                      )}
                      {audit.lowIssues > 0 && (
                        <span className="px-1 bg-blue-900 text-blue-300 rounded">{audit.lowIssues}L</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{audit.summary}</td>
                  <td className="px-4 py-3">
                    <a
                      href={audit.reportUrl}
                      className="text-terminal-green hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
