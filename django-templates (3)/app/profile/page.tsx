"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

// Redirect to the current user's profile page
export default function ProfileRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to the user's profile page
        router.push(`/profile/${user.email}`)
      } else {
        // Redirect to login if not authenticated
        router.push("/login")
      }
    }
  }, [user, loading, router])

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

