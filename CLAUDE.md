# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173/
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

`npm run dev` also serves `/api/inquiry` (see Backend below), so the booking
form can be tested locally without deploying.

There is **no test framework** in this project. Do not invent test commands or
suggest `npm test` — it does not exist. Verify changes with `npm run build` and
by looking at the dev server.

## Project context

Marketing site for Vintage Travel, a travel agency in Baku
(instagram.com/vintagetravel.az).

**All user-facing copy is in Azerbaijani.** Write new UI text, headings, button
labels and `aria-label`s in Azerbaijani, not English. Code, comments in shared
config, and this file stay in English.

**The owner is learning React.** Prefer straightforward, readable patterns over
clever ones. Explain new concepts when introducing them. Don't reach for
context, custom hooks, or advanced patterns unless the task actually needs them.

## Architecture

### Composition

`src/App.jsx` renders `Header`, five section components (`Hero`, `Services`,
`Tours`, `BookingForm`, `Contacts`) and `Footer`. The `#contact` anchor belongs to
`Contacts`, not the footer. Each section is self-contained: it owns its
own `<section>` wrapper, its own background, and its own width container. Adding
a section means writing one component and dropping it into `App.jsx` — there is
no router and no layout component.

### Content lives in `src/data/`

`tours.js` and `services.js` export plain arrays that the section components map
over. Copy changes belong in these files, not inline in JSX.

`contact.js` exports three things and is consumed by `Header`, `Contacts`,
`BookingForm` and `Footer`:

- `AGENTS` — the three real staff numbers. Each carries `phone` (display format),
  `phoneHref` (digits for `tel:`) and `whatsapp` (digits only, no `+`, for `wa.me`).
  Those three shapes exist because each link type needs a different format; keep
  them in sync when a number changes.
- `PRIMARY_AGENT` — `AGENTS[0]`, for places that need exactly one number (header
  call button, booking-form success screen).
- `whatsappLink(agent, message?)` — builds a `wa.me` URL with a pre-filled,
  URL-encoded Azerbaijani greeting. Always use it rather than writing `wa.me`
  URLs by hand.

`CONTACT` now holds only the shared details (email, address, Instagram) — it has
no `phone` field. Never hardcode a phone number or email in a component.

**This data is placeholder content that Claude invented.** Real tour names,
prices, and the contact details in `contact.js` (`+994 00 000 00 00`,
`info@vintagetravel.az`) still need to come from the owner. Do not silently
replace placeholders with more invented data — ask.

`services.js` imports lucide icon components directly into the data array, so
each service carries its own icon; `Services.jsx` renders it as
`const Icon = service.icon`.

### State: Zustand

`src/store/useTourStore.js` holds saved ("seçilmişlər") tour ids. Its purpose is
to let `Tours.jsx` (the heart buttons) and `Header.jsx` (the counter) share state
without prop drilling through `App.jsx`.

Subscribe with narrow selectors so components only re-render on what they use:

```js
const savedIds = useTourStore((state) => state.savedIds);
const toggleSaved = useTourStore((state) => state.toggleSaved);
```

Don't destructure the whole store (`useTourStore()`) — that re-renders on every
change.

The store is wrapped in `persist`, so `savedIds` survives a page reload via
localStorage (key `vintage-travel-tours`). `partialize` deliberately keeps
`showSavedOnly` out of storage — a filter toggle should not be sticky across
visits. Changing the stored shape means users with old localStorage get stale
data, so bump the `name` or add a `version` when that happens.

### Backend: one serverless function

`api/inquiry.js` is the only server-side code. Vercel turns every file in `api/`
into a serverless function automatically, so it is served at `/api/inquiry` in
production with no routing config.

It accepts the booking form POST, validates it, and inserts a row into Supabase.
Three things about it are deliberate:

- **The Supabase key never reaches the browser.** `SUPABASE_SERVICE_ROLE_KEY` is
  read from `process.env` inside the function. Never import it into `src/`, and
  never prefix it with `VITE_` — that would publish it in the client bundle.
- **It validates server-side, not just in the form.** Anyone can POST directly,
  so `validate()` in the function is the real guard; the form's checks are only
  for fast feedback.
- **The hidden `website` field is a spam honeypot.** If it is filled, the request
  is answered `200 OK` and silently dropped, so bots don't retry.

Error responses are shaped for the form: `422` carries `{ errors: { field: "…" } }`
for per-field messages, everything else carries `{ error: "…" }` for a banner. All
of those strings are user-facing, so they are in Azerbaijani.

**Vite does not know about `api/`.** `devApiPlugin()` in `vite.config.js` mounts
the same handler during `npm run dev`, so the form works end to end locally. The
config also copies `.env` into `process.env` via `loadEnv` for that reason.
Without it you would need `vercel dev`.

### Database: Supabase

One table, defined in `supabase/schema.sql` — run it once in the Supabase SQL
Editor. Row Level Security is **on with no public policies**, so the anon key
cannot read or write `inquiries`; only the service-role key in the function gets
through. Keep it that way: adding a public insert policy would let anyone spam
the table directly.

Required env vars (see `.env.example`), set in both `.env` locally and Vercel's
Project Settings → Environment Variables:

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

