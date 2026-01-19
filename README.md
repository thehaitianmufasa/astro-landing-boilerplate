# Astro Landing Boilerplate

A lightweight, high-performance landing page template built with Astro, React, and Tailwind CSS. Optimized for Cloudflare Pages deployment.

## Features

- **Zero-JS by default** - Static Astro components ship no JavaScript
- **React Islands** - Interactive components hydrate on-demand
- **Tailwind CSS 4** - Utility-first styling with CSS variable design tokens
- **60-30-10 Color System** - Easy theming via CSS variables
- **Scroll Animations** - CSS-only animations, no Framer Motion needed
- **SEO Ready** - Meta tags, Open Graph, and sitemap support
- **Cloudflare Pages** - One-click deployment with Git integration

## Quick Start

### Using this template

Click "Use this template" on GitHub to create a new repository.

### Local development

```bash
# Clone your new repo
git clone https://github.com/your-username/your-project.git
cd your-project

# Install dependencies
bun install

# Start dev server
bun dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

## Project Structure

```
src/
├── pages/          # Astro pages (routes)
├── layouts/        # Base HTML layouts
├── components/
│   ├── sections/   # Static Astro components
│   └── islands/    # React interactive components
└── styles/         # Global CSS and Tailwind
```

## Customization

### Theming

Edit `src/styles/globals.css` to change colors:

```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent;
}
```

### Adding Pages

Create new `.astro` files in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="New Page">
  <h1>Hello World</h1>
</Layout>
```

### Adding Interactive Components

Create React components in `src/components/islands/` and use with hydration:

```astro
<MyComponent client:visible />
```

## Deployment

### Cloudflare Pages (Recommended)

1. Push to GitHub
2. Connect repository in [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Configure build:
   - Build command: `bun run build`
   - Output directory: `dist`

### Manual Deploy

```bash
bun run deploy
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun run check` | Type check |
| `bun run deploy` | Build and deploy |

## Performance

This template is optimized for performance:

- Static HTML generation
- Minimal JavaScript (only for interactive islands)
- Optimized images and fonts
- Lighthouse scores 95+

## License

MIT
