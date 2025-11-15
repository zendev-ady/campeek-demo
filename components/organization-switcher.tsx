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
import { cn } from "@/lib/utils"

export function OrganizationSwitcher() {
  const { currentOrganization, organizations, switchOrganization } = useOrganization()

  if (!currentOrganization && organizations.length === 0) {
    return (
      <CreateOrganizationDialog>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center gap-2 border-2 border-black bg-white text-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Vytvořit organizaci
        </Button>
      </CreateOrganizationDialog>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between gap-2 border-2 border-black bg-white text-left text-black"
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 text-black" />
            <span className="truncate">{currentOrganization?.name || "Vyberte organizaci"}</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-64 border-2 border-black bg-white text-black"
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-widest text-black">
          Organizace
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => switchOrganization(org.id)}
            className={cn(
              "flex items-center justify-between px-3 py-2 text-sm text-black",
              currentOrganization?.id === org.id && "bg-black text-white",
            )}
          >
            <span>{org.name}</span>
            {currentOrganization?.id === org.id && <Check className="h-4 w-4 text-white" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <CreateOrganizationDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="gap-2 px-3 py-2 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nová organizace
          </DropdownMenuItem>
        </CreateOrganizationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
