"use client"

import { OrganizationBrandingSettings } from "@/components/organization-branding-settings"

export default function OrganizationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Organizace</h1>
        <p className="text-black mt-1">Nastavení vaší organizace</p>
      </div>

      <OrganizationBrandingSettings />
    </div>
  )
}
