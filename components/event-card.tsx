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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl">{event.name}</CardTitle>
            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/dashboard/events/${event.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                Zobrazit detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplikovat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-black">
                <Trash2 className="h-4 w-4 mr-2" />
                Smazat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-black">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </div>
        <div className="flex items-center text-sm text-black">
          <MapPin className="h-4 w-4 mr-2" />
          {event.location}
        </div>
        <div className="flex items-center text-sm text-black">
          <Users className="h-4 w-4 mr-2" />
          Kapacita: {event.capacity} účastníků
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-lg font-bold">{event.price.toLocaleString("cs-CZ")} Kč</div>
        <Button onClick={() => router.push(`/dashboard/events/${event.id}`)}>Spravovat</Button>
      </CardFooter>
    </Card>
  )
}
