"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEvents } from "@/lib/event-context"
import { toast } from "sonner"

interface RecordPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RecordPaymentDialog({ open, onOpenChange }: RecordPaymentDialogProps) {
  const { events } = useEvents()
  const [formData, setFormData] = useState({
    eventId: "",
    participantName: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "transfer",
    note: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.eventId) {
      toast.error("Vyberte akci")
      return
    }
    if (!formData.participantName) {
      toast.error("Zadejte jméno účastníka")
      return
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Zadejte platnou částku")
      return
    }

    // TODO: Save payment to context/localStorage
    console.log("Saving payment:", formData)
    toast.success("Platba byla úspěšně zaznamenána")

    // Reset form and close
    setFormData({
      eventId: "",
      participantName: "",
      amount: "",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "transfer",
      note: "",
    })
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFormData({
      eventId: "",
      participantName: "",
      amount: "",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "transfer",
      note: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Zaznamenat platbu</DialogTitle>
          <DialogDescription>
            Zaznamenejte přijatou platbu od účastníka akce
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Event Selection */}
          <div className="space-y-2">
            <Label htmlFor="event">Akce *</Label>
            <Select value={formData.eventId} onValueChange={(value) => setFormData({ ...formData, eventId: value })}>
              <SelectTrigger id="event">
                <SelectValue placeholder="Vyberte akci" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Participant Name */}
          <div className="space-y-2">
            <Label htmlFor="participant">Účastník *</Label>
            <Input
              id="participant"
              value={formData.participantName}
              onChange={(e) => setFormData({ ...formData, participantName: e.target.value })}
              placeholder="Jméno účastníka"
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Částka (Kč) *</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0"
              required
            />
          </div>

          {/* Payment Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Datum platby *</Label>
            <Input
              id="date"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              required
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="method">Způsob platby</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger id="method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transfer">Bankovní převod</SelectItem>
                <SelectItem value="cash">Hotově</SelectItem>
                <SelectItem value="card">Kartou</SelectItem>
                <SelectItem value="other">Jiný</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">Poznámka</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Volitelná poznámka k platbě"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Uložit platbu
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Zrušit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
