import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X } from "lucide-react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const [filterCount, setFilterCount] = useState(43);

  const isServicesPage = location === "/services";

  useEffect(() => {
    const handler = (e: Event) => {
      const count = (e as CustomEvent).detail?.count;
      if (typeof count === "number") setFilterCount(count);
    };
    window.addEventListener("update-filter-count", handler);
    return () => window.removeEventListener("update-filter-count", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid #F0F0F0" : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: 64 }}>
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="relative z-50">
              <span style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
                WeSee.
              </span>
            </Link>

            {/* Filter Services button — only on /services page */}
            {isServicesPage && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-filter-panel"))}
                className="hidden md:block cta-link"
                style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}
              >
                Filter Services ({filterCount})
              </button>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#1A1A1A",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.3s ease",
                }}
                className="hover:opacity-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button — 3-line hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" style={{ color: "#1A1A1A" }} />
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="block w-6 h-px bg-[#1A1A1A]" />
                <span className="block w-6 h-px bg-[#1A1A1A]" />
                <span className="block w-6 h-px bg-[#1A1A1A]" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-start px-8 pt-20">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  letterSpacing: "-0.02em",
                  transition: "opacity 0.3s ease",
                }}
                className="hover:opacity-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto mb-8" style={{ fontSize: 13, color: "#888888" }}>
            <p>hello@wesee.in</p>
            <p className="mt-1">Jaipur, India</p>
          </div>
        </div>
      )}
    </>
  );
}
