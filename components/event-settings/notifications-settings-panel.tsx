"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2, BellRing, Webhook } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionBlock } from "./section-block"

type NotificationSettings = {
  channelEmail: boolean
  channelSms: boolean
  channelPush: boolean
  trigNewRegistration: boolean
  trigPaymentConfirmed: boolean
  trigDateChanged: boolean
  trigCanceled: boolean
  trigWaitlistPromoted: boolean
  trigTeamNewOrder: boolean
  trigTeamLowStock: boolean
  trigTeamRefund: boolean
  trigTeamPaymentError: boolean
  rem7d: boolean
  rem1d: boolean
  rem2h: boolean
  quietHoursEnabled: boolean
  quietFrom: string
  quietTo: string
  maxPer12h: number | ""
  segUnpaid: boolean
  segVIP: boolean
  segSpeakers: boolean
  segPartners: boolean
  segWaitlist: boolean
  webhookUrl: string
  webhookSecret: string
  testMode: boolean
}

export function NotificationsSettingsPanel() {
  const [values, setValues] = useState<NotificationSettings>({
    channelEmail: true,
    channelSms: false,
    channelPush: false,
    trigNewRegistration: true,
    trigPaymentConfirmed: true,
    trigDateChanged: true,
    trigCanceled: true,
    trigWaitlistPromoted: true,
    trigTeamNewOrder: true,
    trigTeamLowStock: true,
    trigTeamRefund: true,
    trigTeamPaymentError: true,
    rem7d: true,
    rem1d: true,
    rem2h: true,
    quietHoursEnabled: false,
    quietFrom: "20:00",
    quietTo: "08:00",
    maxPer12h: 3,
    segUnpaid: false,
    segVIP: false,
    segSpeakers: false,
    segPartners: false,
    segWaitlist: false,
    webhookUrl: "",
    webhookSecret: "",
    testMode: false,
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
      toast.success("Notifikační nastavení uloženo.")
      saveTimeoutRef.current = null
    }, 1000)
  }

  const testWebhook = () => {
    if (!values.webhookUrl) {
      toast.error("Zadejte URL webhooku pro test.")
      return
    }
    toast.success("Testovací webhook odeslán.")
  }

  return (
    <div className="space-y-10">
      <div className="sticky top-0 z-20 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nastavení akce</p>
            <h2 className="text-xl font-semibold text-foreground">Notifikace</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={testWebhook}>
              <Webhook className="h-4 w-4" />
              Test webhook
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="min-w-[140px] gap-2 bg-emerald-600 text-white hover:bg-emerald-500"
            >
              {isSaving ? <BellRing className="h-4 w-4 animate-pulse" /> : <Save className="h-4 w-4" />}
              {isSaving ? "Ukládám..." : "Uložit"}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className={cn("h-2.5 w-2.5 rounded-full", hasChanges ? "bg-amber-500" : "bg-emerald-500")} />
            {hasChanges ? "Máte neuložené změny" : "Všechny změny jsou uložené"}
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <SectionBlock title="Kanály" description="Zapněte kanály, které chcete používat.">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.channelEmail}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, channelEmail: c === true }))
                  markDirty()
                }}
              />
              E-mail
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.channelSms}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, channelSms: c === true }))
                  markDirty()
                }}
              />
              SMS
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.channelPush}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, channelPush: c === true }))
                  markDirty()
                }}
              />
              Push (web/app)
            </label>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Spouštěče – účastníci" description="Události, které spouští upozornění účastníkům.">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigNewRegistration}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigNewRegistration: c === true }))
                  markDirty()
                }}
              />
              Nová registrace
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigPaymentConfirmed}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigPaymentConfirmed: c === true }))
                  markDirty()
                }}
              />
              Potvrzení platby
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigWaitlistPromoted}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigWaitlistPromoted: c === true }))
                  markDirty()
                }}
              />
              Přesun z čekací listiny
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigDateChanged}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigDateChanged: c === true }))
                  markDirty()
                }}
              />
              Změna termínu/místa
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigCanceled}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigCanceled: c === true }))
                  markDirty()
                }}
              />
              Zrušení akce
            </label>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Spouštěče – tým" description="Upozornění pro organizátory a tým.">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigTeamNewOrder}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigTeamNewOrder: c === true }))
                  markDirty()
                }}
              />
              Nová objednávka
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigTeamLowStock}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigTeamLowStock: c === true }))
                  markDirty()
                }}
              />
              Nízká zásoba vstupenek
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigTeamRefund}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigTeamRefund: c === true }))
                  markDirty()
                }}
              />
              Refundace / chargeback
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.trigTeamPaymentError}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, trigTeamPaymentError: c === true }))
                  markDirty()
                }}
              />
              Chyba platby / integrace
            </label>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Připomínky" description="Plán připomínek před a po akci.">
          <div className="grid gap-4 lg:grid-cols-5">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.rem7d}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, rem7d: c === true }))
                  markDirty()
                }}
              />
              7 dní před
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.rem1d}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, rem1d: c === true }))
                  markDirty()
                }}
              />
              1 den před
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.rem2h}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, rem2h: c === true }))
                  markDirty()
                }}
              />
              2 hod před
            </label>
            <div className="flex items-center gap-2">
              <Label htmlFor="quietFrom" className="whitespace-nowrap">Tiché hodiny</Label>
              <Input
                id="quietFrom"
                type="time"
                value={values.quietFrom}
                onChange={(e) => {
                  setValues((v) => ({ ...v, quietFrom: e.target.value }))
                  markDirty()
                }}
              />
              <span>–</span>
              <Input
                id="quietTo"
                type="time"
                value={values.quietTo}
                onChange={(e) => {
                  setValues((v) => ({ ...v, quietTo: e.target.value }))
                  markDirty()
                }}
              />
              <label className="ml-3 flex items-center gap-2">
                <Checkbox
                  checked={values.quietHoursEnabled}
                  onCheckedChange={(c) => {
                    setValues((v) => ({ ...v, quietHoursEnabled: c === true }))
                    markDirty()
                  }}
                />
                Aktivní
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="maxPer12h" className="whitespace-nowrap">Max. / 12 h / osoba</Label>
              <Input
                id="maxPer12h"
                type="number"
                min={0}
                value={values.maxPer12h}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, maxPer12h: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Segmentace" description="Zacílení notifikací na vybrané skupiny účastníků.">
          <div className="grid gap-4 lg:grid-cols-5">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.segUnpaid}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, segUnpaid: c === true }))
                  markDirty()
                }}
              />
              Neuhrazené
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.segVIP}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, segVIP: c === true }))
                  markDirty()
                }}
              />
              VIP
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.segSpeakers}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, segSpeakers: c === true }))
                  markDirty()
                }}
              />
              Řečníci
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.segPartners}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, segPartners: c === true }))
                  markDirty()
                }}
              />
              Partneři
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.segWaitlist}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, segWaitlist: c === true }))
                  markDirty()
                }}
              />
              Čekací listina
            </label>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Integrace" description="Webhooky a testovací režim.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://example.com/webhook"
                value={values.webhookUrl}
                onChange={(e) => {
                  setValues((v) => ({ ...v, webhookUrl: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Tajný podpis</Label>
              <Input
                id="webhookSecret"
                value={values.webhookSecret}
                onChange={(e) => {
                  setValues((v) => ({ ...v, webhookSecret: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="pt-3">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.testMode}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, testMode: c === true }))
                  markDirty()
                }}
              />
              Testovací režim (odesílat pouze organizátorům)
            </label>
          </div>
        </SectionBlock>
      </div>
    </div>
  )
}

