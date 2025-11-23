# (auth) - Authentication Routes

Route group for all authentication-related pages.

## 📌 Why Parentheses?

The `(auth)` directory is a **route group** in Next.js:
- **Does NOT appear in URLs** - `/login` instead of `/auth/login`
- Groups related routes together for better organization
- Allows shared layout across auth pages

## 🗂️ Routes

```
(auth)/
├── login/               → /login
├── register/            → /register
├── forgot-password/     → /forgot-password
└── reset-password/
    └── [token]/         → /reset-password/[token]
```

## 🎯 Purpose

These pages allow **organizers** to:
- Log into their account (`/login`)
- Create a new organizer account (`/register`)
- Request a password reset (`/forgot-password`)
- Reset their password with a token (`/reset-password/[token]`)

> **Note:** This is **NOT** for parents registering children for events.  
> Parent registration is at `/register/[eventId]`

## 🔐 Authentication Context

All auth pages use `AuthProvider` from `@/lib/auth-context.tsx`:

```tsx
import { useAuth } from "@/lib/auth-context"

const { login, register, requestPasswordReset, resetPassword } = useAuth()
```

## 🎨 Layout

Auth pages can share a custom layout (if needed):
- Centered form design
- No sidebar or navigation
- Minimal header
- Focus on the form

Create `app/(auth)/layout.tsx` to customize.

## 🔄 User Flow

```
Landing Page
    │
    ├──► Login (/login)
    │      │
    │      └──► Dashboard
    │
    ├──► Register (/(auth)/register)
    │      │
    │      └──► Dashboard (auto-login)
    │
    └──► Forgot Password (/forgot-password)
           │
           └──► Reset Password (/reset-password/[token])
                  │
                  └──► Login
```

## 💾 Data Storage

Currently uses `localStorage` for prototyping:
- User credentials stored in `localStorage.users`
- Reset tokens in `localStorage.resetTokens`

> **Production:** Replace with API calls to backend authentication service.
