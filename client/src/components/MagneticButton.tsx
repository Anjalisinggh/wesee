import { useRef, type ReactNode, type CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: string;
  [key: string]: unknown;
}

/**
 * MagneticButton — interactive elements that pull toward the cursor on hover.
 * Inspired by Antigravity Google's magnetic CTA buttons.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */
export default function MagneticButton({
  children,
  className = "",
  style,
  strength = 0.3,
  as: Tag = "button",
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "transform 0.15s ease-out";
    }, 500);
  };

  const props: Record<string, unknown> = {
    ref,
    className: `magnetic-btn ${className}`,
    style: {
      ...style,
      transition: "transform 0.15s ease-out",
      willChange: "transform",
      display: "inline-block",
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    "data-cursor": "grow",
  };

  if (Tag === "a") {
    props.href = href;
    props.target = target;
    props.rel = rel;
  }

  return <Tag {...(props as any)}>{children}</Tag>;
}
