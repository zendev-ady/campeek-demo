"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Message, MessageRecipient } from "./types"
import { useOrganization } from "./organization-context"
import { useAuth } from "./auth-context"

interface MessageContextType {
  messages: Message[]
  sendMessage: (
    subject: string,
    body: string,
    recipients: MessageRecipient[],
    eventId?: string,
  ) => Promise<Message>
  getMessageById: (id: string) => Message | undefined
  getMessagesByEvent: (eventId: string) => Message[]
  isLoading: boolean
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { currentOrganization } = useOrganization()
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentOrganization) {
      setMessages([])
      setIsLoading(false)
      return
    }

    // Load messages from localStorage
    const allMessages = JSON.parse(localStorage.getItem("messages") || "[]")
    const orgMessages = allMessages.filter(
      (msg: Message) => msg.organizationId === currentOrganization.id,
    )

    setMessages(orgMessages)
    setIsLoading(false)
  }, [currentOrganization])

  const sendMessage = async (
    subject: string,
    body: string,
    recipients: MessageRecipient[],
    eventId?: string,
  ): Promise<Message> => {
    if (!currentOrganization || !user) {
      throw new Error("Není vybrána organizace nebo uživatel není přihlášen")
    }

    // Mock sending - simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock delivery status - randomly simulate some failures for demo
    const processedRecipients = recipients.map((recipient) => {
      const isDelivered = Math.random() > 0.05 // 95% success rate
      return {
        ...recipient,
        status: isDelivered ? ("delivered" as const) : ("failed" as const),
        error: isDelivered ? undefined : "Neplatná emailová adresa",
        deliveredAt: isDelivered ? new Date().toISOString() : undefined,
      }
    })

    const newMessage: Message = {
      id: crypto.randomUUID(),
      organizationId: currentOrganization.id,
      eventId,
      subject,
      body,
      recipients: processedRecipients,
      sentAt: new Date().toISOString(),
      sentBy: user.id,
      type: "manual",
      status: "sent",
    }

    // Save to localStorage
    const allMessages = JSON.parse(localStorage.getItem("messages") || "[]")
    allMessages.push(newMessage)
    localStorage.setItem("messages", JSON.stringify(allMessages))

    // Update state
    setMessages([...messages, newMessage])

    return newMessage
  }

  const getMessageById = (id: string) => {
    return messages.find((msg) => msg.id === id)
  }

  const getMessagesByEvent = (eventId: string) => {
    return messages.filter((msg) => msg.eventId === eventId)
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        sendMessage,
        getMessageById,
        getMessagesByEvent,
        isLoading,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider")
  }
  return context
}
