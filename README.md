# Creamery Hut - Website

Premium street food restaurant website built with Next.js, featuring cinematic GSAP scroll animations, WebGL liquid image distortions, and a brutalist design system.

## Tech Stack

| Library | Purpose |
|---------|---------|
| **Next.js 16** | SSR, App Router, Image optimization |
| **Tailwind CSS v4** | Utility-first responsive styling |
| **GSAP + ScrollTrigger** | Scroll-based animations, parallax |
| **Lenis** | Butter-smooth native scroll |
| **Framer Motion** | Gallery lightbox layout transitions |
| **Three.js + React Three Fiber** | WebGL liquid image distortion (desktop only) |
| **SplitType** | Character-level text animation |
| **Lucide React** | SVG icon system |
| **react-fast-marquee** | Scrolling text ticker strips |

## Folder Structure

```
creamyhut/
├── app/
│   ├── globals.css        ← Global styles, Tailwind theme, Lenis config
│   ├── layout.jsx         ← Root layout (fonts, providers, nav, footer)
│   └── page.jsx           ← Single-page app (all sections)
├── components/
│   ├── Cursor.jsx         ← Custom cursor with trail + magnetic buttons
│   ├── Footer.jsx         ← Site footer with scroll-to-section nav
│   ├── GalleryLightbox.jsx← Framer Motion shared-layout lightbox
│   ├── LiquidImage.jsx    ← WebGL shader distortion (desktop) / static Image (mobile)
│   ├── MarqueeDivider.jsx ← Scrolling text ticker sections
│   ├── MenuItemRow.jsx    ← Accordion-style menu item with GSAP
│   ├── Navbar.jsx         ← Fixed navbar with ScrollSpy via IntersectionObserver
│   ├── PageWipe.jsx       ← Red overlay transition for section navigation
│   ├── ScrollProvider.jsx ← Lenis smooth scroll + GSAP ticker sync
│   └── SplitCascadeText.jsx ← Character-reveal animation (desktop only)
├── public/
│   ├── ghost_pepper_pizza_*.png  ← Placeholder: pizza photo
│   ├── smash_burger_*.png        ← Placeholder: burger photo
│   ├── truffle_fries_*.png       ← Placeholder: fries photo
│   ├── oreo_shake_*.png          ← Placeholder: shake photo
│   ├── restaurant_ambiance_*.png ← Placeholder: interior photo
│   └── hero.mp4                  ← Placeholder: hero video reel
├── version-2/             ← Experimental horizontal-scroll layout (independent Next.js app)
├── next.config.mjs        ← Next.js configuration
├── vercel.json            ← Vercel deployment config + security headers
├── postcss.config.mjs     ← PostCSS for Tailwind
└── package.json           ← Dependencies and scripts
```

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Asset Swap Guide

All visual assets are AI-generated placeholders. Replace each file in `/public/` with real photography:

| Current File | Replace With |
|-------------|-------------|
| `ghost_pepper_pizza_*.png` | Professional pizza photography |
| `smash_burger_*.png` | Professional burger photography |
| `truffle_fries_*.png` | Professional fries photography |
| `oreo_shake_*.png` | Professional shake photography |
| `restaurant_ambiance_*.png` | Real restaurant interior photo |
| `hero.mp4` | Real hero video reel (9:16 vertical) |

Image constants are defined at the top of `app/page.jsx` for easy path updates.

## Content Update Guide

| Location | What to update |
|----------|---------------|
| `app/page.jsx` → `MENU_DATA` | Menu items, prices, ingredients |
| `app/page.jsx` → Contact section | Phone number, email, address, hours |
| `app/layout.jsx` → `metadata` | SEO title and description |
| `components/Footer.jsx` | Address, hours, social links |
| `components/MarqueeDivider.jsx` | Ticker text items |

## Security Features

Implemented via `vercel.json` headers:

- **Content-Security-Policy** - Restricts script/style/font/media sources
- **Strict-Transport-Security** - Forces HTTPS with 2-year max-age
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-Frame-Options: SAMEORIGIN** - Prevents clickjacking
- **X-XSS-Protection** - Legacy XSS filter enabled
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer info
- **Permissions-Policy** - Disables camera, microphone, geolocation APIs

## Performance Notes

- **Mobile optimization**: WebGL shaders (`LiquidImage`) and character-split animations (`SplitCascadeText`) are disabled on screens < 768px to prevent jitter
- **Lazy rendering**: GSAP ScrollTrigger ensures animations only fire when elements enter the viewport
- **Smooth scroll**: Lenis provides 120fps-synced scroll with GSAP ticker integration
- **Video**: Hero video uses `preload="metadata"` to avoid blocking page load

## Known Limitations

- **Contact form**: Currently uses a mock `setTimeout` - needs a real API endpoint (e.g., Formspree, Resend, or custom backend)
- **Newsletter**: Footer email subscription is frontend-only - needs backend integration
- **Instagram feed**: Footer social grid is a placeholder - needs Instagram Graph API connection
- **No favicon**: Add a `favicon.ico` and `apple-touch-icon.png` to `/public/` before launch
