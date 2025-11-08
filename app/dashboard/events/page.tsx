"use client"

import { useEvents } from "@/lib/event-context"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Calendar } from "lucide-react"

export default function EventsPage() {
  const { events } = useEvents()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Akce a tábory</h1>
          <p className="text-muted-foreground mt-1">Spravujte všechny své akce na jednom místě</p>
        </div>
        <CreateEventDialog>
          <Button size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Nová akce
          </Button>
        </CreateEventDialog>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Zatím nemáte žádné akce</p>
            <CreateEventDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Vytvořit první akci
              </Button>
            </CreateEventDialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
