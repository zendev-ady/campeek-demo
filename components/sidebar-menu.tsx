"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEvents } from "@/lib/event-context"
import { ChevronDown, Calendar, Users, MessageSquare, Settings, Eye, CreditCard, Sliders, FolderTree, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SidebarMenu() {
  const pathname = usePathname()
  const { events } = useEvents()
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  // Get current event ID from pathname
  const currentEventId = pathname.includes("/events/") ? pathname.split("/")[2] : null

  // Auto-expand current event when navigating directly to its page
  useEffect(() => {
    if (!currentEventId) return
    setExpandedEvent((prev) => (prev === currentEventId ? prev : currentEventId))
  }, [currentEventId])

  const globalMenuItems = [
    { id: "overview", label: "Přehled", href: "/prehled", icon: Calendar },
    { id: "contacts", label: "Kontakty", href: "/kontakty", icon: Users },
    { id: "communication", label: "Komunikace", href: "/komunikace", icon: MessageSquare },
    { id: "finances", label: "Finance", href: "/finance", icon: Wallet },
    { id: "settings", label: "Organizace", href: "/organizace", icon: Settings },
  ]

  const eventMenuItems = [
    {
      label: "Přehled",
      href: (id: string) => `/akce/${id}`,
      icon: Eye,
      match: (currentPath: string, basePath: string) => currentPath === basePath,
    },
    {
      label: "Přihlášky",
      href: (id: string) => `/akce/${id}/prihlasky`,
      icon: Users,
      match: (currentPath: string, basePath: string) => currentPath === `${basePath}/prihlasky`,
    },
    {
      label: "Platby",
      href: (id: string) => `/akce/${id}/platby`,
      icon: CreditCard,
      match: (currentPath: string, basePath: string) => currentPath === `${basePath}/platby`,
    },
    {
      label: "Nastavení",
      href: (id: string) => `/akce/${id}/nastaveni`,
      icon: Sliders,
      match: (currentPath: string, basePath: string) => currentPath === `${basePath}/nastaveni`,
    },
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
                  "w-full justify-start gap-3 text-white",
                  isActive && "bg-white text-black font-medium",
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
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Akce</h3>
        </div>

        {/* Create New Event */}
        <Link href="/akce">
          <Button variant="ghost" className="w-full justify-start gap-3 text-white">
            <FolderTree className="h-4 w-4" />
            Správa akcí
          </Button>
        </Link>

        {/* Events List */}
        {events.map((event) => {
          const isExpanded = expandedEvent === event.id

          return (
            <div key={event.id} className="space-y-1">
              {/* Event Item */}
              <button
                onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm relative",
                  isExpanded || currentEventId === event.id
                    ? "bg-white text-black font-medium"
                    : "text-white",
                )}
              >
                {/* Left indicator bar */}
                {(isExpanded || currentEventId === event.id) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                )}

                <ChevronDown className={cn("h-4 w-4", isExpanded ? "rotate-180" : "")} />
                <span className="truncate flex-1 text-left">{event.name}</span>
              </button>

              {/* Event Submenu */}
              {isExpanded && (
                <div className="ml-2 space-y-1 border-l-2 border-white pl-2">
                  {eventMenuItems.map((subitem) => {
                    const subHref = subitem.href(event.id)
                    const baseEventPath = `/akce/${event.id}`
                    const isSubActive = subitem.match(pathname, baseEventPath)
                    const SubIcon = subitem.icon
                    return (
                      <Link key={subitem.label} href={subHref}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 text-sm text-white",
                            isSubActive && "bg-white text-black font-medium",
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
