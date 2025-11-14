"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { EVENT_SETTINGS_TABS } from "./constants"
import type { EventSettingsTabId } from "./types"

type SettingsTabsCardProps = {
  activeTab: EventSettingsTabId
  onTabChange: (tab: EventSettingsTabId) => void
  children?: ReactNode
}

export function SettingsTabsCard({ activeTab, onTabChange, children }: SettingsTabsCardProps) {
  const tabs = EVENT_SETTINGS_TABS
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? tabs[0].label

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Nastavení</h1>
        <p className="text-muted-foreground">Konfigurace a správa nastavení akce</p>
      </div>

      {/* Tab Navigation - Sidebar Style */}
      <nav className="border-b border-border">
        <div className="flex gap-1 -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors rounded-t-lg border-b-2",
                  isActive
                    ? "text-emerald-700 border-emerald-600 bg-emerald-50/50"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50",
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-emerald-600" : "text-muted-foreground")} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">
          {children ? (
            <div className="space-y-10 text-foreground">{children}</div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Modul {activeLabel.toLowerCase()} je zatím v přípravě.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