When they are missing the function logs the submission and returns `503` with a
"call us instead" message rather than crashing — so a misconfigured deploy
degrades instead of looking broken.

### Styling: shadcn/ui + Tailwind v4

Colors live **only** in the `:root` block of `src/index.css`, in two layers.

**Layer 1 — the brand palette.** `--brand` is the logo's exact color, sampled from
`logo.png`: `#246065` → `oklch(0.453 0.062 203)`. Around it sit `--brand-deep`,
`--brand-bright`, `--lagoon`, `--sun` (amber), `--coral` and `--sand`. The warm
accents are what make the page feel lively rather than flat; teal alone read as
too muted. They are exposed to Tailwind through `@theme inline`, so `bg-brand`,
`text-sun`, `from-brand-deep` etc. work like built-in colors.

**Layer 2 — shadcn tokens.** `--primary` is `var(--brand)`, so every shadcn
component follows the logo automatically. Prefer the semantic classes
(`text-primary`, `bg-secondary`, `text-muted-foreground`, `border-border`) for
ordinary UI, and reach for a palette color when you want deliberate accent.

**Never hardcode a hex value in a component.** Changing the brand must mean
editing `index.css` alone.

**Tailwind strips classes built by interpolation.** `` `bg-${tone}` `` compiles to
nothing. Both `Services.jsx` and `Tours.jsx` therefore keep a `TONES` map of full
class strings and index into it — follow that pattern when adding colored
variants, and after any palette change confirm the classes actually landed:

```bash
npm run build && grep -c 'bg-brand' dist/assets/*.css
```

Tailwind v4 has no `tailwind.config.js`. It is wired through the
`@tailwindcss/vite` plugin, and theme tokens come from the `@theme inline` block
in `index.css`.

### shadcn components

Config is in `components.json`: `radix-nova` style, **JSX not TSX**
(`"tsx": false`), lucide icons.

Add components with the CLI rather than writing them by hand:

```bash
npx shadcn@latest add <component> -y
```

Files land in `src/components/ui/`. Treat that directory as generated — prefer
passing `className` from the calling component over editing the primitives, so
they stay upgradeable.

## No responsive design — deliberate

The owner has explicitly asked for this, repeatedly. It is a standing preference,
not an oversight to fix.

- **No Tailwind breakpoint prefixes** (`md:`, `lg:`, `sm:` …)
- **No media queries**
- **No fluid layouts** — no `min-w`/`max-w` percentage tricks

Page sections use a fixed container: `mx-auto w-[1200px] px-10`. Match that
exactly when adding a section. Fixed widths (`w-[660px]`, `w-[560px]`) inside
sections are intentional too.

Do not "helpfully" add responsive behavior while working on something else.

## Two easy things to get wrong

**Anchor targets need `scroll-mt-24`.** The header is `sticky top-0` and `h-24`.
Any section with an `id` that the nav links to must carry `scroll-mt-24`, or
clicking the nav parks the section's heading underneath the header. Smooth
scrolling is set once on `html` in `index.css`.

**lucide-react v1 has no brand icons.** `Instagram`, `Facebook`, `Twitter` etc.
are not exported and importing them fails the build with "Missing export".
Hand-written brand glyphs live in `src/components/icons/`: `InstagramIcon` in
lucide's stroke style (24×24, `stroke="currentColor"`, `strokeWidth="2"`) and
`WhatsAppIcon`, which uses `fill="currentColor"` because the mark is too intricate
to stroke. Both respond to `size-*` and `text-*` like any lucide icon.

WhatsApp buttons intentionally use the brand's own green as literal hex
(`#25D366` / `#128C7E`) rather than a palette token — it is WhatsApp's identity,
not ours, and is the one sanctioned exception to the no-hardcoded-color rule. Verify an icon exists before importing it:

```bash
node -e "console.log(Object.keys(require('lucide-react')).filter(n=>/Name/i.test(n)))"
```

## Path alias

`@/` resolves to `src/`. It is declared in **two** places that must stay in sync:
`resolve.alias` in `vite.config.js` (what actually builds) and `jsconfig.json`
(what the editor uses for autocomplete). Update both or the editor and the build
will disagree.

## Assets

The logo and compass artwork live in `src/assets/` (imported by components, so
Vite fingerprints them) and the logo is duplicated at `public/logo.png`, serving
as both favicon and `og:image`. Replacing the logo means updating both copies.

Originals came from `~/Downloads/{logo,compas}.png` at 1772px and were downscaled
to roughly their display size. Only `sips` is available on this machine — there
is no pngquant/imagemagick, and this `sips` build silently fails on WebP output,
so don't assume a WebP conversion worked without checking the file exists.

## Git

Single `main` branch, pushed to `github.com/SamaZeynalli/vintagetravel` (public)
over SSH. The owner works directly on `main` — solo project, so branch protection
and a `dev` branch would only add friction.

**The site is live at https://vintagetravel.vercel.app** and Vercel auto-deploys
every push to `main`, usually within a minute. That URL is shared with a client as
a demo, so a broken push is visible to them immediately — run `npm run build`
before pushing.

Note this repo lives inside `~/Desktop/`, and `~` itself was once an accidental
git repo. That has been cleaned up, but always confirm `git rev-parse --show-toplevel`
points at the project before staging anything.
