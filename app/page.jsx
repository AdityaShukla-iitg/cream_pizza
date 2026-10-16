"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, Loader2, Play, Pause, Volume2, VolumeX, Check } from "lucide-react";
import MenuItemRow from "@/components/MenuItemRow";
import GalleryLightbox from "@/components/GalleryLightbox";
import MarqueeDivider from "@/components/MarqueeDivider";
import SplitCascadeText from "@/components/SplitCascadeText";
import LiquidImage from "@/components/LiquidImage";
import { motion } from "framer-motion";

const IMG_PIZZA = "/menu-pizza.png";
const IMG_BURGER = "/menu-burger.png";
const IMG_FRIES = "/menu-fries.png";
const IMG_SHAKE = "/menu-shake.png";
const IMG_AMBIANCE = "/ambiance.png";

const MENU_DATA = [
  {
    category: "Appetizers",
    items: [
      { name: "French Fries", price: "109", ingredients: "Classic golden fried potatoes tossed with light sea salt seasoning" },
      { name: "Peri Peri Fries", price: "119", ingredients: "Crisp golden fries dusted with fiery, zesty peri peri spice blend" },
      { name: "Korean Chilli Fries", price: "139", ingredients: "French fries tossed with sweet and spicy authentic Korean chilli glaze" },
      { name: "Cheesy Fries", price: "139", ingredients: "Freshly fried potatoes smothered in velvety molten cheddar cheese" },
      { name: "Crispy Chilli Babycorn", price: "149", ingredients: "Crunchy battered babycorn wok-tossed with chopped chillies and spring onions" },
      { name: "Crispy Chicken (8 pcs)", price: "139", ingredients: "Eight tender, golden crumb-coated chicken pieces served hot with house sauce" },
      { name: "Korean Crispy Chicken (8 pcs)", price: "149", ingredients: "Eight crisp chicken bites glazed in bold, spicy sweet gochujang sauce" },
      { name: "Bang Bang Crispy Chicken (8 pcs)", price: "149", ingredients: "Eight crunchy chicken bites drenched in our signature creamy Bang Bang sauce" },
      { name: "Crispy Chicken Loaded Cheese Fries", price: "169", ingredients: "Crisp seasoned fries topped with tender chicken bites and melted cheese" },
    ]
  },
  {
    category: "Momos (5 pcs)",
    items: [
      { name: "Chicken Momo", price: "99", ingredients: "Five delicate steamed dumplings stuffed with finely minced seasoned chicken and scallions" },
      { name: "Smoke Chicken Momo", price: "119", ingredients: "Five handcrafted dumplings infused with charcoal smoke and aromatic spiced chicken" },
      { name: "Fried Momo", price: "119", ingredients: "Five golden-fried crisp dumplings served with authentic spicy momo dip" },
    ]
  },
  {
    category: "Wings (6 pcs)",
    items: [
      { name: "Korean Chicken Wings", price: "169", ingredients: "Six succulent chicken wings coated in a rich, sticky Korean barbecue glaze" },
      { name: "Cheesy Wings", price: "169", ingredients: "Six tender chicken wings coated with a luscious warm melted cheese sauce" },
      { name: "Buffalo Wings", price: "169", ingredients: "Six classic wings tossed in sharp, tangy traditional cayenne pepper buffalo sauce" },
    ]
  },
  {
    category: "Fried Rice",
    items: [
      { name: "Classic Fried Rice", price: "119 - 149", ingredients: "Wok-tossed fragrant rice with garden vegetables. Veg 119, Egg 129, Chicken 139, Smoke Chicken 149" },
      { name: "Spicy Fried Rice", price: "129 - 159", ingredients: "Wok-fried rice with crushed red chillies and scallions. Veg 129, Egg 139, Chicken 149, Smoke Chicken 159" },
      { name: "Burnt Garlic Fried Rice", price: "129 - 159", ingredients: "Signature rice infused with golden toasted garlic chips. Veg 129, Egg 139, Chicken 149, Smoke Chicken 159" },
      { name: "Special Fried Rice", price: "159", ingredients: "Chef special combination rice tossed with assorted fresh proteins and house aromatics" },
    ]
  },
  {
    category: "Hakka Noodles",
    items: [
      { name: "Classic Hakka Noodles", price: "119 - 149", ingredients: "Street-style wok-seared noodles with crisp julienned vegetables. Veg 119, Egg 129, Chicken 139, Smoke Chicken 149" },
      { name: "Spicy Hakka Noodles", price: "129 - 159", ingredients: "Tossed in spicy Szechuan chilli paste with peppers. Veg 129, Egg 139, Chicken 149, Smoke Chicken 159" },
      { name: "Burnt Garlic Hakka Noodles", price: "129 - 159", ingredients: "Noodles tossed with slow-roasted caramelized garlic. Veg 129, Egg 139, Chicken 149, Smoke Chicken 159" },
      { name: "Special Hakka Noodles", price: "159", ingredients: "Signature house noodles loaded with chef special selection of meats and vegetables" },
    ]
  },
  {
    category: "Gravy & Dry Fry",
    items: [
      { name: "Veg Manchurian", price: "149 / 189", ingredients: "Handmade vegetable balls in seasoned garlic soya gravy. Half (5 pcs) 149, Full (8 pcs) 189" },
      { name: "Chilli Chicken", price: "159 / 199", ingredients: "Tender chicken with capsicum and green chillies in dark soy glaze. Half (5 pcs) 159, Full (8 pcs) 199" },
      { name: "Chicken in Oyster Sauce", price: "159 / 199", ingredients: "Juicy chicken wok-seared in rich savory oyster gravy. Half (5 pcs) 159, Full (8 pcs) 199" },
      { name: "Manchurian Chicken", price: "159 / 199", ingredients: "Indo-Chinese spiced chicken dumplings in aromatic soya gravy. Half (5 pcs) 159, Full (8 pcs) 199" },
      { name: "Butter Garlic Chicken", price: "159 / 199", ingredients: "Succulent chicken sautéed with fresh butter, crushed black pepper, and charred garlic. Half 159, Full 199" },
    ]
  }
];

