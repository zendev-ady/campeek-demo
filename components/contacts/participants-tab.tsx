"use client"

import { useState, useMemo } from "react"
import { Users } from "lucide-react"
import { NotionTable, NotionTableColumn } from "./notion-table"
import { FilterRow } from "./filter-row"
import type { Participant, Parent, Event, Registration } from "@/lib/types"

interface ParticipantsTabProps {
  participants: Participant[]
  parents: Parent[]
  events: Event[]
  registrations: Registration[]
  onParticipantClick: (participant: Participant) => void
}

export function ParticipantsTab({
  participants,
  parents,
  events,
  registrations,
  onParticipantClick,
}: ParticipantsTabProps) {
  const [searchValue, setSearchValue] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  // Get unique years from events
  const years = useMemo(() => {
    const yearSet = new Set<string>()
    events.forEach((event) => {
      const year = new Date(event.startDate).getFullYear().toString()
      yearSet.add(year)
    })
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a))
  }, [events])

  // Helper function to calculate age
  const getAge = (birthDate: string): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  // Helper function to get parent names
  const getParentNames = (participant: Participant): string => {
    const participantParents = parents.filter((parent) =>
      participant.parents.includes(parent.id)
    )
    if (participantParents.length === 0) return "—"

    const names = participantParents.map((p) => `${p.name} ${p.surname}`)
    if (names.length > 1 && names.join(", ").length > 30) {
      return `${names[0]}, ...`
    }
    return names.join(", ")
  }

  // Helper function to get allergies display
  const getAllergiesDisplay = (participant: Participant): string => {
    const allergies = participant.healthInfo.allergies.trim()
    if (!allergies) return "—"
    if (allergies.length > 30) {
      return allergies.substring(0, 30) + "..."
    }
    return allergies
  }

  // Helper function to get last event
  const getLastEvent = (participant: Participant): string => {
    const participantRegs = registrations
      .filter((reg) => participant.registrations.includes(reg.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (participantRegs.length === 0) return "—"

    const lastReg = participantRegs[0]
    const event = events.find((e) => e.id === lastReg.eventId)
    return event?.name || "—"
  }

  // Filter participants
  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      // Search filter
      const searchLower = searchValue.toLowerCase()
      const matchesSearch =
        !searchValue ||
        `${participant.name} ${participant.surname}`.toLowerCase().includes(searchLower) ||
        getParentNames(participant).toLowerCase().includes(searchLower)

      // Event filter
      let matchesEvent = true
      if (selectedEvent !== "all") {
        const participantRegs = registrations.filter((reg) =>
          participant.registrations.includes(reg.id)
        )
        matchesEvent = participantRegs.some((reg) => reg.eventId === selectedEvent)
      }

      // Year filter
      let matchesYear = true
      if (selectedYear !== "all") {
        const participantRegs = registrations.filter((reg) =>
          participant.registrations.includes(reg.id)
        )
        matchesYear = participantRegs.some((reg) => {
          const event = events.find((e) => e.id === reg.eventId)
          if (!event) return false
          const eventYear = new Date(event.startDate).getFullYear().toString()
          return eventYear === selectedYear
        })
      }

      return matchesSearch && matchesEvent && matchesYear
    })
  }, [participants, searchValue, selectedEvent, selectedYear, registrations, events, parents])

  const columns: NotionTableColumn<Participant>[] = [
    {
      key: "name",
      label: "Jméno",
      sortable: true,
      render: (participant) => `${participant.name} ${participant.surname}`,
    },
    {
      key: "age",
      label: "Věk",
      sortable: true,
      render: (participant) => getAge(participant.birthDate),
    },
    {
      key: "parents",
      label: "Rodiče",
      render: (participant) => getParentNames(participant),
    },
    {
      key: "allergies",
      label: "Alergie",
      render: (participant) => getAllergiesDisplay(participant),
    },
    {
      key: "lastEvent",
      label: "Poslední akce",
      render: (participant) => getLastEvent(participant),
    },
  ]

  // Empty state
  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-base font-medium mb-1">
          Zatím nemáte žádné kontakty
        </h3>
        <p className="text-sm text-muted-foreground">
          Kontakty se vytvoří automaticky z přihlášek
        </p>
      </div>
    )
  }

  return (
    <div>
      <FilterRow
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedEvent={selectedEvent}
        onEventChange={setSelectedEvent}
        events={events}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        years={years}
      />

      {filteredParticipants.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Žádné výsledky</p>
        </div>
      ) : (
        <NotionTable
          columns={columns}
          data={filteredParticipants}
          onRowClick={onParticipantClick}
          getRowKey={(participant) => participant.id}
        />
      )}
    </div>
  )
}
