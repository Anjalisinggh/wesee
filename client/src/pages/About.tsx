import { useEffect, useRef, useState } from "react";
import InteractiveParticles from "@/components/InteractiveParticles";
import StaggerReveal from "@/components/StaggerReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);




const milestones = [
  { year: "2021", title: "Founded in Japan", desc: "WeSee started as a performance marketing agency with a vision for intelligent automation." },
  { year: "2022", title: "First AI systems deployed", desc: "Shipped first AI agents and workflow automations for e-commerce and SaaS clients." },
  { year: "2023", title: "Dubai expansion", desc: "Opened MENA operations to serve regional enterprises and ambitious startups." },
  { year: "2024", title: "35+ projects, 80+ workflows", desc: "Reached critical mass — 35 full-stack projects and over 80 live automation pipelines." },
  { year: "2025", title: "Platform capabilities", desc: "Launched in-house AI stack and dedicated research function for applied LLM engineering." },
];

const values = [
  { num: "01", title: "Signal First", desc: "Every engagement begins by finding the real problem — the signal buried beneath the noise." },
  { num: "02", title: "Build to Own", desc: "We build systems clients own permanently. No vendor lock-in, ever." },
  { num: "03", title: "Outcome-Driven", desc: "We are hired for results, not deliverables. Our metrics are your metrics." },
  { num: "04", title: "Ship & Iterate", desc: "We launch fast, measure everything, and continuously refine for maximum performance." },
];

