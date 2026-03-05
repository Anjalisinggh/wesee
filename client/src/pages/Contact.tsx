import { useEffect, useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import ImageReveal from "@/components/ImageReveal";
import StaggerReveal from "@/components/StaggerReveal";
import MagneticButton from "@/components/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactTypes = [
  { label: "General enquiries", email: "hello@wesee.in", person: "WeSee Team", title: "General", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { label: "Business enquiries", email: "business@wesee.in", person: "Rahul Purohit", title: "Founder & CEO", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { label: "Press enquiries", email: "press@wesee.in", person: "Arjun Mehta", title: "Head of Growth", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { label: "Career enquiries", email: "jobs@wesee.in", person: "HR Team", title: "People & Culture", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
];

const offices = [
  { city: "Jaipur", country: "India", role: "Headquarters", address: "WeSee HQ, Malviya Nagar, Jaipur, Rajasthan 302017", phone: "+91 98290 XXXXX" },
  { city: "Mumbai", country: "India", role: "Operations", address: "WeWork BKC, Bandra Kurla Complex, Mumbai 400051", phone: "+91 98200 XXXXX" },
  { city: "Dubai", country: "UAE", role: "MENA Office", address: "Dubai Internet City, Building 1, Dubai, UAE", phone: "+971 4 XXX XXXX" },
];

export default function Contact() {
  const [openOffice, setOpenOffice] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "12px 0",
    background: "none",
    fontSize: 15,
    color: "#1A1A1A",
    outline: "none",
    border: "none",
    borderBottom: focusedField === field ? "2px solid #1A1A1A" : "1px solid #DDDDDD",
    transition: "border-bottom 0.3s ease",
  });

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section-padding">
        <div className="container">
          <SectionLabel number="01" title="CONTACT" />
          <TextReveal as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }} stagger={0.06} onScroll={false}>
            Get in touch.
          </TextReveal>
        </div>
      </div>

      <ImageReveal
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80"
        alt="City"
        direction="up"
        duration={1.4}
        parallax
        parallaxAmount={50}
        zoom={false}
        style={{ width: "100%", height: 400 }}
      />

      {/* Contact types with hover effect */}
      <section className="section-padding">
        <div className="container">
          <StaggerReveal stagger={0.1} y={20}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {contactTypes.map((ct) => (
                <div key={ct.label} className="flex gap-6 group" style={{ cursor: "pointer" }}>
                  <div className="overflow-hidden" style={{ width: 72, height: 72, flexShrink: 0 }}>
                    <img
                      src={ct.photo}
                      alt={ct.person}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", transition: "filter 0.5s ease, transform 0.5s ease" }}
                      className="group-hover:!grayscale-0 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888" }}>{ct.label}</div>
                    <a href={`mailto:${ct.email}`} className="cta-link" style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", textDecoration: "none", display: "block", marginTop: 4 }}>{ct.email}</a>
                    <div style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginTop: 4 }}>{ct.person} — {ct.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Offices accordion with smooth animation */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Our offices.
          </TextReveal>
          <StaggerReveal stagger={0.1} y={15} style={{ marginTop: 40 }}>
            {offices.map((office, i) => (
              <div key={office.city} style={{ borderTop: "1px solid #EEEEEE" }}>
                <button
                  onClick={() => setOpenOffice(openOffice === i ? null : i)}
                  className="w-full flex items-center justify-between group"
                  style={{ padding: "24px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" }}
                >
                  <div>
                    <span style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A", transition: "transform 0.3s ease", display: "inline-block" }} className="group-hover:translate-x-2">{office.city}</span>
                    <span style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginLeft: 12 }}>{office.country}</span>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 300, color: "#888888", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)", transform: openOffice === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <div style={{ maxHeight: openOffice === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <div style={{ paddingBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 400, color: "#888888", textTransform: "uppercase", letterSpacing: "0.1em" }}>{office.role}</div>
                    <div style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", marginTop: 8 }}>{office.address}</div>
                    <div style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", marginTop: 4 }}>{office.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Form with animated focus states */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Or send us a message.
          </TextReveal>
          <form onSubmit={handleSubmit} className="gsap-reveal" style={{ marginTop: 40, maxWidth: 640 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} style={inputStyle("name")} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} style={inputStyle("email")} />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Company</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} onFocus={() => setFocusedField("company")} onBlur={() => setFocusedField(null)} style={inputStyle("company")} />
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Service of interest</label>
              <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} onFocus={() => setFocusedField("service")} onBlur={() => setFocusedField(null)} style={{ ...inputStyle("service"), cursor: "pointer" }}>
                <option value="">Select a service</option>
                <option value="ai-agents">AI Agents</option>
                <option value="workflow-automation">Workflow Automation</option>
                <option value="performance-marketing">Performance Marketing</option>
                <option value="web-development">Web & App Development</option>
                <option value="content-seo">Content & SEO</option>
                <option value="crm">CRM & Sales Automation</option>
                <option value="analytics">Analytics & BI</option>
                <option value="consulting">AI Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Message</label>
              <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} style={{ ...inputStyle("message"), resize: "vertical" } as React.CSSProperties} />
            </div>
            <MagneticButton
              as="button"
              type="submit"
              className="btn-fill-sweep"
              style={{ marginTop: 32, padding: "16px 32px", background: "#1A1A1A", color: "#FFFFFF", fontSize: 13, fontWeight: 500, border: "none" }}
              strength={0.2}
            >
              Send message +
            </MagneticButton>
          </form>
        </div>
      </section>

      <ImageReveal
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2000&q=80"
        alt="City"
        direction="up"
        parallax
        parallaxAmount={40}
        zoom={false}
        style={{ width: "100%", height: 360 }}
      />
    </div>
  );
}
