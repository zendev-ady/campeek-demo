"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { StatsRow } from "@/components/event-registrations/stats-row"
import { RegistrationFilterRow } from "@/components/event-registrations/registration-filter-row"
import { RegistrationsTable } from "@/components/event-registrations/registrations-table"
import { RegistrationDetailSidebar } from "@/components/event-registrations/registration-detail-sidebar"
import { RecordPaymentDialog } from "@/components/event-registrations/record-payment-dialog"
import { CancelRegistrationDialog } from "@/components/event-registrations/cancel-registration-dialog"
import { SendEmailDialog } from "@/components/event-registrations/send-email-dialog"
import type { Registration, Parent, Participant, Payment, ChangeHistoryEntry } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function EventRegistrationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [resolvedId, setResolvedId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    params.then(({ id }) => {
      if (isMounted) setResolvedId(id)
    })
    return () => {
      isMounted = false
    }
  }, [params])

  if (!resolvedId) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-black">
        Načítám sekci přihlášek...
      </div>
    )
  }

  return <EventRegistrationsPageClient eventId={resolvedId} />
}

function EventRegistrationsPageClient({ eventId }: { eventId: string }) {
  const { getEventById } = useEvents()
  const { toast } = useToast()
  const event = getEventById(eventId)

  // State
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [parents, setParents] = useState<Parent[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)

  // Load data
  useEffect(() => {
    const loadedRegistrations = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    ) as Registration[]
    const loadedParents = JSON.parse(
      localStorage.getItem("parents") || "[]"
    ) as Parent[]
    const loadedParticipants = JSON.parse(
      localStorage.getItem("participants") || "[]"
    ) as Participant[]

    // Filter registrations for this event
    const eventRegistrations = loadedRegistrations.filter(
      (r) => r.eventId === eventId
    )

    setRegistrations(eventRegistrations)
    setParents(loadedParents)
    setParticipants(loadedParticipants)
  }, [eventId])

  // Filter registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      // Search filter
      const searchLower = searchValue.toLowerCase()
      const participant = participants.find((p) => p.id === reg.participantId)
      const parent = parents.find((p) => p.id === reg.parentId)
      const participantName = participant
        ? `${participant.name} ${participant.surname}`
        : reg.children[0]?.name || ""
      const parentName = parent
        ? `${parent.name} ${parent.surname}`
        : reg.parentName || ""

      const matchesSearch =
        !searchValue ||
        participantName.toLowerCase().includes(searchLower) ||
        parentName.toLowerCase().includes(searchLower)

      // Status filter
      let matchesStatus = true
      if (statusFilter !== "all") {
        matchesStatus = reg.status === statusFilter
      }

      // Payment filter
      let matchesPayment = true
      if (paymentFilter === "paid") {
        matchesPayment = reg.amountPaid >= reg.totalPrice
      } else if (paymentFilter === "unpaid") {
        matchesPayment = reg.amountPaid === 0
      } else if (paymentFilter === "partial") {
        matchesPayment =
          reg.amountPaid > 0 && reg.amountPaid < reg.totalPrice
      }

      return matchesSearch && matchesStatus && matchesPayment
    })
  }, [registrations, searchValue, statusFilter, paymentFilter, participants, parents])

  // Update internal note
  const handleUpdateNote = (registrationId: string, note: string) => {
    const updatedRegistrations = registrations.map((reg) =>
      reg.id === registrationId ? { ...reg, internalNote: note } : reg
    )
    setRegistrations(updatedRegistrations)
    localStorage.setItem("registrations", JSON.stringify(updatedRegistrations))
  }

  // Record payment
  const handleRecordPayment = (
    registrationId: string,
    payment: Omit<Payment, "id">
  ) => {
    const registration = registrations.find((r) => r.id === registrationId)
    if (!registration) return

    const newPayment: Payment = {
      ...payment,
      id: `pay-${Date.now()}`,
    }

    const newAmountPaid = registration.amountPaid + payment.amount

    const changeEntry: ChangeHistoryEntry = {
      id: `ch-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "Platba zaznamenána",
      actor: "Demo Organizátor",
      note: `${payment.amount.toLocaleString("cs-CZ")} Kč`,
    }

    const updatedRegistrations = registrations.map((reg) =>
      reg.id === registrationId
        ? {
            ...reg,
            payments: [...reg.payments, newPayment],
            amountPaid: newAmountPaid,
            changeHistory: [...reg.changeHistory, changeEntry],
          }
        : reg
    )

    setRegistrations(updatedRegistrations)
    localStorage.setItem("registrations", JSON.stringify(updatedRegistrations))

    // Update selected registration
    const updatedReg = updatedRegistrations.find((r) => r.id === registrationId)
    if (updatedReg) {
      setSelectedRegistration(updatedReg)
    }

    toast({
      title: "✓ Platba zaznamenána",
      description: `Platba ${payment.amount.toLocaleString("cs-CZ")} Kč byla úspěšně zaznamenána.`,
    })
  }

  // Cancel registration
  const handleCancelRegistration = (registrationId: string, reason: string) => {
    const changeEntry: ChangeHistoryEntry = {
      id: `ch-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "Přihláška zrušena",
      actor: "Demo Organizátor",
      note: reason || undefined,
    }

    const updatedRegistrations = registrations.map((reg) =>
      reg.id === registrationId
        ? {
            ...reg,
            status: "cancelled" as const,
            changeHistory: [...reg.changeHistory, changeEntry],
          }
        : reg
    )

    setRegistrations(updatedRegistrations)
    localStorage.setItem("registrations", JSON.stringify(updatedRegistrations))

    // Update selected registration
    const updatedReg = updatedRegistrations.find((r) => r.id === registrationId)
    if (updatedReg) {
      setSelectedRegistration(updatedReg)
    }

    toast({
      title: "Přihláška zrušena",
      description: "Rodič bude informován emailem.",
    })
  }

  // Send email
  const handleSendEmail = (
    registrationId: string,
    subject: string,
    content: string
  ) => {
    const changeEntry: ChangeHistoryEntry = {
      id: `ch-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `Email odeslán: ${subject}`,
      actor: "Demo Organizátor",
    }

    const updatedRegistrations = registrations.map((reg) =>
      reg.id === registrationId
        ? {
            ...reg,
            changeHistory: [...reg.changeHistory, changeEntry],
          }
        : reg
    )

    setRegistrations(updatedRegistrations)
    localStorage.setItem("registrations", JSON.stringify(updatedRegistrations))

    // Update selected registration
    const updatedReg = updatedRegistrations.find((r) => r.id === registrationId)
    if (updatedReg) {
      setSelectedRegistration(updatedReg)
    }

    toast({
      title: "✓ Email odeslán",
      description: "Zpráva byla úspěšně odeslána rodiči.",
    })
  }

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold">Akce nenalezena</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#73726e]">
        <Link
          href="/dashboard"
          className="hover:text-[#37352f] transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/dashboard/events"
          className="hover:text-[#37352f] transition-colors"
        >
          Akce
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#37352f]">{event.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#37352f]">{event.name}</h1>
        <Link href={`/dashboard/events/${event.id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět na přehled
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#e9e9e7]">
        <Link
          href={`/dashboard/events/${event.id}`}
          className="pb-2 text-sm font-medium text-[#73726e] hover:text-[#37352f] transition-colors relative"
        >
          Přehled
        </Link>
        <div className="pb-2 text-sm font-medium text-[#37352f] transition-colors relative">
          Přihlášky
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]" />
        </div>
        <Link
          href={`/dashboard/events/${event.id}/payments`}
          className="pb-2 text-sm font-medium text-[#73726e] hover:text-[#37352f] transition-colors relative"
        >
          Platby
        </Link>
        <Link
          href={`/dashboard/events/${event.id}/settings`}
          className="pb-2 text-sm font-medium text-[#73726e] hover:text-[#37352f] transition-colors relative"
        >
          Nastavení
        </Link>
      </div>

      {/* Stats Row */}
      <StatsRow registrations={registrations} event={event} />

      {/* Filter Row */}
      <RegistrationFilterRow
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        paymentFilter={paymentFilter}
        onPaymentFilterChange={setPaymentFilter}
      />

      {/* Table */}
      <RegistrationsTable
        registrations={filteredRegistrations}
        parents={parents}
        participants={participants}
        onRowClick={setSelectedRegistration}
      />

      {/* Sidebar */}
      {event && (
        <RegistrationDetailSidebar
          registration={selectedRegistration}
          participants={participants}
          parents={parents}
          event={event}
          onClose={() => setSelectedRegistration(null)}
          onUpdateNote={handleUpdateNote}
          onRecordPayment={(reg) => {
            setPaymentDialogOpen(true)
          }}
          onCancelRegistration={(reg) => {
            setCancelDialogOpen(true)
          }}
          onSendEmail={(reg) => {
            setEmailDialogOpen(true)
          }}
        />
      )}

      {/* Dialogs */}
      <RecordPaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        registration={selectedRegistration}
        onRecordPayment={handleRecordPayment}
      />

      <CancelRegistrationDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        registration={selectedRegistration}
        onCancelRegistration={handleCancelRegistration}
      />

      <SendEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        registration={selectedRegistration}
        parents={parents}
        onSendEmail={handleSendEmail}
      />
    </div>
  )
}
