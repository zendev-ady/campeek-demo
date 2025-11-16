"use client"

import type { Message, MessageRecipient } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CheckCircle2, XCircle } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

interface MessageCardProps {
  message: Message
  recipients: MessageRecipient[]
  onDetail: (message: Message) => void
  onResend: (message: Message) => void
  onCancel?: (message: Message) => void
}

export function MessageCard({ message, recipients, onDetail, onResend, onCancel }: MessageCardProps) {
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

  const getDeliveryStats = () => {
    if (message.status !== "sent") return null
    const delivered = recipients.filter((r) => r.status === "delivered").length
    const total = recipients.length
    return (
      <div className="flex items-center text-sm text-black">
        <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
        {delivered}/{total} doručeno
      </div>
    )
  }

  const getDisplayDate = () => {
    if (message.status === "sent" && message.sentAt) {
      return formatDate(message.sentAt)
    }
    if (message.status === "scheduled" && message.scheduledAt) {
      return formatDate(message.scheduledAt)
    }
    if (message.status === "cancelled" && message.cancelledAt) {
      return formatDate(message.cancelledAt)
    }
    return formatDate(message.createdAt)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 flex-1">{message.subject}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
        <div className="flex items-center text-sm text-black">
          <Calendar className="h-4 w-4 mr-2" />
          {getDisplayDate()}
        </div>
        <div className="flex items-center text-sm text-black">
          <Users className="h-4 w-4 mr-2" />
          {recipients.length} {recipients.length === 1 ? "příjemce" : "příjemců"}
        </div>
        {getDeliveryStats()}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={() => onResend(message)} size="sm">
          Odeslat znovu
        </Button>
        <Button onClick={() => onDetail(message)} size="sm">
          Detail
        </Button>
        {message.status === "scheduled" && onCancel && (
          <Button variant="destructive" onClick={() => onCancel(message)} size="sm">
            Zrušit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
