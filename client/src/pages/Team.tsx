import { useEffect } from "react";
import { Link } from "wouter";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import StaggerReveal from "@/components/StaggerReveal";
import MagneticButton from "@/components/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const directors = [
  {
    name: "Rahul Purohit",
    title: "Founder & CEO",
    bio: "Rahul founded WeSee in 2023 with the belief that AI automation should be accessible, measurable, and transformative. With a background in product engineering and growth marketing, he leads WeSee's strategic direction and client relationships.",
    email: "rahul@wesee.in",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    linkedin: "https://linkedin.com/in/rahulpurohit",
  },
  {
    name: "Priya Sharma",
    title: "Head of AI Engineering",
    bio: "Priya leads WeSee's AI engineering team, overseeing the development of conversational AI agents, workflow automation systems, and custom integrations. With deep expertise in LangChain, OpenAI, and enterprise AI architecture, she ensures every solution is production-ready.",
    email: "priya@wesee.in",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    linkedin: "https://linkedin.com/company/wesee",
  },
  {
    name: "Arjun Mehta",
    title: "Head of Growth & Marketing",
    bio: "Arjun drives WeSee's growth strategy and client acquisition. With a background in performance marketing and revenue operations, he builds the systems that help WeSee — and its clients — scale efficiently across channels.",
    email: "arjun@wesee.in",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    linkedin: "https://linkedin.com/company/wesee",
  },
];

const teamMembers = [
  { name: "Ananya Desai", title: "AI Solutions Architect", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80" },
  { name: "Vikram Singh", title: "Full Stack Developer", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
  { name: "Neha Kapoor", title: "Growth Marketing Lead", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
  { name: "Rohan Joshi", title: "Automation Engineer", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80" },
  { name: "Meera Patel", title: "UX Designer", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" },
  { name: "Karan Malhotra", title: "Data Analyst", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
];

export default function Team() {
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

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="section-padding">
        <div className="container">
          <SectionLabel number="01" title="TEAM" />
          <TextReveal as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }} stagger={0.06} onScroll={false}>
            We are a community of builders.
          </TextReveal>
          <p className="body-text gsap-reveal" style={{ marginTop: 24, maxWidth: 640 }}>
            To work at WeSee means to build intelligent systems in an ambitious and relentless spirit — transcending industries and disciplines.
          </p>
        </div>
      </div>

      {/* 2x2 team collage — hover: blurred bg + smaller sharp center image */}
      <div className="container">
        <div className="grid grid-cols-2 gap-2">
          {[
            { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", h: 320 },
            { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", h: 220 },
            { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", h: 220 },
            { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80", h: 320 },
          ].map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-[#E8E8E5] cursor-pointer"
              style={{ height: img.h, borderRadius: 16 }}
            >
              {/* Blurred background — same image, visible on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
                aria-hidden
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover block scale-105"
                  style={{ filter: "blur(14px)" }}
                />
              </div>
              {/* Sharp center image — shrinks on hover to reveal blurred bg */}
              <img
                src={img.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover block transition-transform duration-400 ease-out group-hover:scale-95 rounded-[20px]"
                style={{ transformOrigin: "center center" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Leadership — TiltCard + hover grayscale-to-color */}
      <section className="section-padding">
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Leadership.
          </TextReveal>
          <StaggerReveal stagger={0.15} y={30} style={{ marginTop: 48 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {directors.map((d) => (
                <TiltCard key={d.name} maxTilt={5} scale={1.01}>
                  <div className="group">
                    <div className="group relative overflow-hidden cursor-pointer rounded-2xl" style={{ width: 280, height: 400, borderRadius: 16 }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out" aria-hidden>
                        <img src={d.photo} alt="" className="w-full h-full object-cover block scale-105" style={{ filter: "blur(14px)" }} />
                      </div>
                      <img
                        src={d.photo}
                        alt={d.name}
                        className="absolute inset-0 w-full h-full object-cover block transition-transform duration-400 ease-out group-hover:scale-90"
                        style={{ transformOrigin: "center center" }}
                      />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A" }}>{d.name}</div>
                      <div style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginTop: 4 }}>{d.title}</div>
                      <p style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 12 }}>{d.bio}</p>
                      <div className="flex items-center gap-4" style={{ marginTop: 12 }}>
                        <a href={d.linkedin} target="_blank" rel="noopener noreferrer" className="cta-link" style={{ fontSize: 13, color: "#1A1A1A" }}>LinkedIn</a>
                        <span style={{ fontSize: 13, color: "#888888" }}>{d.email}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Team members — hover grayscale-to-color + name slide */}
      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            The team.
          </TextReveal>
          <StaggerReveal stagger={0.08} y={20} style={{ marginTop: 48 }}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teamMembers.map((m) => (
                <div key={m.name} className="group">
                  <div className="group relative overflow-hidden cursor-pointer rounded-2xl" style={{ width: 208, height: 280, borderRadius: 16 }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out" aria-hidden>
                      <img src={m.photo} alt="" className="w-full h-full object-cover block scale-105" style={{ filter: "blur(14px)" }} />
                    </div>
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover block transition-transform duration-400 ease-out group-hover:scale-90"
                      style={{ transformOrigin: "center center" }}
                    />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", transition: "transform 0.3s ease" }} className="">{m.name}</div>
                    <div style={{ fontSize: 13, fontWeight: 400, color: "#888888", marginTop: 2 }}>{m.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="container">
          <MagneticButton as="a" href="/careers" className="cta-link" style={{ fontSize: 18, fontWeight: 600 }} strength={0.3}>
            Join our team +
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
