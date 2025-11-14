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
import { SidebarMenu } from "@/components/sidebar-menu"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-950">
        <div className="glass-card p-8">
          <div className="text-white">Načítání...</div>
        </div>
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
    <div className="flex h-screen bg-gradient-to-br from-emerald-900 via-emerald-900 to-emerald-950 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(5, 150, 105, 0.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex w-full h-full p-4 gap-4">
        {/* Sidebar - Glass Effect */}
        <aside className="w-64 glass-card flex flex-col">
          {/* Brand */}
          <div className="p-6 border-b border-white/10">
            <Link href="/dashboard">
              <Brand />
            </Link>
          </div>

          {/* Organization Switcher */}
          <div className="px-4 py-3 border-b border-white/10">
            <OrganizationSwitcher />
          </div>

          {/* Navigation */}
          {currentOrganization && <SidebarMenu />}

          {/* User Section */}
          <div className="p-4 mt-auto border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-medium shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-white/60 truncate">{user.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="flex-shrink-0 text-white/60 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Top Bar - Glass Effect */}
          <header className="glass-card px-6 py-4 flex items-center">
            <div className="flex-1">
              <Suspense fallback={<div className="text-white/60">Načítání...</div>}>
                <GlobalSearch />
              </Suspense>
            </div>
          </header>

          {/* Page Content - Glass Effect */}
          <main className="flex-1 overflow-y-auto glass-card p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
