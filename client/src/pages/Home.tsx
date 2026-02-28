/*
 * WeSee Homepage — Swiss Precision / White Canvas
 * Design: Asymmetric layouts, generous whitespace, large typography,
 * parenthesized section numbers, "+" CTA suffix, editorial feel.
 * Content sourced from Document 1 — Homepage Text Comparison Table
 */

import { Link } from "wouter";
import { ArrowUpRight, ArrowRight, Bot, Workflow, Target, Search, Mail, Palette, ShoppingCart, TrendingUp, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { categories } from "@/data/services";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/hero-main-EYmEruLfX9kLiaB8c2qnGz.webp";
const AI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/ai-agents-section-kwAeb6FF5ucmx6qjE4UzSj.webp";
const SERVICES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/services-overview-MKssnVPKBFuLmrRAJKBbWp.webp";
const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/team-section-fC2WN8fgKuwWtphQNjbgQY.webp";

const iconMap: Record<string, React.ReactNode> = {
  "bot": <Bot className="w-5 h-5" />,
  "workflow": <Workflow className="w-5 h-5" />,
  "target": <Target className="w-5 h-5" />,
  "search": <Search className="w-5 h-5" />,
  "mail": <Mail className="w-5 h-5" />,
  "palette": <Palette className="w-5 h-5" />,
  "shopping-cart": <ShoppingCart className="w-5 h-5" />,
  "trending-up": <TrendingUp className="w-5 h-5" />,
  "settings": <Settings className="w-5 h-5" />,
};

const stats = [
  { value: 25, suffix: "+", label: "AI Specialists", sub: "Engineers, strategists, and creators building the future." },
  { value: 150, suffix: "+", label: "Automations Deployed", sub: "Workflows running 24/7 for clients across industries." },
  { value: 85, suffix: "+", label: "Projects Delivered", sub: "End-to-end AI and automation projects shipped." },
  { value: 50, suffix: "K+", label: "Hours Saved Monthly", sub: "Manual work eliminated through intelligent automation." },
];

const clients = [
  "U-Factor", "Tavola", "Factorylo", "HealthTech Co", "PropNext",
  "EduLearn", "FinServe", "CloudStack", "RetailMax", "LegalEase",
  "LogiTrack", "AutoDrive", "SaaSify", "ManufactPro",
];

const offices = [
  { city: "Jaipur, India", role: "HQ", desc: "Our headquarters in Jaipur serve as the nerve centre for AI innovation and client delivery across India and Asia." },
  { city: "Mumbai, India", role: "Operations", desc: "Our Mumbai office handles enterprise partnerships and works closely with clients on cutting-edge AI projects." },
  { city: "Dubai, UAE", role: "MENA", desc: "Our Dubai office drives business across the Middle East and North Africa, serving enterprise clients in finance, real estate, and government." },
];

function StatCounter({ value, suffix, label, sub }: { value: number; suffix: string; label: string; sub: string }) {
  const ref = useCountUp(value, 2200);
  return (
    <div>
      <div className="flex items-baseline gap-0.5">
        <span ref={ref} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a]">
          0
        </span>
        <span className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2563EB]">
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium text-[#1a1a1a]">{label}</p>
      <p className="mt-1 text-xs text-[#888] leading-relaxed">{sub}</p>
    </div>
  );
}

