"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Mail,
  FileSpreadsheet,
  CreditCard,
  Users,
  Calendar,
  BarChart3,
  ShieldCheck,
  Heart
} from 'lucide-react';

// --- KOMPONENTY ---

// Logo Component
const TentLogo = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="tentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#34d399' }} />
        <stop offset="100%" style={{ stopColor: '#059669' }} />
      </linearGradient>
    </defs>
    <path d="M3.5 21 14 3" stroke="url(#tentGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20.5 21 10 3" stroke="url(#tentGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M15.5 21 12 15l-3.5 6" stroke="url(#tentGradient)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 1. Navigace
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF8]/80 backdrop-blur-md border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TentLogo size={32} />
        <span className="text-xl font-bold text-stone-800 tracking-tight">campeek</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
        <a href="#features" className="hover:text-emerald-600 transition-colors">Funkce</a>
        <a href="#pricing" className="hover:text-emerald-600 transition-colors">Ceník</a>
        <a href="#faq" className="hover:text-emerald-600 transition-colors">Otázky</a>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 hidden sm:block">Přihlásit</a>
        <button className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10">
          Vyzkoušet zdarma
        </button>
      </div>
    </div>
  </nav>
);

// 2. Hero Sekce
const Hero = () => (
  <section className="pt-32 pb-20 px-4 bg-[#FDFCF8] overflow-hidden">
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-6"
      >
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        Nová sezóna 2025 je tady
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight mb-6"
      >
        Méně papírování.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#059669]">
          Více času na děti.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl text-stone-500 max-w-2xl mx-auto mb-10"
      >
        Kompletní systém pro organizátory táborů. Přihlášky, platby a komunikace s rodiči na jednom místě.
        Už žádné Excel tabulky po nocích.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <button className="w-full sm:w-auto bg-[#10b981] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#059669] transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2">
          Vytvořit první akci zdarma <ChevronRight size={20} />
        </button>
        <button className="w-full sm:w-auto bg-white text-stone-700 border border-stone-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
          Zobrazit demo (2 min)
        </button>
      </motion.div>

      {/* Hero Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-stone-200 shadow-2xl bg-gradient-to-br from-white to-stone-50"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-stone-50 to-white p-6 md:p-8">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-stone-900">Moje akce</h3>
              <p className="text-sm text-stone-500">4 aktivní akce • Sezóna 2025</p>
            </div>
            <button className="bg-[#10b981] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#059669] transition-all">
              + Nová akce
            </button>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Card 1 */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl p-4 border border-stone-200 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900 text-sm md:text-base mb-1">Letní tábor Orlík 2025</h4>
                  <p className="text-xs text-stone-500">15. 7. – 28. 7. 2025</p>
                </div>
                <span className="bg-emerald-100 text-[#059669] text-xs font-bold px-2 py-1 rounded-full">Aktivní</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>28/30</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-[#10b981]" />
                  <span>24 zaplaceno</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981] rounded-full" style={{ width: '93%' }}></div>
              </div>
            </motion.div>

            {/* Event Card 2 */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl p-4 border border-stone-200 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900 text-sm md:text-base mb-1">Příměstský tábor Praha</h4>
                  <p className="text-xs text-stone-500">1. 7. – 5. 7. 2025</p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">Brzy plno</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>19/20</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-[#10b981]" />
                  <span>17 zaplaceno</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </motion.div>

            {/* Event Card 3 */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl p-4 border border-stone-200 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900 text-sm md:text-base mb-1">Sportovní kemp Brno</h4>
                  <p className="text-xs text-stone-500">20. 8. – 24. 8. 2025</p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">Otevřený</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>12/25</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-[#10b981]" />
                  <span>8 zaplaceno</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </motion.div>

            {/* Event Card 4 */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl p-4 border border-stone-200 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900 text-sm md:text-base mb-1">Podzimní pobyt Šumava</h4>
                  <p className="text-xs text-stone-500">10. 10. – 13. 10. 2025</p>
                </div>
                <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-1 rounded-full">Koncept</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>0/15</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Za 3 měsíce</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// 3. Empathy / Pain Points
const Empathy = () => {
  const pains = [
    { icon: Mail, title: "Manuální e-maily", text: "Potvrzení každé přihlášky ručně? Kopírování textů?" },
    { icon: FileSpreadsheet, title: "Excel chaos", text: "Deset verzí 'Tábor_2024_finál_v2.xlsx'? Ztráta dat?" },
    { icon: CreditCard, title: "Sledování plateb", text: "Kdo zaplatil zálohu? Kdo dluží doplatek? Ruční párování?" }
  ];

  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Organizovat tábor není jen o dětech</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Známe to. Místo přípravy programu řešíte papíry. My vám vrátíme ten čas zpátky.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-[#FDFCF8] border border-stone-100 hover:border-emerald-100 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
                <pain.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">{pain.title}</h3>
              <p className="text-stone-500">{pain.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Solution Reveal
const Solution = () => (
  <section className="py-24 bg-[#FDFCF8] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
      <div className="md:w-1/2">
        <div className="text-[#10b981] font-semibold mb-4">Představujeme campeek</div>
        <h2 className="text-4xl font-bold text-stone-900 mb-6">Jediný systém pro všechno, co potřebujete.</h2>
        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
          campeek je navržen pro organizátory jako vy. Vytvořte akci, sdílejte odkaz a sledujte, jak se přihlášky plní samy.
          <br /><br />
          Žádné instalace. Žádné složité školení. Funguje to hned.
        </p>

        <ul className="space-y-4 mb-8">
          {['Automatické párování plateb', 'Hromadné e-maily rodičům', 'Exporty pro hygienu a pojišťovnu'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-stone-700">
              <CheckCircle2 className="text-[#10b981]" size={20} />
              {item}
            </li>
          ))}
        </ul>

        <button className="text-[#10b981] font-semibold hover:text-[#059669] inline-flex items-center gap-2 group">
          Prozkoumat všechny funkce <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>

      <div className="md:w-1/2 relative">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl shadow-2xl border border-stone-200 overflow-hidden bg-white"
        >
          {/* Registration Stats & Payment List Mockup */}
          <div className="aspect-square bg-gradient-to-br from-white to-stone-50 p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <div className="text-emerald-600 text-xs font-semibold mb-1">Obsazenost</div>
                <div className="text-2xl font-bold text-stone-900">93%</div>
                <div className="text-xs text-stone-500 mt-1">28 z 30 míst</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="text-blue-600 text-xs font-semibold mb-1">Platby</div>
                <div className="text-2xl font-bold text-stone-900">86%</div>
                <div className="text-xs text-stone-500 mt-1">24 zaplaceno</div>
              </div>
            </div>

            {/* Payment List */}
            <div className="bg-white rounded-xl border border-stone-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-stone-900 text-sm">Poslední platby</h4>
                <span className="text-xs text-[#10b981] font-semibold">Vše ✓</span>
              </div>
              <div className="space-y-3">
                {/* Payment Item 1 */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#10b981] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      JN
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900">Jan Novák</div>
                      <div className="text-xs text-stone-500">Dnes, 14:32</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-stone-900">4 500 Kč</div>
                    <div className="flex items-center gap-1 text-xs text-[#10b981]">
                      <CheckCircle2 size={12} />
                      <span>Zaplaceno</span>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Item 2 */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      PK
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900">Petra Králová</div>
                      <div className="text-xs text-stone-500">Včera, 9:15</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-stone-900">4 500 Kč</div>
                    <div className="flex items-center gap-1 text-xs text-[#10b981]">
                      <CheckCircle2 size={12} />
                      <span>Zaplaceno</span>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Item 3 */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      MH
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900">Martin Horák</div>
                      <div className="text-xs text-stone-500">22. 6., 16:48</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-stone-900">2 250 Kč</div>
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>Záloha</span>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Item 4 */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg cursor-pointer opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      LS
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900">Lucie Svobodová</div>
                      <div className="text-xs text-stone-500">Splatnost 30. 6.</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-stone-900">4 500 Kč</div>
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <span className="w-2 h-2 bg-stone-400 rounded-full"></span>
                      <span>Čeká se</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3 py-2 rounded-lg hover:bg-stone-50 transition-all">
                📧 Poslat upomínku
              </button>
              <button className="text-xs font-semibold text-[#10b981] bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-all">
                💾 Exportovat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// 5. Features Bento Grid
const Features = () => (
  <section id="features" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-stone-900">Vše pod jednou střechou</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        {/* Large Card 1 */}
        <div className="md:col-span-2 row-span-2 bg-[#FDFCF8] rounded-3xl border border-stone-200 p-8 relative overflow-hidden group hover:border-emerald-200 transition-all">
          <div className="z-10 relative">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#10b981] mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Online přihlášky</h3>
            <p className="text-stone-500 max-w-sm">Moderní formuláře, které rodiče vyplní pohodlně na mobilu. Data se automaticky uloží a zkontrolují.</p>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-2/3 bg-emerald-50 rounded-tl-3xl translate-y-4 translate-x-4 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform border border-emerald-100">
              {/* Image placeholder */}
          </div>
        </div>

        {/* Small Card 1 */}
        <div className="bg-[#FDFCF8] rounded-3xl border border-stone-200 p-6 hover:border-emerald-200 transition-all">
          <CreditCard className="text-[#10b981] mb-4" size={28} />
          <h3 className="text-lg font-bold text-stone-800">Chytré platby</h3>
          <p className="text-sm text-stone-500 mt-1">Automatické párování a upomínky.</p>
        </div>

        {/* Small Card 2 */}
        <div className="bg-[#FDFCF8] rounded-3xl border border-stone-200 p-6 hover:border-emerald-200 transition-all">
          <BarChart3 className="text-[#10b981] mb-4" size={28} />
          <h3 className="text-lg font-bold text-stone-800">Přehledy</h3>
          <p className="text-sm text-stone-500 mt-1">Kapacita, finance, zdrav. omezení.</p>
        </div>
      </div>
    </div>
  </section>
);

// 6. Social Proof (Founder's Promise)
const SocialProof = () => (
  <section className="py-20 bg-stone-900 text-white rounded-none md:rounded-3xl mx-0 md:mx-4 mb-4 overflow-hidden relative">
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <div className="w-20 h-20 bg-stone-700 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl overflow-hidden">
        {/* Founder Photo Placeholder */}
        👨‍💻
      </div>
      <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 font-serif italic">
        "Jako organizátor táborů jsem strávil roky v Excelech. campeek jsem vyvinul proto, aby už nikdo nemusel zažívat ten zmatek a stres den před odjezdem."
      </blockquote>
      <div className="text-stone-400">
        <div className="font-bold text-white">Jan Novák</div>
        <div className="text-sm">Zakladatel campeeku & vedoucí tábora</div>
      </div>

      <div className="mt-16 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div><div className="text-3xl font-bold text-[#34d399]">10+</div><div className="text-stone-500 text-sm">Organizací v beta testu</div></div>
        <div><div className="text-3xl font-bold text-[#34d399]">15h</div><div className="text-stone-500 text-sm">Průměrná úspora měsíčně</div></div>
        <div><div className="text-3xl font-bold text-[#34d399]">100%</div><div className="text-stone-500 text-sm">Bezpečnost dat</div></div>
        <div><div className="text-3xl font-bold text-[#34d399]">0</div><div className="text-stone-500 text-sm">Ztracených přihlášek</div></div>
      </div>
    </div>
  </section>
);

// 7. Pricing
const Pricing = () => (
  <section id="pricing" className="py-24 bg-[#FDFCF8]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Jednoduché ceny</h2>
        <p className="text-stone-500">Žádné skryté poplatky. 14 dní na vyzkoušení zdarma.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Starter Plan */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 hover:shadow-lg transition-all">
          <h3 className="text-xl font-bold text-stone-900 mb-2">Starter</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-stone-900">399 Kč</span>
            <span className="text-stone-400 line-through">799 Kč</span>
            <span className="text-stone-500">/ měsíc</span>
          </div>
          <ul className="space-y-4 mb-8">
            {['Až 5 akcí ročně', 'Až 30 dětí na akci', 'Základní podpora'].map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-stone-600">
                <CheckCircle2 size={18} className="text-stone-300" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-3 rounded-xl border-2 border-stone-200 text-stone-800 font-bold hover:border-stone-800 hover:bg-stone-50 transition-all">
            Vyzkoušet zdarma
          </button>
        </div>

        {/* Unlimited Plan */}
        <div className="bg-stone-900 p-8 rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#10b981] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            DOPORUČENO
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Unlimited</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-white">599 Kč</span>
            <span className="text-stone-500 line-through">1199 Kč</span>
            <span className="text-stone-400">/ měsíc</span>
          </div>
          <ul className="space-y-4 mb-8">
            {['Neomezené akce', 'Neomezení účastníci', 'Prioritní podpora', 'Všechny funkce'].map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-stone-300">
                <CheckCircle2 size={18} className="text-[#34d399]" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-3 rounded-xl bg-[#10b981] text-white font-bold hover:bg-[#059669] transition-all shadow-lg shadow-emerald-900/50">
            Vyzkoušet zdarma
          </button>
          <p className="text-center text-stone-500 text-xs mt-4">🔥 Early bird sleva 50% pro prvních 20 klientů</p>
        </div>
      </div>
    </div>
  </section>
);

// 8. FAQ
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { q: "Umí systém exportovat data pro hygienu?", a: "Ano. Jedním kliknutím vygenerujete PDF nebo Excel přesně ve formátu, který vyžaduje hygiena i zdravotník." },
    { q: "Je to bezpečné a v souladu s GDPR?", a: "Absolutně. Data jsou šifrovaná, servery jsou v EU a máme připravené zpracovatelské smlouvy." },
    { q: "Zvládnu to nastavit sám?", a: "Ano, nastavení trvá asi 5 minut. Systém vás provede krok za krokem. Žádné IT znalosti nejsou potřeba." },
    { q: "Co když se mi to nebude líbit?", a: "Máte 14 dní na vyzkoušení zdarma. Pokud nebudete spokojeni, nic neplatíte. Žádné závazky." }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">Časté otázky</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-stone-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between bg-[#FDFCF8] hover:bg-stone-50 text-left"
              >
                <span className="font-semibold text-stone-800">{item.q}</span>
                <ChevronDown size={20} className={`text-stone-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 py-4 text-stone-600 bg-white border-t border-stone-100 text-sm leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. Footer
const Footer = () => (
  <footer className="bg-[#FDFCF8] pt-20 pb-10 border-t border-stone-200">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl font-bold text-stone-900 mb-6">Začněte novou sezónu bez stresu</h2>
        <p className="text-stone-500 mb-8 max-w-xl">
          Vyzkoušejte campeek na 14 dní zdarma. Bez platební karty. Bez rizika.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
           <button className="bg-stone-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-stone-800 shadow-lg transition-all">
             Vyzkoušet zdarma
           </button>
        </div>
        <p className="text-sm text-stone-400 mt-6 flex items-center gap-2">
          <ShieldCheck size={16} /> 30 dní garance vrácení peněz
        </p>
      </div>

      <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
        <div>© 2025 campeek. Všechna práva vyhrazena.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-900">Obchodní podmínky</a>
          <a href="#" className="hover:text-stone-900">Ochrana soukromí</a>
          <a href="#" className="hover:text-stone-900">Kontakt</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE COMPONENT ---
const AltLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <Hero />
      <Empathy />
      <Solution />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default AltLandingPage;
