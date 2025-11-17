"use client"

import { useState } from "react"
import { RegistrationSettingsPanel } from "./registration-settings-panel"
import { RegistrationSettingsPanelV2 } from "./registration-settings-panel-v2"
import { BasicSettingsPanel } from "./basic-settings-panel"
import { FinanceSettingsPanel } from "./finance-settings-panel"
import { NotificationsSettingsPanel } from "./notifications-settings-panel"
import { NotificationsSettingsPanelV2 } from "./notifications-settings-panel-v2"
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
        {activeTab === "registrations-v2" ? <RegistrationSettingsPanelV2 eventId={eventId} /> : null}
        {activeTab === "notifications" ? <NotificationsSettingsPanel /> : null}
        {activeTab === "notifications-v2" ? <NotificationsSettingsPanelV2 /> : null}
      </SettingsTabsCard>
    </div>
  )
}
