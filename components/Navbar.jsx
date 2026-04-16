"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    if (window.triggerPageWipe) {
      window.triggerPageWipe(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "Menu", id: "menu" },
    { name: "About", id: "about" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-colors duration-500 bg-white shadow-sm border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => scrollTo("hero")} className="magnetic-btn font-bebas text-3xl tracking-wider text-black py-2 px-4 rounded-xl">
            Creamery Hut
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 font-inter font-medium uppercase tracking-wider text-sm" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`magnetic-btn transition-colors px-4 py-2 rounded-xl ${
                  activeSection === link.id ? "text-red-600 bg-red-50" : "text-black hover:text-red-600"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="text-black"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white text-black absolute top-20 left-0 w-full shadow-lg font-bebas text-2xl flex flex-col items-center py-8 space-y-6 border-b border-zinc-200" role="navigation" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`${activeSection === link.id ? "text-red-600" : "text-black"}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
