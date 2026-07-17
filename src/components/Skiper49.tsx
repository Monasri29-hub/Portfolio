"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "../lib/utils";
import { TwistingRibbon } from "./ui/twisting-ribbon";
import { SocialFlipButton } from "./ui/social-flip-button";

interface Skiper49Props {
  onBack: () => void;
}

const Skiper49 = ({ onBack }: Skiper49Props) => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1589330694653-ded6df53f7ee?q=80&w=600&auto=format&fit=cover",
      alt: "Artificial Intelligence Certificate",
    },
    {
      src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=cover",
      alt: "Deep Learning Specialization",
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=cover",
      alt: "Advanced Cloud Architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=cover",
      alt: "Human-Computer Interaction Program",
    },
    {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=cover",
      alt: "System Design Credentials",
    },
  ];

  return (
    <div className="relative w-full bg-[#0C0C0C] text-white">
      {/* Back Button (Top-left) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 z-20">
        <button
          onClick={onBack}
          className="liquid-glass-strong rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white/70 hover:text-white flex items-center gap-1.5 hover:bg-white/10 transition-all font-body cursor-pointer select-none"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Section 1: Certificates Showcase */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center py-20 px-5">
        {/* Background Ribbon Effect */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-15 pointer-events-none">
          <TwistingRibbon
            segments={400}
            waveSpeed={0.018}
            waveAmplitude={1}
            twistCycles={6}
          />
        </div>

        <div className="text-center mb-12 z-10 max-w-3xl mx-auto">
          <h2 className="hero-heading font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none mb-4">
            Certificates
          </h2>
          <p className="text-zinc-400 font-body text-sm font-light leading-relaxed max-w-xl mx-auto">
            Verified academic and professional credentials from leading specializations.
          </p>
        </div>

        <Carousel_003 className="z-10" images={images} showPagination loop />

        {/* Scroll Helper Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 hidden sm:block">
          <p className="text-zinc-500 text-xs font-body tracking-wider uppercase mb-1">
            Scroll to Contact
          </p>
          <svg
            className="h-4 w-4 text-zinc-500 mx-auto animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Section 2: Contact Area */}
      <div className="relative flex min-h-screen w-full flex-col justify-center py-20 px-6 sm:px-12 md:px-24 border-t border-white/5 bg-[#0A0A0A]/40 backdrop-blur-3xl">
        {/* Background Ribbon Effect for Section 2 */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-15 pointer-events-none">
          <TwistingRibbon
            segments={400}
            waveSpeed={0.018}
            waveAmplitude={1}
            twistCycles={6}
          />
        </div>

        <div className="max-w-5xl w-full mx-auto z-10 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 lg:gap-32">
          {/* Left Column: Heading and Form */}
          <div className="flex flex-col items-start text-left w-full max-w-[460px]">
            <span className="text-zinc-500 font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 block">
              Let's Collaborate
            </span>
            <h2 className="hero-heading font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none mb-6">
              Contact Me
            </h2>
            <p className="text-zinc-400 font-body text-sm md:text-base font-light leading-relaxed mb-8">
              Have a question, a project concept, or just want to connect? Enter your details below to send an email directly to my inbox.
            </p>
            
            {/* Contact Form */}
            <ContactForm />
          </div>

          {/* Right Column: Social Channels */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right w-full md:w-auto mt-6 md:mt-[4px]">
            <span className="text-zinc-500 font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 block md:mr-4">
              Social Coordinates
            </span>
            {/* Social Flip Button positioned on the left/right container */}
            <div className="scale-100 sm:scale-110 md:scale-125 origin-left md:origin-right transition-all">
              <SocialFlipButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    // Direct mailto link with pre-filled content
    const subject = encodeURIComponent("Portfolio Inquiry");
    const body = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:monasri.kundeti@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-zinc-500 font-body text-xs tracking-wider uppercase">
          Your Email
        </label>
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:bg-white/10 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all font-body"
        />
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-zinc-500 font-body text-xs tracking-wider uppercase">
          Your Message / Queries
        </label>
        <textarea
          required
          rows={4}
          placeholder="Tell me about your project, idea, or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:bg-white/10 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all font-body resize-none"
        />
      </div>

      <button
        type="submit"
        className="liquid-glass-strong w-full sm:w-auto px-8 py-3 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all font-body flex items-center justify-center gap-2 cursor-pointer select-none"
      >
        {submitted ? "Opening Mail Client..." : "Send Message"}
      </button>
    </form>
  );
};

interface CarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: CarouselProps) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 400px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 320px;
    height: 320px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .swiper-pagination-bullet {
    background-color: #fff !important;
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative group">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white text-sm font-body font-medium leading-snug">
                  {image.alt}
                </p>
              </div>
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Skiper49, Carousel_003 };
export default Skiper49;