export default function About() {
  const [isTextHovered, setIsTextHovered] = useState(false);

  useEffect(() => {
    const localTriggers: ScrollTrigger[] = [];
    const t = setTimeout(() => {
      document.querySelectorAll(".gsap-reveal").forEach((el) => {
        const anim = gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
        if (anim.scrollTrigger) localTriggers.push(anim.scrollTrigger);
      });
    }, 100);
    return () => { clearTimeout(t); localTriggers.forEach(t => t.kill()); };
  }, []);

  return (
    <>
      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        minHeight: "clamp(60vh, 75vh, 90vh)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(60px, 10vw, 88px)", paddingBottom: 40,
      }}>
        <InteractiveParticles 
          style={{ position: "absolute", inset: 0, zIndex: 0 }} 
          isHovered={isTextHovered}
        />

        <div style={{
          position: "absolute",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          animation: "blob1 18s ease-in-out infinite",
        }} />

        <div className="container" style={{
          position: "relative", zIndex: 1, textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <div className="badge-pill fade-up" style={{ marginBottom: 28 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--accent)", display: "inline-block",
              animation: "glowPulse 2.5s ease infinite",
            }} />
            Founded 2021 · Japan
          </div>

          <div
            onMouseEnter={() => setIsTextHovered(true)}
            onMouseLeave={() => setIsTextHovered(false)}
            onTouchStart={() => setIsTextHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsTextHovered(false), 4000)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
          >
            <h1 
              className="fade-up" 
              style={{
                fontSize: "clamp(52px, 8vw, 100px)",
                fontWeight: 450, letterSpacing: "-0.04em", lineHeight: 1.12,
                color: "var(--ink)", maxWidth: "14ch", textAlign: "center",
                animationDelay: "0.15s", margin: 0,
              }}
            >
              We are{" "}
              <span style={{
                fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.05em",
                background: "linear-gradient(135deg, #B8922E 0%, var(--accent) 48%, #E8C870 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", backgroundSize: "200% 100%",
                animation: "textShimmer 5s ease infinite",
                paddingRight: "0.1em",
              }}>
                WeSee.
              </span>
            </h1>

            <p 
              className="fade-up" 
              style={{
                fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 400, color: "var(--ink-50)",
                marginTop: 24, maxWidth: 540, lineHeight: 1.7,
                animationDelay: "0.25s",
              }}
            >
              India's leading AI automation agency — a cross-functional team of AI engineers, operators, and growth strategists building the intelligent systems modern business runs on.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ MISSION ══════════════ */}
      <section className="section-pad" style={{ background: "var(--paper-dark)" }}>
        <div className="container">
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(28px, 5vw, 60px)", alignItems: "start",
          }}>
            <div>
              <span className="section-label gsap-reveal">(01) Our Mission</span>
              <h2 className="section-heading gsap-reveal" style={{ marginTop: 12 }}>
                Automation that changes how business works.
              </h2>
            </div>
            <div>
              <p className="body-text gsap-reveal" style={{ marginTop: 0, fontSize: 16 }}>
                At WeSee, we believe the gap between great companies and average ones is increasingly determined by how intelligently they operate. We exist to close that gap — using AI and automation to give ambitious businesses the operational leverage that was once only available to tech giants.
              </p>
              <p className="body-text gsap-reveal" style={{ marginTop: 16, fontSize: 16 }}>
                Every system we build is designed to eliminate manual work, accelerate decision-making, and create compounding business value that grows with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM PHOTO ══════════════ */}
      <section style={{ background: "var(--paper-dark)" }}>
        <div className="container" style={{ paddingBottom: 80 }}>
          <div className="img-zoom gsap-reveal" style={{ height: "clamp(220px, 40vw, 420px)", borderRadius: "24px !important" }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000&q=80"
              alt="WeSee Team"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ══════════════ TIMELINE ══════════════ */}
      <section className="section-pad" style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="section-label gsap-reveal">(02) Our Journey</span>
          <h2 className="section-heading gsap-reveal" style={{ marginTop: 12, marginBottom: 60 }}>
            Building for the long run.
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {milestones.map((m, i) => (
              <div
                key={i}
                className="gsap-reveal"
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 24,
                  paddingBottom: 36,
                  borderBottom: i < milestones.length - 1 ? "1px solid var(--ink-12)" : "none",
                  marginBottom: i < milestones.length - 1 ? 36 : 0,
                  alignItems: "start",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.04em", paddingTop: 3 }}>
                  {m.year}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                    {m.title}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-50)", lineHeight: 1.7 }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STATS — dark ══════════════ */}
      <section className="section-pad" style={{
        background: "var(--ink)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", pointerEvents: "none",
          animation: "blob2 14s ease-in-out infinite",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16,
          }}>
            {[
              { val: "35+", label: "Projects Delivered" },
              { val: "80+", label: "Automations Deployed" },
              { val: "15K+", label: "Hours Saved Monthly" },
              { val: "3", label: "Office Locations" },
            ].map((s, i) => (
              <div key={i} className="gsap-reveal" style={{
                padding: "32px 28px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px !important",
                textAlign: "center",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{
                  fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 600,
                  color: "var(--accent)", letterSpacing: "-0.05em", lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.30)", marginTop: 10, letterSpacing: "0.04em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VALUES ══════════════ */}
      <section className="section-pad" style={{ background: "var(--paper-dark)" }}>
        <div className="container">
          <span className="section-label gsap-reveal" style={{ marginBottom: 8 }}>(03) Our Values</span>
          <h2 className="section-heading gsap-reveal" style={{ marginBottom: 52, marginTop: 12 }}>
            How we operate.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {values.map((v, i) => (
              <div key={i} className="feature-card gsap-reveal" style={{ position: "relative", overflow: "hidden" }}>
                {/* Ghost number */}
                <div style={{
                  position: "absolute", right: 12, bottom: -12,
                  fontSize: 80, fontWeight: 800, color: "var(--ink)",
                  opacity: 0.035, lineHeight: 1, userSelect: "none",
                  letterSpacing: "-0.06em", pointerEvents: "none",
                }}>
                  {v.num}
                </div>

                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                  color: "var(--accent)", textTransform: "uppercase", marginBottom: 14,
                }}>
                  {v.num}
                </div>
                <h3 style={{
                  fontSize: 18, fontWeight: 550, color: "var(--ink)",
                  letterSpacing: "-0.02em", marginBottom: 10,
                }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ink-50)", lineHeight: 1.7, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
