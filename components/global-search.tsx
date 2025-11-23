"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useEvents } from "@/lib/event-context"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Calendar, Search } from "lucide-react"

export function GlobalSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { events } = useEvents()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Search results - now only searches events
  const searchResults = useMemo(() => {
    if (!search) return { events: [] }

    const query = search.toLowerCase()

    const filteredEvents = events.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query),
    )

    return {
      events: filteredEvents.slice(0, 5),
    }
  }, [search, events])

  const handleSelect = (type: "event", id: string) => {
    setOpen(false)
    setSearch("")

    if (type === "event") {
      router.push(`/events/${id}`)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-black"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Hledat...</span>
        <kbd className="hidden sm:inline pointer-events-none h-5 select-none items-center gap-1 border-2 border-black bg-white px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Hledat akce..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>Žádné výsledky nenalezeny.</CommandEmpty>

          {searchResults.events.length > 0 && (
            <CommandGroup heading="Akce">
              {searchResults.events.map((event) => (
                <CommandItem key={event.id} onSelect={() => handleSelect("event", event.id)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">{event.name}</div>
                    <div className="text-xs text-black">{event.location}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
