import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWipe from "@/components/PageWipe";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport = {
  themeColor: "black",
};

export const metadata = {
  metadataBase: new URL("https://flavoursfantasy.com"),
  title: {
    default: "Flavours Fantasy | Culinary Excellence",
    template: "%s | Flavours Fantasy",
  },
  description: "Experience refined flavors and signature culinary creations at Flavours Fantasy. Premium ingredients and distinctive hospitality.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flavours Fantasy | Culinary Excellence",
    description: "Experience refined flavors and signature culinary creations at Flavours Fantasy.",
    url: "https://flavoursfantasy.com",
    siteName: "Flavours Fantasy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flavours Fantasy logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavours Fantasy | Culinary Excellence",
    description: "Experience refined flavors and signature culinary creations at Flavours Fantasy.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Flavours Fantasy",
  "image": "https://flavoursfantasy.com/og-image.png",
  "url": "https://flavoursfantasy.com",
  "telephone": "+91-0000000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Main Promenade",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  },
  "servesCuisine": "Modern Multi-Cuisine",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "23:00"
    }
  ],
  "menu": "https://flavoursfantasy.com/#menu"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-ff-black text-ff-white selection:bg-ff-red selection:text-ff-black cursor-none">
        <ScrollProvider>
          <PageWipe />
          <Cursor />
          <Navbar />
          <main className="min-h-screen relative z-10 w-full overflow-hidden">
            {children}
          </main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
