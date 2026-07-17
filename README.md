# Monasri Kundeti | Cinematic Portfolio

**Live Demo**: [https://portfolio-a6sm.vercel.app/](https://portfolio-a6sm.vercel.app/)

An interactive, high-fidelity React + TypeScript + Vite portfolio showcasing fluid aesthetics, micro-animations, and advanced frontend performance optimizations.

---

## 🚀 Navigation Flow (5 Stages)

The application behaves as a seamless Single Page Application (SPA) driven by state transitions wrapped in `framer-motion`'s `<AnimatePresence>` to manage entry and exit animations.

1. **Stage 1: Cinematic Splash Screen**
   - Autoplays a background video via optimized low-latency HLS streaming.
   - Restricts scroll height (`overflow-hidden`) to lock the viewport.
   - Features a pulsing, dark violet-indigo CSS ambient glow fallback that animates instantly.
2. **Stage 2: Who I Am (About)**
   - Characters reveal progressively on scroll.
   - Top-left liquid-glass-morphic "Back" button resets stage and clears session storage.
   - Smoothly scrolls to the top on transition.
3. **Stage 3: Career (Education & Experience)**
   - Displayed inside a high-contrast white rounded overlay (`bg-[#FFFFFF]`).
   - Replicates the minimal typographic listing pattern with custom stag-reveal animations.
   - Includes a scroll-detection observer that automatically triggers a transition to projects when the user reaches the bottom.
4. **Stage 4: Explore Projects**
   - Housing the `HoverExpand` card stack gallery.
   - Centered behind a canvas-rendered `TwistingRibbon` background effect.
   - A glow-flickering `"Certification"` button redirects users to certificates after a 300ms delay.
5. **Stage 5: Certificates & Contact**
   - **Top**: Interactive Swiper coverflow certificates slider.
   - **Bottom**: Left-aligned, split contact layout featuring a glassmorphic form. Submitting the form pre-fills a mailto link directly to `monasri.kundeti@gmail.com`.
   - **Center Right**: `SocialFlipButton` with card-flipping letter-to-icon transitions.

---

## ⚡ Performance Optimizations

- **Code-Splitting**: Replaced monolithic chunking with `React.lazy()` and `<Suspense>` boundaries. Shrank the initial script payload from **`984kB`** to **`315kB`** (a 60% reduction), enabling sub-50ms render times on reload.
- **Asynchronous HLS Player**: Loaded `hls.js` dynamically on mount so that the video-streaming packages load in the background without blocking the initial text and button animations.
- **Vite Reload Fix**: Replaced heavy `react-icons` module packages with optimized inline SVGs to prevent the Vite development linter from scanning 2,200+ unused ES modules, reducing compile times to milliseconds.
- **Low-Latency Buffering**: Configured Hls.js to target a 2-second buffer threshold (`maxBufferLength: 2`) and enabled Low Latency Mode for quick video playback.

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Run Locally
Launch the local Vite development server:
```bash
npm run dev
```

### Build for Production
Verify typescript compilation and bundle assets:
```bash
npm run build
```
The output will compile to the `dist/` directory.
