"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Hledat..."
          className="pl-9"
        />
      </div>

      {/* Status Select */}
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Všechny stavy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Všechny stavy</SelectItem>
          <SelectItem value="confirmed">Potvrzeno</SelectItem>
          <SelectItem value="waitlist">Na čekací listině</SelectItem>
          <SelectItem value="cancelled">Zrušeno</SelectItem>
        </SelectContent>
      </Select>

      {/* Payment Select */}
      <Select value={paymentFilter} onValueChange={onPaymentFilterChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Všechny platby" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Všechny platby</SelectItem>
          <SelectItem value="paid">Zaplaceno</SelectItem>
          <SelectItem value="unpaid">Nezaplaceno</SelectItem>
          <SelectItem value="partial">Částečně zaplaceno</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
