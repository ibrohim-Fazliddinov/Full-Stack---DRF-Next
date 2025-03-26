"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService, type LoginCredentials, type RegistrationData } from "@/lib/auth"

type User = {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  role: string
  profile: any
} | null

type AuthContextType = {
  user: User
  loading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegistrationData) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: (token: string) => Promise<void>
  loginWithGithub: (code: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  loginWithGoogle: async () => {},
  loginWithGithub: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        }
      } catch (err) {
        console.error("Failed to load user:", err)
        localStorage.removeItem("auth_token")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)
    try {
      await authService.login(credentials)
      const userData = await authService.getCurrentUser()
      setUser(userData)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (data: RegistrationData) => {
    setLoading(true)
    setError(null)
    try {
      await authService.register(data)
      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Logout failed")
    } finally {
      setLoading(false)
    }
  }

  // Google login
  const loginWithGoogle = async (token: string) => {
    setLoading(true)
    setError(null)
    try {
      await authService.loginWithGoogle({ access_token: token })
      const userData = await authService.getCurrentUser()
      setUser(userData)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Google login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // GitHub login
  const loginWithGithub = async (code: string) => {
    setLoading(true)
    setError(null)
    try {
      await authService.loginWithGithub({ code })
      const userData = await authService.getCurrentUser()
      setUser(userData)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "GitHub login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithGithub,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

