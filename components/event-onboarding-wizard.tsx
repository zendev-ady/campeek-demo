"use client"
import { useState } from "react"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface WizardState {
  name: string
  description: string
  startDate: string
  endDate: string
  location: string
  capacity: string
  allowWaitlist: boolean
  requiresAdminApproval: boolean
  ageMin: string
  ageMax: string
  price: string
  allowInstallments: boolean
  depositAmount: string
  finalPaymentAmount: string
  depositDueDate: string
  finalPaymentDueDate: string
  paymentDueDate: string
  paymentMethods: ("transfer" | "cash")[]
  bankAccount: string
  registrationStartDate: string
  registrationEndDate: string
  allowDiscounts: boolean
  allowDiscountCodes: boolean
  contactEmail: string
  contactPhone: string
}

interface Step {
  id: number
  title: string
  description: string
}

const STEPS: Step[] = [
  { id: 1, title: "Základní informace", description: "Kdy, kde, pro koho a s jakou kapacitou" },
  { id: 2, title: "Ceny a platby", description: "Jak budou účastníci platit" },
  { id: 3, title: "Přihlášky a slevy", description: "Kdy a jak mohou rodiče podávat přihlášky" },
  { id: 4, title: "Kontakty", description: "Kontaktní údaje pro rodiče" },
  { id: 5, title: "Shrnutí", description: "Přehled a vytvoření" },
]

