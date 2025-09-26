import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { AppWindow } from "lucide-react"

export const runtime = "edge"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "NirussVn0 - Developer",
  description: "portfolio website",
  generator: "nirussvn0",
  icons: {
    icon: [
      { url: "/icon.ico", sizes: "16x16", type: "image/png" },
      { url: "/next-icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}