"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEvents } from "@/lib/event-context"
import { ChevronDown, Calendar, Users, MessageSquare, Settings, Eye, CreditCard, Sliders, FolderTree } from "lucide-react"
import { cn } from "@/lib/utils"

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
    {
      label: "Přehled",
      href: (id: string) => `/dashboard/events/${id}`,
      icon: Eye,
      match: (currentPath: string, basePath: string) => currentPath === basePath,
    },
    {
      label: "Přihlášky",
      href: (id: string) => `/dashboard/events/${id}/registrations`,
      icon: Users,
      match: (currentPath: string, basePath: string) => currentPath === `${basePath}/registrations`,
    },
    {
      label: "Platby",
      href: (id: string) => `/dashboard/events/${id}/payments`,
      icon: CreditCard,
      match: (currentPath: string, basePath: string) => currentPath === `${basePath}/payments`,
    },
    {
      label: "Nastavení",
      href: (id: string) => `/dashboard/events/${id}/settings`,
      icon: Sliders,
      match: (currentPath: string, basePath: string) => currentPath === `${basePath}/settings`,
    },
  ]

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
      {/* Global Menu Items */}
      <div className="space-y-1 mb-6">
        {globalMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/10 text-white border border-emerald-400/30 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Events Section */}
      <div className="space-y-1">
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Akce</h3>
        </div>

        {/* Create New Event */}
        <Link href="/dashboard/events">
          <div className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all">
            <FolderTree className="h-4 w-4" />
            Správa akcí
          </div>
        </Link>

        {/* Events List */}
        {events.map((event) => {
          const isExpanded = expandedEvent === event.id
          const isCurrentEvent = currentEventId === event.id

          return (
            <div key={event.id} className="space-y-1">
              {/* Event Item */}
              <button
                onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all relative group",
                  isCurrentEvent
                    ? "bg-white/10 text-white border border-emerald-400/30"
                    : "text-white/70 hover:text-white hover:bg-white/5",
                )}
              >
                {/* Left accent bar */}
                {isCurrentEvent && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-r" />
                )}

                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform flex-shrink-0",
                    isExpanded ? "rotate-180 text-emerald-400" : "",
                  )}
                />
                <span className="truncate flex-1 text-left font-medium">{event.name}</span>
              </button>

              {/* Event Submenu */}
              {isExpanded && (
                <div className="ml-4 space-y-1 pl-2 border-l-2 border-white/10">
                  {eventMenuItems.map((subitem) => {
                    const subHref = subitem.href(event.id)
                    const baseEventPath = `/dashboard/events/${event.id}`
                    const isSubActive = subitem.match(pathname, baseEventPath)
                    const SubIcon = subitem.icon
                    return (
                      <Link key={subitem.label} href={subHref}>
                        <div
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                            isSubActive
                              ? "bg-white/5 text-white font-medium border border-white/10"
                              : "text-white/60 hover:text-white hover:bg-white/5",
                          )}
                        >
                          <SubIcon className="h-4 w-4" />
                          {subitem.label}
                        </div>
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
