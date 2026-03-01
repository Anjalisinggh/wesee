/*
 * CircularGallery — CLOU-style radial carousel
 * Design: Swiss Precision / CLOU Architects projects page
 * 
 * Full-screen elliptical ring of service thumbnails with:
 * - 3D depth perspective (front large, back small + faded)
 * - Scroll / drag / touch rotation with inertia
 * - Category labels orbiting outside the ring
 * - Center text "We are WeSee."
 * - GPU-accelerated transforms only
 */

import { useRef, useEffect, useCallback, useState } from "react";
import { useLocation, Link } from "wouter";

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
  const dragStartXRef = useRef(0);
  const rafRef = useRef<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [, navigate] = useLocation();
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const N = items.length;
  const ANGLE_STEP = (2 * Math.PI) / N;
  const ROTATION_SPEED = 0.0015;
  const DRAG_SPEED = 0.004;
  const FRICTION = 0.96;
  const MIN_VELOCITY = 0.00003;
  const AUTO_ROTATE_SPEED = 0.0002;

  const getRadii = useCallback(() => {
    const w = dimensions.w || window.innerWidth;
    const h = dimensions.h || window.innerHeight;
    const minDim = Math.min(w, h);
    // Elliptical — wider than tall, matching CLOU's proportions
    const rx = Math.min(w * 0.40, 480);
    const ry = Math.min(h * 0.32, 280);
    return { rx, ry, cx: w / 2, cy: h / 2 - 10 };
  }, [dimensions]);

  const getThumbSize = useCallback(() => {
    const w = dimensions.w || window.innerWidth;
    if (w < 640) return { tw: 55, th: 72 };
    if (w < 1024) return { tw: 70, th: 95 };
    return { tw: 85, th: 115 };
  }, [dimensions]);

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const updatePositions = useCallback(() => {
    const { rx, ry, cx, cy } = getRadii();
    const { tw, th } = getThumbSize();
    const rot = rotationRef.current;

    for (let i = 0; i < N; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const angle = rot + i * ANGLE_STEP;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);

      // Depth: sin(angle) → front at bottom, back at top
      const depth = (Math.sin(angle) + 1) / 2;

      const scale = 0.45 + depth * 0.6;
      const opacity = 0.2 + depth * 0.8;
      const zIndex = Math.round(depth * 1000);
      const blur = depth < 0.25 ? (0.25 - depth) * 6 : 0;

      // Tangent rotation — items face slightly inward
      const tangentAngle = Math.atan2(ry * Math.cos(angle), -rx * Math.sin(angle));
      const tilt = tangentAngle * (180 / Math.PI) + 90;

      const isHovered = hoveredIndex === i;
      const finalScale = isHovered ? Math.min(scale * 1.25, 1.15) : scale;
      const finalOpacity = isHovered ? 1 : opacity;
      const finalZIndex = isHovered ? 2000 : zIndex;

      el.style.transform = `translate3d(${x - tw / 2}px, ${y - th / 2}px, 0) scale(${finalScale}) rotate(${tilt}deg)`;
      el.style.opacity = String(finalOpacity);
      el.style.zIndex = String(finalZIndex);
      el.style.filter = blur > 0.15 && !isHovered ? `blur(${blur.toFixed(1)}px)` : "none";
    }

    // Category labels
    for (let i = 0; i < categoryLabels.length; i++) {
      const el = labelRefs.current[i];
      if (!el) continue;

      const angle = rot + categoryLabels[i].angle;
      const labelMult = 1.22;
      const lx = cx + rx * labelMult * Math.cos(angle);
      const ly = cy + ry * labelMult * Math.sin(angle);

      const depth = (Math.sin(angle) + 1) / 2;
      const opacity = 0.15 + depth * 0.85;
      const zIndex = Math.round(depth * 1000) + 1;

      el.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(zIndex);
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
      velocityRef.current += delta * ROTATION_SPEED;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag / touch handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPointerXRef.current = e.clientX;
      dragStartXRef.current = e.clientX;
      velocityRef.current = 0;
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerXRef.current;
      lastPointerXRef.current = e.clientX;
      rotationRef.current += dx * DRAG_SPEED;
      velocityRef.current = dx * DRAG_SPEED * 0.6;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      try { container.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  const handleItemClick = (item: RingItem) => {
    // Only navigate if the pointer didn't move much (not a drag)
    if (Math.abs(velocityRef.current) > 0.003) return;
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
        background: "#FFFFFF",
      }}
    >
      {/* WeSee. logo — top-left */}
      <div style={{ position: "absolute", top: 20, left: 24, zIndex: 700 }}>
        <Link href="/">
          <span style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
            WeSee.
          </span>
        </Link>
      </div>

      {/* Center text — fixed */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 500,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
          }}
        >
          We are WeSee.
        </h1>
      </div>

      {/* Ring items */}
      {items.map((item, i) => (
        <div
          key={`ring-${i}`}
          ref={(el) => { itemRefs.current[i] = el; }}
          onClick={() => handleItemClick(item)}
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
            transition: hoveredIndex === i ? "filter 0.15s ease" : "none",
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
            }}
          />
          {/* Tooltip on hover */}
          {hoveredIndex === i && (
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: "50%",
                transform: "translateX(-50%) rotate(0deg)",
                whiteSpace: "nowrap",
                fontSize: 11,
                fontWeight: 500,
                color: "#1A1A1A",
                background: "rgba(255,255,255,0.92)",
                padding: "4px 12px",
                pointerEvents: "none",
                letterSpacing: "0.01em",
              }}
            >
              {item.title}
            </div>
          )}
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
            transform: "translate3d(0,0,0)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: "#999999",
              letterSpacing: "0.02em",
              display: "inline-block",
              transform: "translate(-50%, -50%)",
            }}
          >
            {label.name} ({label.count})
          </span>
        </div>
      ))}

      {/* Scroll hint at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 600,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 300, color: "#BBBBBB", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          scroll or drag to explore
        </span>
      </div>
    </div>
  );
}
