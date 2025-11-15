"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Mail, CheckCircle2, AlertCircle } from "lucide-react"
import { SectionBlock } from "@/components/event-settings/section-block"
import { useOrganization } from "@/lib/organization-context"
import type { OrganizationEmail } from "@/lib/types"

export function EmailPanel() {
  const { currentOrganization, updateEmail, verifyEmail } = useOrganization()
  const [email, setEmail] = useState<OrganizationEmail>(() => ({
    senderName: currentOrganization?.email?.senderName || "",
    senderEmail: currentOrganization?.email?.senderEmail || "",
    isVerified: currentOrganization?.email?.isVerified || false,
    verifiedAt: currentOrganization?.email?.verifiedAt,
  }))
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showVerificationInput, setShowVerificationInput] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const markAsDirty = () => setHasChanges(true)

  const handleSave = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.senderEmail)) {
      toast.error("Zadejte platnou emailovou adresu")
      return
    }

    if (!email.senderName.trim()) {
      toast.error("Zadejte jméno odesílatele")
      return
    }

    setIsSaving(true)
    try {
      // If email changed, mark as unverified
      const emailChanged = email.senderEmail !== currentOrganization?.email?.senderEmail
      const emailToSave = emailChanged ? { ...email, isVerified: false, verifiedAt: undefined } : email

      await updateEmail(emailToSave)

      saveTimeoutRef.current = setTimeout(() => {
        setIsSaving(false)
        setHasChanges(false)
        if (emailChanged) {
          toast.success("Email byl uložen. Nyní je potřeba jej ověřit.")
          setEmail(emailToSave)
        } else {
          toast.success("Email nastavení bylo uloženo.")
        }
        saveTimeoutRef.current = null
      }, 800)
    } catch (error) {
      setIsSaving(false)
      toast.error("Nepodařilo se uložit email nastavení.")
    }
  }

  const handleCancel = () => {
    setEmail({
      senderName: currentOrganization?.email?.senderName || "",
      senderEmail: currentOrganization?.email?.senderEmail || "",
      isVerified: currentOrganization?.email?.isVerified || false,
      verifiedAt: currentOrganization?.email?.verifiedAt,
    })
    setHasChanges(false)
    toast.info("Změny byly zrušeny.")
  }

  const handleSendVerification = async () => {
    if (!currentOrganization?.email?.senderEmail) {
      toast.error("Nejprve uložte emailovou adresu")
      return
    }

    setIsVerifying(true)
    // Mock sending verification email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsVerifying(false)
    setShowVerificationInput(true)
    toast.success(`Ověřovací email byl odeslán na ${currentOrganization.email.senderEmail}`)
  }

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      toast.error("Zadejte ověřovací kód")
      return
    }

    setIsVerifying(true)
    try {
      const success = await verifyEmail(verificationCode)
      if (success) {
        setIsVerifying(false)
        setShowVerificationInput(false)
        setVerificationCode("")
        setEmail((prev) => ({ ...prev, isVerified: true }))
        toast.success("Email byl úspěšně ověřen!")
      }
    } catch (error) {
      setIsVerifying(false)
      toast.error("Nepodařilo se ověřit email")
    }
  }

  return (
    <div className="space-y-10">
      {/* Header with action buttons */}
      <div className="flex items-center justify-between gap-4 py-4 border-b-2 border-black">
        <div>
          <h2 className="text-xl font-bold text-black">Nastavení odesílatele</h2>
          <p className="text-sm text-black mt-1">
            Email a jméno, které se zobrazí jako odesílatel zpráv
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Zrušit
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Ukládám...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Uložit změny
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Email Verification Status */}
      {currentOrganization?.email?.senderEmail && (
        <Alert className={email.isVerified ? "border-green-500" : "border-yellow-500"}>
          <div className="flex items-start gap-3">
            {email.isVerified ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            )}
            <div className="flex-1">
              <AlertDescription>
                {email.isVerified ? (
                  <div>
                    <p className="font-semibold text-green-800">Email je ověřený</p>
                    <p className="text-sm text-green-700 mt-1">
                      Můžete odesílat přihlašovací formuláře a komunikovat s účastníky.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-yellow-800">Email není ověřený</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Dokud neověříte email, nemůžete publikovat přihlašovací formulář ani odesílat zprávy.
                    </p>
                  </div>
                )}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {/* Sender Information */}
      <SectionBlock title="Kontaktní údaje" description="Zadejte jméno a email, který bude viditelný příjemcům">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sender-name">
              Jméno odesílatele <span className="text-red-500">*</span>
            </Label>
            <Input
              id="sender-name"
              type="text"
              value={email.senderName}
              onChange={(e) => {
                setEmail((prev) => ({ ...prev, senderName: e.target.value }))
                markAsDirty()
              }}
              placeholder="např. Naše Sdružení"
            />
            <p className="text-xs text-black">Jméno, které se zobrazí jako odesílatel emailů</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sender-email">
              Email odesílatele <span className="text-red-500">*</span>
            </Label>
            <Input
              id="sender-email"
              type="email"
              value={email.senderEmail}
              onChange={(e) => {
                setEmail((prev) => ({ ...prev, senderEmail: e.target.value }))
                markAsDirty()
              }}
              placeholder="info@vasesdruzeni.cz"
            />
            <p className="text-xs text-black">
              Emailová adresa, ze které budou odesílány zprávy
            </p>
          </div>
        </div>
      </SectionBlock>

      {/* Email Verification */}
      {currentOrganization?.email?.senderEmail && !email.isVerified && (
        <SectionBlock
          title="Ověření emailu"
          description="Pro odeslání zpráv je nutné ověřit vaši emailovou adresu"
        >
          <div className="space-y-4">
            {!showVerificationInput ? (
              <div>
                <Button onClick={handleSendVerification} disabled={isVerifying}>
                  {isVerifying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Odesílám...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Odeslat ověřovací email
                    </>
                  )}
                </Button>
                <p className="text-xs text-black mt-2">
                  Kliknutím odešlete ověřovací email na {currentOrganization.email.senderEmail}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Ověřovací kód</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Zadejte kód z emailu"
                  />
                  <p className="text-xs text-black">
                    Zkontrolujte vaši emailovou schránku a zadejte ověřovací kód
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleVerifyCode} disabled={isVerifying}>
                    {isVerifying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Ověřuji...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Ověřit email
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleSendVerification} disabled={isVerifying}>
                    Odeslat znovu
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SectionBlock>
      )}
    </div>
  )
}
