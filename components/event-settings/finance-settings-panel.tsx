"use client"

import { useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionBlock } from "./section-block"

type PriceModel = "free" | "paid" | "donation"

type Ticket = {
  id: string
  name: string
  price: number | ""
  quota: number | ""
  perPersonLimit: number | ""
  visible: boolean
}

type FinanceSettings = {
  currency: string
  vatMode: "with" | "without"
  defaultVat: number | ""
  priceModel: PriceModel
  basePrice: number | ""
  tickets: Ticket[]
  feesPaidBy: "organizer" | "participant"
  rounding: "none" | "up" | "down"
  minOrderAmount: number | ""
  paymentsCard: boolean
  paymentsBank: boolean
  paymentsOnsite: boolean
  paymentWindowMinutes: number | ""
  cartExpiryMinutes: number | ""
  refundPolicy: string
  refundDeadlineDays: number | ""
  refundFee: number | ""
  discountsEnabled: boolean
  invoiceIssuer: string
  invoiceVatId: string
  payoutIban: string
  invoiceSeries: string
}

export function FinanceSettingsPanel() {
  const [values, setValues] = useState<FinanceSettings>({
    currency: "CZK",
    vatMode: "with",
    defaultVat: 21,
    priceModel: "paid",
    basePrice: 0,
    tickets: [
      { id: crypto.randomUUID(), name: "Základní vstupné", price: 0, quota: "", perPersonLimit: 1, visible: true },
    ],
    feesPaidBy: "participant",
    rounding: "none",
    minOrderAmount: "",
    paymentsCard: true,
    paymentsBank: true,
    paymentsOnsite: false,
    paymentWindowMinutes: 30,
    cartExpiryMinutes: 15,
    refundPolicy: "Do 7 dní před akcí plná refundace, poté 50%.",
    refundDeadlineDays: 7,
    refundFee: 0,
    discountsEnabled: false,
    invoiceIssuer: "",
    invoiceVatId: "",
    payoutIban: "",
    invoiceSeries: "2025-A",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const markDirty = () => setHasChanges(true)

  const vatError = useMemo(() => {
    if (values.defaultVat === "") return ""
    const v = Number(values.defaultVat)
    if (isNaN(v) || v < 0 || v > 100) return "Sazba DPH musí být v rozsahu 0–100 %."
    return ""
  }, [values.defaultVat])

  const handleSave = () => {
    if (vatError) {
      toast.error("Zkontrolujte prosím sazbu DPH.")
      return
    }
    setIsSaving(true)
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
      toast.success("Finanční nastavení uloženo.")
      saveTimeoutRef.current = null
    }, 1000)
  }

  const updateTicket = (id: string, patch: Partial<Ticket>) => {
    setValues((v) => ({
      ...v,
      tickets: v.tickets.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }))
    markDirty()
  }

  const addTicket = () => {
    setValues((v) => ({
      ...v,
      tickets: [
        ...v.tickets,
        { id: crypto.randomUUID(), name: "Nový typ", price: "", quota: "", perPersonLimit: "", visible: true },
      ],
    }))
    markDirty()
  }

  const removeTicket = (id: string) => {
    setValues((v) => ({ ...v, tickets: v.tickets.filter((t) => t.id !== id) }))
    markDirty()
  }

  return (
    <div className="space-y-10">
      <div className="sticky top-0 z-20 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nastavení akce</p>
            <h2 className="text-xl font-semibold text-foreground">Finance</h2>
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
          {vatError && <span className="text-sm font-medium text-red-600">{vatError}</span>}
        </div>
      </div>

      <div className="space-y-10">
        <SectionBlock
          title="Měna a DPH"
          description="Vyberte výchozí měnu a režim DPH."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="currency">Měna</Label>
              <select
                id="currency"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.currency}
                onChange={(e) => {
                  setValues((v) => ({ ...v, currency: e.target.value }))
                  markDirty()
                }}
              >
                <option value="CZK">CZK</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatMode">Ceny</Label>
              <select
                id="vatMode"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.vatMode}
                onChange={(e) => {
                  setValues((v) => ({ ...v, vatMode: e.target.value as FinanceSettings["vatMode"] }))
                  markDirty()
                }}
              >
                <option value="with">s DPH</option>
                <option value="without">bez DPH</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatRate">Výchozí sazba DPH (%)</Label>
              <Input
                id="vatRate"
                type="number"
                min={0}
                max={100}
                value={values.defaultVat}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, defaultVat: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock
          title="Model ceny"
          description="Zvolte, zda je akce zdarma, placená nebo na dobrovolný příspěvek."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="priceModel">Režim</Label>
              <select
                id="priceModel"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.priceModel}
                onChange={(e) => {
                  setValues((v) => ({ ...v, priceModel: e.target.value as PriceModel }))
                  markDirty()
                }}
              >
                <option value="free">Zdarma</option>
                <option value="paid">Placená</option>
                <option value="donation">Dobrovolný příspěvek</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="basePrice">Výchozí cena (základní vstup)</Label>
              <Input
                id="basePrice"
                type="number"
                min={0}
                value={values.basePrice}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, basePrice: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
                disabled={values.priceModel === "free"}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock
          title="Typy vstupenek"
          description="Vytvořte různé typy vstupenek s cenou, kvótou a viditelností."
        >
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/70 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Název</th>
                  <th className="px-4 py-3 text-left font-medium">Cena</th>
                  <th className="px-4 py-3 text-left font-medium">Kvóta</th>
                  <th className="px-4 py-3 text-left font-medium">Limit/os.</th>
                  <th className="px-4 py-3 text-left font-medium">Veřejná</th>
                  <th className="px-4 py-3 text-left font-medium">Akce</th>
                </tr>
              </thead>
              <tbody>
                {values.tickets.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-4 py-2">
                      <Input
                        value={t.name}
                        onChange={(e) => updateTicket(t.id, { name: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        min={0}
                        value={t.price}
                        onChange={(e) => updateTicket(t.id, { price: e.target.value === "" ? "" : Number(e.target.value) })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        min={0}
                        value={t.quota}
                        onChange={(e) => updateTicket(t.id, { quota: e.target.value === "" ? "" : Number(e.target.value) })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        min={0}
                        value={t.perPersonLimit}
                        onChange={(e) =>
                          updateTicket(t.id, { perPersonLimit: e.target.value === "" ? "" : Number(e.target.value) })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Checkbox
                        checked={t.visible}
                        onCheckedChange={(c) => updateTicket(t.id, { visible: c === true })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Button variant="outline" size="sm" onClick={() => removeTicket(t.id)}>
                        Odebrat
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-3">
            <Button variant="outline" onClick={addTicket}>
              Přidat typ vstupenky
            </Button>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Poplatky" description="Určete, kdo nese poplatky a zaokrouhlování.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="feesPaidBy">Kdo nese poplatky</Label>
              <select
                id="feesPaidBy"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.feesPaidBy}
                onChange={(e) => {
                  setValues((v) => ({ ...v, feesPaidBy: e.target.value as FinanceSettings["feesPaidBy"] }))
                  markDirty()
                }}
              >
                <option value="organizer">Organizátor</option>
                <option value="participant">Účastník</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rounding">Zaokrouhlování</Label>
              <select
                id="rounding"
                className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm"
                value={values.rounding}
                onChange={(e) => {
                  setValues((v) => ({ ...v, rounding: e.target.value as FinanceSettings["rounding"] }))
                  markDirty()
                }}
              >
                <option value="none">Bez</option>
                <option value="up">Nahoru</option>
                <option value="down">Dolů</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="minOrder">Minimální částka objednávky</Label>
              <Input
                id="minOrder"
                type="number"
                min={0}
                value={values.minOrderAmount}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, minOrderAmount: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Platby" description="Vyberte dostupné metody a časové limity.">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.paymentsCard}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, paymentsCard: c === true }))
                  markDirty()
                }}
              />
              Platba kartou
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.paymentsBank}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, paymentsBank: c === true }))
                  markDirty()
                }}
              />
              Bankovní převod
            </label>
            <label className="flex items-center gap-3">
              <Checkbox
                checked={values.paymentsOnsite}
                onCheckedChange={(c) => {
                  setValues((v) => ({ ...v, paymentsOnsite: c === true }))
                  markDirty()
                }}
              />
              Platba na místě
            </label>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 pt-4">
            <div className="space-y-2">
              <Label htmlFor="paymentWindow">Platební okno (minuty)</Label>
              <Input
                id="paymentWindow"
                type="number"
                min={0}
                value={values.paymentWindowMinutes}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, paymentWindowMinutes: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cartExpiry">Expirace košíku (minuty)</Label>
              <Input
                id="cartExpiry"
                type="number"
                min={0}
                value={values.cartExpiryMinutes}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, cartExpiryMinutes: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Refundace a storno" description="Nastavte pravidla a poplatky spojené s vracením plateb.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="refundDeadline">Deadline (dní před akcí)</Label>
              <Input
                id="refundDeadline"
                type="number"
                min={0}
                value={values.refundDeadlineDays}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, refundDeadlineDays: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refundFee">Storno poplatek (%)</Label>
              <Input
                id="refundFee"
                type="number"
                min={0}
                max={100}
                value={values.refundFee}
                onChange={(e) => {
                  const val = e.target.value
                  setValues((v) => ({ ...v, refundFee: val === "" ? "" : Number(val) }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label htmlFor="refundPolicy">Pravidla refundace</Label>
            <Textarea
              id="refundPolicy"
              className="min-h-24"
              value={values.refundPolicy}
              onChange={(e) => {
                setValues((v) => ({ ...v, refundPolicy: e.target.value }))
                markDirty()
              }}
            />
          </div>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Slevy" description="Správa slev a promo kódů (základní nástřel).">
          <label className="flex items-center gap-3">
            <Checkbox
              checked={values.discountsEnabled}
              onCheckedChange={(c) => {
                setValues((v) => ({ ...v, discountsEnabled: c === true }))
                markDirty()
              }}
            />
            Povolit slevy a promo kódy
          </label>
          <p className="text-sm text-muted-foreground pt-1">
            Detailní správu promo kódů doplníme později.
          </p>
        </SectionBlock>

        <Separator className="bg-slate-200" />

        <SectionBlock title="Fakturace a výplaty" description="Zadejte fakturační údaje a výplatní účet.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="issuer">Fakturační subjekt</Label>
              <Input
                id="issuer"
                placeholder="Název organizátora"
                value={values.invoiceIssuer}
                onChange={(e) => {
                  setValues((v) => ({ ...v, invoiceIssuer: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatId">DIČ/DPH</Label>
              <Input
                id="vatId"
                placeholder="CZ12345678"
                value={values.invoiceVatId}
                onChange={(e) => {
                  setValues((v) => ({ ...v, invoiceVatId: e.target.value }))
                  markDirty()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                placeholder="CZ65 0800 0000 0000 0000 0000"
                value={values.payoutIban}
                onChange={(e) => {
                  setValues((v) => ({ ...v, payoutIban: e.target.value }))
                  markDirty()
                }}
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label htmlFor="series">Číselná řada faktur</Label>
            <Input
              id="series"
              placeholder="např. 2025-A"
              value={values.invoiceSeries}
              onChange={(e) => {
                setValues((v) => ({ ...v, invoiceSeries: e.target.value }))
                markDirty()
              }}
            />
          </div>
        </SectionBlock>
      </div>
    </div>
  )
}

