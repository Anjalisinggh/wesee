import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { toast } from "sonner";

const blogPosts = [
  {
    id: 1,
    title: "How AI Sales Agents Are Replacing SDR Teams in 2025",
    excerpt: "The economics of AI sales agents have shifted. Here's why businesses are moving from human SDR teams to AI-powered alternatives — and the results they're seeing.",
    category: "AI Agents",
    date: "Feb 2026",
    readTime: "8 min read",
    color: "#2563EB",
  },
  {
    id: 2,
    title: "The Complete Guide to WhatsApp Business API Automation",
    excerpt: "WhatsApp has 98% open rates in India. This guide covers everything from API setup to advanced automation flows that drive real business results.",
    category: "Messaging",
    date: "Jan 2026",
    readTime: "12 min read",
    color: "#059669",
  },
  {
    id: 3,
    title: "Why Your Business Needs Workflow Automation (Not More Employees)",
    excerpt: "Most businesses try to solve growth problems by hiring. Here's why automation should come first — and how to identify the right processes to automate.",
    category: "Automation",
    date: "Jan 2026",
    readTime: "6 min read",
    color: "#D97706",
  },
  {
    id: 4,
    title: "Meta Ads in 2025: The Full-Funnel Strategy That Actually Works",
    excerpt: "Forget boosting posts. Here's the campaign architecture we use to generate consistent ROI for our clients across Facebook and Instagram.",
    category: "Marketing",
    date: "Dec 2025",
    readTime: "10 min read",
    color: "#7C3AED",
  },
  {
    id: 5,
    title: "Building an AI Customer Support Bot: Lessons from 50+ Deployments",
    excerpt: "After deploying AI support bots for 50+ businesses, here are the patterns that work, the mistakes to avoid, and the metrics that matter.",
    category: "AI Agents",
    date: "Dec 2025",
    readTime: "9 min read",
    color: "#2563EB",
  },
  {
    id: 6,
    title: "E-Commerce Cart Abandonment: The Multi-Channel Recovery Playbook",
    excerpt: "70% of carts are abandoned. Here's the exact multi-channel recovery sequence we use to bring 15–30% of those customers back.",
    category: "E-Commerce",
    date: "Nov 2025",
    readTime: "7 min read",
    color: "#DC2626",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="B" title="Blog" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a]">
            Insights & ideas.
          </h1>
          <p className="mt-4 text-lg text-[#555] max-w-2xl">
            Practical guides, case studies, and thought pieces on AI automation,
            marketing, and building smarter businesses.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div
            className="group cursor-pointer p-8 md:p-12 rounded-sm border border-[#eee] hover:border-[#2563EB] transition-all"
            onClick={() => toast.info("Blog posts coming soon!")}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium px-2 py-1 rounded-sm" style={{ backgroundColor: `${blogPosts[0].color}10`, color: blogPosts[0].color }}>
                {blogPosts[0].category}
              </span>
              <span className="text-xs text-[#999]">{blogPosts[0].date}</span>
              <span className="text-xs text-[#999]">·</span>
              <span className="text-xs text-[#999]">{blogPosts[0].readTime}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors max-w-2xl">
              {blogPosts[0].title}
            </h2>
            <p className="mt-3 text-base text-[#555] max-w-2xl leading-relaxed">
              {blogPosts[0].excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
              Read article <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="group cursor-pointer p-6 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-all"
              onClick={() => toast.info("Blog posts coming soon!")}
            >
              {/* Color bar */}
              <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: post.color }} />
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[#999]">{post.date}</span>
                <span className="text-xs text-[#999]">·</span>
                <span className="text-xs text-[#999]">{post.readTime}</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-[#666] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                Read <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 p-8 md:p-12 bg-[#fafafa] rounded-sm text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a1a1a]">
            Stay in the loop.
          </h2>
          <p className="mt-3 text-base text-[#555] max-w-md mx-auto">
            Get our latest insights on AI automation, marketing, and business
            growth delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed! You'll hear from us soon.");
            }}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 border border-[#eee] rounded-sm text-sm focus:border-[#2563EB] focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm hover:bg-[#2563EB] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
