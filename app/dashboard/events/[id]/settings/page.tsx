"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { EventSettingsShell } from "@/components/event-settings-shell"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function EventSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedId, setResolvedId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    params.then(({ id }) => {
      if (isMounted) setResolvedId(id)
    })
    return () => {
      isMounted = false
    }
  }, [params])

  if (!resolvedId) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
        Načítám nastavení akce...
      </div>
    )
  }

  return <EventSettingsPageClient eventId={resolvedId} />
}

function EventSettingsPageClient({ eventId }: { eventId: string }) {
  const { getEventById } = useEvents()
  const event = getEventById(eventId)

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold">Akce nenalezena</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="space-y-3">
        {/* Back Button + Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/events/${event.id}`}>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/dashboard/events" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Akce
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href={`/dashboard/events/${event.id}`} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {event.name}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-semibold">Nastavení</span>
          </div>
        </div>
      </div>

      <EventSettingsShell />
    </div>
  )
}

