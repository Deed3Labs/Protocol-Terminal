import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { TerminalProvider } from "@/components/terminal/terminal-provider"
import { NotificationProvider } from "@/components/notifications/notification-provider"
import { NotificationToast } from "@/components/notifications/notification-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Protocol Terminal",
  description: "A terminal-style interface for managing real-world assets on the blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <TerminalProvider>
            {children}
            <NotificationToast />
          </TerminalProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
