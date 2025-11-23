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

export default function ForgotPasswordPage() {
    const { requestPasswordReset } = useAuth()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [resetToken, setResetToken] = useState("")
    const [isLoading, setIsLoading] = useState(false)

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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <div className="mb-8 bg-black p-4 border-2 border-black">
                <Brand />
            </div>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-black">Zapomenuté heslo</CardTitle>
                    <CardDescription className="text-center">
                        {success ? "Email byl odeslán" : "Zadejte svůj email pro reset hesla"}
                    </CardDescription>
                </CardHeader>
                {!success ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
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
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 mt-6">
                            <Button
                                type="submit"
                                className="w-full bg-black text-white border-2 border-black"
                                disabled={isLoading}
                            >
                                {isLoading ? "Odesílání..." : "Odeslat reset link"}
                            </Button>
                            <p className="text-sm text-center text-black">
                                Vzpomněli jste si?{" "}
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
                ) : (
                    <CardContent className="space-y-4">
                        <Alert>
                            <AlertDescription>
                                <p className="font-medium mb-2">Reset link byl odeslán na váš email!</p>
                                <p className="text-sm text-gray-600 mb-4">
                                    V produkční aplikaci by vám byl odeslán email s odkazem. Pro účely prototypu zkopírujte
                                    následující odkaz:
                                </p>
                                <div className="bg-gray-100 p-3 rounded border border-gray-300 break-all text-xs font-mono">
                                    {`${typeof window !== "undefined" ? window.location.origin : ""}/reset-password/${resetToken}`}
                                </div>
                            </AlertDescription>
                        </Alert>
                        <div className="flex flex-col space-y-3 pt-4">
                            <Link href="/login">
                                <Button variant="outline" className="w-full border-2 border-black text-black hover:bg-gray-100">
                                    Zpět na přihlášení
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full border-2 border-black text-black hover:bg-gray-100">
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
