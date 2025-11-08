"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEvents } from "@/lib/event-context"
import { ChevronDown, Plus, Calendar, Users, MessageSquare, Settings, Eye, CreditCard, Sliders } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SidebarMenu() {
  const pathname = usePathname()
  const { events } = useEvents()
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  // Get current event ID from pathname
  const currentEventId = pathname.includes("/dashboard/events/") ? pathname.split("/")[3] : null

  // Auto-expand current event when navigating directly to its page
  useEffect(() => {
    if (!currentEventId) return
    setExpandedEvent((prev) => (prev === currentEventId ? prev : currentEventId))
  }, [currentEventId])

  const globalMenuItems = [
    { id: "overview", label: "Přehled", href: "/dashboard", icon: Calendar },
    { id: "contacts", label: "Kontakty", href: "/dashboard/contacts", icon: Users },
    { id: "communication", label: "Komunikace", href: "/dashboard/communication", icon: MessageSquare },
    { id: "settings", label: "Organizace", href: "/dashboard/organization", icon: Settings },
  ]

  const eventMenuItems = [
    { label: "Přehled", href: (id: string) => `/dashboard/events/${id}`, icon: Eye },
    { label: "Přihlášky", href: (id: string) => `/dashboard/events/${id}?tab=registrations`, icon: Users },
    { label: "Platby", href: (id: string) => `/dashboard/events/${id}?tab=payments`, icon: CreditCard },
    { label: "Nastavení", href: (id: string) => `/dashboard/events/${id}?tab=settings`, icon: Sliders },
  ]

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
      {/* Global Menu Items */}
      <div className="space-y-1 mb-6">
        {globalMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-emerald-200 hover:bg-emerald-700/40",
                  isActive && "bg-emerald-700/50 text-emerald-50 font-medium",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Events Section */}
      <div className="space-y-1">
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Akce</h3>
        </div>

        {/* Create New Event */}
        <Link href="/dashboard/events">
          <Button variant="ghost" className="w-full justify-start gap-3 text-emerald-200 hover:bg-emerald-700/40">
            <Plus className="h-4 w-4" />
            Nová akce
          </Button>
        </Link>

        {/* Events List */}
        {events.map((event) => {
          const isExpanded = expandedEvent === event.id
          const hasSubmenu = true

          return (
            <div key={event.id} className="space-y-1">
              {/* Event Item */}
              <button
                onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors relative",
                  isExpanded || currentEventId === event.id
                    ? "bg-emerald-700/50 text-emerald-50 font-medium"
                    : "text-emerald-200 hover:bg-emerald-700/40",
                )}
              >
                {/* Left indicator bar */}
                {(isExpanded || currentEventId === event.id) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-r" />
                )}

                <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded ? "rotate-180" : "")} />
                <span className="truncate flex-1 text-left">{event.name}</span>
              </button>

              {/* Event Submenu */}
              {isExpanded && (
                <div className="ml-2 space-y-1 border-l border-emerald-700/30 pl-2">
                  {eventMenuItems.map((subitem) => {
                    const subHref = subitem.href(event.id)
                    const isSubActive =
                      (pathname === `/dashboard/events/${event.id}` && !pathname.includes("?")) || pathname === subHref
                    const SubIcon = subitem.icon
                    return (
                      <Link key={subitem.label} href={subHref}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 text-sm text-emerald-300 hover:bg-emerald-700/20 hover:text-emerald-200",
                            isSubActive && "bg-emerald-700/30 text-emerald-100 font-medium",
                          )}
                        >
                          <SubIcon className="h-4 w-4" />
                          {subitem.label}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
