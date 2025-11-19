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
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#37352f]">Kontakty</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#e9e9e7]">
        <button
          onClick={() => setActiveTab("parents")}
          className={`pb-2 text-sm font-medium transition-colors relative ${
            activeTab === "parents"
              ? "text-[#37352f]"
              : "text-[#73726e] hover:text-[#37352f]"
          }`}
        >
          Rodiče
          {activeTab === "parents" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("participants")}
          className={`pb-2 text-sm font-medium transition-colors relative ${
            activeTab === "participants"
              ? "text-[#37352f]"
              : "text-[#73726e] hover:text-[#37352f]"
          }`}
        >
          Účastníci
          {activeTab === "participants" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
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
