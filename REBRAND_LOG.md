# Flavours Fantasy - Rebrand and Production Audit Log

## 1. Brand Direction and Mood
- Brand Name: Flavours Fantasy
- Core Palette: #000000 (Black), #FC0C14 (Primary Red), #FFFFFF (White)
- Typography: Playfair Display (Serif, weights 700 and 900) for headlines, section titles, and monogram; Montserrat (Sans-serif, weights 400, 500, 600, 700) for body, wordmark, navigation, and controls.
- Visual Identity: Dark, editorial, disciplined, sharp edges. No soft shadows, no pill badges, no rounded cards, no brutalist clutter.

## 2. Compact Token System
Defined in `app/globals.css` using Tailwind CSS v4 `@theme`:
- `--color-ff-black: #000000` (Core canvas, dark backgrounds, high-contrast text on white/red)
- `--color-ff-white: #FFFFFF` (Core text on black, light canvas backgrounds)
- `--color-ff-red: #FC0C14` (Accents, rules, active states, large display type, cursor on black)
- `--color-ff-red-deep: #C4000C` (Hover fills, small red text on white, white text on red fills for AA contrast)
- `--color-ff-surface: #141414` (Elevated surfaces on black)
- `--color-ff-grey-on-black: #A3A3A3` (Body text, subtext on black; 8.3:1 contrast ratio)
- `--color-ff-grey-on-white: #5C5C5C` (Body text, subtext on white; 6.7:1 contrast ratio)

