import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SectionLabel from "@/components/SectionLabel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── 20 atmospheric Unsplash images for masonry mosaic (varied heights) ─── */
const mosaicImages = [
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", h: 380 },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80", h: 440 },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", h: 180 },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", h: 380 },
  { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80", h: 440 },
  { src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", h: 380 },
  { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80", h: 180 },
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", h: 380 },
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80", h: 440 },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", h: 180 },
  { src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80", h: 380 },
];

const heroImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

const servicesList = [
  { name: "AI Agents & Conversational AI", desc: "AI-powered agents that talk, think, and act on behalf of businesses." },
  { name: "Workflow & Business Process Automation", desc: "Connect your existing tools and eliminate manual work at scale." },
  { name: "Performance Marketing & Paid Advertising", desc: "ROI-driven advertising across Meta, Google, YouTube, and LinkedIn." },
  { name: "SEO, Content & Organic Growth", desc: "Long-term organic visibility through technical SEO and authority building." },
  { name: "Messaging, Email & Communication", desc: "Automated multi-channel communication via WhatsApp, email, and SMS." },
  { name: "Web Design, Branding & Creative", desc: "High-converting websites and brand identities designed for performance." },
  { name: "E-Commerce & Marketplace Growth", desc: "Full-stack e-commerce from store setup to marketplace management." },
  { name: "Sales, CRM & Revenue Operations", desc: "Systems that capture, nurture, convert, and retain customers." },
  { name: "Business Operations & Infrastructure", desc: "Cloud infrastructure, analytics, HR automation, and operational excellence." },
];

const offices = [
  { city: "Jaipur", label: "INDIA — HEADQUARTERS", address: ["WeSee AI Automation", "Gopalpura Bypass, Jaipur", "Rajasthan — 302018"], email: "hello@wesee.in", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80", mapUrl: "https://maps.google.com/?q=Gopalpura+Bypass+Jaipur" },
  { city: "Mumbai", label: "INDIA — OPERATIONS", address: ["WeSee AI Automation", "Bandra Kurla Complex, Mumbai", "Maharashtra — 400051"], email: "hello@wesee.in", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80", mapUrl: "https://maps.google.com/?q=Bandra+Kurla+Complex+Mumbai" },
  { city: "Dubai", label: "UAE — MENA", address: ["WeSee AI Automation", "DIFC, Dubai International Financial Centre", "Dubai, UAE"], email: "hello@wesee.in", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", mapUrl: "https://maps.google.com/?q=DIFC+Dubai" },
];

const stats = [
  { target: 12, suffix: "+", label: "AI Specialists", sub: "Engineers, strategists, and creators building the future." },
  { target: 80, suffix: "+", label: "Automations Deployed", sub: "Workflows running 24/7 for clients across industries." },
  { target: 35, suffix: "+", label: "Projects Delivered", sub: "End-to-end AI and automation projects shipped." },
  { target: 15000, suffix: "+", label: "Hours Saved Monthly", sub: "Manual work eliminated through intelligent automation.", display: "K" },
];

const clients = ["U-Factor", "Tavola", "Factorylo", "HealthTech Co", "PropNext", "EduLearn", "FinServe", "CloudStack", "RetailMax", "LegalEase", "LogiTrack", "AutoDrive", "SaaSify", "ManufactPro"];

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [openOffice, setOpenOffice] = useState<number | null>(null);
  const counterAnimated = useRef(false);

  /* GSAP scroll reveals */
  useEffect(() => {
    const reveals = document.querySelectorAll(".gsap-reveal");
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" }
        }
      );
    });

    // Hero parallax
    const heroImage = document.querySelector(".hero-parallax");
    if (heroImage) {
      gsap.to(heroImage, {
        y: -100,
        ease: "none",
        scrollTrigger: { trigger: heroImage, start: "top bottom", end: "bottom top", scrub: true }
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  /* Stats counter animation */
  useEffect(() => {
    if (!statsRef.current || counterAnimated.current) return;
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        if (counterAnimated.current) return;
        counterAnimated.current = true;
        stats.forEach((stat, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.target,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              setCounters(prev => {
                const next = [...prev];
                next[i] = Math.round(obj.val);
                return next;
              });
            }
          });
        });
      }
    });
  }, []);

  const formatCounter = (val: number, stat: typeof stats[0]) => {
    if (stat.display === "K") {
      return Math.round(val / 1000) + "K" + stat.suffix;
    }
    return val + stat.suffix;
  };

  return (
    <div>
      {/* ═══ HERO (Section 00) ═══ */}
      <section className="min-h-screen flex flex-col lg:flex-row" style={{ paddingTop: 64 }}>
        {/* Left 55% */}
        <div className="flex flex-col justify-center lg:w-[55%] px-6 md:px-20 py-16 lg:py-0">
          <SectionLabel number="00" title="WESEE.AI" />
          <h1 style={{ fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1A1A1A", marginTop: 12 }}>
            We build intelligent systems.
          </h1>
          <p className="body-text" style={{ maxWidth: 480, marginTop: 24 }}>
            Founded by operators and engineers, WeSee is a cross-functional team of AI specialists, developers, and growth strategists with one central mission: to build the most intelligent automation systems for businesses worldwide.
          </p>
          <p style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", marginTop: 24 }}>
            We are builders. We are WeSee.
          </p>
        </div>
        {/* Right 45% — atmospheric photo */}
        <div className="lg:w-[45%] relative overflow-hidden" style={{ minHeight: 400 }}>
          <img
            src={heroImg}
            alt="Atmospheric data center"
            className="hero-parallax w-full h-full object-cover"
            style={{ position: "absolute", inset: 0, width: "100%", height: "120%", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center py-8">
        <span style={{ fontSize: 11, fontWeight: 300, color: "#888888", letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: "#CCCCCC", marginTop: 8, animation: "scrollPulse 2s ease infinite" }} />
        <style>{`@keyframes scrollPulse { 0%,100% { opacity:0.3; } 50% { opacity:1; } }`}</style>
      </div>

      {/* ═══ SECTION 01 — OUR WORK ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          {/* Left 45% */}
          <div className="lg:w-[45%] gsap-reveal">
            <SectionLabel number="01" title="OUR WORK" />
            <h2 className="section-heading">We build AI that works.</h2>
            <p className="body-text" style={{ marginTop: 24 }}>
              Our work focuses on the most critical functions in today's businesses: sales and marketing automation, AI-powered customer engagement, and end-to-end workflow intelligence.
            </p>
            <p className="body-text" style={{ marginTop: 20 }}>
              We define ourselves as creators of intelligent systems: we design solutions that place the business outcome at centre stage, building AI agents and automated pipelines that drive revenue, reduce cost, and scale effortlessly.
            </p>
            <Link href="/services" className="cta-link" style={{ marginTop: 32, display: "inline-block" }}>
              View all services +
            </Link>
          </div>
          {/* Right 55% — Masonry mosaic */}
          <div className="lg:w-[55%]">
            <div className="masonry-grid gsap-reveal" style={{ columnCount: 2, columnGap: 8 }}>
              {mosaicImages.map((img, i) => (
                <div key={i} style={{ breakInside: "avoid", marginBottom: 8 }}>
                  <img src={img.src} alt="" style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIGNAL DEFINITION BLOCK ═══ */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[60%] gsap-reveal">
            <span style={{ fontSize: 13, fontWeight: 300, color: "#888888", letterSpacing: "0.1em" }}>
              Signal &nbsp;/ˈsɪɡnəl/ &nbsp;noun
            </span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.1, marginTop: 16 }}>
              The insight that transforms noise<br />into intelligence.
            </h2>
            <p className="body-text" style={{ marginTop: 24 }}>
              At WeSee, every engagement begins with finding the signal — the unique automation opportunity hidden within every client's operations. The signal is not obvious. It requires deep discovery, rigorous analysis, and bold thinking.
            </p>
            <p className="body-text" style={{ marginTop: 20 }}>
              We believe every business has a signal waiting to be found. Our job is to find it, amplify it, and build systems around it.
            </p>
          </div>
          <div className="lg:w-[40%] flex flex-col gap-2 gsap-reveal">
            <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80" alt="" style={{ width: "100%", height: 280, objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" alt="" style={{ width: "100%", height: 280, objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 02 — OUR APPROACH ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[50%] gsap-reveal">
            <SectionLabel number="02" title="OUR APPROACH" />
            <h2 className="section-heading">We find the signal.</h2>
            <p className="body-text" style={{ marginTop: 24 }}>
              A signal is the insight that transforms a manual process into an intelligent system. We strive to serve our clients by surpassing their expectations on every engagement, uncovering the unique automation opportunity.
            </p>
            {/* Approach steps */}
            <div style={{ marginTop: 40 }}>
              {[
                { num: "01", title: "Discover & Audit", body: "Through deep discovery, workflow analysis, AI model selection, and iterative testing, we uncover the automation potential within every bottleneck." },
                { num: "02", title: "Design & Build", body: "Each project is advanced by a dedicated, tight-knit team of AI engineers and strategists led by an experienced solutions architect." },
                { num: "03", title: "Deploy & Scale", body: "This integrated workflow allows us to constantly align our solutions with the client's team — from strategy and build to launch, optimization, and ongoing support." },
              ].map((step) => (
                <div key={step.num} style={{ borderTop: "1px solid #EEEEEE", padding: "20px 0" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 300, color: "#888888" }}>({step.num})</span>
                    <span style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>{step.title}</span>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 8 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2 gsap-reveal">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" alt="" style={{ width: "100%", height: 380, objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" alt="" style={{ width: "100%", height: 260, objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 03 — OUR SERVICES ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[40%] gsap-reveal">
            <SectionLabel number="03" title="OUR SERVICES" />
            <h2 className="section-heading">We do end-to-end automation.</h2>
            <p className="body-text" style={{ marginTop: 24 }}>
              9 categories of services covering every aspect of business automation — from AI agents and workflow design to performance marketing and cloud infrastructure.
            </p>
            <Link href="/services" className="cta-link" style={{ marginTop: 32, display: "inline-block" }}>
              View all services +
            </Link>
          </div>
          <div className="lg:w-[60%] relative gsap-reveal">
            {/* Square image floated top-right */}
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80"
              alt=""
              className="hidden lg:block"
              style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, objectFit: "cover", zIndex: 1 }}
            />
            <ul style={{ paddingRight: 0 }}>
              {servicesList.map((svc, i) => (
                <li key={i} style={{ borderBottom: "1px solid #EEEEEE", padding: "16px 0" }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>{svc.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: "#555555", marginTop: 4 }}>{svc.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 04 — OUR OFFICES ═══ */}
      <section className="section-padding">
        <div className="container gsap-reveal">
          <SectionLabel number="04" title="OUR OFFICES" />
          <h2 className="section-heading" style={{ marginBottom: 48 }}>Where we operate.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {offices.map((office, i) => (
              <div
                key={i}
                style={{
                  padding: 24,
                  borderTop: openOffice === i ? "2px solid #1A1A1A" : "2px solid #EEEEEE",
                  transition: "border-color 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => setOpenOffice(openOffice === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A" }}>{office.city}</div>
                    <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", marginTop: 4 }}>
                      {office.label}
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>
                    {openOffice === i ? "Close ×" : "Open +"}
                  </span>
                </div>
                <div style={{
                  maxHeight: openOffice === i ? 500 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                  marginTop: openOffice === i ? 16 : 0,
                }}>
                  {office.address.map((line, j) => (
                    <div key={j} style={{ fontSize: 14, color: "#3A3A3A", lineHeight: 1.6 }}>{line}</div>
                  ))}
                  <div style={{ fontSize: 14, color: "#3A3A3A", marginTop: 8 }}>{office.email}</div>
                  <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="cta-link" style={{ marginTop: 12, display: "inline-block" }}>
                    View map +
                  </a>
                  <img src={office.img} alt={office.city} style={{ width: "100%", height: 200, objectFit: "cover", marginTop: 16 }} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 05 — OUR IMPACT (Stats) ═══ */}
      <section className="section-padding" ref={statsRef}>
        <div className="container">
          <SectionLabel number="05" title="OUR IMPACT" />
          <h2 className="section-heading">Numbers that speak for themselves.</h2>
          <p className="body-text" style={{ marginTop: 24, maxWidth: 640 }}>
            Since founding WeSee, we have deployed automation systems that run continuously, saving thousands of hours and driving measurable revenue growth for our clients.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" style={{ marginTop: 64 }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 72, fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>
                  {formatCounter(counters[i], stat)}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginTop: 8 }}>{stat.label}</div>
                <div style={{ fontSize: 13, fontWeight: 400, color: "#555555", marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Full-width atmospheric image */}
        <div className="overflow-hidden" style={{ marginTop: 80 }}>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&q=80"
            alt=""
            style={{ width: "100%", height: 400, objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </section>

      {/* ═══ SECTION 06 — OUR TEAM ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[40%] gsap-reveal">
            <SectionLabel number="06" title="OUR TEAM" />
            <h2 className="section-heading">We are a team of builders.</h2>
            <p className="body-text" style={{ marginTop: 24 }}>
              To work at WeSee means to build intelligent systems in an ambitious and relentless spirit — transcending industries and disciplines. WeSee embraces equal opportunity and welcomes diverse thinkers, builders, and creators from every background.
            </p>
            <p className="body-text" style={{ marginTop: 20 }}>
              As we grow, we remain obsessed with learning and committed to developing each team member into a world-class AI and automation specialist.
            </p>
            <div className="flex flex-col gap-3" style={{ marginTop: 32 }}>
              <Link href="/team" className="cta-link">Meet the team +</Link>
              <Link href="/careers" className="cta-link">View careers +</Link>
            </div>
          </div>
          <div className="lg:w-[60%] gsap-reveal">
            <div className="grid grid-cols-2 gap-2">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="" style={{ width: "100%", height: 320, objectFit: "cover" }} />
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80" alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80" alt="" style={{ width: "100%", height: 320, objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 07 — OUR CLIENTS ═══ */}
      <section className="section-padding">
        <div className="container gsap-reveal">
          <SectionLabel number="07" title="OUR CLIENTS" />
          <h2 className="section-heading">We partner with ambitious businesses.</h2>
          <p className="body-text" style={{ marginTop: 24, maxWidth: 640 }}>
            We share our clients' vision to build intelligent, scalable businesses that positively impact the customers they serve and the markets they operate in.
          </p>
        </div>
        {/* Marquee row 1 — SVG wordmark logos */}
        <div className="overflow-hidden" style={{ marginTop: 48 }}>
          <div className="animate-marquee-left flex items-center" style={{ width: "max-content" }}>
            {[...clients, ...clients].map((name, i) => (
              <div key={i} className="flex-shrink-0 px-10 py-4" style={{ opacity: 0.5, transition: "opacity 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                <svg width={name.length * 10 + 40} height="32" viewBox={`0 0 ${name.length * 10 + 40} 32`} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="16" fill="#3A3A3A" letterSpacing="0.05em">{name}</text>
                </svg>
              </div>
            ))}
          </div>
        </div>
        {/* Marquee row 2 (reverse) — SVG wordmark logos */}
        <div className="overflow-hidden" style={{ marginTop: 8 }}>
          <div className="animate-marquee-right flex items-center" style={{ width: "max-content" }}>
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((name, i) => (
              <div key={i} className="flex-shrink-0 px-10 py-4" style={{ opacity: 0.5, transition: "opacity 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                <svg width={name.length * 10 + 40} height="32" viewBox={`0 0 ${name.length * 10 + 40} 32`} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="16" fill="#3A3A3A" letterSpacing="0.05em">{name}</text>
                </svg>
              </div>
            ))}
          </div>
        </div>
        {/* Full-width atmospheric image after marquee */}
        <div className="overflow-hidden" style={{ marginTop: 48 }}>
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80"
            alt=""
            style={{ width: "100%", height: 360, objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </section>

      {/* ═══ SECTION 08 — CTA / GET STARTED ═══ */}
      <section style={{ background: "#1A1A1A", padding: "120px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>
            Ready to automate your business?
          </h2>
          <p style={{ fontSize: 16, fontWeight: 400, color: "#AAAAAA", marginTop: 24, maxWidth: 640, marginLeft: "auto", marginRight: "auto", lineHeight: 1.75 }}>
            Combining deep AI expertise with business acumen, we take your bottlenecks and transform them into high-performing, automated workflows. Book a free discovery call — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ marginTop: 40 }}>
            <a
              href="https://cal.com/wesee/discovery"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "16px 32px", background: "#FFFFFF", color: "#1A1A1A", fontSize: 13, fontWeight: 500, textDecoration: "none" }}
            >
              Book a Discovery Call ↗
            </a>
            <a href="mailto:hello@wesee.in" style={{ fontSize: 13, fontWeight: 500, color: "#FFFFFF", textDecoration: "none" }}>
              hello@wesee.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
