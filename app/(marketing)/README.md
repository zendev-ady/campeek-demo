# (marketing) - Marketing & Landing Pages

Route group for public-facing marketing content.

## 📌 Why Parentheses?

The `(marketing)` directory is a **route group** in Next.js:
- **Does NOT appear in URLs** - `/` instead of `/marketing/`
- Groups marketing-related pages together
- Allows shared layout across marketing pages
- Keeps public content separate from authenticated app

## 🗂️ Routes

```
(marketing)/
├── layout.tsx           → Minimal layout (no sidebar)
└── page.tsx             → / (landing page)
```

## 🎯 Purpose

This route group contains **public marketing pages**:
- Landing page with product overview
- Demo mode CTA ("Zobrazit demo")
- Features showcase
- Call-to-action for organizers

## 🎨 Layout

Marketing pages use a minimal layout:
- No sidebar or navigation
- No authentication required
- Full-width content
- Focus on conversion

```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return <>{children}</>  // Just the content
}
```

## 🔄 User Flow

```
Landing Page (/)
    │
    ├──► Click "Zobrazit demo"
    │      │
    │      └──► Auto-login & redirect to app (/)
    │
    ├──► Click "Přihlásit se"
    │      │
    │      └──► Navigate to /login
    │
    └──► Click "Registrovat"
           │
           └──► Navigate to /register
```

## 🎯 Components

- Uses `<LandingPage />` component from `@/components/landing-page.tsx`
- Integrates with demo data seeding via `initializeDemoMode()`
- Auto-login with demo credentials after demo activation

## 🚀 Adding More Marketing Pages

```tsx
// app/(marketing)/pricing/page.tsx
export default function PricingPage() {
  return <div>Pricing Information</div>
}
// URL: /pricing
```

## 💡 Future Enhancements

- `/about` - About the company
- `/pricing` - Pricing tiers
- `/features` - Feature details
- `/blog` - Blog posts
- `/contact` - Contact form
