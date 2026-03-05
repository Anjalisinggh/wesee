import { useRef, type ReactNode, type CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

/**
 * TiltCard — 3D perspective tilt on hover.
 * Inspired by Antigravity Google's card interactions.
 * Smooth GPU-accelerated transform with perspective.
 */
export default function TiltCard({
  children,
  className = "",
  style,
  maxTilt = 8,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "transform 0.1s ease-out";
    }, 600);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
