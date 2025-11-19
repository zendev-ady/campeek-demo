"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronRight, Check, AlertTriangle, XIcon } from "lucide-react"
import type { Registration, Parent, Participant, Event, Payment } from "@/lib/types"
import { format, differenceInYears } from "date-fns"
import { cs } from "date-fns/locale"
import { Button } from "@/components/ui/button"

interface RegistrationDetailSidebarProps {
  registration: Registration | null
  participants: Participant[]
  parents: Parent[]
  event: Event
  onClose: () => void
  onUpdateNote: (registrationId: string, note: string) => void
  onRecordPayment: (registration: Registration) => void
  onCancelRegistration: (registration: Registration) => void
  onSendEmail: (registration: Registration) => void
}

export function RegistrationDetailSidebar({
  registration,
  participants,
  parents,
  event,
  onClose,
  onUpdateNote,
  onRecordPayment,
  onCancelRegistration,
  onSendEmail,
}: RegistrationDetailSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [internalNote, setInternalNote] = useState("")

  useEffect(() => {
    if (registration) {
      setIsOpen(true)
      setInternalNote(registration.internalNote || "")
    } else {
      setIsOpen(false)
    }
  }, [registration])

  useEffect(() => {
    if (registration && internalNote !== registration.internalNote) {
      const timer = setTimeout(() => {
        onUpdateNote(registration.id, internalNote)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [internalNote, registration, onUpdateNote])

  if (!registration) return null

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  // Get participant
  const participant = participants.find((p) => p.id === registration.participantId)
  const age = participant
    ? differenceInYears(new Date(), new Date(participant.birthDate))
    : null

  // Get parents
  const primaryParent = parents.find((p) => p.id === registration.parentId)
  const secondaryParent = registration.secondaryParentId
    ? parents.find((p) => p.id === registration.secondaryParentId)
    : null

  // Calculate payment totals
  const totalPrice = registration.totalPrice || 0
  const amountPaid = registration.amountPaid || 0
  const remaining = totalPrice - amountPaid

  // Get status badge
  const getStatusBadge = () => {
    if (registration.status === "confirmed") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          Potvrzeno
        </span>
      )
    } else if (registration.status === "waitlist") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
          Na čekací listině
        </span>
      )
    } else if (registration.status === "cancelled") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          Zrušeno
        </span>
      )
    }
    return null
  }

  // Get payment status icon
  const getPaymentIcon = (payment: Payment) => {
    if (payment.status === "paid") {
      return <Check className="h-3.5 w-3.5 text-green-600" />
    }
    return <XIcon className="h-3.5 w-3.5 text-red-600" />
  }

  const participantName = participant
    ? `${participant.name} ${participant.surname}`
    : registration.children[0]?.name || "Neznámý účastník"

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-10" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 40 }}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[600px] bg-white shadow-[-2px_0_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold text-[#37352f]">
                {participantName}
              </h2>
              <button
                onClick={handleClose}
                className="text-[#9b9a97] hover:text-[#37352f] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {getStatusBadge()}
          </div>

          {/* Účastník */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Účastník
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Jméno
                  </div>
                  <div className="text-sm text-[#37352f]">{participantName}</div>
                </div>
                {age !== null && (
                  <div>
                    <div className="text-sm font-medium text-[#73726e] mb-1">
                      Věk
                    </div>
                    <div className="text-sm text-[#37352f]">{age} let</div>
                  </div>
                )}
              </div>

              {participant && (
                <>
                  <div>
                    <div className="text-sm font-medium text-[#73726e] mb-1">
                      Datum narození
                    </div>
                    <div className="text-sm text-[#37352f]">
                      {format(new Date(participant.birthDate), "d.M.yyyy", {
                        locale: cs,
                      })}
                    </div>
                  </div>

                  {participant.address && (
                    <div>
                      <div className="text-sm font-medium text-[#73726e] mb-1">
                        Adresa
                      </div>
                      <div className="text-sm text-[#37352f]">
                        {participant.address.street}, {participant.address.city},{" "}
                        {participant.address.zip}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Zdravotní informace */}
            {participant && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-[#73726e] mb-3">
                  Zdravotní informace
                </h4>
                <div className="space-y-3">
                  {participant.healthInfo.allergies && (
                    <div>
                      <div className="text-sm font-medium text-[#73726e] mb-1">
                        Alergie
                      </div>
                      <div className="text-sm text-[#37352f]">
                        {participant.healthInfo.allergies}
                      </div>
                    </div>
                  )}

                  {participant.healthInfo.healthRestrictions && (
                    <div>
                      <div className="text-sm font-medium text-[#73726e] mb-1">
                        Zdravotní omezení
                      </div>
                      <div className="text-sm text-[#37352f]">
                        {participant.healthInfo.healthRestrictions}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-x-4">
                    <div>
                      <div className="text-sm font-medium text-[#73726e] mb-1">
                        Zdravotní pojišťovna
                      </div>
                      <div className="text-sm text-[#37352f]">
                        {participant.healthInfo.healthInsurance}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#73726e] mb-1">
                        Plavec
                      </div>
                      <div className="text-sm text-[#37352f]">
                        {participant.healthInfo.swimmer ? "Ano" : "Ne"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rodič (kontaktní osoba) */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Rodič (kontaktní osoba)
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              {primaryParent && (
                <div className="border border-[#e9e9e7] rounded-lg p-4 hover:border-[#d3d3d1] transition-colors cursor-pointer">
                  <div className="font-medium text-sm text-[#37352f] mb-2">
                    {primaryParent.name} {primaryParent.surname}
                  </div>
                  <div className="text-sm text-[#73726e] mb-2">
                    {primaryParent.email} · {primaryParent.phone}
                  </div>
                  <div className="text-sm font-medium text-[#73726e] mt-3 mb-1">
                    Adresa
                  </div>
                  <div className="text-sm text-[#37352f]">
                    {primaryParent.address.street}, {primaryParent.address.city},{" "}
                    {primaryParent.address.zip}
                  </div>
                </div>
              )}

              {secondaryParent && (
                <div className="border border-[#e9e9e7] rounded-lg p-4 hover:border-[#d3d3d1] transition-colors cursor-pointer">
                  <div className="font-medium text-sm text-[#37352f] mb-1">
                    {secondaryParent.name} {secondaryParent.surname}
                  </div>
                  <div className="text-sm text-[#73726e]">
                    {secondaryParent.email} · {secondaryParent.phone}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Platba */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Platba
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Celková cena
                  </div>
                  <div className="text-sm text-[#37352f] font-semibold">
                    {totalPrice.toLocaleString("cs-CZ")} Kč
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Zaplaceno
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    {amountPaid.toLocaleString("cs-CZ")} Kč
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Zbývá
                  </div>
                  <div className="text-sm text-red-700 font-semibold">
                    {remaining.toLocaleString("cs-CZ")} Kč
                  </div>
                </div>
              </div>

              {/* Payment cards */}
              <div className="space-y-2 mt-4">
                {registration.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border border-[#e9e9e7] rounded-lg p-4"
                  >
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-[#73726e]">
                        {payment.type === "deposit"
                          ? "Záloha"
                          : payment.type === "final"
                            ? "Doplatek"
                            : "Jiná částka"}
                      </div>
                      <div className="text-[#37352f] font-semibold">
                        {(payment.amount || 0).toLocaleString("cs-CZ")} Kč
                      </div>

                      {payment.dueDate && (
                        <>
                          <div className="text-[#73726e]">Splatnost</div>
                          <div className="text-[#37352f]">
                            {format(new Date(payment.dueDate), "d.M.yyyy", {
                              locale: cs,
                            })}
                          </div>
                        </>
                      )}

                      <div className="text-[#73726e]">Stav</div>
                      <div className="flex items-center gap-1.5">
                        {getPaymentIcon(payment)}
                        <span
                          className={
                            payment.status === "paid"
                              ? "text-green-700"
                              : "text-red-700"
                          }
                        >
                          {payment.status === "paid" ? "Zaplaceno" : "Nezaplaceno"}
                        </span>
                      </div>

                      {payment.paidDate && (
                        <>
                          <div className="text-[#73726e]">Datum platby</div>
                          <div className="text-[#37352f]">
                            {format(new Date(payment.paidDate), "d.M.yyyy", {
                              locale: cs,
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {registration.status !== "cancelled" && remaining > 0 && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => onRecordPayment(registration)}
                >
                  + Zaznamenat platbu
                </Button>
              )}
            </div>
          </div>

          {/* Přihláška */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Přihláška
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Datum přihlášky
                  </div>
                  <div className="text-sm text-[#37352f]">
                    {format(
                      new Date(registration.registeredAt || registration.createdAt),
                      "d.M.yyyy HH:mm",
                      { locale: cs }
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Číslo přihlášky
                  </div>
                  <div className="text-sm text-[#37352f]">
                    {registration.registrationNumber}
                  </div>
                </div>
              </div>

              {registration.parentNote && (
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Poznámka od rodiče
                  </div>
                  <div className="text-sm text-[#37352f]">
                    {registration.parentNote}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interní poznámky */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Interní poznámky
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4">
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Poznámky viditelné pouze pro vás..."
                disabled={registration.status === "cancelled"}
                className="w-full min-h-[100px] p-3 border border-[#e9e9e7] rounded-lg text-sm text-[#37352f] placeholder:text-[#9b9a97] focus:outline-none focus:border-[#2383e2] focus:ring-2 focus:ring-[#2383e21a] transition-colors resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Historie změn */}
          <div className="mb-8">
            <button
              onClick={() => setHistoryExpanded(!historyExpanded)}
              className="flex items-center gap-2 text-sm font-medium text-[#37352f] hover:text-[#73726e] transition-colors mb-3"
            >
              {historyExpanded ? (
                <ChevronDown className="h-4 w-4 text-[#9b9a97]" />
              ) : (
                <ChevronRight className="h-4 w-4 text-[#9b9a97]" />
              )}
              Historie změn
            </button>

            {historyExpanded && (
              <div className="border-t border-[#e9e9e7] pt-4 space-y-2">
                {registration.changeHistory.length === 0 ? (
                  <div className="text-sm text-[#9b9a97]">Žádná historie</div>
                ) : (
                  registration.changeHistory.map((entry) => (
                    <div key={entry.id} className="text-sm py-1">
                      <div className="flex justify-between text-[#37352f]">
                        <span>{entry.action}</span>
                        <span className="text-[#73726e]">
                          {format(new Date(entry.timestamp), "d.M.yyyy HH:mm", {
                            locale: cs,
                          })}
                        </span>
                      </div>
                      <div className="text-[#9b9a97]">{entry.actor}</div>
                      {entry.note && (
                        <div className="text-[#73726e] italic mt-1">
                          {entry.note}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#e9e9e7]">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => onSendEmail(registration)}
              disabled={registration.status === "cancelled"}
            >
              Poslat email
            </Button>
            {registration.status === "confirmed" && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => onCancelRegistration(registration)}
              >
                Zrušit přihlášku
              </Button>
            )}
            {registration.status === "cancelled" && (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  // TODO: Implement restore
                }}
              >
                Obnovit přihlášku
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
