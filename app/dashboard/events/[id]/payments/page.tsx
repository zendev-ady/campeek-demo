"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { EventModulePlaceholder } from "@/components/event-module-placeholder"
import { ArrowLeft, CreditCard } from "lucide-react"

export default function EventPaymentsPage({ params }: { params: Promise<{ id: string }> }) {
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
      <div className="flex min-h-[40vh] items-center justify-center text-white/60">
        Načítám sekci plateb...
      </div>
    )
  }

  return <EventPaymentsPageClient eventId={resolvedId} />
}

function EventPaymentsPageClient({ eventId }: { eventId: string }) {
  const { getEventById } = useEvents()
  const event = getEventById(eventId)

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <h2 className="text-3xl font-bold text-white">Akce nenalezena</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Platby · {event.name}</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Správa plateb</h1>
        </div>
        <Link href={`/dashboard/events/${event.id}`}>
          <button className="btn btn-secondary gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět na přehled akce
          </button>
        </Link>
      </div>

      <EventModulePlaceholder
        title="Platby"
        description="Podívejte se na stav plateb a finanční přehledy každé akce."
        message="Platební modul právě dokončujeme. Brzy zde uvidíte tok plateb a exporty pro účetnictví."
        Icon={CreditCard}
      />
    </div>
  )
}

