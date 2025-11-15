"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, CheckCircle2, XCircle, Clock, Plus } from "lucide-react"
import { useMessages } from "@/lib/message-context"
import { useOrganization } from "@/lib/organization-context"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { ComposeMessageDialog } from "@/components/communication/compose-message-dialog"
import { MessageDetailDialog } from "@/components/communication/message-detail-dialog"
import type { Message } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CommunicationPage() {
  const { messages, isLoading } = useMessages()
  const { currentOrganization } = useOrganization()
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const isEmailVerified = currentOrganization?.email?.isVerified

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "sending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (message: Message) => {
    const deliveredCount = message.recipients.filter((r) => r.status === "delivered").length
    const failedCount = message.recipients.filter((r) => r.status === "failed").length
    const total = message.recipients.length

    if (failedCount > 0) {
      return (
        <Badge variant="outline" className="border-red-500 text-red-700">
          {deliveredCount}/{total} doručeno
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="border-green-500 text-green-700">
        {deliveredCount}/{total} doručeno
      </Badge>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Komunikace</h1>
          <p className="text-black mt-1">Správa a odesílání zpráv účastníkům</p>
        </div>
        <Button onClick={() => setIsComposeOpen(true)} disabled={!isEmailVerified}>
          <Plus className="h-4 w-4" />
          Nová zpráva
        </Button>
      </div>

      {/* Email Not Verified Warning */}
      {!isEmailVerified && (
        <Alert className="border-yellow-500">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <p className="font-semibold">Email není ověřený</p>
            <p className="text-sm mt-1">
              Pro odesílání zpráv musíte nejprve ověřit email v{" "}
              <a href="/dashboard/organization" className="underline">
                nastavení organizace
              </a>
              .
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-black">Načítám zprávy...</p>
            </CardContent>
          </Card>
        ) : messages.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Žádné zprávy
              </CardTitle>
              <CardDescription>
                Zatím jste neodeslali žádné zprávy. Klikněte na "Nová zpráva" pro vytvoření první
                zprávy.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-black bg-white mb-4">
                <MessageSquare className="h-8 w-8 text-black" />
              </div>
              <p className="text-black mb-4">Zatím žádné zprávy</p>
              {isEmailVerified && (
                <Button onClick={() => setIsComposeOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Vytvořit první zprávu
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages
              .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
              .map((message) => (
                <Card
                  key={message.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(message.status)}
                          <h3 className="font-semibold text-black">{message.subject}</h3>
                          {message.type === "auto-confirmation" && (
                            <Badge variant="outline">Automatické</Badge>
                          )}
                        </div>
                        <p className="text-sm text-black line-clamp-2">{message.body}</p>
                        <div className="flex items-center gap-3 text-xs text-black">
                          <span>
                            {format(new Date(message.sentAt), "d. MMMM yyyy, HH:mm", {
                              locale: cs,
                            })}
                          </span>
                          <span>•</span>
                          <span>{message.recipients.length} příjemců</span>
                        </div>
                      </div>
                      <div>{getStatusBadge(message)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>

      {/* Compose Dialog */}
      <ComposeMessageDialog open={isComposeOpen} onOpenChange={setIsComposeOpen} />

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <MessageDetailDialog
          message={selectedMessage}
          open={!!selectedMessage}
          onOpenChange={(open) => !open && setSelectedMessage(null)}
        />
      )}
    </div>
  )
}
