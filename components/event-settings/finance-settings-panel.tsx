"use client"

import { useState, useEffect } from "react"
import { useEvents } from "@/lib/event-context"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Coins, Percent, Ticket, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { Event, Discount, DiscountCode } from "@/lib/types"

export function FinanceSettingsPanel() {
  const params = useParams()
  const eventId = params?.id as string
  const { getEventById, updateEvent } = useEvents()
  const event = getEventById(eventId)

  const [formData, setFormData] = useState({
    price: "",
    allowInstallments: false,
    depositAmount: "",
    finalPaymentAmount: "",
    depositDueDate: "",
    finalPaymentDueDate: "",
    paymentDueDate: "",
    paymentMethods: [] as ("transfer" | "cash")[],
    bankAccount: "",
    allowDiscounts: false,
    discounts: [] as Discount[],
    allowDiscountCodes: false,
    discountCodes: [] as DiscountCode[],
  })

  // Dialog states for editing
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null)
  const [showDiscountForm, setShowDiscountForm] = useState(false)
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null)
  const [showCodeForm, setShowCodeForm] = useState(false)

  useEffect(() => {
    if (event) {
      const finalPayment = event.allowInstallments && event.depositAmount
        ? (event.price || 0) - event.depositAmount
        : 0

      setFormData({
        price: event.price?.toString() || "",
        allowInstallments: event.allowInstallments || false,
        depositAmount: event.depositAmount?.toString() || "",
        finalPaymentAmount: finalPayment.toString(),
        depositDueDate: event.depositDueDate || "",
        finalPaymentDueDate: event.finalPaymentDueDate || "",
        paymentDueDate: event.paymentDueDate || "",
        paymentMethods: event.paymentMethods || [],
        bankAccount: event.bankAccount || "",
        allowDiscounts: event.allowDiscounts || false,
        discounts: event.discounts || [],
        allowDiscountCodes: event.allowDiscountCodes || false,
        discountCodes: event.discountCodes || [],
      })
    }
  }, [event])

  // Auto-calculate final payment when deposit changes
  useEffect(() => {
    if (formData.allowInstallments && formData.depositAmount && formData.price) {
      const deposit = parseFloat(formData.depositAmount)
      const price = parseFloat(formData.price)
      const final = price - deposit
      setFormData(prev => ({ ...prev, finalPaymentAmount: final.toString() }))
    }
  }, [formData.depositAmount, formData.price, formData.allowInstallments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const price = parseFloat(formData.price)
    if (!formData.price || isNaN(price) || price < 0) {
      toast.error("Vyplňte prosím platnou základní cenu")
      return
    }

    if (formData.paymentMethods.length === 0) {
      toast.error("Vyberte prosím alespoň jednu platební metodu")
      return
    }

    // Validate installments
    if (formData.allowInstallments) {
      const deposit = parseFloat(formData.depositAmount)
      if (!formData.depositAmount || isNaN(deposit) || deposit <= 0) {
        toast.error("Vyplňte prosím platnou výši zálohy")
        return
      }
      if (deposit > price) {
        toast.error("Záloha nesmí být vyšší než základní cena")
        return
      }
      if (formData.depositDueDate && formData.finalPaymentDueDate) {
        if (new Date(formData.finalPaymentDueDate) <= new Date(formData.depositDueDate)) {
          toast.error("Datum splatnosti doplatku musí být po datu splatnosti zálohy")
          return
        }
      }
    }

    // Validate discounts
    for (const discount of formData.discounts) {
      if (discount.type === "percentage" && (discount.value < 1 || discount.value > 100)) {
        toast.error(`Sleva "${discount.name}": Hodnota v % musí být 1-100`)
        return
      }
      if (discount.type === "fixed" && discount.value >= price) {
        toast.error(`Sleva "${discount.name}": Hodnota v Kč musí být nižší než cena akce`)
        return
      }
    }

    // Validate discount codes
    for (const code of formData.discountCodes) {
      if (code.type === "percentage" && (code.value < 1 || code.value > 100)) {
        toast.error(`Kupón "${code.code}": Hodnota v % musí být 1-100`)
        return
      }
      if (code.type === "fixed" && code.value >= price) {
        toast.error(`Kupón "${code.code}": Hodnota v Kč musí být nižší než cena akce`)
        return
      }
      if (code.usageLimit && code.usageLimit <= 0) {
        toast.error(`Kupón "${code.code}": Počet použití musí být větší než 0`)
        return
      }
    }

    try {
      const updatedEvent: Partial<Event> = {
        price: parseFloat(formData.price),
        allowInstallments: formData.allowInstallments,
        depositAmount: formData.allowInstallments ? parseFloat(formData.depositAmount) : undefined,
        finalPaymentAmount: formData.allowInstallments ? parseFloat(formData.finalPaymentAmount) : undefined,
        depositDueDate: formData.allowInstallments ? formData.depositDueDate || undefined : undefined,
        finalPaymentDueDate: formData.allowInstallments ? formData.finalPaymentDueDate || undefined : undefined,
        paymentDueDate: !formData.allowInstallments ? formData.paymentDueDate || undefined : undefined,
        paymentMethods: formData.paymentMethods,
        bankAccount: formData.bankAccount || undefined,
        allowDiscounts: formData.allowDiscounts,
        discounts: formData.allowDiscounts ? formData.discounts : [],
        allowDiscountCodes: formData.allowDiscountCodes,
        discountCodes: formData.allowDiscountCodes ? formData.discountCodes : [],
        updatedAt: new Date().toISOString(),
      }

      await updateEvent(eventId, updatedEvent)
      toast.success("Finanční nastavení bylo uloženo")
    } catch (error) {
      console.error("Failed to save finance settings:", error)
      toast.error("Chyba při ukládání nastavení")
    }
  }

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePaymentMethod = (method: "transfer" | "cash") => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }))
  }

  const handleSaveDiscount = (discount: Discount) => {
    if (editingDiscount) {
      setFormData(prev => ({
        ...prev,
        discounts: prev.discounts.map(d => d.id === discount.id ? discount : d)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        discounts: [...prev.discounts, { ...discount, id: crypto.randomUUID() }]
      }))
    }
    setShowDiscountForm(false)
    setEditingDiscount(null)
  }

  const handleDeleteDiscount = (id: string) => {
    setFormData(prev => ({
      ...prev,
      discounts: prev.discounts.filter(d => d.id !== id)
    }))
  }

  const handleSaveCode = (code: DiscountCode) => {
    // Check for duplicate code
    const isDuplicate = formData.discountCodes.some(
      c => c.code.toLowerCase() === code.code.toLowerCase() && c.id !== code.id
    )
    if (isDuplicate) {
      toast.error("Tento kód už existuje")
      return
    }

    if (editingCode) {
      setFormData(prev => ({
        ...prev,
        discountCodes: prev.discountCodes.map(c => c.id === code.id ? code : c)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        discountCodes: [...prev.discountCodes, { ...code, id: crypto.randomUUID(), usageCount: 0 }]
      }))
    }
    setShowCodeForm(false)
    setEditingCode(null)
  }

  const handleDeleteCode = (id: string) => {
    setFormData(prev => ({
      ...prev,
      discountCodes: prev.discountCodes.filter(c => c.id !== id)
    }))
  }

  const getCodeStatus = (code: DiscountCode): "active" | "expired" | "exhausted" => {
    const now = new Date()
    if (code.validUntil && new Date(code.validUntil) < now) return "expired"
    if (code.usageLimit && code.usageCount && code.usageCount >= code.usageLimit) return "exhausted"
    return "active"
  }

  const getCodeStatusLabel = (status: string) => {
    switch (status) {
      case "active": return <span className="text-green-600">Aktivní</span>
      case "expired": return <span className="text-red-600">Vypršelo</span>
      case "exhausted": return <span className="text-orange-600">Vyčerpáno</span>
      default: return status
    }
  }

  if (!event) {
    return (
      <div className="text-center py-12 text-black">
        <p>Akce nebyla nalezena</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cena a platba */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Cena a platba
          </CardTitle>
          <CardDescription>Definujte cenovou politiku a platební podmínky</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Základní cena */}
          <div>
            <Label htmlFor="price">
              Cena (Kč) <span className="text-red-600">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="Například: 5000"
              required
            />
          </div>

          {/* Rozdělení platby */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="allowInstallments"
                checked={formData.allowInstallments}
                onCheckedChange={(checked) => updateField("allowInstallments", checked === true)}
              />
              <Label htmlFor="allowInstallments" className="cursor-pointer">
                Povolit platbu na zálohu + doplatek
              </Label>
            </div>

            {formData.allowInstallments && (
              <div className="ml-6 space-y-4 p-4 border-2 border-black bg-gray-50">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="depositAmount">
                      Výše zálohy (Kč) <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      min="0"
                      value={formData.depositAmount}
                      onChange={(e) => updateField("depositAmount", e.target.value)}
                      placeholder="Například: 2000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="finalPaymentAmount">Výše doplatku (Kč)</Label>
                    <Input
                      id="finalPaymentAmount"
                      type="number"
                      value={formData.finalPaymentAmount}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-black mt-1">Automaticky dopočteno</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="depositDueDate">Datum splatnosti zálohy</Label>
                    <Input
                      id="depositDueDate"
                      type="date"
                      value={formData.depositDueDate}
                      onChange={(e) => updateField("depositDueDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="finalPaymentDueDate">Datum splatnosti doplatku</Label>
                    <Input
                      id="finalPaymentDueDate"
                      type="date"
                      value={formData.finalPaymentDueDate}
                      onChange={(e) => updateField("finalPaymentDueDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Splatnost (když není záloha) */}
          {!formData.allowInstallments && (
            <div>
              <Label htmlFor="paymentDueDate">Datum splatnosti</Label>
              <Input
                id="paymentDueDate"
                type="date"
                value={formData.paymentDueDate}
                onChange={(e) => updateField("paymentDueDate", e.target.value)}
              />
            </div>
          )}

          {/* Platební metody */}
          <div className="space-y-3">
            <Label>
              Platební metody <span className="text-red-600">*</span>
            </Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="paymentTransfer"
                  checked={formData.paymentMethods.includes("transfer")}
                  onCheckedChange={() => togglePaymentMethod("transfer")}
                />
                <Label htmlFor="paymentTransfer" className="cursor-pointer">
                  Bankovní převod
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="paymentCash"
                  checked={formData.paymentMethods.includes("cash")}
                  onCheckedChange={() => togglePaymentMethod("cash")}
                />
                <Label htmlFor="paymentCash" className="cursor-pointer">
                  Hotově na místě
                </Label>
              </div>
            </div>
            <p className="text-sm text-black">Minimálně 1 musí být vybraná</p>
          </div>

          {/* Číslo účtu */}
          <div>
            <Label htmlFor="bankAccount">Číslo účtu</Label>
            <Input
              id="bankAccount"
              value={formData.bankAccount}
              onChange={(e) => updateField("bankAccount", e.target.value)}
              placeholder="Například: 123456789/0100"
            />
            <p className="text-sm text-black mt-1">
              Pokud se liší od výchozího účtu organizace
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Slevy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Slevy
          </CardTitle>
          <CardDescription>Pevné slevy a slevové kupóny pro registrace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pevné slevy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="allowDiscounts"
                checked={formData.allowDiscounts}
                onCheckedChange={(checked) => updateField("allowDiscounts", checked === true)}
              />
              <Label htmlFor="allowDiscounts" className="cursor-pointer">
                Povolit slevy
              </Label>
            </div>

            {formData.allowDiscounts && (
              <div className="ml-6 space-y-3">
                {formData.discounts.length > 0 && (
                  <div className="border-2 border-black">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b-2 border-black">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium">Název</th>
                          <th className="px-4 py-2 text-left font-medium">Typ</th>
                          <th className="px-4 py-2 text-left font-medium">Hodnota</th>
                          <th className="px-4 py-2 text-left font-medium">Podmínka</th>
                          <th className="px-4 py-2 text-left font-medium">Akce</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.discounts.map((discount) => (
                          <tr key={discount.id} className="border-b border-black">
                            <td className="px-4 py-2">{discount.name}</td>
                            <td className="px-4 py-2">
                              {discount.type === "percentage" ? "Procentuální" : "Pevná částka"}
                            </td>
                            <td className="px-4 py-2">
                              {discount.value} {discount.type === "percentage" ? "%" : "Kč"}
                            </td>
                            <td className="px-4 py-2">{discount.condition || "-"}</td>
                            <td className="px-4 py-2">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingDiscount(discount)
                                    setShowDiscountForm(true)
                                  }}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteDiscount(discount.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingDiscount(null)
                    setShowDiscountForm(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Přidat slevu
                </Button>
              </div>
            )}
          </div>

          {/* Slevové kupóny */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="allowDiscountCodes"
                checked={formData.allowDiscountCodes}
                onCheckedChange={(checked) => updateField("allowDiscountCodes", checked === true)}
              />
              <Label htmlFor="allowDiscountCodes" className="cursor-pointer">
                Povolit slevové kódy
              </Label>
            </div>

            {formData.allowDiscountCodes && (
              <div className="ml-6 space-y-3">
                {formData.discountCodes.length > 0 && (
                  <div className="border-2 border-black overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b-2 border-black">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium">Kód</th>
                          <th className="px-4 py-2 text-left font-medium">Sleva</th>
                          <th className="px-4 py-2 text-left font-medium">Platnost</th>
                          <th className="px-4 py-2 text-left font-medium">Použití</th>
                          <th className="px-4 py-2 text-left font-medium">Stav</th>
                          <th className="px-4 py-2 text-left font-medium">Akce</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.discountCodes.map((code) => {
                          const status = getCodeStatus(code)
                          return (
                            <tr key={code.id} className="border-b border-black">
                              <td className="px-4 py-2 font-mono font-bold">{code.code}</td>
                              <td className="px-4 py-2">
                                {code.value} {code.type === "percentage" ? "%" : "Kč"}
                              </td>
                              <td className="px-4 py-2">
                                {code.validFrom || code.validUntil
                                  ? `${code.validFrom ? new Date(code.validFrom).toLocaleDateString("cs-CZ") : "—"} - ${code.validUntil ? new Date(code.validUntil).toLocaleDateString("cs-CZ") : "—"}`
                                  : "Bez omezení"}
                              </td>
                              <td className="px-4 py-2">
                                {code.usageLimit
                                  ? `${code.usageCount || 0}/${code.usageLimit}`
                                  : "Neomezeno"}
                              </td>
                              <td className="px-4 py-2">{getCodeStatusLabel(status)}</td>
                              <td className="px-4 py-2">
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setEditingCode(code)
                                      setShowCodeForm(true)
                                    }}
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteCode(code.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingCode(null)
                    setShowCodeForm(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Vytvořit kupón
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Uložit změny
        </Button>
      </div>

      {/* Discount Form Dialog */}
      {showDiscountForm && (
        <DiscountFormDialog
          discount={editingDiscount}
          onSave={handleSaveDiscount}
          onCancel={() => {
            setShowDiscountForm(false)
            setEditingDiscount(null)
          }}
        />
      )}

      {/* Discount Code Form Dialog */}
      {showCodeForm && (
        <DiscountCodeFormDialog
          code={editingCode}
          onSave={handleSaveCode}
          onCancel={() => {
            setShowCodeForm(false)
            setEditingCode(null)
          }}
        />
      )}
    </form>
  )
}

// Discount Form Dialog Component
function DiscountFormDialog({
  discount,
  onSave,
  onCancel,
}: {
  discount: Discount | null
  onSave: (discount: Discount) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Discount>(
    discount || {
      id: "",
      name: "",
      type: "percentage",
      value: 0,
      condition: "",
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.value) {
      toast.error("Vyplňte prosím všechna povinná pole")
      return
    }
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-black p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4">
          {discount ? "Upravit slevu" : "Přidat slevu"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="discountName">
              Název slevy <span className="text-red-600">*</span>
            </Label>
            <Input
              id="discountName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder='Například: "Sourozenec", "Early bird"'
              required
            />
          </div>

          <div>
            <Label>
              Typ slevy <span className="text-red-600">*</span>
            </Label>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="typePercentage"
                  name="discountType"
                  checked={formData.type === "percentage"}
                  onChange={() => setFormData({ ...formData, type: "percentage" })}
                />
                <Label htmlFor="typePercentage" className="cursor-pointer">
                  Procentuální
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="typeFixed"
                  name="discountType"
                  checked={formData.type === "fixed"}
                  onChange={() => setFormData({ ...formData, type: "fixed" })}
                />
                <Label htmlFor="typeFixed" className="cursor-pointer">
                  Pevná částka
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="discountValue">
              Hodnota ({formData.type === "percentage" ? "%" : "Kč"}){" "}
              <span className="text-red-600">*</span>
            </Label>
            <Input
              id="discountValue"
              type="number"
              min="1"
              value={formData.value || ""}
              onChange={(e) =>
                setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="discountCondition">Podmínka slevy</Label>
            <Textarea
              id="discountCondition"
              value={formData.condition || ""}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              placeholder='Například: "Platba do 15.1."'
              rows={2}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Zrušit
            </Button>
            <Button type="submit">Uložit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Discount Code Form Dialog Component
function DiscountCodeFormDialog({
  code,
  onSave,
  onCancel,
}: {
  code: DiscountCode | null
  onSave: (code: DiscountCode) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<DiscountCode>(
    code || {
      id: "",
      code: "",
      type: "percentage",
      value: 0,
      validFrom: "",
      validUntil: "",
      usageLimit: undefined,
      usageCount: 0,
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.code || !formData.value) {
      toast.error("Vyplňte prosím všechna povinná pole")
      return
    }
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-black p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {code ? "Upravit kupón" : "Vytvořit kupón"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="codeText">
              Kód <span className="text-red-600">*</span>
            </Label>
            <Input
              id="codeText"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value.toUpperCase() })
              }
              placeholder="Například: EARLYBIRD2025"
              required
              className="font-mono"
            />
          </div>

          <div>
            <Label>
              Typ slevy <span className="text-red-600">*</span>
            </Label>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="codeTypePercentage"
                  name="codeType"
                  checked={formData.type === "percentage"}
                  onChange={() => setFormData({ ...formData, type: "percentage" })}
                />
                <Label htmlFor="codeTypePercentage" className="cursor-pointer">
                  Procentuální
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="codeTypeFixed"
                  name="codeType"
                  checked={formData.type === "fixed"}
                  onChange={() => setFormData({ ...formData, type: "fixed" })}
                />
                <Label htmlFor="codeTypeFixed" className="cursor-pointer">
                  Pevná částka
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="codeValue">
              Hodnota ({formData.type === "percentage" ? "%" : "Kč"}){" "}
              <span className="text-red-600">*</span>
            </Label>
            <Input
              id="codeValue"
              type="number"
              min="1"
              value={formData.value || ""}
              onChange={(e) =>
                setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validFrom">Platnost od</Label>
              <Input
                id="validFrom"
                type="date"
                value={formData.validFrom || ""}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="validUntil">Platnost do</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil || ""}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="usageLimit">Počet použití</Label>
            <Input
              id="usageLimit"
              type="number"
              min="1"
              value={formData.usageLimit || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  usageLimit: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              placeholder="Prázdné = neomezené"
            />
          </div>

          {code && (
            <div>
              <Label>Zbývá použití</Label>
              <Input
                value={
                  formData.usageLimit
                    ? `${formData.usageLimit - (formData.usageCount || 0)}`
                    : "Neomezeno"
                }
                disabled
                className="bg-gray-100"
              />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Zrušit
            </Button>
            <Button type="submit">Uložit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
