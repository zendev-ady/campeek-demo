"use client"

import type { Message, MessageRecipient } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, ExternalLink, XCircle, Edit2, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

interface MessageDetailSidebarProps {
  message: Message
  recipients: MessageRecipient[]
  onClose: () => void
  onCancel?: (message: Message) => void
  onEdit?: (message: Message) => void
}

export function MessageDetailSidebar({
  message,
  recipients,
  onClose,
  onCancel,
  onEdit,
}: MessageDetailSidebarProps) {
  const formatDate = (date: string) => {
    return format(new Date(date), "dd.MM.yyyy HH:mm", { locale: cs })
  }

  const getStatusBadge = () => {
    switch (message.status) {
      case "sent":
        return <Badge variant="default">Odesláno</Badge>
      case "scheduled":
        return <Badge variant="outline">Naplánováno</Badge>
      case "cancelled":
        return <Badge variant="secondary">Zrušeno</Badge>
    }
  }

  const getRecipientStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="default" className="text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Doručeno
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="text-xs">
            <XCircle className="h-3 w-3 mr-1" />
            Selhalo
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-xs">
            Čeká
          </Badge>
        )
    }
  }

  const handleViewFullSize = () => {
    window.open(`/demo/email/${message.id}`, "_blank")
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-[500px] bg-white border-l-2 border-black overflow-y-auto z-40">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b-2 border-black p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-lg line-clamp-2">{message.subject}</h2>
            <div className="mt-2">{getStatusBadge()}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} title="Zavřít">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Základní informace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-black">
                {message.status === "sent"
                  ? "Datum odeslání"
                  : message.status === "scheduled"
                    ? "Naplánováno na"
                    : "Zrušeno"}
              </p>
              <p className="font-medium">
                {message.status === "sent" && message.sentAt
                  ? formatDate(message.sentAt)
                  : message.status === "scheduled" && message.scheduledAt
                    ? formatDate(message.scheduledAt)
                    : message.status === "cancelled" && message.cancelledAt
                      ? formatDate(message.cancelledAt)
                      : formatDate(message.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm text-black">Počet příjemců celkem</p>
              <p className="font-medium">{recipients.length}</p>
            </div>

            {message.status === "sent" && (
              <div>
                <p className="text-sm text-black">Úspěšnost doručení</p>
                <p className="font-medium">
                  {recipients.filter((r) => r.status === "delivered").length}/
                  {recipients.length} doručeno
                </p>
              </div>
            )}

            {message.status === "cancelled" && (
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm">
                  Tato zpráva byla zrušena a nebude odeslána.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recipients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Příjemci</CardTitle>
          </CardHeader>
          <CardContent>
            {message.status === "scheduled" && message.recipientFilter?.type === "event" && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-3 text-sm">
                <p>
                  Seznam příjemců se aktualizuje při odeslání dle filtru akce.
                  Budou zahrnuti všichni aktuální účastníci.
                </p>
              </div>
            )}

            <ScrollArea className="h-64">
              <div className="space-y-3">
                {recipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    className="border-2 border-black p-3 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{recipient.parentName}</p>
                        <p className="text-sm text-black truncate">
                          {recipient.parentEmail}
                        </p>
                      </div>
                      {message.status === "sent" && getRecipientStatusBadge(recipient.status)}
                    </div>
                    {recipient.status === "failed" && recipient.failedReason && (
                      <p className="text-xs text-red-600 mt-1">
                        {recipient.failedReason}
                      </p>
                    )}
                    {recipient.status === "delivered" && recipient.deliveredAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Doručeno {formatDate(recipient.deliveredAt)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Email Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grafický náhled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 border-2 border-black p-4 text-sm">
              <h3 className="font-bold mb-2">{message.subject}</h3>
              <p className="whitespace-pre-wrap line-clamp-6 text-black">
                {message.content}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={handleViewFullSize}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Zobrazit v plné velikosti
            </Button>
          </CardContent>
        </Card>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Přílohy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    className="block border-2 border-black p-3 hover:bg-gray-50 transition-colors"
                    download
                  >
                    <p className="font-medium">{attachment.name}</p>
                    <p className="text-sm text-black">
                      {(attachment.size / 1024).toFixed(0)} KB
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {message.status === "scheduled" && (
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onEdit(message)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Upravit
              </Button>
            )}
            {onCancel && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => onCancel(message)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Zrušit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
