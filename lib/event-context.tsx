"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Event } from "./types"
import { useAuth } from "./auth-context"
import { useOrganization } from "./organization-context"
import { generateEventSlug } from "./slugify"

interface EventContextType {
  events: Event[]
  createEvent: (event: Omit<Event, "id" | "slug" | "createdAt" | "updatedAt" | "createdBy" | "organizationId">) => Promise<Event>
  updateEvent: (id: string, updates: Partial<Event>) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  duplicateEvent: (id: string) => Promise<Event>
  getEventById: (id: string) => Event | undefined
  getEventBySlug: (slug: string) => Event | undefined
  getRegistrationsByEventId: (eventId: string) => any[]
  isLoading: boolean
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export function EventProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { currentOrganization } = useOrganization()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentOrganization) {
      setEvents([])
      setIsLoading(false)
      return
    }

    // Load events from localStorage
    const allEvents = JSON.parse(localStorage.getItem("events") || "[]")
    const orgEvents = allEvents.filter((event: Event) => event.organizationId === currentOrganization.id)
    setEvents(orgEvents)
    setIsLoading(false)
  }, [currentOrganization])

  const createEvent = async (
    eventData: Omit<Event, "id" | "slug" | "createdAt" | "updatedAt" | "createdBy" | "organizationId">,
  ): Promise<Event> => {
    if (!user || !currentOrganization) throw new Error("Musíte být přihlášeni")

    await new Promise((resolve) => setTimeout(resolve, 300))

    // Get existing slugs for uniqueness check
    const allEvents = JSON.parse(localStorage.getItem("events") || "[]")
    const existingSlugs = allEvents.map((e: Event) => e.slug).filter(Boolean)

    // Generate unique slug from event name
    const slug = generateEventSlug(eventData.name, existingSlugs)

    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      slug,
      organizationId: currentOrganization.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id,
    }

    allEvents.push(newEvent)
    localStorage.setItem("events", JSON.stringify(allEvents))

    setEvents([...events, newEvent])
    return newEvent
  }

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const allEvents = JSON.parse(localStorage.getItem("events") || "[]")
    const index = allEvents.findIndex((e: Event) => e.id === id)

    if (index === -1) throw new Error("Akce nenalezena")

    allEvents[index] = {
      ...allEvents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem("events", JSON.stringify(allEvents))
    setEvents(events.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e)))
  }

  const deleteEvent = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const allEvents = JSON.parse(localStorage.getItem("events") || "[]")
    const filtered = allEvents.filter((e: Event) => e.id !== id)

    localStorage.setItem("events", JSON.stringify(filtered))
    setEvents(events.filter((e) => e.id !== id))
  }

  const duplicateEvent = async (id: string): Promise<Event> => {
    const eventToDuplicate = events.find((e) => e.id === id)
    if (!eventToDuplicate) throw new Error("Akce nenalezena")

    const {
      id: _id,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      createdBy: _createdBy,
      organizationId: _organizationId,
      ...eventFields
    } = eventToDuplicate

    const duplicated = await createEvent({
      ...eventFields,
      name: `${eventToDuplicate.name} (kopie)`,
    })

    return duplicated
  }

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id)
  }

  const getEventBySlug = (slug: string) => {
    return events.find((e) => e.slug === slug)
  }

  const getRegistrationsByEventId = (eventId: string) => {
    const allRegistrations = JSON.parse(localStorage.getItem("registrations") || "[]")
    return allRegistrations.filter((reg: any) => reg.eventId === eventId)
  }

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        updateEvent,
        deleteEvent,
        duplicateEvent,
        getEventById,
        getEventBySlug,
        getRegistrationsByEventId,
        isLoading,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}
