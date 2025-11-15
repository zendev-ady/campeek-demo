"use client"

import { useState } from "react"
import { RegistrationSettingsPanel } from "./registration-settings-panel"
import { BasicSettingsPanel } from "./basic-settings-panel"
import { FinanceSettingsPanel } from "./finance-settings-panel"
import { CommunicationSettingsPanel } from "./communication-settings-panel"
import { NotificationsSettingsPanel } from "./notifications-settings-panel"
import { SettingsTabsCard } from "./settings-tabs-card"
import type { EventSettingsTabId } from "./types"

interface EventSettingsShellProps {
  eventId?: string
}

export function EventSettingsShell({ eventId }: EventSettingsShellProps = {}) {
  const [activeTab, setActiveTab] = useState<EventSettingsTabId>("registrations")

  return (
    <div className="space-y-6">
      <SettingsTabsCard activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "basic" ? <BasicSettingsPanel /> : null}
        {activeTab === "finance" ? <FinanceSettingsPanel /> : null}
        {activeTab === "registrations" ? <RegistrationSettingsPanel eventId={eventId} /> : null}
        {activeTab === "communication" ? <CommunicationSettingsPanel /> : null}
        {activeTab === "notifications" ? <NotificationsSettingsPanel /> : null}
      </SettingsTabsCard>
    </div>
  )
}
