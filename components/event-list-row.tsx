"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Event } from "@/lib/types"

interface EventListRowProps {
  event: Event
}

export function EventListRow({ event }: EventListRowProps) {
  const router = useRouter()

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })
    const endDate = new Date(end).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })
    return `${startDate} – ${endDate}`
  }

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase text-black tracking-wide">Název</p>
          <p className="text-lg font-semibold text-black truncate">{event.name}</p>
          {event.description && (
            <p className="text-sm text-black truncate">{event.description}</p>
          )}
        </div>

        <div className="flex gap-6 text-sm text-black">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-black" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 min-w-[140px]">
            <MapPin className="h-4 w-4 text-black" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-black" />
            <span>{event.capacity} míst</span>
          </div>
        </div>

        <Button variant="outline" onClick={() => router.push(`/events/${event.id}`)} className="ml-auto">
          Spravovat
          <ArrowUpRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
