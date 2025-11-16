"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { Message, MessageRecipient, OrganizationBranding } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { Mail, AlertCircle } from "lucide-react"

export default function DemoEmailPage() {
  const params = useParams()
  const [message, setMessage] = useState<Message | null>(null)
  const [recipients, setRecipients] = useState<MessageRecipient[]>([])
  const [branding, setBranding] = useState<OrganizationBranding | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadMessage()
    loadRecipients()
    loadBranding()
  }, [params.id])

  const loadMessage = () => {
    try {
      const stored = localStorage.getItem("messages")
      if (stored) {
        const messages = JSON.parse(stored) as Message[]
        const msg = messages.find((m) => m.id === params.id)
        if (msg) {
          setMessage(msg)
        } else {
          setError("Zpráva nebyla nalezena")
        }
      } else {
        setError("Žádné zprávy nejsou k dispozici")
      }
    } catch (error) {
      console.error("Failed to load message:", error)
      setError("Chyba při načítání zprávy")
    }
  }

  const loadRecipients = () => {
    try {
      const stored = localStorage.getItem("messageRecipients")
      if (stored) {
        const allRecipients = JSON.parse(stored) as MessageRecipient[]
        const msgRecipients = allRecipients.filter((r) => r.messageId === params.id)
        setRecipients(msgRecipients)
      }
    } catch (error) {
      console.error("Failed to load recipients:", error)
    }
  }

  const loadBranding = () => {
    try {
      const stored = localStorage.getItem("organizationBranding")
      if (stored) {
        setBranding(JSON.parse(stored) as OrganizationBranding)
      }
    } catch (error) {
      console.error("Failed to load branding:", error)
    }
  }

  const handleClose = () => {
    window.close()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">Chyba</p>
              <p className="text-black">{error}</p>
              <Button onClick={handleClose} className="mt-4">
                Zavřít
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!message || !branding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Načítání...</p>
      </div>
    )
  }

  const recipientEmails = recipients.map((r) => r.parentEmail).join(", ")
  const displayDate = message.sentAt || message.scheduledAt || message.createdAt

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Email náhled (Demo mód)</h1>
            </div>
            <Button onClick={handleClose}>Zavřít</Button>
          </div>

          <Alert className="bg-yellow-50 border-yellow-600">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm ml-2">
              Toto je demo náhled - v produkci bude email skutečně odeslán.
            </p>
          </Alert>
        </div>

        {/* Email Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-sm">
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <span className="font-semibold">From:</span>
              <span>{branding.emailFrom || `${branding.organizationId}@campeek.app`}</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <span className="font-semibold">To:</span>
              <div className="break-all">
                {recipients.length > 3
                  ? `${recipients.slice(0, 3).map((r) => r.parentEmail).join(", ")} + ${recipients.length - 3} dalších`
                  : recipientEmails}
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <span className="font-semibold">Reply-To:</span>
              <span>{branding.contactEmail}</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <span className="font-semibold">Subject:</span>
              <span>{message.subject}</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <span className="font-semibold">Date:</span>
              <span>{format(new Date(displayDate), "dd.MM.yyyy HH:mm", { locale: cs })}</span>
            </div>
          </CardContent>
        </Card>

        {/* Email Body */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tělo emailu</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="bg-white border-2 border-black p-8"
              style={{
                backgroundColor: branding.secondaryColor || "#ffffff",
              }}
            >
              {/* Email Header */}
              <div className="border-b-2 border-black pb-6 mb-6">
                {branding.logoUrl && (
                  <img
                    src={branding.logoUrl}
                    alt={branding.name}
                    className="h-16 mb-4"
                  />
                )}
                <h2
                  className="text-3xl font-bold"
                  style={{
                    color: branding.primaryColor || "#000000",
                  }}
                >
                  {branding.name}
                </h2>
              </div>

              {/* Email Subject */}
              <h3 className="text-xl font-bold mb-4">{message.subject}</h3>

              {/* Email Content */}
              <div className="prose prose-sm max-w-none mb-6">
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="border-t-2 border-black pt-4 mb-6">
                  <p className="font-semibold mb-2">Přílohy:</p>
                  <ul className="space-y-1">
                    {message.attachments.map((attachment) => (
                      <li key={attachment.id}>
                        <a href={attachment.url} className="text-blue-600 underline">
                          {attachment.name} ({(attachment.size / 1024).toFixed(0)} KB)
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Email Footer */}
              <div className="border-t-2 border-black pt-6 text-sm text-black">
                <p className="mb-2">
                  <strong>Kontakt:</strong>{" "}
                  <a
                    href={`mailto:${branding.contactEmail}`}
                    className="text-blue-600 underline"
                  >
                    {branding.contactEmail}
                  </a>
                </p>
                <p className="text-xs opacity-75 mt-4">
                  Tento email byl odeslán systémem Campeek pro {branding.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pb-6">
          <Button onClick={handleClose} size="lg">
            Zavřít toto okno
          </Button>
        </div>
      </div>
    </div>
  )
}
