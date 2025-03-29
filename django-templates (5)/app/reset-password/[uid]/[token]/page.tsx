"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authService } from "@/lib/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage({
  params,
}: {
  params: { uid: string; token: string }
}) {
  const [passwords, setPasswords] = useState({
    new_password1: "",
    new_password2: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (passwords.new_password1 !== passwords.new_password2) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      await authService.confirmPasswordReset({
        new_password1: passwords.new_password1,
        new_password2: passwords.new_password2,
        uid: params.uid,
        token: params.token,
      })
      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Failed to reset password. The link may be invalid or expired.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-md shadow-sm">
        <h1 className="text-2xl font-bold mb-2 dark:text-white">Reset Password</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Enter your new password below.</p>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <div className="space-y-4">
            <Alert className="mb-4 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
              <AlertDescription className="text-green-800 dark:text-green-200">
                Password reset successful! You will be redirected to the login page.
              </AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new_password1">New Password</Label>
                <Input
                  id="new_password1"
                  name="new_password1"
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.new_password1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password2">Confirm New Password</Label>
                <Input
                  id="new_password2"
                  name="new_password2"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.new_password2}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

