"use client"

import { Search, ChevronDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RegistrationFilterRowProps {
  searchValue: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  paymentFilter: string
  onPaymentFilterChange: (payment: string) => void
}

export function RegistrationFilterRow({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
}: RegistrationFilterRowProps) {
  const statusOptions = [
    { value: "all", label: "Všechny stavy" },
    { value: "confirmed", label: "Potvrzeno" },
    { value: "waitlist", label: "Na čekací listině" },
    { value: "cancelled", label: "Zrušeno" },
  ]

  const paymentOptions = [
    { value: "all", label: "Všechny platby" },
    { value: "paid", label: "Zaplaceno" },
    { value: "unpaid", label: "Nezaplaceno" },
    { value: "partial", label: "Částečně zaplaceno" },
  ]

  const selectedStatusLabel =
    statusOptions.find((o) => o.value === statusFilter)?.label || "Všechny stavy"
  const selectedPaymentLabel =
    paymentOptions.find((o) => o.value === paymentFilter)?.label ||
    "Všechny platby"

  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9b9a97]" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Hledat..."
          className="pl-10 pr-4 py-2 w-[280px] rounded-md border border-[#e9e9e7] text-sm text-[#37352f] placeholder:text-[#9b9a97] focus:outline-none focus:border-[#2383e2] focus:ring-2 focus:ring-[#2383e21a] transition-colors"
        />
      </div>

      {/* Status Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-[#37352f] hover:bg-[#f7f6f5] px-3 py-2 rounded-md border border-transparent hover:border-[#e9e9e7] transition-colors">
          {selectedStatusLabel}
          <ChevronDown className="h-4 w-4 text-[#9b9a97]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onStatusFilterChange(option.value)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {statusFilter === option.value && (
                  <Check className="h-4 w-4 text-[#2383e2]" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Payment Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-[#37352f] hover:bg-[#f7f6f5] px-3 py-2 rounded-md border border-transparent hover:border-[#e9e9e7] transition-colors">
          {selectedPaymentLabel}
          <ChevronDown className="h-4 w-4 text-[#9b9a97]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[220px]">
          {paymentOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onPaymentFilterChange(option.value)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {paymentFilter === option.value && (
                  <Check className="h-4 w-4 text-[#2383e2]" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
