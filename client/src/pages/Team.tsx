/*
 * Team Page — WeSee team members with expandable bios
 * Design: Grid layout, hover reveals, editorial feel
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, ChevronDown, Linkedin } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
}

const leadership: TeamMember[] = [
  {
    name: "Rahul Purohit",
    role: "Founder & CEO",
    bio: "Rahul leads WeSee's vision and strategy. With a background in engineering and business operations, he founded WeSee to bridge the gap between AI technology and real business outcomes. He oversees all client relationships and ensures every project delivers measurable impact.",
    expertise: ["AI Strategy", "Business Operations", "Client Relations"],
  },
  {
    name: "Priya Sharma",
    role: "Head of AI Engineering",
    bio: "Priya leads the AI engineering team, architecting intelligent agents and automation systems. She brings deep expertise in NLP, conversational AI, and workflow automation, ensuring every solution is technically robust and scalable.",
    expertise: ["NLP", "Conversational AI", "System Architecture"],
  },
  {
    name: "Arjun Mehta",
    role: "Head of Growth & Marketing",
    bio: "Arjun drives WeSee's performance marketing and growth strategies. He manages paid advertising, SEO, and content operations for clients, combining data-driven decision making with creative campaign execution.",
    expertise: ["Performance Marketing", "SEO", "Growth Strategy"],
  },
];

const team: TeamMember[] = [
  { name: "Vikram Singh", role: "Senior AI Engineer", bio: "Specializes in building AI agents and chatbot systems for enterprise clients.", expertise: ["AI Agents", "Python", "LLMs"] },
  { name: "Ananya Gupta", role: "Automation Specialist", bio: "Expert in n8n, Zapier, and Make — connecting business tools into seamless workflows.", expertise: ["n8n", "Zapier", "API Integration"] },
  { name: "Karan Joshi", role: "Full-Stack Developer", bio: "Builds custom web applications and integrations that power our automation solutions.", expertise: ["React", "Node.js", "APIs"] },
  { name: "Sneha Patel", role: "UX/UI Designer", bio: "Creates intuitive interfaces and brand identities that convert visitors into customers.", expertise: ["UI Design", "Branding", "Figma"] },
  { name: "Rohan Kumar", role: "Performance Marketer", bio: "Manages paid campaigns across Meta, Google, and LinkedIn with a focus on ROAS.", expertise: ["Meta Ads", "Google Ads", "Analytics"] },
  { name: "Meera Reddy", role: "Content Strategist", bio: "Develops content strategies and SEO-optimized content that drives organic growth.", expertise: ["SEO", "Content Writing", "Strategy"] },
  { name: "Aditya Verma", role: "Data Analyst", bio: "Builds analytics dashboards and extracts insights that drive business decisions.", expertise: ["Analytics", "BI", "Python"] },
  { name: "Nisha Agarwal", role: "Project Manager", bio: "Ensures every project is delivered on time, on budget, and exceeds expectations.", expertise: ["Project Management", "Agile", "Client Success"] },
];

function TeamCard({ member, index, isLeader }: { member: TeamMember; index: number; isLeader?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const initials = member.name.split(" ").map(n => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className={`group border border-[#eee] rounded-sm hover:border-[#2563EB] transition-all duration-300 ${isLeader ? "p-8" : "p-6"}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`${isLeader ? "w-14 h-14" : "w-11 h-11"} bg-[#f5f5f5] rounded-sm flex items-center justify-center flex-shrink-0`}>
            <span className={`font-heading font-bold text-[#999] ${isLeader ? "text-lg" : "text-sm"}`}>
              {initials}
            </span>
          </div>
          <div>
            <h3 className={`font-heading font-semibold text-[#1a1a1a] ${isLeader ? "text-lg" : "text-base"}`}>
              {member.name}
            </h3>
            <p className="text-sm text-[#2563EB]">{member.role}</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 text-[#ccc] hover:text-[#2563EB] transition-colors"
          aria-label="Toggle bio"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-[#666] leading-relaxed">
              {member.bio}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {member.expertise.map((skill) => (
                <span key={skill} className="text-xs px-2 py-0.5 bg-[#f5f5f5] text-[#666] rounded-sm">
                  {skill}
                </span>
              ))}
            </div>
            <a
              href="#"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#999] hover:text-[#2563EB] transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Team() {
  const revealRef1 = useScrollReveal();
  const revealRef2 = useScrollReveal();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="T" title="Team" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a] max-w-4xl">
            We are a team<br />
            of builders.
          </h1>
          <p className="mt-6 text-lg text-[#555] max-w-2xl leading-relaxed">
            To work at WeSee means to build intelligent systems in an ambitious
            and relentless spirit — transcending industries and disciplines.
            WeSee embraces equal opportunity and welcomes diverse thinkers,
            builders, and creators from every background.
          </p>
        </motion.div>

        {/* Leadership */}
        <div className="mt-20" ref={revealRef1}>
          <div className="reveal">
            <h2 className="font-heading text-xs font-semibold tracking-widest uppercase text-[#999] mb-8">
              Leadership
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} isLeader />
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-20" ref={revealRef2}>
          <div className="reveal">
            <h2 className="font-heading text-xs font-semibold tracking-widest uppercase text-[#999] mb-8">
              The Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-24 p-8 md:p-12 bg-[#fafafa] rounded-sm">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            Join the team.
          </h2>
          <p className="mt-4 text-base text-[#555] max-w-lg">
            We're always looking for talented engineers, marketers, designers,
            and strategists who want to build the future of business automation.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm hover:bg-[#2563EB] transition-colors"
            >
              View Open Positions <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
