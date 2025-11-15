"use client"

import type React from "react"
import { Suspense } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useOrganization } from "@/lib/organization-context"
import { OrganizationSwitcher } from "@/components/organization-switcher"
import { GlobalSearch } from "@/components/global-search"
import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenu } from "@/components/sidebar-menu" // Import the new SidebarMenu component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, isLoading: authLoading } = useAuth()
  const { currentOrganization, isLoading: orgLoading } = useOrganization()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Načítání...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r-2 border-black bg-black flex flex-col">
        <div className="p-6 border-b-2 border-white">
          <Link href="/dashboard">
            <Brand />
          </Link>
        </div>
        {/* Organization Switcher */}
        <div className="px-4 py-3 border-b-2 border-white">
          <OrganizationSwitcher />
        </div>
        {/* Navigation */}
        {currentOrganization && <SidebarMenu />}
        {/* User Section */}
        <div className="p-4 border-t-2 border-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 bg-white border-2 border-white flex items-center justify-center text-black text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-white truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="flex-shrink-0 text-white"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b-2 border-black bg-white flex items-center px-6">
          <div className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              <GlobalSearch />
            </Suspense>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  )
}
