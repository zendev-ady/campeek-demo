"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<string>
  resetPassword: (token: string, newPassword: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existingUser = users.find((u: User & { password: string }) => u.email === email && u.password === password)

    if (!existingUser) {
      throw new Error("Neplatné přihlašovací údaje")
    }

    const { password: _, ...userWithoutPassword } = existingUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
  }

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.some((u: User) => u.email === email)) {
      throw new Error("Uživatel s tímto emailem již existuje")
    }

    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
      emailVerified: false,
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const requestPasswordReset = async (email: string): Promise<string> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: User) => u.email === email)

    if (!user) {
      throw new Error("Uživatel s tímto emailem nebyl nalezen")
    }

    // Generate mock reset token
    const token = `mock-reset-token-${Date.now()}`

    // Store token with email in localStorage for validation
    const resetTokens = JSON.parse(localStorage.getItem("resetTokens") || "{}")
    resetTokens[token] = { email, expiresAt: Date.now() + 3600000 } // 1 hour expiry
    localStorage.setItem("resetTokens", JSON.stringify(resetTokens))

    return token
  }

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Validate token
    const resetTokens = JSON.parse(localStorage.getItem("resetTokens") || "{}")
    const tokenData = resetTokens[token]

    if (!tokenData) {
      throw new Error("Neplatný nebo použitý reset token")
    }

    if (Date.now() > tokenData.expiresAt) {
      throw new Error("Reset token vypršel")
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = users.findIndex((u: User) => u.email === tokenData.email)

    if (userIndex === -1) {
      throw new Error("Uživatel nenalezen")
    }

    users[userIndex].password = newPassword
    localStorage.setItem("users", JSON.stringify(users))

    // Delete used token
    delete resetTokens[token]
    localStorage.setItem("resetTokens", JSON.stringify(resetTokens))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, requestPasswordReset, resetPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
