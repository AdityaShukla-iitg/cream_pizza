"use client";

import { Camera } from "lucide-react";

export default function Footer() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-16 font-inter border-t border-zinc-900 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <h2 className="font-bebas text-4xl mb-4 tracking-wider">Creamery Hut</h2>
            <p className="text-zinc-400 text-sm">Made with fire. Served with attitude.</p>
          </div>

          {/* Navigation - Fixed: uses anchor scroll instead of dead routes */}
          <div>
            <h3 className="font-bebas text-2xl mb-4 text-zinc-300">Explore</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => scrollTo("menu")} className="hover:text-white transition-colors">Menu</button></li>
              <li><button onClick={() => scrollTo("about")} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => scrollTo("gallery")} className="hover:text-white transition-colors">Gallery</button></li>
              <li><button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h3 className="font-bebas text-2xl mb-4 text-zinc-300">Visit Us</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Open Daily: 11 AM - 11 PM</li>
              <li className="pt-2">123 Street Food Ave.</li>
              <li>Mumbai, India</li>
            </ul>
          </div>

          {/* Instagram Mock Feed */}
          <div>
            <h3 className="font-bebas text-2xl mb-4 text-zinc-300">Social</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                  <Camera size={16} className="text-zinc-500" />
                </div>
              ))}
            </div>
            {/* TODO: Connect Instagram API for live feed */}
            <p className="text-xs text-zinc-500 italic">Connect Instagram API for live feed</p>
          </div>
        </div>

        {/* Newsletter & Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email for newsletter</label>
            <input 
              id="footer-email"
              type="email" 
              placeholder="YOUR EMAIL" 
              required
              maxLength={254}
              autoComplete="email"
              className="bg-transparent border border-zinc-700 px-4 py-2 text-sm focus:outline-none focus:border-red-600 w-full md:w-64"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bebas px-6 py-2 tracking-wider transition-colors">
              JOIN
            </button>
          </form>

          <p className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} Creamery Hut. Built with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