const GALLERY_DATA = [
  { id: 1, src: IMG_PIZZA, height: "h-[300px]", category: "Rice & Noodles" },
  { id: 2, src: IMG_BURGER, height: "h-[480px]", category: "Crispy Chicken" },
  { id: 3, src: IMG_AMBIANCE, height: "h-[360px]", category: "Ambiance" },
  { id: 4, src: IMG_SHAKE, height: "h-[440px]", category: "Gravy Specials" },
  { id: 5, src: IMG_FRIES, height: "h-[320px]", category: "Appetizers" },
  { id: 6, src: IMG_BURGER, height: "h-[540px]", category: "Wings" },
];

export default function SinglePageApp() {
  const aboutSectionRef = useRef(null);
  const topRatedRefs = useRef([]);
  const menuHeadersRef = useRef([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const spinnerRef = useRef(null);
  const submitTextRef = useRef(null);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (videoRef.current) {
      if (prefersReducedMotion) {
        videoRef.current.pause();
      }

      // Pause video when scrolled out of view
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;
            if (!entry.isIntersecting) {
              videoRef.current.pause();
            } else if (entry.isIntersecting && !prefersReducedMotion) {
              videoRef.current.play().catch(() => {});
            }
          });
        },
        { threshold: 0.2 }
      );

      videoObserver.observe(videoRef.current);
      return () => videoObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      topRatedRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el, 
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            delay: i * 0.08, 
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      menuHeadersRef.current.forEach((header) => {
        if (!header) return;
        gsap.fromTo(
          header,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
            }
          }
        );
      });
      
      gsap.to(aboutSectionRef.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        yPercent: -10,
        opacity: 0.7,
      });

      const galleryItems = document.querySelectorAll(".gallery-parallax-item");
      galleryItems.forEach((item, i) => {
        gsap.fromTo(
          item, 
          { y: i % 2 === 0 ? 30 : 60 },
          { 
            y: i % 2 === 0 ? -30 : -60, 
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
      
      gsap.to(".about-outline-text", {
        xPercent: -40,
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
    
    // Simulate API submission; real endpoint required before production launch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="pt-20 bg-ff-black text-ff-white">
      
      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-[92vh] flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-12 items-center justify-between z-10 overflow-hidden"
      >
        {/* Background Monogram Move */}
        <div 
          aria-hidden="true" 
          className="absolute -left-12 md:left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 opacity-80"
        >
          <span className="font-display font-black text-[clamp(200px,36vw,540px)] text-ff-red leading-none tracking-tight block">
            FF
          </span>
        </div>

        {/* Hero Video in Sharp Frame */}
        <div className="h-[55vh] sm:h-[65vh] lg:h-[75vh] aspect-[9/16] relative overflow-hidden border border-ff-red bg-ff-black shrink-0 z-10">
          <video 
            ref={videoRef}
            autoPlay 
            muted={isMuted}
            loop 
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          
          {/* Video Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="magnetic-btn bg-ff-black/70 hover:bg-ff-black text-ff-white p-3 rounded-full border border-ff-surface transition-colors flex items-center justify-center cursor-pointer"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"} 
              className="magnetic-btn bg-ff-black/70 hover:bg-ff-black text-ff-white p-3 rounded-full border border-ff-surface transition-colors flex items-center justify-center cursor-pointer"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="w-full lg:w-[58%] flex flex-col z-10 pl-0 lg:pl-6">
          <div className="wordmark text-xs text-ff-red tracking-[0.22em] mb-4">
            Culinary Experience
          </div>
          <h1 className="font-display text-[clamp(44px,6.5vw,90px)] font-bold leading-[1.05] text-ff-white">
            Distinctive flavours, refined for the modern palate.
          </h1>
          <p className="font-body text-ff-grey-on-black mt-6 text-lg sm:text-xl max-w-xl leading-relaxed">
            Experience signature recipes, carefully sourced ingredients, and an elevated culinary atmosphere designed for memorable evenings.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <button 
              onClick={() => {
                const el = document.getElementById("menu");
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
              }}
              className="bg-ff-red hover:bg-ff-red-deep text-ff-black hover:text-ff-white wordmark text-xs py-3.5 px-8 transition-colors cursor-pointer"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById("about");
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
              }}
              className="border border-ff-white hover:border-ff-red text-ff-white hover:text-ff-red wordmark text-xs py-3.5 px-8 transition-colors cursor-pointer"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeDivider direction="left" />

      {/* MENU SECTION */}
      <section id="menu" className="py-24 w-full relative z-20 bg-ff-white text-ff-black overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ff-black">
              The Menu
            </h2>
            <p className="font-body text-ff-grey-on-white mt-3 text-base">
              Carefully composed dishes prepared with fresh, premium ingredients.
            </p>
          </div>

          {/* Featured Signatures */}
          <div className="mb-20">
            <div className="mb-8">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ff-black pb-2 border-b-2 border-ff-red inline-block">
                Signatures
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Loaded Cheese Fries", img: IMG_FRIES },
                { title: "Korean Wings", img: IMG_BURGER },
                { title: "Special Fried Rice", img: IMG_PIZZA },
                { title: "Chilli Chicken", img: IMG_SHAKE }
              ].map((item, i) => (
                <div 
                  key={i} 
                  ref={(el) => (topRatedRefs.current[i] = el)}
                  className="group bg-ff-white border border-ff-black p-4 hover:border-ff-red transition-colors duration-300"
                >
                  <div className="aspect-square relative mb-4 overflow-hidden bg-ff-surface">
                    <LiquidImage src={item.img} alt={item.title} />
                  </div>
                  <h4 className="font-display text-xl text-center text-ff-black font-semibold">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Full Menu Taxonomy */}
          <div className="space-y-16">
            {MENU_DATA.map((chunk, index) => (
              <div key={chunk.category} className="w-full">
                <div className="mb-6">
                  <h3 
                    ref={el => menuHeadersRef.current[index] = el}
                    className="font-display text-3xl sm:text-4xl font-bold text-ff-black pb-2 border-b-2 border-ff-red inline-block"
                  >
                    {chunk.category}
                  </h3>
                </div>
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
      <section 
        id="about" 
        ref={aboutSectionRef} 
        className="relative z-10 py-32 bg-ff-black text-ff-white px-4 sm:px-6 lg:px-8 border-y border-ff-surface overflow-hidden"
      >
        {/* Background Outline Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[240%] pointer-events-none z-0 overflow-hidden opacity-25 about-outline-text select-none">
          <div className="font-display font-black text-[14vw] leading-none whitespace-nowrap text-transparent about-stroke-text">
            FLAVOURS FANTASY FLAVOURS FANTASY FLAVOURS FANTASY
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative w-48 sm:w-56 h-16 sm:h-20 mb-6">
              <Image 
                src="/brand/flavours-fantasy-logo.png" 
                alt="Flavours Fantasy logo" 
                width={224} 
                height={75} 
                className="object-contain object-left"
              />
            </div>
            <div className="wordmark text-xs text-ff-red tracking-[0.22em] mb-4">
              Our Story
            </div>
            <SplitCascadeText 
              text="Culinary art meets uncompromising craft."
              className="font-display text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] text-ff-white"
            />
            <p className="font-body text-lg text-ff-grey-on-black leading-relaxed mt-6">
              Flavours Fantasy was founded with a clear intention: to deliver an uncompromised standard of culinary excellence. Every recipe is crafted with high-grade ingredients, refined balance, and disciplined preparation.
            </p>
            <p className="font-body text-base text-ff-grey-on-black leading-relaxed mt-4">
              From our blistering stone-fired crusts to our hand-smashed patties and velvety shakes, we hold each dish to an exacting standard. Good food needs no exaggeration, only care.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative h-[50vh] min-h-[380px] border border-ff-surface overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <Image 
              src={IMG_AMBIANCE} 
              alt="Flavours Fantasy dining room ambiance" 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </div>
        </div>
      </section>


      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 bg-ff-black text-ff-white">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ff-white">
            The Gallery
          </h2>
          <p className="font-body text-ff-grey-on-black mt-3 text-base">
            Moments captured from our kitchen and dining tables.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_DATA.map((item) => (
            <motion.div
              layoutId={`gallery-image-${item.src}`}
              key={item.id}
              className={`gallery-parallax-item relative w-full overflow-hidden border border-ff-surface group cursor-pointer break-inside-avoid ${item.height} bg-ff-surface`}
              onClick={() => openLightbox(item.src)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <LiquidImage src={item.src} alt={`${item.category} presentation`} />
              <div className="absolute inset-0 bg-ff-red/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="font-display font-bold text-ff-white text-2xl tracking-wide">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-ff-black text-ff-white border-t border-ff-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-ff-white">
              Get in Touch
            </h2>
            <p className="font-body text-ff-grey-on-black mb-8 text-base">
              Send us a message for table inquiries, private events, or questions.
            </p>
            <form className="space-y-6 font-body" onSubmit={handleContactSubmit}>
              <div className="flex flex-col">
                <label htmlFor="contact-name" className="text-sm font-medium text-ff-grey-on-black mb-1">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="border-b border-ff-white py-2.5 bg-transparent focus:outline-none focus:border-ff-red transition-colors text-base text-ff-white"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-email" className="text-sm font-medium text-ff-grey-on-black mb-1">
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  className="border-b border-ff-white py-2.5 bg-transparent focus:outline-none focus:border-ff-red transition-colors text-base text-ff-white"
                  placeholder="name@example.com"
                />
              </div>
              <div className="flex flex-col pt-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-ff-grey-on-black mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  maxLength={2000}
                  className="border border-ff-surface p-3.5 bg-transparent focus:outline-none focus:border-ff-red transition-colors text-base text-ff-white resize-none"
                  placeholder="Write your note or inquiry here"
                />
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`magnetic-btn relative w-full sm:w-auto overflow-hidden wordmark text-xs py-4 px-10 inline-flex justify-center items-center cursor-pointer transition-colors ${
                    isSuccess 
                      ? 'bg-ff-white text-ff-black cursor-default' 
                      : 'bg-ff-red hover:bg-ff-red-deep text-ff-black hover:text-ff-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending</span>
                    </span>
                  ) : isSuccess ? (
                    <span className="inline-flex items-center gap-2">
                      <Check size={18} />
                      <span>Message Sent</span>
                    </span>
                  ) : (
                    <span ref={submitTextRef}>Send Message</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Restaurant Information */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="shrink-0 text-ff-red mt-1">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1 text-ff-white">Location</h3>
                  <p className="font-body text-ff-grey-on-black text-sm leading-relaxed">
                    Marine Promenade<br />
                    Mumbai, Maharashtra
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 text-ff-red mt-1">
                  <Clock size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1 text-ff-white">Hours</h3>
                  <p className="font-body text-ff-grey-on-black text-sm leading-relaxed">
                    Monday to Sunday<br />
                    11:00 AM to 11:00 PM
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 text-ff-red mt-1">
                  <Phone size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1 text-ff-white">Phone</h3>
                  <p className="font-body text-ff-grey-on-black text-sm leading-relaxed">
                    +91 00000 00000<br />
                    <span className="text-xs text-ff-grey-on-black/70">(Direct Reservations)</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 text-ff-red mt-1">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1 text-ff-white">Email</h3>
                  <p className="font-body text-ff-grey-on-black text-sm leading-relaxed">
                    contact@flavoursfantasy.com<br />
                    <span className="text-xs text-ff-grey-on-black/70">(Inquiries & Events)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryLightbox isOpen={lightboxOpen} setIsOpen={setLightboxOpen} imageSrc={activeImage} />
    </div>
  );
}