export default function Home() {
  const revealRef1 = useScrollReveal();
  const revealRef2 = useScrollReveal();
  const revealRef3 = useScrollReveal();
  const revealRef4 = useScrollReveal();
  const revealRef5 = useScrollReveal();
  const revealRef6 = useScrollReveal();
  const revealRef7 = useScrollReveal();
  const revealRef8 = useScrollReveal();
  const revealRef9 = useScrollReveal();

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════
          SECTION 0 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-36 pb-0">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-[#1a1a1a] max-w-5xl">
              We build intelligent{" "}
              <span className="text-[#2563EB]">systems.</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 max-w-2xl"
          >
            <p className="text-base md:text-lg text-[#555] leading-relaxed">
              Founded by operators and engineers, WeSee is a cross-functional team
              of AI specialists, developers, and growth strategists with one central
              mission: to build the most intelligent automation systems for businesses
              worldwide.
            </p>
            <p className="mt-4 text-base md:text-lg text-[#555] leading-relaxed">
              We are automators. We are <strong className="text-[#1a1a1a]">WeSee</strong>.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1a1a] text-white text-sm font-medium tracking-wide rounded-sm hover:bg-[#2563EB] transition-colors duration-300"
            >
              View our work <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#ddd] text-[#1a1a1a] text-sm font-medium tracking-wide rounded-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors duration-300"
            >
              Book a call +
            </Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20 w-full overflow-hidden"
        >
          <div className="container">
            <div className="relative aspect-[16/7] overflow-hidden rounded-sm img-zoom">
              <img
                src={HERO_IMG}
                alt="WeSee — AI-powered automation systems visualization"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — OUR WORK
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef1}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="01" title="Our Work" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1a1a1a]">
                We build AI<br />
                that works.
              </h2>
              <p className="mt-6 text-base text-[#555] leading-relaxed max-w-lg">
                Our work focuses on the most critical functions in today's businesses:
                sales and marketing automation, AI-powered customer engagement, and
                end-to-end workflow intelligence.
              </p>
              <p className="mt-4 text-base text-[#555] leading-relaxed max-w-lg">
                We define ourselves as creators of intelligent systems: we design
                solutions that place the business outcome at centre stage, building
                AI agents and automated pipelines that drive revenue, reduce cost,
                and scale effortlessly.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:text-[#2563EB] transition-colors group"
              >
                View our work +
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="reveal img-zoom rounded-sm">
              <img
                src={AI_IMG}
                alt="AI neural network visualization"
                className="w-full aspect-[4/3] object-cover rounded-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider container" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — OUR APPROACH
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef2}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="02" title="Our Approach" />
          </div>
          <div className="reveal max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1a1a1a]">
              We find the signal.
            </h2>
            <p className="mt-6 text-base text-[#555] leading-relaxed">
              A signal is the insight that transforms a manual process into an
              intelligent system. We strive to serve our clients by surpassing
              their expectations on every engagement, uncovering the unique
              automation opportunity.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 stagger-children">
            {[
              {
                step: "01",
                title: "Discover & Audit",
                desc: "Through deep discovery, workflow analysis, AI model selection, and iterative testing, we uncover the automation potential within every bottleneck.",
              },
              {
                step: "02",
                title: "Design & Build",
                desc: "Each project is advanced by a dedicated, tight-knit team of AI engineers and strategists led by an experienced solutions architect.",
              },
              {
                step: "03",
                title: "Deploy & Scale",
                desc: "This integrated workflow allows us to constantly align our solutions with the client's team — from strategy and build to launch, optimization, and ongoing support.",
              },
            ].map((item) => (
              <div key={item.step} className="reveal group">
                <span className="font-mono text-xs text-[#bbb] tracking-wider">
                  ({item.step})
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider container" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — OUR SERVICES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef3}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="03" title="Our Services" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 reveal">
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight text-[#1a1a1a]">
                We do end-to-end<br />
                automation.
              </h2>
              <p className="mt-4 text-sm text-[#666] leading-relaxed">
                9 categories of services covering every aspect of business
                automation — from AI agents and workflow design to performance
                marketing and cloud infrastructure.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:text-[#2563EB] transition-colors group"
              >
                View all services +
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-0 stagger-children">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/services?category=${cat.id}`}
                    className="reveal group flex items-center justify-between py-5 border-b border-[#eee] hover:border-[#2563EB] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#bbb] group-hover:text-[#2563EB] transition-colors">
                        {iconMap[cat.icon]}
                      </span>
                      <div>
                        <span className="text-sm md:text-base font-medium text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors block">
                          {cat.name}
                        </span>
                        <span className="text-xs text-[#999] mt-0.5 block max-w-md truncate">
                          {cat.summary}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#ccc] group-hover:text-[#2563EB] transition-all group-hover:translate-x-1 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed image break */}
      <div className="w-full overflow-hidden" ref={revealRef4}>
        <div className="reveal container">
          <div className="aspect-[16/6] overflow-hidden rounded-sm img-zoom">
            <img
              src={SERVICES_IMG}
              alt="WeSee workspace overview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — OUR OFFICES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef5}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="04" title="Our Offices" />
          </div>
          <div className="reveal">
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight text-[#1a1a1a] max-w-3xl mb-12">
              Where we operate.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {offices.map((office) => (
              <div
                key={office.city}
                className="reveal group p-6 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-all duration-300"
              >
                <span className="text-xs font-mono text-[#2563EB] tracking-wider">{office.role}</span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-[#1a1a1a]">
                  {office.city}
                </h3>
                <p className="mt-3 text-sm text-[#666] leading-relaxed">
                  {office.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider container" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — STATS / NUMBERS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef6}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="05" title="Our Impact" />
          </div>
          <div className="reveal">
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight text-[#1a1a1a] max-w-2xl mb-16">
              Numbers that speak<br />
              for themselves.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider container" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — OUR TEAM
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef7}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="06" title="Our Team" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal img-zoom rounded-sm order-2 lg:order-1">
              <img
                src={TEAM_IMG}
                alt="WeSee team in a collaborative meeting"
                className="w-full aspect-[4/3] object-cover rounded-sm"
                loading="lazy"
              />
            </div>
            <div className="reveal order-1 lg:order-2">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1a1a1a]">
                We are a team<br />
                of builders.
              </h2>
              <p className="mt-6 text-base text-[#555] leading-relaxed max-w-lg">
                To work at WeSee means to build intelligent systems in an ambitious
                and relentless spirit — transcending industries and disciplines.
              </p>
              <p className="mt-4 text-base text-[#555] leading-relaxed max-w-lg">
                As we grow, we remain obsessed with learning and committed to
                developing each team member into a world-class AI and automation
                specialist.
              </p>
              <Link
                href="/team"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:text-[#2563EB] transition-colors group"
              >
                Meet the team +
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider container" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — OUR CLIENTS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef8}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="07" title="Our Clients" />
          </div>
          <div className="reveal">
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight text-[#1a1a1a] max-w-3xl">
              We partner with ambitious<br />
              businesses.
            </h2>
            <p className="mt-4 text-base text-[#555] max-w-xl leading-relaxed">
              We share our clients' vision to build intelligent, scalable businesses
              that positively impact the customers they serve and the markets they
              operate in.
            </p>
          </div>
          <div className="mt-12 reveal">
            {/* Client logo marquee */}
            <div className="overflow-hidden relative">
              <div className="flex animate-marquee gap-8 items-center">
                {[...clients, ...clients].map((client, i) => (
                  <div
                    key={`${client}-${i}`}
                    className="flex-shrink-0 px-8 py-5 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#888] whitespace-nowrap tracking-wide">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider container" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — CTA / CONTACT
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" ref={revealRef9}>
        <div className="container">
          <div className="reveal">
            <SectionLabel number="08" title="Get Started" />
          </div>
          <div className="reveal max-w-3xl">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-[#1a1a1a]">
              Ready to automate<br />
              your business?
            </h2>
            <p className="mt-6 text-lg text-[#555] leading-relaxed max-w-xl">
              Combining deep AI expertise with business acumen, we take your
              bottlenecks and transform them into high-performing, automated
              workflows. Book a free discovery call — no commitment required.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white text-base font-medium tracking-wide rounded-sm hover:bg-[#2563EB] transition-colors duration-300"
              >
                Book a Discovery Call <ArrowUpRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:hello@wesee.in"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#ddd] text-[#1a1a1a] text-base font-medium tracking-wide rounded-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors duration-300"
              >
                hello@wesee.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
