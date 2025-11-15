import { Palette, Mail } from "lucide-react"
import type { OrganizationSettingsTab } from "./types"

export const ORGANIZATION_SETTINGS_TABS: OrganizationSettingsTab[] = [
  {
    id: "branding",
    label: "Branding",
    icon: Palette,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
  },
]
