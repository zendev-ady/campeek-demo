"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EventOnboardingWizard } from "./event-onboarding-wizard"

export function CreateEventDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Vytvořit novou akci</DialogTitle>
          <DialogDescription>Vyplňte informace o vaší akci nebo táboře v 5 jednoduchých krocích</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <EventOnboardingWizard onClose={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
