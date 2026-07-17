import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Lazy load all page stage components to separate code bundles and prevent initial reload lags
const CtaFooter = lazy(() => import("./components/CtaFooter"));
const About = lazy(() => import("./components/About"));
const Resume = lazy(() => import("./components/Resume"));
const Skiper52 = lazy(() => import("./components/Skiper52"));
const Skiper49 = lazy(() => import("./components/Skiper49"));

function App() {
  // Manage stages: 
  // 1 = Splash (CtaFooter)
  // 2 = About (Who I Am)
  // 3 = Resume (Education & Experience)
  // 4 = Projects (Skiper52)
  // 5 = Certificates (Skiper49)
  const [stage, setStage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedStage = sessionStorage.getItem("portfolio-stage");
      return savedStage ? parseInt(savedStage, 10) : 1;
    }
    return 1;
  });

  // Sync active stage to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("portfolio-stage", stage.toString());
  }, [stage]);

  useEffect(() => {
    // Set scroll restoration to manual and force scroll to top on every stage mount/refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [stage]);

  const handleEnter = () => {
    setStage(2);
  };

  const handleBackToSplash = () => {
    setStage(1);
  };

  const handleContinueToResume = () => {
    setStage(3);
    window.scrollTo(0, 0);
  };

  const handleBackToAbout = () => {
    setStage(2);
    window.scrollTo(0, 0);
  };

  const handleContinueToProjects = () => {
    setStage(4);
    window.scrollTo(0, 0);
  };

  const handleBackToResume = () => {
    setStage(3);
    window.scrollTo(0, 0);
  };

  const handleContinueToCertificates = () => {
    setStage(5);
    window.scrollTo(0, 0);
  };

  const handleBackToProjects = () => {
    setStage(4);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`w-full bg-[#0C0C0C] text-white transition-all duration-700 ${
        stage === 1 ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      <Suspense fallback={<div className="min-h-screen w-full bg-[#0C0C0C]" />}>
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="splash"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-screen w-full overflow-hidden"
            >
              <CtaFooter onEnter={handleEnter} />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full min-h-screen bg-[#0C0C0C]"
            >
              <About onBack={handleBackToSplash} onContinue={handleContinueToResume} />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="resume-page"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full min-h-screen bg-[#0C0C0C]"
            >
              <Resume onBack={handleBackToAbout} onContinue={handleContinueToProjects} />
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="projects-page"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full min-h-screen bg-[#0C0C0C]"
            >
              <Skiper52 onBack={handleBackToResume} onCertificate={handleContinueToCertificates} />
            </motion.div>
          )}

          {stage === 5 && (
            <motion.div
              key="certificates-page"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full min-h-screen bg-[#0C0C0C]"
            >
              <Skiper49 onBack={handleBackToProjects} />
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;
