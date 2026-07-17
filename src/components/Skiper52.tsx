import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../lib/utils";
import { TwistingRibbon } from "./ui/twisting-ribbon";
import { GenerateButton } from "./ui/generate-button";

const Skiper52 = ({ onBack, onCertificate }: { onBack: () => void; onCertificate: () => void }) => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=cover",
      alt: "Abstract Fluid Art",
      code: "Project #1",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=cover",
      alt: "Geometric Spheres",
      code: "Project #2",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1618005198143-e528346d9a59?q=80&w=600&auto=format&fit=cover",
      alt: "Aesthetic Abstract Waves",
      code: "Project #3",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=cover",
      alt: "Luminous Cyber Grid",
      code: "Project #4",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=cover",
      alt: "Liquid Chrome Sphere",
      code: "Project #5",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=cover",
      alt: "Interactive Logic Matrix",
      code: "Project #6",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=cover",
      alt: "Futuristic Synthetic Interface",
      code: "Project #7",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=cover",
      alt: "Organic Flow Pattern",
      code: "Project #8",
      link: "https://github.com",
    },
    {
      src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=cover",
      alt: "Deep Neon Artifact",
      code: "Project #9",
      link: "https://github.com",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] py-20 px-5">
      {/* Background Ribbon Effect */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-25 pointer-events-none">
        <TwistingRibbon
          segments={400}
          waveSpeed={0.018}
          waveAmplitude={1}
          twistCycles={6}
        />
      </div>
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

      <div className="text-center mb-10 z-10 max-w-3xl mx-auto">
        <h2 className="hero-heading font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none mb-4">
          Explore Projects
        </h2>
        <p className="text-zinc-400 font-body text-sm font-light leading-relaxed max-w-xl mx-auto">
          Hover or click cards to expand and inspect the project details. Click on an expanded card to redirect to the project.
        </p>
      </div>

      <HoverExpand_001 className="z-10" images={images} />

      {/* Certification Button */}
      <div className="z-10 mt-16 text-center">
        <GenerateButton
          hue={210}
          onClick={() => {
            setTimeout(() => {
              onCertificate();
            }, 300);
          }}
        />
      </div>
    </div>
  );
};

interface HoverExpandProps {
  images: { src: string; alt: string; code: string; link: string }[];
  className?: string;
}

const HoverExpand_001 = ({ images, className }: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  const handleCardClick = (index: number, link: string) => {
    if (activeImage === index) {
      window.location.href = link;
    } else {
      setActiveImage(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-wrap md:flex-nowrap items-center justify-center gap-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "24rem" : "5rem",
                height: activeImage === index ? "24rem" : "24rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => handleCardClick(index, image.link)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/60 to-transparent z-10"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-start justify-end p-6 z-20"
                  >
                    <p className="text-left text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                      {image.code}
                    </p>
                    <h3 className="text-left text-lg font-bold text-white font-body leading-tight">
                      {image.alt}
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover select-none pointer-events-none"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Skiper52, HoverExpand_001 };
export default Skiper52;
