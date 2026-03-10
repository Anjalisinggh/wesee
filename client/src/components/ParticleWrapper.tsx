import { ReactNode } from "react";
import HoverParticles from "./HoverParticles";

interface ParticleWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParticleWrapper({ children, className = "", style = {} }: ParticleWrapperProps) {
  return (
    <div 
      className={className}
      style={{ 
        position: "relative", 
        overflow: "hidden",
        ...style 
      }}
    >
      <HoverParticles />
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}

