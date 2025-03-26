import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"

export const metadata: Metadata = {
  title: "Django REST Project",
  description: "A modern REST API project built with Django",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'