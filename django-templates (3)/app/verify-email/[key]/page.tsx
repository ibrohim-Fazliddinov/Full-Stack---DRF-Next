"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authService } from "@/lib/auth"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function VerifyEmailPage({ params }: { params: { key: string } }) {
  const [isVerifying, setIsVerifying] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await authService.verifyEmail(params.key)
        setSuccess(true)
      } catch (err: any) {
        setError(err.message || "Email verification failed. The link may be invalid or expired.")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [params.key])

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-md shadow-sm">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Email Verification</h1>

        {isVerifying ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Verifying your email address...</p>
          </div>
        ) : success ? (
          <div className="space-y-4">
            <Alert className="mb-4 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your email has been successfully verified! You can now log in to your account.
              </AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resend-verification">Resend Verification Email</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

