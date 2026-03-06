import { useEffect, useRef } from "react";

interface ParticleHeroProps {
    className?: string;
    style?: React.CSSProperties;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    targetOpacity: number;
    color: string;
    life: number;
    maxLife: number;
}

const COLORS = [
    "rgba(17,19,23,",
    "rgba(17,19,23,",
    "rgba(17,19,23,",
    "rgba(201,168,76,",
    "rgba(17,19,23,",
];

export default function ParticleHero({ className = "", style = {} }: ParticleHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 });
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize, { passive: true });

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMouseLeave = () => { mouse.current = { x: -1000, y: -1000 }; };
        canvas.addEventListener("mousemove", onMouseMove, { passive: true });
        canvas.addEventListener("mouseleave", onMouseLeave);

        // Seed initial particles
        const COUNT = 80;
        particles.current = Array.from({ length: COUNT }, () => spawnParticle(canvas));

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        function spawnParticle(c: HTMLCanvasElement): Particle {
            const w = c.offsetWidth;
            const h = c.offsetHeight;
            const maxLife = 200 + Math.random() * 300;
            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                size: 1.5 + Math.random() * 3.5,
                opacity: 0,
                targetOpacity: 0.1 + Math.random() * 0.25,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                life: 0,
                maxLife,
            };
        }

        function drawParticle(p: Particle) {
            const alpha = p.opacity * (p.life < 30 ? p.life / 30 : p.life > p.maxLife - 40 ? (p.maxLife - p.life) / 40 : 1);
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx!.fillStyle = p.color + alpha.toFixed(3) + ")";
            ctx!.fill();
        }

        function drawConnections(dt: number) {
            const ps = particles.current;
            for (let i = 0; i < ps.length; i++) {
                for (let j = i + 1; j < ps.length; j++) {
                    const dx = ps[i].x - ps[j].x;
                    const dy = ps[i].y - ps[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const alpha = (1 - dist / 100) * 0.07;
                        ctx!.beginPath();
                        ctx!.moveTo(ps[i].x, ps[i].y);
                        ctx!.lineTo(ps[j].x, ps[j].y);
                        ctx!.strokeStyle = `rgba(17,19,23,${alpha.toFixed(3)})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.stroke();
                    }
                }
            }
        }

        const animate = () => {
            timeRef.current++;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            ctx!.clearRect(0, 0, w, h);

            // Draw connections
            drawConnections(timeRef.current);

            // Update and draw particles
            particles.current = particles.current.map((p) => {
                p.life++;

                // Mouse repulsion
                const mx = mouse.current.x;
                const my = mouse.current.y;
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (1 - dist / 120) * 0.6;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                // Gentle wave field
                const wave = Math.sin(timeRef.current * 0.008 + p.x * 0.012) * 0.04;
                p.vx += wave;
                p.vy += Math.cos(timeRef.current * 0.006 + p.y * 0.009) * 0.025;

                // Dampen
                p.vx *= 0.97;
                p.vy *= 0.97;

                p.x += p.vx;
                p.y += p.vy;

                // Opacity lerp
                p.opacity = lerp(p.opacity, p.targetOpacity, 0.04);

                // Respawn at edges
                if (p.x < -20) { p.x = w + 20; p.life = 0; }
                if (p.x > w + 20) { p.x = -20; p.life = 0; }
                if (p.y < -20) { p.y = h + 20; p.life = 0; }
                if (p.y > h + 20) { p.y = -20; p.life = 0; }

                // Respawn dead particles
                if (p.life > p.maxLife) return spawnParticle(canvas);

                drawParticle(p);
                return p;
            });

            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ display: "block", width: "100%", height: "100%", ...style }}
        />
    );
}
