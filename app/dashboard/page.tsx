"use client"

import { useOrganization } from "@/lib/organization-context"
import { useEvents } from "@/lib/event-context"
import { CreateOrganizationDialog } from "@/components/create-organization-dialog"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  const { currentOrganization, organizations } = useOrganization()
  const { events } = useEvents()

  if (!currentOrganization && organizations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card variant="glass" className="max-w-md">
          <CardHeader>
            <CardTitle className="text-white">Vítejte!</CardTitle>
            <CardDescription className="text-white/70">Pro začátek vytvořte svou první organizaci</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateOrganizationDialog>
              <button className="btn btn-primary w-full">
                <Plus className="h-4 w-4" />
                Vytvořit organizaci
              </button>
            </CreateOrganizationDialog>
          </CardContent>
        </Card>
      </div>
    )
  }

  const now = new Date()
  const upcomingEvents = events.filter((event) => new Date(event.startDate) >= now)
  const upcomingWithinMonth = upcomingEvents.filter((event) => {
    const diffInDays = (new Date(event.startDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diffInDays <= 30
  })
  const nextEvent = [...upcomingEvents].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )[0]
  const totalCapacity = events.reduce((sum, event) => sum + (event.capacity || 0), 0)
  const averageCapacity = events.length ? Math.round(totalCapacity / events.length) : 0

  const recentEvents = events.slice(0, 6)

  const formatShortDate = (date: string) =>
    new Date(date).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Přehled</h1>
          <p className="text-white/60 mt-1">Vítejte zpět, zde je přehled vašich akcí</p>
        </div>
        <CreateEventDialog>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4" />
            Nová akce
          </button>
        </CreateEventDialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Celkem akcí</CardTitle>
            <Calendar className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{events.length}</div>
            <p className="text-xs text-white/60 mt-1">
              {nextEvent ? `Nejbližší start ${formatShortDate(nextEvent.startDate)}` : "Naplánujte první termín"}
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Nadcházející (30 dní)</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{upcomingWithinMonth.length}</div>
            <p className="text-xs text-white/60 mt-1">
              z {upcomingEvents.length} budoucích termínů
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Celková kapacita</CardTitle>
            <Users className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{totalCapacity}</div>
            <p className="text-xs text-white/60 mt-1">
              Průměrně {averageCapacity || 0} míst na akci
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Nedávné akce</h2>
          <Button variant="ghost" asChild className="text-white/70 hover:text-white hover:bg-white/5">
            <a href="/dashboard/events">Zobrazit vše</a>
          </Button>
        </div>

        {recentEvents.length === 0 ? (
          <Card variant="glass">
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-white/60 mb-4">Zatím nemáte žádné akce</p>
              <CreateEventDialog>
                <button className="btn btn-primary">
                  <Plus className="h-4 w-4" />
                  Vytvořit první akci
                </button>
              </CreateEventDialog>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
