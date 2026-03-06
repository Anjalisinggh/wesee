import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    // Check screen width for responsive logic
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on navigation
  useEffect(() => { setOpen(false); }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Main header bar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 60,
        display: "flex", alignItems: "center",
        background: scrolled ? "rgba(247,248,250,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(17,19,23,0.07)" : "1px solid transparent",
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: "100%",
          position: "relative",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0, zIndex: 2, gap: 8 }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374526873/i7vThuKaRmDbUwRVJzPJ6B/1732588234062_77d46430.jpg" alt="WeSee Logo" style={{ height: 28, width: "auto" }} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 650,
              color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1,
            }}>
              WeSee
            </span>
          </Link>

          {/* ── Desktop: centered pill nav ── */}
          {isDesktop && (
            <nav
              aria-label="Main navigation"
              style={{
                position: "absolute", left: "50%",
                transform: "translateX(-50%)",
                display: "flex", alignItems: "center",
                gap: 0,
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)",
                border: "1px solid rgba(17,19,23,0.09)",
                borderRadius: 999,
                padding: "4px 6px",
              }}
            >
              {navItems.map((item) => {
                const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "6px 13px",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: isActive ? 550 : 400,
                      color: isActive ? "var(--ink)" : "rgba(17,19,23,0.48)",
                      textDecoration: "none",
                      transition: "color 0.22s ease, background 0.22s ease",
                      background: isActive ? "rgba(17,19,23,0.07)" : "transparent",
                      letterSpacing: "0.003em",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(17,19,23,0.48)"; }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* ── Right: CTA + hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, zIndex: 2 }}>
            {/* Book a Call — desktop only */}
            {isDesktop && (
              <a
                href="https://cal.com/wesee/discovery"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 18px",
                  background: "var(--ink)",
                  color: "#fff",
                  fontSize: 13, fontWeight: 500, letterSpacing: "0.005em",
                  borderRadius: 999,
                  border: "1.5px solid var(--ink)",
                  textDecoration: "none",
                  transition: "background 0.25s ease, transform 0.25s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#2a2d33";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Book a Call <span style={{ fontSize: 11, opacity: 0.75 }}>↗</span>
              </a>
            )}

            {/* Hamburger — mobile only */}
            {!isDesktop && (
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                style={{
                  width: 36, height: 36,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 5,
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(17,19,23,0.10)",
                  borderRadius: 999, cursor: "pointer", padding: 0,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <span style={{
                  display: "block", width: 16, height: 1.5,
                  background: "var(--ink)", borderRadius: 2,
                  transformOrigin: "center",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
                }} />
                <span style={{
                  display: "block", width: 16, height: 1.5,
                  background: "var(--ink)", borderRadius: 2,
                  transition: "opacity 0.3s ease", opacity: open ? 0 : 1,
                }} />
                <span style={{
                  display: "block", width: 16, height: 1.5,
                  background: "var(--ink)", borderRadius: 2,
                  transformOrigin: "center",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
                }} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      {!isDesktop && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(247,248,250,0.97)",
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          padding: "40px 36px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {/* Close button in top-right corner */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute", top: 18, right: 18,
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(17,19,23,0.06)",
              border: "1px solid rgba(17,19,23,0.09)",
              borderRadius: 999, cursor: "pointer",
              fontSize: 18, color: "var(--ink)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(17,19,23,0.12)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(17,19,23,0.06)"}
            aria-label="Close menu"
          >
            ×
          </button>

          <nav style={{ width: "100%" }}>
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  fontSize: "clamp(32px, 8vw, 52px)",
                  fontWeight: 400,
                  letterSpacing: "-0.035em",
                  color: location === item.href ? "var(--ink)" : "rgba(17,19,23,0.28)",
                  padding: "9px 0",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.45s ease ${i * 45}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms, color 0.25s ease`,
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--ink)"}
                onMouseLeave={e => {
                  if (location !== item.href) (e.currentTarget as HTMLElement).style.color = "rgba(17,19,23,0.28)";
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{
            marginTop: 40,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}>
            <a
              href="https://cal.com/wesee/discovery"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "14px 28px",
                background: "var(--ink)", color: "#fff",
                fontSize: 14, fontWeight: 500, borderRadius: 999,
                textDecoration: "none",
              }}
            >
              Book a Discovery Call ↗
            </a>
            <p style={{ fontSize: 13, color: "rgba(17,19,23,0.30)", marginTop: 20, letterSpacing: "0.02em" }}>
              hello@wesee.in
            </p>
          </div>
        </div>
      )}
    </>
  );
}
