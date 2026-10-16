"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

export default function SplitCascadeText({ text, className }) {
  const textRef = useRef(null);
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.innerWidth > 768,
    () => false
  );

  useEffect(() => {
    if (!isDesktop || !textRef.current) return;

    const split = new SplitType(textRef.current, { types: 'chars, words' });
    
    gsap.set(split.chars, { 
      opacity: 0,
      y: 100,
      rotateX: -90,
      transformOrigin: "bottom center"
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(split.chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
          });
        }
      });
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [isDesktop]);

  return (
    <div ref={textRef} className={className} dangerouslySetInnerHTML={{ __html: text }} />
  );
}
