"use client"

import { useState, useEffect } from "react"
import { ParentsTab } from "@/components/contacts/parents-tab"
import { ParticipantsTab } from "@/components/contacts/participants-tab"
import { ParentDetailSidebar } from "@/components/contacts/parent-detail-sidebar"
import { ParticipantDetailSidebar } from "@/components/contacts/participant-detail-sidebar"
import type { Parent, Participant, Event, Registration } from "@/lib/types"

type TabType = "parents" | "participants"

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("parents")
  const [parents, setParents] = useState<Parent[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null)
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null)

  // Load data from localStorage
  useEffect(() => {
    const loadedParents = JSON.parse(
      localStorage.getItem("parents") || "[]"
    ) as Parent[]
    const loadedParticipants = JSON.parse(
      localStorage.getItem("participants") || "[]"
    ) as Participant[]
    const loadedEvents = JSON.parse(
      localStorage.getItem("events") || "[]"
    ) as Event[]
    const loadedRegistrations = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    ) as Registration[]

    setParents(loadedParents)
    setParticipants(loadedParticipants)
    setEvents(loadedEvents)
    setRegistrations(loadedRegistrations)
  }, [])

  // Update parent note
  const handleUpdateParentNote = (parentId: string, note: string) => {
    const updatedParents = parents.map((parent) =>
      parent.id === parentId ? { ...parent, internalNote: note } : parent
    )
    setParents(updatedParents)
    localStorage.setItem("parents", JSON.stringify(updatedParents))
  }

  // Update participant note
  const handleUpdateParticipantNote = (participantId: string, note: string) => {
    const updatedParticipants = participants.map((participant) =>
      participant.id === participantId
        ? { ...participant, internalNote: note }
        : participant
    )
    setParticipants(updatedParticipants)
    localStorage.setItem("participants", JSON.stringify(updatedParticipants))
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kontakty</h1>
        <p className="text-muted-foreground mt-1">Spravujte rodiče a účastníky na jednom místě</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab("parents")}
          className={`border-2 px-4 py-1.5 text-sm ${
            activeTab === "parents"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black"
          }`}
        >
          Rodiče
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`border-2 px-4 py-1.5 text-sm ${
            activeTab === "participants"
              ? "border-black bg-black text-white"
              : "border-black bg-white text-black"
          }`}
        >
          Účastníci
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "parents" ? (
          <ParentsTab
            parents={parents}
            events={events}
            registrations={registrations}
            onParentClick={setSelectedParent}
          />
        ) : (
          <ParticipantsTab
            participants={participants}
            parents={parents}
            events={events}
            registrations={registrations}
            onParticipantClick={setSelectedParticipant}
          />
        )}
      </div>

      {/* Sidebars */}
      <ParentDetailSidebar
        parent={selectedParent}
        participants={participants}
        events={events}
        registrations={registrations}
        onClose={() => setSelectedParent(null)}
        onUpdateNote={handleUpdateParentNote}
      />

      <ParticipantDetailSidebar
        participant={selectedParticipant}
        parents={parents}
        events={events}
        registrations={registrations}
        onClose={() => setSelectedParticipant(null)}
        onUpdateNote={handleUpdateParticipantNote}
      />
    </div>
  )
}
