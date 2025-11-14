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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Nastavení · {event.name}</p>
          <h1 className="text-3xl font-bold tracking-tight">Konfigurace akce</h1>
          <p className="text-muted-foreground">Spravujte veškerá nastavení týkající se Vaší akce.</p>
        </div>
        <Link href={`/dashboard/events/${event.id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět na přehled akce
          </Button>
        </Link>
      </div>

      <EventSettingsShell />
    </div>
  )
}

