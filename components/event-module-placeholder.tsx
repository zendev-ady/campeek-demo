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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-black" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="py-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center border-2 border-black bg-white">
          <Icon className="h-8 w-8 text-black" />
        </div>
        <p className="text-black">{message}</p>
      </CardContent>
    </Card>
  )
}

