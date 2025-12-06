"use client"

import { useOrganization } from "@/lib/organization-context"
import { useEvents } from "@/lib/event-context"
import { CreateOrganizationDialog } from "@/components/create-organization-dialog"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { currentOrganization, organizations } = useOrganization()
  const { events } = useEvents()

  if (!currentOrganization && organizations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md glass-card rounded-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Vítejte!</CardTitle>
            <CardDescription className="text-base">Pro začátek vytvořte svou první organizaci</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateOrganizationDialog>
              <Button className="w-full btn-primary rounded-xl h-11 text-base">
                <Plus className="h-4 w-4 mr-2" />
                Vytvořit organizaci
              </Button>
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Přehled</h1>
          <p className="text-muted-foreground mt-1">Vítejte zpět, zde je přehled vašich akcí</p>
        </div>
        <CreateEventDialog>
          <Button size="lg" className="btn-primary rounded-xl">
            <Plus className="h-4 w-4 mr-2" />
            Nová akce
          </Button>
        </CreateEventDialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card rounded-2xl hover:scale-[1.02] transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Celkem akcí</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{events.length}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {nextEvent ? `Nejbližší start ${formatShortDate(nextEvent.startDate)}` : "Naplánujte první termín"}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl hover:scale-[1.02] transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nadcházející (30 dní)</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{upcomingWithinMonth.length}</div>
            <p className="text-sm text-muted-foreground mt-2">
              z {upcomingEvents.length} budoucích termínů
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl hover:scale-[1.02] transition-transform">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Celková kapacita</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{totalCapacity}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Průměrně {averageCapacity || 0} míst na akci
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Nedávné akce</h2>
          <Link href="/akce">
            <Button variant="ghost" className="text-primary hover:text-primary/80 gap-2">
              Zobrazit vše
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <Card className="glass-card rounded-2xl">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Zatím nemáte žádné akce</h3>
              <p className="text-muted-foreground mb-6">Vytvořte svou první akci a začněte organizovat</p>
              <CreateEventDialog>
                <Button className="btn-primary rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Vytvořit první akci
                </Button>
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
