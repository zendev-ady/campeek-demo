"use client"

import { useState, useMemo } from "react"
import { Users } from "lucide-react"
import { NotionTable, NotionTableColumn } from "./notion-table"
import { FilterRow } from "./filter-row"
import type { Parent, Event, Registration } from "@/lib/types"

interface ParentsTabProps {
  parents: Parent[]
  events: Event[]
  registrations: Registration[]
  onParentClick: (parent: Parent) => void
}

export function ParentsTab({
  parents,
  events,
  registrations,
  onParentClick,
}: ParentsTabProps) {
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

  // Helper function to get last event for a parent
  const getLastEvent = (parent: Parent): string => {
    const parentRegistrations = registrations
      .filter((reg) => parent.registrations.includes(reg.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (parentRegistrations.length === 0) return "—"

    const lastReg = parentRegistrations[0]
    const event = events.find((e) => e.id === lastReg.eventId)
    return event?.name || "—"
  }

  // Filter parents
  const filteredParents = useMemo(() => {
    return parents.filter((parent) => {
      // Search filter
      const searchLower = searchValue.toLowerCase()
      const matchesSearch =
        !searchValue ||
        `${parent.name} ${parent.surname}`.toLowerCase().includes(searchLower) ||
        parent.email.toLowerCase().includes(searchLower) ||
        parent.phone.toLowerCase().includes(searchLower)

      // Event filter
      let matchesEvent = true
      if (selectedEvent !== "all") {
        const parentRegs = registrations.filter((reg) =>
          parent.registrations.includes(reg.id)
        )
        matchesEvent = parentRegs.some((reg) => reg.eventId === selectedEvent)
      }

      // Year filter
      let matchesYear = true
      if (selectedYear !== "all") {
        const parentRegs = registrations.filter((reg) =>
          parent.registrations.includes(reg.id)
        )
        matchesYear = parentRegs.some((reg) => {
          const event = events.find((e) => e.id === reg.eventId)
          if (!event) return false
          const eventYear = new Date(event.startDate).getFullYear().toString()
          return eventYear === selectedYear
        })
      }

      return matchesSearch && matchesEvent && matchesYear
    })
  }, [parents, searchValue, selectedEvent, selectedYear, registrations, events])

  const columns: NotionTableColumn<Parent>[] = [
    {
      key: "name",
      label: "Jméno",
      sortable: true,
      render: (parent) => `${parent.name} ${parent.surname}`,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (parent) => parent.email,
    },
    {
      key: "phone",
      label: "Telefon",
      render: (parent) => parent.phone,
    },
    {
      key: "children",
      label: "Děti",
      render: (parent) => parent.children.length,
    },
    {
      key: "lastEvent",
      label: "Poslední akce",
      render: (parent) => getLastEvent(parent),
    },
  ]

  // Empty state
  if (parents.length === 0) {
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

      {filteredParents.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Žádné výsledky</p>
        </div>
      ) : (
        <NotionTable
          columns={columns}
          data={filteredParents}
          onRowClick={onParentClick}
          getRowKey={(parent) => parent.id}
        />
      )}
    </div>
  )
}
