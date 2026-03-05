import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  parallax?: boolean;
  parallaxAmount?: number;
  zoom?: boolean;
}

/**
 * ImageReveal — Images that reveal with a clip-path wipe animation on scroll.
 * Optional parallax effect and hover zoom.
 * Inspired by CLOU Architects and Antigravity Google.
 */
export default function ImageReveal({
  src,
  alt = "",
  style,
  className = "",
  direction = "up",
  delay = 0,
  duration = 1.2,
  parallax = false,
  parallaxAmount = 60,
  zoom = true,
}: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;

    const wrap = wrapRef.current;
    const img = imgRef.current;

    // Clip-path reveal animation
    const clipStart: Record<string, string> = {
      left: "inset(0 100% 0 0)",
      right: "inset(0 0 0 100%)",
      up: "inset(100% 0 0 0)",
      down: "inset(0 0 100% 0)",
    };

    gsap.set(wrap, { clipPath: clipStart[direction] });
    gsap.set(img, { scale: 1.3 });

    gsap.to(wrap, {
      clipPath: "inset(0 0 0 0)",
      duration,
      delay,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: wrap,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(img, {
      scale: 1,
      duration: duration + 0.4,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrap,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Parallax
    if (parallax) {
      gsap.to(img, {
        y: -parallaxAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === wrap) t.kill();
      });
    };
  }, [direction, delay, duration, parallax, parallaxAmount]);

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden ${zoom ? "img-hover-zoom" : ""} ${className}`}
      style={{ ...style, willChange: "clip-path" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          willChange: "transform",
        }}
        loading="lazy"
      />
    </div>
  );
}
