import { useEffect, useState } from "react";
import SectionLabel from "@/components/SectionLabel";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll(".gsap-reveal");
    reveals.forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" }
      });
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section-padding">
        <div className="container gsap-reveal">
          <SectionLabel number="01" title="CONTACT" />
          <h1 style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }}>Get in touch.</h1>
        </div>
      </div>

      <div className="overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80" alt="City" style={{ width: "100%", height: 400, objectFit: "cover" }} />
      </div>

      <section className="section-padding">
        <div className="container gsap-reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {contactTypes.map((ct) => (
              <div key={ct.label} className="flex gap-6">
                <img src={ct.photo} alt={ct.person} style={{ width: 72, height: 72, objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888" }}>{ct.label}</div>
                  <a href={`mailto:${ct.email}`} style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", textDecoration: "none", display: "block", marginTop: 4 }}>{ct.email}</a>
                  <div style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginTop: 4 }}>{ct.person} — {ct.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container gsap-reveal">
          <h2 className="section-heading">Our offices.</h2>
          <div style={{ marginTop: 40 }}>
            {offices.map((office, i) => (
              <div key={office.city} style={{ borderTop: "1px solid #EEEEEE" }}>
                <button onClick={() => setOpenOffice(openOffice === i ? null : i)} className="w-full flex items-center justify-between" style={{ padding: "24px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" }}>
                  <div>
                    <span style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A" }}>{office.city}</span>
                    <span style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginLeft: 12 }}>{office.country}</span>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 300, color: "#888888", transition: "transform 0.3s ease", transform: openOffice === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <div style={{ maxHeight: openOffice === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <div style={{ paddingBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 400, color: "#888888", textTransform: "uppercase", letterSpacing: "0.1em" }}>{office.role}</div>
                    <div style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", marginTop: 8 }}>{office.address}</div>
                    <div style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", marginTop: 4 }}>{office.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container gsap-reveal">
          <h2 className="section-heading">Or send us a message.</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: 40, maxWidth: 640 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "12px 0", background: "none", fontSize: 15, color: "#1A1A1A", outline: "none", border: "none", borderBottom: "1px solid #DDDDDD" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: "12px 0", background: "none", fontSize: 15, color: "#1A1A1A", outline: "none", border: "none", borderBottom: "1px solid #DDDDDD" }} />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Company</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} style={{ width: "100%", padding: "12px 0", background: "none", fontSize: 15, color: "#1A1A1A", outline: "none", border: "none", borderBottom: "1px solid #DDDDDD" }} />
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", display: "block", marginBottom: 8 }}>Service of interest</label>
              <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} style={{ width: "100%", padding: "12px 0", background: "none", fontSize: 15, color: "#1A1A1A", outline: "none", border: "none", borderBottom: "1px solid #DDDDDD", cursor: "pointer" }}>
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
              <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "12px 0", background: "none", fontSize: 15, color: "#1A1A1A", outline: "none", border: "none", borderBottom: "1px solid #DDDDDD", resize: "vertical" }} />
            </div>
            <button type="submit" style={{ marginTop: 32, padding: "16px 32px", background: "#1A1A1A", color: "#FFFFFF", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer" }}>Send message +</button>
          </form>
        </div>
      </section>

      <div className="overflow-hidden">
        <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2000&q=80" alt="City" style={{ width: "100%", height: 360, objectFit: "cover" }} />
      </div>
    </div>
  );
}
