"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Shield, Activity, Zap, Server } from "lucide-react"

interface ProtocolHealthProps {
  detailed?: boolean
}

export function ProtocolHealth({ detailed = false }: ProtocolHealthProps) {
  const healthMetrics = [
    {
      name: "Network Uptime",
      value: "99.98%",
      change: "+0.01%",
      trend: "up",
      progress: 99.98,
      icon: Server,
      color: "terminal-green",
    },
    {
      name: "Transaction Success Rate",
      value: "99.82%",
      change: "-0.03%",
      trend: "down",
      progress: 99.82,
      icon: Activity,
      color: "terminal-green",
    },
    {
      name: "Security Score",
      value: "94/100",
      change: "+2",
      trend: "up",
      progress: 94,
      icon: Shield,
      color: "terminal-green",
    },
    {
      name: "Response Time",
      value: "124ms",
      change: "-8ms",
      trend: "up",
      progress: 87.6, // 124ms out of 1000ms = 87.6% good
      icon: Zap,
      color: "terminal-green",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
      {healthMetrics.map((metric) => (
        <Card key={metric.name} className="bg-black border-terminal-green">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-md bg-${metric.color} bg-opacity-20 mr-3`}>
                  <metric.icon className={`h-4 w-4 text-${metric.color}`} />
                </div>
                <div>
                  <p className="text-xs text-terminal-green">{metric.name}</p>
                  <p className="text-lg text-terminal-green">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center">
                {metric.trend === "up" && <ArrowUp className="h-3 w-3 text-terminal-green mr-1" />}
                {metric.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                <span
                  className={
                    metric.trend === "up"
                      ? "text-xs text-terminal-green"
                      : metric.trend === "down"
                        ? "text-xs text-red-500"
                        : "text-xs text-terminal-green/70"
                  }
                >
                  {metric.change}
                </span>
              </div>
            </div>
            {/* Replace Progress component with custom implementation */}
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full bg-${metric.color}`} style={{ width: `${metric.progress}%` }} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
