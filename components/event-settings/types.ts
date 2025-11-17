import type { LucideIcon } from "lucide-react"

export type EventSettingsTabId = "basic" | "finance" | "registrations" | "registrations-v2" | "notifications"

export type EventSettingsTab = {
  id: EventSettingsTabId
  label: string
  icon: LucideIcon
}

export type RegistrationFieldCategory = "Účastník" | "Rodič" | "Ostatní"

export type FieldState = "required" | "optional" | "hidden"

export type RegistrationField = {
  id: string
  label: string
  category: RegistrationFieldCategory
  description?: string
  state: FieldState
  isSystem?: boolean // Systémové pole nelze měnit
}

export type SectionNames = {
  participant: string
  parent: string
}

export type RegistrationSettings = {
  isEnabled: boolean
  startDate: string
  endDate: string
  fields: RegistrationField[]
  requireAdminApproval: boolean
  allowWaitlist: boolean
  sectionNames: SectionNames
  allowMultipleParents: boolean
}

export type AdditionalRegistrationOption = {
  id: keyof Pick<RegistrationSettings, "requireAdminApproval" | "allowWaitlist">
  label: string
  helper: string
}

