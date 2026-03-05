import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  /** CSS selector for children to stagger. Defaults to "> *" */
  childSelector?: string;
}

/**
 * StaggerReveal — Wraps children and animates them in with staggered delays.
 * Each child slides up and fades in with a cascade effect.
 */
export default function StaggerReveal({
  children,
  className = "",
  style,
  stagger = 0.08,
  delay = 0,
  y = 40,
  duration = 0.8,
  childSelector = "> *",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Use .children instead of querySelectorAll("> *") which is invalid
    const targets = childSelector === "> *"
      ? Array.from(ref.current.children)
      : Array.from(ref.current.querySelectorAll(childSelector));
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [stagger, delay, y, duration, childSelector]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
