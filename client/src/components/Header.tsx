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
  const [viewMode, setViewMode] = useState<"ring" | "grid">("ring");

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
    const handler = (e: Event) => {
      const mode = (e as CustomEvent).detail?.mode;
      if (mode) setViewMode(mode);
    };
    window.addEventListener("update-view-mode", handler);
    return () => window.removeEventListener("update-view-mode", handler);
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

  // In ring view on services page, hide the header
  const hideHeader = isServicesPage && viewMode === "ring";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #F0F0F0" : "1px solid transparent",
          transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: hideHeader ? "none" : "auto",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease, border-bottom 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: 64 }}>
          {/* Logo with subtle scale on hover */}
          <div className="flex items-center gap-8">
            <Link href="/" className="relative z-50 group" data-cursor="grow">
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  letterSpacing: "-0.01em",
                  display: "inline-block",
                  transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="group-hover:scale-105 inline-block"
              >
                WeSee.
              </span>
            </Link>

            {/* Filter Services button — only on /services page in grid view */}
            {isServicesPage && viewMode === "grid" && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-filter-panel"))}
                className="hidden md:block cta-link"
                style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}
                data-cursor="grow"
              >
                Filter Services ({filterCount})
              </button>
            )}
          </div>

          {/* Desktop Nav with underline-from-center hover */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-hover"
                data-cursor="grow"
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#1A1A1A",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.3s ease",
                }}
              >
                <span className="hover:opacity-60 transition-opacity duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2"
            aria-label="Toggle menu"
            data-cursor="grow"
          >
            {isOpen ? (
              <X className="w-6 h-6" style={{ color: "#1A1A1A" }} />
            ) : (
              <div className="flex flex-col gap-1.5">
                <span
                  className="block w-6 h-px bg-[#1A1A1A] transition-all duration-300"
                  style={{ transformOrigin: "center" }}
                />
                <span className="block w-6 h-px bg-[#1A1A1A] transition-all duration-300" />
                <span
                  className="block w-6 h-px bg-[#1A1A1A] transition-all duration-300"
                  style={{ transformOrigin: "center" }}
                />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu with staggered entrance */}
      <div
        className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-start px-8 pt-20"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
                transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
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
    </>
  );
}
