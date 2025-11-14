"use client"

import type { Event } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, MapPin, Users, MoreVertical, Copy, Trash2, Eye } from "lucide-react"
import { useEvents } from "@/lib/event-context"
import { useRouter } from "next/navigation"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const { deleteEvent, duplicateEvent } = useEvents()
  const router = useRouter()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const handleDuplicate = async () => {
    await duplicateEvent(event.id)
  }

  const handleDelete = async () => {
    if (confirm("Opravdu chcete smazat tuto akci?")) {
      await deleteEvent(event.id)
    }
  }

  return (
    <Card variant="glass" className="hover:scale-[1.02] transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl text-white">{event.name}</CardTitle>
            <CardDescription className="line-clamp-2 text-white/70">{event.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2 text-white/60 hover:text-white hover:bg-white/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-white/10">
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/events/${event.id}`)}
                className="text-white/80 focus:bg-white/10 focus:text-white cursor-pointer"
              >
                <Eye className="h-4 w-4 mr-2 text-emerald-400" />
                Zobrazit detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDuplicate}
                className="text-white/80 focus:bg-white/10 focus:text-white cursor-pointer"
              >
                <Copy className="h-4 w-4 mr-2 text-emerald-400" />
                Duplikovat
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Smazat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-white/70">
          <Calendar className="h-4 w-4 mr-2 text-emerald-400" />
          {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </div>
        <div className="flex items-center text-sm text-white/70">
          <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
          {event.location}
        </div>
        <div className="flex items-center text-sm text-white/70">
          <Users className="h-4 w-4 mr-2 text-emerald-400" />
          Kapacita: {event.capacity} účastníků
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-lg font-bold gradient-text">{event.price.toLocaleString("cs-CZ")} Kč</div>
        <button onClick={() => router.push(`/dashboard/events/${event.id}`)} className="btn btn-secondary">
          Spravovat
        </button>
      </CardFooter>
    </Card>
  )
}
