# Flavours Fantasy - Website

Culinary restaurant and dining experience website built with Next.js, featuring cinematic GSAP scroll animations, WebGL liquid image distortions, and an editorial dark aesthetic.

## Tech Stack

| Library | Purpose |
|---------|---------|
| **Next.js 16** | SSR, App Router, Image optimization |
| **Tailwind CSS v4** | Utility-first responsive styling |
| **GSAP + ScrollTrigger** | Scroll-based animations, parallax |
| **Lenis** | Butter-smooth native scroll |
| **Framer Motion** | Gallery lightbox layout transitions |
| **Three.js + React Three Fiber** | WebGL liquid image distortion (hover-only) |
| **SplitType** | Character-level text animation |
| **Lucide React** | SVG icon system |
| **react-fast-marquee** | Scrolling text ticker strips |

## Folder Structure

```
flavours-fantasy/
├── app/
│   ├── globals.css        <- Global styles, token palette, typography
│   ├── layout.jsx         <- Root layout (fonts, providers, nav, footer, SEO)
│   ├── not-found.jsx      <- Custom branded 404 page
│   ├── page.jsx           <- Single-page application (all sections)
│   ├── robots.js          <- Search engine crawler directives
│   └── sitemap.js         <- XML sitemap configuration
├── components/
│   ├── Cursor.jsx         <- Custom cursor with trail and magnetic buttons
│   ├── Footer.jsx         <- Site footer with navigation and social links
│   ├── GalleryLightbox.jsx<- Framer Motion shared-layout lightbox
│   ├── LiquidImage.jsx    <- WebGL shader distortion on hover
│   ├── MarqueeDivider.jsx <- Editorial ticker divider
│   ├── MenuItemRow.jsx    <- Accordion-style menu row with GSAP
│   ├── Navbar.jsx         <- Fixed navbar with compact logo lockup
│   ├── PageWipe.jsx       <- Red overlay transition for section navigation
│   ├── ScrollProvider.jsx <- Lenis smooth scroll and GSAP ticker sync
│   └── SplitCascadeText.jsx <- Character-reveal animation
├── public/
│   ├── brand/             <- Brand logos (flavours-fantasy-logo.png)
│   ├── menu-pizza.png     <- Pizza presentation photo
│   ├── menu-burger.png    <- Burger presentation photo
│   ├── menu-fries.png     <- Sides presentation photo
│   ├── menu-shake.png     <- Beverage presentation photo
│   ├── ambiance.png       <- Dining room ambiance photo
│   ├── hero.mp4           <- Optimized vertical video reel
│   ├── hero.webm          <- WebM optimized vertical video reel
│   └── hero-poster.jpg    <- Poster image for initial load
├── next.config.mjs        <- Next.js configuration
├── vercel.json            <- Vercel deployment config and security headers
├── postcss.config.mjs     <- PostCSS for Tailwind
└── package.json           <- Dependencies and scripts
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

## Security Features

Implemented via `vercel.json` headers:
- **Content-Security-Policy**: Restricts script, style, font, and media sources
- **Strict-Transport-Security**: Forces HTTPS with 2-year max-age
- **X-Frame-Options**: Prevents clickjacking (`SAMEORIGIN`)
- **X-Content-Type-Options**: Blocks MIME-type sniffing (`nosniff`)
- **Referrer-Policy**: Controls referrer information leakage
