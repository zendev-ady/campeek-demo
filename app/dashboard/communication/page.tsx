"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function CommunicationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Komunikace</h1>
        <p className="text-white/60 mt-1">Komunikace s účastníky a rodiči</p>
      </div>

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-5 w-5 text-emerald-400" />
            Stránka v přípravě
          </CardTitle>
          <CardDescription className="text-white/70">
            Tato stránka bude brzy dostupná. Zde budete moct posílat zprávy a komunikovat s účastníky.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <MessageSquare className="h-8 w-8 text-emerald-400" />
          </div>
          <p className="text-white/60">Tato funkce je zatím v přípravě...</p>
        </CardContent>
      </Card>
    </div>
  )
}
