"use client"

import { useState, useEffect } from "react"
import { useEvents } from "@/lib/event-context"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Bell, UserCheck, Wallet, Clock, Calendar, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import type { NotificationSettings } from "@/lib/types"

interface RegistrationSettingsPanelProps {
  eventId?: string
}

export function RegistrationSettingsPanelV2({ eventId }: RegistrationSettingsPanelProps = {}) {
  const params = useParams()
  const paramEventId = params?.id as string
  const finalEventId = eventId || paramEventId
  const { getEventById, updateEvent } = useEvents()
  const event = getEventById(finalEventId)

  const [formData, setFormData] = useState<NotificationSettings>({
    // Defaults based on specification
    parentRegistrationConfirm: true,
    parentRegistrationCancel: true,
    parentPaymentConfirm: true,
    parentPaymentReminder: false,
    parentPaymentReminderDays: 7,
    parentWaitlistAdded: true,
    parentWaitlistSpotAvailable: true,
    parentWaitlistSpotHours: 24,
    parentWaitlistMoved: true,
    parentEventReminder: false,
    parentEventReminderDays: 7,
    parentEventReminderText: "",
    parentEventChanged: true,
    parentEventCancelled: true,
    organizerNewRegistration: true,
    organizerWaitlistConfirmed: true,
    organizerPaymentRecorded: false,
    organizerCapacityWarning: true,
    organizerCapacityWarningPercent: 90,
    organizerCapacityFull: true,
    organizerEventReminder: false,
    organizerEventReminderDays: 3,
    organizerEventReminderNote: "",
  })

  useEffect(() => {
    if (event && event.notificationSettings) {
      setFormData({ ...formData, ...event.notificationSettings })
    }
  }, [event])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validace
    if (formData.parentPaymentReminder && formData.parentPaymentReminderDays < 1) {
      toast.error("Počet dní před splatností musí být alespoň 1")
      return
    }
    if (formData.parentWaitlistSpotAvailable && formData.parentWaitlistSpotHours < 1) {
      toast.error("Počet hodin na potvrzení musí být alespoň 1")
      return
    }
    if (formData.parentEventReminder && formData.parentEventReminderDays < 1) {
      toast.error("Počet dní před akcí musí být alespoň 1")
      return
    }
    if (formData.organizerCapacityWarning) {
      if (formData.organizerCapacityWarningPercent < 50 || formData.organizerCapacityWarningPercent > 99) {
        toast.error("Procento zaplnění musí být mezi 50 a 99")
        return
      }
    }
    if (formData.organizerEventReminder && formData.organizerEventReminderDays < 1) {
      toast.error("Počet dní před akcí musí být alespoň 1")
      return
    }

    try {
      await updateEvent(finalEventId, {
        notificationSettings: formData,
        updatedAt: new Date().toISOString(),
      })
      toast.success("Nastavení notifikací bylo uloženo")
    } catch (error) {
      console.error("Failed to save notification settings:", error)
      toast.error("Chyba při ukládání nastavení")
    }
  }

  const updateField = (field: keyof NotificationSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!event) {
    return (
      <div className="text-center py-12 text-black">
        <p>Akce nebyla nalezena</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Save Button - Top */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Uložit změny
        </Button>
      </div>

      {/* Upozornění rodičům */}
      <div className="bg-white border-2 border-black">
        <div className="p-4 border-b-2 border-black">
          <h2 className="font-semibold leading-none flex items-center gap-2 text-black">
            <Bell className="h-5 w-5" />
            Upozornění rodičům
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Automatické emaily odeslané rodičům při různých událostech
          </p>
        </div>
        <div className="p-4 space-y-3">
          {/* Kategorie: Registrace */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Registrace
            </h3>

            <div className="space-y-2 ml-6">
              {/* Potvrzení registrace */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Potvrzení registrace</Label>
                    <p className="text-sm text-black mt-1">
                      Automatický email okamžitě po úspěšném podání přihlášky. Obsahuje shrnutí registrace a platební údaje.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentRegistrationConfirm}
                    onCheckedChange={(checked) => updateField("parentRegistrationConfirm", checked)}
                  />
                </div>
              </div>

              {/* Zrušení registrace */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Potvrzení zrušení</Label>
                    <p className="text-sm text-black mt-1">
                      Email potvrzující storno registrace.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentRegistrationCancel}
                    onCheckedChange={(checked) => updateField("parentRegistrationCancel", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kategorie: Platby */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Platby
            </h3>

            <div className="space-y-2 ml-6">
              {/* Potvrzení platby */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Potvrzení platby</Label>
                    <p className="text-sm text-black mt-1">
                      Email odeslaný po zaznamenání platby organizátorem. Slouží jako elektronická účtenka.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentPaymentConfirm}
                    onCheckedChange={(checked) => updateField("parentPaymentConfirm", checked)}
                  />
                </div>
              </div>

              {/* Připomínka splatnosti */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Připomínka splatnosti</Label>
                    <p className="text-sm text-black mt-1">
                      Automatická upomínka před datem splatnosti zálohy nebo doplatku.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentPaymentReminder}
                    onCheckedChange={(checked) => updateField("parentPaymentReminder", checked)}
                  />
                </div>

                {formData.parentPaymentReminder && (
                  <div className="pt-2 border-t-2 border-black">
                    <Label htmlFor="parentPaymentReminderDays">Počet dní před splatností</Label>
                    <Input
                      id="parentPaymentReminderDays"
                      type="number"
                      min="1"
                      value={formData.parentPaymentReminderDays}
                      onChange={(e) => updateField("parentPaymentReminderDays", parseInt(e.target.value) || 7)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kategorie: Čekací listina */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Čekací listina
            </h3>

            <div className="space-y-2 ml-6">
              {/* Zařazení na čekací listinu */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Zařazení na čekací listinu</Label>
                    <p className="text-sm text-black mt-1">
                      Informace pro rodiče, že je kapacita naplněna a dítě bylo zařazeno na čekací listinu.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentWaitlistAdded}
                    onCheckedChange={(checked) => updateField("parentWaitlistAdded", checked)}
                  />
                </div>
              </div>

              {/* Uvolněné místo */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Oznámení o volném místě</Label>
                    <p className="text-sm text-black mt-1">
                      Email odeslaný, když se uvolní místo. Rodič má omezený čas na potvrzení.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentWaitlistSpotAvailable}
                    onCheckedChange={(checked) => updateField("parentWaitlistSpotAvailable", checked)}
                  />
                </div>

                {formData.parentWaitlistSpotAvailable && (
                  <div className="pt-2 border-t-2 border-black">
                    <Label htmlFor="parentWaitlistSpotHours">Počet hodin na potvrzení</Label>
                    <Input
                      id="parentWaitlistSpotHours"
                      type="number"
                      min="1"
                      value={formData.parentWaitlistSpotHours}
                      onChange={(e) => updateField("parentWaitlistSpotHours", parseInt(e.target.value) || 24)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Přesunutí z čekací listiny */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Potvrzení přijetí</Label>
                    <p className="text-sm text-black mt-1">
                      Potvrzení, že dítě bylo přesunuto z čekací listiny na hlavní seznam účastníků.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentWaitlistMoved}
                    onCheckedChange={(checked) => updateField("parentWaitlistMoved", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kategorie: Před akcí */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Před akcí
            </h3>

            <div className="space-y-2 ml-6">
              {/* Připomínka akce */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Připomínka před začátkem</Label>
                    <p className="text-sm text-black mt-1">
                      Email s důležitými informacemi před konáním akce.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentEventReminder}
                    onCheckedChange={(checked) => updateField("parentEventReminder", checked)}
                  />
                </div>

                {formData.parentEventReminder && (
                  <div className="pt-2 border-t-2 border-black space-y-2">
                    <div>
                      <Label htmlFor="parentEventReminderDays">Počet dní před akcí</Label>
                      <Input
                        id="parentEventReminderDays"
                        type="number"
                        min="1"
                        value={formData.parentEventReminderDays}
                        onChange={(e) => updateField("parentEventReminderDays", parseInt(e.target.value) || 7)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentEventReminderText">Vlastní text</Label>
                      <Textarea
                        id="parentEventReminderText"
                        value={formData.parentEventReminderText}
                        onChange={(e) => updateField("parentEventReminderText", e.target.value)}
                        placeholder="Nezapomeňte si vzít..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kategorie: Změny akce */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Změny akce
            </h3>

            <div className="space-y-2 ml-6">
              {/* Změna detailů akce */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Oznámení o změně</Label>
                    <p className="text-sm text-black mt-1">
                      Automatický email při změně času, místa nebo jiných důležitých detailů akce.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentEventChanged}
                    onCheckedChange={(checked) => updateField("parentEventChanged", checked)}
                  />
                </div>
              </div>

              {/* Storno akce */}
              <div className="border-2 border-black p-3 space-y-2 bg-red-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Oznámení o zrušení</Label>
                    <p className="text-sm text-black mt-1">
                      Hromadný email všem registrovaným při zrušení akce.
                    </p>
                    <p className="text-xs text-red-600 mt-2 font-medium">
                      ⚠️ Tento email nelze vypnout, pokud dojde ke zrušení akce.
                    </p>
                  </div>
                  <Switch
                    checked={formData.parentEventCancelled}
                    onCheckedChange={(checked) => updateField("parentEventCancelled", checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upozornění organizátorovi */}
      <div className="bg-white border-2 border-black">
        <div className="p-4 border-b-2 border-black">
          <h2 className="font-semibold leading-none flex items-center gap-2 text-black">
            <Bell className="h-5 w-5" />
            Upozornění organizátorovi
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Notifikace pro vás o důležitých událostech týkajících se akce
          </p>
        </div>
        <div className="p-4 space-y-3">
          {/* Kategorie: Registrace */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Registrace
            </h3>

            <div className="space-y-2 ml-6">
              {/* Nová registrace */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Nová přihláška</Label>
                    <p className="text-sm text-black mt-1">
                      Email okamžitě po podání nové registrace.
                    </p>
                  </div>
                  <Switch
                    checked={formData.organizerNewRegistration}
                    onCheckedChange={(checked) => updateField("organizerNewRegistration", checked)}
                  />
                </div>
              </div>

              {/* Registrace z čekací listiny */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Potvrzení z čekací listiny</Label>
                    <p className="text-sm text-black mt-1">
                      Email, když rodič potvrdí uvolněné místo z čekací listiny.
                    </p>
                  </div>
                  <Switch
                    checked={formData.organizerWaitlistConfirmed}
                    onCheckedChange={(checked) => updateField("organizerWaitlistConfirmed", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kategorie: Platby */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Platby
            </h3>

            <div className="space-y-2 ml-6">
              {/* Evidovaná platba */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Nová platba zaznamenána</Label>
                    <p className="text-sm text-black mt-1">
                      Potvrzení po manuálním zaznamenání platby v systému.
                    </p>
                  </div>
                  <Switch
                    checked={formData.organizerPaymentRecorded}
                    onCheckedChange={(checked) => updateField("organizerPaymentRecorded", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kategorie: Kapacita */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Kapacita
            </h3>

            <div className="space-y-2 ml-6">
              {/* Kapacita téměř naplněna */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Upozornění před naplněním</Label>
                    <p className="text-sm text-black mt-1">
                      Email, když se kapacita blíží limitu.
                    </p>
                  </div>
                  <Switch
                    checked={formData.organizerCapacityWarning}
                    onCheckedChange={(checked) => updateField("organizerCapacityWarning", checked)}
                  />
                </div>

                {formData.organizerCapacityWarning && (
                  <div className="pt-2 border-t-2 border-black">
                    <Label htmlFor="organizerCapacityWarningPercent">Procento zaplnění (%)</Label>
                    <Input
                      id="organizerCapacityWarningPercent"
                      type="number"
                      min="50"
                      max="99"
                      value={formData.organizerCapacityWarningPercent}
                      onChange={(e) => updateField("organizerCapacityWarningPercent", parseInt(e.target.value) || 90)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Kapacita naplněna */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Kapacita naplněna</Label>
                    <p className="text-sm text-black mt-1">
                      Email, když akce dosáhne maximální kapacity.
                    </p>
                  </div>
                  <Switch
                    checked={formData.organizerCapacityFull}
                    onCheckedChange={(checked) => updateField("organizerCapacityFull", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kategorie: Před akcí */}
          <div className="space-y-2">
            <h3 className="font-semibold text-black flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Před akcí
            </h3>

            <div className="space-y-2 ml-6">
              {/* Připomínka před začátkem */}
              <div className="border-2 border-black p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="font-medium">Připomínka organizátorovi</Label>
                    <p className="text-sm text-black mt-1">
                      Připomínka pro vás před konáním akce (checklist, příprava materiálů...).
                    </p>
                  </div>
                  <Switch
                    checked={formData.organizerEventReminder}
                    onCheckedChange={(checked) => updateField("organizerEventReminder", checked)}
                  />
                </div>

                {formData.organizerEventReminder && (
                  <div className="pt-2 border-t-2 border-black space-y-2">
                    <div>
                      <Label htmlFor="organizerEventReminderDays">Počet dní před akcí</Label>
                      <Input
                        id="organizerEventReminderDays"
                        type="number"
                        min="1"
                        value={formData.organizerEventReminderDays}
                        onChange={(e) => updateField("organizerEventReminderDays", parseInt(e.target.value) || 3)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organizerEventReminderNote">Vlastní poznámka</Label>
                      <Textarea
                        id="organizerEventReminderNote"
                        value={formData.organizerEventReminderNote}
                        onChange={(e) => updateField("organizerEventReminderNote", e.target.value)}
                        placeholder="Připravit seznam materiálů..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Bottom */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Uložit změny
        </Button>
      </div>
    </form>
  )
}
