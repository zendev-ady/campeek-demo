"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionBlock({
  title,
  description,
  children,
  disabled,
}: {
  title: string
  description: string
  children: ReactNode
  disabled?: boolean
}) {
  return (
    <section className={cn("space-y-5", disabled && "pointer-events-none opacity-60")}> 
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