export function EventOnboardingWizard({ onClose }: { onClose: () => void }) {
  const { createEvent } = useEvents()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<WizardState>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    capacity: "",
    allowWaitlist: false,
    requiresAdminApproval: false,
    ageMin: "",
    ageMax: "",
    price: "",
    allowInstallments: false,
    depositAmount: "",
    finalPaymentAmount: "",
    depositDueDate: "",
    finalPaymentDueDate: "",
    paymentDueDate: "",
    paymentMethods: [],
    bankAccount: "",
    registrationStartDate: "",
    registrationEndDate: "",
    allowDiscounts: false,
    allowDiscountCodes: false,
    contactEmail: "",
    contactPhone: "",
  })

  const handleInputChange = (field: keyof WizardState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentMethodToggle = (method: "transfer" | "cash") => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }))
  }

  const canAdvance = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.startDate && formData.endDate && formData.location
      case 2:
        return formData.price && (formData.allowInstallments ? formData.depositAmount : true)
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length && canAdvance()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await createEvent({
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        capacity: Number.parseInt(formData.capacity) || 0,
        price: Number.parseFloat(formData.price) || 0,
        ageMin: formData.ageMin ? Number.parseInt(formData.ageMin) : undefined,
        ageMax: formData.ageMax ? Number.parseInt(formData.ageMax) : undefined,
        allowWaitlist: formData.allowWaitlist,
        requiresAdminApproval: formData.requiresAdminApproval,
        allowInstallments: formData.allowInstallments,
        depositAmount: formData.depositAmount ? Number.parseFloat(formData.depositAmount) : undefined,
        finalPaymentAmount: formData.finalPaymentAmount ? Number.parseFloat(formData.finalPaymentAmount) : undefined,
        depositDueDate: formData.depositDueDate || undefined,
        finalPaymentDueDate: formData.finalPaymentDueDate || undefined,
        paymentDueDate: formData.paymentDueDate || undefined,
        paymentMethods: formData.paymentMethods,
        bankAccount: formData.bankAccount || undefined,
        registrationStartDate: formData.registrationStartDate || undefined,
        registrationEndDate: formData.registrationEndDate || undefined,
        allowDiscounts: formData.allowDiscounts,
        allowDiscountCodes: formData.allowDiscountCodes,
        contactEmail: formData.contactEmail || undefined,
        contactPhone: formData.contactPhone || undefined,
      })

      onClose()
    } catch (error) {
      console.error("Failed to create event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="px-6 pt-4 pb-6 border-b-2 border-black">
        <div className="flex gap-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className={`flex-1 px-4 py-2 border-2 border-black text-sm font-medium ${
                step.id === currentStep
                  ? "bg-black text-white"
                  : step.id < currentStep
                    ? "bg-white text-black cursor-pointer"
                    : "bg-white text-black"
              }`}
            >
              {step.id}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-base">{STEPS[currentStep - 1].title}</h3>
          <p className="text-sm text-black mt-1">{STEPS[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border-2 border-black p-4 mb-6">
              <p className="text-sm text-black">
                Definujte základní rámec akce — kdy, kde, pro koho a s jakou kapacitou
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Název akce *</Label>
              <Input
                id="name"
                placeholder="např. Letní tábor 2025"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis</Label>
              <Textarea
                id="description"
                placeholder="Popis akce"
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Datum začátku *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Datum konce *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Místo konání *</Label>
              <Input
                id="location"
                placeholder="např. Tábor u Sázavy"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapacita</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="50"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageMin">Minimální věk</Label>
                <Input
                  id="ageMin"
                  type="number"
                  min="0"
                  placeholder="6"
                  value={formData.ageMin}
                  onChange={(e) => handleInputChange("ageMin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageMax">Maximální věk</Label>
                <Input
                  id="ageMax"
                  type="number"
                  min="0"
                  placeholder="15"
                  value={formData.ageMax}
                  onChange={(e) => handleInputChange("ageMax", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allowWaitlist"
                  checked={formData.allowWaitlist}
                  onCheckedChange={(checked) => handleInputChange("allowWaitlist", checked)}
                />
                <label htmlFor="allowWaitlist" className="text-sm cursor-pointer">
                  Povolit náhradníky (pouze pokud je nastavena kapacita)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="requiresAdminApproval"
                  checked={formData.requiresAdminApproval}
                  onCheckedChange={(checked) => handleInputChange("requiresAdminApproval", checked)}
                />
                <label htmlFor="requiresAdminApproval" className="text-sm cursor-pointer">
                  Vyžadovat potvrzení přihlášky administrátorem
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Settings */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border-2 border-black p-4 mb-6">
              <p className="text-sm text-black">
                Určuje, jakým způsobem budou účastníci platit a jaké jsou platební podmínky.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Cena (Kč) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="5000"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allowInstallments"
                  checked={formData.allowInstallments}
                  onCheckedChange={(checked) => handleInputChange("allowInstallments", checked)}
                />
                <label htmlFor="allowInstallments" className="text-sm cursor-pointer font-medium">
                  Povolit platbu na zálohu + doplatek
                </label>
              </div>

              {formData.allowInstallments && (
                <div className="space-y-4 mt-4 p-4 bg-white border-2 border-black">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="depositAmount">Výše zálohy (Kč)</Label>
                      <Input
                        id="depositAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="2500"
                        value={formData.depositAmount}
                        onChange={(e) => handleInputChange("depositAmount", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finalPaymentAmount">Výše doplatku (Kč)</Label>
                      <Input
                        id="finalPaymentAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="2500"
                        value={formData.finalPaymentAmount}
                        onChange={(e) => handleInputChange("finalPaymentAmount", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="depositDueDate">Splatnost zálohy</Label>
                      <Input
                        id="depositDueDate"
                        type="date"
                        value={formData.depositDueDate}
                        onChange={(e) => handleInputChange("depositDueDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finalPaymentDueDate">Splatnost doplatku</Label>
                      <Input
                        id="finalPaymentDueDate"
                        type="date"
                        value={formData.finalPaymentDueDate}
                        onChange={(e) => handleInputChange("finalPaymentDueDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {!formData.allowInstallments && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="paymentDueDate">Datum splatnosti</Label>
                  <Input
                    id="paymentDueDate"
                    type="date"
                    value={formData.paymentDueDate}
                    onChange={(e) => handleInputChange("paymentDueDate", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3 border-t pt-4">
              <Label className="text-base font-medium">Způsob platby</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="transfer"
                    checked={formData.paymentMethods.includes("transfer")}
                    onCheckedChange={() => handlePaymentMethodToggle("transfer")}
                  />
                  <label htmlFor="transfer" className="text-sm cursor-pointer">
                    Bankovní převod
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="cash"
                    checked={formData.paymentMethods.includes("cash")}
                    onCheckedChange={() => handlePaymentMethodToggle("cash")}
                  />
                  <label htmlFor="cash" className="text-sm cursor-pointer">
                    Hotově na místě
                  </label>
                </div>
              </div>

              {formData.paymentMethods.includes("transfer") && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="bankAccount">Číslo účtu</Label>
                  <Input
                    id="bankAccount"
                    placeholder="Ponechat jako výchozí"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Registration & Discounts */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border-2 border-black p-4 mb-6">
              <p className="text-sm text-black">Určuje, kdy a jak mohou rodiče podávat přihlášky.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationStartDate">Zahájení sboru přihlášek</Label>
                <Input
                  id="registrationStartDate"
                  type="date"
                  value={formData.registrationStartDate}
                  onChange={(e) => handleInputChange("registrationStartDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationEndDate">Ukončení sboru přihlášek</Label>
                <Input
                  id="registrationEndDate"
                  type="date"
                  value={formData.registrationEndDate}
                  onChange={(e) => handleInputChange("registrationEndDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allowDiscounts"
                  checked={formData.allowDiscounts}
                  onCheckedChange={(checked) => handleInputChange("allowDiscounts", checked)}
                />
                <label htmlFor="allowDiscounts" className="text-sm cursor-pointer font-medium">
                  Povolit slevy
                </label>
              </div>
              {formData.allowDiscounts && (
                <p className="text-sm text-black ml-6">Slevy bude možné spravovat po vytvoření akce</p>
              )}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allowDiscountCodes"
                  checked={formData.allowDiscountCodes}
                  onCheckedChange={(checked) => handleInputChange("allowDiscountCodes", checked)}
                />
                <label htmlFor="allowDiscountCodes" className="text-sm cursor-pointer font-medium">
                  Povolit slevové kódy
                </label>
              </div>
              {formData.allowDiscountCodes && (
                <p className="text-sm text-black ml-6">
                  Slevové kódy bude možné spravovat po vytvoření akce
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Contacts */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border-2 border-black p-4 mb-6">
              <p className="text-sm text-black">Údaje, které se zobrazí rodičům při přihlašování a komunikaci.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Kontaktní e-mail</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="Ponechat jako výchozí"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Kontaktní telefon</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="Ponechat jako výchozí"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {currentStep === 5 && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border-2 border-black p-4 mb-6">
              <p className="text-sm text-black">Přehled všech vyplněných údajů před potvrzením vytvoření akce.</p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Základní informace</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black">Název:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Období:</span>
                    <span className="font-medium">
                      {new Date(formData.startDate).toLocaleDateString("cs-CZ")} -{" "}
                      {new Date(formData.endDate).toLocaleDateString("cs-CZ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Místo:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  {formData.capacity && (
                    <div className="flex justify-between">
                      <span className="text-black">Kapacita:</span>
                      <span className="font-medium">{formData.capacity} osob</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ceny a platby</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black">Cena:</span>
                    <span className="font-medium">{Number(formData.price).toLocaleString("cs-CZ")} Kč</span>
                  </div>
                  {formData.allowInstallments && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-black">Záloha:</span>
                        <span className="font-medium">{Number(formData.depositAmount).toLocaleString("cs-CZ")} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Doplatek:</span>
                        <span className="font-medium">
                          {Number(formData.finalPaymentAmount).toLocaleString("cs-CZ")} Kč
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        )}
      </div>

      {/* Footer with Actions */}
      <div className="border-t px-6 py-4 flex justify-between gap-3">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Zpět
        </Button>

        {currentStep === STEPS.length ? (
          <Button onClick={handleSubmit} disabled={isLoading} className="ml-auto">
            {isLoading ? "Vytváření..." : "Vytvořit akci"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canAdvance()} className="ml-auto">
            Dál
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
