/*
 * RotorGallery — 3D Rotating Ring Gallery
 *
 * Based on Framer RotorGallery concept, adapted for React
 * - 3D rotating ring of images
 * - Hover effects preserved
 * - Smooth rotation animation
 * - Image reveal fixed at screen center (inside the ring)
 */
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useLocation } from "wouter";

interface RingItem {
  title: string;
  image: string;
  url: string;
  category: string;
  categoryId: number;
}

interface RotorGalleryProps {
  items: RingItem[];
  count?: number;
  cardWidth?: number;
  cardHeight?: number;
  borderRadius?: number;
  speedSec?: number;
  perspective?: number;
  camX?: number;
  camY?: number;
  camZ?: number;
  offsetX?: number;
  offsetY?: number;
  gapPx?: number;
  rotateCardDeg?: number;
  cardRotXDeg?: number;
  cardRotYDeg?: number;
  cardRotZDeg?: number;
  onItemClick?: (item: RingItem) => void;
}

const MAX_SAFE_COUNT = 90;

function RotorItem({
  item,
  index,
  total,
  borderRadius,
  cardWidth,
  cardHeight,
  gapPx,
  zOffsetPx,
  baseCardRotX,
  baseCardRotY,
  baseCardRotZ,
  cardOpacity,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  item: RingItem;
  index: number;
  total: number;
  borderRadius: number;
  cardWidth: number;
  cardHeight: number;
  gapPx: number;
  zOffsetPx: number;
  baseCardRotX: number;
  baseCardRotY: number;
  baseCardRotZ: number;
  cardOpacity: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const itemAngle = (index / total) * 360;
  const thicknessPx = 1;
  const half = thicknessPx / 2;

  const ringTransform = `
    rotateX(calc(var(--global-rotation) - ${itemAngle}deg))
    translateZ(${gapPx + index * zOffsetPx}px)
    rotateX(${baseCardRotX}deg)
    rotateY(${baseCardRotY}deg)
    rotateZ(${baseCardRotZ}deg)
  `;

  const scale = isHovered ? 1.15 : 1;
  const opacity = isHovered ? 1 : cardOpacity;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: ringTransform,
        transformStyle: "preserve-3d",
        willChange: "transform",
        pointerEvents: "auto",
        cursor: "none",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          background: "#E8E8E5",
          transform: `rotateZ(90deg) translateZ(${half}px) scale(${scale})`,
          opacity,
          overflow: "hidden",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          boxShadow: isHovered
            ? "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)"
            : "0 4px 16px rgba(0,0,0,0.10)",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            userSelect: "none",
            backfaceVisibility: "hidden",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            {item.category.split("&")[0].trim()}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RotorGallery({
  items,
  count = 90,
  cardWidth = 140,
  cardHeight = 120,
  borderRadius = 12,
  speedSec = 31,
  perspective = 2500,
  camX = -25,
  camY = 5,
  camZ = -100,
  offsetX = 0,
  offsetY = 0,
  gapPx = 500,
  rotateCardDeg = 90,
  cardRotXDeg = 0,
  cardRotYDeg = 0,
  cardRotZDeg = 0,
  onItemClick,
}: RotorGalleryProps) {
  const safeCount = Math.min(MAX_SAFE_COUNT, count);
  const sceneRef = useRef<HTMLDivElement>(null);
  const revealSceneRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const RING_OFFSET = 90; // Adjust based on your ring's starting orientation
  const activeCardIndexRef = useRef<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [, navigate] = useLocation();

  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });
  const velocityRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetAngleRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastMouseUpdateRef = useRef(0);

  const isMobile = dimensions.w < 640;
  const list = useMemo(() => items.slice(0, safeCount), [items, safeCount]);

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    let last = performance.now();
    const speed = 360 / (speedSec * 1000);
    let raf: number;

    const tick = (t: number) => {
      const dt = Math.min(t - last, 16.67);
      last = t;

      if (!isDraggingRef.current && targetAngleRef.current === null) {
        angleRef.current += speed * dt;
      }

      if (Math.abs(velocityRef.current) > 0.01 && targetAngleRef.current === null) {
        angleRef.current += velocityRef.current * dt;
        velocityRef.current *= 0.95;
      }

      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angleRef.current;
        let normalizedDiff = ((diff % 360) + 540) % 360 - 180;
        const interpolationSpeed = 5.0;
        const easingFactor = 1 - Math.exp(-interpolationSpeed * dt / 1000);

        if (Math.abs(normalizedDiff) > 0.05) {
          angleRef.current += normalizedDiff * easingFactor;
        } else {
          angleRef.current = targetAngleRef.current;
        }
      }

      const rotVal = `${angleRef.current}deg`;

      if (sceneRef.current) {
        sceneRef.current.style.setProperty("--global-rotation", rotVal);
      }
      // Keep reveal scene perfectly in sync
      if (revealSceneRef.current) {
        revealSceneRef.current.style.setProperty("--global-rotation", rotVal);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speedSec]);

  const handleItemClick = useCallback(
    (item: RingItem) => {
      if (onItemClick) {
        onItemClick(item);
      } else {
        navigate(item.url);
      }
    },
    [onItemClick, navigate]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      velocityRef.current = 0;
      targetAngleRef.current = null;
      lastPosRef.current = { x: clientX, y: clientY, time: performance.now() };
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;

      const now = performance.now();
      const dt = Math.max(now - lastPosRef.current.time, 1);
      const dx = clientX - lastPosRef.current.x;

      const rotationSpeed = dx * 0.3;
      angleRef.current += rotationSpeed;
      targetAngleRef.current = null;

      velocityRef.current = (dx / dt) * 0.3;
      lastPosRef.current = { x: clientX, y: clientY, time: now };

      if (sceneRef.current) {
        sceneRef.current.style.setProperty("--global-rotation", `${angleRef.current}deg`);
      }
      if (revealSceneRef.current) {
        revealSceneRef.current.style.setProperty("--global-rotation", `${angleRef.current}deg`);
      }
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    const updateClosestImage = (clientX: number, clientY: number) => {
      const now = performance.now();
      if (now - lastMouseUpdateRef.current < 16) return;
      lastMouseUpdateRef.current = now;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate cursor position relative to center
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      
      // Calculate cursor angle in radians, convert to degrees
      let cursorAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Normalize to 0-360 range
      if (cursorAngle < 0) cursorAngle += 360;
      
      // Calculate angle per card
      const anglePerCard = 360 / safeCount;
      
      // Determine active card index using floor division
      let activeIndex = Math.floor((cursorAngle + RING_OFFSET) / anglePerCard) % safeCount;
      
      // Ensure index is within valid range (handle negative modulo)
      activeIndex = ((activeIndex % safeCount) + safeCount) % safeCount;
      
      // Only update if the active card changed
      if (activeCardIndexRef.current !== activeIndex) {
        activeCardIndexRef.current = activeIndex;
        
        // Update React state for UI re-renders
        setActiveCardIndex(activeIndex);
        
        // Calculate target rotation to align active card with center (0 degrees)
        // Cards are positioned at: index * anglePerCard (itemAngle)
        // Card's final angle = global-rotation - itemAngle
        // To bring card to center (0°): global-rotation - itemAngle = 0
        // Therefore: targetRotation = activeIndex * anglePerCard
        const targetRotation = activeIndex * anglePerCard;
        targetAngleRef.current = targetRotation;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Ensure reveal layer is visible when mouse is moving
      if (revealLayerRef.current && !isDraggingRef.current) {
        revealLayerRef.current.style.opacity = "1";
        revealLayerRef.current.style.pointerEvents = "auto";
      }
      
      if (isDraggingRef.current) {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      } else {
        updateClosestImage(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => handleEnd();

    // Show reveal when cursor is inside the gallery container
    const onMouseEnter = () => {
      if (revealLayerRef.current) {
        revealLayerRef.current.style.opacity = "1";
        revealLayerRef.current.style.pointerEvents = "auto";
      }
    };

    // Hide reveal when cursor leaves
    const onMouseLeave = () => {
      mousePosRef.current = null;
      targetAngleRef.current = null;
      // Reset active card to first card
      activeCardIndexRef.current = 0;
      setActiveCardIndex(0);
      if (revealLayerRef.current) {
        revealLayerRef.current.style.opacity = "0";
        revealLayerRef.current.style.pointerEvents = "none";
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      } else if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateClosestImage(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => handleEnd();

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [safeCount, camY]);

  const mobileGapPx = isMobile ? gapPx * 0.45 : gapPx;
  const mobileCardWidth = isMobile ? cardWidth * 0.6 : cardWidth;
  const mobileCardHeight = isMobile ? cardHeight * 0.6 : cardHeight;
  const mobileOffsetX = isMobile ? (dimensions.w || window.innerWidth) * 0.4 : offsetX;
  const mobileLeft = isMobile ? "100%" : "50%";
  const mobileTop = isMobile ? "95%" : "50%";
  const mobileCamX = isMobile ? 0 : camX;
  const mobileCamY = isMobile ? 90 : 90;

  // Reveal radius — match this to your cursor ring diameter
  const revealRadius = 120;

  // Shared transform used by both the main scene and the reveal mirror
  const sceneTransform = `
    translate(-50%, -50%)
    rotateX(${mobileCamX}deg)
    rotateY(${mobileCamY}deg)
    rotateZ(${camZ}deg)
    translate(${isMobile ? mobileOffsetX : offsetX}px, ${offsetY}px)
  `;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        perspective,
        overflow: "visible",
        background: "var(--paper)",
        position: "relative",
        cursor: "none",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/*
        ══════════════════════════════════════════════════
        REVEAL LAYER
        ──────────────────────────────────────────────────
        • Full-screen fixed layer, z-index below cursor ring
        • opacity: 0 by default → 1 on mouseenter
        • mask is a FIXED circle at 50vw / 50vh — the exact
          screen center where the ring's 3D scene is anchored.
          As the ring rotates the closest card always snaps to
          center, so the revealed image matches what's "inside"
          the ring at all times.
        ══════════════════════════════════════════════════
      */}
      <div
        ref={revealLayerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 400,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.2s ease",
          WebkitMaskImage: `radial-gradient(circle ${revealRadius}px at 50vw 50vh, white 0%, white 70%, transparent 100%)`,
          maskImage: `radial-gradient(circle ${revealRadius}px at 50vw 50vh, white 0%, white 70%, transparent 100%)`,
          cursor: "pointer",
          mixBlendMode: "normal",
        }}
        onClick={(e) => {
          const activeIndex = activeCardIndexRef.current;
          if (activeIndex >= 0 && activeIndex < list.length) {
            handleItemClick(list[activeIndex]);
          }
        }}
      >
        {/* Pixel-perfect mirror of the main 3D scene */}
        <div
          ref={revealSceneRef}
          style={{
            position: "absolute",
            top: mobileTop,
            left: mobileLeft,
            width: mobileCardWidth,
            height: mobileCardHeight,
            transform: sceneTransform,
            transformStyle: "preserve-3d",
            willChange: "transform",
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
        >
          {list.map((item, i) => (
            <RotorItem
              key={`reveal-${i}`}
              item={item}
              index={i}
              total={safeCount}
              borderRadius={borderRadius}
              cardWidth={mobileCardWidth}
              cardHeight={mobileCardHeight}
              gapPx={mobileGapPx}
              zOffsetPx={0}
              baseCardRotX={cardRotXDeg + rotateCardDeg}
              baseCardRotY={cardRotYDeg}
              baseCardRotZ={cardRotZDeg}
              cardOpacity={1}
              isHovered={activeCardIndex === i}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
      {/* ══════════════ END REVEAL LAYER ══════════════ */}

      {/* Main 3D scene — completely unchanged */}
      <div
        ref={sceneRef}
        style={{
          position: "absolute",
          top: mobileTop,
          left: mobileLeft,
          width: mobileCardWidth,
          height: mobileCardHeight,
          transform: sceneTransform,
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {list.map((item, i) => (
          <RotorItem
            key={i}
            item={item}
            index={i}
            total={safeCount}
            borderRadius={borderRadius}
            cardWidth={mobileCardWidth}
            cardHeight={mobileCardHeight}
            gapPx={mobileGapPx}
            zOffsetPx={0}
            baseCardRotX={cardRotXDeg + rotateCardDeg}
            baseCardRotY={cardRotYDeg}
            baseCardRotZ={cardRotZDeg}
            cardOpacity={1}
            isHovered={activeCardIndex === i}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      {/* Bottom hint — unchanged */}
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
        <span
          style={{
            fontSize: 10,
            fontWeight: 400,
            color: "rgba(17,19,23,0.28)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          scroll or drag to explore · click to open
        </span>
      </div>
    </div>
  );
}