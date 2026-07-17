import { useRef, type CSSProperties } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import FadeIn from "./FadeIn";

interface AnimatedCharProps {
  char: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
}

const AnimatedChar = ({ char, index, totalChars, progress }: AnimatedCharProps) => {
  const charProgress = index / totalChars;
  // Calculate window start and end positions for the fade-in reveal
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder character to hold structural space */}
      <span className="invisible">{char === " " ? "\u00A0" : char}</span>
      {/* Animated absolute position visible character */}
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
};

interface AboutProps {
  onBack: () => void;
  onContinue: () => void;
}

export const About = ({ onBack, onContinue }: AboutProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const text = `If you had asked me a few years ago where I'd end up, AI probably wouldn't have been my answer.
What never changed, though, was my curiosity. It pulled me through design, medicine, philosophy, history, and eventually into Generative AI—a field where creating feels limitless.`;

  const chars = text.split("");

  const buttonStyle: CSSProperties = {
    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
    outline: "2px solid #E3E3E3",
    outlineOffset: "-3px",
  };

  return (
    <section id="about" className="relative min-h-screen w-full bg-[#0C0C0C] text-white flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      {/* Back Button (Top-left) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 z-20">
        <button
          onClick={onBack}
          className="liquid-glass-strong rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white/70 hover:text-white flex items-center gap-1.5 hover:bg-white/10 transition-all font-body cursor-pointer select-none"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Corner Floating Images (Absolute backdrop) */}
      
      {/* Top-left Moon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] h-auto z-0 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon icon"
          className="w-full h-auto"
        />
      </FadeIn>

      {/* Bottom-left 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] h-auto z-0 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D object"
          className="w-full h-auto"
        />
      </FadeIn>

      {/* Top-right Lego */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] h-auto z-0 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego icon"
          className="w-full h-auto"
        />
      </FadeIn>

      {/* Bottom-right 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] h-auto z-0 pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D group"
          className="w-full h-auto"
        />
      </FadeIn>

      {/* Interactive Center Content */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        {/* Group 1: Title and Reveal paragraph */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 w-full">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Who I Am
            </h2>
          </FadeIn>

          <p
            ref={textRef}
            className="text-[#D7E2EA] font-medium text-justify leading-relaxed max-w-[560px] mx-auto select-none"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          >
            {chars.map((char, index) => {
              if (char === "\n") {
                return <br key={index} />;
              }
              return (
                <AnimatedChar
                  key={index}
                  char={char}
                  index={index}
                  totalChars={chars.length}
                  progress={scrollYProgress}
                />
              );
            })}
          </p>
        </div>

        {/* Group 2: Action Button */}
        <FadeIn delay={0.3} y={20}>
          <button
            onClick={(e) => {
              e.preventDefault();
              onContinue();
            }}
            style={buttonStyle}
            className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-[14px] md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base transition-all duration-200 hover:opacity-90 active:opacity-75 select-none text-center"
          >
            Continue Journey &rarr;
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;
