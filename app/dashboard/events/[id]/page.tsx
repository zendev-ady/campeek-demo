"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  CopyIcon,
  Trash2,
  Locate as Duplicate,
  EditIcon,
} from "lucide-react"
import Link from "next/link"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
        Načítám detail akce...
      </div>
    )
  }

  return <EventDetailPageClient eventId={resolvedId} />
}

function EventDetailPageClient({ eventId }: { eventId: string }) {
  const router = useRouter()
  const { getEventById, updateEvent, deleteEvent, duplicateEvent } = useEvents()

  const event = getEventById(eventId)
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: event?.name || "",
    description: event?.description || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    location: event?.location || "",
    capacity: event?.capacity.toString() || "",
    price: event?.price.toString() || "",
    ageMin: event?.ageMin?.toString() || "",
    ageMax: event?.ageMax?.toString() || "",
  })

  useEffect(() => {
    if (!event) return
    try {
      const stored = JSON.parse(localStorage.getItem("recentEvents") || "[]")
      const filtered = Array.isArray(stored) ? stored.filter((entry: any) => entry?.id !== event.id) : []
      const updated = [{ id: event.id, openedAt: new Date().toISOString() }, ...filtered].slice(0, 10)
      localStorage.setItem("recentEvents", JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to update recent events history:", error)
    }
  }, [event?.id])

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
        <Card variant="glass">
          <CardContent className="text-center py-12 text-white/60">
            Požadovaná akce nebyla nalezena.
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateEvent(event.id, {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        capacity: Number.parseInt(formData.capacity) || 0,
        price: Number.parseFloat(formData.price) || 0,
        ageMin: formData.ageMin ? Number.parseInt(formData.ageMin) : undefined,
        ageMax: formData.ageMax ? Number.parseInt(formData.ageMax) : undefined,
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Opravdu chcete smazat tuto akci?")) {
      try {
        await deleteEvent(event.id)
        router.push("/dashboard")
      } catch (error) {
        console.error("Failed to delete event:", error)
      }
    }
  }

  const handleDuplicate = async () => {
    try {
      await duplicateEvent(event.id)
      router.refresh()
    } catch (error) {
      console.error("Failed to duplicate event:", error)
    }
  }

  const registrationUrl =
    typeof window !== "undefined" ? `${window.location.origin}/register/${event.id}` : `/register/${event.id}`

  const copyRegistrationLink = () => {
    navigator.clipboard.writeText(registrationUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const mockRegistrations = 24
  const capacity = Number.parseInt(formData.capacity) || 100
  const occupancyPercent = Math.round((mockRegistrations / capacity) * 100)
  const paidAmount = mockRegistrations * 3500 // assuming 3500 per registration
  const totalAmount = mockRegistrations * Number.parseInt(formData.price || "0")
  const paidPercent = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">{event.name}</h1>
            <p className="text-white/60">
              {new Date(event.startDate).toLocaleDateString("cs-CZ")} -{" "}
              {new Date(event.endDate).toLocaleDateString("cs-CZ")}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleDuplicate} className="btn btn-secondary text-sm">
              <Duplicate className="h-4 w-4" />
              Duplikovat
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-secondary text-sm"
            >
              <EditIcon className="h-4 w-4" />
              {isEditing ? "Zrušit" : "Upravit"}
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline text-sm text-red-400 border-red-400/30 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
              Smazat
            </button>
          </div>
        </div>

      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-white">Informace o akci</CardTitle>
              <CardDescription className="text-white/70">Základní údaje o vaší akci nebo táboře</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name" className="text-white">Název akce *</Label>
                  <Input
                    id="name"
                    variant="glass"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description" className="text-white">Popis</Label>
                  <Textarea
                    id="description"
                    variant="glass"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-white">Datum začátku *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    variant="glass"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-white">Datum konce *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    variant="glass"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="location" className="text-white">Místo konání *</Label>
                  <Input
                    id="location"
                    variant="glass"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-white">Kapacita *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    variant="glass"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-white">Cena (Kč) *</Label>
                  <Input
                    id="price"
                    type="number"
                    variant="glass"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageMin" className="text-white">Minimální věk</Label>
                  <Input
                    id="ageMin"
                    type="number"
                    variant="glass"
                    min="0"
                    value={formData.ageMin}
                    onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageMax" className="text-white">Maximální věk</Label>
                  <Input
                    id="ageMax"
                    type="number"
                    variant="glass"
                    min="0"
                    value={formData.ageMax}
                    onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                  />
                </div>

              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" disabled={isLoading} className="btn btn-primary">
                  {isLoading ? "Ukládání..." : "Uložit změny"}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
                  Zrušit
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Metrics Tiles */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Occupancy Tile */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white">Naplnění tábora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold gradient-text">{mockRegistrations}</span>
                    <span className="text-white/70">z {capacity} míst</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                  <p className="text-sm text-emerald-400 font-medium">{occupancyPercent}% naplnění</p>
                </div>
              </CardContent>
            </Card>

            {/* Financial Tile */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white">Finanční přehled</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold gradient-text">{paidAmount.toLocaleString()} Kč</span>
                    <span className="text-white/70">z {totalAmount.toLocaleString()} Kč</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${paidPercent}%` }}
                    />
                  </div>
                  <p className="text-sm text-emerald-400 font-medium">{paidPercent}% zaplaceno</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Basic Info Card */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-white">Základní informace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-white/60">Název akce</p>
                  <p className="text-lg font-semibold text-white">{event.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Termín (od–do)</p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(event.startDate).toLocaleDateString("cs-CZ")} -{" "}
                    {new Date(event.endDate).toLocaleDateString("cs-CZ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Místo konání</p>
                  <p className="text-lg font-semibold text-white">{event.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Cena za účastníka</p>
                  <p className="text-lg font-semibold text-white">{event.price} Kč</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Kapacita</p>
                  <p className="text-lg font-semibold text-white">{event.capacity} míst</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Věkové kategorie</p>
                  <p className="text-lg font-semibold text-white">
                    {event.ageMin || "bez limitu"} - {event.ageMax || "bez limitu"} let
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Link Alert */}
          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium mb-1 text-white">Registrační odkaz</p>
                  <p className="text-sm text-white/60 break-all">{registrationUrl}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={copyRegistrationLink} className="btn btn-secondary text-sm">
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    {copied ? "Zkopírováno" : "Kopírovat"}
                  </button>
                  <Link href={registrationUrl} target="_blank">
                    <button className="btn btn-secondary text-sm">
                      <ExternalLink className="h-4 w-4" />
                      Otevřít
                    </button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          {event.description && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white">Popis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">{event.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
