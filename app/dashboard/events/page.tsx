"use client"

import { useEffect, useMemo, useState } from "react"
import { useEvents } from "@/lib/event-context"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { EventCard } from "@/components/event-card"
import { EventListRow } from "@/components/event-list-row"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { ViewToggle, type CollectionViewMode } from "@/components/view-toggle"

type ViewMode = "recent" | "past" | "upcoming" | "all"

const VIEW_OPTIONS: { value: ViewMode; label: string }[] = [
  { value: "all", label: "Všechny akce" },
  { value: "recent", label: "Nedávno otevřené" },
  { value: "past", label: "Minulé akce" },
  { value: "upcoming", label: "Nadcházející akce" },
]

const EMPTY_STATE_COPY: Record<ViewMode, { title: string; description: string }> = {
  recent: {
    title: "Zatím jste žádnou akci neotevřeli",
    description: "Jakmile si prohlédnete detail akce, zobrazí se zde pro rychlý návrat.",
  },
  past: {
    title: "Žádné akce se zvolenými filtry",
    description: "Vyberte jiné období nebo rok a zkuste to znovu.",
  },
  upcoming: {
    title: "Nemáte žádné nadcházející akce",
    description: "Naplánujte novou akci, ať máte kalendář plný.",
  },
  all: {
    title: "Zatím nemáte žádné akce",
    description: "Začněte vytvořením první akce a spravujte ji na jednom místě.",
  },
}

export default function EventsPage() {
  const { events } = useEvents()
  const [viewMode, setViewMode] = useState<ViewMode>("upcoming")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [recentEventIds, setRecentEventIds] = useState<string[]>([])
  const [collectionView, setCollectionView] = useState<CollectionViewMode>("grid")

  useEffect(() => {
    const readRecentEvents = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("recentEvents") || "[]")
        if (Array.isArray(stored)) {
          setRecentEventIds(
            stored
              .map((entry) => (typeof entry?.id === "string" ? entry.id : null))
              .filter((id): id is string => Boolean(id)),
          )
        }
      } catch (error) {
        console.error("Failed to read recent events from storage:", error)
      }
    }

    readRecentEvents()
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "recentEvents") {
        readRecentEvents()
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const availableYears = useMemo(() => {
    const years = new Set<string>()
    events.forEach((event) => {
      if (!event.startDate) return
      years.add(new Date(event.startDate).getFullYear().toString())
    })
    return Array.from(years).sort((a, b) => Number(b) - Number(a))
  }, [events])

  const eventsByYear = useMemo(() => {
    if (selectedYear === "all") return events
    return events.filter((event) => {
      const year = new Date(event.startDate).getFullYear().toString()
      return year === selectedYear
    })
  }, [events, selectedYear])

  const eventsById = useMemo(
    () =>
      new Map(
        eventsByYear.map((event) => [
          event.id,
          event,
        ]),
      ),
    [eventsByYear],
  )

  const filteredEvents = useMemo(() => {
    const now = new Date()
    const sortAsc = (list: typeof events) =>
      [...list].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    const sortDesc = (list: typeof events) =>
      [...list].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

    switch (viewMode) {
      case "recent": {
        const recent = recentEventIds
          .map((id) => eventsById.get(id))
          .filter((event): event is NonNullable<typeof event> => Boolean(event))
        return recent
      }
      case "past":
        return sortDesc(eventsByYear.filter((event) => new Date(event.endDate) < now))
      case "upcoming":
        return sortAsc(eventsByYear.filter((event) => new Date(event.startDate) >= now))
      default:
        return sortDesc(eventsByYear)
    }
  }, [eventsByYear, viewMode, recentEventIds, eventsById])

  const yearOptions = ["all", ...availableYears]
  const hasEvents = filteredEvents.length > 0
  const emptyCopy = EMPTY_STATE_COPY[viewMode]

  useEffect(() => {
    if (selectedYear !== "all" && !availableYears.includes(selectedYear)) {
      setSelectedYear("all")
    }
  }, [availableYears, selectedYear])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Akce a tábory</h1>
          <p className="text-black mt-1">Spravujte všechny své akce na jednom místě</p>
        </div>
        <CreateEventDialog>
          <Button size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Nová akce
          </Button>
        </CreateEventDialog>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setViewMode(option.value)}
              className={cn(
                "border-2 px-4 py-1.5 text-sm",
                viewMode === option.value
                  ? "border-black bg-black text-white"
                  : "border-black bg-white text-black",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {yearOptions.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                "border-2 px-4 py-1.5 text-sm",
                selectedYear === year
                  ? "border-black bg-black text-white"
                  : "border-black bg-white text-black",
              )}
            >
              {year === "all" ? "Vše" : year}
            </button>
          ))}
        </div>
        <ViewToggle mode={collectionView} onChange={setCollectionView} />
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-black mx-auto mb-4" />
            <p className="text-black mb-4">Zatím nemáte žádné akce</p>
            <CreateEventDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Vytvořit první akci
              </Button>
            </CreateEventDialog>
          </CardContent>
        </Card>
      ) : hasEvents ? (
        collectionView === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventListRow key={event.id} event={event} />
            ))}
          </div>
        )
      ) : (
        <Card>
          <CardContent className="text-center py-12 space-y-4">
            <Calendar className="h-12 w-12 text-black mx-auto" />
            <div className="space-y-2">
              <p className="text-lg font-semibold">{emptyCopy.title}</p>
              <p className="text-black">{emptyCopy.description}</p>
            </div>
            <CreateEventDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Vytvořit novou akci
              </Button>
            </CreateEventDialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
