import React from "react"

import { Particles } from "@/components/ui/particles"

interface ParticleHeroProps {
  className?: string
  style?: React.CSSProperties
}

export default function ParticleHero({
  className = "",
  style = {},
}: ParticleHeroProps) {
  return (
    <Particles
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
      quantity={80}
      color="#c9a84c"
      size={0.8}
      staticity={70}
      ease={60}
      vx={0}
      vy={0}
    />
  )
}
