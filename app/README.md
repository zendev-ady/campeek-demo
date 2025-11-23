# App Directory - Routing Structure

This directory contains all routes and pages for the Campeek application using Next.js 16 App Router with **semantic route groups**.

## 🗂️ Directory Structure

```
app/
├── (marketing)/         # Route group: Landing page (public)
├── (auth)/              # Route group: Authentication pages (public)
├── (public-registration)/ # Route group: Public event registration
├── (app)/               # Route group: Main authenticated application
├── demo/                # Development/preview utilities
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── README.md            # This file
```

## 📍 Route Groups Explained

### `(marketing)` - Marketing & Landing
**URL Pattern:** `/` (when not authenticated)

- Public landing page with demo CTA
- Clean, minimal layout without sidebar
- **Audience:** Potential customers, first-time visitors

### `(auth)` - Authentication Routes
**URL Pattern:** `/login`, `/register`, `/forgot-password`

- Uses parentheses `()` to create a route group **without affecting URLs**
- Groups authentication-related pages together
- Allows shared layout for auth pages (centered forms, no sidebar)
- **Audience:** Organizers registering/logging into the system

### `(public-registration)` - External Event Registration
**URL Pattern:** `/events/[id]`

- **Public route** - no authentication required
- Parents register their children for camps/events
- Separate from `(auth)/register` to avoid confusion:
  - `(auth)/register` = Register as an **organizer**
  - `(public-registration)/events/[id]` = Register a **child for an event**
- **Audience:** Parents registering children

### `(app)` - Main Application
**URL Pattern:** `/`, `/events`, `/communication`, etc.

- **Protected routes** - requires authentication
- Shared layout with sidebar navigation, header, organization switcher
- All admin functionality lives here
- Automatically redirects to `/login` if not authenticated
- **Audience:** Authenticated organizers

### `demo` - Preview & Testing
**URL Pattern:** `/demo/*`

- Development utilities and email previews
- Minimal layout (no sidebar)
- Can be removed in production

## 🔒 Authentication Flow

```
┌─────────────┐
│   Landing   │  / (public)
└──────┬──────┘
       │
       ├─────► Login     (/login)
       ├─────► Register  (/register) - organizers
       │
       ▼
┌─────────────┐
│     App     │  / (authenticated)
└─────────────┘
```

## 🌍 Public vs Protected Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` (not auth'd) | 🌍 Public | Landing page with demo |
| `/login` | 🌍 Public | Organizer login |
| `/register` | 🌍 Public | New organizer signup |
| `/events/[id]` (public) | 🌍 Public | Parent registers child |
| `/` (auth'd) | 🔒 Protected | App home dashboard |
| `/events` | 🔒 Protected | Events management |
| `/communication` | 🔒 Protected | Communication center |
| `/contacts` | 🔒 Protected | Contact management |
| `/finances` | 🔒 Protected | Financial overview |
| `/organization` | 🔒 Protected | Organization settings |
| `/demo/*` | 🌍 Public | Development tools |

## 🎯 Route Group Benefits

### Why Use Route Groups?

1. **Organization without URL impact** - `(marketing)` doesn't appear in URLs
2. **Shared layouts** - Each group can have its own layout
3. **Clear separation** - Easy to see what's public vs protected
4. **Better DX** - New developers instantly understand structure

### Adding New Routes

**Protected page (in app):**
```tsx
// app/(app)/my-feature/page.tsx
export default function MyFeaturePage() {
  return <div>My Feature</div>
}
// URL: /my-feature
```

**Public page:**
```tsx
// app/(marketing)/about/page.tsx
export default function AboutPage() {
  return <div>About Us</div>
}
// URL: /about
```

**External form:**
```tsx
// app/(public-registration)/surveys/[id]/page.tsx
export default function SurveyPage() {
  return <div>Survey</div>
}
// URL: /surveys/[id]
```

## 🛠️ Best Practices

1. **Protected pages** → Place in `(app)/`
2. **Public auth pages** → Place in `(auth)/`
3. **External forms** → Place in `(public-registration)/`
4. **Marketing content** → Place in `(marketing)/`
5. **Shared layouts** → Use `layout.tsx` in each directory
6. **Route groups** → Use `(name)` for organization without URL impact

## 📝 Naming Conventions

- Route groups use **lowercase** with **hyphens**: `(public-registration)`
- Files use **lowercase** with **hyphens**: `forgot-password/`
- React components use **PascalCase**: `export default function AppPage()`

## 🔍 URL Examples

After refactoring, all URLs are shorter and cleaner:

```diff
- /dashboard/events/abc-123
+ /events/abc-123

- /dashboard/communication/preview/msg-456
+ /communication/preview/msg-456

- /register/evt-789
+ /events/evt-789
```

Saved **9-15 characters** per URL! 🎉
