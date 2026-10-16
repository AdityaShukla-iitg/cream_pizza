"use client";

import Marquee from "react-fast-marquee";

export default function MarqueeDivider({ direction = "left", light = false }) {
  const items = [
    "Crispy Chicken",
    "Steamed Momos",
    "Loaded Cheese Fries",
    "Spicy Hakka Noodles",
    "Special Fried Rice",
    "Korean Wings",
    "Butter Garlic Chicken"
  ];

  return (
    <div className={`py-4 overflow-hidden border-y border-ff-black ${light ? "bg-ff-surface text-ff-white" : "bg-ff-red text-ff-black"}`}>
      <Marquee speed={50} direction={direction} gradient={false}>
        <div className="flex items-center wordmark text-xs sm:text-sm">
          {items.concat(items).concat(items).map((item, idx) => (
            <span key={idx} className="inline-flex items-center mx-6">
              <span>{item}</span>
              <span className="font-display font-bold text-xs mx-6 opacity-70">FF</span>
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
