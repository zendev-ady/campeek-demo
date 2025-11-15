"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import type { Message } from "@/lib/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MessageDetailDialogProps {
  message: Message
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MessageDetailDialog({ message, open, onOpenChange }: MessageDetailDialogProps) {
  const [showAllRecipients, setShowAllRecipients] = useState(false)

  const deliveredCount = message.recipients.filter((r) => r.status === "delivered").length
  const failedCount = message.recipients.filter((r) => r.status === "failed").length
  const total = message.recipients.length

  const displayedRecipients = showAllRecipients ? message.recipients : message.recipients.slice(0, 10)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {message.subject}
            {message.type === "auto-confirmation" && <Badge variant="outline">Automatické</Badge>}
          </DialogTitle>
          <DialogDescription>
            Odesláno{" "}
            {format(new Date(message.sentAt), "d. MMMM yyyy v HH:mm", {
              locale: cs,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Delivery Status Summary */}
          <div className="p-4 border-2 border-black space-y-3">
            <h3 className="font-semibold text-black">📊 Stav doručení ({total} příjemců)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-black">
                  Doručeno: <strong>{deliveredCount}</strong>
                </span>
              </div>
              {failedCount > 0 && (
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-black">
                    Nedoručeno: <strong>{failedCount}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Message Body */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black">Text zprávy</h3>
            <div className="p-4 border-2 border-black bg-gray-50 whitespace-pre-wrap">
              {message.body}
            </div>
          </div>

          {/* Recipients List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Seznam příjemců</h3>
              {message.recipients.length > 10 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllRecipients(!showAllRecipients)}
                >
                  {showAllRecipients ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Zobrazit méně
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Zobrazit vše ({message.recipients.length})
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="border-2 border-black divide-y-2 divide-black">
              {displayedRecipients.map((recipient, index) => (
                <div key={index} className="p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-black">{recipient.name}</p>
                    <p className="text-sm text-black">{recipient.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {recipient.status === "delivered" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <Badge variant="outline" className="border-green-500 text-green-700">
                          Doručeno
                        </Badge>
                      </>
                    ) : recipient.status === "failed" ? (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" />
                        <Badge variant="outline" className="border-red-500 text-red-700">
                          Nedoručeno
                        </Badge>
                      </>
                    ) : (
                      <Badge variant="outline">Čeká</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!showAllRecipients && message.recipients.length > 10 && (
              <p className="text-sm text-center text-black">
                Zobrazeno 10 z {message.recipients.length} příjemců
              </p>
            )}
          </div>

          {/* Failed Recipients Details */}
          {failedCount > 0 && (
            <div className="p-4 bg-red-50 border-2 border-red-500 space-y-2">
              <h3 className="font-semibold text-red-800">⚠️ Nedoručené emaily</h3>
              <ul className="space-y-1">
                {message.recipients
                  .filter((r) => r.status === "failed")
                  .map((recipient, index) => (
                    <li key={index} className="text-sm text-red-700">
                      • {recipient.email} - {recipient.error || "Neznámá chyba"}
                    </li>
                  ))}
              </ul>
              <p className="text-sm text-red-700 mt-2">
                💡 Zkontrolujte emailové adresy v profilech příjemců a zkuste zprávu odeslat znovu.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
