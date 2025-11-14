"use client"

import { useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionBlock } from "./section-block"

type EventMode = "prezencni" | "online" | "hybrid"

type BasicSettings = {
  name: string
  slug: string
  summary: string
  description: string
  mode: EventMode
  startDate: string
  endDate: string
  timezone: string
  recurrence: "none" | "weekly" | "monthly"
  recurrenceUntil: string
  // venue
  venueName: string
  venueAddress: string
  venueHall: string
  mapUrl: string
  // online
  meetingUrl: string
  accessCode: string
  techNotes: string
  // capacity & registration
  capacity: number | ""
  perPersonLimit: number | ""
  enableWaitlist: boolean
  allowSubstitutions: boolean
  // visibility
  visibility: "public" | "unlisted" | "private"
  requireAccessCode: boolean
  allowIndexing: boolean
  // media & classification
  coverUrl: string
  category: string
  tags: string
  language: string
  ageRestriction: string
}

export function BasicSettingsPanel() {
  const [values, setValues] = useState<BasicSettings>({
    name: "",
    slug: "",
    summary: "",
    description: "",
    mode: "prezencni",
    startDate: "",
    endDate: "",
    timezone: "Europe/Prague",
    recurrence: "none",
    recurrenceUntil: "",
    venueName: "",
    venueAddress: "",
    venueHall: "",
    mapUrl: "",
    meetingUrl: "",
    accessCode: "",
    techNotes: "",
    capacity: "",
    perPersonLimit: "",
    enableWaitlist: true,
    allowSubstitutions: false,
    visibility: "public",
    requireAccessCode: false,
    allowIndexing: true,
    coverUrl: "",
    category: "",
    tags: "",
    language: "cs",
    ageRestriction: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const markDirty = () => setHasChanges(true)

  const dateError = useMemo(() => {
    if (!values.startDate || !values.endDate) return ""
    if (values.endDate < values.startDate) return "Datum ukončení nesmí být dříve než datum začátku."
    return ""
  }, [values.startDate, values.endDate])

  const handleSave = () => {
    if (!values.name.trim()) {
      toast.error("Název akce je povinný.")
      return
    }
    if (dateError) {
      toast.error("Opravte prosím datum a čas akce.")
      return
    }
    setIsSaving(true)
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
      toast.success("Základní nastavení uloženo.")
      saveTimeoutRef.current = null
    }, 1000)
  }

  const showVenue = values.mode === "prezencni" || values.mode === "hybrid"
  const showOnline = values.mode === "online" || values.mode === "hybrid"

  return (
    <div className="space-y-10">
      <div className="sticky top-0 z-20 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nastavení akce</p>
            <h2 className="text-xl font-semibold text-foreground">Základní informace</h2>
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
        <SectionBlock
          title="Základní údaje"
          description="Název a popis akce. Slug se generuje automaticky z názvu (lze upravit)."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Název akce</Label>
              <Input
                id="name"
                placeholder="Např. Letní tábor Junior 2025"
                value={values.name}
                onChange={(e) => {
                  const name = e.target.value
                  setValues((v) => ({
                    ...v,
                    name,
                    slug: v.slug || name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                  }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                placeholder="letni-tabor-junior-2025"
                value={values.slug}
                onChange={(e) => {
                  setValues((v) => ({ ...v, slug: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Krátký perex</Label>
            <Input
              id="summary"
              placeholder="Stručný popis do 280 znaků"
              value={values.summary}
              onChange={(e) => {
                setValues((v) => ({ ...v, summary: e.target.value }))
                markDirty()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Detailní popis</Label>
            <Textarea
              id="description"
              placeholder="Detail programu, ubytování, strava, co s sebou..."
              className="min-h-32"
              value={values.description}
              onChange={(e) => {
                setValues((v) => ({ ...v, description: e.target.value }))
                markDirty()
              }}
            />
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock
          title="Termín a režim"
          description="Zadejte časové údaje akce a zvolte režim konání."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="start">Začátek</Label>
              <Input
                id="start"
                type="datetime-local"
                value={values.startDate}
                onChange={(e) => {
                  setValues((v) => ({ ...v, startDate: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Konec</Label>
              <Input
                id="end"
                type="datetime-local"
                value={values.endDate}
                onChange={(e) => {
                  setValues((v) => ({ ...v, endDate: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tz">Časové pásmo</Label>
              <select
                id="tz"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.timezone}
                onChange={(e) => {
                  setValues((v) => ({ ...v, timezone: e.target.value }))
                  markDirty()
                }}
              >
                <option value="Europe/Prague">Europe/Prague (GMT+1)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="mode">Mód akce</Label>
              <select
                id="mode"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.mode}
                onChange={(e) => {
                  setValues((v) => ({ ...v, mode: e.target.value as EventMode }))
                  markDirty()
                }}
              >
                <option value="prezencni">Prezenční</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recurrence">Opakování</Label>
              <select
                id="recurrence"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.recurrence}
                onChange={(e) => {
                  setValues((v) => ({ ...v, recurrence: e.target.value as BasicSettings["recurrence"] }))
                  markDirty()
                }}
              >
                <option value="none">Žádné</option>
                <option value="weekly">Týdenní</option>
                <option value="monthly">Měsíční</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rec-until">Opakovat do</Label>
              <Input
                id="rec-until"
                type="date"
                disabled={values.recurrence === "none"}
                value={values.recurrenceUntil}
                onChange={(e) => {
                  setValues((v) => ({ ...v, recurrenceUntil: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/60 p-3 text-sm text-emerald-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            Pole se dynamicky mění dle zvoleného módu akce.
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        {showVenue && (
          <SectionBlock
            title="Místo konání"
            description="Detaily o místě, kde se akce koná."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="venueName">Název místa</Label>
                <Input
                  id="venueName"
                  value={values.venueName}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, venueName: e.target.value }))
                    markDirty()
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueHall">Sál / místnost</Label>
                <Input
                  id="venueHall"
                  value={values.venueHall}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, venueHall: e.target.value }))
                    markDirty()
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mapUrl">URL mapy</Label>
                <Input
                  id="mapUrl"
                  placeholder="https://maps.google.com/..."
                  value={values.mapUrl}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, mapUrl: e.target.value }))
                    markDirty()
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venueAddress">Adresa</Label>
              <Input
                id="venueAddress"
                placeholder="Ulice, č.p., město"
                value={values.venueAddress}
                onChange={(e) => {
                  setValues((v) => ({ ...v, venueAddress: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </SectionBlock>
        )}

        {showOnline && (
          <>
            <Separator className="bg-slate-200" />
            <SectionBlock
              title="Online přístup"
              description="Detaily pro online připojení účastníků."
            >
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="meetingUrl">Přístupová URL</Label>
                  <Input
                    id="meetingUrl"
                    placeholder="https://..."
                    value={values.meetingUrl}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, meetingUrl: e.target.value }))
                      markDirty()
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessCode">Přístupový kód</Label>
                  <Input
                    id="accessCode"
                    value={values.accessCode}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, accessCode: e.target.value }))
                      markDirty()
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="techNotes">Technické instrukce</Label>
                <Textarea
                  id="techNotes"
                  placeholder="Požadavky na prohlížeč, test připojení, mikrofon..."
                  className="min-h-24"
                  value={values.techNotes}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, techNotes: e.target.value }))
                    markDirty()
                  }}
                />
              </div>
            </SectionBlock>
          </>
        )}

        <Separator className="bg-slate-200" />

        <SectionBlock
          title="Kapacita a registrace"
          description="Nastavte kapacitu akce a limity na osobu. Detailní logiku najdete v sekci Přihlášky."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="capacity">Celková kapacita</Label>
              <Input
                id="capacity"
                type="number"
                min={0}
                value={values.capacity}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, capacity: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="perPerson">Limit na osobu</Label>
              <Input
                id="perPerson"
                type="number"
                min={0}
                value={values.perPersonLimit}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, perPersonLimit: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3">
              <Checkbox
                checked={values.enableWaitlist}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, enableWaitlist: c === true }))
                  markDirty()
                }}
              />
              <span>
                <span className="font-medium">Zapnout čekací listinu</span>
                <p className="text-sm text-muted-foreground">Pokud je kapacita plná, nové přihlášky se zařadí na čekací listinu.</p>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <Checkbox
                checked={values.allowSubstitutions}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, allowSubstitutions: c === true }))
                  markDirty()
                }}
              />
              <span>
                <span className="font-medium">Povolit přepis účastníků</span>
                <p className="text-sm text-muted-foreground">Umožní nahradit účastníka jinou osobou před zahájením akce.</p>
              </span>
            </label>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock
          title="Viditelnost a publikace"
          description="Určete, kdo akci uvidí a zda bude zařazena do vyhledávání."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="visibility">Viditelnost</Label>
              <select
                id="visibility"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.visibility}
                onChange={(e) => {
                  setValues((v) => ({ ...v, visibility: e.target.value as BasicSettings["visibility"] }))
                  markDirty()
                }}
              >
                <option value="public">Veřejná</option>
                <option value="unlisted">Nezveřejněná</option>
                <option value="private">Soukromá</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requireAccess">Přístupový kód</Label>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="requireAccess"
                  checked={values.requireAccessCode}
                  onCheckedChange={(c) => {
                    setValues((v) => ({ ...v, requireAccessCode: c === true }))
                    markDirty()
                  }}
                />
                <Input
                  placeholder="volitelný kód"
                  value={values.accessCode}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, accessCode: e.target.value }))
                    markDirty()
                  }}
                  disabled={!values.requireAccessCode}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="indexing">Indexace ve vyhledávání</Label>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="indexing"
                  checked={values.allowIndexing}
                  onCheckedChange={(c) => {
                    setValues((v) => ({ ...v, allowIndexing: c === true }))
                    markDirty()
                  }}
                />
                <span className="text-sm text-muted-foreground">Povolit zobrazení v katalozích a vyhledávačích</span>
              </div>
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock
          title="Média a klasifikace"
          description="Volitelné — použijte ke snadnějšímu vyhledání a prezentaci akce."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="cover">URL cover obrázku (16:9)</Label>
              <Input
                id="cover"
                placeholder="https://..."
                value={values.coverUrl}
                onChange={(e) => {
                  setValues((v) => ({ ...v, coverUrl: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Input
                id="category"
                placeholder="Např. Tábory"
                value={values.category}
                onChange={(e) => {
                  setValues((v) => ({ ...v, category: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Štítky</Label>
              <Input
                id="tags"
                placeholder="oddělujte čárkou (např. sport, příroda)"
                value={values.tags}
                onChange={(e) => {
                  setValues((v) => ({ ...v, tags: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="language">Jazyk akce</Label>
              <select
                id="language"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.language}
                onChange={(e) => {
                  setValues((v) => ({ ...v, language: e.target.value }))
                  markDirty()
                }}
              >
                <option value="cs">Čeština</option>
                <option value="en">Angličtina</option>
                <option value="sk">Slovenština</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageRestriction">Věkové omezení</Label>
              <Input
                id="ageRestriction"
                placeholder="např. 8+ nebo 8–15"
                value={values.ageRestriction}
                onChange={(e) => {
                  setValues((v) => ({ ...v, ageRestriction: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>
      </div>
    </div>
  )
}

