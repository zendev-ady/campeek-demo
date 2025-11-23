"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { Child } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react"

export default function RegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [event, setEvent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const [parentName, setParentName] = useState("")
  const [parentEmail, setParentEmail] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [notes, setNotes] = useState("")

  const [children, setChildren] = useState<Child[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      birthDate: "",
      allergies: "",
      medicalInfo: "",
    },
  ])

  useEffect(() => {
    let isMounted = true
    params.then((value) => {
      if (isMounted) setResolvedParams(value)
    })
    return () => {
      isMounted = false
    }
  }, [params])

  useEffect(() => {
    if (!resolvedParams?.id) return
    // Load event from localStorage
    const allEvents = JSON.parse(localStorage.getItem("events") || "[]")
    const foundEvent = allEvents.find((e: any) => e.id === resolvedParams.id)
    setEvent(foundEvent)
  }, [resolvedParams?.id])

  const addChild = () => {
    setChildren([
      ...children,
      {
        id: crypto.randomUUID(),
        name: "",
        birthDate: "",
        allergies: "",
        medicalInfo: "",
      },
    ])
  }

  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren(children.filter((child) => child.id !== id))
    }
  }

  const updateChild = (id: string, field: keyof Child, value: string) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, [field]: value } : child)))
  }

  const calculatePrice = () => {
    if (!event) return 0
    const basePrice = event.price * children.length
    // 10% sibling discount for 2+ children
    const discount = children.length >= 2 ? basePrice * 0.1 : 0
    return basePrice - discount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!resolvedParams) {
        throw new Error("Registrace není dostupná")
      }
      // Validate all children have required fields
      const invalidChild = children.find((child) => !child.name || !child.birthDate)
      if (invalidChild) {
        throw new Error("Vyplňte prosím jméno a datum narození pro všechny děti")
      }

      const registration = {
        eventId: resolvedParams.id,
        parentName,
        parentEmail,
        parentPhone,
        children,
        totalPrice: calculatePrice(),
        status: "pending" as const,
        notes,
      }

      // Save to localStorage
      const allRegistrations = JSON.parse(localStorage.getItem("registrations") || "[]")
      allRegistrations.push({
        ...registration,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem("registrations", JSON.stringify(allRegistrations))

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrace se nezdařila")
    } finally {
      setIsLoading(false)
    }
  }

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <p className="text-black">Načítám registraci...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <p className="text-black">Akce nenalezena</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-white border-2 border-black flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Registrace úspěšná!</CardTitle>
            <CardDescription>Vaše registrace byla úspěšně odeslána</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-black text-center">
              Na email <strong>{parentEmail}</strong> jsme vám odeslali potvrzení s dalšími informacemi.
            </p>
            <div className="bg-white border-2 border-black p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black">Počet dětí:</span>
                <span className="font-medium">{children.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black">Celková cena:</span>
                <span className="font-bold">{calculatePrice().toLocaleString("cs-CZ")} Kč</span>
              </div>
              {children.length >= 2 && (
                <p className="text-xs text-green-600 text-center pt-2">Uplatněna sleva 10% za sourozence</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Event Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{event.name}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-black">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </div>
            <div className="flex items-center text-sm text-black">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-black">
              <Users className="h-4 w-4 mr-2" />
              Kapacita: {event.capacity} účastníků
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-black">Cena za dítě:</span>
              <span className="text-lg font-bold">{event.price.toLocaleString("cs-CZ")} Kč</span>
            </div>
            {event.ageMin || event.ageMax ? (
              <div className="text-sm text-black">
                Věk: {event.ageMin || "0"} - {event.ageMax || "∞"} let
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Registrační formulář</CardTitle>
              <CardDescription>Vyplňte údaje o rodičích a dětech</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Parent Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Kontaktní údaje rodiče</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="parentName">Jméno a příjmení *</Label>
                    <Input
                      id="parentName"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                      placeholder="Jan Novák"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      required
                      placeholder="jan@email.cz"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Telefon *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      required
                      placeholder="+420 123 456 789"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Children Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Údaje o dětech</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addChild}>
                    <Plus className="h-4 w-4 mr-2" />
                    Přidat dítě
                  </Button>
                </div>

                {children.map((child, index) => (
                  <Card key={child.id} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Dítě {index + 1}</CardTitle>
                        {children.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeChild(child.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`child-name-${child.id}`}>Jméno a příjmení *</Label>
                          <Input
                            id={`child-name-${child.id}`}
                            value={child.name}
                            onChange={(e) => updateChild(child.id, "name", e.target.value)}
                            required
                            placeholder="Petra Nováková"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`child-birthdate-${child.id}`}>Datum narození *</Label>
                          <Input
                            id={`child-birthdate-${child.id}`}
                            type="date"
                            value={child.birthDate}
                            onChange={(e) => updateChild(child.id, "birthDate", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`child-allergies-${child.id}`}>Alergie</Label>
                          <Input
                            id={`child-allergies-${child.id}`}
                            value={child.allergies}
                            onChange={(e) => updateChild(child.id, "allergies", e.target.value)}
                            placeholder="např. arašídy, pyl"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`child-medical-${child.id}`}>Zdravotní informace</Label>
                          <Textarea
                            id={`child-medical-${child.id}`}
                            value={child.medicalInfo}
                            onChange={(e) => updateChild(child.id, "medicalInfo", e.target.value)}
                            placeholder="Důležité zdravotní informace"
                            rows={2}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Poznámky (volitelné)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Další informace nebo požadavky"
                  rows={3}
                />
              </div>

              {/* Price Summary */}
              <div className="bg-white border-2 border-black p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Počet dětí:</span>
                  <span className="font-medium">{children.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cena za dítě:</span>
                  <span className="font-medium">{event.price.toLocaleString("cs-CZ")} Kč</span>
                </div>
                {children.length >= 2 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Sleva za sourozence (10%):</span>
                    <span className="font-medium">
                      -{(event.price * children.length * 0.1).toLocaleString("cs-CZ")} Kč
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Celková cena:</span>
                  <span>{calculatePrice().toLocaleString("cs-CZ")} Kč</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Odesílání..." : "Odeslat registraci"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
