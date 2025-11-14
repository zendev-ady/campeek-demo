"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type EventModulePlaceholderProps = {
  title: string
  description: string
  message: string
  Icon: LucideIcon
}

export function EventModulePlaceholder({ title, description, message, Icon }: EventModulePlaceholderProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className="h-5 w-5 text-emerald-400" />
          {title}
        </CardTitle>
        <CardDescription className="text-white/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="py-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
          <Icon className="h-8 w-8 text-emerald-400" />
        </div>
        <p className="text-white/60">{message}</p>
      </CardContent>
    </Card>
  )
}

