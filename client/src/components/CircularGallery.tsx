/*
 * CircularGallery — Redesigned 3D Ring Carousel
 * 
 * A full-screen elliptical orbit of service cards with:
 * - Clean upright cards (no tangent tilt — cards face the viewer)
 * - Warm background matching site theme
 * - True 3D perspective: front cards large/opaque, back cards small/faded
 * - Smooth scroll / drag / touch rotation with inertia
 * - Hover tooltips with service name
 * - Click to navigate to service detail
 */

import { useRef, useEffect, useCallback, useState } from "react";
import { useLocation } from "wouter";

interface RingItem {
  title: string;
  image: string;
  url: string;
  category: string;
  categoryId: number;
}

interface CategoryLabel {
  name: string;
  count: number;
  angle: number;
}

interface CircularGalleryProps {
  items: RingItem[];
  categoryLabels: CategoryLabel[];
  onSelectItem?: (item: RingItem) => void;
}

export default function CircularGallery({ items, categoryLabels, onSelectItem }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const pointerDownXRef = useRef(0);   // track start position for click detection
  const totalDragRef = useRef(0);       // cumulative drag distance
  const rafRef = useRef<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [, navigate] = useLocation();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const N = items.length;
  const ANGLE_STEP = N > 0 ? (2 * Math.PI) / N : 1;
  const DRAG_SPEED = 0.003;
  const FRICTION = 0.95;
  const MIN_VELOCITY = 0.00004;
  const AUTO_ROTATE_SPEED = 0.00025;
  const SCROLL_SPEED = 0.0010;

  const getRadii = useCallback(() => {
    const w = dimensions.w || window.innerWidth;
    const h = dimensions.h || window.innerHeight;
    // Wider ellipse for a more dramatic ring
    const rx = Math.min(w * 0.38, 460);
    const ry = Math.min(h * 0.28, 240);
    return { rx, ry, cx: w / 2, cy: h / 2 + 20 };
  }, [dimensions]);

  const getThumbSize = useCallback(() => {
    const w = dimensions.w || window.innerWidth;
    if (w < 640) return { tw: 80, th: 108 };
    if (w < 1024) return { tw: 110, th: 148 };
    return { tw: 140, th: 190 };
  }, [dimensions]);

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const updatePositions = useCallback(() => {
    if (N === 0) return;
    const { rx, ry, cx, cy } = getRadii();
    const { tw, th } = getThumbSize();
    const rot = rotationRef.current;

    for (let i = 0; i < N; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const angle = rot + i * ANGLE_STEP;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);

      // Depth: bottom=front, top=back. sinA in [-1,1] -> depth in [0,1]
      const sinA = Math.sin(angle);
      const depth = (sinA + 1) / 2; // 0 = top-back, 1 = bottom-front

      // Scale: back items visually smaller
      const scale = 0.35 + depth * 0.70;
      // Opacity: back items faded out
      const opacity = depth < 0.2 ? 0.08 + depth * 0.6 : 0.18 + depth * 0.82;
      const zIndex = Math.round(depth * 1000);
      // Subtle blur for back items
      const blur = depth < 0.3 ? (0.3 - depth) * 5 : 0;

      const isHovered = hoveredIndex === i;
      const finalScale = isHovered ? Math.min(scale * 1.18, 1.1) : scale;
      const finalOpacity = isHovered ? 1 : Math.min(opacity, 1);

      // NO tangent rotation — cards stay upright, facing the viewer
      el.style.transform = `translate3d(${x - (tw * finalScale) / 2}px, ${y - (th * finalScale) / 2}px, 0) scale(${finalScale})`;
      el.style.opacity = String(finalOpacity);
      el.style.zIndex = isHovered ? "2000" : String(zIndex);
      el.style.filter = blur > 0.1 && !isHovered ? `blur(${blur.toFixed(1)}px)` : "none";
    }

    // Category labels — orbit outside the ring
    for (let i = 0; i < categoryLabels.length; i++) {
      const el = labelRefs.current[i];
      if (!el) continue;

      const angle = rot + categoryLabels[i].angle;
      // Slightly outside the image ring
      const baseMultiplier = 1.28;
      const extraOffset = 60; // distance (px) further away from the photo circle

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Radius of label orbit: ring radius + extraOffset
      const labelRx = rx * baseMultiplier + extraOffset;
      const labelRy = ry * baseMultiplier + extraOffset;

      const lx = cx + labelRx * cosA;
      const ly = cy + labelRy * sinA;

      const depth = (Math.sin(angle) + 1) / 2;
      const labelOpacity = 0.12 + depth * 0.68;

      el.style.transform = `translate3d(${lx}px, ${ly}px, 0) translate(-50%, -50%)`;
      el.style.opacity = String(labelOpacity);
      el.style.zIndex = String(Math.round(depth * 1000) + 1);
    }
  }, [N, ANGLE_STEP, getRadii, getThumbSize, hoveredIndex, categoryLabels]);

  // Animation loop
  useEffect(() => {
    let isActive = true;

    const tick = () => {
      if (!isActive) return;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= FRICTION;
        } else {
          velocityRef.current = 0;
          rotationRef.current += AUTO_ROTATE_SPEED;
        }
      }

      updatePositions();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      isActive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [updatePositions]);

  // Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      velocityRef.current += delta * SCROLL_SPEED;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag / touch handlers — NO setPointerCapture so child clicks work reliably
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // left button only
      isDraggingRef.current = true;
      lastPointerXRef.current = e.clientX;
      pointerDownXRef.current = e.clientX;
      totalDragRef.current = 0;
      velocityRef.current = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerXRef.current;
      lastPointerXRef.current = e.clientX;
      totalDragRef.current += Math.abs(dx);
      rotationRef.current += dx * DRAG_SPEED;
      velocityRef.current = dx * DRAG_SPEED * 0.5;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      // If barely moved → treat as a tap: find which card was tapped and navigate
      if (totalDragRef.current < 8) {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const card = el?.closest('[data-ring-url]') as HTMLElement | null;
        if (card) {
          const url = card.getAttribute('data-ring-url');
          if (url) {
            // small delay so the animation doesn't stutter
            setTimeout(() => navigate(url), 10);
          }
        }
      }
    };

    // Use document-level listeners so drag works even when mouse leaves container
    container.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", (e: PointerEvent) => { isDraggingRef.current = false; });

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [navigate]);

  // Click handled via pointerup data-ring-url detection above.
  // This onClick is a fallback for keyboard / accessibility.
  const handleItemClick = (item: RingItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalDragRef.current > 8) return;
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      navigate(item.url);
    }
  };

  const { tw, th } = getThumbSize();

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        background: "var(--paper)",
      }}
    >
      {/* Subtle ellipse guide — visual anchor for the ring */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -40%)`,
        width: "76%",
        paddingBottom: "44%",
        borderRadius: "50%",
        border: "1px solid rgba(17,19,23,0.06)",
        pointerEvents: "none",
        zIndex: 1,
      }} />


      {/* Center label */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 5,
        textAlign: "center",
        pointerEvents: "none",
      }}>
        <h1 style={{
          fontSize: "clamp(30px, 4.5vw, 60px)",
          fontWeight: 450,
          color: "var(--ink)",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          margin: 0,
        }}>
          We are{" "}
          <em style={{
            fontStyle: "italic",
            fontWeight: 300,
            background: "linear-gradient(135deg, #B8922E 0%, #C9A84C 48%, #E8C870 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            WeSee.
          </em>
        </h1>
        <p style={{
          fontSize: 12,
          color: "rgba(17,19,23,0.36)",
          marginTop: 8,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          {items.length} services available
        </p>
      </div>

      {/* Ring items — clean upright cards */}
      {items.map((item, i) => (
        <div
          key={`ring-${i}`}
          ref={(el) => { itemRefs.current[i] = el; }}
          data-ring-url={item.url}
          onClick={(e) => handleItemClick(item, e)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: tw,
            height: th,
            willChange: "transform",
            cursor: "pointer",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: hoveredIndex === i
              ? "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)"
              : "0 4px 16px rgba(0,0,0,0.10)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            draggable={false}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
              transform: hoveredIndex === i ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          {/* Gradient overlay at the bottom of each card */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
          {/* Always-visible title at the bottom */}
          <div style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            pointerEvents: "none",
          }}>
            <div style={{
              fontSize: 10,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}>
              {item.category.split("&")[0].trim()}
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}>
              {item.title}
            </div>
          </div>
        </div>
      ))}

      {/* Category labels orbiting outside */}
      {categoryLabels.map((label, i) => (
        <div
          key={`label-${i}`}
          ref={(el) => { labelRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{
            fontSize: 10,
            fontWeight: 500,
            color: "rgba(17,19,23,0.45)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "inline-block",
            background: "rgba(248,248,246,0.7)",
            backdropFilter: "blur(4px)",
            padding: "3px 8px",
            borderRadius: 20,
            border: "1px solid rgba(17,19,23,0.08)",
          }}>
            {label.name} ({label.count})
          </span>
        </div>
      ))}

      {/* Bottom hint */}
      <div style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 600,
        textAlign: "center",
        pointerEvents: "none",
      }}>
        <span style={{ fontSize: 10, fontWeight: 400, color: "rgba(17,19,23,0.28)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          scroll or drag to explore · click to open
        </span>
      </div>
    </div>
  );
}
