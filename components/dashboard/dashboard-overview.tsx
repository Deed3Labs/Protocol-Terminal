"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Bell, Clock, DollarSign, FileText, Shield, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const recentActivities = [
  { id: 1, type: "Transfer", asset: "Property #1234", time: "10 minutes ago", status: "completed" },
  { id: 2, type: "Validation", asset: "Land Deed #5678", time: "1 hour ago", status: "completed" },
  { id: 3, type: "Tokenization", asset: "Commercial Building #9012", time: "3 hours ago", status: "pending" },
  { id: 4, type: "Purchase", asset: "Residential Plot #3456", time: "5 hours ago", status: "completed" },
  { id: 5, type: "Listing", asset: "Apartment #7890", time: "1 day ago", status: "active" },
]

const notifications = [
  { id: 1, message: "Your transfer of Property #1234 has been completed", time: "10 minutes ago", read: false },
  { id: 2, message: "Land Deed #5678 validation successful", time: "1 hour ago", read: false },
  { id: 3, message: "Commercial Building #9012 tokenization in progress", time: "3 hours ago", read: true },
  { id: 4, message: "New market report available", time: "6 hours ago", read: true },
  { id: 5, message: "System maintenance scheduled for tomorrow", time: "1 day ago", read: true },
]

const quickStats = [
  { title: "Total Assets", value: "12", icon: FileText, change: "+2 this month" },
  { title: "Portfolio Value", value: "$2.4M", icon: DollarSign, change: "+5.2% this month" },
  { title: "Pending Transfers", value: "3", icon: Activity, change: "2 require action" },
  { title: "Wallet Balance", value: "2.5 ETH", icon: Wallet, change: "≈ $4,250.00" },
]

export function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6 p-4 font-mono">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-terminal-green">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
          >
            <Clock className="mr-2 h-4 w-4" /> Last updated: Just now
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-black border-terminal-green">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-terminal-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-terminal-green">{stat.value}</div>
              <p className="text-xs text-terminal-green/70 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-terminal-green flex items-center">
                <Activity className="mr-2 h-4 w-4" /> Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between border-b border-terminal-green/20 pb-2"
                  >
                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-terminal-green">{activity.type}</span>
                        <Badge variant="outline" className="ml-2 text-xs border-terminal-green text-terminal-green">
                          {activity.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-terminal-green/70">{activity.asset}</div>
                    </div>
                    <div className="text-xs text-terminal-green/70">{activity.time}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-terminal-green flex items-center">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                Mark All Read
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start justify-between border-b border-terminal-green/20 pb-2 ${
                      !notification.read ? "bg-terminal-green/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-terminal-green mt-1.5"></div>}
                      <div>
                        <div className="text-sm text-terminal-green">{notification.message}</div>
                        <div className="text-xs text-terminal-green/70">{notification.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-black border-terminal-green">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-terminal-green">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-terminal-green text-terminal-green hover:bg-terminal-green/10"
            >
              <Wallet className="h-6 w-6 mb-2" />
              <span>Connect Wallet</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-terminal-green text-terminal-green hover:bg-terminal-green/10"
            >
              <FileText className="h-6 w-6 mb-2" />
              <span>New Asset</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-terminal-green text-terminal-green hover:bg-terminal-green/10"
            >
              <Activity className="h-6 w-6 mb-2" />
              <span>Transfer Asset</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-terminal-green text-terminal-green hover:bg-terminal-green/10"
            >
              <Shield className="h-6 w-6 mb-2" />
              <span>Validate Asset</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
