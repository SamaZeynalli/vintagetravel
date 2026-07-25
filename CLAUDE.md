# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173/
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

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

`src/App.jsx` renders `Header` plus three section components (`Hero`,
`Services`, `Tours`). Each section is self-contained: it owns its own `<section>`
wrapper, its own background, and its own width container. Adding a section means
writing one component and dropping it into `App.jsx` — there is no router and no
layout component.

### Content lives in `src/data/`

`tours.js` and `services.js` export plain arrays that the section components map
over. `contact.js` exports a single `CONTACT` object — phone, email, address,
Instagram — consumed by both `Header` and `Footer`. Copy changes belong in these
files, not inline in JSX. Never hardcode a phone number or email in a component.

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

### Styling: shadcn/ui + Tailwind v4

Brand colors are defined **once**, as shadcn CSS variables in the `:root` block
of `src/index.css` — a dark teal `--primary` sampled from the logo on a cream
`--background`. Because every shadcn component reads those variables, the whole
UI follows the brand automatically.

So: style with semantic classes (`text-primary`, `bg-secondary`, `text-muted-foreground`,
`border-border`). **Never hardcode a teal or cream hex value in a component** —
changing the brand should mean editing `index.css` alone.

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
Hand-written brand glyphs live in `src/components/icons/` in lucide's style
(24×24, `stroke="currentColor"`, `strokeWidth="2"`) so `size-*` classes and
`text-*` colors work identically. Verify an icon exists before importing it:

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
over SSH. The owner works directly on `main` — solo project, no deployment yet,
so branch protection and a `dev` branch would only add friction. Revisit if the
site goes live.

Note this repo lives inside `~/Desktop/`, and `~` itself was once an accidental
git repo. That has been cleaned up, but always confirm `git rev-parse --show-toplevel`
points at the project before staging anything.
