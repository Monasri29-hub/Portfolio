import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: string;
  children?: ReactNode;
}

export const FadeIn = ({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = "div",
  children,
}: FadeInProps) => {
  // Use motion.create to make the dynamic HTML tag animatable
  const Component = motion.create(as as any);

  const variants = {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
