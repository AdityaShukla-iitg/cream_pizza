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
    <div 
      className="border-b border-ff-black/15 py-6 group cursor-pointer" 
      onClick={toggleOpen}
    >
      <div className="flex justify-between items-center transition-colors group-hover:text-ff-red-deep">
        <h3 className="font-display text-2xl md:text-3xl m-0 flex-1 text-ff-black font-bold">
          {item.name}
        </h3>
        <div ref={arrowRef} className="mx-4 text-ff-red-deep shrink-0">
          <ChevronRight size={22} strokeWidth={2.5} />
        </div>
        <div className="font-body font-semibold text-xl md:text-2xl text-ff-red-deep">
          ₹{item.price}
        </div>
      </div>
      
      <div ref={contentRef} className="overflow-hidden">
        <p className="font-body text-ff-grey-on-white pt-3 max-w-2xl text-base leading-relaxed">
          {item.ingredients}
        </p>
      </div>
    </div>
  );
}
