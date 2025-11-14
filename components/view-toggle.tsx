import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Grid2X2, List } from "lucide-react"

export type CollectionViewMode = "grid" | "list"

interface ViewToggleProps {
  mode: CollectionViewMode
  onChange: (mode: CollectionViewMode) => void
  className?: string
}

export function ViewToggle({ mode, onChange, className }: ViewToggleProps) {
  const options: { value: CollectionViewMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "grid", label: "Kartičky", icon: Grid2X2 },
    { value: "list", label: "Seznam", icon: List },
  ]

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {options.map((option) => {
        const Icon = option.icon
        const isActive = mode === option.value
        return (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            onClick={() => onChange(option.value)}
            className={cn(
              "gap-2 rounded-full border px-4",
              isActive
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
