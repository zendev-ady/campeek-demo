"use client"

import { useEffect, useState } from "react"
import { useOrganization } from "@/lib/organization-context"
import type { Message, MessageRecipient } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Mail } from "lucide-react"
import { ViewToggle, type CollectionViewMode } from "@/components/view-toggle"
import { MessageCard } from "@/components/message-card"
import { MessageListRow } from "@/components/message-list-row"
import { NewMessageDialog } from "@/components/new-message-dialog"
import { MessageDetailSidebar } from "@/components/message-detail-sidebar"

export default function CommunicationPage() {
  const { currentOrganization } = useOrganization()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageRecipients, setMessageRecipients] = useState<MessageRecipient[]>([])
  const [collectionView, setCollectionView] = useState<CollectionViewMode>("grid")
  const [newMessageOpen, setNewMessageOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    loadMessages()
    loadRecipients()
  }, [currentOrganization])

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem("messages")
      if (stored) {
        const allMessages = JSON.parse(stored) as Message[]
        // Filter by current organization
        const orgMessages = currentOrganization
          ? allMessages.filter((m) => m.organizationId === currentOrganization.id)
          : []
        // Sort by date (newest first)
        orgMessages.sort((a, b) => {
          const dateA = new Date(a.sentAt || a.scheduledAt || a.createdAt).getTime()
          const dateB = new Date(b.sentAt || b.scheduledAt || b.createdAt).getTime()
          return dateB - dateA
        })
        setMessages(orgMessages)
      }
    } catch (error) {
      console.error("Failed to load messages:", error)
    }
  }

  const loadRecipients = () => {
    try {
      const stored = localStorage.getItem("messageRecipients")
      if (stored) {
        setMessageRecipients(JSON.parse(stored) as MessageRecipient[])
      }
    } catch (error) {
      console.error("Failed to load recipients:", error)
    }
  }

  const getRecipientsForMessage = (messageId: string) => {
    return messageRecipients.filter((r) => r.messageId === messageId)
  }

  const handleDetail = (message: Message) => {
    setSelectedMessage(message)
  }

  const handleResend = (message: Message) => {
    setNewMessageOpen(true)
    // In a real implementation, we would pass prefillData to the dialog
    // For now, the NewMessageDialog would need to be updated to accept this
  }

  const handleEdit = (message: Message) => {
    setSelectedMessage(null)
    setNewMessageOpen(true)
    // Same as handleResend - would pass the message as prefillData
  }

  const handleCancel = (message: Message) => {
    if (confirm("Opravdu chcete zrušit tuto naplánovanou zprávu?")) {
      const updatedMessages = messages.map((m) =>
        m.id === message.id
          ? {
              ...m,
              status: "cancelled" as const,
              cancelledAt: new Date().toISOString(),
            }
          : m
      )
      setMessages(updatedMessages)
      localStorage.setItem("messages", JSON.stringify(updatedMessages))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Komunikace</h1>
          <p className="text-black mt-1">Komunikace s účastníky a rodiči</p>
        </div>
        <Button size="lg" onClick={() => setNewMessageOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nová zpráva
        </Button>
      </div>

      {/* View Toggle */}
      {messages.length > 0 && (
        <div className="flex justify-end">
          <ViewToggle mode={collectionView} onChange={setCollectionView} />
        </div>
      )}

      {/* Messages List */}
      {messages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-black mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Zatím jste neodeslali žádnou zprávu</p>
            <p className="text-black mb-4">
              Začněte komunikovat s rodiči a účastníky vytvoření první zprávy
            </p>
            <Button onClick={() => setNewMessageOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Vytvořit první zprávu
            </Button>
          </CardContent>
        </Card>
      ) : collectionView === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              recipients={getRecipientsForMessage(message.id)}
              onDetail={handleDetail}
              onResend={handleResend}
              onCancel={message.status === "scheduled" ? handleCancel : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Table Header */}
          <div className="border-2 border-black bg-black text-white p-4 flex items-center gap-4 font-semibold text-sm">
            <div className="flex-1">Předmět</div>
            <div className="w-32">Stav</div>
            <div className="w-40">Datum odeslání</div>
            <div className="w-24 text-center">Příjemci</div>
            <div className="w-24 text-center">Úspěšnost</div>
            <div className="w-32"></div>
          </div>
          {/* Table Rows */}
          {messages.map((message) => (
            <MessageListRow
              key={message.id}
              message={message}
              recipients={getRecipientsForMessage(message.id)}
              onDetail={handleDetail}
              onResend={handleResend}
              onCancel={message.status === "scheduled" ? handleCancel : undefined}
            />
          ))}
        </div>
      )}

      {/* New Message Dialog */}
      <NewMessageDialog open={newMessageOpen} onOpenChange={setNewMessageOpen} />

      {/* Message Detail Sidebar */}
      {selectedMessage && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSelectedMessage(null)}
          />
          <MessageDetailSidebar
            message={selectedMessage}
            recipients={getRecipientsForMessage(selectedMessage.id)}
            onClose={() => setSelectedMessage(null)}
            onCancel={selectedMessage.status === "scheduled" ? handleCancel : undefined}
            onEdit={selectedMessage.status === "scheduled" ? handleEdit : undefined}
          />
        </>
      )}
    </div>
  )
}
