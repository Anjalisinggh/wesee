import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import ImageReveal from "@/components/ImageReveal";
import FloatingParticles from "@/components/FloatingParticles";
import HoverImageCard from "@/components/HoverImageCard";
import TiltCard from "@/components/TiltCard";
import StaggerReveal from "@/components/StaggerReveal";
import MagneticButton from "@/components/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Mosaic images — compact 12-image grid ─── */
const mosaicImages = [
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", h: 260 },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", h: 180 },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", h: 160 },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", h: 260 },
  { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80", h: 180 },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80", h: 220 },
  { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80", h: 300 },
  { src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80", h: 180 },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", h: 260 },
];

const heroImg = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/hero-main-EYmEruLfX9kLiaB8c2qnGz.webp";

const servicesList = [
  { name: "AI Agents & Conversational AI", desc: "AI-powered agents that talk, think, and act on behalf of businesses.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80" },
  { name: "Workflow & Business Process Automation", desc: "Connect your existing tools and eliminate manual work at scale.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { name: "Performance Marketing & Paid Advertising", desc: "ROI-driven advertising across Meta, Google, YouTube, and LinkedIn.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
  { name: "SEO, Content & Organic Growth", desc: "Long-term organic visibility through technical SEO and authority building.", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80" },
  { name: "Messaging, Email & Communication", desc: "Automated multi-channel communication via WhatsApp, email, and SMS.", img: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80" },
  { name: "Web Design, Branding & Creative", desc: "High-converting websites and brand identities designed for performance.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
  { name: "E-Commerce & Marketplace Growth", desc: "Full-stack e-commerce from store setup to marketplace management.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" },
  { name: "Sales, CRM & Revenue Operations", desc: "Systems that capture, nurture, convert, and retain customers.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" },
  { name: "Business Operations & Infrastructure", desc: "Cloud infrastructure, analytics, HR automation, and operational excellence.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
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
  { target: 15000, suffix: "+", label: "Hours Saved Monthly", sub: "Manual work eliminated through intelligent automation.", display: "K" as const },
];

const clients = ["U-Factor", "Tavola", "Factorylo", "HealthTech Co", "PropNext", "EduLearn", "FinServe", "CloudStack", "RetailMax", "LegalEase", "LogiTrack", "AutoDrive", "SaaSify", "ManufactPro"];

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [openOffice, setOpenOffice] = useState<number | null>(null);
  const counterAnimated = useRef(false);
  const [countersDone, setCountersDone] = useState(false);

  /* GSAP scroll reveals for elements that still use gsap-reveal class */
  useEffect(() => {
    const reveals = document.querySelectorAll(".gsap-reveal");
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  /* Stats counter with spring overshoot */
  useEffect(() => {
    if (!statsRef.current || counterAnimated.current) return;
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        if (counterAnimated.current) return;
        counterAnimated.current = true;
        let completed = 0;
        stats.forEach((stat, i) => {
          const obj = { val: 0 };
          // Overshoot target by 8%, then settle back
          const overshoot = stat.target * 1.08;
          gsap.to(obj, {
            val: overshoot,
            duration: 2.0,
            ease: "power2.out",
            onUpdate: () => {
              setCounters(prev => {
                const next = [...prev];
                next[i] = Math.round(obj.val);
                return next;
              });
            },
            onComplete: () => {
              // Settle back to actual target
              gsap.to(obj, {
                val: stat.target,
                duration: 0.4,
                ease: "power2.inOut",
                onUpdate: () => {
                  setCounters(prev => {
                    const next = [...prev];
                    next[i] = Math.round(obj.val);
                    return next;
                  });
                },
                onComplete: () => {
                  completed++;
                  if (completed === stats.length) setCountersDone(true);
                }
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
      <section className="min-h-screen flex flex-col lg:flex-row relative" style={{ paddingTop: 64 }}>
        {/* Floating particles in hero */}
        <FloatingParticles count={35} color="rgba(26, 26, 26, 0.04)" maxSize={2.5} speed={0.2} />

        {/* Left 55% */}
        <div className="flex flex-col justify-center lg:w-[55%] px-6 md:px-20 py-16 lg:py-0 relative z-10">
          <SectionLabel number="00" title="WESEE.AI" />
          <TextReveal
            as="h1"
            style={{ fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1A1A1A", marginTop: 12 }}
            stagger={0.06}
            delay={0.2}
            onScroll={false}
          >
            We build intelligent systems.
          </TextReveal>
          <p className="body-text gsap-reveal" style={{ maxWidth: 480, marginTop: 24 }}>
            Founded by operators and engineers, WeSee is a cross-functional team of AI specialists, developers, and growth strategists with one central mission: to build the most intelligent automation systems for businesses worldwide.
          </p>
          <p className="gsap-reveal" style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", marginTop: 24 }}>
            We are builders. We are WeSee.
          </p>
        </div>
        {/* Right 45% — atmospheric photo with parallax */}
        <div className="lg:w-[45%] relative overflow-hidden" style={{ minHeight: 400 }}>
          <ImageReveal
            src={heroImg}
            alt="Atmospheric data center"
            direction="right"
            delay={0.4}
            duration={1.4}
            parallax
            parallaxAmount={80}
            zoom={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center py-8 gsap-reveal">
        <span style={{ fontSize: 11, fontWeight: 300, color: "#888888", letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: "#CCCCCC", marginTop: 8, animation: "scrollPulse 2s ease infinite", transformOrigin: "top" }} />
      </div>

      {/* ═══ SECTION 01 — OUR WORK ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          {/* Left 45% */}
          <div className="lg:w-[45%]">
            <SectionLabel number="01" title="OUR WORK" />
            <TextReveal as="h2" className="section-heading" stagger={0.05}>
              We build AI that works.
            </TextReveal>
            <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>
              Our work focuses on the most critical functions in today's businesses: sales and marketing automation, AI-powered customer engagement, and end-to-end workflow intelligence.
            </p>
            <p className="body-text gsap-reveal" style={{ marginTop: 20 }}>
              We define ourselves as creators of intelligent systems: we design solutions that place the business outcome at centre stage, building AI agents and automated pipelines that drive revenue, reduce cost, and scale effortlessly.
            </p>
            <Link href="/services" className="cta-link gsap-reveal" style={{ marginTop: 32, display: "inline-block" }}>
              View all services +
            </Link>
          </div>
          {/* Right 55% — Masonry mosaic with staggered clip-path reveals */}
          <div className="lg:w-[55%]">
            <StaggerReveal stagger={0.06} y={30}>
              <div style={{ columnCount: 2, columnGap: 8 }}>
                {mosaicImages.map((img, i) => (
                  <div key={i} className="img-hover-zoom" style={{ breakInside: "avoid", marginBottom: 8 }}>
                    <img src={img.src} alt="" style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} loading="lazy" />
                  </div>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ═══ SIGNAL DEFINITION BLOCK ═══ */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[60%]">
            <span className="gsap-reveal" style={{ fontSize: 13, fontWeight: 300, color: "#888888", letterSpacing: "0.1em" }}>
              SIGNAL /ˈsɪɡ.nəl/ — noun
            </span>
            <TextReveal
              as="h2"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.1, marginTop: 16 }}
              stagger={0.04}
            >
              The insight that transforms noise into intelligence.
            </TextReveal>
            <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>
              At WeSee, every engagement begins with finding the signal — the unique automation opportunity hidden within every client's operations. The signal is not obvious. It requires deep discovery, rigorous analysis, and bold thinking.
            </p>
            <p className="body-text gsap-reveal" style={{ marginTop: 20 }}>
              We believe every business has a signal waiting to be found. Our job is to find it, amplify it, and build systems around it.
            </p>
          </div>
          <div className="lg:w-[40%] flex flex-col gap-2">
            <ImageReveal src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80" alt="" direction="up" delay={0.1} style={{ height: 280 }} />
            <ImageReveal src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" alt="" direction="up" delay={0.3} style={{ height: 280 }} />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 02 — OUR APPROACH ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[50%]">
            <SectionLabel number="02" title="OUR APPROACH" />
            <TextReveal as="h2" className="section-heading" stagger={0.05}>
              We find the signal.
            </TextReveal>
            <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>
              A signal is the insight that transforms a manual process into an intelligent system. We strive to serve our clients by surpassing their expectations on every engagement, uncovering the unique automation opportunity.
            </p>
            {/* Approach steps with 3D tilt */}
            <StaggerReveal stagger={0.12} y={20} style={{ marginTop: 40 }}>
              {[
                { num: "01", title: "Discover & Audit", body: "Through deep discovery, workflow analysis, AI model selection, and iterative testing, we uncover the automation potential within every bottleneck." },
                { num: "02", title: "Design & Build", body: "Each project is advanced by a dedicated, tight-knit team of AI engineers and strategists led by an experienced solutions architect." },
                { num: "03", title: "Deploy & Scale", body: "This integrated workflow allows us to constantly align our solutions with the client's team — from strategy and build to launch, optimization, and ongoing support." },
              ].map((step) => (
                <TiltCard key={step.num} maxTilt={4} scale={1.01} style={{ borderTop: "1px solid #EEEEEE", padding: "20px 0" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 300, color: "#888888" }}>({step.num})</span>
                    <span style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>{step.title}</span>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 8 }}>
                    {step.body}
                  </p>
                </TiltCard>
              ))}
            </StaggerReveal>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2">
            <ImageReveal src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" alt="" direction="right" delay={0.1} style={{ height: 380 }} />
            <ImageReveal src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" alt="" direction="right" delay={0.3} style={{ height: 260 }} />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 03 — OUR SERVICES ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[40%]">
            <SectionLabel number="03" title="OUR SERVICES" />
            <TextReveal as="h2" className="section-heading" stagger={0.05}>
              We do end-to-end automation.
            </TextReveal>
            <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>
              9 categories of services covering every aspect of business automation — from AI agents and workflow design to performance marketing and cloud infrastructure.
            </p>
            <Link href="/services" className="cta-link gsap-reveal" style={{ marginTop: 32, display: "inline-block" }}>
              View all services +
            </Link>
          </div>
          <div className="lg:w-[60%] relative">
            {/* Square image floated top-right */}
            <ImageReveal
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/services-overview-MKssnVPKBFuLmrRAJKBbWp.webp"
              alt=""
              direction="left"
              className="hidden lg:block"
              style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, zIndex: 1 }}
              zoom={false}
            />
            {/* Service list with hover image thumbnail */}
            <StaggerReveal stagger={0.06} y={15}>
              {servicesList.map((svc, i) => (
                <HoverImageCard key={i} imageSrc={svc.img}>
                  <div className="service-row-hover" style={{ borderBottom: "1px solid #EEEEEE", padding: "16px 0" }}>
                    <div style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", transition: "transform 0.3s ease" }}>{svc.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 400, color: "#555555", marginTop: 4 }}>{svc.desc}</div>
                  </div>
                </HoverImageCard>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 04 — OUR OFFICES ═══ */}
      <section className="section-padding">
        <div className="container">
          <SectionLabel number="04" title="OUR OFFICES" />
          <TextReveal as="h2" className="section-heading" style={{ marginBottom: 48 }} stagger={0.05}>
            Where we operate.
          </TextReveal>
          <StaggerReveal stagger={0.1} childSelector=".office-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {offices.map((office, i) => (
                <div
                  key={i}
                  className="office-card"
                  style={{
                    padding: 24,
                    borderTop: openOffice === i ? "2px solid #1A1A1A" : "2px solid #EEEEEE",
                    transition: "border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
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
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1A1A1A",
                        transition: "transform 0.3s ease",
                        transform: openOffice === i ? "rotate(45deg)" : "rotate(0)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: openOffice === i ? 500 : 0,
                      opacity: openOffice === i ? 1 : 0,
                      marginTop: openOffice === i ? 16 : 0,
                    }}
                  >
                    {office.address.map((line, j) => (
                      <div key={j} style={{ fontSize: 14, color: "#3A3A3A", lineHeight: 1.6 }}>{line}</div>
                    ))}
                    <div style={{ fontSize: 14, color: "#3A3A3A", marginTop: 8 }}>{office.email}</div>
                    <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="cta-link" style={{ marginTop: 12, display: "inline-block" }}>
                      View map +
                    </a>
                    <div className="img-hover-zoom" style={{ marginTop: 16 }}>
                      <img src={office.img} alt={office.city} style={{ width: "100%", height: 200, objectFit: "cover" }} loading="lazy" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══ SECTION 05 — OUR IMPACT (Stats) ═══ */}
      <section className="section-padding" ref={statsRef}>
        <div className="container">
          <SectionLabel number="05" title="OUR IMPACT" />
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Numbers that speak for themselves.
          </TextReveal>
          <p className="body-text gsap-reveal" style={{ marginTop: 24, maxWidth: 640 }}>
            Since founding WeSee, we have deployed automation systems that run continuously, saving thousands of hours and driving measurable revenue growth for our clients.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" style={{ marginTop: 64 }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  className={countersDone ? "counter-bounce" : ""}
                  style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                >
                  {formatCounter(counters[i], stat)}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginTop: 8 }}>{stat.label}</div>
                <div style={{ fontSize: 13, fontWeight: 400, color: "#555555", marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Full-width atmospheric image with parallax */}
        <div className="overflow-hidden" style={{ marginTop: 48 }}>
          <ImageReveal
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&q=80"
            alt=""
            direction="up"
            parallax
            parallaxAmount={40}
            zoom={false}
            style={{ width: "100%", height: 280 }}
          />
        </div>
      </section>

      {/* ═══ SECTION 06 — OUR TEAM ═══ */}
      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[40%]">
            <SectionLabel number="06" title="OUR TEAM" />
            <TextReveal as="h2" className="section-heading" stagger={0.05}>
              We are a team of builders.
            </TextReveal>
            <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>
              To work at WeSee means to build intelligent systems in an ambitious and relentless spirit — transcending industries and disciplines. WeSee embraces equal opportunity and welcomes diverse thinkers, builders, and creators from every background.
            </p>
            <p className="body-text gsap-reveal" style={{ marginTop: 20 }}>
              As we grow, we remain obsessed with learning and committed to developing each team member into a world-class AI and automation specialist.
            </p>
            <div className="flex flex-col gap-3 gsap-reveal" style={{ marginTop: 32 }}>
              <Link href="/team" className="cta-link">Meet the team +</Link>
              <Link href="/careers" className="cta-link">View careers +</Link>
            </div>
          </div>
          <div className="lg:w-[60%]">
            <div className="grid grid-cols-2 gap-2">
              <div className="overflow-hidden img-hover-zoom gsap-reveal" style={{ height: 320 }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="Team collaboration" className="grayscale-hover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="overflow-hidden img-hover-zoom gsap-reveal" style={{ height: 220 }}>
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80" alt="Team meeting" className="grayscale-hover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="overflow-hidden img-hover-zoom gsap-reveal" style={{ height: 220 }}>
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" alt="Team working" className="grayscale-hover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="overflow-hidden img-hover-zoom gsap-reveal" style={{ height: 320 }}>
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80" alt="Team strategy" className="grayscale-hover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 07 — OUR CLIENTS ═══ */}
      <section className="section-padding">
        <div className="container">
          <SectionLabel number="07" title="OUR CLIENTS" />
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            We partner with ambitious businesses.
          </TextReveal>
          <p className="body-text gsap-reveal" style={{ marginTop: 24, maxWidth: 640 }}>
            We share our clients' vision to build intelligent, scalable businesses that positively impact the customers they serve and the markets they operate in.
          </p>
        </div>
        {/* Marquee row 1 — large bold text, pauses on hover */}
        <div className="overflow-hidden" style={{ marginTop: 56 }}>
          <div className="animate-marquee-left flex items-center" style={{ width: "max-content", gap: 0 }}>
            {[...clients, ...clients, ...clients].map((name, i) => (
              <span
                key={i}
                className="flex-shrink-0 marquee-item"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  opacity: 0.25,
                  padding: "0 32px",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 0.5s ease",
                  cursor: "default",
                  letterSpacing: "-0.02em",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.letterSpacing = "0.02em"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.25"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.letterSpacing = "-0.02em"; }}
              >
                {name}
                <span style={{ opacity: 0.25, margin: "0 24px", fontWeight: 300 }}>·</span>
              </span>
            ))}
          </div>
        </div>
        {/* Marquee row 2 (reverse, slightly smaller) */}
        <div className="overflow-hidden" style={{ marginTop: 12 }}>
          <div className="animate-marquee-right flex items-center" style={{ width: "max-content", gap: 0 }}>
            {[...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()].map((name, i) => (
              <span
                key={i}
                className="flex-shrink-0 marquee-item"
                style={{
                  fontSize: "clamp(22px, 2.5vw, 36px)",
                  fontWeight: 500,
                  color: "#1A1A1A",
                  opacity: 0.18,
                  padding: "0 28px",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: "default",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.18"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {name}
                <span style={{ opacity: 0.2, margin: "0 20px", fontWeight: 300 }}>·</span>
              </span>
            ))}
          </div>
        </div>
        {/* Full-width atmospheric image */}
        <div className="overflow-hidden" style={{ marginTop: 40 }}>
          <ImageReveal
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80"
            alt=""
            direction="up"
            parallax
            parallaxAmount={30}
            zoom={false}
            style={{ width: "100%", height: 240 }}
          />
        </div>
      </section>

      {/* ═══ SECTION 08 — CTA / GET STARTED ═══ */}
      <section className="relative" style={{ background: "#1A1A1A", padding: "96px 0", overflow: "hidden" }}>
        <FloatingParticles count={30} color="rgba(255, 255, 255, 0.04)" maxSize={2} speed={0.15} />
        <div className="container relative z-10" style={{ textAlign: "center" }}>
          <TextReveal
            as="h2"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}
            stagger={0.06}
          >
            Ready to automate your business?
          </TextReveal>
          <p className="gsap-reveal" style={{ fontSize: 16, fontWeight: 400, color: "#AAAAAA", marginTop: 24, maxWidth: 640, marginLeft: "auto", marginRight: "auto", lineHeight: 1.75 }}>
            Combining deep AI expertise with business acumen, we take your bottlenecks and transform them into high-performing, automated workflows. Book a free discovery call — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 gsap-reveal" style={{ marginTop: 40 }}>
            <MagneticButton
              as="a"
              href="https://cal.com/wesee/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill-sweep-dark"
              style={{ display: "inline-block", padding: "16px 32px", background: "#FFFFFF", color: "#1A1A1A", fontSize: 13, fontWeight: 500, textDecoration: "none" }}
              strength={0.25}
            >
              Book a Discovery Call ↗
            </MagneticButton>
            <a href="mailto:hello@wesee.in" className="cta-link" style={{ fontSize: 13, fontWeight: 500, color: "#FFFFFF", textDecoration: "none" }}>
              hello@wesee.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
