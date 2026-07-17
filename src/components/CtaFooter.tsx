import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface CtaFooterProps {
  onEnter: () => void;
}

const CtaFooter = ({ onEnter }: CtaFooterProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
    let hlsInstance: any = null;

    const playVideo = () => {
      video.play().catch((err) => {
        console.warn("Autoplay was prevented by browser:", err);
      });
    };

    // Dynamically load hls.js to keep initial bundle size minimal
    import("hls.js").then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        hlsInstance = new Hls({
          maxBufferLength: 2,
          maxMaxBufferLength: 5,
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsInstance.loadSource(src);
        hlsInstance.attachMedia(video);
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, playVideo);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", playVideo);
      }
    });

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      video.removeEventListener("loadedmetadata", playVideo);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-black flex flex-col justify-between py-12 md:py-16">
      {/* Background Animated Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/25 blur-[120px] animate-[pulse_8s_infinite]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-violet-900/20 blur-[120px] animate-[pulse_8s_infinite] [animation-delay:4s]" />
      </div>

      {/* Background HLS Video with Native Poster Placeholder */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="https://image.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q/thumbnail.webp?time=0"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Invisible spacer to balance flex alignment */}
      <div className="h-4 w-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 my-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.85] max-w-3xl mx-auto mb-4">
          Between human intuition and machine intelligence.
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-8">
          I build systems that learn, create, and reason.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onEnter();
            }}
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all font-body cursor-pointer"
          >
            Enter Portfolio
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors font-body">
            Resume
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <p className="text-white/40 font-body font-light text-xs">
          © 2026 Monasri Kundeti. Designed & Developed with ❤️
        </p>
        <div className="flex items-center gap-6">
          <span className="text-white/40 font-body font-light text-xs">
            Monasri Kundeti · Hyderabad · 2026
          </span>
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
