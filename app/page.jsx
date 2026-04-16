"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, Loader2, Play, Pause, Volume2, VolumeX } from "lucide-react";
import MenuItemRow from "@/components/MenuItemRow";
import GalleryLightbox from "@/components/GalleryLightbox";
import MarqueeDivider from "@/components/MarqueeDivider";
import SplitCascadeText from "@/components/SplitCascadeText";
import LiquidImage from "@/components/LiquidImage";
import { motion } from "framer-motion";

/* ============================================================
   ASSET REFERENCES
   All images below are AI-generated placeholders.
   Swap each constant with the path to your real photography.
   ============================================================ */
const IMG_PIZZA = "/ghost_pepper_pizza_1776346554288.png";
const IMG_BURGER = "/smash_burger_1776346707482.png";
const IMG_FRIES = "/truffle_fries_1776346579303.png";
const IMG_SHAKE = "/oreo_shake_1776346607173.png";
const IMG_AMBIANCE = "/restaurant_ambiance_1776346621196.png";

/* ============================================================
   MENU DATA — Update prices and items here
   ============================================================ */
const MENU_DATA = [
  {
    category: "Pizza",
    items: [
      { name: "Inferno Margherita", price: "249", ingredients: "San Marzano tomatoes, fresh mozzarella, ghost pepper drizzle, basil" },
      { name: "The Carnivore", price: "399", ingredients: "Pepperoni, spicy sausage, bacon jam, smoked gouda, hot honey" },
      { name: "Truffle Mushroom", price: "349", ingredients: "Wild mushrooms, truffle cream base, caramelized onions, thyme" },
    ]
  },
  {
    category: "Burger",
    items: [
      { name: "Big Hut Classic", price: "299", ingredients: "Double smash patty, secret sauce, house pickles, cheddar, brioche" },
      { name: "Crispy Firebird", price: "279", ingredients: "Buttermilk fried chicken, reaper slaw, jalapenos, spicy mayo" },
      { name: "The Beyond Faux", price: "329", ingredients: "Plant-based patty, vegan cheddar, truffle ketchup, lettuce wrap" },
    ]
  },
  {
    category: "Fries",
    items: [
      { name: "Classic Salty", price: "129", ingredients: "Hand-cut potatoes, sea salt, served with garlic aioli" },
      { name: "Loaded Cheese", price: "199", ingredients: "Liquid gold cheese sauce, bacon bits, scallions, jalapenos" },
      { name: "Truffle Parm", price: "229", ingredients: "White truffle oil, parmesan dusting, parsley" },
    ]
  },
  {
    category: "Shake",
    items: [
      { name: "Vanilla Bean", price: "179", ingredients: "Real Madagascar vanilla, whipped cream, cherry" },
      { name: "Oreo Mudslide", price: "229", ingredients: "Chocolate base, crushed Oreos, fudge, brownie chunks" },
      { name: "Strawberry Bomb", price: "199", ingredients: "Fresh strawberries, strawberry syrup, cheesecake bites" },
    ]
  }
];

const GALLERY_DATA = [
  { id: 1, src: IMG_PIZZA, height: "h-[300px]", category: "Pizza" },
  { id: 2, src: IMG_BURGER, height: "h-[500px]", category: "Burger" },
  { id: 3, src: IMG_AMBIANCE, height: "h-[350px]", category: "Ambiance" },
  { id: 4, src: IMG_SHAKE, height: "h-[450px]", category: "Shakes" },
  { id: 5, src: IMG_FRIES, height: "h-[300px]", category: "Fries" },
  { id: 6, src: IMG_BURGER, height: "h-[600px]", category: "Burger" },
];

