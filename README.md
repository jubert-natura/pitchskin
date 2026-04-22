# Pitch Skin — Design System

Production design system for **pitchskin.com** — clinical Korean skincare brand.
Sunshine yellow CTAs · soft pastel section washes · bold Roobert sans headlines · serif italic accents.

> No Tailwind. Tokens live in `tokens.json` (W3C Design Tokens format) and are mirrored as CSS custom properties in `src/styles/tokens.css`. Components are plain `.tsx` + `.css` modules.

---

## Repo Layout

```
.
├── .gitignore
├── README.md
├── package.json
├── tokens.json                     # W3C Design Tokens — Desktop 1440 values
├── public/
│   ├── logo/                       # brand marks (svg, png light/dark)
│   ├── products/                   # product imagery (webp preferred)
│   ├── images/                     # lifestyle / editorial / hero shots
│   └── video/                      # demo videos and animated webp
└── src/
    ├── styles/
    │   └── tokens.css              # CSS source of truth (custom properties)
    ├── lib/
    │   └── utils.ts                # cn helper
    ├── design-system/
    │   └── pitchskin-design-system.jsx   # tokens canvas + component catalog
    └── components/
        └── ui/
            ├── button.tsx
            └── button.css
```

---

## Brand Tokens (Desktop 1440)

### Core Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `brand/yellow` | `#FFC629` | Primary CTA, announcement bar |
| `brand/yellow-deep` | `#F2B705` | Hover / active CTA |
| `brand/ink` | `#111111` | Headlines, body, nav |
| `brand/ink-soft` | `#2A2A2A` | Secondary body copy |

### Pastel Surface Washes
`surface/cream #FAF6EE` · `surface/stone #E8E6E1` · `surface/butter #FCE9AE` · `surface/peach #FCE3B5` · `surface/wheat #FEEDAF` · `surface/sky #CFE0F7` · `surface/mint #BFE0D9` · `surface/white #FFFFFF`

### Semantic
`semantic/success #2EA36B` · `semantic/error #D94F3A` · `semantic/sale #E04F3A` · `semantic/badge-blue #2E8B8B`

### Typography
- **Display / Body:** Inter → system-ui → -apple-system → Segoe UI
- **Serif Italic:** Tiempos Headline → GT Sectra → Georgia (used only for accent italics)

Load Inter via Google Fonts or self-host — variable weights 400/500/600/700/800 are all used.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Scale: H1 56 · H2 40 · H3 28 · H4 20 · BodyLg 18 · Body 16 · BodySm 14 · Caption 12 · Button 14 (uppercase, 0.08em tracking).

### Spacing (4px base)
`0, 4, 8, 12, 16, 24, 32, 48, 64, 96`

### Radius
`none 0 · sm 4 · md 8 · lg 12 · xl 20 · pill 9999`

### Grid
Max **1280px** · 12 columns · 24px gutter · breakpoints **360 / 480 / 768 / 1024 / 1440**.

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Asset Reference

All assets are served from `/public` — reference with an absolute path from any component.

**Logos** (`/logo/`) — drop your own SVG/PNG marks here.

**Products** (`/products/`)
- `/products/korean-toner-pads-200ml.jpg` — main SKU shot
- `/products/pitchskin-hero.webp` — hero product still
- `/products/product-main.png` — primary packshot
- `/products/product-08.jpg`, `/products/product-09.jpg`, `/products/product-10.jpg` — gallery stills

**Images** (`/images/`) — 9 lifestyle/editorial frames (`hf_*.png/jpeg`) for hero and testimonial blocks.

**Video** (`/video/`)
- `/video/pitchskin-demo.mp4` — primary demo (MP4)
- `/video/pitchskin-demo.webp` — demo (animated WebP fallback)
- `/video/pitchskin-clip-01.webp`, `/video/pitchskin-clip-02.webp` — secondary clips

Usage in JSX:
```jsx
<img src="/products/pitchskin-hero.webp" alt="Pitch Skin toner pads" />

<video src="/video/pitchskin-demo.mp4" poster="/products/pitchskin-hero.webp" autoPlay muted loop playsInline />
```

---

## Conventions

- **No Tailwind.** Styling is plain CSS with custom properties consumed from `tokens.css`.
- **Token source of truth:** edit `tokens.json` first, then regenerate/sync `tokens.css`.
- **Components** import their own `.css` sibling file — no global leakage.
- **`cn()`** joins classnames (falsy values filtered). Lives in `src/lib/utils.ts`.
