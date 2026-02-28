import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";

const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/team-section-fC2WN8fgKuwWtphQNjbgQY.webp";

const values = [
  { title: "Results Over Rhetoric", desc: "We measure success in outcomes — revenue generated, hours saved, leads converted. Not in slide decks." },
  { title: "Speed of Execution", desc: "We move fast. Most projects go live within 2–4 weeks. We believe in shipping, iterating, and improving." },
  { title: "Radical Transparency", desc: "No black boxes. You see everything — the data, the logic, the results. We explain what we build and why." },
  { title: "Client Partnership", desc: "We don't just deliver and disappear. We become an extension of your team, invested in your long-term growth." },
];

const timeline = [
  { year: "2023", event: "WeSee founded in Jaipur, India" },
  { year: "2023", event: "First 10 clients onboarded" },
  { year: "2024", event: "Expanded to 43 services across 9 categories" },
  { year: "2024", event: "100+ projects delivered" },
  { year: "2025", event: "Team grew to 25+ specialists" },
  { year: "2025", event: "Launched AI Agents division" },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value, 2000);
  return (
    <div>
      <div className="flex items-baseline gap-0.5">
        <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a1a]">0</span>
        <span className="font-heading text-3xl md:text-4xl font-bold text-[#2563EB]">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-[#666]">{label}</p>
    </div>
  );
}

export default function About() {
  const revealRef1 = useScrollReveal();
  const revealRef2 = useScrollReveal();
  const revealRef3 = useScrollReveal();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="A" title="About" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a] max-w-4xl">
            We believe every business<br />
            deserves intelligent systems.
          </h1>
          <p className="mt-6 text-lg text-[#555] max-w-2xl leading-relaxed">
            WeSee is an AI automation agency based in Jaipur, India. We help businesses
            — from startups to enterprises — automate their operations, marketing,
            and customer interactions using AI agents, workflow automation, and
            intelligent digital systems.
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 aspect-[16/6] overflow-hidden rounded-sm"
        >
          <img src={TEAM_IMG} alt="WeSee team" className="w-full h-full object-cover" loading="eager" />
        </motion.div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8" ref={revealRef1}>
          <div className="reveal"><StatItem value={150} suffix="+" label="Projects Delivered" /></div>
          <div className="reveal"><StatItem value={43} suffix="" label="Services" /></div>
          <div className="reveal"><StatItem value={25} suffix="+" label="Team Members" /></div>
          <div className="reveal"><StatItem value={12} suffix="+" label="Industries" /></div>
        </div>

        {/* Values */}
        <div className="mt-24" ref={revealRef2}>
          <div className="reveal">
            <SectionLabel number="01" title="Our Values" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-12">
              What drives us.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
            {values.map((v) => (
              <div key={v.title} className="reveal p-6 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-colors">
                <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">{v.title}</h3>
                <p className="mt-3 text-sm text-[#666] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24" ref={revealRef3}>
          <div className="reveal">
            <SectionLabel number="02" title="Our Journey" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-12">
              How we got here.
            </h2>
          </div>
          <div className="space-y-0 stagger-children">
            {timeline.map((item, i) => (
              <div key={i} className="reveal flex items-start gap-6 py-4 border-b border-[#eee]">
                <span className="font-mono text-sm text-[#999] w-16 flex-shrink-0">{item.year}</span>
                <span className="text-base text-[#1a1a1a]">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 p-8 md:p-12 bg-[#fafafa] rounded-sm">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            Want to work with us?
          </h2>
          <p className="mt-4 text-base text-[#555] max-w-lg">
            Whether you need AI agents, workflow automation, or a complete digital
            transformation — we're ready to help.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm hover:bg-[#2563EB] transition-colors"
            >
              Book a Call <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#ddd] text-[#1a1a1a] text-sm font-medium rounded-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              View Services +
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
