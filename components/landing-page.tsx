"use client"

import {
  Calendar,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Tent,
  Mail,
  CreditCard,
  BarChart3,
  FileText,
  Bell,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Brand } from "./brand"
import { ThemeSwitcher } from "./theme-switcher"
import { initializeDemoMode } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

const DEMO_CREDENTIALS = {
  email: "demo@campeek.cz",
  password: "demo123",
}

export default function LandingPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoadingDemo, setIsLoadingDemo] = useState(false)

  const handleDemoClick = async () => {
    if (isLoadingDemo) return

    try {
      setIsLoadingDemo(true)
      initializeDemoMode()
      await login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)
      router.push("/prehled")
    } catch (error) {
      console.error("Failed to start demo mode", error)
      router.push("/login")
    } finally {
      setIsLoadingDemo(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid background for emerald theme */}
      <div className="emerald-grid-bg" />

      {/* Header/Navigation */}
      <header className="sticky top-4 z-50 px-4 max-w-7xl mx-auto">
        <div className="w-full glass-card bg-card/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between rounded-2xl border border-border shadow-lg">
          <div className="flex items-center gap-3">
            <Brand />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#funkce" className="text-foreground/80 hover:text-foreground font-medium transition-colors">
              Funkce
            </a>
            <a href="#cenik" className="text-foreground/80 hover:text-foreground font-medium transition-colors">
              Ceník
            </a>
            <a href="#kontakt" className="text-foreground/80 hover:text-foreground font-medium transition-colors">
              Kontakt
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link
              href="/login"
              className="btn-primary px-6 py-2.5 rounded-xl font-semibold text-sm sm:text-base no-underline"
            >
              Začít zdarma
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 sm:p-16 rounded-3xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 border border-primary/20">
                <Sparkles className="w-4 h-4" />
                Moderní řešení pro organizátory
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Zjednodušte organizaci
                <br />
                <span className="gradient-text">dětských táborů a akcí</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
                Komplexní CRM systém navržený přímo organizátory pro organizátory. Automatizujte registrace, platby a
                komunikaci na jednom místě.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 no-underline"
                >
                  Vyzkoušet zdarma
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleDemoClick}
                  className="btn-secondary px-8 py-4 rounded-xl text-lg font-semibold disabled:opacity-70"
                  disabled={isLoadingDemo}
                >
                  {isLoadingDemo ? "Načítám demo..." : "Zobrazit demo"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mt-12 pt-8 border-t border-border">
                <div className="glass-card-light p-4 rounded-xl">
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Organizátorů</div>
                </div>
                <div className="glass-card-light p-4 rounded-xl">
                  <div className="text-3xl font-bold text-foreground">15 000+</div>
                  <div className="text-sm text-muted-foreground">Účastníků</div>
                </div>
                <div className="glass-card-light p-4 rounded-xl">
                  <div className="text-3xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Spokojenost</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="funkce" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 sm:p-16 rounded-3xl mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Vše, co potřebujete na jednom místě
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Navrženo s ohledem na reálné potřeby organizátorů dětských akcí v České republice
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Calendar,
                title: "Správa termínů a akcí",
                description: "Vytvářejte a spravujte tábory, kroužky a další akce s přehledným kalendářem",
              },
              {
                icon: Users,
                title: "Online přihlášky",
                description: "Automatické přihlašování účastníků přes vlastní formulář přizpůsobený vaší akci",
              },
              {
                icon: CreditCard,
                title: "Platby a fakturace",
                description: "Sledování plateb, generování faktur a automatické platební připomínky",
              },
              {
                icon: Mail,
                title: "Komunikační modul",
                description: "Hromadné emaily a SMS rodičům s automatickými notifikacemi",
              },
              {
                icon: Shield,
                title: "Bezpečná data",
                description: "GDPR compliant systém s šifrováním citlivých údajů účastníků",
              },
              {
                icon: BarChart3,
                title: "Přehledy a reporty",
                description: "Dashboard s reálnými statistikami a exporty pro vaši evidenci",
              },
              {
                icon: FileText,
                title: "Dokumenty a smlouvy",
                description: "Šablony smluv, potvrzení a dalších dokumentů pro rodiče",
              },
              {
                icon: Bell,
                title: "Automatické notifikace",
                description: "Připomínky plateb, deadline přihlášek a další automatizace",
              },
              {
                icon: Tent,
                title: "Specifické pro ČR",
                description: "Přizpůseno českému trhu s podporou lokálních platebních metod",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-card p-6 sm:p-8 rounded-2xl hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 sm:p-16 rounded-3xl mb-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Pro koho je campeek určen?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Pomáhame různým typům organizátorů zjednodušit jejich práci
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Organizátoři táborů",
                description: "Příměstské i pobytové tábory s desítkami až stovkami účastníků",
                benefits: ["Správa více turnusů", "Kapacity a čekací listiny", "Zdravotní formuláře"],
              },
              {
                title: "Sportovní kluby",
                description: "Soustředění, kempy a pravidelné tréninky vyžadující plánování",
                benefits: ["Evidence docházky", "Správa oddílů", "Komunikace s rodiči"],
              },
              {
                title: "Zájmové kroužky",
                description: "Vedoucí kroužků a pravidelných aktivit po celý rok",
                benefits: ["Dlouhodobé registrace", "Opakované platby", "Materiálové seznamy"],
              },
              {
                title: "Školy a školky",
                description: "Mimoškolní aktivity, výlety a školy v přírodě",
                benefits: ["Hromadné přihlášky", "Export dat", "Integrace s třídními knihami"],
              },
            ].map((segment, idx) => (
              <div
                key={idx}
                className="glass-card p-6 sm:p-8 rounded-2xl"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">{segment.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">{segment.description}</p>
                <ul className="space-y-2">
                  {segment.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-2 text-sm sm:text-base text-foreground">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="cenik" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 sm:p-16 rounded-3xl mb-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Transparentní ceník
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Žádné skryté poplatky. Platíte jen za to, co skutečně používáte.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "0 Kč",
                period: "navždy",
                description: "Pro začínající organizátory",
                features: ["Do 50 účastníků ročně", "1 akce současně", "Základní podpora", "Email notifikace"],
                cta: "Začít zdarma",
                highlighted: false,
              },
              {
                name: "Professional",
                price: "990 Kč",
                period: "měsíčně",
                description: "Pro aktivní organizátory",
                features: [
                  "Neomezený počet účastníků",
                  "Neomezený počet akcí",
                  "Prioritní podpora",
                  "SMS notifikace",
                  "Vlastní branding",
                  "Exporty a reporty",
                ],
                cta: "Vyzkoušet 30 dní zdarma",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Individuálně",
                period: "",
                description: "Pro velké organizace",
                features: [
                  "Vše z Professional",
                  "Dedikovaný account manager",
                  "API přístup",
                  "On-premise možnost",
                  "SLA garantie",
                ],
                cta: "Kontaktovat nás",
                highlighted: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl transition-all ${plan.highlighted
                  ? "pricing-card-featured"
                  : "glass-card"
                  }`}
              >
                {plan.highlighted && (
                  <div className="glass-badge-primary inline-block mb-4">
                    Nejpopulárnější
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="ml-2 text-sm sm:text-base text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm sm:text-base text-foreground">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 font-semibold text-sm sm:text-base rounded-xl transition-all ${plan.highlighted
                    ? "btn-primary"
                    : "btn-secondary"
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="header-card p-10 sm:p-16 text-center rounded-3xl">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Připraveni zjednodušit organizaci?</h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Přidejte se ke stovkám spokojených organizátorů již dnes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-white text-emerald-900 px-8 py-4 rounded-xl text-lg font-semibold no-underline hover:bg-white/90 transition-colors"
                >
                  Začít zdarma
                </Link>
                <button className="bg-transparent text-white px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors">
                  Naplánovat demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="footer-section">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 21 14 3" />
                    <path d="M20.5 21 10 3" />
                    <path d="M15.5 21 12 15l-3.5 6" />
                    <path d="M2 21h20" />
                  </svg>
                  <span className="text-2xl font-medium text-white">campeek</span>
                </div>
                <p className="text-white/70 text-sm sm:text-base">Moderní CRM pro organizátory dětských akcí</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Produkt</h4>
                <ul className="space-y-2 text-sm sm:text-base text-white/70">
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Funkce
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Ceník
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Demo
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Dokumentace
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Společnost</h4>
                <ul className="space-y-2 text-sm sm:text-base text-white/70">
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      O nás
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Kariéra
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Kontakt
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Právní</h4>
                <ul className="space-y-2 text-sm sm:text-base text-white/70">
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Ochrana osobních údajů
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      Obchodní podmínky
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors no-underline">
                      GDPR
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/20 text-center text-white/70 text-sm sm:text-base">
              <p>© 2025 campeek. Všechna práva vyhrazena.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
