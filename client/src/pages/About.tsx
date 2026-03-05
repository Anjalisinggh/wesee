import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import ImageReveal from "@/components/ImageReveal";
import TiltCard from "@/components/TiltCard";
import StaggerReveal from "@/components/StaggerReveal";
import MagneticButton from "@/components/MagneticButton";
import FloatingParticles from "@/components/FloatingParticles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 12, suffix: "+", label: "AI Specialists", sub: "Engineers, strategists, and creators building the future." },
  { target: 80, suffix: "+", label: "Automations Deployed", sub: "Workflows running 24/7 for clients across industries." },
  { target: 35, suffix: "+", label: "Projects Delivered", sub: "End-to-end AI and automation projects shipped." },
  { target: 15000, suffix: "+", label: "Hours Saved Monthly", sub: "Manual work eliminated through intelligent automation.", display: "K" as const },
];

const timeline = [
  { year: "2023", text: "WeSee founded in Jaipur, India" },
  { year: "2023", text: "First 10 clients onboarded across healthcare, real estate, and e-commerce" },
  { year: "2024", text: "Crossed 25 projects delivered milestone" },
  { year: "2024", text: "Opened Mumbai operations office" },
  { year: "2024", text: "Deployed 50+ automation workflows across client base" },
  { year: "2025", text: "Expanded to Dubai; now serving MENA enterprise clients" },
  { year: "2025", text: "Crossed 35 projects and 12 team members" },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const counterAnimated = useRef(false);
  const [countersDone, setCountersDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
        });
      });
    }, 50);
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  useEffect(() => {
    if (!statsRef.current || counterAnimated.current) return;
    ScrollTrigger.create({
      trigger: statsRef.current, start: "top 70%", once: true,
      onEnter: () => {
        if (counterAnimated.current) return;
        counterAnimated.current = true;
        let completed = 0;
        stats.forEach((stat, i) => {
          const obj = { val: 0 };
          const overshoot = stat.target * 1.08;
          gsap.to(obj, { val: overshoot, duration: 2.0, ease: "power2.out",
            onUpdate: () => { setCounters(prev => { const n = [...prev]; n[i] = Math.round(obj.val); return n; }); },
            onComplete: () => {
              gsap.to(obj, { val: stat.target, duration: 0.4, ease: "power2.inOut",
                onUpdate: () => { setCounters(prev => { const n = [...prev]; n[i] = Math.round(obj.val); return n; }); },
                onComplete: () => { completed++; if (completed === stats.length) setCountersDone(true); }
              });
            }
          });
        });
      }
    });
  }, []);

  const fmt = (val: number, stat: typeof stats[0]) => {
    if (stat.display === "K") return Math.round(val / 1000) + "K" + stat.suffix;
    return val + stat.suffix;
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section-padding">
        <div className="container">
          <SectionLabel number="01" title="ABOUT" />
          <TextReveal as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }} stagger={0.06} onScroll={false}>
            We are WeSee.
          </TextReveal>
          <p className="gsap-reveal" style={{ fontSize: 20, fontWeight: 400, color: "#3A3A3A", marginTop: 16 }}>India's leading AI automation agency.</p>
        </div>
      </div>

      <ImageReveal
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&q=80"
        alt="Team"
        direction="up"
        duration={1.4}
        parallax
        parallaxAmount={60}
        zoom={false}
        style={{ width: "100%", height: 480 }}
      />

      <section className="section-padding">
        <div className="container flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[55%]">
            <TextReveal as="h2" className="section-heading" stagger={0.05}>
              How we got here.
            </TextReveal>
            <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>WeSee was founded in 2023 in Jaipur by operators frustrated with how slow and expensive digital transformation was for growing businesses. We saw a gap — companies needed AI and automation, but the solutions available were either too complex, too expensive, or too generic.</p>
            <p className="body-text gsap-reveal" style={{ marginTop: 20 }}>So we built WeSee: a team of engineers, strategists, and creators who build intelligent systems that actually work. From day one, our focus has been on measurable outcomes — not deliverables.</p>
            <p className="body-text gsap-reveal" style={{ marginTop: 20 }}>Today, WeSee operates from Jaipur, Mumbai, and Dubai — serving clients across healthcare, real estate, e-commerce, SaaS, and financial services. We've deployed over 80 automation workflows, delivered 35+ projects, and saved our clients over 15,000 hours of manual work every month.</p>
          </div>
          <div className="lg:w-[45%] flex flex-col gap-2">
            <ImageReveal src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" alt="" direction="right" delay={0.1} style={{ height: 280 }} />
            <ImageReveal src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80" alt="" direction="right" delay={0.3} style={{ height: 280 }} />
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            What drives us.
          </TextReveal>
          <StaggerReveal stagger={0.12} y={20} style={{ marginTop: 40 }}>
            {[
              { num: "01", title: "Outcomes over outputs", body: "We measure success by business results, not deliverables. Every automation we build is designed to move a metric that matters." },
              { num: "02", title: "Systems over sprints", body: "We build for scale, not speed. Our solutions are designed to grow with your business, not break under pressure." },
              { num: "03", title: "Clarity over complexity", body: "Every automation we build is explainable and maintainable. No black boxes, no vendor lock-in." },
            ].map((v) => (
              <TiltCard key={v.num} maxTilt={3} scale={1.005} style={{ borderTop: "1px solid #EEEEEE", padding: "24px 0" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 300, color: "#888888" }}>({v.num})</span>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>{v.title}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 8 }}>{v.body}</p>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Milestones.
          </TextReveal>
          <StaggerReveal stagger={0.1} y={15} style={{ marginTop: 40, paddingLeft: 24, borderLeft: "2px solid #EEEEEE", position: "relative" }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ paddingBottom: 32, position: "relative" }}>
                <div style={{ position: "absolute", left: -29, top: 4, width: 8, height: 8, background: "#1A1A1A" }} />
                <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888" }}>{item.year}</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: "#1A1A1A", marginTop: 4 }}>{item.text}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding" ref={statsRef} style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  className={countersDone ? "counter-bounce" : ""}
                  style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                >
                  {fmt(counters[i], stat)}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginTop: 8 }}>{stat.label}</div>
                <div style={{ fontSize: 13, fontWeight: 400, color: "#555555", marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1A1A1A", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <FloatingParticles count={25} color="rgba(255, 255, 255, 0.04)" maxSize={2} speed={0.15} />
        <div className="container relative z-10" style={{ textAlign: "center" }}>
          <TextReveal as="h2" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }} stagger={0.06}>
            Ready to automate your business?
          </TextReveal>
          <p className="gsap-reveal" style={{ fontSize: 16, fontWeight: 400, color: "#AAAAAA", marginTop: 24, maxWidth: 640, marginLeft: "auto", marginRight: "auto", lineHeight: 1.75 }}>
            Combining deep AI expertise with business acumen, we take your bottlenecks and transform them into high-performing, automated workflows.
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
