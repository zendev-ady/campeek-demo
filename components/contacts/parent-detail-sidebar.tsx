"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import type { Parent, Participant, Event, Registration } from "@/lib/types"
import { format, differenceInYears } from "date-fns"
import { cs } from "date-fns/locale"

interface ParentDetailSidebarProps {
  parent: Parent | null
  participants: Participant[]
  events: Event[]
  registrations: Registration[]
  onClose: () => void
  onUpdateNote: (parentId: string, note: string) => void
}

export function ParentDetailSidebar({
  parent,
  participants,
  events,
  registrations,
  onClose,
  onUpdateNote,
}: ParentDetailSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [internalNote, setInternalNote] = useState("")

  useEffect(() => {
    if (parent) {
      setIsOpen(true)
      setInternalNote(parent.internalNote || "")
    } else {
      setIsOpen(false)
    }
  }, [parent])

  useEffect(() => {
    if (parent && internalNote !== parent.internalNote) {
      const timer = setTimeout(() => {
        onUpdateNote(parent.id, internalNote)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [internalNote, parent, onUpdateNote])

  if (!parent) return null

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 300)
  }

  // Get children
  const children = participants.filter((p) =>
    parent.children.includes(p.id)
  )

  // Get event history
  const eventHistory = registrations
    .filter((reg) => parent.registrations.includes(reg.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((reg) => {
      const event = events.find((e) => e.id === reg.eventId)
      const childrenInReg = children.filter((child) =>
        reg.children.some((c) => c.name === `${child.name} ${child.surname}`)
      )
      return {
        eventName: event?.name || "Neznámá akce",
        dateRange: event
          ? `${format(new Date(event.startDate), "d.M.yyyy", { locale: cs })}—${format(new Date(event.endDate), "d.M.yyyy", { locale: cs })}`
          : "",
        children: childrenInReg.map((c) => c.name).join(", "),
      }
    })

  const getAge = (birthDate: string) => {
    return differenceInYears(new Date(), new Date(birthDate))
  }

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
                {parent.name} {parent.surname}
              </h2>
              <button
                onClick={handleClose}
                className="text-[#9b9a97] hover:text-[#37352f] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              {parent.status === "active" ? "Aktivní" : "Neaktivní"}
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
                  Email
                </div>
                <a
                  href={`mailto:${parent.email}`}
                  className="text-sm text-[#2383e2] hover:underline"
                >
                  {parent.email}
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-[#73726e] mb-1">
                  Telefon
                </div>
                <a
                  href={`tel:${parent.phone}`}
                  className="text-sm text-[#2383e2] hover:underline"
                >
                  {parent.phone}
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-[#73726e] mb-1">
                  Adresa
                </div>
                <div className="text-sm text-[#37352f]">
                  {parent.address.street}, {parent.address.city},{" "}
                  {parent.address.zip}
                </div>
              </div>
            </div>
          </div>

          {/* Fakturační údaje */}
          {parent.billingInfo && (
            <div className="mb-8">
              <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
                Fakturační údaje
              </h3>
              <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Název firmy
                  </div>
                  <div className="text-sm text-[#37352f]">
                    {parent.billingInfo.companyName}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-[#73726e] mb-1">
                      IČO
                    </div>
                    <div className="text-sm text-[#37352f]">
                      {parent.billingInfo.ico}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#73726e] mb-1">
                      DIČ
                    </div>
                    <div className="text-sm text-[#37352f]">
                      {parent.billingInfo.dic}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#73726e] mb-1">
                    Fakturační adresa
                  </div>
                  <div className="text-sm text-[#37352f]">
                    {parent.billingInfo.billingAddress.street},{" "}
                    {parent.billingInfo.billingAddress.city},{" "}
                    {parent.billingInfo.billingAddress.zip}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Děti */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-[#9b9a97] uppercase tracking-wider mb-3">
              Děti
            </h3>
            <div className="border-t border-[#e9e9e7] pt-4 space-y-3">
              {children.map((child) => {
                const age = getAge(child.birthDate)
                const allergies = child.healthInfo.allergies.trim() || "Žádné"
                return (
                  <div
                    key={child.id}
                    className="border border-[#e9e9e7] rounded-lg p-4 hover:border-[#d3d3d1] transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-sm text-[#37352f] mb-1">
                      {child.name} {child.surname} · {age} let
                    </div>
                    <div className="text-sm text-[#73726e] mb-1">
                      {format(new Date(child.birthDate), "d.M.yyyy", {
                        locale: cs,
                      })}
                    </div>
                    <div className="text-sm text-[#73726e]">
                      Alergie: {allergies}
                    </div>
                  </div>
                )
              })}
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
                      <span className="text-[#73726e]">{item.children}</span>
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
