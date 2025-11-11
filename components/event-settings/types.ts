import type { LucideIcon } from "lucide-react"

export type EventSettingsTabId = "basic" | "finance" | "registrations" | "communication" | "notifications"

export type EventSettingsTab = {
  id: EventSettingsTabId
  label: string
  icon: LucideIcon
}

export type RegistrationFieldCategory = "Dítě" | "Rodič" | "Souhlasy" | "Ostatní"

export type RegistrationField = {
  id: string
  label: string
  category: RegistrationFieldCategory
  description: string
  required: boolean
  visible: boolean
}

export type RegistrationSettings = {
  isEnabled: boolean
  startDate: string
  endDate: string
  fields: RegistrationField[]
  requireAdminApproval: boolean
  allowWaitlist: boolean
  sendConfirmationEmail: boolean
  showSummaryOnSubmit: boolean
}

export type AdditionalRegistrationOption = {
  id: keyof Pick<
    RegistrationSettings,
    "requireAdminApproval" | "allowWaitlist" | "sendConfirmationEmail" | "showSummaryOnSubmit"
  >
  label: string
  helper: string
}

