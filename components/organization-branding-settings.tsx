"use client"

import { useState, useEffect } from "react"
import { useOrganization } from "@/lib/organization-context"
import type { OrganizationBranding } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, Save, Eye } from "lucide-react"
import { toast } from "sonner"

export function OrganizationBrandingSettings() {
  const { currentOrganization } = useOrganization()
  const [branding, setBranding] = useState<OrganizationBranding | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    loadBranding()
  }, [currentOrganization])

  const loadBranding = () => {
    try {
      const stored = localStorage.getItem("organizationBranding")
      if (stored) {
        const allBranding = JSON.parse(stored) as OrganizationBranding
        if (allBranding.organizationId === currentOrganization?.id) {
          setBranding(allBranding)
        } else {
          // Create default branding for current organization
          createDefaultBranding()
        }
      } else {
        createDefaultBranding()
      }
    } catch (error) {
      console.error("Failed to load branding:", error)
      createDefaultBranding()
    }
  }

  const createDefaultBranding = () => {
    if (!currentOrganization) return

    const defaultBranding: OrganizationBranding = {
      organizationId: currentOrganization.id,
      name: currentOrganization.name,
      logoUrl: "",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      contactEmail: "info@example.cz",
      emailFrom: `org-${currentOrganization.id}@campeek.app`,
    }

    setBranding(defaultBranding)
  }

  const handleSave = () => {
    if (!branding) return

    try {
      localStorage.setItem("organizationBranding", JSON.stringify(branding))
      toast.success("Nastavení brandingu bylo uloženo")
    } catch (error) {
      console.error("Failed to save branding:", error)
      toast.error("Chyba při ukládání nastavení")
    }
  }

  const updateBranding = (field: keyof OrganizationBranding, value: string) => {
    if (!branding) return
    setBranding({ ...branding, [field]: value })
  }

  if (!branding) {
    return <div>Načítání...</div>
  }

  return (
    <div className="space-y-6">
      {/* Branding Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Branding organizace
          </CardTitle>
          <CardDescription>
            Nastavte vzhled emailů a komunikace s rodiči a účastníky
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="org-name">Název organizace</Label>
            <Input
              id="org-name"
              value={branding.name}
              onChange={(e) => updateBranding("name", e.target.value)}
              placeholder="Například: Letní tábory 2025"
            />
            <p className="text-sm text-black">
              Zobrazí se v záhlaví všech odeslaných emailů
            </p>
          </div>

          {/* Logo URL */}
          <div className="space-y-2">
            <Label htmlFor="logo-url">URL loga (volitelné)</Label>
            <Input
              id="logo-url"
              value={branding.logoUrl || ""}
              onChange={(e) => updateBranding("logoUrl", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <p className="text-sm text-black">
              Pro demo verzi zadejte URL obrázku. V produkci bude možné nahrát soubor.
            </p>
            {branding.logoUrl && (
              <div className="mt-2 p-3 border-2 border-black bg-gray-50">
                <p className="text-xs text-black mb-2">Náhled loga:</p>
                <img
                  src={branding.logoUrl}
                  alt="Logo preview"
                  className="max-h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = ""
                    e.currentTarget.alt = "Chyba načítání obrázku"
                  }}
                />
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primární barva</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => updateBranding("primaryColor", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={branding.primaryColor}
                  onChange={(e) => updateBranding("primaryColor", e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-black">Pro zvýraznění a tlačítka</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Sekundární barva</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={branding.secondaryColor}
                  onChange={(e) => updateBranding("secondaryColor", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={branding.secondaryColor}
                  onChange={(e) => updateBranding("secondaryColor", e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-black">Pro pozadí a detaily</p>
            </div>
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contact-email">Kontaktní email (Reply-To)</Label>
            <Input
              id="contact-email"
              type="email"
              value={branding.contactEmail}
              onChange={(e) => updateBranding("contactEmail", e.target.value)}
              placeholder="info@vasorganizace.cz"
            />
            <p className="text-sm text-black">
              Na tento email budou rodiče odpovídat na zprávy
            </p>
          </div>

          {/* Email From (readonly) */}
          <div className="space-y-2">
            <Label htmlFor="email-from">Emailová adresa odesílatele</Label>
            <Input
              id="email-from"
              value={branding.emailFrom || `org-${branding.organizationId}@campeek.app`}
              readOnly
              disabled
              className="bg-gray-100"
            />
            <p className="text-sm text-black">
              Automaticky přiřazená adresa pro odesílání emailů (v MVP verzi)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t-2 border-black">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Uložit změny
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Skrýt náhled" : "Zobrazit náhled"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Náhled emailu s vaším brandingem</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-black p-6"
              style={{
                backgroundColor: branding.secondaryColor,
              }}
            >
              {/* Email Header */}
              <div className="border-b-2 border-black pb-4 mb-6">
                {branding.logoUrl && (
                  <img
                    src={branding.logoUrl}
                    alt={branding.name}
                    className="h-12 mb-3 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                )}
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: branding.primaryColor,
                  }}
                >
                  {branding.name}
                </h2>
              </div>

              {/* Email Body */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ukázková zpráva</h3>
                <p>
                  Milí rodiče,
                  <br />
                  <br />
                  toto je ukázka, jak bude vypadat email odeslaný z vašeho systému s vaším
                  brandingem.
                  <br />
                  <br />
                  Děkujeme za pozornost!
                </p>

                {/* Sample Button */}
                <button
                  className="px-4 py-2 text-white font-medium border-2 border-black"
                  style={{
                    backgroundColor: branding.primaryColor,
                  }}
                >
                  Ukázkové tlačítko
                </button>
              </div>

              {/* Email Footer */}
              <div className="border-t-2 border-black mt-6 pt-4 text-sm text-black">
                <p>
                  Odpovězte prosím na:{" "}
                  <a
                    href={`mailto:${branding.contactEmail}`}
                    className="underline"
                    style={{ color: branding.primaryColor }}
                  >
                    {branding.contactEmail}
                  </a>
                </p>
                <p className="mt-2 text-xs opacity-75">
                  Tento email byl odeslán ze systému Campeek
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