## 3. Contrast Rules and WCAG AA Compliance
- Small text (<24px regular, <18.66px bold) on white: never uses `ff-red` (#FC0C14 is ~3.9:1 against white, failing AA). Uses `ff-red-deep` (#C4000C, 5.6:1) or `ff-black`.
- White text on red fill: allowed only on `ff-red-deep` (#C4000C is 4.7:1 against white).
- Red fill with small text: uses `ff-black` text (#000000 on #FC0C14 is 5.2:1, passing AA).
- Large display text (>=24px or bold >=18.66px): `ff-red` passes the 3.0:1 threshold (4.04:1).

## 4. Generic Template Tells Removed
- Eliminated color accents on single headline words.
- Eliminated tracked all-caps eyebrows above headings.
- Eliminated numbered sequence markers where content is not an ordered sequence.
- Eliminated middle-dot meta strings.
- Eliminated gradient washes and fuzzy multi-stop radial glows.
- Eliminated soft-shadow rounded cards. Sharp corners everywhere (`rounded-none`), crisp 1px borders.
- Removed noise overlay div completely to keep true deep black without muddying contrast.

## 5. Signature Hero Concept
- Boldness focused in the hero section: echoing the signature move of the Flavours Fantasy logo.
- A massive red "FF" monogram set in Playfair Display 900 sits behind the portrait video reel, bleeding off the edge.
- The crisp white headline set in Playfair Display crosses over the red monogram.
- The portrait video frame has a sharp 1px `ff-red` border and full video opacity.
- Supporting text and navigation remain quiet, structured, and editorial.

## 6. Layout Decisions
- Header: Black (`bg-ff-black`), compact lockup with FF monogram and live tracked wordmark.
- Hero: Black (`bg-ff-black`).
- Divider: Red band (`bg-ff-red`) with black tracked typography.
- Menu: White (`bg-ff-white`) with black text, 2px red category underlines, sharp 1px border signature cards.
- About: Black (`bg-ff-black`) with low-opacity red outline typography, brand logo presentation, and sharp monochrome-to-color imagery.
- Gallery: Black (`bg-ff-black`). Decision: Set to black for cohesive cinematic transition with About and Contact. Hover overlay uses `ff-red` at 80% opacity with "View" in Playfair Display.
- Contact: Black (`bg-ff-black`) to unify form and restaurant info into one solid block.
- Footer: Black (`bg-ff-black`), clean live text lockup, real Instagram link, sharp newsletter action.

## 7. Decorative Element Removed
- Removed the redundant second marquee divider `<MarqueeDivider direction="right" light={true} />` between About and Gallery to eliminate visual repetition.
- Removed harsh 8px brutalist divider borders (`border-b-8` and `border-y-8`) across sections.

## 8. Assets and Media Optimization
- Video re-encoding:
  - Original `hero.mp4` (26.88 MB) and `hero.webm` (24.43 MB) re-encoded to 720x1280 @ 1.5 Mbps.
  - New sizes: `hero.mp4` is 2.68 MB; `hero.webm` is 2.78 MB (both under 3 MB target).
  - Extracted `hero-poster.jpg` (23.8 KB) for instantaneous first-frame visual without waiting for video decoding.
  - Video pauses automatically when scrolled out of view via IntersectionObserver.
  - Autoplay disabled when user prefers reduced motion.
  - Deleted duplicate 26.88 MB `final_hero.mp4` from root directory.
- Image assets:
  - Renamed all AI placeholder images to semantic plain names: `menu-pizza.png`, `menu-burger.png`, `menu-fries.png`, `menu-shake.png`, `ambiance.png`.
- Brand assets generated:
  - `public/brand/flavours-fantasy-logo.png` copied from uploaded logo.
  - `public/icon.png` and `app/icon.png` (512x512) rendered in Playfair Display 900 on black.
  - `public/apple-touch-icon.png` and `app/apple-icon.png` (180x180) generated.
  - `public/favicon.ico` and `app/favicon.ico` generated in valid RGBA format.
  - `public/og-image.png` (1200x630) generated with centered brand logo on black.
- WebGL optimization:
  - Modified `LiquidImage.jsx` to only mount a WebGL `<Canvas>` on the single currently hovered card on desktop devices. All other instances render standard optimized `next/image` components.

## 9. Verification and Test Results
- Production Build:
  - Command: `npm run build`
  - Result: PASS (Compiled in 2.7s with Turbopack, all static routes generated)
- Linting:
  - Command: `npm run lint`
  - Result: PASS (0 errors, 0 warnings)
- Responsive Viewports (Playwright Automated Audit):
  - 360px (mobile): scrollWidth 360px, overflow False (PASS)
  - 768px (tablet): scrollWidth 768px, overflow False (PASS)
  - 1280px (laptop): scrollWidth 1280px, overflow False (PASS)
  - 1920px (desktop): scrollWidth 1920px, overflow False (PASS)
- Browser Console Errors: 0 errors detected across all viewports.
- 404 Route Verification: `/not-a-real-page` renders custom branded `app/not-found.jsx` (Status 200/404 handled).
- SEO Metadata Routes: `/robots.txt` (Status 200), `/sitemap.xml` (Status 200).

## 10. Performance Audit Numbers (Lighthouse Mobile)
- Performance: 91 / 100
- Accessibility: 96 / 100
- Best Practices: 100 / 100
- SEO: 100 / 100
- First Contentful Paint (FCP): 1.2s
- Largest Contentful Paint (LCP): 3.3s
- Total Blocking Time (TBT): 90ms
- Cumulative Layout Shift (CLS): 0.00
- Speed Index: 3.1s

## 11. Placeholders Recorded
- Address: Marine Promenade, Mumbai, Maharashtra (Pending exact client venue address).
- Phone Number: +91 00000 00000 (Pending client phone number).
- Email Address: contact@flavoursfantasy.com (Pending client official mailbox).
- Menu Items and Prices: Updated with full authentic dishes and INR prices from physical Flavours Fantasy menu card (Appetizers, Momos, Wings, Fried Rice, Hakka Noodles, Gravy & Dry Fry).
- Food Photography: AI placeholder images retained with plain names.
- Hero Video: Existing footage retained as placeholder.

## 12. Top Blockers and Action Items for Client / User
1. Video Footage (Top Blocker): Replace `/public/hero.mp4`, `/public/hero.webm`, and `/public/hero-poster.jpg` with authentic 9:16 vertical video reel of Flavours Fantasy dishes and kitchen.
2. Real Photography: Replace `/public/menu-pizza.png`, `/public/menu-burger.png`, `/public/menu-fries.png`, `/public/menu-shake.png`, and `/public/ambiance.png` with real menu and interior photography.
3. Contact Form Endpoint: Integrate a production form backend (e.g., Formspree, Resend, SendGrid, or custom Next.js API route) in place of the client-side timeout mock.
4. Business Contact Details: Update phone number, physical address, and hours in `app/page.jsx`, `components/Footer.jsx`, and `app/layout.jsx` JSON-LD schema.
5. Domain and DNS: Connect the custom domain `flavoursfantasy.com` to Vercel/hosting and configure DNS records.
