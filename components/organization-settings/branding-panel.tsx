"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save, Upload, X } from "lucide-react"
import { SectionBlock } from "@/components/event-settings/section-block"
import { useOrganization } from "@/lib/organization-context"
import type { OrganizationBranding } from "@/lib/types"
import { EmailPreview } from "./email-preview"

export function BrandingPanel() {
  const { currentOrganization, updateBranding } = useOrganization()
  const [branding, setBranding] = useState<OrganizationBranding>(() => ({
    logoUrl: currentOrganization?.branding?.logoUrl || "",
    bannerUrl: currentOrganization?.branding?.bannerUrl || "",
    primaryColor: currentOrganization?.branding?.primaryColor || "#2563EB",
    secondaryColor: currentOrganization?.branding?.secondaryColor || "#10B981",
    accentColor: currentOrganization?.branding?.accentColor || "#F59E0B",
  }))
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const markAsDirty = () => setHasChanges(true)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateBranding(branding)
      saveTimeoutRef.current = setTimeout(() => {
        setIsSaving(false)
        setHasChanges(false)
        toast.success("Branding byl uložen.")
        saveTimeoutRef.current = null
      }, 800)
    } catch (error) {
      setIsSaving(false)
      toast.error("Nepodařilo se uložit branding.")
    }
  }

  const handleCancel = () => {
    setBranding({
      logoUrl: currentOrganization?.branding?.logoUrl || "",
      bannerUrl: currentOrganization?.branding?.bannerUrl || "",
      primaryColor: currentOrganization?.branding?.primaryColor || "#2563EB",
      secondaryColor: currentOrganization?.branding?.secondaryColor || "#10B981",
      accentColor: currentOrganization?.branding?.accentColor || "#F59E0B",
    })
    setHasChanges(false)
    toast.info("Změny byly zrušeny.")
  }

  // Mock file upload - in real app would upload to cloud storage
  const handleFileUpload = (type: "logo" | "banner", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Mock upload - in real app would upload to S3/Cloudinary/etc
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      if (type === "logo") {
        setBranding((prev) => ({ ...prev, logoUrl: dataUrl }))
      } else {
        setBranding((prev) => ({ ...prev, bannerUrl: dataUrl }))
      }
      markAsDirty()
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (type: "logo" | "banner") => {
    if (type === "logo") {
      setBranding((prev) => ({ ...prev, logoUrl: "" }))
    } else {
      setBranding((prev) => ({ ...prev, bannerUrl: "" }))
    }
    markAsDirty()
  }

  return (
    <div className="space-y-10">
      {/* Header with action buttons */}
      <div className="flex items-center justify-between gap-4 py-4 border-b-2 border-black">
        <div>
          <h2 className="text-xl font-bold text-black">Vzhled emailů a formulářů</h2>
          <p className="text-sm text-black mt-1">
            Nastavte vizuální identitu vaší organizace
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Zrušit
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Ukládám...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Uložit změny
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Logo Section */}
      <SectionBlock
        title="Logo organizace"
        description="Nahrát logo, které se zobrazí v emailech a registračním formuláři"
      >
        <div className="space-y-4">
          {branding.logoUrl ? (
            <div className="relative inline-block">
              <img
                src={branding.logoUrl}
                alt="Logo organizace"
                className="max-h-32 border-2 border-black"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={() => handleRemoveImage("logo")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-black p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-black" />
              <p className="text-sm text-black mb-2">Žádné logo nenahrané</p>
            </div>
          )}
          <div>
            <Label htmlFor="logo-upload">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  {branding.logoUrl ? "Změnit logo" : "Nahrát logo"}
                </span>
              </Button>
            </Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={(e) => handleFileUpload("logo", e)}
            />
            <p className="text-xs text-black mt-2">Doporučený formát: PNG, max 500x200px</p>
          </div>
        </div>
      </SectionBlock>

      {/* Banner Section */}
      <SectionBlock
        title="Banner obrázek (volitelné)"
        description="Nahrát banner pro hlavičku emailů"
      >
        <div className="space-y-4">
          {branding.bannerUrl ? (
            <div className="relative inline-block">
              <img
                src={branding.bannerUrl}
                alt="Banner organizace"
                className="max-h-40 w-full object-cover border-2 border-black"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={() => handleRemoveImage("banner")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-black p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-black" />
              <p className="text-sm text-black mb-2">Žádný banner nenahrán</p>
            </div>
          )}
          <div>
            <Label htmlFor="banner-upload">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  {branding.bannerUrl ? "Změnit banner" : "Nahrát banner"}
                </span>
              </Button>
            </Label>
            <Input
              id="banner-upload"
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => handleFileUpload("banner", e)}
            />
            <p className="text-xs text-black mt-2">Doporučený formát: 1200x400px</p>
          </div>
        </div>
      </SectionBlock>

      {/* Colors Section */}
      <SectionBlock title="Barvy" description="Nastavte barevné schéma vaší organizace">
        <div className="grid gap-6">
          {/* Primary Color */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="primary-color">Primární barva</Label>
              <p className="text-xs text-black">Hlavní barva pro tlačítka a odkazy</p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="primary-color"
                type="color"
                value={branding.primaryColor}
                onChange={(e) => {
                  setBranding((prev) => ({ ...prev, primaryColor: e.target.value }))
                  markAsDirty()
                }}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={branding.primaryColor}
                onChange={(e) => {
                  setBranding((prev) => ({ ...prev, primaryColor: e.target.value }))
                  markAsDirty()
                }}
                className="w-28 font-mono text-sm"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="secondary-color">Sekundární barva</Label>
              <p className="text-xs text-black">Doplňková barva pro zvýraznění</p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="secondary-color"
                type="color"
                value={branding.secondaryColor}
                onChange={(e) => {
                  setBranding((prev) => ({ ...prev, secondaryColor: e.target.value }))
                  markAsDirty()
                }}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={branding.secondaryColor}
                onChange={(e) => {
                  setBranding((prev) => ({ ...prev, secondaryColor: e.target.value }))
                  markAsDirty()
                }}
                className="w-28 font-mono text-sm"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="accent-color">Akcentová barva (volitelná)</Label>
              <p className="text-xs text-black">Barva pro upozornění a důležité prvky</p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="accent-color"
                type="color"
                value={branding.accentColor}
                onChange={(e) => {
                  setBranding((prev) => ({ ...prev, accentColor: e.target.value }))
                  markAsDirty()
                }}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={branding.accentColor}
                onChange={(e) => {
                  setBranding((prev) => ({ ...prev, accentColor: e.target.value }))
                  markAsDirty()
                }}
                className="w-28 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* Email Preview Section */}
      <SectionBlock
        title="👁️ Náhled emailu"
        description="Ukázka automatického potvrzení registrace s vašim brandingem"
      >
        <EmailPreview
          branding={branding}
          email={currentOrganization?.email}
          organizationName={currentOrganization?.name || "Vaše organizace"}
        />
      </SectionBlock>
    </div>
  )
}
