import { useEffect, useMemo } from "react";

declare module "particles.js";

interface ParticleHeroProps {
    className?: string;
    style?: React.CSSProperties;
}

declare global {
    interface Window {
        particlesJS?: (tagId: string, params: unknown) => void;
        pJSDom?: Array<{
            pJS?: {
                canvas?: { el?: { id?: string } };
                fn?: { vendors?: { destroy?: () => void } };
            };
        }>;
    }
}

export default function ParticleHero({ className = "", style = {} }: ParticleHeroProps) {
    const containerId = useMemo(
        () => `particles-hero-${Math.random().toString(36).slice(2)}`,
        []
    );

    useEffect(() => {
        let destroyed = false;

        const init = async () => {
            try {
                // `particles.js` is a legacy library; depending on bundling it may attach
                // `particlesJS` to `window` OR export it from the module.
                const mod = await import("particles.js");
                if (destroyed) return;

                const particlesJS: undefined | ((tagId: string, params: unknown) => void) =
                    window.particlesJS ??
                    (mod as unknown as { particlesJS?: (tagId: string, params: unknown) => void }).particlesJS ??
                    (mod as unknown as { default?: { particlesJS?: (tagId: string, params: unknown) => void } }).default
                        ?.particlesJS ??
                    (typeof (mod as unknown as { default?: unknown }).default === "function"
                        ? ((mod as unknown as { default: (tagId: string, params: unknown) => void }).default)
                        : undefined);

                if (!particlesJS) return;

                particlesJS(containerId, {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 900 } },
                    color: { value: ["#111317", "#c9a84c"] },
                    shape: { type: "circle" },
                    opacity: { value: 0.55, random: true },
                    size: { value: 3.2, random: true },
                    line_linked: {
                        enable: true,
                        distance: 110,
                        color: "#111317",
                        opacity: 0.18,
                        width: 1,
                    },
                    move: { enable: true, speed: 0.7, direction: "none", random: true, out_mode: "out" },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: false, mode: "push" },
                        resize: true,
                    },
                    modes: {
                        repulse: { distance: 120, duration: 0.4 },
                        push: { particles_nb: 2 },
                    },
                },
                retina_detect: true,
                });

                // Ensure the injected canvas fills the container and sits behind content.
                requestAnimationFrame(() => {
                    const el = document.getElementById(containerId);
                    const canvas = el?.querySelector("canvas") as HTMLCanvasElement | null;
                    if (!canvas) return;
                    canvas.style.position = "absolute";
                    canvas.style.inset = "0";
                    canvas.style.width = "100%";
                    canvas.style.height = "100%";
                    canvas.style.zIndex = "0";
                    canvas.style.pointerEvents = "none";
                });
            } catch {
                // If the import fails, don't crash the page—just render no particles.
            }
        };

        void init();

        return () => {
            destroyed = true;
            const dom = window.pJSDom ?? [];
            const idx = dom.findIndex((d) => d?.pJS?.canvas?.el?.id === containerId);
            const inst = idx >= 0 ? dom[idx] : undefined;
            inst?.pJS?.fn?.vendors?.destroy?.();
            if (idx >= 0) dom.splice(idx, 1);
        };
    }, [containerId]);

    return (
        <div
            id={containerId}
            className={className}
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                ...style,
            }}
        />
    );
}
