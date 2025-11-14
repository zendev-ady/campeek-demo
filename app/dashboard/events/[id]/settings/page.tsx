"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { EventSettingsShell } from "@/components/event-settings-shell"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/events" className="hover:text-foreground transition-colors">
          Akce
        </Link>
        <span>/</span>
        <Link href={`/dashboard/events/${event.id}`} className="hover:text-foreground transition-colors">
          {event.name}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Nastavení</span>
      </div>

      <EventSettingsShell />
    </div>
  )
}

