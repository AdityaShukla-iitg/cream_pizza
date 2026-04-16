"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function SplitCascadeText({ text, className }) {
  const textRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only apply complex split tearing on Desktops
    if (window.innerWidth > 768) {
      setIsDesktop(true);
    }
  }, []);

  useEffect(() => {
    if (!isDesktop || !textRef.current) return;

    // Split text into characters
    const split = new SplitType(textRef.current, { types: 'chars, words' });
    
    // Set initial state for characters
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
