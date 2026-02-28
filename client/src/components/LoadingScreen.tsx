import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function shouldShowLoading(): boolean {
  try {
    if (sessionStorage.getItem("wesee-loaded")) return false;
    return true;
  } catch {
    return false;
  }
}

export default function LoadingScreen() {
  const [shouldShow] = useState(() => shouldShowLoading());
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(!shouldShow);
  const [isVisible, setIsVisible] = useState(shouldShow);

  useEffect(() => {
    if (!shouldShow) return;

    try {
      sessionStorage.setItem("wesee-loaded", "1");
    } catch {}

    const duration = 1600;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (current >= steps) {
        clearInterval(timer);
        setCount(100);
        setTimeout(() => setIsComplete(true), 200);
        setTimeout(() => setIsVisible(false), 700);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [shouldShow]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isComplete ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-6xl md:text-8xl font-medium text-[#1a1a1a] tabular-nums block"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {count}
            </motion.span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              className="h-[2px] bg-[#2563EB] mt-6 mx-auto"
              style={{ maxWidth: "120px" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
