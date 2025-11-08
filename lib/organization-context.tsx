"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Organization, OrganizationMember } from "./types"
import { useAuth } from "./auth-context"

interface OrganizationContextType {
  currentOrganization: Organization | null
  organizations: Organization[]
  members: OrganizationMember[]
  switchOrganization: (orgId: string) => void
  createOrganization: (name: string, description?: string) => Promise<void>
  inviteMember: (email: string, role: "admin" | "member") => Promise<void>
  isLoading: boolean
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [members, setMembers] = useState<OrganizationMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setOrganizations([])
      setCurrentOrganization(null)
      setMembers([])
      setIsLoading(false)
      return
    }

    // Load organizations from localStorage
    const allOrgs = JSON.parse(localStorage.getItem("organizations") || "[]")
    const allMembers = JSON.parse(localStorage.getItem("organizationMembers") || "[]")

    // Filter organizations where user is a member
    const userMemberships = allMembers.filter((m: OrganizationMember) => m.userId === user.id)
    const userOrgs = allOrgs.filter((org: Organization) =>
      userMemberships.some((m: OrganizationMember) => m.organizationId === org.id),
    )

    setOrganizations(userOrgs)
    setMembers(allMembers)

    // Set current organization from localStorage or first available
    const savedOrgId = localStorage.getItem("currentOrganizationId")
    const currentOrg = savedOrgId ? userOrgs.find((org: Organization) => org.id === savedOrgId) : userOrgs[0]

    setCurrentOrganization(currentOrg || null)
    setIsLoading(false)
  }, [user])

  const switchOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    if (org) {
      setCurrentOrganization(org)
      localStorage.setItem("currentOrganizationId", orgId)
    }
  }

  const createOrganization = async (name: string, description?: string) => {
    if (!user) throw new Error("Musíte být přihlášeni")

    await new Promise((resolve) => setTimeout(resolve, 300))

    const newOrg: Organization = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    }

    const newMember: OrganizationMember = {
      userId: user.id,
      organizationId: newOrg.id,
      role: "owner",
      joinedAt: new Date().toISOString(),
    }

    // Save to localStorage
    const allOrgs = JSON.parse(localStorage.getItem("organizations") || "[]")
    const allMembers = JSON.parse(localStorage.getItem("organizationMembers") || "[]")

    allOrgs.push(newOrg)
    allMembers.push(newMember)

    localStorage.setItem("organizations", JSON.stringify(allOrgs))
    localStorage.setItem("organizationMembers", JSON.stringify(allMembers))

    setOrganizations([...organizations, newOrg])
    setMembers([...members, newMember])
    setCurrentOrganization(newOrg)
    localStorage.setItem("currentOrganizationId", newOrg.id)
  }

  const inviteMember = async (email: string, role: "admin" | "member") => {
    if (!currentOrganization || !user) throw new Error("Není vybrána organizace")

    await new Promise((resolve) => setTimeout(resolve, 300))

    // In a real app, this would send an email invitation
    // For MVP, we'll just show a success message
    console.log(`Pozvánka odeslána na ${email} s rolí ${role}`)
  }

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        organizations,
        members,
        switchOrganization,
        createOrganization,
        inviteMember,
        isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider")
  }
  return context
}
