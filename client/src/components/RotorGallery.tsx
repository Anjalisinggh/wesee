/*
 * RotorGallery — 3D Rotating Ring Gallery
 *
 * MOBILE INTERACTION (two-step):
 *   Step 1 — Tap a ring card  → shows the center image preview (ring pauses, reveal visible)
 *   Step 2 — Tap the center preview image or category label → navigates to the item's URL
 *
 * Tapping anywhere outside the preview dismisses it and resumes the ring.
 * Dragging always spins the ring.
 */
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { useFinePointer } from "@/hooks/useFinePointer";

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
  isMobile,
  finePointer,
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
  isMobile: boolean;
  finePointer: boolean;
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
        // pointer-events: none — desktop hover is handled via container mousemove (angle math),
        // not per-card DOM events, so this works reliably at any screen size.
        pointerEvents: "none",
        cursor: finePointer ? "none" : "grab",
      }}
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
        {!isMobile && (
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
        )}
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
  const finePointer = useFinePointer();
  const safeCount = Math.min(MAX_SAFE_COUNT, count);
  const sceneRef = useRef<HTMLDivElement>(null);
  const revealSceneRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);

  // labelRotation is updated every single RAF frame (no throttle) so labels move smoothly
  const [labelRotation, setLabelRotation] = useState(0);

  const activeCardIndexRef = useRef<number>(-1);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const [isRevealVisible, setIsRevealVisible] = useState<boolean>(false);

  // Preview lock: true = preview open, waiting for tap-on-image to navigate
  const previewLockedRef = useRef(false);
  const [previewLocked, setPreviewLocked] = useState(false);

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
  const touchStartedOnRingRef = useRef(false);

  const isMobile = dimensions.w < 640;
  const list = useMemo(() => items.slice(0, safeCount), [items, safeCount]);

  const LABEL_OFFSET_X_PX = 50;
  const LABEL_OFFSET_Y_PX = 6;
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

  // ── Main animation loop
  useEffect(() => {
    let last = performance.now();
    const speed = 360 / (speedSec * 1000);
    let raf: number;

    const tick = (t: number) => {
      const dt = Math.min(t - last, 16.67);
      last = t;

      if (!isDraggingRef.current && !isHoveringRef.current && targetAngleRef.current === null) {
        angleRef.current += speed * dt;
      }

      if (Math.abs(velocityRef.current) > 0.01 && targetAngleRef.current === null && !isHoveringRef.current) {
        angleRef.current += velocityRef.current * dt;
        velocityRef.current *= 0.95;
      } else if (isHoveringRef.current) {
        velocityRef.current = 0;
      }

      if (targetAngleRef.current !== null) {
        angleRef.current += (targetAngleRef.current - angleRef.current) * 0.08;
        if (Math.abs(targetAngleRef.current - angleRef.current) < 0.1) {
          angleRef.current = targetAngleRef.current;
        }
      }

      const rotVal = `${angleRef.current}deg`;
      if (sceneRef.current) sceneRef.current.style.setProperty("--global-rotation", rotVal);

      // Update every frame — no throttle — so category labels move smoothly
      setLabelRotation(angleRef.current);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speedSec]);

  const handleItemClick = useCallback(
    (item: RingItem) => {
      if (hasDraggedRef.current) return;
      if (onItemClick) {
        onItemClick(item);
      } else if (item.url) {
        navigate(item.url);
      }
    },
    [onItemClick, navigate]
  );

  const RING_SCALE = 0.85;
  const mobileGapPx = (isMobile ? gapPx * 0.45 : gapPx) * RING_SCALE;

  const mobileCardWidth = isMobile ? cardWidth * 0.6 : cardWidth;
  const mobileCardHeight = isMobile ? cardHeight * 0.6 : cardHeight;
  const revealImageWidth = isMobile ? mobileCardWidth * 3.8 : mobileCardWidth * 2.5;
  const revealImageHeight = isMobile ? mobileCardHeight * 2.6 : mobileCardHeight * 1.6;
  const revealImageTopVh = isMobile ? 0.35 : 0.45;

  // ── Desktop: find closest card by angular proximity to cursor.
  // Uses pure angle math (same approach as mobile) so it works at any screen/monitor size
  // without relying on per-card DOM hit areas which break with 3D perspective transforms.
  const updateClosestCardDesktop = useCallback(
    (clientX: number, clientY: number): boolean => {
      const container = containerRef.current;
      if (!container) return false;

      const rect = container.getBoundingClientRect();

      // Approximate 2D screen-space centre of the ring.
      // The scene is at left:50%, top:50% of the container, offset by (offsetX, offsetY).
      const sceneCenterX = rect.left + rect.width * 0.5 + offsetX;
      const sceneCenterY = rect.top + rect.height * 0.5 + offsetY;

      const dx = clientX - sceneCenterX;
      const dy = clientY - sceneCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Dead-zone (centre) and outer boundary
      const minR = mobileGapPx * 0.15;
      const maxR = mobileGapPx * 3.2; // generous outer zone for large monitors

      if (dist < minR || dist > maxR) {
        if (activeCardIndexRef.current >= 0) {
          activeCardIndexRef.current = -1;
          setActiveCardIndex(-1);
          setIsRevealVisible(false);
          isHoveringRef.current = false;
        }
        return false;
      }

      let cursorAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      cursorAngle = (cursorAngle + 360) % 360;

      const anglePerCard = 360 / safeCount;
      let minAngDist = Infinity;
      let bestIndex = 0;

      for (let i = 0; i < safeCount; i++) {
        let cardAngle = (angleRef.current - i * anglePerCard) % 360;
        if (cardAngle < 0) cardAngle += 360;
        let d = Math.abs(cursorAngle - cardAngle);
        if (d > 180) d = 360 - d;
        if (d < minAngDist) {
          minAngDist = d;
          bestIndex = i;
        }
      }

      if (bestIndex !== activeCardIndexRef.current) {
        activeCardIndexRef.current = bestIndex;
        setActiveCardIndex(bestIndex);
      }
      return true;
    },
    [mobileGapPx, safeCount, offsetX, offsetY]
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

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const currentAngle = Math.atan2(clientY - centerY, clientX - centerX);
      const prevAngle = Math.atan2(lastPosRef.current.y - centerY, lastPosRef.current.x - centerX);

      let angleDelta = currentAngle - prevAngle;
      if (angleDelta > Math.PI) angleDelta -= 2 * Math.PI;
      if (angleDelta < -Math.PI) angleDelta += 2 * Math.PI;

      const rotationDelta = angleDelta * (180 / Math.PI);
      angleRef.current += rotationDelta;
      targetAngleRef.current = null;
      velocityRef.current = rotationDelta / (dt / 1000);

      if (dragStartPosRef.current) {
        const totalDx = clientX - dragStartPosRef.current.x;
        const totalDy = clientY - dragStartPosRef.current.y;
        if (Math.sqrt(totalDx * totalDx + totalDy * totalDy) > 5) {
          hasDraggedRef.current = true;
        }
      }

      lastPosRef.current = { x: clientX, y: clientY, time: now };

      if (sceneRef.current) sceneRef.current.style.setProperty("--global-rotation", `${angleRef.current}deg`);
      if (revealSceneRef.current) revealSceneRef.current.style.setProperty("--global-rotation", `${angleRef.current}deg`);
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      velocityRef.current = 0;
      targetAngleRef.current = null;

      if (hasDraggedRef.current) {
        setTimeout(() => {
          hasDraggedRef.current = false;
          dragStartPosRef.current = null;
        }, 100);
      } else {
        dragStartPosRef.current = null;
      }
    };

    // Mobile only — unchanged from original
    const updateClosestImageMobile = (clientX: number, clientY: number): boolean => {
      if (!isMobile) return false;

      const now = performance.now();
      if (now - lastMouseUpdateRef.current < 16) return activeCardIndexRef.current >= 0;
      lastMouseUpdateRef.current = now;

      const rect = container.getBoundingClientRect();
      const ringCenterX = rect.left + rect.width + offsetX;
      const ringCenterY = rect.top + rect.height * 0.95 + offsetY;

      const dx = clientX - ringCenterX;
      const dy = clientY - ringCenterY;
      const touchDistance = Math.sqrt(dx * dx + dy * dy);

      const effectiveRadius = mobileGapPx;
      const minTouchRadius = effectiveRadius * 0.2;
      const maxTouchRadius = effectiveRadius * 2.5;

      if (touchDistance < minTouchRadius || touchDistance > maxTouchRadius) {
        if (!previewLockedRef.current && activeCardIndexRef.current >= 0) {
          activeCardIndexRef.current = -1;
          setActiveCardIndex(-1);
          setIsRevealVisible(false);
          isHoveringRef.current = false;
        }
        return false;
      }

      mousePosRef.current = { x: clientX, y: clientY };

      let cursorAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      cursorAngle = (cursorAngle + 360) % 360;

      const anglePerCard = 360 / safeCount;
      let minAngDist = Infinity;
      let activeIndex = 0;

      for (let i = 0; i < safeCount; i++) {
        let cardAngle = (angleRef.current - i * anglePerCard) % 360;
        if (cardAngle < 0) cardAngle += 360;
        let distance = Math.abs(cursorAngle - cardAngle);
        if (distance > 180) distance = 360 - distance;
        if (distance < minAngDist) {
          minAngDist = distance;
          activeIndex = i;
        }
      }

      if (activeIndex < 0) activeIndex = ((activeIndex % safeCount) + safeCount) % safeCount;

      if (activeCardIndexRef.current !== activeIndex) {
        activeCardIndexRef.current = activeIndex;
        setActiveCardIndex(activeIndex);
      }
      return true;
    };

    const isTouchOnPreview = (clientX: number, clientY: number): boolean => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = vw * 0.5;
      const centerY = vh * revealImageTopVh;
      return (
        clientX >= centerX - revealImageWidth / 2 &&
        clientX <= centerX + revealImageWidth / 2 &&
        clientY >= centerY - revealImageHeight / 2 &&
        clientY <= centerY + revealImageHeight / 2
      );
    };

    const isTouchOnCategoryLabel = (clientX: number, clientY: number): boolean => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = vw * 0.5;
      const pillTop = vh * revealImageTopVh + revealImageHeight / 2 + 20;
      const pillHeight = isMobile ? 44 : 52;
      const halfW = isMobile ? 200 : 240;
      return (
        clientX >= centerX - halfW &&
        clientX <= centerX + halfW &&
        clientY >= pillTop &&
        clientY <= pillTop + pillHeight
      );
    };

    const isTouchOnPreviewOrCategoryLabel = (clientX: number, clientY: number): boolean =>
      isTouchOnPreview(clientX, clientY) || isTouchOnCategoryLabel(clientX, clientY);

    // ── Desktop mouse handlers
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
        return;
      }
      if (!isMobile) {
        const onRing = updateClosestCardDesktop(e.clientX, e.clientY);
        if (onRing) {
          isHoveringRef.current = true;
          setIsRevealVisible(true);
        } else {
          isHoveringRef.current = false;
          setIsRevealVisible(false);
        }
      }
    };

    const onMouseUp = () => handleEnd();

    const onMouseLeave = () => {
      if (previewLockedRef.current) return;
      isHoveringRef.current = false;
      velocityRef.current = 0;
      mousePosRef.current = null;
      targetAngleRef.current = null;
      activeCardIndexRef.current = -1;
      setActiveCardIndex(-1);
      setIsRevealVisible(false);
    };

    const onContainerClick = (e: MouseEvent) => {
      if (isMobile) return;
      if (hasDraggedRef.current) return;
      const activeIndex = activeCardIndexRef.current;
      if (activeIndex >= 0 && activeIndex < list.length) {
        handleItemClick(list[activeIndex]);
      }
    };

    // ── Mobile touch handlers — unchanged from original
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];

      if (previewLockedRef.current) {
        if (isTouchOnPreviewOrCategoryLabel(touch.clientX, touch.clientY)) {
          const idx = activeCardIndexRef.current;
          previewLockedRef.current = false;
          setPreviewLocked(false);
          isHoveringRef.current = false;
          activeCardIndexRef.current = -1;
          setActiveCardIndex(-1);
          setIsRevealVisible(false);
          if (idx >= 0 && idx < list.length) {
            handleItemClick(list[idx]);
          }
        } else {
          const nearRing = updateClosestImageMobile(touch.clientX, touch.clientY);
          touchStartedOnRingRef.current = nearRing;
          if (nearRing) {
            isHoveringRef.current = true;
            setIsRevealVisible(true);
          } else {
            previewLockedRef.current = false;
            setPreviewLocked(false);
            isHoveringRef.current = false;
            activeCardIndexRef.current = -1;
            setActiveCardIndex(-1);
            setIsRevealVisible(false);
          }
        }
        dragStartPosRef.current = { x: touch.clientX, y: touch.clientY };
        hasDraggedRef.current = false;
        return;
      }

      const nearRing = updateClosestImageMobile(touch.clientX, touch.clientY);
      touchStartedOnRingRef.current = nearRing;

      if (nearRing) {
        isHoveringRef.current = true;
        setIsRevealVisible(true);
      } else {
        handleStart(touch.clientX, touch.clientY);
      }

      dragStartPosRef.current = { x: touch.clientX, y: touch.clientY };
      hasDraggedRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];

      if (isDraggingRef.current) {
        e.preventDefault();
        handleMove(touch.clientX, touch.clientY);
        return;
      }

      if (dragStartPosRef.current) {
        const dx = touch.clientX - dragStartPosRef.current.x;
        const dy = touch.clientY - dragStartPosRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
          if (previewLockedRef.current) {
            previewLockedRef.current = false;
            setPreviewLocked(false);
          }
          isHoveringRef.current = false;
          setIsRevealVisible(false);
          activeCardIndexRef.current = -1;
          setActiveCardIndex(-1);
          handleStart(touch.clientX, touch.clientY);
          hasDraggedRef.current = true;
          return;
        }
      }

      if (touchStartedOnRingRef.current) {
        const nearRing = updateClosestImageMobile(touch.clientX, touch.clientY);
        if (nearRing) {
          isHoveringRef.current = true;
          setIsRevealVisible(true);
        } else if (!previewLockedRef.current) {
          isHoveringRef.current = false;
          setIsRevealVisible(false);
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const wasDragging = hasDraggedRef.current;

      if (previewLockedRef.current) {
        touchStartedOnRingRef.current = false;
        handleEnd();
        return;
      }

      if (!wasDragging && touchStartedOnRingRef.current) {
        const activeIndex = activeCardIndexRef.current;
        if (activeIndex >= 0 && activeIndex < list.length) {
          previewLockedRef.current = true;
          setPreviewLocked(true);
          isHoveringRef.current = true;
          setIsRevealVisible(true);
          touchStartedOnRingRef.current = false;
          handleEnd();
          return;
        }
      }

      isHoveringRef.current = false;
      touchStartedOnRingRef.current = false;
      activeCardIndexRef.current = -1;
      setActiveCardIndex(-1);
      setIsRevealVisible(false);
      handleEnd();
    };

    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) onMouseMove(e);
    };

    container.addEventListener("mouseleave", onMouseLeave as EventListener);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onContainerClick);
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onContainerClick);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [safeCount, camY, list, handleItemClick, isMobile, mobileGapPx, offsetX, offsetY, revealImageWidth, revealImageHeight, revealImageTopVh, updateClosestCardDesktop]);

  const mobileOffsetX = isMobile ? (dimensions.w || window.innerWidth) * 0.4 : offsetX;
  const mobileLeft = isMobile ? "100%" : "50%";
  const mobileTop = isMobile ? "95%" : "50%";
  const mobileCamX = isMobile ? 0 : camX;
  const mobileCamY = isMobile ? 90 : 90;

  const revealRadius = 600;
  const revealImageTop = isMobile ? "35vh" : "45vh";
  const revealMaskY = isMobile ? "35vh" : "45vh";

  const sceneTransform = `
    translate(-50%, -50%)
    rotateX(${mobileCamX}deg)
    rotateY(${mobileCamY}deg)
    rotateZ(${camZ}deg)
    translate(${isMobile ? mobileOffsetX : offsetX}px, ${offsetY}px)
  `;

  const showReveal = activeCardIndex >= 0 && activeCardIndex < list.length;

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
        cursor: finePointer ? "none" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* REVEAL LAYER */}
      <div
        ref={revealLayerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 400,
          pointerEvents: "none",
          opacity: showReveal || isRevealVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          WebkitMaskImage: `radial-gradient(circle ${revealRadius}px at 50vw ${revealMaskY}, white 0%, white 90%, transparent 100%)`,
          maskImage: `radial-gradient(circle ${revealRadius}px at 50vw ${revealMaskY}, white 0%, white 90%, transparent 100%)`,
          cursor: finePointer ? "none" : "grab",
          mixBlendMode: "normal",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showReveal && (
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
                outline: previewLocked ? "2.5px solid rgba(255,255,255,0.6)" : "none",
                transition: "outline 0.2s ease",
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
              {previewLocked && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                </div>
              )}
            </div>

            <div
              style={{
                position: "fixed",
                top: isMobile
                  ? `calc(35vh + ${revealImageHeight / 2}px + 20px)`
                  : `calc(45vh + ${revealImageHeight / 2}px + 20px)`,
                left: "50vw",
                transform: "translateX(-50%)",
                zIndex: 401,
                pointerEvents: isMobile ? "none" : "auto",
                cursor: finePointer && isMobile ? undefined : "pointer",
                textAlign: "center",
              }}
              onMouseDown={isMobile ? undefined : (e) => e.stopPropagation()}
              onClick={
                isMobile
                  ? undefined
                  : (e) => {
                      e.stopPropagation();
                      const idx = activeCardIndex;
                      if (idx >= 0 && idx < list.length) handleItemClick(list[idx]);
                    }
              }
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

      {/* "We are WeSee" fallback */}
      {!showReveal && !isRevealVisible && (
        <div
          style={{
            position: "fixed",
            top: revealImageTop,
            left: "50vw",
            transform: "translate(-50%, -50%)",
            zIndex: 350,
            pointerEvents: "none",
            textAlign: "center",
            opacity: 1,
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

      {/* Main 3D scene */}
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
            isMobile={isMobile}
            finePointer={finePointer}
          />
        ))}
      </div>

      {/* Category labels (desktop only) — driven by labelRotation, updated every RAF frame */}
      {categoryLabels.length > 0 && !isMobile && ringRadius > 0 && (
        <>
          {categoryLabels.map((label, i) => {
            const rotationRad = (labelRotation * Math.PI) / 180;
            const totalAngle = label.angle + rotationRad;
            const camXRads = (camX * Math.PI) / 180;
            const baseEllipseRatio = Math.cos(camXRads);
            const finalEllipseRatio = Math.max(0.55, Math.min(0.75, baseEllipseRatio * 0.75));
            const labelRadiusX = ringRadius + LABEL_OFFSET_X_PX;
            const labelRadiusY = ringRadius + LABEL_OFFSET_Y_PX;
            const x = Math.cos(totalAngle) * labelRadiusX + offsetX;
            const y = Math.sin(totalAngle) * labelRadiusY * finalEllipseRatio + offsetY;

            return (
              <div
                key={`label-${i}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  // No CSS transition — position is driven by JS every frame for perfectly smooth motion
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  zIndex: 500,
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
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
      />
    </div>
  );
}