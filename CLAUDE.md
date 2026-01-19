# Astro Landing Page Boilerplate

## Overview

Lightweight Astro + Cloudflare Pages boilerplate for static client landing pages. Optimized for performance with zero-JS static sections and on-demand React islands.

**Stack:** Astro 5 + React 19 + Tailwind 4 + Cloudflare Pages

---

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server (localhost:4321)
bun dev

# Build for production
bun build

# Preview production build
bun preview

# Type check
bun run check

# Deploy to Cloudflare
bun run deploy
```

---

## Project Structure

```
src/
├── pages/
│   └── index.astro          # Main landing page
├── layouts/
│   └── Layout.astro         # Base HTML layout + scroll observer
├── components/
│   ├── sections/            # Static Astro components (0 JS)
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── ValueProps.astro
│   │   ├── Portfolio.astro
│   │   └── Footer.astro
│   └── islands/             # React components (hydrated on-demand)
│       ├── ContactForm.tsx
│       └── BookingEmbed.tsx
└── styles/
    └── globals.css          # Tailwind + CSS variables + animations
```

---

## Component Pattern

| Type | Location | Hydration | Use For |
|------|----------|-----------|---------|
| **Static** | `sections/*.astro` | None (0 JS) | Hero, Stats, Portfolio, Footer |
| **Interactive** | `islands/*.tsx` | `client:visible` | Forms, Embeds, Navigation |

### Hydration Strategies

```astro
<!-- Load when scrolled into view (recommended for forms) -->
<ContactForm client:visible />

<!-- Load immediately (for above-fold interactivity) -->
<MobileNav client:load />

<!-- Load when browser is idle -->
<Analytics client:idle />
```

---

## Customization

### 1. Design Tokens (globals.css)

Update CSS variables for 60-30-10 color system:

```css
:root {
  /* 60% - Background */
  --color-primary: #1a1a2e;

  /* 30% - Surfaces */
  --color-secondary: #16213e;

  /* 10% - Accent (the pop!) */
  --color-accent: #e94560;

  /* Typography */
  --font-sans: 'Inter', system-ui;
  --font-heading: 'Inter', system-ui;
}
```

### 2. Scroll Animations

Add `animate-on-scroll` class to any element:

```astro
<div class="animate-on-scroll animate-delay-200">
  Content fades up when scrolled into view
</div>
```

Available delays: `animate-delay-100` through `animate-delay-500`

### 3. Adding New Sections

1. Create `src/components/sections/NewSection.astro`
2. Import and use in `src/pages/index.astro`
3. Static by default - zero JavaScript

### 4. Adding Interactive Features

1. Create `src/components/islands/Feature.tsx`
2. Use with hydration directive: `<Feature client:visible />`

---

## Deployment

### Cloudflare Pages (Recommended)

**Via Git Integration:**
1. Push to GitHub
2. Connect repo in Cloudflare Dashboard
3. Build command: `bun run build`
4. Output directory: `dist`

**Via CLI:**
```bash
bun run deploy
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_SITE_NAME="Client Name"
PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxx
```

---

## Performance Targets

- **JS Bundle:** < 10KB (only React islands)
- **Lighthouse:** 95+ all categories
- **Core Web Vitals:** All green

---

## Adding Forms

### Option 1: Formspree

1. Create form at formspree.io
2. Set `PUBLIC_FORM_ENDPOINT` in `.env`
3. Pass to ContactForm: `<ContactForm client:visible submitEndpoint={endpoint} />`

### Option 2: Cloudflare Functions

1. Add `functions/` directory
2. Create API endpoint
3. Update form submission logic

---

## Commands Reference

| Command | Action |
|---------|--------|
| `bun dev` | Start dev server at localhost:4321 |
| `bun build` | Build production site to `./dist/` |
| `bun preview` | Preview production build locally |
| `bun run check` | Run Astro type checker |
| `bun run deploy` | Build and deploy to Cloudflare Pages |
