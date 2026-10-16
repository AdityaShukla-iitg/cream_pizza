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
    <header className="fixed top-0 w-full z-50 transition-colors duration-500 bg-ff-black border-b border-ff-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => scrollTo("hero")} 
            className="magnetic-btn flex items-center py-2 text-left"
            aria-label="Flavours Fantasy home"
          >
            <span className="font-display font-black text-3xl text-ff-red tracking-tight leading-none mr-2">
              FF
            </span>
            <span className="wordmark text-xs sm:text-sm text-ff-white">
              Flavours Fantasy
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`magnetic-btn wordmark text-xs py-1 transition-colors relative ${
                    isActive ? "text-ff-red" : "text-ff-white hover:text-ff-red"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ff-red" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="text-ff-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div 
          className="md:hidden bg-ff-black text-ff-white absolute top-20 left-0 w-full border-b border-ff-surface font-display text-2xl flex flex-col items-center py-8 space-y-6" 
          role="navigation" 
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`transition-colors ${
                activeSection === link.id ? "text-ff-red" : "text-ff-white hover:text-ff-red"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
