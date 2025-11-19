"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import type { Registration, Payment } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface RecordPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration: Registration | null
  onRecordPayment: (registrationId: string, payment: Omit<Payment, "id">) => void
}

export function RecordPaymentDialog({
  open,
  onOpenChange,
  registration,
  onRecordPayment,
}: RecordPaymentDialogProps) {
  const [paymentType, setPaymentType] = useState<"deposit" | "final" | "other">(
    "final"
  )
  const [amount, setAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  )
  const [note, setNote] = useState("")

  if (!registration) return null

  // Calculate suggested amount based on payment type
  const getSuggestedAmount = (type: "deposit" | "final" | "other"): number => {
    const remaining = registration.totalPrice - registration.amountPaid

    if (type === "deposit") {
      const depositPayment = registration.payments.find((p) => p.type === "deposit")
      if (depositPayment && depositPayment.status === "unpaid") {
        return depositPayment.amount
      }
    } else if (type === "final") {
      const finalPayment = registration.payments.find((p) => p.type === "final")
      if (finalPayment && finalPayment.status === "unpaid") {
        return finalPayment.amount
      }
    }

    return remaining
  }

  // Update amount when payment type changes
  const handleTypeChange = (type: "deposit" | "final" | "other") => {
    setPaymentType(type)
    if (type !== "other") {
      setAmount(getSuggestedAmount(type).toString())
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const paymentAmount = parseFloat(amount)
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      return
    }

    const newPayment: Omit<Payment, "id"> = {
      type: paymentType,
      amount: paymentAmount,
      dueDate: null,
      paidDate: new Date(paymentDate).toISOString(),
      status: "paid",
      note: note.trim() || undefined,
    }

    onRecordPayment(registration.id, newPayment)
    onOpenChange(false)

    // Reset form
    setPaymentType("final")
    setAmount("")
    setPaymentDate(format(new Date(), "yyyy-MM-dd"))
    setNote("")
  }

  // Initialize amount on open
  useEffect(() => {
    if (open && registration) {
      setAmount(getSuggestedAmount(paymentType).toString())
    }
  }, [open, registration, paymentType])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Zaznamenat platbu</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Typ platby */}
          <div>
            <Label className="text-sm font-medium text-[#73726e] mb-3 block">
              Typ platby
            </Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="deposit"
                  checked={paymentType === "deposit"}
                  onChange={() => handleTypeChange("deposit")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#37352f]">Záloha</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="final"
                  checked={paymentType === "final"}
                  onChange={() => handleTypeChange("final")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#37352f]">Doplatek</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="other"
                  checked={paymentType === "other"}
                  onChange={() => handleTypeChange("other")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#37352f]">Jiná částka</span>
              </label>
            </div>
          </div>

          {/* Částka */}
          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-[#73726e]">
              Částka
            </Label>
            <div className="mt-1 relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                required
                min="0"
                step="0.01"
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#73726e]">
                Kč
              </span>
            </div>
          </div>

          {/* Datum platby */}
          <div>
            <Label
              htmlFor="paymentDate"
              className="text-sm font-medium text-[#73726e]"
            >
              Datum platby
            </Label>
            <Input
              id="paymentDate"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Poznámka */}
          <div>
            <Label htmlFor="note" className="text-sm font-medium text-[#73726e]">
              Poznámka
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Volitelná poznámka k platbě..."
              className="mt-1 min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Zrušit
            </Button>
            <Button type="submit">Zaznamenat</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
