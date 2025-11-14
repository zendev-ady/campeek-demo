import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { AuthProvider } from "@/lib/auth-context"
import { OrganizationProvider } from "@/lib/organization-context"
import { EventProvider } from "@/lib/event-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Správa táborů a akcí",
  description: "Systém pro správu táborů, akcí a registrací",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <AuthProvider>
          <OrganizationProvider>
            <EventProvider>{children}</EventProvider>
          </OrganizationProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  )
}
