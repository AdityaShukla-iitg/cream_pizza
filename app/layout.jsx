import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWipe from "@/components/PageWipe";

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "Creamery Hut",
  description: "Bold, fast, unforgettable street food.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-black selection:bg-red-600 selection:text-white cursor-none">
        <ScrollProvider>
          <PageWipe />
          <Cursor />
          <div className="noise-overlay" aria-hidden="true" />
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
