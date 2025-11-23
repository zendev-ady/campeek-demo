"use client"

import { BarChart3, DollarSign, Clock, Users } from "lucide-react"
import type { Registration, Event } from "@/lib/types"

interface StatsRowProps {
  registrations: Registration[]
  event: Event
}

export function StatsRow({ registrations, event }: StatsRowProps) {
  // Calculate statistics
  const confirmedRegs = registrations.filter((r) => r.status === "confirmed")
  const waitlistRegs = registrations.filter((r) => r.status === "waitlist")

  const capacity = event.capacity || Infinity
  const confirmed = confirmedRegs.length
  const occupancyText =
    capacity === Infinity ? `${confirmed} potvrzeno` : `${confirmed}/${capacity} obsazeno`

  const fullyPaid = confirmedRegs.filter((r) => r.amountPaid >= r.totalPrice).length
  const unpaid = confirmedRegs.filter((r) => r.amountPaid === 0).length
  const waitlist = waitlistRegs.length

  return (
    <div className="flex items-center gap-6 pb-4 text-sm text-muted-foreground">
      {/* Obsazenost */}
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
        <span className="font-semibold text-foreground">{confirmed}</span>
        <span>/</span>
        <span className="font-semibold text-foreground">
          {capacity === Infinity ? "∞" : capacity}
        </span>
        <span>obsazeno</span>
      </div>

      {/* Zaplaceno */}
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        <span className="font-semibold text-foreground">{fullyPaid}</span>
        <span>zaplaceno</span>
      </div>

      {/* Nezaplaceno */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-semibold text-foreground">{unpaid}</span>
        <span>nezaplaceno</span>
      </div>

      {/* Čekací listina */}
      {waitlist > 0 && (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">{waitlist}</span>
          <span>na čekací listině</span>
        </div>
      )}
    </div>
  )
}
