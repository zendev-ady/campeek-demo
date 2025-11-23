"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOrganization } from "@/lib/organization-context"
import { useAuth } from "@/lib/auth-context"
import type { Event, Registration, Message } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert } from "@/components/ui/alert"
import { Search, Paperclip, X } from "lucide-react"
import type { MessageAttachment } from "@/lib/types"

interface NewMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefillData?: Partial<Message>
}

export function NewMessageDialog({ open, onOpenChange, prefillData }: NewMessageDialogProps) {
  const router = useRouter()
  const { currentOrganization } = useOrganization()
  const { user } = useAuth()

  const [events, setEvents] = useState<Event[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>("all")
  const [selectedRecipients, setSelectedRecipients] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [enableScheduling, setEnableScheduling] = useState(false)
  const [attachments, setAttachments] = useState<MessageAttachment[]>([])

  useEffect(() => {
    if (open) {
      loadEvents()
      loadRegistrations()

      // Prefill if editing/resending
      if (prefillData) {
        setSubject(prefillData.subject || "")
        setContent(prefillData.content || "")
        if (prefillData.recipientFilter?.eventId) {
          setSelectedEventId(prefillData.recipientFilter.eventId)
        }
        if (prefillData.recipientIds) {
          setSelectedRecipients(new Set(prefillData.recipientIds))
        }
        if (prefillData.attachments) {
          setAttachments(prefillData.attachments)
        }
        if (prefillData.scheduledAt) {
          setEnableScheduling(true)
          const scheduledDate = new Date(prefillData.scheduledAt)
          setScheduledDate(scheduledDate.toISOString().split("T")[0])
          setScheduledTime(scheduledDate.toTimeString().substring(0, 5))
        }
      }
    } else {
      // Reset form
      resetForm()
    }
  }, [open, prefillData])

  const resetForm = () => {
    setSelectedEventId("all")
    setSelectedRecipients(new Set())
    setSearchQuery("")
    setSubject("")
    setContent("")
    setScheduledDate("")
    setScheduledTime("")
    setEnableScheduling(false)
    setAttachments([])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newAttachments: MessageAttachment[] = Array.from(files).map((file, index) => ({
      id: `attachment-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      url: "#", // In demo mode, we don't actually upload files
    }))

    setAttachments([...attachments, ...newAttachments])
    // Reset input
    e.target.value = ""
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id))
  }

  const loadEvents = () => {
    try {
      const stored = localStorage.getItem("events")
      if (stored) {
        const allEvents = JSON.parse(stored) as Event[]
        const orgEvents = currentOrganization
          ? allEvents.filter((e) => e.organizationId === currentOrganization.id)
          : []
        setEvents(orgEvents)
      }
    } catch (error) {
      console.error("Failed to load events:", error)
    }
  }

  const loadRegistrations = () => {
    try {
      const stored = localStorage.getItem("registrations")
      if (stored) {
        setRegistrations(JSON.parse(stored) as Registration[])
      }
    } catch (error) {
      console.error("Failed to load registrations:", error)
    }
  }

  const getFilteredRegistrations = () => {
    let filtered = registrations

    // Filter by event
    if (selectedEventId !== "all") {
      filtered = filtered.filter((r) => r.eventId === selectedEventId)
    } else {
      // Show only registrations for events in current organization
      const eventIds = events.map((e) => e.id)
      filtered = filtered.filter((r) => eventIds.includes(r.eventId))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.parentName.toLowerCase().includes(query) ||
          r.parentEmail.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  const filteredRegistrations = getFilteredRegistrations()

  const toggleRecipient = (regId: string) => {
    const newSet = new Set(selectedRecipients)
    if (newSet.has(regId)) {
      newSet.delete(regId)
    } else {
      newSet.add(regId)
    }
    setSelectedRecipients(newSet)
  }

  const toggleAll = () => {
    if (selectedRecipients.size === filteredRegistrations.length) {
      setSelectedRecipients(new Set())
    } else {
      setSelectedRecipients(new Set(filteredRegistrations.map((r) => r.id)))
    }
  }

  const handleSubmit = () => {
    if (!subject || !content || selectedRecipients.size === 0) {
      alert("Vyplňte prosím všechna povinná pole a vyberte alespoň jednoho příjemce")
      return
    }

    // Create draft message
    const messageId = `msg-${Date.now()}`
    const now = new Date().toISOString()

    let scheduledAt: string | undefined
    if (enableScheduling && scheduledDate && scheduledTime) {
      scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    }

    const newMessage: Message = {
      id: messageId,
      organizationId: currentOrganization!.id,
      subject,
      content,
      status: scheduledAt ? "scheduled" : "sent",
      scheduledAt,
      sentAt: scheduledAt ? undefined : now,
      recipientFilter:
        selectedEventId !== "all"
          ? {
            type: "event",
            eventId: selectedEventId,
          }
          : undefined,
      recipientIds: Array.from(selectedRecipients),
      attachments: attachments.length > 0 ? attachments : undefined,
      createdAt: now,
      createdBy: user!.id,
    }

    // Save to preview (temporary storage)
    sessionStorage.setItem("draftMessage", JSON.stringify(newMessage))

    // Navigate to preview page
    router.push(`/communication/preview/${messageId}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nová zpráva</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipients Section */}
          <div className="space-y-3">
            <Label>Komu</Label>

            <Select value={selectedEventId} onValueChange={setSelectedEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte akci" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny akce</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {filteredRegistrations.length > 0 && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                  <Input
                    placeholder="Hledat podle jména nebo emailu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedRecipients.size === filteredRegistrations.length}
                    onCheckedChange={toggleAll}
                  />
                  <Label htmlFor="select-all" className="cursor-pointer">
                    Vybrat vše ({filteredRegistrations.length})
                  </Label>
                </div>

                <ScrollArea className="h-48 border-2 border-black p-3">
                  <div className="space-y-2">
                    {filteredRegistrations.map((reg) => (
                      <div key={reg.id} className="flex items-center gap-2">
                        <Checkbox
                          id={reg.id}
                          checked={selectedRecipients.has(reg.id)}
                          onCheckedChange={() => toggleRecipient(reg.id)}
                        />
                        <Label htmlFor={reg.id} className="cursor-pointer flex-1">
                          <div className="text-sm">
                            <div className="font-medium">{reg.parentName}</div>
                            <div className="text-black">{reg.parentEmail}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <p className="text-sm text-black">
                  Vybráno {selectedRecipients.size} příjemců
                </p>
              </>
            )}

            {filteredRegistrations.length === 0 && (
              <Alert>
                <p className="text-sm">
                  Pro vybraný filtr nejsou k dispozici žádní příjemci.
                </p>
              </Alert>
            )}
          </div>

          {/* Message Content Section */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="subject">Předmět *</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Předmět zprávy"
              />
            </div>

            <div>
              <Label htmlFor="content">Text zprávy *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Napište text zprávy..."
                rows={8}
              />
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-3">
            <Label htmlFor="attachments">Přílohy (volitelné)</Label>
            <div className="border-2 border-dashed border-black p-4 rounded">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="gap-2"
                >
                  <Paperclip className="h-4 w-4" />
                  Přidat soubory
                </Button>
                <p className="text-sm text-black">
                  {attachments.length === 0
                    ? "Zatím nebyly přidány žádné přílohy"
                    : `${attachments.length} ${attachments.length === 1 ? "soubor" : attachments.length < 5 ? "soubory" : "souborů"}`}
                </p>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />

              {attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Paperclip className="h-4 w-4 text-black flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-black">
                            {(attachment.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAttachment(attachment.id)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-black">
              V demo verzi jsou přílohy pouze simulovány.
            </p>
          </div>

          {/* Scheduling Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="enable-scheduling"
                checked={enableScheduling}
                onCheckedChange={(checked) => setEnableScheduling(checked as boolean)}
              />
              <Label htmlFor="enable-scheduling" className="cursor-pointer">
                Naplánovat odeslání
              </Label>
            </div>

            {enableScheduling && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="scheduled-date">Datum</Label>
                    <Input
                      id="scheduled-date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduled-time">Čas</Label>
                    <Input
                      id="scheduled-time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>

                {selectedEventId !== "all" && (
                  <Alert>
                    <p className="text-sm">
                      Při odeslání budou zahrnuti všichni aktuální účastníci vybrané akce,
                      včetně těch, kteří se přihlásí později.
                    </p>
                  </Alert>
                )}
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Zrušit
          </Button>
          <Button onClick={handleSubmit}>
            Shrnutí
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
