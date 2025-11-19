"use client"

import { useState } from "react"
import type { Registration } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CancelRegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration: Registration | null
  onCancelRegistration: (registrationId: string, reason: string) => void
}

export function CancelRegistrationDialog({
  open,
  onOpenChange,
  registration,
  onCancelRegistration,
}: CancelRegistrationDialogProps) {
  const [reason, setReason] = useState("")

  if (!registration) return null

  // Get participant name
  const participantName = registration.children[0]?.name || "tohoto účastníka"

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCancelRegistration(registration.id, reason.trim())
    onOpenChange(false)
    setReason("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Zrušit přihlášku</DialogTitle>
          <DialogDescription className="pt-4 space-y-3">
            <p className="text-sm text-[#37352f]">
              Opravdu chcete zrušit přihlášku {participantName}?
            </p>
            <p className="text-sm text-[#73726e]">
              Tato akce je nevratná. Přihláška bude označena jako zrušená a
              rodič bude informován emailem.
            </p>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Důvod zrušení */}
          <div>
            <Label htmlFor="reason" className="text-sm font-medium text-[#73726e]">
              Důvod zrušení
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Volitelný důvod zrušení..."
              className="mt-1 min-h-[100px]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Zpět
            </Button>
            <Button type="submit" variant="destructive">
              Zrušit přihlášku
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
