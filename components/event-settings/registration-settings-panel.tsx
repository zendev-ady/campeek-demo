"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Info, Loader2, Save } from "lucide-react"
import {
  ADDITIONAL_REGISTRATION_OPTIONS,
  PARTICIPANT_SECTION_OPTIONS,
  PARENT_SECTION_OPTIONS,
  REGISTRATION_FIELDS_TEMPLATE,
} from "./constants"
import type { RegistrationField, RegistrationSettings, FieldState } from "./types"
import { FieldStateToggle } from "./field-state-toggle"

export function RegistrationSettingsPanel() {
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

  const handleCancel = () => {
    // Reset to initial state or navigate back
    setHasChanges(false)
    toast.info("Změny byly zrušeny.")
  }

  const participantFields = settings.fields.filter((f) => f.category === "Účastník")
  const parentFields = settings.fields.filter((f) => f.category === "Rodič")
  const otherFields = settings.fields.filter((f) => f.category === "Ostatní")

  return (
    <div className="space-y-10">
      {/* Simple Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-black">Přihlášky</h2>
          <div className="flex items-center gap-2 text-sm text-black">
            <span className={cn("h-2 w-2 rounded-full", hasChanges ? "bg-amber-500" : "bg-emerald-500")} />
            <span className="text-xs">{hasChanges ? "Neuloženo" : "Uloženo"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {/* Aktivace přihlášek */}
        <SectionBlock
          title="Aktivace přihlášek"
          description="Zapněte sběr přihlášek a nastavte časové období, kdy je formulář dostupný rodičům."
        >
          <div className="rounded-xl border border-slate-200 p-4">
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
                <Label htmlFor="enable-registrations" className="font-medium">
                  Povolit sběr přihlášek
                </Label>
                <p className="text-sm text-black">
                  Pokud je vypnuto, formulář nebude dostupný a rodiče se nemohou přihlašovat.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
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
              <p className="text-sm text-black">
                Od tohoto data se přihláškový formulář automaticky zpřístupní rodičům.
              </p>
            </div>
            <div className="space-y-2">
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
              <p className="text-sm text-black">
                Po tomto datu se formulář automaticky uzavře.
              </p>
            </div>
          </div>

          {!settings.isEnabled && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Přihlášky jsou momentálně pozastavené – ostatní sekce jsou uzamčené.
            </div>
          )}
        </SectionBlock>

        <Separator className="bg-slate-200" />

        {/* Sekce Účastník */}
        <SectionBlock
          title={
            <div className="flex items-center gap-2">
              <span>👶 Sekce „{settings.sectionNames.participant}"</span>
              <InfoTooltip content="Informace o dětech, které se účastní akce" />
            </div>
          }
          description=""
          disabled={sectionsDisabled}
        >
          <div className="space-y-4">
            <div className="space-y-2">
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
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
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
              <Separator className="bg-slate-200" />
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
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        {/* Sekce Rodič */}
        <SectionBlock
          title={
            <div className="flex items-center gap-2">
              <span>👨‍👩‍👧‍👦 Sekce „{settings.sectionNames.parent}"</span>
              <InfoTooltip content="Kontaktní údaje zákonných zástupců" />
            </div>
          }
          description=""
          disabled={sectionsDisabled}
        >
          <div className="space-y-4">
            <div className="space-y-2">
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
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
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
              <Separator className="bg-slate-200" />
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
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        {/* Sekce Ostatní */}
        <SectionBlock
          title={
            <div className="flex items-center gap-2">
              <span>📄 Sekce „Ostatní"</span>
              <InfoTooltip content="Doplňkové informace a právní souhlasy" />
            </div>
          }
          description=""
          disabled={sectionsDisabled}
        >
          <div className="space-y-3">
            <h4 className="font-medium text-black">Právní a doplňková pole</h4>
            <Separator className="bg-slate-200" />
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
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        {/* Doplňková nastavení */}
        <SectionBlock
          title="Doplňková nastavení přihlášek"
          description="Doladění logiky schvalování a čekací listiny."
          disabled={sectionsDisabled}
        >
          <div className="space-y-3">
            {ADDITIONAL_REGISTRATION_OPTIONS.map((option) => (
              <div
                key={option.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3"
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
          </div>
        </SectionBlock>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            Zrušit
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-500"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Ukládám..." : "Uložit nastavení"}
          </Button>
        </div>
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
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="font-medium text-black">{field.label}</span>
        {field.isSystem && (
          <span className="text-xs text-slate-500">(systémové)</span>
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

function SectionBlock({
  title,
  description,
  children,
  disabled,
}: {
  title: string | React.ReactNode
  description: string
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <section className={cn("space-y-5", disabled && "pointer-events-none opacity-60")}>
      <div>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        {description && <p className="text-sm text-black">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function InfoTooltip({ content }: { content: string }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Informace"
      >
        <Info className="h-3 w-3" />
      </button>
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs text-white bg-slate-800 rounded-lg shadow-lg whitespace-nowrap z-10">
          {content}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  )
}
