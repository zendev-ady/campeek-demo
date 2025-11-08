"use client"

import type { Registration } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Maximize2, Edit2, Trash2, Check } from "lucide-react"
import { useState } from "react"

interface RegistrationDetailPanelProps {
  registration: Registration
  onClose: () => void
  onExpand: () => void
}

export function RegistrationDetailPanel({ registration, onClose, onExpand }: RegistrationDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: "Čeká", variant: "secondary" as const },
      confirmed: { label: "Potvrzená", variant: "default" as const },
      cancelled: { label: "Zrušená", variant: "outline" as const },
    }
    return variants[status as keyof typeof variants]
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-background border-l shadow-xl overflow-y-auto z-40">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg">{registration.children[0]?.name}</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onExpand} title="Zvětšit">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} title="Zavřít">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Registration Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Přihláška</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Stav přihlášky</p>
              <Badge variant={getStatusBadge(registration.status).variant} className="mt-1">
                {getStatusBadge(registration.status).label}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Datum přihlášky</p>
              <p className="font-medium">{new Date(registration.createdAt).toLocaleDateString("cs-CZ")}</p>
            </div>
            {registration.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Poznámka</p>
                <p className="font-medium">{registration.notes}</p>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Edit2 className="h-4 w-4" />
                Upravit
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-destructive bg-transparent">
                <Trash2 className="h-4 w-4" />
                Zrušit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Child Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dítě</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {registration.children.map((child) => (
              <div key={child.id} className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Jméno a příjmení</p>
                  <p className="font-medium">{child.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Datum narození</p>
                  <p className="font-medium">{new Date(child.birthDate).toLocaleDateString("cs-CZ")}</p>
                </div>
                {child.allergies && (
                  <div>
                    <p className="text-sm text-muted-foreground">Alergie</p>
                    <p className="font-medium">{child.allergies}</p>
                  </div>
                )}
                {child.medicalInfo && (
                  <div>
                    <p className="text-sm text-muted-foreground">Zdravotní informace</p>
                    <p className="font-medium">{child.medicalInfo}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Parent Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rodič</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Jméno a příjmení</p>
              <p className="font-medium">{registration.parentName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefon</p>
              <p className="font-medium">{registration.parentPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{registration.parentEmail}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platba</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Částka</p>
              <p className="font-semibold text-lg">{registration.totalPrice.toLocaleString("cs-CZ")} Kč</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stav platby</p>
              <Badge variant="secondary" className="mt-1">
                Čeká
              </Badge>
            </div>
            <Button className="w-full gap-2">
              <Check className="h-4 w-4" />
              Označit jako zaplacené
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
