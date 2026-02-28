import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { services } from "@/data/services";
import { getServiceImage } from "@/pages/Services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  const serviceIndex = services.findIndex((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll(".gsap-reveal");
    reveals.forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" }
      });
    });
    const heroImg = document.querySelector(".detail-hero-parallax");
    if (heroImg) {
      gsap.to(heroImg, { y: -60, ease: "none",
        scrollTrigger: { trigger: heroImg, start: "top bottom", end: "bottom top", scrub: true }
      });
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [slug]);

  if (!service) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center" }}>
        <p style={{ fontSize: 16, color: "#888888" }}>Service not found.</p>
        <Link href="/services" className="cta-link" style={{ marginTop: 16, display: "inline-block" }}>← All services +</Link>
      </div>
    );
  }

  const heroImage = getServiceImage(service, serviceIndex);

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section-padding">
        <div className="container">
          <Link href="/services" className="cta-link" style={{ fontSize: 13, color: "#888888" }}>
            ← All services +
          </Link>
          <div style={{ marginTop: 24, fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888" }}>
            {service.category}
          </div>
          <h1 style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, marginTop: 12 }}>
            {service.name}
          </h1>
          <p style={{ fontSize: 20, fontWeight: 400, color: "#3A3A3A", fontStyle: "italic", maxWidth: 720, marginTop: 20, lineHeight: 1.6 }}>
            {service.shortDescription}
          </p>
        </div>

        {/* Hero image */}
        <div className="overflow-hidden" style={{ marginTop: 48, height: 500 }}>
          <img src={heroImage} alt={service.name} className="detail-hero-parallax" style={{ width: "100%", height: "130%", objectFit: "cover", display: "block" }} />
        </div>

        {/* Metadata strip */}
        <div className="container">
          <div className="flex flex-wrap gap-12" style={{ borderTop: "1px solid #EEEEEE", borderBottom: "1px solid #EEEEEE", padding: "24px 0" }}>
            {[
              { label: "SERVICE TYPE", value: service.serviceType },
              { label: "INDUSTRIES", value: service.industries.slice(0, 4).join(", ") },
              { label: "ENGAGEMENT SIZE", value: service.engagementSize },
              { label: "STATUS", value: service.status },
              { label: "DELIVERY", value: "Remote" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888" }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginTop: 4 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body content */}
        <div className="container" style={{ marginTop: 64 }}>
          <div style={{ maxWidth: "65%" }} className="gsap-reveal max-md:!max-w-full">
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginBottom: 16 }}>What it is</h3>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.75 }}>{service.fullDescription}</p>

            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginTop: 48, marginBottom: 16 }}>The problem it solves</h3>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.75 }}>{service.benefits}</p>
          </div>
        </div>

        <div className="overflow-hidden" style={{ marginTop: 64 }}>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80" alt="" style={{ width: "100%", height: 360, objectFit: "cover" }} loading="lazy" />
        </div>

        <div className="container" style={{ marginTop: 64 }}>
          <div style={{ maxWidth: "65%" }} className="gsap-reveal max-md:!max-w-full">
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginBottom: 16 }}>What automation brings</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {service.automationPoints.map((point, i) => (
                <li key={i} style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, padding: "4px 0" }}>— {point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginTop: 48, marginBottom: 16 }}>How we build it</h3>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.75 }}>
              At WeSee, we approach {service.name.toLowerCase()} with a rigorous discovery-first methodology. We begin by mapping your current workflows, identifying bottlenecks, and defining clear success metrics before writing a single line of code.
            </p>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.75, marginTop: 16 }}>
              Our team of AI engineers and strategists then design, build, and deploy the solution in iterative sprints — with full transparency and client collaboration at every stage. Post-launch, we provide ongoing optimization and support to ensure the system scales with your business.
            </p>

            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginTop: 48, marginBottom: 16 }}>Deliverables</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {service.deliverables.map((d, i) => (
                <li key={i} style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, padding: "4px 0" }}>— {d}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inline CTA */}
        <div style={{ background: "#1A1A1A", padding: 48, marginTop: 80 }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: 32, fontWeight: 600, color: "#FFFFFF" }}>Interested in this service?</h3>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#AAAAAA", marginTop: 16, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              Book a free discovery call and we'll show you exactly how this can work for your business.
            </p>
            <a href="https://cal.com/wesee/discovery" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", marginTop: 24, padding: "16px 32px", background: "#FFFFFF", color: "#1A1A1A", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
              Book a Call ↗
            </a>
          </div>
        </div>

        {/* Related services */}
        <div className="container" style={{ marginTop: 80, marginBottom: 80 }}>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginBottom: 32 }}>Related services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 2 }}>
            {services.filter(s => s.categoryId === service.categoryId && s.id !== service.id).slice(0, 3).map((s, i) => (
              <Link key={s.id} href={`/services/${s.slug}`} className="block group">
                <div className="img-hover-zoom" style={{ height: 220 }}>
                  <img src={getServiceImage(s, i)} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                </div>
                <div style={{ padding: "16px 0 4px" }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>{s.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 400, color: "#888888" }}>{s.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
