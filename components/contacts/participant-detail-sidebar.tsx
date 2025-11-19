"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import type { Participant, Parent, Event, Registration } from "@/lib/types"
import { format, differenceInYears } from "date-fns"
import { cs } from "date-fns/locale"

interface ParticipantDetailSidebarProps {
  participant: Participant | null
  parents: Parent[]
  events: Event[]
  registrations: Registration[]
  onClose: () => void
  onUpdateNote: (participantId: string, note: string) => void
}

export function ParticipantDetailSidebar({
  participant,
  parents,
  events,
  registrations,
  onClose,
  onUpdateNote,
}: ParticipantDetailSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [internalNote, setInternalNote] = useState("")

  useEffect(() => {
    if (participant) {
      setIsOpen(true)
      setInternalNote(participant.internalNote || "")
    } else {
      setIsOpen(false)
    }
  }, [participant])

  useEffect(() => {
    if (participant && internalNote !== participant.internalNote) {
      const timer = setTimeout(() => {
        onUpdateNote(participant.id, internalNote)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [internalNote, participant, onUpdateNote])

  if (!participant) return null

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  const age = differenceInYears(new Date(), new Date(participant.birthDate))

  // Get parents
  const participantParents = parents.filter((p) =>
    participant.parents.includes(p.id)
  )

  // Get event history
  const eventHistory = registrations
    .filter((reg) => participant.registrations.includes(reg.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((reg) => {
      const event = events.find((e) => e.id === reg.eventId)
      return {
        eventName: event?.name || "Neznámá akce",
        dateRange: event
          ? `${format(new Date(event.startDate), "d.M.yyyy", { locale: cs })}—${format(new Date(event.endDate), "d.M.yyyy", { locale: cs })}`
          : "",
        status: reg.status === "confirmed" ? "Potvrzeno" : reg.status === "pending" ? "Čeká" : "Zrušeno",
      }
    })

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
                {participant.name} {participant.surname}
              </h2>
              <button
                onClick={handleClose}
                className="text-[#9b9a97] hover:text-[#37352f] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {age} let
            </span>
          </div>

          {/* Základní údaje */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Základní údaje
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
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
              <div>
                <div className="text-sm font-medium text-[#73726e] mb-1">
                  Rodné číslo
                </div>
                <div className="text-sm text-[#37352f]">
                  {participant.rodneCislo || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Zdravotní informace */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Zdravotní informace
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              <div>
                <div className="text-sm font-medium text-[#73726e] mb-1">
                  Alergie
                </div>
                <div className="text-sm text-[#37352f]">
                  {participant.healthInfo.allergies || "—"}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-[#73726e] mb-1">
                  Zdravotní omezení
                </div>
                <div className="text-sm text-[#37352f]">
                  {participant.healthInfo.healthRestrictions || "—"}
                </div>
              </div>
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

          {/* Rodiče */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Rodiče
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              {participantParents.map((parent) => (
                <div
                  key={parent.id}
                  className="border border-[#e9e9e7] rounded-lg p-4 hover:border-[#d3d3d1] transition-colors cursor-pointer"
                >
                  <div className="font-medium text-sm text-[#37352f] mb-1">
                    {parent.name} {parent.surname} · rodič
                  </div>
                  <div className="text-sm text-[#73726e]">
                    {parent.email} · {parent.phone}
                  </div>
                </div>
              ))}
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
                placeholder="Např. bojí se psů, potřebuje vlastní pokoj..."
                className="w-full min-h-[100px] p-3 border border-[#e9e9e7] rounded-lg text-sm text-[#37352f] placeholder:text-[#9b9a97] focus:outline-none focus:border-[#2383e2] focus:ring-2 focus:ring-[#2383e21a] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Historie akcí */}
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
              Historie akcí
            </button>

            {historyExpanded && (
              <div className="border-t border-[#e9e9e7] pt-4 space-y-2">
                {eventHistory.length === 0 ? (
                  <div className="text-sm text-[#9b9a97]">
                    Žádná historie akcí
                  </div>
                ) : (
                  eventHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-2"
                    >
                      <span className="text-[#37352f] font-medium">
                        {item.eventName}
                      </span>
                      <span className="text-[#73726e]">{item.dateRange}</span>
                      <span className="text-[#73726e]">{item.status}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
