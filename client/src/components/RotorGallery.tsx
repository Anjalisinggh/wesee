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

interface CategoryLabel {
  name: string;
  count: number;
  angle: number;
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
  categoryLabels?: CategoryLabel[];
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
  cardWidth = 100,
  cardHeight = 80,
  borderRadius = 12,
  speedSec = 31,
  perspective = 2500,
  camX = -25,
  camY = 5,
  camZ = -100,
  offsetX = 0,
  offsetY = 30,
  gapPx = 250,
  rotateCardDeg = 90,
  cardRotXDeg = 0,
  cardRotYDeg = 0,
  cardRotZDeg = 0,
  categoryLabels = [],
  onItemClick,
}: RotorGalleryProps) {
  const safeCount = Math.min(MAX_SAFE_COUNT, count);
  const sceneRef = useRef<HTMLDivElement>(null);
  const revealSceneRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const [currentRotation, setCurrentRotation] = useState(0); // Track rotation for label updates
  const activeCardIndexRef = useRef<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isRevealVisible, setIsRevealVisible] = useState<boolean>(false);
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
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const lastRotationUpdateRef = useRef(0);

  const isMobile = dimensions.w < 640;
  const list = useMemo(() => items.slice(0, safeCount), [items, safeCount]);

  // Base ring radius (distance from center to card faces)
  const LABEL_OFFSET_X_PX = 50; // horizontal label offset from ring (X‑axis)
  const LABEL_OFFSET_Y_PX = 6; // vertical label offset from ring (Y‑axis)
  const ringRadius = useMemo(() => {
    if (categoryLabels.length === 0 || isMobile) return 0;

    const effectiveCardWidth = isMobile ? cardWidth * 0.6 : cardWidth;
    const effectiveCardHeight = isMobile ? cardHeight * 0.6 : cardHeight;
    const cardDiagonal = Math.sqrt(effectiveCardWidth ** 2 + effectiveCardHeight ** 2);
    const maxCardScale = 1.15;
    const mobileGapPx = isMobile ? gapPx * 0.45 : gapPx;
    return mobileGapPx + (cardDiagonal * maxCardScale) / 2;
  }, [categoryLabels.length, isMobile, cardWidth, cardHeight, gapPx]);

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

      // Stop auto-rotation when hovering over the ring or when dragging
      if (!isDraggingRef.current && !isHoveringRef.current && targetAngleRef.current === null) {
        angleRef.current += speed * dt;
      }

      // Stop momentum rotation when hovering
      if (Math.abs(velocityRef.current) > 0.01 && targetAngleRef.current === null && !isHoveringRef.current) {
        angleRef.current += velocityRef.current * dt;
        velocityRef.current *= 0.95;
      } else if (isHoveringRef.current) {
        // Clear velocity when hovering to stop momentum immediately
        velocityRef.current = 0;
      }

      if (targetAngleRef.current !== null) {
        // Smooth interpolation using 0.08 factor
        angleRef.current += (targetAngleRef.current - angleRef.current) * 0.08;
        
        // Snap to target if very close (within 0.1 degrees)
        if (Math.abs(targetAngleRef.current - angleRef.current) < 0.1) {
          angleRef.current = targetAngleRef.current;
        }
      }

      const rotVal = `${angleRef.current}deg`;

      if (sceneRef.current) {
        sceneRef.current.style.setProperty("--global-rotation", rotVal);
      }

      // Update category label positions periodically during auto-rotation (throttled to ~10fps)
      if (t - lastRotationUpdateRef.current > 100) {
        setCurrentRotation(angleRef.current);
        lastRotationUpdateRef.current = t;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speedSec]);

  const handleItemClick = useCallback(
    (item: RingItem) => {
      // Prevent click if user was just dragging
      if (hasDraggedRef.current) {
        return;
      }
      if (onItemClick) {
        onItemClick(item);
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
      dragStartPosRef.current = { x: clientX, y: clientY };
      hasDraggedRef.current = false;
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;

      const now = performance.now();
      const dt = Math.max(now - lastPosRef.current.time, 1);
      
      // Calculate rotation based on angular movement around center
      // This is more consistent than using dx directly
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Get angles for current and previous positions
      const currentAngle = Math.atan2(clientY - centerY, clientX - centerX);
      const prevAngle = Math.atan2(lastPosRef.current.y - centerY, lastPosRef.current.x - centerX);
      
      // Calculate angular difference, handling wrap-around
      let angleDelta = currentAngle - prevAngle;
      // Normalize to [-π, π]
      if (angleDelta > Math.PI) angleDelta -= 2 * Math.PI;
      if (angleDelta < -Math.PI) angleDelta += 2 * Math.PI;
      
      // Convert to degrees and apply to rotation
      // Transform uses (globalRotation - itemAngle), so we need to match the direction
      const rotationDelta = angleDelta * (180 / Math.PI);
      angleRef.current += rotationDelta;
      targetAngleRef.current = null;

      // Calculate velocity for momentum
      velocityRef.current = rotationDelta / (dt / 1000);

      // Track if user has actually dragged (moved more than 5px)
      if (dragStartPosRef.current) {
        const totalDx = clientX - dragStartPosRef.current.x;
        const totalDy = clientY - dragStartPosRef.current.y;
        const dragDistance = Math.sqrt(totalDx * totalDx + totalDy * totalDy);
        if (dragDistance > 5) {
          hasDraggedRef.current = true;
        }
      }

      lastPosRef.current = { x: clientX, y: clientY, time: now };

      if (sceneRef.current) {
        sceneRef.current.style.setProperty("--global-rotation", `${angleRef.current}deg`);
      }
      if (revealSceneRef.current) {
        revealSceneRef.current.style.setProperty("--global-rotation", `${angleRef.current}deg`);
      }
      
      // Don't update labels during drag - only update after drag ends
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Stop any momentum rotation immediately
      velocityRef.current = 0;
      targetAngleRef.current = null;
      
      // Update labels position after drag ends
      setCurrentRotation(angleRef.current);
      
      // Reset drag flag after a short delay to allow clicks again
      if (hasDraggedRef.current) {
        setTimeout(() => {
          hasDraggedRef.current = false;
          dragStartPosRef.current = null;
        }, 100);
      } else {
        dragStartPosRef.current = null;
      }
    };

    const updateClosestImage = (clientX: number, clientY: number) => {
      // On desktop we rely on direct card hover to determine the active card.
      // The angle-based mapping is only needed on mobile / touch, where there is no hover.
      if (!isMobile) return;

      const now = performance.now();
      if (now - lastMouseUpdateRef.current < 16) return;
      lastMouseUpdateRef.current = now;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Store touch position for image positioning
      mousePosRef.current = { x: clientX, y: clientY };
      
      // Calculate touch position relative to center
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      
      // Convert touch position to angle (in degrees)
      // atan2 gives angle from positive x-axis: 0° = right, 90° = down, 180° = left, 270° = up
      let cursorAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      cursorAngle = (cursorAngle + 360) % 360;
      
      // Calculate angle per card
      const anglePerCard = 360 / safeCount;
      
      // Find the card closest to the touch position by checking ALL cards
      let minDistance = Infinity;
      let activeIndex = 0;
      
      for (let i = 0; i < safeCount; i++) {
        // Calculate where this card appears visually (accounting for ring rotation)
        let cardAngle = (angleRef.current - i * anglePerCard) % 360;
        if (cardAngle < 0) cardAngle += 360;
        
        // Calculate angular distance between touch and card
        let distance = Math.abs(cursorAngle - cardAngle);
        // Handle wrap-around (e.g., 350° and 10° are only 20° apart)
        if (distance > 180) distance = 360 - distance;
        
        // Track the card with minimum distance
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = i;
        }
      }
      
      // Ensure index is within valid range
      if (activeIndex < 0) activeIndex = ((activeIndex % safeCount) + safeCount) % safeCount;
      
      // Only update if the active card changed
      if (activeCardIndexRef.current !== activeIndex) {
        activeCardIndexRef.current = activeIndex;
        // Update React state for UI re-renders
        setActiveCardIndex(activeIndex);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      // This handler is only called when cursor is inside container
      // (called from onWindowMouseMove or container mousemove event)
      
      // Ensure reveal layer is visible when mouse is moving
      if (revealLayerRef.current && !isDraggingRef.current) {
        revealLayerRef.current.style.opacity = "1";
        revealLayerRef.current.style.pointerEvents = "auto";
        setIsRevealVisible(true);
      }
      
      if (isDraggingRef.current) {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      } else {
        updateClosestImage(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => handleEnd();

    // Show reveal when cursor enters the gallery container
    // NOTE: Rotation is NOT stopped here — it only stops when hovering a card
    const onMouseEnter = (e: MouseEvent) => {
      if (revealLayerRef.current) {
        revealLayerRef.current.style.opacity = "1";
        revealLayerRef.current.style.pointerEvents = "auto";
        setIsRevealVisible(true);
      }
    };

    // Hide reveal when cursor leaves container - rotation resumes via card onMouseLeave
    const onMouseLeave = (e: MouseEvent) => {
      // Ensure hover is cleared when leaving container entirely
      isHoveringRef.current = false;
      velocityRef.current = 0;
      mousePosRef.current = null;
      targetAngleRef.current = null;
      // Reset active card to first card
      activeCardIndexRef.current = 0;
      setActiveCardIndex(0);
      if (revealLayerRef.current) {
        revealLayerRef.current.style.opacity = "0";
        revealLayerRef.current.style.pointerEvents = "none";
        setIsRevealVisible(false);
      }
    };
    
    // Hover detection is now handled by individual RotorItem onMouseEnter/onMouseLeave
    // No need for distance-based detection from container center

    const onTouchStart = (e: TouchEvent) => {
      isHoveringRef.current = true;
      const touch = e.touches[0];
      // Show reveal layer on touch start
      if (revealLayerRef.current) {
        revealLayerRef.current.style.opacity = "1";
        revealLayerRef.current.style.pointerEvents = "auto";
        setIsRevealVisible(true);
      }
      // Only prevent default if we're starting a drag
      if (!isDraggingRef.current) {
        updateClosestImage(touch.clientX, touch.clientY);
      } else {
        e.preventDefault();
        handleStart(touch.clientX, touch.clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      } else if (e.touches.length > 0) {
        const touch = e.touches[0];
        // Show reveal layer on touch move
        if (revealLayerRef.current) {
          revealLayerRef.current.style.opacity = "1";
          revealLayerRef.current.style.pointerEvents = "auto";
          setIsRevealVisible(true);
        }
        updateClosestImage(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => {
      isHoveringRef.current = false;
      handleEnd();
    };

    // Window-level mouse move handler - handles drag and reveal
    const onWindowMouseMove = (e: MouseEvent) => {
      // Only process drag interactions at window level
      if (isDraggingRef.current) {
        onMouseMove(e);
      }
    };

    // Event listeners - mouseenter/mouseleave control reveal layer visibility
    // Rotation pause/resume is handled by individual card hover events
    container.addEventListener("mouseenter", onMouseEnter as EventListener);
    container.addEventListener("mouseleave", onMouseLeave as EventListener);
    
    // Event listeners for interactions
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    // Window mousemove checks position on every move to ensure accuracy
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [safeCount, camY]);

  // Overall ring scale — lower ] => smaller ring radius (cards closer to center)
  const RING_SCALE = 0.85;
  const mobileGapPx = (isMobile ? gapPx * 0.45 : gapPx) * RING_SCALE;
  const mobileCardWidth = isMobile ? cardWidth * 0.6 : cardWidth;
  const mobileCardHeight = isMobile ? cardHeight * 0.6 : cardHeight;
  const mobileOffsetX = isMobile ? (dimensions.w || window.innerWidth) * 0.4 : offsetX;
  const mobileLeft = isMobile ? "100%" : "50%";
  const mobileTop = isMobile ? "95%" : "50%";
  const mobileCamX = isMobile ? 0 : camX;
  const mobileCamY = isMobile ? 90 : 90;

  // Reveal radius — circular mask size at center
  const revealRadius = 600;
  
  // Reveal image size (wider and shorter for better aspect ratio)
  // Bigger on mobile as requested
  const revealImageWidth = isMobile ? mobileCardWidth * 3.8 : mobileCardWidth * 2.5;
  const revealImageHeight = isMobile ? mobileCardHeight * 2.6 : mobileCardHeight * 1.6;
  
  // Image position - move up more on mobile
  const revealImageTop = isMobile ? "35vh" : "45vh";
  const revealMaskY = isMobile ? "35vh" : "45vh";

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
          WebkitMaskImage: `radial-gradient(circle ${revealRadius}px at 50vw ${revealMaskY}, white 0%, white 90%, transparent 100%)`,
          maskImage: `radial-gradient(circle ${revealRadius}px at 50vw ${revealMaskY}, white 0%, white 90%, transparent 100%)`,
          cursor: "none",
          mixBlendMode: "normal",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => {
          // Prevent click if user was just dragging
          if (hasDraggedRef.current) {
            return;
          }
          const activeIndex = activeCardIndexRef.current;
          if (activeIndex >= 0 && activeIndex < list.length) {
            handleItemClick(list[activeIndex]);
          }
        }}
      >
        {/* Center reveal - shows only the active card image */}
        {list.length > 0 && activeCardIndex < list.length && (
          <>
        <div
          ref={revealSceneRef}
          style={{
                position: "fixed",
                top: revealImageTop,
                left: "50vw",
                width: revealImageWidth,
                height: revealImageHeight,
                transform: "translate(-50%, -50%)",
                borderRadius: borderRadius,
                overflow: "hidden",
                pointerEvents: "none",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={list[activeCardIndex].image}
                alt={list[activeCardIndex].title}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  userSelect: "none",
                  display: "block",
                }}
              />
            </div>
            {/* Active category label below the image */}
            <div
              style={{
                position: "fixed",
                top: isMobile 
                  ? `calc(35vh + ${revealImageHeight / 2}px + 20px)`
                  : `calc(45vh + ${revealImageHeight / 2}px + 20px)`,
                left: "50vw",
                transform: "translateX(-50%)",
                zIndex: 401,
                pointerEvents: "none",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? 11 : 14,
                  fontWeight: 600,
                  color: "#111317",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  background: "rgba(248,248,246,0.95)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: isMobile ? "6px 14px" : "8px 18px",
                  borderRadius: 20,
                  border: "1px solid rgba(17,19,23,0.15)",
                }}
              >
                {list[activeCardIndex].category.split("&")[0].trim()}
              </span>
        </div>
          </>
        )}
      </div>
      {/* ══════════════ END REVEAL LAYER ══════════════ */}

      {/* "We are WeSee" fallback - shows when reveal layer is hidden */}
      {!isRevealVisible && (
        <div
          style={{
            position: "fixed",
            top: revealImageTop,
            left: "50vw",
            transform: "translate(-50%, -50%)",
            zIndex: 350,
            pointerEvents: "none",
            textAlign: "center",
            opacity: isRevealVisible ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 450,
              color: "var(--ink)",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            We are{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                background: "linear-gradient(135deg, #B8922E 0%, #C9A84C 48%, #E8C870 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 100%",
                animation: "textShimmer 5s ease infinite",
              }}
            >
              WeSee.
            </em>
          </h1>
        </div>
      )}

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
            onMouseEnter={() => {
              isHoveringRef.current = true;
              velocityRef.current = 0;
              targetAngleRef.current = null;
              activeCardIndexRef.current = i;
              setActiveCardIndex(i);
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      {/* Category labels - dynamic positions that follow ring rotation */}
      {categoryLabels.length > 0 && !isMobile && ringRadius > 0 && (
        <>
          {categoryLabels.map((label, i) => {
            // Calculate dynamic position based on current rotation
            // label.angle is in radians, currentRotation is in degrees
            // Add current rotation to the base angle to make labels follow the ring
            const rotationRad = (currentRotation * Math.PI) / 180;
            const totalAngle = label.angle + rotationRad;
            
            // Calculate elliptical path to match carousel perspective
            // The carousel is viewed from an angle (camX = -25°, camY = 5°), so the circle appears as an ellipse
            // Compress Y-axis to match the visual perspective of the tilted ring
            const camXRads = (camX * Math.PI) / 180;
            // The vertical compression is primarily from the X-axis rotation
            // cos(camX) gives us how much the vertical dimension is compressed
            // For camX = -25°, cos(-25°) ≈ 0.906, but we want more visible compression
            // Use a more pronounced ellipse ratio to match the visual appearance
            const baseEllipseRatio = Math.cos(camXRads);
            // Apply additional compression to make the ellipse more visible (typical range: 0.55-0.75)
            const finalEllipseRatio = Math.max(0.55, Math.min(0.75, baseEllipseRatio * 0.75));
            
            // Label radii — separate control for X and Y distance from the ring
            const labelRadiusX = ringRadius + LABEL_OFFSET_X_PX;
            const labelRadiusY = ringRadius + LABEL_OFFSET_Y_PX;
            
            // Calculate elliptical position with independent X/Y offsets,
            // then apply same offsetX/offsetY so labels share the same center as the cards
            const x = Math.cos(totalAngle) * labelRadiusX + offsetX;
            const y = Math.sin(totalAngle) * labelRadiusY * finalEllipseRatio + offsetY;
            
            return (
              <div
                key={`label-${i}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  zIndex: 500,
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Always smooth transition for repositioning
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#111317",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: "1px solid rgba(17,19,23,0.15)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label.name} ({label.count})
                </span>
              </div>
            );
          })}
        </>
      )}

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
      </div>
    </div>
  );
}