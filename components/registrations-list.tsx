"use client"

import { useState } from "react"
import type { Registration } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RegistrationDetailPanel } from "./registration-detail-panel"
import { Plus, ChevronRight } from "lucide-react"

interface RegistrationsListProps {
  eventId: string
  registrations: Registration[]
}

export function RegistrationsList({ eventId, registrations }: RegistrationsListProps) {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: "Čeká", variant: "secondary" as const },
      confirmed: { label: "Potvrzená", variant: "default" as const },
      cancelled: { label: "Zrušená", variant: "outline" as const },
    }
    return variants[status as keyof typeof variants]
  }

  if (registrations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12 text-muted-foreground">
          Zatím žádné přihlášky. Sdílejte registrační odkaz s rodiči.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Přihlášky ({registrations.length})</h3>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nová přihláška
        </Button>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Dítě</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Datum narození</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rodič</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stav platby</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stav přihlášky</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Datum přihlášky</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedRegistration(reg)}
                  >
                    <td className="px-4 py-3 text-sm">{reg.children.map((child) => child.name).join(", ")}</td>
                    <td className="px-4 py-3 text-sm">
                      {reg.children[0]?.birthDate
                        ? new Date(reg.children[0].birthDate).toLocaleDateString("cs-CZ")
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm">{reg.parentName}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="secondary">Čeká</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={getStatusBadge(reg.status).variant}>{getStatusBadge(reg.status).label}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{new Date(reg.createdAt).toLocaleDateString("cs-CZ")}</td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Panel */}
      {selectedRegistration && !isFullscreen && (
        <RegistrationDetailPanel
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
          onExpand={() => setIsFullscreen(true)}
        />
      )}
    </div>
  )
}
