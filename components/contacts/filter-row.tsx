"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Hledat..."
          className="pl-9"
        />
      </div>

      {/* Event Select */}
      <Select value={selectedEvent} onValueChange={onEventChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Všechny akce" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Všechny akce</SelectItem>
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              {event.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Select */}
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Vše" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Vše</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
