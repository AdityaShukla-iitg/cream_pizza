"use client";

function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-ff-black text-ff-white py-16 border-t border-ff-surface z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center mb-4">
              <span className="font-display font-black text-3xl text-ff-red mr-2 leading-none">
                FF
              </span>
              <span className="wordmark text-xs text-ff-white">
                Flavours Fantasy
              </span>
            </div>
            <p className="text-ff-grey-on-black text-sm max-w-xs leading-relaxed">
              Refined culinary creations and signature dining experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="wordmark text-xs mb-4 text-ff-white tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-ff-grey-on-black">
              <li>
                <button onClick={() => scrollTo("menu")} className="hover:text-ff-white transition-colors">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("about")} className="hover:text-ff-white transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("gallery")} className="hover:text-ff-white transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("contact")} className="hover:text-ff-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h3 className="wordmark text-xs mb-4 text-ff-white tracking-widest">
              Visit Us
            </h3>
            <ul className="space-y-2 text-sm text-ff-grey-on-black">
              <li>Daily: 11:00 AM to 11:00 PM</li>
              <li className="pt-2">Marine Promenade</li>
              <li>Mumbai, Maharashtra</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="wordmark text-xs mb-4 text-ff-white tracking-widest">
              Follow Us
            </h3>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 text-sm text-ff-grey-on-black hover:text-ff-red transition-colors group"
            >
              <span className="p-2 border border-ff-surface group-hover:border-ff-red transition-colors">
                <InstagramIcon size={18} />
              </span>
              <span>@flavoursfantasy</span>
            </a>
          </div>
        </div>

        {/* Newsletter & Bottom Bar */}
        <div className="border-t border-ff-surface pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email for updates</label>
            <input 
              id="footer-email"
              type="email" 
              placeholder="Enter your email" 
              required
              maxLength={254}
              autoComplete="email"
              className="bg-transparent border border-ff-surface px-4 py-2.5 text-sm text-ff-white placeholder:text-ff-grey-on-black focus:outline-none focus:border-ff-red w-full md:w-64"
            />
            <button 
              type="submit" 
              className="bg-ff-red hover:bg-ff-red-deep text-ff-black hover:text-ff-white wordmark text-xs px-6 py-2.5 transition-colors cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>

          <p className="text-ff-grey-on-black text-xs">
            &copy; {new Date().getFullYear()} Flavours Fantasy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
