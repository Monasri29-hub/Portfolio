"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

// Inline Custom SVG Icon Components to avoid react-icons import overhead in Vite dev server
const GithubIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const EnvelopeIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
  </svg>
);

export interface SocialItem {
    letter: string;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}

interface SocialFlipButtonProps {
    items?: SocialItem[];
    className?: string;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}

const defaultItems: SocialItem[] = [
    { letter: "C", icon: <GithubIcon />, label: "Github", href: "https://github.com/Monasri29-hub" },
    { letter: "O", icon: <TwitterIcon />, label: "Twitter", href: "https://x.com" },
    { letter: "N", icon: <LinkedinIcon />, label: "LinkedIn", href: "https://linkedin.com" },
    { letter: "T", icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com" },
    { letter: "A", icon: <FacebookIcon />, label: "Facebook", href: "https://facebook.com" },
    { letter: "C", icon: <EnvelopeIcon />, label: "Email", href: "mailto:contact@example.com" },
    { letter: "T", icon: <DiscordIcon />, label: "Discord", href: "https://discord.com" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    setTooltipIndex,
    tooltipIndex,
    itemClassName,
    frontClassName,
    backClassName,
}: {
    item: SocialItem;
    index: number;
    isHovered: boolean;
    setTooltipIndex: (val: number | null) => void;
    tooltipIndex: number | null;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}) => {
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href
        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick: item.onClick };

    return (
        <Wrapper
            {...wrapperProps}
            className={cn("relative h-10 w-10 cursor-pointer", itemClassName)}
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setTooltipIndex(index)}
            onMouseLeave={() => setTooltipIndex(null)}
        >
            <AnimatePresence>
                {isHovered && tooltipIndex === index && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-55%" }}
                        animate={{ opacity: 1, y: -50, scale: 1, x: "-55%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, x: "-55%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl dark:bg-white dark:text-neutral-900"
                    >
                        {item.label}
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-neutral-900 dark:bg-white" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.08,
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front - Letter */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-100 text-lg font-bold text-neutral-800 shadow-sm dark:bg-neutral-900 dark:text-neutral-200",
                        frontClassName
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                    
                >
                    {item.letter}
                </div>

                {/* Back - Icon */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-black text-lg text-white dark:bg-white dark:text-black",
                        backClassName
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.icon}
                </div>
            </motion.div>
        </Wrapper>
    );
};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName,
}: SocialFlipButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

    return (
        <div className={cn("flex items-center justify-center gap-4 p-4", className)}>
            <div
                className="group relative flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black p-4 shadow-sm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setTooltipIndex(null);
                }}
            >
                {/* Border Lines Container - Clipped */}
                <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
                    {/* Animated Top Border Line */}
                    <motion.div
                        className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Animated Bottom Border Line */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        setTooltipIndex={setTooltipIndex}
                        tooltipIndex={tooltipIndex}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName}
                    />
                ))}
            </div>
        </div>
    );
}
export { SocialFlipButton };
