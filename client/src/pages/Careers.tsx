import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock, Briefcase } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const openings = [
  {
    title: "AI Engineer",
    department: "Engineering",
    location: "Jaipur / Remote",
    type: "Full-time",
    description: "Build and deploy AI agents, chatbots, and voice AI systems for our clients. Experience with LLMs, NLP, and conversational AI required.",
  },
  {
    title: "Automation Specialist",
    department: "Engineering",
    location: "Jaipur / Remote",
    type: "Full-time",
    description: "Design and implement workflow automations using n8n, Zapier, Make, and custom code. Strong problem-solving skills essential.",
  },
  {
    title: "Performance Marketing Manager",
    department: "Marketing",
    location: "Jaipur",
    type: "Full-time",
    description: "Run and optimize paid campaigns across Meta, Google, and LinkedIn. 3+ years of hands-on experience with proven ROI results.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Jaipur / Remote",
    type: "Full-time",
    description: "Design premium websites, landing pages, and digital experiences. Proficiency in Figma and understanding of conversion optimization.",
  },
  {
    title: "Content Writer (SEO)",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    description: "Create SEO-optimized content that ranks and converts. Strong understanding of keyword research and content strategy.",
  },
  {
    title: "Business Development Executive",
    department: "Sales",
    location: "Jaipur",
    type: "Full-time",
    description: "Drive new business through outbound prospecting, partnerships, and relationship building. Excellent communication skills required.",
  },
];

const perks = [
  "Competitive salary + performance bonuses",
  "Flexible work hours & remote options",
  "Learning budget for courses & conferences",
  "Work on cutting-edge AI projects",
  "Small team, big impact — your work matters",
  "Health insurance for you and your family",
];

export default function Careers() {
  const revealRef = useScrollReveal();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="J" title="Careers" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a]">
            Join the team.
          </h1>
          <p className="mt-4 text-lg text-[#555] max-w-2xl">
            We're building India's leading AI automation agency. If you're
            passionate about AI, automation, and making businesses smarter —
            we want to hear from you.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 md:p-8 bg-[#fafafa] rounded-sm"
        >
          <h2 className="font-heading text-xl font-semibold text-[#1a1a1a] mb-4">
            Why WeSee?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-[#555]">{perk}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <div className="mt-16" ref={revealRef}>
          <div className="reveal">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8">
              Open positions
            </h2>
          </div>
          <div className="space-y-4 stagger-children">
            {openings.map((job) => (
              <div
                key={job.title}
                className="reveal group p-6 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-all cursor-pointer"
                onClick={() => toast.info("Application form coming soon! Email hello@wesee.in to apply.")}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#666] leading-relaxed">
                      {job.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#999]">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                      Apply <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application */}
        <div className="mt-16 p-8 md:p-12 bg-[#1a1a1a] rounded-sm text-white">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Don't see your role?
          </h2>
          <p className="mt-3 text-base text-white/70 max-w-lg">
            We're always looking for exceptional people. Send us your resume and
            tell us how you'd contribute to WeSee.
          </p>
          <a
            href="mailto:careers@wesee.in"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white text-sm font-medium rounded-sm hover:bg-[#1d4ed8] transition-colors"
          >
            Send your resume <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
