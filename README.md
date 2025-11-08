# Campeek – Event Management System

Campeek is a Next.js PROTOTYPE for an app for organizing children’s camps and events. It focuses on the workflows small teams need most: capturing registrations, managing organizations and events, tracking capacity, and sharing a public sign-up form. The UI is in Czech and targets local organizers.

## Features

- **Guided landing + demo seed** – Use the “Zobrazit demo” CTA to populate the browser’s `localStorage` with sample data (user, organization, events, registrations) for instant exploration.
- **Authentication & onboarding** – Email/password login backed by a lightweight `localStorage` user store plus quick registration for new organizers.
- **Organizations & events** – Vytvářejte a duplikujte akce napříč organizacemi a upravujte kapacitu, ceny, věkové limity i popisy.
- **Dashboard & insights** – Overview cards zvýrazňují celkový přehled, blížící se akce a kapacity, a linkují na detailní správu.
- **Public registration flow** – Dynamic `register/[eventId]` form allows multiple children, calculates sibling discounts, and persists submissions locally for later review.
- **Work-in-progress modules** – Dedicated areas for Contacts, Communication, and Organization settings already scaffolded for future development.

## Tech Stack

- [Next.js 16](https://nextjs.org/) with the App Router and React 19
- TypeScript and modern ECMAScript features
- Tailwind CSS 4 + PostCSS, with shadcn/ui + Radix primitives for consistent UI components
- Local state handled through custom React context providers (`lib/*-context.tsx`)

## Project Layout

- `app/` – All routes, layouts, and pages (landing page, auth routes, dashboard, public registration).
- `components/` – Reusable UI, dialogs, forms, and shadcn-based primitives.
- `lib/` – Domain types, contexts, mock/demo data seeding helpers, and utilities.
- `styles/` – Global Tailwind layer configuration.

## Local Development

### Prerequisites

- Node.js **18.18+** (matching Next.js 16 requirements)
- [pnpm](https://pnpm.io) 8+ (recommended package manager for this repo)

### Install & Run

```bash
pnpm install      # install dependencies
pnpm dev          # start Next.js dev server on http://localhost:3000
```

Open the landing page in your browser and either:

1. Click **“Zobrazit demo”** to call `initializeDemoMode()` and preload demo data into `localStorage`, then continue straight to the dashboard, or
2. Use the built-in credentials `demo@campeek.cz` / `demo123` on `/login`.

Because the app persists everything to the browser’s `localStorage`, clearing site data resets the environment to a clean state.

### Additional Scripts

| Command        | Description                               |
| -------------- | ----------------------------------------- |
| `pnpm lint`    | Run ESLint across the project             |
| `pnpm build`   | Create a production build (`.next/`)      |
| `pnpm start`   | Serve the previously built production app |

## Deployment

The project deploys seamlessly to Vercel; run `pnpm build` locally before pushing to ensure the production bundle succeeds. Any backend or persistent storage requirements can later be swapped in by replacing the local React contexts with real API calls.
