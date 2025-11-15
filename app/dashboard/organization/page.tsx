"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function OrganizationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Organizace</h1>
        <p className="text-black mt-1">Nastavení vaší organizace</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Stránka v přípravě
          </CardTitle>
          <CardDescription>
            Tato stránka bude brzy dostupná. Zde budete moct spravovat nastavení vaší organizace.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-black bg-white mb-4">
            <Settings className="h-8 w-8 text-black" />
          </div>
          <p className="text-black">Tato funkce je zatím v přípravě...</p>
        </CardContent>
      </Card>
    </div>
  )
}
