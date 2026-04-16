"use client";

import Marquee from "react-fast-marquee";

export default function MarqueeDivider({ direction = "left", light = false }) {
  const content = "PIZZA · BURGER · FRIES · SHAKE · PASTA · ";
  
  return (
    <div className={`py-4 overflow-hidden border-y border-zinc-200 ${light ? "bg-white text-black" : "bg-black text-red-600"}`}>
      <Marquee speed={50} direction={direction} gradient={false}>
        <div className="font-bebas text-4xl tracking-widest mr-4">
          {content}{content}{content}{content}
        </div>
      </Marquee>
    </div>
  );
}
