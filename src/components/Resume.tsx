import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ResumeItem {
  id: string;
  name: string;
  description: string;
}

const educationData: ResumeItem[] = [
  {
    id: "01",
    name: "B.Tech in Computer Science",
    description: "Specializing in intelligent systems and software architecture. Deep dive into algorithms, system design, and database systems.",
  },
  {
    id: "02",
    name: "AI & Deep Learning",
    description: "Advanced coursework covering transformer models, neural networks, reinforcement learning, and large language model fine-tuning.",
  },
  {
    id: "03",
    name: "Human-Computer Interaction",
    description: "Focusing on designing highly responsive digital spaces, cognitive load optimization, and interactive frontend architectures.",
  },
];

const experienceData: ResumeItem[] = [
  {
    id: "01",
    name: "AI Systems Engineer",
    description: "Building autonomous agent workflows and training neural reasoning models to bridge human intent and machine logic.",
  },
  {
    id: "02",
    name: "Frontend Developer",
    description: "Developing high-fidelity interactive portfolios, landing pages, and web apps with custom motion designs and glassmorphism.",
  },
  {
    id: "03",
    name: "UI/UX Researcher",
    description: "Researching spatial interfaces, fluid motion graphics, and optimal typography hierarchies for complex generative web apps.",
  },
];

interface ResumeProps {
  onBack: () => void;
  onContinue: () => void;
}

export const Resume: React.FC<ResumeProps> = ({ onBack, onContinue }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isTriggered) return;
      
      const threshold = 15;
      const isNearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - threshold;

      if (isNearBottom) {
        setIsTriggered(true);
        onContinue();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onContinue, isTriggered]);
  return (
    <section className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C] relative z-20 min-h-screen">
      {/* Back Button (Top-left on white background) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 z-30">
        <button
          onClick={onBack}
          className="border border-[#0C0C0C]/15 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-[#0C0C0C]/70 hover:text-[#0C0C0C] flex items-center gap-1.5 hover:bg-[#0C0C0C]/5 transition-all font-body cursor-pointer select-none"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-24 sm:gap-32">
        {/* Education Section */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-24 tracking-tight leading-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Education
          </motion.h2>

          <div className="flex flex-col border-t border-[#0C0C0C]/15">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1, 
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                className="flex items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-6 md:gap-12 group"
              >
                <span 
                  className="font-black leading-none text-[#0C0C0C]" 
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {item.id}
                </span>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between flex-grow gap-4 md:gap-8">
                  <h3 
                    className="font-medium uppercase tracking-wide whitespace-nowrap"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="font-light leading-relaxed max-w-2xl opacity-60 text-left md:text-right md:ml-auto"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-24 tracking-tight leading-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Experience
          </motion.h2>

          <div className="flex flex-col border-t border-[#0C0C0C]/15">
            {experienceData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1, 
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                className="flex items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-6 md:gap-12 group"
              >
                <span 
                  className="font-black leading-none text-[#0C0C0C]" 
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {item.id}
                </span>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between flex-grow gap-4 md:gap-8">
                  <h3 
                    className="font-medium uppercase tracking-wide whitespace-nowrap"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="font-light leading-relaxed max-w-2xl opacity-60 text-left md:text-right md:ml-auto"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll down to projects button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setIsTriggered(true);
              onContinue();
            }}
            className="border border-[#0C0C0C]/15 rounded-full px-8 py-3 text-sm font-medium text-[#0C0C0C]/70 hover:text-[#0C0C0C] inline-flex items-center gap-2 hover:bg-[#0C0C0C]/5 transition-all font-body cursor-pointer select-none"
          >
            Explore Projects
            <svg
              className="h-4 w-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;
