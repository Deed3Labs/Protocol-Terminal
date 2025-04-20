import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { TerminalProvider } from "@/components/terminal/terminal-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Deed Protocol Terminal",
  description: "Terminal interface for managing tokenized real-world assets",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-mono bg-black text-white`}>
        <TerminalProvider>{children}</TerminalProvider>
      </body>
    </html>
  )
}
