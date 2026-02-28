import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { scrollToTop } from "@/hooks/useLenis";

const footerLinks = {
  services: [
    { label: "AI Agents", href: "/services?type=AI+Agents" },
    { label: "Workflow Automation", href: "/services?type=Workflow+Automation" },
    { label: "Paid Advertising", href: "/services?type=Paid+Ads" },
    { label: "SEO & Content", href: "/services?type=SEO" },
    { label: "Web Design", href: "/services?type=Web+%2F+Design" },
    { label: "E-Commerce", href: "/services?type=E-Commerce" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/wesee" },
    { label: "Instagram", href: "https://instagram.com/wesee.in" },
    { label: "Twitter", href: "https://twitter.com/wesee_in" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-[#eee]">
      <div className="container py-16 md:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight text-[#1a1a1a]">
                WeSee
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#666] max-w-xs">
              India's leading AI automation agency. We build intelligent systems
              that help businesses operate smarter, faster, and at scale.
            </p>
            <div className="mt-6 flex gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#999] hover:text-[#2563EB] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-widest uppercase text-[#999] mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666] hover:text-[#2563EB] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-widest uppercase text-[#999] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666] hover:text-[#2563EB] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-widest uppercase text-[#999] mb-4">
              Get Started
            </h4>
            <p className="text-sm text-[#666] mb-4">
              Ready to automate your business? Let's talk.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm hover:bg-[#2563EB] transition-colors"
            >
              Book a Call <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="mt-6 text-sm text-[#999]">
              hello@wesee.in
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#eee] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#999]">
            &copy; {new Date().getFullYear()} WeSee. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#999] hover:text-[#666] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#999] hover:text-[#666] transition-colors">
              Terms & Conditions
            </Link>
            <button
              onClick={scrollToTop}
              className="text-xs text-[#999] hover:text-[#2563EB] transition-colors flex items-center gap-1"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
