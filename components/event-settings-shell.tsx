"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Info, PiggyBank, Users, MessageSquare, Bell, Save } from "lucide-react"

const tabs = [
  { id: "basic", label: "Základní informace", icon: Info },
  { id: "finance", label: "Finance", icon: PiggyBank },
  { id: "registrations", label: "Přihlášky", icon: Users },
  { id: "communication", label: "Komunikace", icon: MessageSquare },
  { id: "notifications", label: "Notifikace", icon: Bell },
]

export function EventSettingsShell() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? tabs[0].label

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h1 className="text-2xl font-semibold tracking-tight text-balance text-foreground">Nastavení</h1>
          <div className="inline-flex flex-wrap gap-2 rounded-lg bg-emerald-900 px-2 py-2 text-emerald-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors",
                  activeTab === tab.id
                    ? "bg-emerald-800 text-emerald-50 shadow"
                    : "hover:text-emerald-200",
                )}
              >
                <tab.icon className="h-4 w-4 text-emerald-500" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-muted-foreground/50 bg-muted/40 p-5 text-base text-muted-foreground">
            Modul {activeLabel.toLowerCase()} je zatím v přípravě.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
