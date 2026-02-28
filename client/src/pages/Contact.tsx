import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { toast } from "sonner";

const CONTACT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/contact-section-AFtsET8sctfQCezXBdGKqK.webp";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="C" title="Contact" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a]">
            Let's build something<br />
            together.
          </h1>
          <p className="mt-4 text-lg text-[#555] max-w-2xl">
            Book a free discovery call or send us a message. We'll audit your
            current operations and show you exactly how we can help.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#999] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-[#eee] rounded-sm text-sm text-[#1a1a1a] focus:border-[#2563EB] focus:outline-none transition-colors bg-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[#999] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#eee] rounded-sm text-sm text-[#1a1a1a] focus:border-[#2563EB] focus:outline-none transition-colors bg-white"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#999] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-[#eee] rounded-sm text-sm text-[#1a1a1a] focus:border-[#2563EB] focus:outline-none transition-colors bg-white"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#999] mb-2">
                  Service of Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border border-[#eee] rounded-sm text-sm text-[#1a1a1a] focus:border-[#2563EB] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a service category</option>
                  <option value="ai-agents">AI Agents & Conversational AI</option>
                  <option value="workflow">Workflow & Business Process Automation</option>
                  <option value="marketing">Performance Marketing & Paid Advertising</option>
                  <option value="seo">SEO, Content & Organic Growth</option>
                  <option value="messaging">Messaging, Email & Communication</option>
                  <option value="design">Web Design, Branding & Creative</option>
                  <option value="ecommerce">E-Commerce & Marketplace Growth</option>
                  <option value="sales">Sales, CRM & Revenue Operations</option>
                  <option value="operations">Business Operations & Infrastructure</option>
                  <option value="other">Not sure / Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-[#999] mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-[#eee] rounded-sm text-sm text-[#1a1a1a] focus:border-[#2563EB] focus:outline-none transition-colors bg-white resize-none"
                  placeholder="Tell us about your project and what you're looking to achieve..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] text-white text-sm font-medium tracking-wide rounded-sm hover:bg-[#2563EB] transition-colors duration-300"
              >
                Send Message <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Book a Call Card */}
            <div className="p-6 bg-[#1a1a1a] rounded-sm text-white mb-8">
              <h3 className="font-heading text-xl font-semibold">
                Prefer a call?
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Book a free 30-minute discovery call. We'll discuss your business,
                identify automation opportunities, and outline a plan — no commitment.
              </p>
              <a
                href="https://cal.com/wesee/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-sm hover:bg-[#1d4ed8] transition-colors w-full justify-center"
              >
                Book a Discovery Call <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1a1a1a]">Email</h4>
                  <a href="mailto:hello@wesee.in" className="text-sm text-[#666] hover:text-[#2563EB] transition-colors">
                    hello@wesee.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1a1a1a]">Phone</h4>
                  <a href="tel:+919876543210" className="text-sm text-[#666] hover:text-[#2563EB] transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1a1a1a]">Location</h4>
                  <p className="text-sm text-[#666]">Jaipur, Rajasthan, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1a1a1a]">Response Time</h4>
                  <p className="text-sm text-[#666]">Within 24 hours, usually much faster</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="mt-8 aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src={CONTACT_IMG}
                alt="WeSee office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
