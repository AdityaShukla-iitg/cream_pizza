"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      const trails = trailRefs.current;

      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      trails.forEach((trail) => {
        gsap.set(trail, { xPercent: -50, yPercent: -50 });
      });

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

      const trailXTo = trails.map((trail, index) =>
        gsap.quickTo(trail, "x", { duration: 0.15 + index * 0.05, ease: "power3" })
      );
      const trailYTo = trails.map((trail, index) =>
        gsap.quickTo(trail, "y", { duration: 0.15 + index * 0.05, ease: "power3" })
      );

      const onMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
        trailXTo.forEach((fn) => fn(e.clientX));
        trailYTo.forEach((fn) => fn(e.clientY));

        // Magnetic Buttons Logic
        const magneticBtns = document.querySelectorAll(".magnetic-btn");
        magneticBtns.forEach((btn) => {
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dist = Math.sqrt(Math.pow(e.clientX - btnX, 2) + Math.pow(e.clientY - btnY, 2));

          if (dist < 80) {
            const magnetX = (e.clientX - btnX) * 0.4;
            const magnetY = (e.clientY - btnY) * 0.4;
            gsap.to(btn, { x: magnetX, y: magnetY, duration: 0.3, ease: "power2.out" });
          } else {
            gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
          }
        });
      };

      const handleImageHoverState = () => {
        gsap.to(cursor, { scale: 5, backgroundColor: "transparent", border: "1px solid red", duration: 0.3 });
      };
      
      const handleImageLeaveState = () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "rgb(220 38 38)", border: "none", duration: 0.3 });
      };

      window.addEventListener("mousemove", onMouseMove);
      
      // Select all images or items that need DRAG state
      const dragItems = document.querySelectorAll("img, video");
      dragItems.forEach((item) => {
          item.addEventListener("mouseenter", handleImageHoverState);
          item.addEventListener("mouseleave", handleImageLeaveState);
      });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        dragItems.forEach((item) => {
            item.removeEventListener("mouseenter", handleImageHoverState);
            item.removeEventListener("mouseleave", handleImageLeaveState);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-red-600 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transformOrigin: "center center" }}
      />
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-3 h-3 bg-red-600 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            opacity: 1 - i * 0.15,
            transformOrigin: "center center",
          }}
        />
      ))}
    </>
  );
}
