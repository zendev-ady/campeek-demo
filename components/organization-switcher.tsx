"use client"

import { useOrganization } from "@/lib/organization-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateOrganizationDialog } from "./create-organization-dialog"
import { Building2, Check, ChevronsUpDown, Plus } from "lucide-react"

export function OrganizationSwitcher() {
  const { currentOrganization, organizations, switchOrganization } = useOrganization()

  if (!currentOrganization && organizations.length === 0) {
    return (
      <CreateOrganizationDialog>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Vytvořit organizaci
        </Button>
      </CreateOrganizationDialog>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">{currentOrganization?.name || "Vyberte organizaci"}</span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Organizace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => switchOrganization(org.id)}
            className="flex items-center justify-between"
          >
            <span>{org.name}</span>
            {currentOrganization?.id === org.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <CreateOrganizationDialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Plus className="h-4 w-4 mr-2" />
            Nová organizace
          </DropdownMenuItem>
        </CreateOrganizationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
