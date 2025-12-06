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
import { SidebarMenu } from "@/components/sidebar-menu"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, logout, isLoading: authLoading } = useAuth()
  const { currentOrganization, isLoading: orgLoading } = useOrganization()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative">
        <div className="emerald-grid-bg" />
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-muted-foreground">Načítání...</div>
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
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Grid background for emerald theme */}
      <div className="emerald-grid-bg" />

      {/* Sidebar */}
      <aside className="w-64 sidebar-campeek flex flex-col relative z-10">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/prehled" className="no-underline">
            <Brand />
          </Link>
        </div>

        {/* Organization Switcher */}
        <div className="px-4 py-3 border-b border-border">
          <OrganizationSwitcher />
        </div>

        {/* Navigation */}
        {currentOrganization && <SidebarMenu />}

        {/* User Section */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center px-6 gap-4">
          <div className="flex-1">
            <Suspense fallback={<div className="h-10 w-64 glass-skeleton rounded-xl" />}>
              <GlobalSearch />
            </Suspense>
          </div>
          <ThemeSwitcher />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background/50">{children}</main>
      </div>
    </div>
  )
}
