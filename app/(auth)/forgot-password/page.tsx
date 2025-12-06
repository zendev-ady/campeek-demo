"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brand } from "@/components/brand"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ArrowLeft, Mail, CheckCircle, Copy } from "lucide-react"

export default function ForgotPasswordPage() {
    const { requestPasswordReset } = useAuth()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [resetToken, setResetToken] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        setIsLoading(true)

        try {
            const token = await requestPasswordReset(email)
            setResetToken(token)
            setSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Nepodařilo se odeslat reset email")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = () => {
        const url = `${typeof window !== "undefined" ? window.location.origin : ""}/reset-password/${resetToken}`
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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

            {/* Card */}
            <Card className="w-full max-w-md glass-card border-border rounded-2xl overflow-hidden">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-2xl font-bold text-center text-foreground">Zapomenuté heslo</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        {success ? "Email byl odeslán" : "Zadejte svůj email pro reset hesla"}
                    </CardDescription>
                </CardHeader>
                {!success ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive" className="rounded-xl">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
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
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-2">
                            <Button
                                type="submit"
                                className="w-full btn-primary rounded-xl h-11 text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? "Odesílání..." : "Odeslat reset link"}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Vzpomněli jste si?{" "}
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
                ) : (
                    <CardContent className="space-y-4">
                        <div className="glass-card-light p-4 rounded-xl">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Reset link byl odeslán!</p>
                                    <p className="text-sm text-muted-foreground">Zkontrolujte svůj email</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                V produkční aplikaci by vám byl odeslán email s odkazem. Pro účely prototypu zkopírujte
                                následující odkaz:
                            </p>
                            <div className="bg-background/50 p-3 rounded-xl border border-border break-all text-xs font-mono text-foreground flex items-start gap-2">
                                <span className="flex-1">
                                    {`${typeof window !== "undefined" ? window.location.origin : ""}/reset-password/${resetToken}`}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors flex-shrink-0"
                                >
                                    {copied ? (
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 pt-2">
                            <Link href="/login" className="w-full">
                                <Button className="w-full btn-primary rounded-xl h-11">
                                    Zpět na přihlášení
                                </Button>
                            </Link>
                            <Link href="/" className="w-full">
                                <Button variant="outline" className="w-full btn-secondary rounded-xl h-11">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Zpět na hlavní stránku
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}
