"use client"

import type { Message, MessageRecipient } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Eye, Send, XCircle } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

interface MessageListRowProps {
  message: Message
  recipients: MessageRecipient[]
  onDetail: (message: Message) => void
  onResend: (message: Message) => void
  onCancel?: (message: Message) => void
}

export function MessageListRow({ message, recipients, onDetail, onResend, onCancel }: MessageListRowProps) {
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
    if (message.status !== "sent") return "-"
    const delivered = recipients.filter((r) => r.status === "delivered").length
    const total = recipients.length
    return `${delivered}/${total}`
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
    <div className="border-2 border-black bg-white p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{message.subject}</h3>
      </div>
      <div className="w-32">{getStatusBadge()}</div>
      <div className="w-40 text-sm text-black">{getDisplayDate()}</div>
      <div className="w-24 text-sm text-black text-center">{recipients.length}</div>
      <div className="w-24 text-sm text-black text-center">{getDeliveryStats()}</div>
      <div className="w-32 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDetail(message)}>
              <Eye className="h-4 w-4 mr-2" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onResend(message)}>
              <Send className="h-4 w-4 mr-2" />
              Odeslat znovu
            </DropdownMenuItem>
            {message.status === "scheduled" && onCancel && (
              <DropdownMenuItem onClick={() => onCancel(message)} className="text-red-600">
                <XCircle className="h-4 w-4 mr-2" />
                Zrušit
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
