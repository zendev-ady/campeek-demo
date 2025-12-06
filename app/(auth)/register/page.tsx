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
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ArrowLeft, Mail, Lock, User } from "lucide-react"

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative">
      {/* Grid background for emerald theme */}
      <div className="emerald-grid-bg" />

      {/* Theme switcher in corner */}
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      {/* Logo */}
      <div className="mb-8 header-card p-4 px-6 rounded-xl">
        <Brand />
      </div>

      {/* Register Card */}
      <Card className="w-full max-w-md glass-card border-border rounded-2xl overflow-hidden">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center text-foreground">Registrace</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Vytvořte si nový účet
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="rounded-xl">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Jméno</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jan Novák"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 bg-background border-border rounded-xl h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-background border-border rounded-xl h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Heslo</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-background border-border rounded-xl h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Potvrzení hesla</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 bg-background border-border rounded-xl h-11"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-2">
            <Button
              type="submit"
              className="w-full btn-primary rounded-xl h-11 text-base"
              disabled={isLoading}
            >
              {isLoading ? "Registrace..." : "Zaregistrovat se"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Již máte účet?{" "}
              <Link href="/login" className="text-primary font-medium no-underline hover:underline">
                Přihlaste se
              </Link>
            </p>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full btn-secondary rounded-xl h-11"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zpět na hlavní stránku
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
