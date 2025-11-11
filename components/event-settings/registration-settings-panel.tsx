"use client"

import type { ReactNode } from "react"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Copy, ExternalLink, Info, Loader2, Save } from "lucide-react"
import {
  ADDITIONAL_REGISTRATION_OPTIONS,
  CATEGORY_BADGE_STYLES,
  IFRAME_SNIPPET,
  PUBLIC_FORM_LINK,
  REGISTRATION_FIELDS_TEMPLATE,
} from "./constants"
import type { RegistrationField, RegistrationSettings } from "./types"

export function RegistrationSettingsPanel() {
  const [settings, setSettings] = useState<RegistrationSettings>(() => ({
    isEnabled: true,
    startDate: "",
    endDate: "",
    requireAdminApproval: true,
    allowWaitlist: true,
    sendConfirmationEmail: true,
    showSummaryOnSubmit: true,
    fields: REGISTRATION_FIELDS_TEMPLATE.map((field) => ({ ...field })),
  }))
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [copyState, setCopyState] = useState<"link" | "iframe" | null>(null)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  const dateError = useMemo(() => {
    if (!settings.startDate || !settings.endDate) return ""
    if (settings.endDate < settings.startDate) {
      return "Datum ukončení nesmí být dříve než datum zahájení."
    }
    return ""
  }, [settings.endDate, settings.startDate])

  const sectionsDisabled = !settings.isEnabled

  const markAsDirty = () => setHasChanges(true)

  const handleFieldUpdate = (fieldId: string, updates: Partial<RegistrationField>) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((field) => {
        if (field.id !== fieldId) return field
        const nextField = { ...field, ...updates }
        if ("visible" in updates && updates.visible === false) {
          nextField.required = false
        }
        return nextField
      }),
    }))
    markAsDirty()
  }

  const handleSave = () => {
    if (dateError) {
      toast.error("Opravte prosím termíny sběru přihlášek.")
      return
    }

    setIsSaving(true)
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
      toast.success("Nastavení přihlášek bylo uloženo.")
      saveTimeoutRef.current = null
    }, 1200)
  }

  const handleCopy = async (value: string, variant: "link" | "iframe") => {
    try {
      await navigator.clipboard.writeText(value)
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
      setCopyState(variant)
      copyTimeoutRef.current = setTimeout(() => {
        setCopyState(null)
        copyTimeoutRef.current = null
      }, 2000)
    } catch {
      toast.error("Nepodařilo se zkopírovat obsah do schránky.")
    }
  }

  const handlePreview = () => {
    if (typeof window !== "undefined") {
      window.open(PUBLIC_FORM_LINK, "_blank", "noopener,noreferrer")
    }
  }

  const sections = [
    {
      key: "activation",
      content: (
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
                <p className="text-sm text-muted-foreground">
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
              <p className="text-sm text-muted-foreground">
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
              <p className="text-sm text-muted-foreground">
                Po tomto datu se formulář automaticky uzavře.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/60 p-3 text-sm text-emerald-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            Pokud není zadán žádný termín, přihlášky je možné sbírat bez časového omezení.
          </div>

          {!settings.isEnabled && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Přihlášky jsou momentálně pozastavené – ostatní sekce jsou uzamčené.
            </div>
          )}
        </SectionBlock>
      ),
    },
    {
      key: "fields",
      content: (
        <SectionBlock
          title="Pole přihlašovacího formuláře"
          description="Vyberte, která pole se mají zobrazovat rodičům a která z nich budou povinná."
          disabled={sectionsDisabled}
        >
          <RegistrationFieldsTable
            fields={settings.fields}
            disabled={sectionsDisabled}
            onFieldUpdate={handleFieldUpdate}
          />
          <p className="text-sm text-muted-foreground">
            Tato pole jsou standardizovaná napříč systémem. V budoucnu bude možné přidat i vlastní pole.
          </p>
        </SectionBlock>
      ),
    },
    {
      key: "options",
      content: (
        <SectionBlock
          title="Doplňková nastavení přihlášek"
          description="Doladění logiky schvalování, čekací listiny a notifikací."
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
                  <p className="text-sm text-muted-foreground">{option.helper}</p>
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
      ),
    },
    {
      key: "share",
      content: (
        <SectionBlock
          title="Náhled a vložení formuláře"
          description="Sdílejte přihláškový formulář s rodiči nebo jej vložte na vlastní web."
          disabled={sectionsDisabled}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="publicLink">Veřejný odkaz</Label>
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center sm:gap-3">
                <Input id="publicLink" value={PUBLIC_FORM_LINK} readOnly className="font-mono text-sm" />
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 whitespace-nowrap"
                  disabled={sectionsDisabled}
                  onClick={() => handleCopy(PUBLIC_FORM_LINK, "link")}
                >
                  <Copy className="h-4 w-4" />
                  Kopírovat
                </Button>
              </div>
              {copyState === "link" && <p className="text-xs text-emerald-600">Odkaz byl zkopírován do schránky.</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="iframeCode">Iframe kód</Label>
              <div className="rounded-xl border border-slate-200">
                <Textarea id="iframeCode" readOnly value={IFRAME_SNIPPET} className="h-36 font-mono text-sm" />
                <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3">
                  <p className="text-xs text-muted-foreground">
                    Vložte na svůj web a formulář se načte přímo v rámci stránky.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 whitespace-nowrap"
                    disabled={sectionsDisabled}
                    onClick={() => handleCopy(IFRAME_SNIPPET, "iframe")}
                  >
                    <Copy className="h-4 w-4" />
                    Kopírovat kód
                  </Button>
                </div>
              </div>
              {copyState === "iframe" && <p className="text-xs text-emerald-600">Iframe kód byl zkopírován.</p>}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 px-4 py-4">
              <div className="space-y-1">
                <p className="font-medium">Náhled formuláře</p>
                <p className="text-sm text-muted-foreground">
                  Formulář můžete vložit na svůj web pomocí kódu iframe nebo sdílet přímo odkaz.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                className="gap-2 whitespace-nowrap border border-emerald-200 bg-white text-emerald-700 shadow-none hover:bg-emerald-100"
                disabled={sectionsDisabled}
                onClick={handlePreview}
              >
                <ExternalLink className="h-4 w-4" />
                Zobrazit náhled
              </Button>
            </div>
          </div>
        </SectionBlock>
      ),
    },
  ]

  return (
    <div className="space-y-10">
      <div className="sticky top-0 z-20 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nastavení akce</p>
            <h2 className="text-xl font-semibold text-foreground">Přihlášky</h2>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="min-w-[160px] gap-2 bg-emerald-600 text-white hover:bg-emerald-500"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Ukládám..." : "Uložit změny"}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className={cn("h-2.5 w-2.5 rounded-full", hasChanges ? "bg-amber-500" : "bg-emerald-500")} />
            {hasChanges ? "Máte neuložené změny" : "Všechny změny jsou uložené"}
          </div>
          {dateError && <span className="text-sm font-medium text-red-600">{dateError}</span>}
        </div>
      </div>

      <div className="space-y-10">
        {sections.map((section, index) => (
          <Fragment key={section.key}>
            {section.content}
            {index < sections.length - 1 && <Separator className="bg-slate-200" />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function RegistrationFieldsTable({
  fields,
  disabled,
  onFieldUpdate,
}: {
  fields: RegistrationField[]
  disabled: boolean
  onFieldUpdate: (fieldId: string, updates: Partial<RegistrationField>) => void
}) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-muted/70 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Název pole</th>
            <th className="px-4 py-3 text-left font-medium">Kategorie</th>
            <th className="px-4 py-3 text-left font-medium">Zobrazit</th>
            <th className="px-4 py-3 text-left font-medium">Povinné</th>
            <th className="px-4 py-3 text-left font-medium">Popis</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id} className="border-t">
              <td className="px-4 py-3 font-medium text-foreground">{field.label}</td>
              <td className="px-4 py-3">
                <Badge variant="outline" className={cn("border bg-transparent text-xs", CATEGORY_BADGE_STYLES[field.category])}>
                  {field.category}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Switch
                  aria-label={`Zobrazit pole ${field.label}`}
                  checked={field.visible}
                  disabled={disabled}
                  onCheckedChange={(checked) => onFieldUpdate(field.id, { visible: checked === true })}
                />
              </td>
              <td className="px-4 py-3">
                <Switch
                  aria-label={`Nastavit pole ${field.label} jako povinné`}
                  checked={field.required}
                  disabled={disabled || !field.visible}
                  onCheckedChange={(checked) => onFieldUpdate(field.id, { required: checked === true })}
                />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionBlock({
  title,
  description,
  children,
  disabled,
}: {
  title: string
  description: string
  children: ReactNode
  disabled?: boolean
}) {
  return (
    <section className={cn("space-y-5", disabled && "pointer-events-none opacity-60")}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}
