"use client"

import { useState } from "react"
import { BrandingPanel } from "./branding-panel"
import { EmailPanel } from "./email-panel"
import { SettingsTabsCard } from "./settings-tabs-card"
import type { OrganizationSettingsTabId } from "./types"

export function OrganizationSettingsShell() {
  const [activeTab, setActiveTab] = useState<OrganizationSettingsTabId>("branding")

  return (
    <div className="space-y-6">
      <SettingsTabsCard activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "branding" ? <BrandingPanel /> : null}
        {activeTab === "email" ? <EmailPanel /> : null}
      </SettingsTabsCard>
    </div>
  )
}
