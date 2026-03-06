import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import ParticleHero from "@/components/ParticleHero";
import StaggerReveal from "@/components/StaggerReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Dynamic hero words ──────────────────────────────────────── */
const HERO_WORDS = [
  "intelligent",
  "automated",
  "revenue-driven",
  "scalable",
  "AI-powered",
  "high-converting",
  "future-ready",
  "unstoppable",
];

/* ─── Data ────────────────────────────────────────────────────── */

const services = [
  { num: "01", name: "AI Agents & Conversational AI", desc: "AI-powered agents that talk, think, and act on behalf of businesses.", href: "/services?category=1" },
  { num: "02", name: "Workflow & Business Process Automation", desc: "Connect your existing tools and eliminate manual work at scale.", href: "/services?category=2" },
  { num: "03", name: "Performance Marketing & Paid Advertising", desc: "ROI-driven advertising across Meta, Google, YouTube, and LinkedIn.", href: "/services?category=3" },
  { num: "04", name: "SEO, Content & Organic Growth", desc: "Long-term organic visibility through technical SEO and authority building.", href: "/services?category=4" },
  { num: "05", name: "Messaging, Email & Communication", desc: "Automated multi-channel communication via WhatsApp, email, and SMS.", href: "/services?category=5" },
  { num: "06", name: "Web Design, Branding & Creative", desc: "High-converting websites and brand identities designed for performance.", href: "/services?category=6" },
  { num: "07", name: "E-Commerce & Marketplace Growth", desc: "Full-stack e-commerce from store setup to marketplace management.", href: "/services?category=7" },
  { num: "08", name: "Sales, CRM & Revenue Operations", desc: "Systems that capture, nurture, convert, and retain customers.", href: "/services?category=8" },
  { num: "09", name: "Business Operations & Infrastructure", desc: "Cloud infrastructure, analytics, HR automation, and operational excellence.", href: "/services?category=9" },
];

const clients = [
  "U-Factor", "Tavola", "Factorylo", "HealthTech Co", "PropNext", "EduLearn",
  "FinServe", "CloudStack", "RetailMax", "LegalEase", "LogiTrack", "AutoDrive",
  "StartupX", "MedConnect", "GreenEnergy", "FintechNow",
];

const stats = [
  { display: "35+", label: "Projects Delivered", sub: "End-to-end AI systems shipped" },
  { display: "80+", label: "Automations Deployed", sub: "Workflows running 24/7" },
  { display: "15K+", label: "Hours Saved Monthly", sub: "Manual work eliminated" },
  { display: "12+", label: "AI Specialists", sub: "Engineers & strategists" },
];

const features = [
  { icon: "◆", title: "AI Agents", desc: "Conversational agents that talk, think, and act — fully integrated into your stack." },
  { icon: "⟲", title: "Workflow Automation", desc: "End-to-end process automation that eliminates manual work at any scale." },
  { icon: "◎", title: "Growth Systems", desc: "Performance marketing, SEO, and revenue operations working as one engine." },
  { icon: "⬡", title: "Infrastructure", desc: "The cloud, data, and operational backbone that modern businesses run on." },
];

const workImages = [
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", h: 220, label: "AI Infrastructure" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", h: 160, label: "Workspace" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", h: 160, label: "Operations" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80", h: 220, label: "Tech Systems" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", h: 190, label: "Team at Work" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", h: 190, label: "Cloud Scale" },
];

