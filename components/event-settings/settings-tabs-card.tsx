"use client"

import type { ReactNode } from "react"
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
        <h1 className="text-3xl font-bold tracking-tight text-black">Nastavení</h1>
        <p className="text-black">Konfigurace a správa nastavení akce</p>
      </div>

      {/* Tab Navigation - Sidebar Style */}
      <nav className="border-b-2 border-black">
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
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2",
                  isActive
                    ? "text-black border-black bg-white"
                    : "text-black border-black bg-white",
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-black" : "text-black")} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="bg-white border-2 border-black">
        {children ? (
          children
        ) : (
          <div className="text-center py-12 text-black">
            Modul {activeLabel.toLowerCase()} je zatím v přípravě.
          </div>
        )}
      </div>
    </div>
  )
}
