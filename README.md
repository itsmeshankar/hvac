# Premium HVAC Website

A reusable Next.js App Router implementation of the HVAC agency blueprint, prepared for a MySQL/phpMyAdmin-backed admin dashboard.

## Run

```bash
npm install
npm run dev
```

## Backend Integration

The frontend is backend-aware but keeps local fallback content so it can build before the API exists.

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_ENABLE_LIVE_API=true
```

When live API mode is enabled, frontend pages read these public endpoints:

- `GET /api/site/settings`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/before-after`
- `GET /api/blog`
- `GET /api/blog/:slug`
- `GET /api/faqs`
- `GET /api/testimonials`
- `GET /api/service-areas`
- `POST /api/contact`
- `POST /api/appointments`
- `POST /api/newsletter`

Blog detail pages render backend rich-text HTML through `sanitizeHtml` before using `dangerouslySetInnerHTML`.

## Architecture

- `app/` page routes and dynamic route composition
- `components/ui` shared primitives
- `components/layout` header, footer, persistent calls to action
- `components/sections` reusable page sections
- `components/cards` repeated content blocks
- `components/forms` validated conversion forms
- `lib/api.ts` server-side public API adapters with local fallbacks
- `lib/client-api.ts` client-side form submission helpers
- `lib/sanitize.ts` basic rich-text HTML sanitization
- `lib/site.ts` fallback content and shared constants
- `types/` shared models
- `public/uploads/` Hostinger-compatible upload folders
