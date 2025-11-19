"use client"

import { useState } from "react"
import { Check, AlertTriangle, X, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import type { Registration, Parent, Participant } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RegistrationsTableProps {
  registrations: Registration[]
  parents: Parent[]
  participants: Participant[]
  onRowClick: (registration: Registration) => void
}

export function RegistrationsTable({
  registrations,
  parents,
  participants,
  onRowClick,
}: RegistrationsTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Helper to get participant name
  const getParticipantName = (reg: Registration): string => {
    const participant = participants.find((p) => p.id === reg.participantId)
    if (participant) {
      return `${participant.name} ${participant.surname}`
    }
    // Fallback to legacy children field
    return reg.children[0]?.name || "—"
  }

  // Helper to get parent name
  const getParentName = (reg: Registration): string => {
    const parent = parents.find((p) => p.id === reg.parentId)
    if (parent) {
      return `${parent.name} ${parent.surname}`
    }
    return reg.parentName || "—"
  }

  // Helper to format registration date
  const getRegistrationDate = (reg: Registration): string => {
    try {
      return format(new Date(reg.registeredAt || reg.createdAt), "d.M.yyyy", {
        locale: cs,
      })
    } catch {
      return "—"
    }
  }

  // Helper to format payment status
  const getPaymentStatus = (reg: Registration) => {
    const paid = reg.amountPaid || 0
    const total = reg.totalPrice || 0

    if (paid >= total) {
      return {
        icon: <Check className="h-3.5 w-3.5 text-green-600" />,
        text: `${total.toLocaleString("cs-CZ")} Kč`,
        color: "text-green-700",
      }
    } else if (paid > 0) {
      return {
        icon: <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />,
        text: `${paid.toLocaleString("cs-CZ")} / ${total.toLocaleString("cs-CZ")} Kč`,
        color: "text-orange-700",
      }
    } else {
      return {
        icon: <X className="h-3.5 w-3.5 text-red-600" />,
        text: `0 / ${total.toLocaleString("cs-CZ")} Kč`,
        color: "text-red-700",
      }
    }
  }

  // Get status badge
  const getStatusBadge = (status: Registration["status"]) => {
    if (status === "waitlist") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
          Na čekací listině
        </span>
      )
    }
    if (status === "cancelled") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          Zrušeno
        </span>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        {/* Header */}
        <thead>
          <tr className="border-b border-[#e9e9e7]">
            <th className="text-left py-2 px-3 text-xs font-medium text-[#9b9a97]">
              Účastník
            </th>
            <th className="text-left py-2 px-3 text-xs font-medium text-[#9b9a97]">
              Rodič
            </th>
            <th className="text-left py-2 px-3 text-xs font-medium text-[#9b9a97]">
              Přihláška
            </th>
            <th className="text-left py-2 px-3 text-xs font-medium text-[#9b9a97]">
              Zaplaceno
            </th>
            <th className="w-8"></th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {registrations.map((reg) => {
            const isHovered = hoveredRow === reg.id
            const paymentStatus = getPaymentStatus(reg)
            const statusBadge = getStatusBadge(reg.status)
            const isCancelled = reg.status === "cancelled"

            return (
              <tr
                key={reg.id}
                className="cursor-pointer transition-colors duration-50"
                style={{
                  backgroundColor: isHovered ? "#f7f6f5" : "transparent",
                }}
                onMouseEnter={() => setHoveredRow(reg.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onRowClick(reg)}
              >
                <td className="py-3 px-3 text-sm text-[#37352f]">
                  <div className="flex items-center gap-2">
                    <span className={isCancelled ? "line-through" : ""}>
                      {getParticipantName(reg)}
                    </span>
                    {statusBadge}
                  </div>
                </td>
                <td
                  className={`py-3 px-3 text-sm text-[#37352f] ${isCancelled ? "line-through" : ""}`}
                >
                  {getParentName(reg)}
                </td>
                <td
                  className={`py-3 px-3 text-sm text-[#73726e] ${isCancelled ? "line-through" : ""}`}
                >
                  {getRegistrationDate(reg)}
                </td>
                <td className="py-3 px-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    {paymentStatus.icon}
                    <span
                      className={`${paymentStatus.color} font-mono`}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {paymentStatus.text}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={`transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4 text-[#9b9a97] hover:text-[#37352f]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        onRowClick(reg)
                      }}>
                        Detail
                      </DropdownMenuItem>
                      {reg.status === "waitlist" && (
                        <DropdownMenuItem>Potvrdit přihlášku</DropdownMenuItem>
                      )}
                      {reg.status === "confirmed" && (
                        <DropdownMenuItem className="text-red-600">
                          Zrušit přihlášku
                        </DropdownMenuItem>
                      )}
                      {reg.status === "cancelled" && (
                        <DropdownMenuItem>Obnovit přihlášku</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Empty state */}
      {registrations.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-base font-medium text-[#73726e] mb-1">
            Zatím nemáte žádné přihlášky
          </h3>
          <p className="text-sm text-[#9b9a97]">
            Sdílejte přihlašovací odkaz s rodiči
          </p>
        </div>
      )}
    </div>
  )
}
