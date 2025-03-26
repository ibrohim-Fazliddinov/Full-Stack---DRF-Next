"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { AnimatePresence } from "framer-motion"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 bg-white dark:bg-gray-900">
                <AnimatePresence mode="wait">{children}</AnimatePresence>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

