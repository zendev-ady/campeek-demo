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
      <div className="flex min-h-[40vh] items-center justify-center text-black">
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
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold">Akce nenalezena</h2>
        </div>
        <Card>
          <CardContent className="text-center py-12 text-black">
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
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
            <p className="text-black">
              {new Date(event.startDate).toLocaleDateString("cs-CZ")} -{" "}
              {new Date(event.endDate).toLocaleDateString("cs-CZ")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDuplicate} className="gap-2 bg-transparent">
              <Duplicate className="h-4 w-4" />
              Duplikovat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              <EditIcon className="h-4 w-4" />
              {isEditing ? "Zrušit" : "Upravit"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-black bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              Smazat
            </Button>
          </div>
        </div>

      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informace o akci</CardTitle>
              <CardDescription>Základní údaje o vaší akci nebo táboře</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name">Název akce *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Popis</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Datum začátku *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Datum konce *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="location">Místo konání *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Kapacita *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Cena (Kč) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageMin">Minimální věk</Label>
                  <Input
                    id="ageMin"
                    type="number"
                    min="0"
                    value={formData.ageMin}
                    onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageMax">Maximální věk</Label>
                  <Input
                    id="ageMax"
                    type="number"
                    min="0"
                    value={formData.ageMax}
                    onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                  />
                </div>

              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Ukládání..." : "Uložit změny"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Zrušit
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Metrics Tiles */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Occupancy Tile */}
            <Card className="bg-white border-2 border-black">
              <CardHeader>
                <CardTitle className="text-black">Naplnění tábora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold text-black">{mockRegistrations}</span>
                    <span className="text-black">z {capacity} míst</span>
                  </div>
                  <div className="w-full bg-white border-2 border-black h-3">
                    <div
                      className="bg-black h-3"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                  <p className="text-sm text-black font-medium">{occupancyPercent}% naplnění</p>
                </div>
              </CardContent>
            </Card>

            {/* Financial Tile */}
            <Card className="bg-black border-2 border-black">
              <CardHeader>
                <CardTitle className="text-white">Finanční přehled</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold text-white">{paidAmount.toLocaleString()} Kč</span>
                    <span className="text-white">z {totalAmount.toLocaleString()} Kč</span>
                  </div>
                  <div className="w-full bg-white border-2 border-white h-3">
                    <div
                      className="bg-white h-3"
                      style={{ width: `${paidPercent}%` }}
                    />
                  </div>
                  <p className="text-sm text-white font-medium">{paidPercent}% zaplaceno</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Základní informace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-black">Název akce</p>
                  <p className="text-lg font-semibold">{event.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Termín (od–do)</p>
                  <p className="text-lg font-semibold">
                    {new Date(event.startDate).toLocaleDateString("cs-CZ")} -{" "}
                    {new Date(event.endDate).toLocaleDateString("cs-CZ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Místo konání</p>
                  <p className="text-lg font-semibold">{event.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Cena za účastníka</p>
                  <p className="text-lg font-semibold">{event.price} Kč</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Kapacita</p>
                  <p className="text-lg font-semibold">{event.capacity} míst</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Věkové kategorie</p>
                  <p className="text-lg font-semibold">
                    {event.ageMin || "bez limitu"} - {event.ageMax || "bez limitu"} let
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Link Alert */}
          <Alert>
            <AlertDescription className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium mb-1">Registrační odkaz</p>
                <p className="text-sm text-black break-all">{registrationUrl}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyRegistrationLink}>
                  {copied ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                  {copied ? "Zkopírováno" : "Kopírovat"}
                </Button>
                <Link href={registrationUrl} target="_blank">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Otevřít
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>

          {/* Description Card */}
          {event.description && (
            <Card>
              <CardHeader>
                <CardTitle>Popis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black">{event.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
