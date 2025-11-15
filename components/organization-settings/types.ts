import type { LucideIcon } from "lucide-react"

export type OrganizationSettingsTabId = "branding" | "email"

export type OrganizationSettingsTab = {
  id: OrganizationSettingsTabId
  label: string
  icon: LucideIcon
}
