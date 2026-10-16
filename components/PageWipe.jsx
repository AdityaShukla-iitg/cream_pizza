"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageWipe() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      gsap.set(overlayRef.current, { yPercent: 0 });

      tl.to(textRef.current, { opacity: 0, duration: 0.3, delay: 0.2 })
        .to(overlayRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
    });

    window.triggerPageWipe = (scrollToId) => {
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { yPercent: 100 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.6, ease: "power4.inOut" })
        .call(() => {
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
      className="fixed inset-0 z-[100] bg-ff-red flex items-center justify-center pointer-events-none translate-y-0"
    >
      <div ref={textRef} className="text-center text-ff-black flex flex-col items-center">
        <span className="font-display font-black text-7xl md:text-8xl leading-none">
          FF
        </span>
        <span className="wordmark text-sm md:text-base mt-3">
          Flavours Fantasy
        </span>
      </div>
    </div>
  );
}
