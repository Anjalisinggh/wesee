import { useEffect, useState, useRef } from "react";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import ImageReveal from "@/components/ImageReveal";
import StaggerReveal from "@/components/StaggerReveal";
import MagneticButton from "@/components/MagneticButton";
import ParticleWrapper from "@/components/ParticleWrapper";
import TiltCard from "@/components/TiltCard";
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
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const officeSectionRef = useRef<HTMLDivElement>(null);
  const officeContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      // Form reveal animation with enhanced effects
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" }, 
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { 
              trigger: el, 
              start: "top 85%", 
              toggleActions: "play none none none" 
            }
          }
        );
      });

      // Contact cards animation with rotation and blur
      if (contactCardsRef.current) {
        const cards = contactCardsRef.current.querySelectorAll(".contact-card");
        cards.forEach((card, i) => {
          const cardImg = card.querySelector("img");
          const cardContent = card.querySelector(".flex-1");
          
          // Card container animation
          gsap.fromTo(card, 
            { 
              opacity: 0, 
              y: 60, 
              scale: 0.9, 
              rotationX: -15,
              filter: "blur(10px)"
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 0.8,
              delay: i * 0.12,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );

          // Image animation
          if (cardImg) {
            gsap.fromTo(cardImg,
              { scale: 1.2, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.9,
                delay: i * 0.12 + 0.2,
                ease: "power2.out"
              }
            );
          }

          // Content animation
          if (cardContent) {
            gsap.fromTo(cardContent,
              { x: -20, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.12 + 0.3,
                ease: "power3.out"
              }
            );
          }
        });
      }

      // Office accordion animation with enhanced effects
      if (officeSectionRef.current) {
        const officeItems = officeSectionRef.current.querySelectorAll(".office-item");
        officeItems.forEach((item, i) => {
          gsap.fromTo(item,
            { 
              opacity: 0, 
              x: -50, 
              rotationY: -10,
              filter: "blur(8px)"
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              filter: "blur(0px)",
              duration: 0.9,
              delay: i * 0.18,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }

      // Form inputs staggered animation
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll("input, textarea, select");
        inputs.forEach((input, i) => {
          gsap.fromTo(input,
            { 
              opacity: 0, 
              y: 20, 
              scale: 0.98 
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: i * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: input,
                start: "top 90%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }

      // Button animation
      const submitButton = document.querySelector(".btn-fill-sweep");
      if (submitButton) {
        gsap.fromTo(submitButton,
          { 
            opacity: 0, 
            scale: 0.9, 
            y: 20,
            filter: "blur(5px)"
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: submitButton,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, 50);
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // Office accordion expand/collapse animation
  useEffect(() => {
    officeContentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (openOffice === i) {
        gsap.fromTo(el,
          { maxHeight: 0, opacity: 0, y: -20 },
          { maxHeight: 200, opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
        const children = el.querySelectorAll("div, a");
        children.forEach((child, idx) => {
          gsap.fromTo(child,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.5, delay: idx * 0.1, ease: "power2.out" }
          );
        });
      } else {
        gsap.to(el, { maxHeight: 0, opacity: 0, y: -20, duration: 0.4, ease: "power2.in" });
      }
    });
  }, [openOffice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: focusedField === field ? "12px 0 12px 0" : "14px 0",
    background: "none",
    fontSize: "clamp(14px, 1.5vw, 16px)",
    color: "#1A1A1A",
    outline: "none",
    border: "none",
    borderBottom: focusedField === field ? "2px solid #1A1A1A" : "1px solid #E5E5E5",
    transition: "border-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, transform 0.3s ease",
    transform: focusedField === field ? "translateX(2px)" : "translateX(0)",
  });

  return (
    <div style={{ paddingTop: "clamp(48px, 6vw, 64px)" }}>
      <div className="section-padding">
        <div className="container">
          <SectionLabel number="01" title="CONTACT" />
          <TextReveal as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }} stagger={0.06} onScroll={false}>
            Get in touch.
          </TextReveal>
        </div>
      </div>

      <div style={{ width: "100%", height: 400, overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80"
          alt="City"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>

      {/* Contact types with hover effect */}
      <section className="section-padding">
        <div className="container">
          <div ref={contactCardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {contactTypes.map((ct) => (
              <ParticleWrapper key={ct.label}>
                <TiltCard maxTilt={5} scale={1.01}>
                  <a
                    href={`mailto:${ct.email}`}
                    className="contact-card group flex gap-4 md:gap-6 p-5 md:p-7 rounded-2xl transition-all duration-500 ease-out hover:bg-[#FAFAFA] hover:shadow-xl hover:scale-[1.02]"
                    style={{ cursor: "pointer", textDecoration: "none", background: "#FFFFFF", border: "1px solid #F0F0F0", transformStyle: "preserve-3d" }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -4,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                        duration: 0.4,
                        ease: "power2.out"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                        duration: 0.4,
                        ease: "power2.out"
                      });
                    }}
                  >
                    <div className="overflow-hidden rounded-xl relative" style={{ width: "clamp(64px, 8vw, 80px)", height: "clamp(64px, 8vw, 80px)", flexShrink: 0 }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <img
                        src={ct.photo}
                        alt={ct.person}
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", transition: "filter 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        className="group-hover:!grayscale-0"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className="group-hover:text-[#666666]"
                        style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", marginBottom: 10, transition: "color 0.3s ease" }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, { x: 2, duration: 0.3, ease: "power2.out" });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "power2.out" });
                        }}
                      >{ct.label}</div>
                      <div 
                        className="cta-link" 
                        style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: 8, transition: "color 0.3s ease" }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, { scale: 1.02, x: 3, duration: 0.3, ease: "power2.out" });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, { scale: 1, x: 0, duration: 0.3, ease: "power2.out" });
                        }}
                      >{ct.email}</div>
                      <div style={{ fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 400, color: "#666666", lineHeight: 1.6 }}>{ct.person} — {ct.title}</div>
                    </div>
                  </a>
                </TiltCard>
              </ParticleWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Offices accordion with smooth animation */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Our offices.
          </TextReveal>
          <div ref={officeSectionRef} style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
            {offices.map((office, i) => (
              <div key={office.city} className="office-item" style={{ borderTop: i === 0 ? "none" : "1px solid #EEEEEE" }}>
                <ParticleWrapper>
                  <button
                    onClick={() => setOpenOffice(openOffice === i ? null : i)}
                    className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between group relative overflow-hidden"
                    style={{ padding: "clamp(20px, 3vw, 28px) clamp(16px, 2vw, 24px)", cursor: "pointer", background: "none", border: "none", textAlign: "left", transition: "background-color 0.3s ease", borderRadius: "12px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div className="flex-1">
                      <span style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, color: "#1A1A1A", transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "inline-block" }} className="group-hover:translate-x-1">{office.city}</span>
                      <span style={{ fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 400, color: "#888888", marginLeft: 12 }}>{office.country}</span>
                    </div>
                    <span style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 300, color: "#888888", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease", transform: openOffice === i ? "rotate(45deg)" : "none", marginTop: "8px", alignSelf: "flex-start" }} className="sm:mt-0">{openOffice === i ? "×" : "+"}</span>
                  </button>
                </ParticleWrapper>
                <div 
                  ref={(el) => {
                    officeContentRefs.current[i] = el;
                  }}
                  style={{ maxHeight: openOffice === i ? 200 : 0, overflow: "hidden", opacity: openOffice === i ? 1 : 0 }}
                >
                  <div style={{ paddingBottom: "clamp(20px, 3vw, 28px)", paddingLeft: "clamp(16px, 2vw, 24px)" }}>
                    <div style={{ fontSize: "clamp(11px, 1.3vw, 13px)", fontWeight: 500, color: "#888888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{office.role}</div>
                    <div style={{ fontSize: "clamp(14px, 1.6vw, 16px)", fontWeight: 400, color: "#3A3A3A", marginBottom: 8, lineHeight: 1.6 }}>{office.address}</div>
                    <a 
                      href={`tel:${office.phone.replace(/\s/g, "")}`} 
                      style={{ fontSize: "clamp(14px, 1.6vw, 16px)", fontWeight: 400, color: "#1A1A1A", textDecoration: "none", transition: "color 0.3s ease", display: "inline-block" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#666666";
                        gsap.to(e.currentTarget, { x: 3, duration: 0.3, ease: "power2.out" });
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#1A1A1A";
                        gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "power2.out" });
                      }}
                    >{office.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form with animated focus states */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Or send us a message.
          </TextReveal>
          <form ref={formRef} onSubmit={handleSubmit} className="gsap-reveal" style={{ marginTop: "clamp(32px, 4vw, 48px)", maxWidth: "clamp(100%, 90vw, 720px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <ParticleWrapper>
                <div>
                  <label style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: focusedField === "name" ? "#1A1A1A" : "#888888", display: "block", marginBottom: 12, transition: "color 0.3s ease" }}>{focusedField === "name" ? "Name *" : "Name"}</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    onFocus={(e) => {
                      setFocusedField("name");
                      gsap.to(e.currentTarget, { scale: 1.01, duration: 0.3, ease: "power2.out" });
                    }} 
                    onBlur={(e) => {
                      setFocusedField(null);
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
                    }} 
                    style={inputStyle("name")} 
                    placeholder="Your full name" 
                  />
                </div>
              </ParticleWrapper>
              <ParticleWrapper>
                <div>
                  <label style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: focusedField === "email" ? "#1A1A1A" : "#888888", display: "block", marginBottom: 12, transition: "color 0.3s ease" }}>{focusedField === "email" ? "Email *" : "Email"}</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    onFocus={(e) => {
                      setFocusedField("email");
                      gsap.to(e.currentTarget, { scale: 1.01, duration: 0.3, ease: "power2.out" });
                    }} 
                    onBlur={(e) => {
                      setFocusedField(null);
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
                    }} 
                    style={inputStyle("email")} 
                    placeholder="your.email@example.com" 
                  />
                </div>
              </ParticleWrapper>
            </div>
            <ParticleWrapper>
              <div style={{ marginTop: "clamp(20px, 3vw, 28px)" }}>
                <label style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: focusedField === "company" ? "#1A1A1A" : "#888888", display: "block", marginBottom: 12, transition: "color 0.3s ease" }}>Company</label>
                <input 
                  type="text" 
                  value={formData.company} 
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                  onFocus={(e) => {
                    setFocusedField("company");
                    gsap.to(e.currentTarget, { scale: 1.01, duration: 0.3, ease: "power2.out" });
                  }} 
                  onBlur={(e) => {
                    setFocusedField(null);
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
                  }} 
                  style={inputStyle("company")} 
                  placeholder="Your company name" 
                />
              </div>
            </ParticleWrapper>
            <ParticleWrapper>
              <div style={{ marginTop: "clamp(20px, 3vw, 28px)" }}>
                <label style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: focusedField === "service" ? "#1A1A1A" : "#888888", display: "block", marginBottom: 12, transition: "color 0.3s ease" }}>Service of interest</label>
                <select 
                  value={formData.service} 
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })} 
                  onFocus={(e) => {
                    setFocusedField("service");
                    gsap.to(e.currentTarget, { scale: 1.01, duration: 0.3, ease: "power2.out" });
                  }} 
                  onBlur={(e) => {
                    setFocusedField(null);
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
                  }} 
                  style={{ ...inputStyle("service"), cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0 top 50%", paddingRight: "24px" }}
                >
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
            </ParticleWrapper>
            <ParticleWrapper>
              <div style={{ marginTop: "clamp(20px, 3vw, 28px)" }}>
                <label style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: focusedField === "message" ? "#1A1A1A" : "#888888", display: "block", marginBottom: 12, transition: "color 0.3s ease" }}>{focusedField === "message" ? "Message *" : "Message"}</label>
                <textarea 
                  rows={5} 
                  required 
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                  onFocus={(e) => {
                    setFocusedField("message");
                    gsap.to(e.currentTarget, { scale: 1.005, duration: 0.3, ease: "power2.out" });
                  }} 
                  onBlur={(e) => {
                    setFocusedField(null);
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
                  }} 
                  style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px", lineHeight: "1.6" } as React.CSSProperties} 
                  placeholder="Tell us about your project..." 
                />
              </div>
            </ParticleWrapper>
            <ParticleWrapper>
              <MagneticButton
                as="button"
                type="submit"
                className="btn-fill-sweep"
                style={{ marginTop: "clamp(28px, 4vw, 40px)", padding: "clamp(14px, 2vw, 18px) clamp(28px, 4vw, 36px)", background: "#1A1A1A", color: "#FFFFFF", fontSize: "clamp(12px, 1.4vw, 14px)", fontWeight: 500, border: "none", borderRadius: "8px", transition: "all 0.3s ease", cursor: "pointer", boxShadow: "0 4px 12px rgba(26, 26, 26, 0.15)" }}
                strength={0.2}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    boxShadow: "0 8px 24px rgba(26, 26, 26, 0.25)",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: "0 4px 12px rgba(26, 26, 26, 0.15)",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                Send message +
              </MagneticButton>
            </ParticleWrapper>
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
        style={{ width: "100%", height: "clamp(280px, 35vh, 420px)" }}
      />
    </div>
  );
}
