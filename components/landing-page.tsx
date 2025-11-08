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
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brand } from "./brand"
import { initializeDemoMode } from "@/lib/mock-data"

export default function LandingPage() {
  const router = useRouter()

  const handleDemoClick = () => {
    initializeDemoMode()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navigation - Inverted Dark Card */}
      <header className="sticky top-4 z-50 px-0 sm:px-0 max-w-7xl mx-auto">
        <div className="w-full bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl shadow-xl shadow-emerald-900/20 px-6 py-4 flex items-center justify-between backdrop-blur">
          <div className="flex items-center gap-3">
            <Brand />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#funkce" className="text-emerald-100 hover:text-emerald-50 transition-colors font-medium">
              Funkce
            </a>
            <a href="#cenik" className="text-emerald-100 hover:text-emerald-50 transition-colors font-medium">
              Ceník
            </a>
            <a href="#kontakt" className="text-emerald-100 hover:text-emerald-50 transition-colors font-medium">
              Kontakt
            </a>
          </nav>
          <Link
            href="/login"
            className="bg-emerald-200 text-emerald-900 px-4 sm:px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-100 transition-all text-sm sm:text-base"
          >
            Začít zdarma
          </Link>
        </div>
      </header>

      {/* Hero Section - Light Card */}
      <section className="pt-8 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-emerald-100/40 to-transparent rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6">
                🎯 Moderní řešení pro organizátory
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-emerald-900 mb-6 leading-tight">
                Zjednodušte organizaci
                <br />
                dětských táborů a akcí
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
                Komplexní CRM systém navržený přímo organizátory pro organizátory. Automatizujte registrace, platby a
                komunikaci na jednom místě.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-emerald-50 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Vyzkoušet zdarma
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleDemoClick}
                  className="bg-gray-100 text-emerald-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all border-2 border-emerald-200"
                >
                  Zobrazit demo
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mt-12 pt-8 border-t border-emerald-200">
                <div>
                  <div className="text-3xl font-bold text-emerald-900">500+</div>
                  <div className="text-sm text-gray-600">Organizátorů</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-900">15 000+</div>
                  <div className="text-sm text-gray-600">Účastníků</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-900">98%</div>
                  <div className="text-sm text-gray-600">Spokojenost</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Dark Inverted Cards */}
      <section id="funkce" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-xl mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-emerald-900 mb-4">
                Vše, co potřebujete na jednom místě
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
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
                className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-emerald-900/30 transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 backdrop-blur">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-100" strokeWidth={2} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-50 mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-emerald-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience - Light Cards */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-xl mb-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-emerald-900 mb-4">
                Pro koho je campeek určen?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
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
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border border-emerald-100"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-emerald-900 mb-3">{segment.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">{segment.description}</p>
                <ul className="space-y-2">
                  {segment.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-2 text-sm sm:text-base text-emerald-800">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Dark Cards */}
      <section id="cenik" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-16 shadow-xl mb-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-emerald-900 mb-4">
                Transparentní ceník
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
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
                className={`rounded-2xl p-6 sm:p-8 transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-2xl shadow-emerald-900/40 md:scale-105"
                    : "bg-gradient-to-br from-emerald-800 to-emerald-900 shadow-xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-emerald-400 text-emerald-900 text-xs sm:text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Nejpopulárnější
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-semibold text-emerald-50 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-emerald-50">{plan.price}</span>
                  {plan.period && <span className="text-emerald-200 ml-2 text-sm sm:text-base">{plan.period}</span>}
                </div>
                <p className="text-sm sm:text-base text-emerald-200 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm sm:text-base text-emerald-100">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    plan.highlighted
                      ? "bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg"
                      : "bg-emerald-700/50 text-emerald-50 hover:bg-emerald-700 backdrop-blur"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Card */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Připraveni zjednodušit organizaci?</h2>
              <p className="text-lg sm:text-xl text-emerald-100 mb-8">
                Přidejte se ke stovkám spokojených organizátorů již dnes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-white text-emerald-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 hover:shadow-xl transition-all"
                >
                  Začít zdarma
                </Link>
                <button className="bg-emerald-600/40 backdrop-blur text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-600/60 transition-all border-2 border-white/20">
                  Naplánovat demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Dark Card */}
      <footer id="kontakt" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-3xl p-8 sm:p-16 shadow-2xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-emerald-200"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 21 14 3" />
                    <path d="M20.5 21 10 3" />
                    <path d="M15.5 21 12 15l-3.5 6" />
                    <path d="M2 21h20" />
                  </svg>
                  <span className="text-2xl font-medium text-emerald-50">campeek</span>
                </div>
                <p className="text-emerald-200 text-sm sm:text-base">Moderní CRM pro organizátory dětských akcí</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-emerald-50">Produkt</h4>
                <ul className="space-y-2 text-sm sm:text-base text-emerald-200">
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Funkce
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Ceník
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Demo
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Dokumentace
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-emerald-50">Společnost</h4>
                <ul className="space-y-2 text-sm sm:text-base text-emerald-200">
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      O nás
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Kariéra
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Kontakt
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-emerald-50">Právní</h4>
                <ul className="space-y-2 text-sm sm:text-base text-emerald-200">
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Ochrana osobních údajů
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      Obchodní podmínky
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-emerald-50 transition-colors">
                      GDPR
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-emerald-700 text-center text-emerald-300 text-sm sm:text-base">
              <p>© 2025 campeek. Všechna práva vyhrazena.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
