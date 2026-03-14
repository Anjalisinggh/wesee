import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import StaggerReveal from "@/components/StaggerReveal";
import MagneticButton from "@/components/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const jobs = [
  {
    title: "AI Solutions Architect",
    location: "Japan",
    skills: "LangChain, OpenAI API, n8n, Zapier, Python",
    profile: "3+ years of experience building AI-powered applications. Deep understanding of LLM orchestration, prompt engineering, and workflow automation. Ability to translate business requirements into technical architecture.",
    description: "You will design and build end-to-end AI automation solutions for our clients — from discovery and architecture through deployment and optimization. You'll work directly with founders and operations teams to identify high-impact automation opportunities and deliver production-ready systems.",
  },
  {
    title: "Growth Marketing Strategist",
    location: "Mumbai / Remote",
    skills: "Meta Ads, Google Ads, Analytics, CRM",
    profile: "3+ years managing paid advertising campaigns with proven ROAS results. Experience with Meta Business Suite, Google Ads, and analytics platforms. Strong understanding of full-funnel marketing strategy.",
    description: "You will own paid advertising strategy and execution for WeSee's clients across Meta, Google, and LinkedIn. You'll build campaign architectures, optimize for conversions, and report on performance — all while collaborating with our AI team to integrate automation into marketing workflows.",
  },
  {
    title: "Full Stack Developer",
    location: "Remote",
    skills: "Next.js, Node.js, PostgreSQL, APIs",
    profile: "2+ years building production web applications. Proficiency in React/Next.js, Node.js, and relational databases. Experience with REST APIs and third-party integrations.",
    description: "You will build custom web applications, client dashboards, and integration layers that power our automation solutions. You'll work closely with our AI engineers to create seamless user experiences that connect intelligent backends with intuitive frontends.",
  },
  {
    title: "AI & Automation Internship",
    location: "Japan / Remote",
    skills: "Python, curiosity, willingness to learn",
    profile: "Currently pursuing or recently completed a degree in Computer Science, Engineering, or related field. Basic programming skills in Python. Genuine interest in AI and automation.",
    description: "6-month paid internship where you'll learn to build AI agents, workflow automations, and intelligent business systems under the mentorship of our senior engineers. Stipend provided. High-performing interns will be offered full-time positions.",
  },
];

export default function Careers() {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Stagger animate accordion content when a job opens
  useEffect(() => {
    if (openJob === null) return;
    const el = contentRefs.current[openJob];
    if (!el) return;
    const blocks = el.querySelectorAll(".job-block");
    gsap.fromTo(blocks, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" });
  }, [openJob]);

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
          <SectionLabel number="01" title="CAREERS" />
          <TextReveal as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }} stagger={0.06} onScroll={false}>
            Careers.
          </TextReveal>
          <p className="body-text gsap-reveal" style={{ marginTop: 24 }}>
            Please send your application with a motivation letter, CV and portfolio to:
          </p>
          <a href="mailto:jobs@wesee.in" className="cta-link gsap-reveal" style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", textDecoration: "none", display: "inline-block", marginTop: 8 }}>jobs@wesee.in</a>
        </div>
      </div>

      <div style={{ width: "100%", height: "clamp(250px, 45vh, 400px)", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&q=80"
          alt="Team"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>

      <section className="section-padding">
        <div className="container">
          <TextReveal as="h2" className="section-heading" stagger={0.05}>
            Become part of the WeSee team.
          </TextReveal>
        </div>
      </section>

      {/* Job accordion with staggered reveal and animated expand */}
      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          <StaggerReveal stagger={0.1} y={15}>
            {jobs.map((job, i) => (
              <div key={job.title} style={{ borderTop: "1px solid #EEEEEE" }}>
                <button
                  onClick={() => setOpenJob(openJob === i ? null : i)}
                  className="w-full flex items-center justify-between group"
                  style={{ padding: "24px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" }}
                >
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A", transition: "transform 0.3s ease", display: "inline-block" }} className="group-hover:translate-x-2">{job.title}</span>
                    <span style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginLeft: 16 }}>{job.location}</span>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 300, color: "#888888", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)", transform: openJob === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: openJob === i ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div style={{ minHeight: 0, overflow: "hidden" }}>
                    <div
                      ref={(el) => { contentRefs.current[i] = el; }}
                      style={{ paddingBottom: 32 }}
                    >
                      <div className="job-block" style={{ fontSize: 12, fontWeight: 400, color: "#888888", letterSpacing: "0.1em", textTransform: "uppercase" }}>Skills</div>
                      <div className="job-block" style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", marginTop: 4 }}>{job.skills}</div>

                      <div className="job-block" style={{ fontSize: 12, fontWeight: 400, color: "#888888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 24 }}>Your Profile</div>
                      <p className="job-block" style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 4 }}>{job.profile}</p>

                      <div className="job-block" style={{ fontSize: 12, fontWeight: 400, color: "#888888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 24 }}>Job Description</div>
                      <p className="job-block" style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 4 }}>{job.description}</p>

                      <div className="job-block" style={{ marginTop: 24 }}>
                        <MagneticButton
                          as="a"
                          href="mailto:jobs@wesee.in"
                          className="btn-fill-sweep"
                          style={{ display: "inline-block", padding: "12px 24px", background: "#1A1A1A", color: "#FFFFFF", fontSize: 13, fontWeight: 500, textDecoration: "none" }}
                          strength={0.2}
                        >
                          Apply now +
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #EEEEEE" }} />
          </StaggerReveal>
        </div>
      </section>
    </div>
  );
}
