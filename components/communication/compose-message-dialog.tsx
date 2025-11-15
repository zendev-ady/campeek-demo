"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Send } from "lucide-react"
import { useMessages } from "@/lib/message-context"
import { useEvents } from "@/lib/event-context"
import { useOrganization } from "@/lib/organization-context"
import { toast } from "sonner"
import type { MessageRecipient, Registration } from "@/lib/types"

interface ComposeMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId?: string // If provided, auto-select this event's participants
}

export function ComposeMessageDialog({ open, onOpenChange, eventId }: ComposeMessageDialogProps) {
  const { sendMessage } = useMessages()
  const { events, getRegistrationsByEventId } = useEvents()
  const { currentOrganization } = useOrganization()
  const [isSending, setIsSending] = useState(false)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [recipientMode, setRecipientMode] = useState<"all" | "events" | "specific">(
    eventId ? "events" : "all",
  )
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(eventId ? [eventId] : [])

  // Get all organization events
  const orgEvents = events.filter((e) => e.organizationId === currentOrganization?.id)

  const getRecipients = (): MessageRecipient[] => {
    const recipients: MessageRecipient[] = []
    const uniqueEmails = new Set<string>()

    if (recipientMode === "all") {
      // Get all parents from all events in organization
      orgEvents.forEach((event) => {
        const registrations = getRegistrationsByEventId(event.id) as Registration[]
        registrations.forEach((reg) => {
          if (!uniqueEmails.has(reg.parentEmail)) {
            uniqueEmails.add(reg.parentEmail)
            recipients.push({
              email: reg.parentEmail,
              name: reg.parentName,
              status: "pending",
            })
          }
        })
      })
    } else if (recipientMode === "events") {
      // Get parents from selected events
      selectedEventIds.forEach((eventId) => {
        const registrations = getRegistrationsByEventId(eventId) as Registration[]
        registrations.forEach((reg) => {
          if (!uniqueEmails.has(reg.parentEmail)) {
            uniqueEmails.add(reg.parentEmail)
            recipients.push({
              email: reg.parentEmail,
              name: reg.parentName,
              status: "pending",
            })
          }
        })
      })
    }

    return recipients
  }

  const handleEventToggle = (eventId: string) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId],
    )
  }

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.error("Vyplňte předmět a text zprávy")
      return
    }

    const recipients = getRecipients()
    if (recipients.length === 0) {
      toast.error("Vyberte alespoň jednoho příjemce")
      return
    }

    setIsSending(true)
    try {
      const message = await sendMessage(
        subject,
        body,
        recipients,
        eventId || (selectedEventIds.length === 1 ? selectedEventIds[0] : undefined),
      )

      const deliveredCount = message.recipients.filter((r) => r.status === "delivered").length
      const failedCount = message.recipients.filter((r) => r.status === "failed").length

      if (failedCount > 0) {
        toast.success(
          `Zpráva byla odeslána ${deliveredCount} příjemcům. ${failedCount} emailů se nepodařilo doručit.`,
        )
      } else {
        toast.success(`Zpráva byla úspěšně odeslána ${deliveredCount} příjemcům!`)
      }

      // Reset form
      setSubject("")
      setBody("")
      setSelectedEventIds(eventId ? [eventId] : [])
      setRecipientMode(eventId ? "events" : "all")
      onOpenChange(false)
    } catch (error) {
      toast.error("Nepodařilo se odeslat zprávu")
    } finally {
      setIsSending(false)
    }
  }

  const recipientCount = getRecipients().length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nová zpráva</DialogTitle>
          <DialogDescription>
            Napište zprávu rodičům účastníků vašich akcí
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Recipient Selection */}
          {!eventId && (
            <div className="space-y-4">
              <Label>Příjemci</Label>

              <div className="space-y-3">
                {/* All parents */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="all-parents"
                    checked={recipientMode === "all"}
                    onChange={() => setRecipientMode("all")}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="all-parents" className="cursor-pointer">
                    Všichni rodiče v organizaci (
                    {recipientMode === "all" ? recipientCount : "..."} osob)
                  </Label>
                </div>

                {/* Specific events */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="event-parents"
                      checked={recipientMode === "events"}
                      onChange={() => setRecipientMode("events")}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="event-parents" className="cursor-pointer">
                      Rodiče konkrétních akcí
                    </Label>
                  </div>

                  {recipientMode === "events" && (
                    <div className="ml-6 space-y-2 border-2 border-black p-4">
                      {orgEvents.length === 0 ? (
                        <p className="text-sm text-black">Zatím nemáte žádné akce</p>
                      ) : (
                        orgEvents.map((event) => {
                          const regCount = getRegistrationsByEventId(event.id).length
                          return (
                            <div key={event.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`event-${event.id}`}
                                checked={selectedEventIds.includes(event.id)}
                                onCheckedChange={() => handleEventToggle(event.id)}
                              />
                              <Label
                                htmlFor={`event-${event.id}`}
                                className="cursor-pointer text-sm"
                              >
                                {event.name} ({regCount} rodičů)
                              </Label>
                            </div>
                          )
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Recipient count */}
              <div className="p-3 bg-gray-50 border-2 border-black">
                <p className="text-sm font-medium text-black">
                  📊 Celkem bude zasláno: {recipientCount} rodičům
                </p>
              </div>
            </div>
          )}

          {/* If eventId is provided, show locked info */}
          {eventId && (
            <div className="p-3 bg-blue-50 border-2 border-black">
              <p className="text-sm font-medium text-black">
                📧 Zpráva bude odeslána účastníkům této akce ({recipientCount} rodičů)
              </p>
            </div>
          )}

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Předmět <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="např. Informace k letnímu táboru"
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label htmlFor="body">
              Text zprávy <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Napište text emailu..."
              rows={10}
            />
            <p className="text-xs text-black">
              Zpráva bude odeslána jako prostý text bez formátování
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t-2 border-black">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>
              Zrušit
            </Button>
            <Button onClick={handleSend} disabled={isSending || recipientCount === 0}>
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Odesílám...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Odeslat ({recipientCount})
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
