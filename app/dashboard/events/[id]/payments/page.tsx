"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { useEvents } from "@/lib/event-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import {
  ArrowLeft,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  MoreVertical,
  Download,
  Info,
  X,
  Receipt,
} from "lucide-react"
import { format } from "date-fns"
import { RecordPaymentDialog } from "@/components/finances/record-payment-dialog"

// Mock payment data for event
interface EventPayment {
  id: string
  participantName: string
  parentName: string
  paymentType: "deposit" | "balance" | "full"
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  dueDate: string
  status: "unpaid" | "partial" | "paid" | "overdue"
}

const mockEventPayments: EventPayment[] = [
  {
    id: "1",
    participantName: "Jan Novák",
    parentName: "Marie Nováková",
    paymentType: "deposit",
    totalAmount: 3000,
    paidAmount: 3000,
    remainingAmount: 0,
    dueDate: "2025-12-15",
    status: "paid",
  },
  {
    id: "2",
    participantName: "Eva Svobodová",
    parentName: "Petr Svoboda",
    paymentType: "deposit",
    totalAmount: 3000,
    paidAmount: 1500,
    remainingAmount: 1500,
    dueDate: "2025-11-10",
    status: "overdue",
  },
  {
    id: "3",
    participantName: "Tomáš Dvořák",
    parentName: "Jana Dvořáková",
    paymentType: "full",
    totalAmount: 5000,
    paidAmount: 0,
    remainingAmount: 5000,
    dueDate: "2025-12-01",
    status: "unpaid",
  },
]

export default function EventPaymentsPage({ params }: { params: Promise<{ id: string }> }) {
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
        Načítám sekci plateb...
      </div>
    )
  }

  return <EventPaymentsPageClient eventId={resolvedId} />
}

