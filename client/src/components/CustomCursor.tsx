import { useEffect, useRef, useState } from "react";

interface CursorState {
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  scale: number;
  hover: boolean;
  text: string;
  dark: boolean;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const state = useRef<CursorState>({
    x: -200, y: -200, ringX: -200, ringY: -200,
    scale: 1, hover: false, text: "", dark: false,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const pointer = { x: -200, y: -200 };
    const prev = { x: -200, y: -200 };

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      const el = e.target as HTMLElement;

      // Detect hovered element type
      const isLink = el.closest("a, button, [role='button'], [data-cursor='pointer']") !== null;
      const isImage = el.closest("[data-cursor='view']") !== null;
      const isDark = el.closest("[data-dark-section]") !== null ||
        el.closest("footer, [style*='background: var(--ink)'], [style*='background:var(--ink)']") !== null;
      const isOpen = el.closest("[data-cursor='open']") !== null;

      state.current.hover = isLink || isImage || isOpen;
      state.current.text = isImage ? "VIEW" : isOpen ? "OPEN" : "";
      state.current.dark = isDark;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      const s = state.current;
      s.x = pointer.x;
      s.y = pointer.y;

      // Smooth ring lag
      s.ringX += (pointer.x - s.ringX) * 0.13;
      s.ringY += (pointer.y - s.ringY) * 0.13;

      // Velocity for squish
      const vx = pointer.x - prev.x;
      const vy = pointer.y - prev.y;
      const speed = Math.sqrt(vx * vx + vy * vy);
      prev.x = pointer.x;
      prev.y = pointer.y;

      const dot = dotRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!dot || !ring) { rafRef.current = requestAnimationFrame(animate); return; }

      // Dot
      dot.style.left = `${s.x}px`;
      dot.style.top = `${s.y}px`;
      dot.style.background = s.dark ? "#ffffff" : "var(--ink, #111317)";

      // Ring sizing
      const targetScale = s.hover ? (s.text ? 2.8 : 2.0) : 1;
      s.scale += (targetScale - s.scale) * 0.14;

      // Squish based on velocity
      const orientAngle = Math.atan2(vy, vx) * 180 / Math.PI;
      const squish = Math.min(speed * 0.025, 0.35);
      const sx = 1 + squish;
      const sy = 1 - squish * 0.5;

      ring.style.left = `${s.ringX}px`;
      ring.style.top = `${s.ringY}px`;
      ring.style.width = `${40 * s.scale}px`;
      ring.style.height = `${40 * s.scale}px`;
      ring.style.transform = `translate(-50%,-50%) rotate(${orientAngle}deg) scale(${sx},${sy})`;
      ring.style.borderColor = s.dark ? "rgba(255,255,255,0.60)" : s.hover ? "var(--accent, #C9A84C)" : "rgba(17,19,23,0.30)";

      // Label
      if (label) {
        label.style.opacity = s.text ? "1" : "0";
        label.style.transform = `translate(-50%,-50%) scale(${s.text ? 1 : 0.6})`;
        label.textContent = s.text;
        label.style.color = "var(--accent, #C9A84C)";
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div ref={dotRef} style={{
        position: "fixed",
        width: 5, height: 5,
        borderRadius: "50%",
        background: "var(--ink, #111317)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "normal",
        transition: "background 0.3s ease",
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed",
        width: 40, height: 40,
        borderRadius: "50%",
        border: "1.5px solid rgba(17,19,23,0.30)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 99998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.3s ease",
        willChange: "transform, left, top, width, height",
      }}>
        {/* Label inside ring */}
        <div ref={labelRef} style={{
          position: "absolute",
          left: "50%", top: "50%",
          opacity: 0,
          transform: "translate(-50%,-50%) scale(0.6)",
          transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }} />
      </div>
    </>
  );
}
