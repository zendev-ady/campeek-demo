"use client"

import { Search, ChevronDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterRowProps {
  searchValue: string
  onSearchChange: (value: string) => void
  selectedEvent: string
  onEventChange: (eventId: string) => void
  events: Array<{ id: string; name: string }>
  selectedYear: string
  onYearChange: (year: string) => void
  years: string[]
}

export function FilterRow({
  searchValue,
  onSearchChange,
  selectedEvent,
  onEventChange,
  events,
  selectedYear,
  onYearChange,
  years,
}: FilterRowProps) {
  const selectedEventName =
    events.find((e) => e.id === selectedEvent)?.name || "Všechny akce"
  const selectedYearLabel = selectedYear === "all" ? "Vše" : selectedYear

  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9b9a97]" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Hledat..."
          className="pl-10 pr-4 py-2 w-[280px] rounded-md border border-[#e9e9e7] text-sm text-[#37352f] placeholder:text-[#9b9a97] focus:outline-none focus:border-[#2383e2] focus:ring-2 focus:ring-[#2383e21a] transition-colors"
        />
      </div>

      {/* Event Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-[#37352f] hover:bg-[#f7f6f5] px-3 py-2 rounded-md border border-transparent hover:border-[#e9e9e7] transition-colors">
          {selectedEventName}
          <ChevronDown className="h-4 w-4 text-[#9b9a97]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem onClick={() => onEventChange("all")}>
            <div className="flex items-center justify-between w-full">
              <span>Všechny akce</span>
              {selectedEvent === "all" && (
                <Check className="h-4 w-4 text-[#2383e2]" />
              )}
            </div>
          </DropdownMenuItem>
          {events.map((event) => (
            <DropdownMenuItem
              key={event.id}
              onClick={() => onEventChange(event.id)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{event.name}</span>
                {selectedEvent === event.id && (
                  <Check className="h-4 w-4 text-[#2383e2]" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Year Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-[#37352f] hover:bg-[#f7f6f5] px-3 py-2 rounded-md border border-transparent hover:border-[#e9e9e7] transition-colors">
          {selectedYearLabel}
          <ChevronDown className="h-4 w-4 text-[#9b9a97]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[120px]">
          <DropdownMenuItem onClick={() => onYearChange("all")}>
            <div className="flex items-center justify-between w-full">
              <span>Vše</span>
              {selectedYear === "all" && (
                <Check className="h-4 w-4 text-[#2383e2]" />
              )}
            </div>
          </DropdownMenuItem>
          {years.map((year) => (
            <DropdownMenuItem key={year} onClick={() => onYearChange(year)}>
              <div className="flex items-center justify-between w-full">
                <span>{year}</span>
                {selectedYear === year && (
                  <Check className="h-4 w-4 text-[#2383e2]" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
