"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type { Message, MessageRecipient, Registration, OrganizationBranding } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Calendar, Users, Mail } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { toast } from "sonner"

export default function MessagePreviewPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const [message, setMessage] = useState<Message | null>(null)
  const [recipients, setRecipients] = useState<Registration[]>([])
  const [branding, setBranding] = useState<OrganizationBranding | null>(null)
  const [showAllRecipients, setShowAllRecipients] = useState(false)

  useEffect(() => {
    loadDraftMessage()
    loadBranding()
  }, [])

  const loadDraftMessage = () => {
    try {
      const draft = sessionStorage.getItem("draftMessage")
      if (draft) {
        const msg = JSON.parse(draft) as Message
        setMessage(msg)
        loadRecipients(msg.recipientIds)
      }
    } catch (error) {
      console.error("Failed to load draft message:", error)
      toast.error("Chyba při načítání zprávy")
      router.push("/dashboard/communication")
    }
  }

  const loadRecipients = (recipientIds: string[]) => {
    try {
      const stored = localStorage.getItem("registrations")
      if (stored) {
        const allRegistrations = JSON.parse(stored) as Registration[]
        const selectedRegs = allRegistrations.filter((r) => recipientIds.includes(r.id))
        setRecipients(selectedRegs)
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

  const handleSend = () => {
    if (!message) return

    // Create message recipients
    const newRecipients: MessageRecipient[] = recipients.map((reg, index) => ({
      id: `recipient-${Date.now()}-${index}`,
      messageId: message.id,
      registrationId: reg.id,
      parentName: reg.parentName,
      parentEmail: reg.parentEmail,
      status: "pending" as const,
    }))

    // Update message status
    const now = new Date().toISOString()
    const finalMessage: Message = {
      ...message,
      status: message.scheduledAt ? "scheduled" : "sent",
      sentAt: message.scheduledAt ? undefined : now,
    }

    // Save to localStorage
    try {
      // Load existing messages
      const storedMessages = localStorage.getItem("messages")
      const messages = storedMessages ? JSON.parse(storedMessages) : []

      // Check if message already exists (update) or add new
      const messageIndex = messages.findIndex((m: Message) => m.id === finalMessage.id)
      if (messageIndex >= 0) {
        messages[messageIndex] = finalMessage
      } else {
        messages.push(finalMessage)
      }

      localStorage.setItem("messages", JSON.stringify(messages))

      // Save recipients
      const storedRecipients = localStorage.getItem("messageRecipients")
      const allRecipients = storedRecipients ? JSON.parse(storedRecipients) : []
      allRecipients.push(...newRecipients)
      localStorage.setItem("messageRecipients", JSON.stringify(allRecipients))

      // Clear draft
      sessionStorage.removeItem("draftMessage")

      // In demo mode, open email preview in new tab
      if (!message.scheduledAt) {
        window.open(`/demo/email/${message.id}`, "_blank")
      }

      // Show success message
      const successMessage = message.scheduledAt
        ? `Zpráva byla naplánována na ${format(new Date(message.scheduledAt), "dd.MM.yyyy HH:mm", { locale: cs })}`
        : "Zpráva byla odeslána (v demo režimu otevřena v novém tabu)"

      toast.success(successMessage)

      // Redirect to communication dashboard
      router.push("/dashboard/communication")
    } catch (error) {
      console.error("Failed to save message:", error)
      toast.error("Chyba při ukládání zprávy")
    }
  }

  const handleBack = () => {
    if (confirm("Opravdu chcete opustit tuto stránku? Neuložené změny budou ztraceny.")) {
      sessionStorage.removeItem("draftMessage")
      router.push("/dashboard/communication")
    }
  }

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Načítání...</p>
      </div>
    )
  }

  const displayedRecipients = showAllRecipients ? recipients : recipients.slice(0, 10)
  const hasMoreRecipients = recipients.length > 10

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zpět
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Náhled zprávy</h1>
        <p className="text-black mt-1">Zkontrolujte zprávu před odesláním</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Column - Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Settings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nastavení</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-black mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Počet příjemců</p>
                  <p className="text-sm text-black">{recipients.length} osob</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-black mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Předmět</p>
                  <p className="text-sm text-black">{message.subject}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-black mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Datum odeslání</p>
                  <p className="text-sm text-black">
                    {message.scheduledAt
                      ? format(new Date(message.scheduledAt), "dd.MM.yyyy HH:mm", {
                          locale: cs,
                        })
                      : "Okamžitě po potvrzení"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipients List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Příjemci</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {displayedRecipients.map((reg) => (
                    <div key={reg.id} className="text-sm">
                      <p className="font-medium">{reg.parentName}</p>
                      <p className="text-black">{reg.parentEmail}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {hasMoreRecipients && !showAllRecipients && (
                <Button
                  variant="link"
                  onClick={() => setShowAllRecipients(true)}
                  className="mt-3 p-0"
                >
                  Zobrazit všechny ({recipients.length})
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Email Preview */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Náhled emailu</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Email Preview */}
              <div className="border-2 border-black p-6 bg-white">
                {/* Email Header */}
                <div className="border-b-2 border-black pb-4 mb-6">
                  {branding?.logoUrl && (
                    <img
                      src={branding.logoUrl}
                      alt={branding.name}
                      className="h-12 mb-3"
                    />
                  )}
                  <h2 className="text-2xl font-bold">{branding?.name || "Organizace"}</h2>
                </div>

                {/* Email Body */}
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Email Footer */}
                <div className="border-t-2 border-black mt-6 pt-4 text-sm text-black">
                  <p>
                    Odpovězte prosím na:{" "}
                    <a
                      href={`mailto:${branding?.contactEmail}`}
                      className="text-blue-600 underline"
                    >
                      {branding?.contactEmail}
                    </a>
                  </p>
                  <p className="mt-2 text-xs">
                    Tento email byl odeslán ze systému Campeek
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center border-t-2 border-black pt-6">
        <Button variant="outline" onClick={handleBack} size="lg">
          Zpět
        </Button>
        <Button onClick={handleSend} size="lg" className="min-w-[200px]">
          {message.scheduledAt ? "Naplánovat" : "Odeslat"}
        </Button>
      </div>
    </div>
  )
}
