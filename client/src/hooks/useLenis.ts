import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Don't destroy on unmount since it's a singleton
    };
  }, []);

  return lenisInstance;
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: false });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
