"use client"

import { useState, useMemo } from "react"
import { useEvents } from "@/lib/event-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Wallet,
} from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { RecordPaymentDialog } from "@/components/finances/record-payment-dialog"

// Mock payment data type
interface Payment {
  id: string
  participantName: string
  parentName: string
  eventId: string
  eventName: string
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  dueDate: string
  status: "unpaid" | "partial" | "paid" | "overdue"
}

// Mock data - později přesunout do context
const mockPayments: Payment[] = [
  {
    id: "1",
    participantName: "Jan Novák",
    parentName: "Marie Nováková",
    eventId: "evt1",
    eventName: "Letní tábor 2025",
    totalAmount: 3000,
    paidAmount: 1500,
    remainingAmount: 1500,
    dueDate: "2025-12-15",
    status: "partial",
  },
  {
    id: "2",
    participantName: "Eva Svobodová",
    parentName: "Petr Svoboda",
    eventId: "evt1",
    eventName: "Letní tábor 2025",
    totalAmount: 3000,
    paidAmount: 0,
    remainingAmount: 3000,
    dueDate: "2025-11-10",
    status: "overdue",
  },
  {
    id: "3",
    participantName: "Tomáš Dvořák",
    parentName: "Jana Dvořáková",
    eventId: "evt2",
    eventName: "Víkendový výlet",
    totalAmount: 2500,
    paidAmount: 2500,
    remainingAmount: 0,
    dueDate: "2025-12-01",
    status: "paid",
  },
]

