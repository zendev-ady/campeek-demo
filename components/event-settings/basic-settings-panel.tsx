"use client"

import { useState, useEffect } from "react"
import { useEvents } from "@/lib/event-context"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Info, Calendar, MapPin, Users, Globe, Image } from "lucide-react"
import { toast } from "sonner"
import type { Event } from "@/lib/types"

export function BasicSettingsPanel() {
  const params = useParams()
  const eventId = params?.id as string
  const { getEventById, updateEvent } = useEvents()
  const event = getEventById(eventId)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    ageMin: "",
    ageMax: "",
    location: "",
    logoUrl: "",
    websiteUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    termsUrl: "",
  })

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        description: event.description || "",
        startDate: event.startDate ? event.startDate.split("T")[0] : "",
        startTime: event.startTime || "",
        endDate: event.endDate ? event.endDate.split("T")[0] : "",
        endTime: event.endTime || "",
        ageMin: event.ageMin?.toString() || "",
        ageMax: event.ageMax?.toString() || "",
        location: event.location || "",
        logoUrl: event.logoUrl || "",
        websiteUrl: event.websiteUrl || "",
        instagramUrl: event.instagramUrl || "",
        facebookUrl: event.facebookUrl || "",
        termsUrl: event.termsUrl || "",
      })
    }
  }, [event])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Vyplňte prosím všechna povinná pole")
      return
    }

    try {
      const updatedEvent: Partial<Event> = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        startTime: formData.startTime || undefined,
        endDate: formData.endDate,
        endTime: formData.endTime || undefined,
        ageMin: formData.ageMin ? parseInt(formData.ageMin) : undefined,
        ageMax: formData.ageMax ? parseInt(formData.ageMax) : undefined,
        location: formData.location,
        logoUrl: formData.logoUrl || undefined,
        websiteUrl: formData.websiteUrl || undefined,
        instagramUrl: formData.instagramUrl || undefined,
        facebookUrl: formData.facebookUrl || undefined,
        termsUrl: formData.termsUrl || undefined,
        updatedAt: new Date().toISOString(),
      }

      await updateEvent(eventId, updatedEvent)
      toast.success("Základní nastavení bylo uloženo")
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast.error("Chyba při ukládání nastavení")
    }
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!event) {
    return (
      <div className="text-center py-12 text-black">
        <p>Akce nebyla nalezena</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Save Button - Top */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Uložit změny
        </Button>
      </div>

      {/* Základní informace */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Základní údaje
          </CardTitle>
          <CardDescription>Hlavní informace o akci</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name">
              Název akce <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Například: Letní tábor 2025"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Popis</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Krátký popis akce, který se zobrazí na registračním formuláři..."
              rows={4}
            />
            <p className="text-sm text-black mt-1">
              Tento popis se zobrazí rodičům při registraci
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Datum a čas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Termín konání
          </CardTitle>
          <CardDescription>Kdy akce začíná a končí</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">
                Datum začátku <span className="text-red-600">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="startTime">Čas začátku</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => updateField("startTime", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">
                Datum konce <span className="text-red-600">*</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">Čas konce</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => updateField("endTime", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Věková kategorie a místo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Účastníci a místo konání
          </CardTitle>
          <CardDescription>Omezení a lokace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ageMin">Minimální věk</Label>
              <Input
                id="ageMin"
                type="number"
                value={formData.ageMin}
                onChange={(e) => updateField("ageMin", e.target.value)}
                placeholder="Například: 6"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="ageMax">Maximální věk</Label>
              <Input
                id="ageMax"
                type="number"
                value={formData.ageMax}
                onChange={(e) => updateField("ageMax", e.target.value)}
                placeholder="Například: 15"
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">
              <MapPin className="h-4 w-4 inline mr-1" />
              Místo konání
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Například: Borovan, Jižní Čechy"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vizuální identita */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Logo a obrázek
          </CardTitle>
          <CardDescription>Vizuální identita akce</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="logoUrl">URL loga/obrázku akce</Label>
            <Input
              id="logoUrl"
              type="url"
              value={formData.logoUrl}
              onChange={(e) => updateField("logoUrl", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <p className="text-sm text-black mt-1">
              V demo verzi zadejte URL obrázku
            </p>
            {formData.logoUrl && (
              <div className="mt-2 p-3 border-2 border-black bg-gray-50">
                <p className="text-xs text-black mb-2">Náhled:</p>
                <img
                  src={formData.logoUrl}
                  alt="Logo preview"
                  className="max-h-32 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Online prezence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online prezence
          </CardTitle>
          <CardDescription>Webové stránky a sociální sítě</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="websiteUrl">Web URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => updateField("websiteUrl", e.target.value)}
              placeholder="https://vaseweby.cz"
            />
          </div>

          <div>
            <Label htmlFor="instagramUrl">Instagram URL</Label>
            <Input
              id="instagramUrl"
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => updateField("instagramUrl", e.target.value)}
              placeholder="https://instagram.com/vaseprofil"
            />
          </div>

          <div>
            <Label htmlFor="facebookUrl">Facebook URL</Label>
            <Input
              id="facebookUrl"
              type="url"
              value={formData.facebookUrl}
              onChange={(e) => updateField("facebookUrl", e.target.value)}
              placeholder="https://facebook.com/vasestranka"
            />
          </div>

          <div>
            <Label htmlFor="termsUrl">Obchodní podmínky URL</Label>
            <Input
              id="termsUrl"
              type="url"
              value={formData.termsUrl}
              onChange={(e) => updateField("termsUrl", e.target.value)}
              placeholder="https://vaseweby.cz/podminky"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Uložit změny
        </Button>
      </div>
    </form>
  )
}
