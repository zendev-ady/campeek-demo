"use client"

import type { OrganizationBranding, OrganizationEmail } from "@/lib/types"

interface EmailPreviewProps {
  branding?: OrganizationBranding
  email?: OrganizationEmail
  organizationName: string
}

export function EmailPreview({ branding, email, organizationName }: EmailPreviewProps) {
  // Mock data for preview
  const mockEvent = {
    name: "Letní tábor 2025",
    dates: "12. - 18. července 2025",
    location: "Horní Bečva",
    price: 4500,
    deposit: 2000,
    depositDueDate: "15.6.2025",
  }

  const mockChild = {
    name: "Jana Nováková",
    age: 8,
  }

  return (
    <div className="border-2 border-black bg-gray-50 p-4 max-w-2xl">
      {/* Email container with white background */}
      <div className="bg-white border-2 border-black">
        {/* Logo Section */}
        {branding?.logoUrl && (
          <div className="p-6 border-b-2 border-black text-center">
            <img
              src={branding.logoUrl}
              alt={organizationName}
              className="max-h-16 mx-auto"
            />
          </div>
        )}

        {/* Banner Section */}
        {branding?.bannerUrl && (
          <div className="border-b-2 border-black">
            <img
              src={branding.bannerUrl}
              alt="Banner"
              className="w-full max-h-32 object-cover"
            />
          </div>
        )}

        {/* Email Content */}
        <div className="p-6 space-y-4">
          {/* Greeting */}
          <div>
            <p className="text-black">Dobrý den,</p>
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <p className="text-black">děkujeme za přihlášku na akci:</p>
            <div className="space-y-1">
              <p className="font-bold text-black">📅 {mockEvent.name}</p>
              <p className="text-sm text-black">
                📍 {mockEvent.dates}, {mockEvent.location}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-black my-4" />

          {/* Registration Details */}
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-black">👶 Přihlášené děti:</p>
              <p className="text-black">• {mockChild.name} ({mockChild.age} let)</p>
            </div>

            <div className="space-y-1">
              <p className="text-black">💰 Cena: {mockEvent.price.toLocaleString("cs-CZ")} Kč</p>
              <p className="text-black">
                💳 Záloha: {mockEvent.deposit.toLocaleString("cs-CZ")} Kč do {mockEvent.depositDueDate}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-black my-4" />

          {/* Contact Information */}
          <div className="space-y-1">
            <p className="text-black">📧 Kontakt: {email?.senderEmail || "info@example.cz"}</p>
            <p className="text-black">📞 +420 123 456 789</p>
          </div>

          {/* View Button */}
          {branding?.primaryColor && (
            <div className="pt-2">
              <button
                type="button"
                style={{ backgroundColor: branding.primaryColor }}
                className="px-6 py-2 text-white font-medium border-2 border-black"
              >
                Zobrazit přihlášku
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-black bg-gray-50 text-center space-y-1">
          <p className="font-semibold text-black">{organizationName}</p>
          <p className="text-xs text-black">Tato zpráva byla odeslána automaticky.</p>
        </div>
      </div>
    </div>
  )
}
