"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageWipe() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initial page load animation (similar to previous template)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      gsap.set(overlayRef.current, { yPercent: 0 });

      tl.to(textRef.current, { opacity: 0, duration: 0.3, delay: 0.2 })
        .to(overlayRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
    });

    // Global wipe trigger for fake "page transitions" on the single page
    window.triggerPageWipe = (scrollToId) => {
      const tl = gsap.timeline();
      // Bring overlay down
      tl.set(overlayRef.current, { yPercent: 100 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.6, ease: "power4.inOut" })
        .call(() => {
           // Instantly jump to section while screen is covered
           const element = document.getElementById(scrollToId);
           if (element) {
             window.scrollTo(0, element.offsetTop - 80);
           }
        })
        .to(overlayRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.2 });
    };

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[100] bg-red-600 flex items-center justify-center pointer-events-none translate-y-0"
    >
      <h1 ref={textRef} className="font-bebas text-white text-6xl tracking-wider uppercase">
        Creamery Hut
      </h1>
    </div>
  );
}
