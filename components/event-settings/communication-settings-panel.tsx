"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionBlock } from "./section-block"

type CommunicationSettings = {
  senderName: string
  senderEmail: string
  senderBrand: string
  supportEmail: string
  supportPhone: string
  website: string
  socials: string
  primaryLanguage: string
  fallbackLanguage: string
  enableTranslations: boolean
  publicFaq: string
  codeOfConduct: string
  refundPolicy: string
  gdprConsentText: string
  // templates
  tplRegistrationSubject: string
  tplRegistrationBody: string
  tplPaymentSubject: string
  tplPaymentBody: string
  tplChangeSubject: string
  tplChangeBody: string
  tplCancelSubject: string
  tplCancelBody: string
  // reminders
  reminder7d: boolean
  reminder1d: boolean
  reminder2h: boolean
  afterThanks: boolean
  afterSurveyHours: number | ""
}

export function CommunicationSettingsPanel() {
  const [values, setValues] = useState<CommunicationSettings>({
    senderName: "Tým organizátora",
    senderEmail: "noreply@example.com",
    senderBrand: "",
    supportEmail: "support@example.com",
    supportPhone: "",
    website: "",
    socials: "",
    primaryLanguage: "cs",
    fallbackLanguage: "cs",
    enableTranslations: false,
    publicFaq: "",
    codeOfConduct: "",
    refundPolicy: "",
    gdprConsentText: "Souhlasím se zpracováním osobních údajů pro účely organizace akce.",
    tplRegistrationSubject: "Potvrzení registrace",
    tplRegistrationBody: "Děkujeme za registraci na naši akci.",
    tplPaymentSubject: "Potvrzení platby",
    tplPaymentBody: "Platba proběhla úspěšně.",
    tplChangeSubject: "Změna programu/termínu",
    tplChangeBody: "Došlo ke změně programu nebo termínu.",
    tplCancelSubject: "Zrušení akce",
    tplCancelBody: "Je nám líto, akce byla zrušena.",
    reminder7d: true,
    reminder1d: true,
    reminder2h: true,
    afterThanks: true,
    afterSurveyHours: 24,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const markDirty = () => setHasChanges(true)

  const handleSave = () => {
    setIsSaving(true)
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
      toast.success("Komunikační nastavení uloženo.")
      saveTimeoutRef.current = null
    }, 1000)
  }

  const handleTestSend = () => {
    toast.success("Testovací e-mail byl odeslán na adresu odesílatele.")
  }

  return (
    <div className="space-y-10">
      {/* Simple Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-foreground">Komunikace</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full", hasChanges ? "bg-amber-500" : "bg-emerald-500")} />
            <span className="text-xs">{hasChanges ? "Neuloženo" : "Uloženo"}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTestSend} className="gap-2" size="sm">
            <Send className="h-4 w-4" />
            Test
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-500"
            size="sm"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Ukládám..." : "Uložit"}
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        <SectionBlock title="Odesílatel" description="Identita v e-mailech a brand.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="senderName">Jméno odesílatele</Label>
              <Input
                id="senderName"
                value={values.senderName}
                onChange={(e) => {
                  setValues((v) => ({ ...v, senderName: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail">E-mail (reply-to)</Label>
              <Input
                id="senderEmail"
                type="email"
                value={values.senderEmail}
                onChange={(e) => {
                  setValues((v) => ({ ...v, senderEmail: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderBrand">Brand/Logo (URL)</Label>
              <Input
                id="senderBrand"
                placeholder="https://..."
                value={values.senderBrand}
                onChange={(e) => {
                  setValues((v) => ({ ...v, senderBrand: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Kontakty pro účastníky" description="Veřejné kontakty zobrazené na stránce akce.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="supportEmail">E-mail podpory</Label>
              <Input
                id="supportEmail"
                type="email"
                value={values.supportEmail}
                onChange={(e) => {
                  setValues((v) => ({ ...v, supportEmail: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportPhone">Telefon</Label>
              <Input
                id="supportPhone"
                value={values.supportPhone}
                onChange={(e) => {
                  setValues((v) => ({ ...v, supportPhone: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Web</Label>
              <Input
                id="website"
                placeholder="https://..."
                value={values.website}
                onChange={(e) => {
                  setValues((v) => ({ ...v, website: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label htmlFor="socials">Sociální sítě (odkazy)</Label>
            <Input
              id="socials"
              placeholder="oddělujte čárkou"
              value={values.socials}
              onChange={(e) => {
                setValues((v) => ({ ...v, socials: e.target.value }))
                markDirty()
              }}
            />
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Šablony e-mailů" description="Základní transakční šablony.">
          <div className="grid gap-6">
            <div>
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tplRegSub">Potvrzení registrace – Předmět</Label>
                  <Input
                    id="tplRegSub"
                    value={values.tplRegistrationSubject}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, tplRegistrationSubject: e.target.value }))
                      markDirty()
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tplPaySub">Potvrzení platby – Předmět</Label>
                  <Input
                    id="tplPaySub"
                    value={values.tplPaymentSubject}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, tplPaymentSubject: e.target.value }))
                      markDirty()
                    }}
                  />
                </div>
              </div>
              <div className="grid gap-3 lg:grid-cols-2 pt-2">
                <Textarea
                  className="min-h-28"
                  value={values.tplRegistrationBody}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, tplRegistrationBody: e.target.value }))
                    markDirty()
                  }}
                />
                <Textarea
                  className="min-h-28"
                  value={values.tplPaymentBody}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, tplPaymentBody: e.target.value }))
                    markDirty()
                  }}
                />
              </div>
            </div>
            <div>
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tplChangeSub">Změna programu/termínu – Předmět</Label>
                  <Input
                    id="tplChangeSub"
                    value={values.tplChangeSubject}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, tplChangeSubject: e.target.value }))
                      markDirty()
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tplCancelSub">Zrušení akce – Předmět</Label>
                  <Input
                    id="tplCancelSub"
                    value={values.tplCancelSubject}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, tplCancelSubject: e.target.value }))
                      markDirty()
                    }}
                  />
                </div>
              </div>
              <div className="grid gap-3 lg:grid-cols-2 pt-2">
                <Textarea
                  className="min-h-28"
                  value={values.tplChangeBody}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, tplChangeBody: e.target.value }))
                    markDirty()
                  }}
                />
                <Textarea
                  className="min-h-28"
                  value={values.tplCancelBody}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, tplCancelBody: e.target.value }))
                    markDirty()
                  }}
                />
              </div>
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Připomínky" description="Automatické e-maily před a po akci.">
          <div className="grid gap-4 lg:grid-cols-5">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.reminder7d}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, reminder7d: c === true }))
                  markDirty()
                }}
              />
              7 dní před akcí
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.reminder1d}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, reminder1d: c === true }))
                  markDirty()
                }}
              />
              1 den před akcí
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.reminder2h}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, reminder2h: c === true }))
                  markDirty()
                }}
              />
              2 hod před akcí
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.afterThanks}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, afterThanks: c === true }))
                  markDirty()
                }}
              />
              Poděkování po akci
            </label>
            <div className="flex items-center gap-2">
              <Label htmlFor="surveyAfter" className="whitespace-nowrap">Dotazník po (h)</Label>
              <Input
                id="surveyAfter"
                type="number"
                min={0}
                value={values.afterSurveyHours}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, afterSurveyHours: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Jazyk a lokalizace" description="Primární jazyk a fallback pro komunikaci.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="lang">Primární jazyk</Label>
              <select
                id="lang"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.primaryLanguage}
                onChange={(e) => {
                  setValues((v) => ({ ...v, primaryLanguage: e.target.value }))
                  markDirty()
                }}
              >
                <option value="cs">Čeština</option>
                <option value="en">Angličtina</option>
                <option value="sk">Slovenština</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fallback">Fallback jazyk</Label>
              <select
                id="fallback"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.fallbackLanguage}
                onChange={(e) => {
                  setValues((v) => ({ ...v, fallbackLanguage: e.target.value }))
                  markDirty()
                }}
              >
                <option value="cs">Čeština</option>
                <option value="en">Angličtina</option>
                <option value="sk">Slovenština</option>
              </select>
            </div>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.enableTranslations}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, enableTranslations: c === true }))
                  markDirty()
                }}
              />
              Povolit překlady šablon
            </label>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Veřejné informace" description="FAQ, pravidla účasti a GDPR souhlasy.">
          <div className="space-y-2">
            <Label htmlFor="faq">FAQ</Label>
            <Textarea
              id="faq"
              className="min-h-24"
              value={values.publicFaq}
              onChange={(e) => {
                setValues((v) => ({ ...v, publicFaq: e.target.value }))
                markDirty()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coc">Code of Conduct / Pravidla účasti</Label>
            <Textarea
              id="coc"
              className="min-h-24"
              value={values.codeOfConduct}
              onChange={(e) => {
                setValues((v) => ({ ...v, codeOfConduct: e.target.value }))
                markDirty()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="refund">Zásady vrácení</Label>
            <Textarea
              id="refund"
              className="min-h-24"
              value={values.refundPolicy}
              onChange={(e) => {
                setValues((v) => ({ ...v, refundPolicy: e.target.value }))
                markDirty()
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gdpr">GDPR souhlas (text)</Label>
            <Textarea
              id="gdpr"
              className="min-h-24"
              value={values.gdprConsentText}
              onChange={(e) => {
                setValues((v) => ({ ...v, gdprConsentText: e.target.value }))
                markDirty()
              }}
            />
          </div>
        </SectionBlock>
      </div>
    </div>
  )
}

