import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor follower inspired by Antigravity Google.
 * - Small dot follows mouse with smooth lerp
 * - Grows on interactive elements (links, buttons)
 * - Blends with background using mix-blend-mode
 * - Hidden on mobile / touch devices
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    // Detect touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    // Detect interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[role='button']") ||
        el.closest("[data-cursor='grow']") ||
        el.classList.contains("cta-link") ||
        el.classList.contains("img-hover-zoom");
      setIsHovering(!!interactive);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // Animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      // Ring follows slower
      if (ringRef.current) {
        const rx = lerp(parseFloat(ringRef.current.dataset.x || "0"), target.current.x, 0.08);
        const ry = lerp(parseFloat(ringRef.current.dataset.y || "0"), target.current.y, 0.08);
        ringRef.current.dataset.x = String(rx);
        ringRef.current.dataset.y = String(ry);
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? 48 : 8,
          height: isHovering ? 48 : 8,
          marginLeft: isHovering ? -24 : -4,
          marginTop: isHovering ? -24 : -4,
          background: isHovering ? "rgba(26, 26, 26, 0.08)" : "#1A1A1A",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), margin 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s ease",
          opacity: isHidden ? 0 : 1,
          willChange: "transform",
          mixBlendMode: isHovering ? "normal" : "difference",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        data-x="0"
        data-y="0"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          marginLeft: isHovering ? -32 : -16,
          marginTop: isHovering ? -32 : -16,
          border: `1px solid ${isHovering ? "rgba(26, 26, 26, 0.15)" : "rgba(26, 26, 26, 0.2)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9997,
          transition: "width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), margin 0.45s cubic-bezier(0.22, 1, 0.36, 1), border 0.3s ease",
          opacity: isHidden ? 0 : 0.6,
          willChange: "transform",
        }}
      />
    </>
  );
}
