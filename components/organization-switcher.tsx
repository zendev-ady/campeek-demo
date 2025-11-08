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
          className="w-full justify-center gap-2 rounded-lg border border-emerald-700/60 bg-emerald-800/40 text-emerald-50 hover:bg-emerald-700/60"
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
          className="w-full justify-between gap-2 rounded-lg border border-emerald-700/60 bg-emerald-800/40 text-left text-emerald-50 hover:bg-emerald-700/60"
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 text-emerald-300" />
            <span className="truncate">{currentOrganization?.name || "Vyberte organizaci"}</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-emerald-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-64 rounded-lg border border-emerald-700/60 bg-emerald-950/95 text-emerald-50 shadow-lg shadow-emerald-950/30 backdrop-blur"
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Organizace
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => switchOrganization(org.id)}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-emerald-100 focus:bg-emerald-800/60 focus:text-emerald-50",
              currentOrganization?.id === org.id && "bg-emerald-800/70 text-emerald-50",
            )}
          >
            <span>{org.name}</span>
            {currentOrganization?.id === org.id && <Check className="h-4 w-4 text-emerald-300" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <CreateOrganizationDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="gap-2 rounded-lg px-3 py-2 text-emerald-100 focus:bg-emerald-800/60 focus:text-emerald-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nová organizace
          </DropdownMenuItem>
        </CreateOrganizationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
