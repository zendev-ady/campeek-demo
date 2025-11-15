"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Kontakty</h1>
        <p className="text-black mt-1">Správa kontaktů a účastníků</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Stránka v přípravě
          </CardTitle>
          <CardDescription>
            Tato stránka bude brzy dostupná. Zde budete moct spravovat kontakty a účastníky akcí.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-black bg-white mb-4">
            <Users className="h-8 w-8 text-black" />
          </div>
          <p className="text-black">Tato funkce je zatím v přípravě...</p>
        </CardContent>
      </Card>
    </div>
  )
}