/* ─── Component ───────────────────────────────────────────────── */

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  /* Cycle hero headline word every 5s */
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex(i => (i + 1) % HERO_WORDS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* GSAP scroll reveals */
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, 160);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 72,
        paddingBottom: 60,
        background: "var(--paper)",
      }}>
        {/* Particle canvas */}
        <ParticleHero style={{ position: "absolute", inset: 0, zIndex: 0 }} />

        {/* Warm radial halo */}
        <div style={{
          position: "absolute", pointerEvents: "none", zIndex: 0,
          width: 1000, height: 1000, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-55%)",
          animation: "blob1 20s ease-in-out infinite",
        }} />

        {/* — Main content — */}
        <div className="container" style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center",
        }}>
          {/* Pill badge */}
          <div
            className="fade-up"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px 6px 10px",
              background: "rgba(255,255,255,0.80)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(17,19,23,0.09)",
              borderRadius: 999,
              fontSize: 12.5, fontWeight: 500,
              color: "rgba(17,19,23,0.55)",
              letterSpacing: "0.01em",
              marginBottom: 30,
              animationDelay: "0.1s",
            }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 22, height: 22, borderRadius: 999,
              background: "rgba(201,168,76,0.15)",
              fontSize: 10, color: "var(--accent)",
            }}>✦</span>
            India's leading AI Automation Agency
          </div>

          {/* Hero headline — 3 lines */}
          <h1
            className="fade-up"
            style={{
              margin: 0,
              fontSize: "clamp(52px, 7.5vw, 102px)",
              fontWeight: 450,
              letterSpacing: "-0.04em",
              lineHeight: 1.03,
              color: "var(--ink)",
              maxWidth: 1100,
              animationDelay: "0.18s",
            }}
          >
            We build{" "}
            {/* Dynamic animated word */}
            <span style={{ display: "inline-block", position: "relative", overflow: "visible", verticalAlign: "bottom" }}>
              <style>{`
                @keyframes wordFlipIn {
                  0%   { opacity: 0; transform: translateY(60%) skewY(4deg); }
                  100% { opacity: 1; transform: translateY(0%)  skewY(0deg); }
                }
                .hero-word-anim {
                  display: inline-block;
                  animation: wordFlipIn 0.52s cubic-bezier(0.16,1,0.3,1) both;
                  font-style: italic;
                  font-weight: 300;
                  background: linear-gradient(110deg, #9C7A1E 0%, #C9A84C 40%, #E8C870 65%, #C9A84C 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  background-size: 200% auto;
                  animation: wordFlipIn 0.52s cubic-bezier(0.16,1,0.3,1) both, textShimmer 6s ease infinite;
                  letter-spacing: -0.045em;
                  padding-right: 0.12em;
                  padding-bottom: 0.08em;
                }
              `}</style>
              <span
                key={wordIndex}
                className="hero-word-anim"
              >
                {HERO_WORDS[wordIndex]}
              </span>
            </span>
            <br />
            systems.
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              fontWeight: 400,
              color: "rgba(17,19,23,0.48)",
              marginTop: 22,
              maxWidth: 500,
              lineHeight: 1.72,
              animationDelay: "0.27s",
            }}
          >
            A cross-functional team of AI specialists, developers, and growth
            strategists — building automation systems that drive revenue and
            scale effortlessly.
          </p>

          {/* CTA row */}
          <div
            className="fade-up"
            style={{
              display: "flex", gap: 10, marginTop: 36,
              flexWrap: "wrap", justifyContent: "center",
              animationDelay: "0.35s",
            }}
          >
            <a
              href="https://cal.com/wesee/discovery"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "13px 26px",
                background: "var(--ink)",
                color: "#fff",
                fontSize: 13.5, fontWeight: 500,
                borderRadius: 999, border: "none",
                textDecoration: "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(17,19,23,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Book a Discovery Call
              <span style={{ fontSize: 11, opacity: 0.7 }}>↗</span>
            </a>
            <Link href="/services" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "12px 22px",
              background: "rgba(255,255,255,0.80)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              color: "var(--ink)",
              fontSize: 13.5, fontWeight: 450,
              borderRadius: 999, border: "1px solid rgba(17,19,23,0.11)",
              textDecoration: "none",
              transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              cursor: "none",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.95)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.80)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Explore Services
            </Link>
          </div>

          {/* Mini stat row */}
          <div
            className="fade-up"
            style={{
              display: "flex", gap: 8, marginTop: 56,
              flexWrap: "wrap", justifyContent: "center",
              animationDelay: "0.44s",
            }}
          >
            {[
              { val: "35+", label: "Projects" },
              { val: "80+", label: "Automations" },
              { val: "15K+", label: "Hours Saved / Month" },
            ].map((s) => (
              <div key={s.label} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "14px 24px",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.90)",
                borderRadius: 16,
                boxShadow: "0 2px 16px rgba(17,19,23,0.06)",
                minWidth: 110,
              }}>
                <span style={{ fontSize: 22, fontWeight: 650, color: "var(--ink)", letterSpacing: "-0.045em", lineHeight: 1 }}>
                  {s.val}
                </span>
                <span style={{ fontSize: 10.5, color: "rgba(17,19,23,0.35)", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          zIndex: 1, opacity: 0.4,
        }}>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink)" }}>scroll</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, var(--ink), transparent)", animation: "scrollPulse 2s ease infinite", transformOrigin: "top" }} />
        </div>
      </section>

      {/* ══════════════════════════ WHAT WE DO ══════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--paper-dark)" }}>
        <div className="container">
          {/* Header */}
          <div className="sr" style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>What we do</div>
            <h2 style={{
              fontSize: "clamp(30px, 3.8vw, 50px)", fontWeight: 450,
              letterSpacing: "-0.03em", color: "var(--ink)",
              marginTop: 12, lineHeight: 1.1, maxWidth: "30ch", margin: "12px auto 0",
            }}>
              End-to-end automation for modern businesses.
            </h2>
          </div>

          {/* 4 feature cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}>
            {features.map((f, i) => (
              <div key={i} className="sr feature-card" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                {/* Icon */}
                <div style={{
                  width: 46, height: 46,
                  background: "rgba(201,168,76,0.10)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "var(--accent)",
                  marginBottom: 22,
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontSize: 17, fontWeight: 580,
                  color: "var(--ink)", letterSpacing: "-0.025em",
                  marginBottom: 10, lineHeight: 1.2,
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(17,19,23,0.48)", lineHeight: 1.72, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ OUR WORK ══════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="max-lg:grid-cols-1">
              {/* Text col */}
              <div>
                <div className="section-label sr">Our Work</div>
                <h2 className="sr" style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 450,
                  letterSpacing: "-0.03em", marginTop: 12, lineHeight: 1.1,
                }}>
                  We build AI that works<em style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(17,19,23,0.45)" }}>.</em>
                </h2>
                <p className="sr" style={{ fontSize: 15, color: "rgba(17,19,23,0.50)", lineHeight: 1.8, marginTop: 20 }}>
                  Our work focuses on the most critical functions in today's businesses — sales automation, AI-powered customer engagement, and end-to-end workflow intelligence.
                </p>
                <p className="sr" style={{ fontSize: 15, color: "rgba(17,19,23,0.50)", lineHeight: 1.8, marginTop: 14 }}>
                  We design solutions that place the business outcome at centre stage — building AI agents and automated pipelines that drive revenue, reduce cost, and scale effortlessly.
                </p>
                <Link href="/services" className="sr" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  marginTop: 32, fontSize: 13.5, fontWeight: 500,
                  color: "var(--ink)", textDecoration: "none",
                  borderBottom: "1px solid rgba(17,19,23,0.20)",
                  paddingBottom: 2,
                  transition: "border-color 0.3s ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(17,19,23,0.20)"; }}
                >
                  View all services →
                </Link>

                {/* Vertical stats */}
                <div style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 0 }}>
                  {stats.map((s, i) => (
                    <div key={i} className="sr" style={{
                      display: "flex", alignItems: "center", gap: 20,
                      padding: "18px 0",
                      borderTop: "1px solid rgba(17,19,23,0.08)",
                      borderBottom: i === stats.length - 1 ? "1px solid rgba(17,19,23,0.08)" : "none",
                    }}>
                      <span style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 650, color: "var(--accent)", letterSpacing: "-0.05em", lineHeight: 1, minWidth: 80 }}>
                        {s.display}
                      </span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 520, color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: "rgba(17,19,23,0.35)", marginTop: 2 }}>{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image mosaic */}
              <div>
                <StaggerReveal stagger={0.07} y={20}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {workImages.map((img, i) => (
                      <div key={i} style={{
                        overflow: "hidden", borderRadius: 16, height: img.h,
                        background: "#E8E8E5",
                      }}>
                        <img
                          src={img.src}
                          alt={img.label}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}
                          loading="lazy"
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                        />
                      </div>
                    ))}
                  </div>
                </StaggerReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ ABOUT / DARK ══════════════════════════ */}
      <section className="section-pad" style={{
        background: "var(--ink)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{
            position: "absolute", width: 800, height: 800, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)",
            top: "60%", left: "30%", transform: "translate(-50%,-50%)",
            animation: "blob1 18s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
            top: "20%", right: "5%",
            animation: "blob2 22s ease-in-out infinite",
          }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Big center quote */}
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 80 }}>
            <span className="sr" style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
              display: "block", marginBottom: 28,
            }}>
              Who we are
            </span>
            <h2 className="sr" style={{
              fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 400,
              letterSpacing: "-0.035em", lineHeight: 1.08, color: "#FFFFFF", margin: 0,
            }}>
              Every business has a{" "}
              <em style={{
                fontStyle: "italic", fontWeight: 300,
                background: "linear-gradient(110deg, #9C7A1E 0%, #C9A84C 45%, #E8C870 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                signal
              </em>{" "}
              waiting to be found.
            </h2>
            <p className="sr" style={{
              fontSize: 16, color: "rgba(255,255,255,0.38)",
              lineHeight: 1.82, marginTop: 26,
            }}>
              At WeSee, every engagement begins with finding the signal — the unique automation opportunity hidden within every client's operations. It requires deep discovery, rigorous analysis, and bold thinking to uncover. Our job is to find it, amplify it, and build intelligent systems around it.
            </p>
          </div>

          {/* 4-step process grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { num: "01", title: "Discover & Audit", body: "Map workflows, identify bottlenecks, find the highest-leverage automation opportunities." },
              { num: "02", title: "Design & Build", body: "Our AI engineers craft precise, scalable systems — custom-built, not out-of-the-box." },
              { num: "03", title: "Deploy & Scale", body: "Launch, monitor, and continuously improve — from first automation to enterprise scale." },
              { num: "04", title: "Owned Results", body: "You own every workflow, agent, and dataset. No vendor lock-in, ever." },
            ].map((step, i) => (
              <div key={i} className="sr" style={{
                padding: "28px 26px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                transition: "background 0.4s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14 }}>
                  ({step.num})
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 550, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: 10 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.34)", lineHeight: 1.75 }}>
                  {step.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SERVICES ══════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 48 }}>
            <div>
              <div className="section-label sr">Our Services</div>
              <h2 className="sr" style={{
                fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 450,
                letterSpacing: "-0.03em", marginTop: 10, lineHeight: 1.1,
              }}>
                9 categories of expertise.
              </h2>
            </div>
            <Link href="/services" className="sr" style={{
              fontSize: 13, fontWeight: 500, color: "rgba(17,19,23,0.48)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(17,19,23,0.15)", paddingBottom: 2,
              transition: "color 0.25s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(17,19,23,0.48)"; }}
            >
              View all →
            </Link>
          </div>

          {services.map((svc, i) => (
            <Link key={i} href={svc.href} className="sr" style={{
              display: "flex", alignItems: "flex-start",
              gap: 20, padding: "20px 0",
              borderTop: "1px solid rgba(17,19,23,0.08)",
              borderBottom: i === services.length - 1 ? "1px solid rgba(17,19,23,0.08)" : "none",
              cursor: "pointer",
              position: "relative",
              transition: "padding-left 0.4s cubic-bezier(0.16,1,0.3,1)",
              textDecoration: "none",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.paddingLeft = "12px";
                const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                if (arrow) { arrow.style.transform = "translateX(4px)"; arrow.style.color = "var(--ink)"; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.paddingLeft = "0px";
                const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                if (arrow) { arrow.style.transform = "translateX(0)"; arrow.style.color = "rgba(17,19,23,0.20)"; }
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 650, color: "var(--accent)", letterSpacing: "0.12em", paddingTop: 3.5, flexShrink: 0, width: 22 }}>
                {svc.num}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15.5, fontWeight: 520, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                  {svc.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(17,19,23,0.40)", marginTop: 3, lineHeight: 1.55 }}>
                  {svc.desc}
                </div>
              </div>
              <span className="svc-arrow" style={{
                fontSize: 15, color: "rgba(17,19,23,0.20)",
                flexShrink: 0, paddingTop: 2,
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.25s ease",
                display: "block",
              }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ CLIENTS MARQUEE ══════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--paper-dark)", overflow: "hidden" }}>
        <div className="container" style={{ marginBottom: 52 }}>
          <div className="sr" style={{ textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Our Clients</div>
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 450,
              letterSpacing: "-0.03em", marginTop: 12, lineHeight: 1.1,
            }}>
              We partner with ambitious businesses.
            </h2>
          </div>
        </div>

        {[clients, [...clients].reverse()].map((list, row) => (
          <div key={row} style={{ overflow: "hidden", marginBottom: row === 0 ? 10 : 0 }}>
            <div
              style={{ display: "flex", gap: 8, width: "max-content" }}
              className={row === 0 ? "animate-marquee-left" : "animate-marquee-right"}
            >
              {[...list, ...list, ...list].map((name, i) => (
                <div key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "9px 20px",
                  background: row === 0 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.42)",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(17,19,23,0.09)",
                  borderRadius: 999,
                  fontSize: 13, fontWeight: 450, color: "rgba(17,19,23,0.70)",
                  whiteSpace: "nowrap",
                  transition: "background 0.3s ease, transform 0.3s ease",
                }}>
                  <span style={{
                    width: i % 5 === 0 ? 7 : 5,
                    height: i % 5 === 0 ? 7 : 5,
                    borderRadius: "50%",
                    background: i % 5 === 0 ? "var(--accent)" : "rgba(17,19,23,0.18)",
                    display: "inline-block", flexShrink: 0,
                  }} />
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ══════════════════════════ DARK CTA ══════════════════════════ */}
      <section className="section-pad" style={{
        background: "var(--ink)", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", width: 800, height: 800, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 60%)",
            top: "50%", left: "38%", transform: "translate(-50%,-50%)",
            animation: "blob1 14s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 60%)",
            top: "20%", right: "-5%",
            animation: "blob2 18s ease-in-out infinite",
          }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="sr" style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--accent)", display: "block", marginBottom: 24,
          }}>Get started</span>

          <h2 className="sr" style={{
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 400, letterSpacing: "-0.04em",
            lineHeight: 1.06, color: "#FFFFFF",
            margin: "0 auto", maxWidth: "18ch",
          }}>
            Ready to automate your{" "}
            <em style={{
              fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.05em",
              background: "linear-gradient(110deg, #9C7A1E 0%, #C9A84C 45%, #E8C870 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>business?</em>
          </h2>

          <p className="sr" style={{
            fontSize: 16, color: "rgba(255,255,255,0.35)",
            marginTop: 22, maxWidth: 500, marginInline: "auto", lineHeight: 1.80,
          }}>
            Combining deep AI expertise with business acumen, we transform your bottlenecks into high-performing automated workflows. Book a free discovery call — no commitment required.
          </p>

          <div className="sr" style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
            <a
              href="https://cal.com/wesee/discovery"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "14px 28px",
                background: "#FFFFFF", color: "var(--ink)",
                fontSize: 14, fontWeight: 500,
                borderRadius: 999, border: "none",
                textDecoration: "none", cursor: "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Book a Discovery Call <span style={{ fontSize: 11, opacity: 0.6 }}>↗</span>
            </a>
            <a
              href="mailto:hello@wesee.in"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "13px 24px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.60)",
                fontSize: 14, fontWeight: 450,
                borderRadius: 999, textDecoration: "none", cursor: "none",
                transition: "background 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.90)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.60)";
              }}
            >
              hello@wesee.in
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
