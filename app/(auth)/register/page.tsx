"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brand } from "@/components/brand"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Hesla se neshodují")
      return
    }

    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků")
      return
    }

    setIsLoading(true)

    try {
      await register(email, password, name)
      router.push("/prehled")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrace se nezdařila")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 bg-black p-4 border-2 border-black">
        <Brand />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-black">Registrace</CardTitle>
          <CardDescription className="text-center">Vytvořte si nový účet</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Jméno</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jan Novák"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potvrzení hesla</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button
              type="submit"
              className="w-full bg-black text-white border-2 border-black"
              disabled={isLoading}
            >
              {isLoading ? "Registrace..." : "Zaregistrovat se"}
            </Button>
            <p className="text-sm text-center text-black">
              Již máte účet?{" "}
              <Link href="/login" className="text-black underline font-medium">
                Přihlaste se
              </Link>
            </p>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-2 border-black text-black hover:bg-gray-100"
              >
                Zpět na hlavní stránku
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
