import { Link } from "wouter";

const serviceLinks = [
  { label: "AI Agents", href: "/services?category=1" },
  { label: "Workflow Automation", href: "/services?category=2" },
  { label: "Paid Advertising", href: "/services?category=3" },
  { label: "SEO & Content", href: "/services?category=4" },
  { label: "Web Design", href: "/services?category=6" },
  { label: "E-Commerce", href: "/services?category=7" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/wesee" },
  { label: "Instagram", href: "https://instagram.com/wesee" },
  { label: "Twitter", href: "https://twitter.com/wesee" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#FFFFFF", borderTop: "1px solid #EEEEEE" }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/">
              <span style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A" }}>WeSee.</span>
            </Link>
            <p style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.6, marginTop: 16, maxWidth: 280 }}>
              India's leading AI automation agency. We build intelligent systems that help businesses operate smarter, faster, and at scale.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, fontWeight: 400, color: "#888888", transition: "color 0.3s ease" }}
                  className="hover:!text-[#1A1A1A]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", marginBottom: 16 }}>
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", transition: "color 0.3s ease" }}
                    className="hover:!text-[#1A1A1A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", marginBottom: 16 }}>
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", transition: "color 0.3s ease" }}
                    className="hover:!text-[#1A1A1A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", marginBottom: 16 }}>
              Get Started
            </h4>
            <p style={{ fontSize: 14, fontWeight: 400, color: "#3A3A3A", lineHeight: 1.6, marginBottom: 16 }}>
              Ready to automate your business? Let's talk.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#1A1A1A",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Book a Call ↗
            </Link>
            <p style={{ fontSize: 14, color: "#888888", marginTop: 16 }}>
              hello@wesee.in
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #EEEEEE" }}
        >
          <p style={{ fontSize: 12, fontWeight: 400, color: "#888888" }}>
            © {new Date().getFullYear()} WeSee. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" style={{ fontSize: 12, fontWeight: 400, color: "#888888" }} className="hover:!text-[#1A1A1A]">
              Privacy Policy
            </Link>
            <span style={{ fontSize: 12, color: "#888888" }}>·</span>
            <Link href="/terms" style={{ fontSize: 12, fontWeight: 400, color: "#888888" }} className="hover:!text-[#1A1A1A]">
              Terms & Conditions
            </Link>
            <span style={{ fontSize: 12, color: "#888888" }}>·</span>
            <button
              onClick={scrollToTop}
              style={{ fontSize: 12, fontWeight: 400, color: "#888888", transition: "color 0.3s ease" }}
              className="hover:!text-[#1A1A1A]"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
