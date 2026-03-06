import { useRef, useState, type ReactNode, type CSSProperties } from "react";

interface HoverImageCardProps {
  children: ReactNode;
  imageSrc: string;
  className?: string;
  style?: CSSProperties;
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * HoverImageCard — On hover, shows a floating image thumbnail that follows the cursor.
 * Used for service list rows on the homepage.
 * Inspired by CLOU Architects' project list hover effect.
 */
export default function HoverImageCard({
  children,
  imageSrc,
  className = "",
  style,
  imageWidth = 280,
  imageHeight = 180,
}: HoverImageCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 20;
    const y = e.clientY - rect.top - imageHeight / 2;
    imgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ ...style, overflow: "visible" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {/* Floating image */}
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: imageWidth,
          height: imageHeight,
          pointerEvents: "none",
          zIndex: 20,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, opacity",
          overflow: "hidden",
        }}
      >
        <img
          src={imageSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
