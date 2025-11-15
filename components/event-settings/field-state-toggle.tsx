"use client"

import { cn } from "@/lib/utils"
import type { FieldState } from "./types"

interface FieldStateToggleProps {
  value: FieldState
  onChange: (value: FieldState) => void
  disabled?: boolean
  fieldLabel: string
}

export function FieldStateToggle({ value, onChange, disabled, fieldLabel }: FieldStateToggleProps) {
  const options: { value: FieldState; label: string; color: string }[] = [
    { value: "required", label: "Vyžadováno", color: "bg-emerald-500" },
    { value: "optional", label: "Nepovinné", color: "bg-amber-400" },
    { value: "hidden", label: "Nezobrazovat", color: "bg-red-500" },
  ]

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-1">
      {options.map((option, index) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => !disabled && onChange(option.value)}
            disabled={disabled}
            aria-label={`${fieldLabel} - ${option.label}`}
            className={cn(
              "relative px-3 py-1.5 text-xs font-medium transition-all rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400",
              isActive && "text-white shadow-sm",
              !isActive && "text-slate-600 hover:bg-slate-50",
              disabled && "opacity-50 cursor-not-allowed",
              isActive && option.value === "required" && "bg-emerald-500",
              isActive && option.value === "optional" && "bg-amber-400",
              isActive && option.value === "hidden" && "bg-red-500"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