function EventPaymentsPageClient({ eventId }: { eventId: string }) {
  const { getEventById } = useEvents()
  const event = getEventById(eventId)

  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false)
  const [showInfoBanner, setShowInfoBanner] = useState(true)

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = mockEventPayments.reduce((sum, p) => sum + p.totalAmount, 0)
    const paid = mockEventPayments.reduce((sum, p) => sum + p.paidAmount, 0)
    const remaining = mockEventPayments.reduce((sum, p) => sum + p.remainingAmount, 0)
    const paidCount = mockEventPayments.filter((p) => p.status === "paid").length
    const remainingCount = mockEventPayments.filter(
      (p) => p.status === "partial" || p.status === "unpaid"
    ).length

    return {
      total,
      paid,
      remaining,
      paidPercentage: total > 0 ? Math.round((paid / total) * 100) : 0,
      totalCount: mockEventPayments.length,
      paidCount,
      remainingCount,
    }
  }, [])

  // Filter payments
  const filteredPayments = useMemo(() => {
    return mockEventPayments.filter((payment) => {
      if (selectedStatus !== "all" && payment.status !== selectedStatus) {
        return false
      }
      if (selectedType !== "all" && payment.paymentType !== selectedType) {
        return false
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          payment.participantName.toLowerCase().includes(query) ||
          payment.parentName.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [selectedStatus, selectedType, searchQuery])

  const hasActiveFilters = selectedStatus !== "all" || selectedType !== "all" || searchQuery !== ""

  const resetFilters = () => {
    setSelectedStatus("all")
    setSelectedType("all")
    setSearchQuery("")
  }

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

  // Get payment type badge
  const getPaymentTypeBadge = (type: EventPayment["paymentType"]) => {
    switch (type) {
      case "deposit":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Záloha</Badge>
        )
      case "balance":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">Doplatek</Badge>
        )
      case "full":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">Plná platba</Badge>
        )
    }
  }

  // Get status badge
  const getStatusBadge = (payment: EventPayment) => {
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
            Částečně
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

  // Get progress bar color
  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return "bg-red-500"
    if (percentage === 100) return "bg-green-500"
    return "bg-orange-500"
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

  // Check if event has split payment
  const hasSplitPayment = mockEventPayments.some((p) => p.paymentType !== "full")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Platby · {event.name}</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Správa plateb ({mockEventPayments.length})
          </h1>
        </div>
        <Link href={`/dashboard/events/${event.id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět na přehled akce
          </Button>
        </Link>
      </div>

      {/* Info Banner for Split Payments */}
      {hasSplitPayment && showInfoBanner && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-start justify-between gap-4">
            <span className="text-blue-900">
              Tato akce má nastavenou platbu na zálohu a doplatek. Každý účastník má 2
              samostatné platby.
            </span>
            <button
              onClick={() => setShowInfoBanner(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
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
            <Progress value={statistics.paidPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.paidPercentage}% · {statistics.paidCount} plateb
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
      </div>

      {/* Quick Actions and Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          {/* Status Filter */}
          <div className="w-48">
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

          {/* Type Filter */}
          <div className="w-48">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Všechny typy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny typy</SelectItem>
                <SelectItem value="deposit">Záloha</SelectItem>
                <SelectItem value="balance">Doplatek</SelectItem>
                <SelectItem value="full">Plná platba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Hledat účastníka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={resetFilters}>
              Resetovat
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button onClick={() => setRecordPaymentOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Zaznamenat platbu
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportovat
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export do CSV</DropdownMenuItem>
              <DropdownMenuItem>Export do Excel</DropdownMenuItem>
              <DropdownMenuItem>Tisk přehledu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        /* Empty State */
        <Card>
          <CardContent className="text-center py-12">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {hasActiveFilters ? "Žádné platby odpovídají filtrům" : "Zatím žádné platby"}
            </p>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Zkuste upravit filtry pro zobrazení výsledků"
                : "Platby se vytvoří automaticky při přihlášení účastníka"}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Resetovat filtry
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block border-2 border-black rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-black text-white p-4 flex items-center gap-4 font-semibold text-sm">
              <div className="flex-[2] min-w-0">Účastník</div>
              <div className="w-32">Typ platby</div>
              <div className="w-24">Částka</div>
              <div className="flex-[2] min-w-0">Zaplaceno</div>
              <div className="w-32">Splatnost</div>
              <div className="w-36">Stav</div>
              <div className="w-10"></div>
            </div>

            {/* Table Rows */}
            <div className="divide-y-2 divide-gray-100">
              {filteredPayments.map((payment) => {
                const daysOverdue = getDaysOverdue(payment.dueDate)
                const isOverdue = payment.status === "overdue"
                const percentage = Math.round(
                  (payment.paidAmount / payment.totalAmount) * 100
                )

                return (
                  <div
                    key={payment.id}
                    className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Participant */}
                    <div className="flex-[2] min-w-0">
                      <div className="font-medium truncate">{payment.participantName}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Rodič: {payment.parentName}
                      </div>
                    </div>

                    {/* Payment Type */}
                    <div className="w-32">{getPaymentTypeBadge(payment.paymentType)}</div>

                    {/* Total Amount */}
                    <div className="w-24 font-medium">
                      {formatCurrency(payment.totalAmount)}
                    </div>

                    {/* Paid Amount with Progress */}
                    <div className="flex-[2] min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={
                            percentage === 0
                              ? "text-gray-500 font-medium"
                              : percentage === 100
                                ? "text-green-600 font-medium"
                                : "text-orange-600 font-medium"
                          }
                        >
                          {formatCurrency(payment.paidAmount)}
                        </span>
                        <span className="text-xs text-muted-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-1.5" />
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
                          <DropdownMenuItem>Zobrazit přihlášku</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredPayments.map((payment) => {
              const daysOverdue = getDaysOverdue(payment.dueDate)
              const isOverdue = payment.status === "overdue"
              const percentage = Math.round(
                (payment.paidAmount / payment.totalAmount) * 100
              )

              return (
                <Card key={payment.id}>
                  <CardContent className="p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{payment.participantName}</div>
                        <div className="text-sm text-muted-foreground">
                          Rodič: {payment.parentName}
                        </div>
                      </div>
                      {getStatusBadge(payment)}
                    </div>

                    {/* Type and Amount */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Typ platby</div>
                        {getPaymentTypeBadge(payment.paymentType)}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Celková částka</div>
                        <div className="font-medium">{formatCurrency(payment.totalAmount)}</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Zaplaceno</span>
                        <span className="text-xs font-medium">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2 mb-1" />
                      <div
                        className={
                          percentage === 0
                            ? "text-sm text-gray-500 font-medium"
                            : percentage === 100
                              ? "text-sm text-green-600 font-medium"
                              : "text-sm text-orange-600 font-medium"
                        }
                      >
                        {formatCurrency(payment.paidAmount)}
                      </div>
                    </div>

                    {/* Due Date */}
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

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Zaznamenat
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
      <RecordPaymentDialog open={recordPaymentOpen} onOpenChange={setRecordPaymentOpen} />
    </div>
  )
}
