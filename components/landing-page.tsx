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
  Star,
  Zap,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Brand } from "./brand"
import { Card } from "./ui/card"
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
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to start demo mode", error)
      router.push("/login")
    } finally {
      setIsLoadingDemo(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(5, 150, 105, 0.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header/Navigation - Glass Effect */}
        <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="glass-card px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brand />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#funkce" className="text-white/80 hover:text-white transition-colors font-medium">
                Funkce
              </a>
              <a href="#cenik" className="text-white/80 hover:text-white transition-colors font-medium">
                Ceník
              </a>
              <a href="#kontakt" className="text-white/80 hover:text-white transition-colors font-medium">
                Kontakt
              </a>
            </nav>
            <Link href="/login" className="btn btn-primary">
              Začít zdarma
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-16 pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-12 sm:p-16 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-emerald-400/10 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 glass-badge mb-6">
                  <Zap className="w-4 h-4" />
                  Moderní řešení pro organizátory
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="gradient-text">Zjednodušte organizaci</span>
                  <br />
                  <span className="text-white">dětských táborů a akcí</span>
                </h1>

                <p className="text-xl sm:text-2xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
                  Komplexní CRM systém spojující <span className="text-emerald-400 font-semibold">přírodu s technologií</span>.
                  Automatizujte registrace, platby a komunikaci na jednom místě.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <Link href="/register" className="btn btn-primary text-lg">
                    Vyzkoušet zdarma
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleDemoClick}
                    className="btn btn-glass text-lg"
                    disabled={isLoadingDemo}
                  >
                    {isLoadingDemo ? "Načítám demo..." : "Zobrazit demo"}
                  </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <div className="glass-card p-6">
                    <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                    <div className="text-sm text-white/60">Organizátorů</div>
                  </div>
                  <div className="glass-card p-6">
                    <div className="text-4xl font-bold gradient-text mb-2">15 000+</div>
                    <div className="text-sm text-white/60">Účastníků</div>
                  </div>
                  <div className="glass-card p-6">
                    <div className="text-4xl font-bold gradient-text mb-2">98%</div>
                    <div className="text-sm text-white/60">Spokojenost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="funkce" className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="gradient-text">Vše, co potřebujete</span>
                <br />
                <span className="text-white">na jednom místě</span>
              </h2>
              <p className="text-xl text-white/70">
                Navrženo s ohledem na reálné potřeby organizátorů dětských akcí v České republice
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="glass-card p-8 hover:scale-[1.02] transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-emerald-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="gradient-text">Pro koho je Campeek určen?</span>
              </h2>
              <p className="text-xl text-white/70">
                Pomáháme různým typům organizátorů zjednodušit jejich práci
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
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
                <div key={idx} className="glass-card p-8 hover:scale-[1.02] transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">{segment.title}</h3>
                  <p className="text-white/70 mb-6">{segment.description}</p>
                  <ul className="space-y-3">
                    {segment.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start gap-3 text-white/80">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="cenik" className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="gradient-text">Transparentní ceník</span>
              </h2>
              <p className="text-xl text-white/70">
                Žádné skryté poplatky. Platíte jen za to, co skutečně používáte.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  className={`glass-card p-8 transition-all ${
                    plan.highlighted ? "glass-card-strong md:scale-105 border-emerald-400/50" : ""
                  }`}
                >
                  {plan.highlighted && (
                    <div className="glass-badge-primary mb-4">
                      <Star className="w-3 h-3" />
                      Nejpopulárnější
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.period && <span className="text-white/60 ml-2">{plan.period}</span>}
                  </div>
                  <p className="text-white/70 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3 text-white/80">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={plan.highlighted ? "btn btn-primary w-full" : "btn btn-secondary w-full"}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card-strong p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-emerald-400/10 via-transparent to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  <span className="gradient-text">Připraveni zjednodušit organizaci?</span>
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  Přidejte se ke stovkám spokojených organizátorů již dnes
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/login" className="btn btn-primary text-lg">
                    Začít zdarma
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="btn btn-glass text-lg">Naplánovat demo</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="kontakt" className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-16">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="stroke-emerald-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3.5 21 14 3" />
                      <path d="M20.5 21 10 3" />
                      <path d="M15.5 21 12 15l-3.5 6" />
                      <path d="M2 21h20" />
                    </svg>
                    <span className="text-2xl font-bold gradient-text">campeek</span>
                  </div>
                  <p className="text-white/60">Moderní CRM pro organizátory dětských akcí</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-white">Produkt</h4>
                  <ul className="space-y-2 text-white/70">
                    <li>
                      <a href="#funkce" className="hover:text-white transition-colors">
                        Funkce
                      </a>
                    </li>
                    <li>
                      <a href="#cenik" className="hover:text-white transition-colors">
                        Ceník
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        Demo
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        Dokumentace
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-white">Společnost</h4>
                  <ul className="space-y-2 text-white/70">
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        O nás
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        Kariéra
                      </a>
                    </li>
                    <li>
                      <a href="#kontakt" className="hover:text-white transition-colors">
                        Kontakt
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-white">Právní</h4>
                  <ul className="space-y-2 text-white/70">
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        Ochrana osobních údajů
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        Obchodní podmínky
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        GDPR
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 text-center text-white/60">
                <p>© 2025 Campeek. Všechna práva vyhrazena.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
