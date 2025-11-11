"use client"

import { useState } from "react"
import { RegistrationSettingsPanel } from "./registration-settings-panel"
import { SettingsTabsCard } from "./settings-tabs-card"
import type { EventSettingsTabId } from "./types"

export function EventSettingsShell() {
  const [activeTab, setActiveTab] = useState<EventSettingsTabId>("registrations")

  return (
    <div className="space-y-6">
      <SettingsTabsCard activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "registrations" ? <RegistrationSettingsPanel /> : null}
      </SettingsTabsCard>
    </div>
  )
}
