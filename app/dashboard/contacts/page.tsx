"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Kontakty</h1>
        <p className="text-white/60 mt-1">Správa kontaktů a účastníků</p>
      </div>

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-emerald-400" />
            Stránka v přípravě
          </CardTitle>
          <CardDescription className="text-white/70">
            Tato stránka bude brzy dostupná. Zde budete moct spravovat kontakty a účastníky akcí.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <Users className="h-8 w-8 text-emerald-400" />
          </div>
          <p className="text-white/60">Tato funkce je zatím v přípravě...</p>
        </CardContent>
      </Card>
    </div>
  )
}
