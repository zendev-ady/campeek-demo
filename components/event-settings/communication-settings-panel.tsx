"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, CheckCircle2, XCircle, Clock, Plus } from "lucide-react"
import { useMessages } from "@/lib/message-context"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { ComposeMessageDialog } from "@/components/communication/compose-message-dialog"
import { MessageDetailDialog } from "@/components/communication/message-detail-dialog"
import type { Message } from "@/lib/types"
import { SectionBlock } from "./section-block"

interface CommunicationSettingsPanelProps {
  eventId?: string
}

export function CommunicationSettingsPanel({ eventId }: CommunicationSettingsPanelProps = {}) {
  const { getMessagesByEvent } = useMessages()
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const eventMessages = eventId ? getMessagesByEvent(eventId) : []

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
          {deliveredCount}/{total}
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="border-green-500 text-green-700">
        {deliveredCount}/{total}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <SectionBlock
        title="Komunikace s účastníky"
        description="Zprávy odeslané účastníkům této akce"
      >
        <div className="space-y-4">
          {/* New Message Button */}
          <div className="flex justify-end">
            <Button onClick={() => setIsComposeOpen(true)}>
              <Plus className="h-4 w-4" />
              Nová zpráva účastníkům
            </Button>
          </div>

          {/* Messages List */}
          {eventMessages.length === 0 ? (
            <div className="border-2 border-dashed border-black p-8 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-black" />
              <p className="text-black mb-2">Zatím žádné zprávy</p>
              <p className="text-sm text-black">
                Klikněte na "Nová zpráva účastníkům" pro odeslání první zprávy
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventMessages
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
      </SectionBlock>

      {/* Compose Dialog */}
      <ComposeMessageDialog
        open={isComposeOpen}
        onOpenChange={setIsComposeOpen}
        eventId={eventId}
      />

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
