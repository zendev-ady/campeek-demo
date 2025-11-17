"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { ExternalLink, Link, Info, Loader2, Save, ClipboardList, User, Users, FileText, Settings } from "lucide-react"
import {
  ADDITIONAL_REGISTRATION_OPTIONS,
  PARTICIPANT_SECTION_OPTIONS,
  PARENT_SECTION_OPTIONS,
  REGISTRATION_FIELDS_TEMPLATE,
} from "./constants"
import type { RegistrationField, RegistrationSettings, FieldState } from "./types"
import { FieldStateToggle } from "./field-state-toggle"

interface RegistrationSettingsPanelProps {
  eventId?: string
}

export function RegistrationSettingsPanel({ eventId }: RegistrationSettingsPanelProps = {}) {
  const [settings, setSettings] = useState<RegistrationSettings>(() => ({
    isEnabled: true,
    startDate: "",
    endDate: "",
    requireAdminApproval: true,
    allowWaitlist: true,
    fields: REGISTRATION_FIELDS_TEMPLATE.map((field) => ({ ...field })),
    sectionNames: {
      participant: "Účastník",
      parent: "Rodič",
    },
    allowMultipleParents: false,
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

  const sectionsDisabled = !settings.isEnabled

  const markAsDirty = () => setHasChanges(true)

  const handleFieldStateChange = (fieldId: string, state: FieldState) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, state } : field
      ),
    }))
    markAsDirty()
  }

  const handleSave = () => {
    setIsSaving(true)
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
      toast.success("Nastavení přihlášek bylo uloženo.")
      saveTimeoutRef.current = null
    }, 1200)
  }

  const handlePreview = () => {
    if (!eventId) {
      toast.error("ID akce není dostupné")
      return
    }
    const registrationUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/register/${eventId}`
        : `/register/${eventId}`
    window.open(registrationUrl, "_blank", "noopener,noreferrer")
  }

  const handleCopyLink = async () => {
    if (!eventId) {
      toast.error("ID akce není dostupné")
      return
    }
    const registrationUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/register/${eventId}`
        : `/register/${eventId}`

    try {
      await navigator.clipboard.writeText(registrationUrl)
      toast.success("Odkaz zkopírován do schránky ✓")
    } catch (err) {
      toast.error("Nepodařilo se zkopírovat odkaz")
    }
  }

  const participantFields = settings.fields.filter((f) => f.category === "Účastník")
  const parentFields = settings.fields.filter((f) => f.category === "Rodič")
  const otherFields = settings.fields.filter((f) => f.category === "Ostatní")

  return (
    <div className="space-y-6">
      {/* Action Buttons - Top */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handlePreview}
          disabled={!eventId}
          aria-label="Zobrazit náhled formuláře"
          title="Zobrazit náhled formuláře"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleCopyLink}
          disabled={!eventId}
          aria-label="Zkopírovat odkaz na registraci"
          title="Zkopírovat odkaz na registraci"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          size="lg"
          className="gap-2"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Ukládám..." : "Uložit změny"}
        </Button>
      </div>

      {/* Aktivace přihlášek */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Aktivace přihlášek
          </CardTitle>
          <CardDescription>
            Zapněte sběr přihlášek a nastavte časové období
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border-2 border-black bg-gray-50">
            <div className="flex flex-wrap items-start gap-3">
              <Checkbox
                id="enable-registrations"
                checked={settings.isEnabled}
                onCheckedChange={(checked) => {
                  setSettings((prev) => ({ ...prev, isEnabled: checked === true }))
                  markAsDirty()
                }}
              />
              <div className="space-y-1">
                <Label htmlFor="enable-registrations" className="font-medium cursor-pointer">
                  Povolit sběr přihlášek
                </Label>
                <p className="text-sm text-black">
                  Pokud je vypnuto, formulář nebude dostupný a rodiče se nemohou přihlašovat.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="startDate">Datum zahájení sběru přihlášek</Label>
              <Input
                id="startDate"
                type="date"
                value={settings.startDate}
                disabled={!settings.isEnabled}
                onChange={(event) => {
                  setSettings((prev) => ({ ...prev, startDate: event.target.value }))
                  markAsDirty()
                }}
              />
              <p className="text-sm text-black mt-1">
                Od tohoto data se přihláškový formulář automaticky zpřístupní rodičům.
              </p>
            </div>
            <div>
              <Label htmlFor="endDate">Datum ukončení sběru přihlášek</Label>
              <Input
                id="endDate"
                type="date"
                value={settings.endDate}
                disabled={!settings.isEnabled}
                onChange={(event) => {
                  setSettings((prev) => ({ ...prev, endDate: event.target.value }))
                  markAsDirty()
                }}
              />
              <p className="text-sm text-black mt-1">
                Po tomto datu se formulář automaticky uzavře.
              </p>
            </div>
          </div>

          {!settings.isEnabled && (
            <div className="rounded-lg border-2 border-amber-600 bg-amber-50 p-3 text-sm text-amber-900">
              ⚠️ Přihlášky jsou momentálně pozastavené – ostatní sekce jsou uzamčené.
            </div>
          )}

          <div className="pt-4 border-t-2 border-black">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              disabled={!eventId}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Náhled registračního formuláře
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sekce Účastník */}
      <Card className={cn(sectionsDisabled && "opacity-60")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Sekce „{settings.sectionNames.participant}"
          </CardTitle>
          <CardDescription>
            Informace o dětech, které se účastní akce
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="participant-section-name">Přejmenovat sekci</Label>
            <select
              id="participant-section-name"
              value={settings.sectionNames.participant}
              disabled={sectionsDisabled}
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  sectionNames: { ...prev.sectionNames, participant: e.target.value },
                }))
                markAsDirty()
              }}
              className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm mt-2"
            >
              {PARTICIPANT_SECTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-black">Sbíraná pole</h4>
            <div className="space-y-2">
              {participantFields.map((field) => (
                <FieldRow
                  key={field.id}
                  field={field}
                  disabled={sectionsDisabled}
                  onStateChange={handleFieldStateChange}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sekce Rodič */}
      <Card className={cn(sectionsDisabled && "opacity-60")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Sekce „{settings.sectionNames.parent}"
          </CardTitle>
          <CardDescription>
            Kontaktní údaje zákonných zástupců
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="parent-section-name">Přejmenovat sekci</Label>
            <select
              id="parent-section-name"
              value={settings.sectionNames.parent}
              disabled={sectionsDisabled}
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  sectionNames: { ...prev.sectionNames, parent: e.target.value },
                }))
                markAsDirty()
              }}
              className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm mt-2"
            >
              {PARENT_SECTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="allow-multiple-parents"
              checked={settings.allowMultipleParents}
              disabled={sectionsDisabled}
              onCheckedChange={(checked) => {
                setSettings((prev) => ({ ...prev, allowMultipleParents: checked === true }))
                markAsDirty()
              }}
            />
            <Label htmlFor="allow-multiple-parents" className="font-medium cursor-pointer">
              Povolit sběr údajů o více rodičích
            </Label>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-black">Sbíraná pole</h4>
            <div className="space-y-2">
              {parentFields.map((field) => (
                <FieldRow
                  key={field.id}
                  field={field}
                  disabled={sectionsDisabled}
                  onStateChange={handleFieldStateChange}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sekce Ostatní */}
      <Card className={cn(sectionsDisabled && "opacity-60")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Sekce „Ostatní"
          </CardTitle>
          <CardDescription>
            Doplňkové informace a právní souhlasy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <h4 className="font-medium text-black">Právní a doplňková pole</h4>
          <div className="space-y-2">
            {otherFields.map((field) => (
              <FieldRow
                key={field.id}
                field={field}
                disabled={sectionsDisabled}
                onStateChange={handleFieldStateChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doplňková nastavení */}
      <Card className={cn(sectionsDisabled && "opacity-60")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Doplňková nastavení přihlášek
          </CardTitle>
          <CardDescription>
            Doladění logiky schvalování a čekací listiny
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {ADDITIONAL_REGISTRATION_OPTIONS.map((option) => (
            <div
              key={option.id}
              className="flex flex-wrap items-center justify-between gap-4 border-2 border-black px-4 py-3"
            >
              <div className="space-y-1">
                <p className="font-medium">{option.label}</p>
                <p className="text-sm text-black">{option.helper}</p>
              </div>
              <Switch
                aria-label={option.label}
                checked={settings[option.id]}
                disabled={sectionsDisabled}
                onCheckedChange={(checked) => {
                  setSettings((prev) => ({ ...prev, [option.id]: checked === true }))
                  markAsDirty()
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons - Bottom */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handlePreview}
          disabled={!eventId}
          aria-label="Zobrazit náhled formuláře"
          title="Zobrazit náhled formuláře"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleCopyLink}
          disabled={!eventId}
          aria-label="Zkopírovat odkaz na registraci"
          title="Zkopírovat odkaz na registraci"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          size="lg"
          className="gap-2"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Ukládám..." : "Uložit změny"}
        </Button>
      </div>
    </div>
  )
}

function FieldRow({
  field,
  disabled,
  onStateChange,
}: {
  field: RegistrationField
  disabled: boolean
  onStateChange: (fieldId: string, state: FieldState) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-2 border-black bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="font-medium text-black">{field.label}</span>
        {field.isSystem && (
          <span className="text-xs text-black">(systémové)</span>
        )}
      </div>
      <FieldStateToggle
        value={field.state}
        onChange={(state) => onStateChange(field.id, state)}
        disabled={disabled || field.isSystem}
        fieldLabel={field.label}
      />
    </div>
  )
}
