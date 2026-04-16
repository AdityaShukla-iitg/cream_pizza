"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";

export default function MenuItemRow({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    // Setup GSAP animation
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { height: 0, opacity: 0 });
      tl.current = gsap.timeline({ paused: true })
        .to(contentRef.current, { height: "auto", duration: 0.3, ease: "power2.out" })
        .to(contentRef.current, { opacity: 1, duration: 0.2 }, "-=0.1")
        .to(arrowRef.current, { rotation: 90, duration: 0.3, ease: "power2.inOut" }, 0);
    });
    return () => ctx.revert();
  }, []);

  const toggleOpen = () => {
    if (isOpen) {
      tl.current.reverse();
    } else {
      tl.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-zinc-200 py-6 group cursor-pointer" onClick={toggleOpen}>
      <div className="flex justify-between items-center group-hover:text-red-600 transition-colors">
        <h3 className="font-bebas text-3xl md:text-4xl m-0 flex-1">{item.name}</h3>
        <div ref={arrowRef} className="mx-4 text-red-600">
          <ChevronRight size={24} strokeWidth={3} />
        </div>
        <div className="font-inter font-semibold text-xl md:text-2xl">{item.price}</div>
      </div>
      
      <div ref={contentRef} className="overflow-hidden">
        <p className="font-inter italic text-zinc-600 pt-4 max-w-2xl text-sm md:text-base">
          {item.ingredients}
        </p>
      </div>
    </div>
  );
}
