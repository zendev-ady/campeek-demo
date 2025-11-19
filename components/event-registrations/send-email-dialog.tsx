"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { Registration, Parent } from "@/lib/types"
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

interface SendEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration: Registration | null
  parents: Parent[]
  onSendEmail: (registrationId: string, subject: string, content: string) => void
}

export function SendEmailDialog({
  open,
  onOpenChange,
  registration,
  parents,
  onSendEmail,
}: SendEmailDialogProps) {
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  if (!registration) return null

  // Get parent(s)
  const primaryParent = parents.find((p) => p.id === registration.parentId)
  const secondaryParent = registration.secondaryParentId
    ? parents.find((p) => p.id === registration.secondaryParentId)
    : null

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject.trim() || !content.trim()) {
      return
    }

    onSendEmail(registration.id, subject.trim(), content.trim())
    onOpenChange(false)

    // Reset form
    setSubject("")
    setContent("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nová zpráva</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Příjemci */}
          <div>
            <Label className="text-sm font-medium text-[#73726e] mb-2 block">
              Příjemci
            </Label>
            <div className="flex flex-wrap gap-2">
              {primaryParent && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f7f6f5] text-[#37352f] text-sm rounded-md border border-[#e9e9e7]">
                  <span>
                    {primaryParent.name} {primaryParent.surname} (
                    {primaryParent.email})
                  </span>
                </div>
              )}
              {secondaryParent && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f7f6f5] text-[#37352f] text-sm rounded-md border border-[#e9e9e7]">
                  <span>
                    {secondaryParent.name} {secondaryParent.surname} (
                    {secondaryParent.email})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Předmět */}
          <div>
            <Label htmlFor="subject" className="text-sm font-medium text-[#73726e]">
              Předmět
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Zadejte předmět zprávy..."
              required
              className="mt-1"
            />
          </div>

          {/* Zpráva */}
          <div>
            <Label htmlFor="content" className="text-sm font-medium text-[#73726e]">
              Zpráva
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Napište zprávu..."
              required
              className="mt-1 min-h-[200px]"
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
            <Button type="submit">Odeslat</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
