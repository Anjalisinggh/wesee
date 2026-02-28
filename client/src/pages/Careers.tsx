import { useEffect, useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const jobs = [
  {
    title: "AI Solutions Architect",
    location: "Jaipur",
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
    location: "Jaipur / Remote",
    skills: "Python, curiosity, willingness to learn",
    profile: "Currently pursuing or recently completed a degree in Computer Science, Engineering, or related field. Basic programming skills in Python. Genuine interest in AI and automation.",
    description: "6-month paid internship where you'll learn to build AI agents, workflow automations, and intelligent business systems under the mentorship of our senior engineers. Stipend provided. High-performing interns will be offered full-time positions.",
  },
];

export default function Careers() {
  const [openJob, setOpenJob] = useState<number | null>(null);

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

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Header */}
      <div className="section-padding">
        <div className="container gsap-reveal">
          <SectionLabel number="01" title="CAREERS" />
          <h1 style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }}>Careers.</h1>
          <p className="body-text" style={{ marginTop: 24 }}>
            Please send your application with a motivation letter, CV and portfolio to:
          </p>
          <a href="mailto:jobs@wesee.in" style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", textDecoration: "none", display: "inline-block", marginTop: 8 }}>jobs@wesee.in</a>
        </div>
      </div>

      {/* Team photo */}
      <div className="overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&q=80" alt="Team" style={{ width: "100%", height: 400, objectFit: "cover" }} />
      </div>

      {/* Section heading */}
      <section className="section-padding">
        <div className="container gsap-reveal">
          <h2 className="section-heading">Become part of the WeSee team.</h2>
        </div>
      </section>

      {/* Job accordion */}
      <section style={{ paddingBottom: 80 }}>
        <div className="container gsap-reveal">
          {jobs.map((job, i) => (
            <div key={job.title} style={{ borderTop: "1px solid #EEEEEE" }}>
              <button
                onClick={() => setOpenJob(openJob === i ? null : i)}
                className="w-full flex items-center justify-between"
                style={{ padding: "24px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" }}
              >
                <div>
                  <span style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A" }}>{job.title}</span>
                  <span style={{ fontSize: 14, fontWeight: 400, color: "#888888", marginLeft: 16 }}>{job.location}</span>
                </div>
                <span style={{ fontSize: 24, fontWeight: 300, color: "#888888", transition: "transform 0.3s ease", transform: openJob === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              <div style={{
                maxHeight: openJob === i ? 600 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <div style={{ paddingBottom: 32 }}>
                  <div style={{ fontSize: 12, fontWeight: 400, color: "#888888", letterSpacing: "0.1em", textTransform: "uppercase" }}>Skills</div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", marginTop: 4 }}>{job.skills}</div>

                  <div style={{ fontSize: 12, fontWeight: 400, color: "#888888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 24 }}>Your Profile</div>
                  <p style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 4 }}>{job.profile}</p>

                  <div style={{ fontSize: 12, fontWeight: 400, color: "#888888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 24 }}>Job Description</div>
                  <p style={{ fontSize: 15, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.7, marginTop: 4 }}>{job.description}</p>

                  <a href="mailto:jobs@wesee.in" style={{ display: "inline-block", marginTop: 24, padding: "12px 24px", background: "#1A1A1A", color: "#FFFFFF", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                    Apply now +
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #EEEEEE" }} />
        </div>
      </section>
    </div>
  );
}