export default function SinglePageApp() {
  // GSAP Refs
  const aboutSectionRef = useRef(null);
  const topRatedRefs = useRef([]);
  const menuHeadersRef = useRef([]);

  // Gallery State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // Contact Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const spinnerRef = useRef(null);
  const submitTextRef = useRef(null);

  // Video State
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Signature cards scroll reveal
      topRatedRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.6, 
            delay: i * 0.1, 
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      // Menu category headers pop-in
      menuHeadersRef.current.forEach((header) => {
        if (!header) return;
        gsap.fromTo(header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
            }
          }
        );
      });
      
      // Cinematic parallax on About section
      gsap.to(aboutSectionRef.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        yPercent: -15,
        opacity: 0.5,
      });

      // Gallery image depth parallax
      const galleryItems = document.querySelectorAll(".gallery-parallax-item");
      galleryItems.forEach((item, i) => {
        gsap.fromTo(item, 
          { y: i % 2 === 0 ? 50 : 100 },
          { 
            y: i % 2 === 0 ? -50 : -100, 
            ease: "none", 
            scrollTrigger: { 
              trigger: "#gallery", 
              start: "top bottom", 
              end: "bottom top", 
              scrub: true 
            } 
          }
        );
      });
      
      // Floating outline text parallax in About
      gsap.to(".about-outline-text", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    });

    return () => ctx.revert();
  }, []);

  const openLightbox = (src) => {
    setActiveImage(src);
    setLightboxOpen(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;
    setIsSubmitting(true);
    gsap.to(submitTextRef.current, { opacity: 0, duration: 0.2 });
    gsap.fromTo(spinnerRef.current, 
      { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, delay: 0.2 }
    );
    gsap.to(spinnerRef.current, { rotation: 360, repeat: -1, ease: "linear", duration: 1 });
    
    // TODO: Replace with real API endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      gsap.killTweensOf(spinnerRef.current);
      gsap.to(spinnerRef.current, { opacity: 0, duration: 0.2 });
      submitTextRef.current.innerText = "SENT SUCCESSFULLY";
      gsap.to(submitTextRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
    }, 2000);
  };

  return (
    <div className="pt-20 bg-background">
      
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 items-center justify-center z-10">        
        <div className="h-[60vh] md:h-[75vh] aspect-[9/16] relative rounded-2xl overflow-hidden border-2 border-red-600 shadow-2xl bg-black group shrink-0">
          {/* ASSET: Production hero video (final_hero converted to WebM) */}
          <video 
            ref={videoRef}
            autoPlay 
            muted={isMuted}
            loop 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          
          {/* Custom Video Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="magnetic-btn bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 rounded-full transition-colors flex items-center justify-center"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"} 
              className="magnetic-btn bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 rounded-full transition-colors flex items-center justify-center"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>

        <div className="w-full md:w-[60%] flex flex-col z-10 pl-0 md:pl-8">
          <h1 className="font-bebas text-[clamp(40px,6vw,95px)] leading-[0.85] text-black">
            <span className="block">BOLD.</span>
            <span className="block">FAST.</span>
            <span className="block text-red-600 break-all md:break-normal">UNFORGETTABLE.</span>
          </h1>
          <p className="font-inter text-zinc-500 mt-6 text-lg max-w-sm">
            Premium street food engineered for absolute flavor. Tested with fire, served with attitude.
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeDivider direction="left" />

      {/* MENU SECTION */}
      <section id="menu" className="py-24 w-full relative z-20 bg-background overflow-hidden border-b-8 border-red-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
           <h2 className="font-bebas text-6xl text-red-600">The Menu</h2>
           <p className="font-inter text-zinc-500 mt-2">What we are serving.</p>
        </div>

        {/* Featured Top Rated */}
        <div className="mb-24">
          <h3 className="font-bebas text-4xl mb-8 border-b-2 border-black inline-block">Signatures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {title: "Ghost Burger", img: IMG_BURGER},
              {title: "Inferno Pizza", img: IMG_PIZZA},
              {title: "Truffle Fries", img: IMG_FRIES},
              {title: "Oreo Shake", img: IMG_SHAKE}
            ].map((item, i) => (
              <div 
                key={i} 
                ref={(el) => (topRatedRefs.current[i] = el)}
                className="group bg-white border border-zinc-200 p-4 rounded-xl shadow-sm hover:-translate-y-2 hover:border-red-600 transition-all duration-300"
              >
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-zinc-100">
                   {/* ASSET: swap this image for real food photography */}
                   <LiquidImage src={item.img} alt={item.title} />
                </div>
                <h4 className="font-bebas text-2xl text-center">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Full Menu List */}
        <div className="space-y-24">
          {MENU_DATA.map((chunk, index) => (
            <div key={chunk.category} className="w-full">
              <h2 
                ref={el => menuHeadersRef.current[index] = el}
                className="font-bebas text-5xl text-black mb-8 border-b border-red-600 inline-block"
              >
                {chunk.category}
              </h2>
              <div className="flex flex-col">
                {chunk.items.map((item, i) => (
                  <MenuItemRow key={i} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutSectionRef} className="relative z-10 py-32 bg-black text-white px-4 sm:px-6 lg:px-8 border-y-8 border-red-600 overflow-hidden">
        {/* Background Rotating Hollow Text Effect */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] pointer-events-none z-0 overflow-hidden opacity-50 about-outline-text">
           <h2 className="font-bebas text-[25vw] leading-none whitespace-nowrap text-transparent about-stroke-text">
             CREAMERY HUT CREAMERY HUT CREAMERY HUT
           </h2>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <SplitCascadeText 
              text={`MADE WITH FIRE.<br/><span class="text-red-500">SERVED WITH ATTITUDE.</span>`}
              className="font-bebas text-[clamp(50px,8vw,100px)] leading-[0.9] text-white"
            />
            <p className="font-inter text-xl text-zinc-400 leading-relaxed mt-8">
              We started in a tiny alleyway as a rebellion against boring fast food. We build intense flavor profiles from raw ingredients. Double smashing burgers, blistering pizzas at 900 degrees, and pouring decadent shakes. Real heat, real quality, zero compromises.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative h-[50vh] min-h-[400px] rounded-2xl overflow-hidden saturate-0 hover:saturate-100 transition-all duration-700">
             {/* ASSET: swap this image for real restaurant interior photo */}
             <Image src={IMG_AMBIANCE} alt="Creamery Hut restaurant interior ambiance" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* MARQUEE REVERSED */}
      <MarqueeDivider direction="right" light={true} />

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 bg-background">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-6xl text-black uppercase">The Visuals</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_DATA.map((item) => (
            <motion.div
              layoutId={`gallery-image-${item.src}`}
              key={item.id}
              className={`gallery-parallax-item relative w-full overflow-hidden rounded-xl group cursor-pointer break-inside-avoid ${item.height} bg-zinc-200 shadow-md`}
              onClick={() => openLightbox(item.src)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* ASSET: swap this image for real food/venue photography */}
              <LiquidImage src={item.src} alt={`${item.category} image`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-red-600/70 transition-colors duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="font-bebas text-white text-3xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  ZOOM
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-bebas text-6xl mb-8">Drop A Line</h2>
            <form className="space-y-6 font-inter" onSubmit={handleContactSubmit}>
              <div className="flex flex-col">
                <label htmlFor="contact-name" className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="border-b-2 border-zinc-300 py-2 bg-transparent focus:outline-none focus:border-red-600 transition-colors text-lg"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-email" className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  className="border-b-2 border-zinc-300 py-2 bg-transparent focus:outline-none focus:border-red-600 transition-colors text-lg"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="contact-message" className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  maxLength={2000}
                  className="border-2 border-zinc-300 p-4 bg-transparent rounded-lg focus:outline-none focus:border-red-600 transition-colors text-lg resize-none"
                  placeholder="Let it out..."
                ></textarea>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`magnetic-btn relative w-full md:w-auto overflow-hidden bg-black text-white font-bebas text-2xl tracking-wider py-4 px-12 inline-flex justify-center items-center cursor-pointer select-none transition-colors border-none ${isSuccess ? 'bg-green-600' : 'hover:bg-red-600'}`}
                >
                   <span ref={submitTextRef}>SEND MESSAGE</span>
                   <div ref={spinnerRef} className="absolute inset-0 flex items-center justify-center opacity-0 z-10">
                     <Loader2 size={28} />
                   </div>
                </button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* TODO: Update with real address */}
               <div className="flex gap-4">
                 <div className="shrink-0 text-red-600 mt-1"><MapPin aria-hidden="true" /></div>
                 <div><h3 className="font-bebas text-2xl mb-1">Location</h3><p className="font-inter text-zinc-600">123 Street Food Ave.<br/>Mumbai, India</p></div>
               </div>
               <div className="flex gap-4">
                 <div className="shrink-0 text-red-600 mt-1"><Clock aria-hidden="true" /></div>
                 <div><h3 className="font-bebas text-2xl mb-1">Hours</h3><p className="font-inter text-zinc-600">11:00 AM to 11:00 PM</p></div>
               </div>
               {/* TODO: Update with real phone number */}
               <div className="flex gap-4">
                 <div className="shrink-0 text-red-600 mt-1"><Phone aria-hidden="true" /></div>
                 <div><h3 className="font-bebas text-2xl mb-1">Call</h3><p className="font-inter text-zinc-600">+91 98765 43210</p></div>
               </div>
               {/* TODO: Update with real email */}
               <div className="flex gap-4">
                 <div className="shrink-0 text-red-600 mt-1"><Mail aria-hidden="true" /></div>
                 <div><h3 className="font-bebas text-2xl mb-1">Email</h3><p className="font-inter text-zinc-600">hello@creameryhut.com</p></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryLightbox isOpen={lightboxOpen} setIsOpen={setLightboxOpen} imageSrc={activeImage} />
    </div>
  );
}
