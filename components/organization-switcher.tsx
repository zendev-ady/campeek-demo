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
          className="w-full justify-center gap-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
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
          className="w-full justify-between gap-2 rounded-lg bg-white/5 border border-white/10 text-left text-white hover:bg-white/10"
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 text-emerald-400" />
            <span className="truncate">{currentOrganization?.name || "Vyberte organizaci"}</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-white/60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-64 glass-card border border-white/10"
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Organizace
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => switchOrganization(org.id)}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-white/80 focus:bg-white/10 focus:text-white cursor-pointer",
              currentOrganization?.id === org.id && "bg-white/10 text-white font-medium",
            )}
          >
            <span>{org.name}</span>
            {currentOrganization?.id === org.id && <Check className="h-4 w-4 text-emerald-400" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-white/10" />
        <CreateOrganizationDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="gap-2 rounded-lg px-3 py-2 text-white/80 focus:bg-white/10 focus:text-white cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Nová organizace
          </DropdownMenuItem>
        </CreateOrganizationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
