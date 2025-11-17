"use client"

import { useState, useEffect } from "react"
import { useEvents } from "@/lib/event-context"
import { useParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-black">Test Notifikace - Minimální verze</h2>
      <p className="mb-4 text-black">Zobrazuje se pouze jedno nastavení pro testování scrollování.</p>

      <div className="border-2 border-black p-4 bg-white mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="font-medium">Potvrzení registrace</Label>
            <p className="text-sm text-black mt-1">
              Automatický email okamžitě po úspěšném podání přihlášky.
            </p>
          </div>
          <Switch
            checked={formData.parentRegistrationConfirm}
            onCheckedChange={(checked) => updateField("parentRegistrationConfirm", checked)}
          />
        </div>
      </div>

      <div className="border-2 border-black p-4 bg-white mb-4">
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

      <div className="border-2 border-black p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="font-medium">Potvrzení platby</Label>
            <p className="text-sm text-black mt-1">
              Email odeslaný po zaznamenání platby organizátorem.
            </p>
          </div>
          <Switch
            checked={formData.parentPaymentConfirm}
            onCheckedChange={(checked) => updateField("parentPaymentConfirm", checked)}
          />
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-600">
        Toto je minimální testovací verze s pouze třemi přepínači.
        Pokud tady funguje scrollování správně, můžeme postupně přidávat další sekce.
      </p>
    </div>
  )
}