export default function FinancesPage() {
  const { events, isLoading: eventsLoading } = useEvents()
  const [selectedEvent, setSelectedEvent] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false)

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = mockPayments.reduce((sum, p) => sum + p.totalAmount, 0)
    const paid = mockPayments.reduce((sum, p) => sum + p.paidAmount, 0)
    const remaining = mockPayments.reduce((sum, p) => sum + p.remainingAmount, 0)
    const overdue = mockPayments
      .filter((p) => p.status === "overdue")
      .reduce((sum, p) => sum + p.remainingAmount, 0)

    const paidCount = mockPayments.filter((p) => p.status === "paid").length
    const remainingCount = mockPayments.filter(
      (p) => p.status === "partial" || p.status === "unpaid"
    ).length
    const overdueCount = mockPayments.filter((p) => p.status === "overdue").length

    return {
      total,
      paid,
      remaining,
      overdue,
      totalCount: mockPayments.length,
      paidCount,
      remainingCount,
      overdueCount,
    }
  }, [])

  // Filter payments
  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      if (selectedEvent !== "all" && payment.eventId !== selectedEvent) {
        return false
      }
      if (selectedStatus !== "all" && payment.status !== selectedStatus) {
        return false
      }
      return true
    })
  }, [selectedEvent, selectedStatus])

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("cs-CZ") + " Kč"
  }

  // Get days overdue
  const getDaysOverdue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Get status badge
  const getStatusBadge = (payment: Payment) => {
    switch (payment.status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Zaplaceno
          </Badge>
        )
      case "partial":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Částečně zaplaceno
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Po splatnosti
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            Nezaplaceno
          </Badge>
        )
    }
  }

  const hasActiveFilters = selectedEvent !== "all" || selectedStatus !== "all"

  const resetFilters = () => {
    setSelectedEvent("all")
    setSelectedStatus("all")
  }

  if (eventsLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Statistics Cards Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 1. HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Finance</h1>
          <p className="text-muted-foreground mt-1">
            Přehled plateb a finančních toků vaší organizace
          </p>
        </div>
        <Button size="lg" onClick={() => setRecordPaymentOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Zaznamenat platbu
        </Button>
      </div>

      {/* 2. STATISTICS CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 - Total to Receive */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Celkem k přijetí
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(statistics.total)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              z {statistics.totalCount} přihlášek
            </p>
          </CardContent>
        </Card>

        {/* Card 2 - Paid */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Zaplaceno
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(statistics.paid)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.paidCount} plateb
            </p>
          </CardContent>
        </Card>

        {/* Card 3 - Remaining */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Zbývá doplatit
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {formatCurrency(statistics.remaining)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.remainingCount} plateb
            </p>
          </CardContent>
        </Card>

        {/* Card 4 - Overdue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Po splatnosti
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(statistics.overdue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.overdueCount} plateb
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. FILTERS */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Event Filter */}
        <div className="w-64">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger>
              <SelectValue placeholder="Všechny akce" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny akce</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="w-64">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Všechny stavy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny stavy</SelectItem>
              <SelectItem value="unpaid">Nezaplaceno</SelectItem>
              <SelectItem value="partial">Částečně zaplaceno</SelectItem>
              <SelectItem value="paid">Zaplaceno</SelectItem>
              <SelectItem value="overdue">Po splatnosti</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={resetFilters}>
            Resetovat filtry
          </Button>
        )}
      </div>

      {/* 4. PAYMENTS TABLE */}
      {filteredPayments.length === 0 ? (
        /* 5. EMPTY STATE */
        <Card>
          <CardContent className="text-center py-12">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {hasActiveFilters ? "Žádné výsledky" : "Zatím žádné platby"}
            </p>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Zkuste upravit filtry pro zobrazení výsledků"
                : "Přihlášky s platbami se zobrazí zde"}
            </p>
            {!hasActiveFilters && (
              <Button onClick={() => setRecordPaymentOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Zaznamenat platbu
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop Table - hidden on mobile */}
          <div className="hidden md:block border-2 border-black rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-black text-white p-4 flex items-center gap-4 font-semibold text-sm">
              <div className="flex-[2] min-w-0">Účastník</div>
              <div className="flex-[2] min-w-0">Akce</div>
              <div className="w-24">Částka</div>
              <div className="w-24">Zaplaceno</div>
              <div className="w-24">Zbývá</div>
              <div className="w-32">Splatnost</div>
              <div className="w-36">Stav</div>
              <div className="w-10"></div>
            </div>

            {/* Table Rows */}
            <div className="divide-y-2 divide-gray-100">
              {filteredPayments.map((payment) => {
                const daysOverdue = getDaysOverdue(payment.dueDate)
                const isOverdue = payment.status === "overdue"

                return (
                  <div
                    key={payment.id}
                    className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Participant */}
                    <div className="flex-[2] min-w-0">
                      <div className="font-medium truncate">{payment.participantName}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {payment.parentName}
                      </div>
                    </div>

                    {/* Event */}
                    <div className="flex-[2] min-w-0">
                      <button className="text-sm font-medium hover:underline text-left truncate w-full">
                        {payment.eventName}
                      </button>
                    </div>

                    {/* Total Amount */}
                    <div className="w-24 font-medium">{formatCurrency(payment.totalAmount)}</div>

                    {/* Paid Amount */}
                    <div
                      className={
                        payment.paidAmount === 0
                          ? "w-24 text-gray-500"
                          : payment.paidAmount === payment.totalAmount
                            ? "w-24 text-green-600 font-medium"
                            : "w-24 text-orange-600 font-medium"
                      }
                    >
                      {formatCurrency(payment.paidAmount)}
                    </div>

                    {/* Remaining */}
                    <div className="w-24 font-medium">
                      {payment.remainingAmount > 0
                        ? formatCurrency(payment.remainingAmount)
                        : "—"}
                    </div>

                    {/* Due Date */}
                    <div className="w-32">
                      <div className="text-sm">
                        {format(new Date(payment.dueDate), "dd.MM.yyyy")}
                      </div>
                      {isOverdue && daysOverdue > 0 && (
                        <Badge
                          variant="destructive"
                          className="mt-1 text-xs bg-red-100 text-red-800 border-red-200"
                        >
                          Po splatnosti {daysOverdue} dní
                        </Badge>
                      )}
                    </div>

                    {/* Status */}
                    <div className="w-36">{getStatusBadge(payment)}</div>

                    {/* Actions */}
                    <div className="w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Detail platby</DropdownMenuItem>
                          <DropdownMenuItem>Zaznamenat platbu</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Cards - shown on mobile only */}
          <div className="md:hidden space-y-4">
            {filteredPayments.map((payment) => {
              const daysOverdue = getDaysOverdue(payment.dueDate)
              const isOverdue = payment.status === "overdue"

              return (
                <Card key={payment.id}>
                  <CardContent className="p-4 space-y-3">
                    {/* Header - Participant & Status */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{payment.participantName}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.parentName}
                        </div>
                      </div>
                      {getStatusBadge(payment)}
                    </div>

                    {/* Event */}
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Akce</div>
                      <button className="text-sm font-medium hover:underline text-left">
                        {payment.eventName}
                      </button>
                    </div>

                    {/* Amounts Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Celková částka</div>
                        <div className="font-medium">{formatCurrency(payment.totalAmount)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Zaplaceno</div>
                        <div
                          className={
                            payment.paidAmount === 0
                              ? "text-gray-500 font-medium"
                              : payment.paidAmount === payment.totalAmount
                                ? "text-green-600 font-medium"
                                : "text-orange-600 font-medium"
                          }
                        >
                          {formatCurrency(payment.paidAmount)}
                        </div>
                      </div>
                      {payment.remainingAmount > 0 && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Zbývá</div>
                          <div className="font-medium">
                            {formatCurrency(payment.remainingAmount)}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Splatnost</div>
                        <div className="text-sm">
                          {format(new Date(payment.dueDate), "dd.MM.yyyy")}
                        </div>
                        {isOverdue && daysOverdue > 0 && (
                          <Badge
                            variant="destructive"
                            className="mt-1 text-xs bg-red-100 text-red-800 border-red-200"
                          >
                            Po splatnosti {daysOverdue} dní
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Detail platby
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Zaznamenat platbu
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}

      {/* Record Payment Dialog */}
      <RecordPaymentDialog
        open={recordPaymentOpen}
        onOpenChange={setRecordPaymentOpen}
      />
    </div>
  )
}
