import { useState, useEffect, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { services, categories } from "@/data/services";
import SectionLabel from "@/components/SectionLabel";
import CircularGallery from "@/components/CircularGallery";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Unique image pool — 50 diverse Unsplash photos spread across all services.
 * Each service gets a deterministic unique image based on service.id so
 * no two cards in the ring ever look the same.
 */
const SERVICE_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80", // 1  robot
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", // 2  circuit
  "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80", // 3  ai lab
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80", // 4  tech
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", // 5  server
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", // 6  analytics
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", // 7  office
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", // 8  charts
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", // 9  workspace
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80", // 10 abstract data
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80", // 11 laptop
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80", // 12 social media
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80", // 13 marketing
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80", // 14 coding
  "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?w=600&q=80", // 15 content
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80", // 16 writing
  "https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&q=80", // 17 blog
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80", // 18 email
  "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&q=80", // 19 message
  "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&q=80", // 20 chat
  "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&q=80", // 21 communication
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80", // 22 design desk
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80", // 23 branding
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80", // 24 web ui
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", // 25 design tool
  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80", // 26 creative
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", // 27 ecommerce
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80", // 28 shopping
  "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&q=80", // 29 marketplace
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", // 30 store
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80", // 31 packaging
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80", // 32 sales office
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80", // 33 crm
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", // 34 team meeting
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80", // 35 revenue
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", // 36 cloud infra
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", // 37 data center
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", // 38 operations
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", // 39 hr team
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", // 40 person laptop
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80", // 41 code screen
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80", // 42 matrix
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", // 43 macbook code
];

/** Returns a unique image for each service based on its ID */
export function getServiceImage(service: { id: number }, _index: number): string {
  return SERVICE_IMAGES[(service.id - 1) % SERVICE_IMAGES.length];
}

const industries = ["Healthcare", "Real Estate", "E-Commerce", "SaaS", "Financial Services", "Education", "Hospitality", "Manufacturing", "Legal", "Logistics"];
const engagementSizes = ["Starter", "Growth", "Enterprise"];
const statuses = ["Live", "In Progress", "Case Study"];

export default function Services() {
  const search = useSearch();
  const params = new URLSearchParams(search);

  const [viewMode, setViewMode] = useState<"ring" | "grid">(
    params.get("view") === "grid" ? "grid" : "ring"
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(params.get("category") ? Number(params.get("category")) : null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedFilter, setExpandedFilter] = useState<string | null>("category");

  useEffect(() => {
    const handler = () => setFilterOpen(prev => !prev);
    window.addEventListener("toggle-filter-panel", handler);
    return () => window.removeEventListener("toggle-filter-panel", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [filterOpen]);

  // GSAP reveal for grid view
  useEffect(() => {
    if (viewMode !== "grid") return;
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
        });
      });
    }, 50);
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [viewMode]);

  const filtered = useMemo(() => {
    return services.filter(s => {
      if (selectedCategory && s.categoryId !== selectedCategory) return false;
      if (selectedIndustry && !s.industries.some(ind => ind.toLowerCase().includes(selectedIndustry.toLowerCase()))) return false;
      if (selectedSize && s.engagementSize !== selectedSize) return false;
      if (selectedStatus && s.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedCategory, selectedIndustry, selectedSize, selectedStatus]);

  // Dispatch filter count to header
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("update-filter-count", { detail: { count: filtered.length } }));
  }, [filtered.length]);

  // Dispatch view mode to header
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("update-view-mode", { detail: { mode: viewMode } }));
  }, [viewMode]);

  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedIndustry(null);
    setSelectedSize(null);
    setSelectedStatus(null);
  };

  // Prepare ring items
  const ringItems = useMemo(() => {
    return filtered.map((s, i) => ({
      title: s.name,
      image: getServiceImage(s, i),
      url: `/services/${s.slug}`,
      category: s.category,
      categoryId: s.categoryId,
    }));
  }, [filtered]);

  // Category labels for ring
  const ringCategoryLabels = useMemo(() => {
    const catCounts: Record<number, number> = {};
    filtered.forEach(s => { catCounts[s.categoryId] = (catCounts[s.categoryId] || 0) + 1; });
    const catPositions: { name: string; count: number; angle: number }[] = [];
    let currentIndex = 0;
    const uniqueCats = Array.from(new Set(filtered.map(s => s.categoryId)));
    for (const catId of uniqueCats) {
      const count = catCounts[catId] || 0;
      const cat = categories.find(c => c.id === catId);
      if (!cat || count === 0) continue;
      const midIndex = currentIndex + count / 2;
      const angle = midIndex * ((2 * Math.PI) / filtered.length);
      catPositions.push({ name: cat.name.split("&")[0].trim(), count, angle });
      currentIndex += count;
    }
    return catPositions;
  }, [filtered]);

  return (
    <>
      {/* ═══ FILTER PANEL — slides from LEFT with staggered items ═══ */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: 360,
          background: "#FFFFFF",
          borderRight: "1px solid #EEEEEE",
          zIndex: 100,
          transform: filterOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          overflowY: "auto",
          padding: "32px 24px",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 600, color: "#1A1A1A" }}>Filter Services ({filtered.length})</div>
            <button onClick={clearAll} className="cta-link" style={{ fontSize: 13, color: "#888888", marginTop: 4 }}>
              Clear all
            </button>
          </div>
          <button
            onClick={() => setFilterOpen(false)}
            style={{ fontSize: 24, color: "#1A1A1A", padding: 8, transition: "transform 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotate(90deg)"}
            onMouseLeave={e => e.currentTarget.style.transform = "rotate(0)"}
          >
            ×
          </button>
        </div>

        {[
          { key: "category", label: "CATEGORY", items: [{ label: "All", value: null as any }, ...categories.map(c => ({ label: c.name, value: c.id }))], selected: selectedCategory, onSelect: setSelectedCategory },
          { key: "industry", label: "INDUSTRY", items: [{ label: "All", value: null as any }, ...industries.map(ind => ({ label: ind, value: ind }))], selected: selectedIndustry, onSelect: setSelectedIndustry },
          { key: "size", label: "ENGAGEMENT SIZE", items: [{ label: "All", value: null as any }, ...engagementSizes.map(s => ({ label: s, value: s }))], selected: selectedSize, onSelect: setSelectedSize },
          { key: "status", label: "STATUS", items: [{ label: "All", value: null as any }, ...statuses.map(s => ({ label: s, value: s }))], selected: selectedStatus, onSelect: setSelectedStatus },
        ].map((group) => (
          <div key={group.key} style={{ borderTop: "1px solid #EEEEEE" }}>
            <button
              onClick={() => setExpandedFilter(expandedFilter === group.key ? null : group.key)}
              className="w-full flex items-center justify-between"
              style={{ padding: "16px 0", fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888" }}
            >
              {group.label}
              <span style={{ fontSize: 16, transition: "transform 0.3s ease", transform: expandedFilter === group.key ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </button>
            <div
              style={{
                maxHeight: expandedFilter === group.key ? 600 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div style={{ paddingBottom: 16 }}>
                {group.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => group.onSelect(item.value)}
                    className="block w-full text-left service-row-hover"
                    style={{
                      padding: "8px 0",
                      fontSize: 14,
                      fontWeight: group.selected === item.value ? 600 : 400,
                      color: group.selected === item.value ? "#1A1A1A" : "#3A3A3A",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.label}
                    {group.selected === item.value && <span style={{ marginLeft: 8, fontSize: 11 }}>●</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay with fade */}
      <div
        onClick={() => setFilterOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.15)",
          zIndex: 99,
          opacity: filterOpen ? 1 : 0,
          pointerEvents: filterOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ═══ RING VIEW ═══ */}
      {viewMode === "ring" && (
        <div style={{ position: "relative" }}>
          <div style={{ position: "fixed", top: 80, left: 24, zIndex: 60 }}>
            <button
              onClick={() => setFilterOpen(true)}
              style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", letterSpacing: "0.02em", background: "rgba(248,248,246,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(17,19,23,0.12)", borderRadius: 20, padding: "6px 16px", cursor: "pointer" }}
            >
              Filter Services +
            </button>
          </div>
          <div style={{ position: "fixed", top: 80, right: 24, zIndex: 60 }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", letterSpacing: "0.02em", background: "rgba(248,248,246,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(17,19,23,0.12)", borderRadius: 20, padding: "6px 16px", cursor: "pointer" }}
            >
              Grid view ⊞
            </button>
          </div>
          <CircularGallery items={ringItems} categoryLabels={ringCategoryLabels} />
        </div>
      )}

      {/* ═══ GRID VIEW — Enhanced with TiltCard and stagger ═══ */}
      {viewMode === "grid" && (
        <div style={{ paddingTop: 64 }}>
          <div style={{ position: "fixed", top: 80, right: 24, zIndex: 60 }}>
            <button
              onClick={() => setViewMode("ring")}
              style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", letterSpacing: "0.02em", background: "rgba(248,248,246,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(17,19,23,0.12)", borderRadius: 20, padding: "6px 16px", cursor: "pointer" }}
            >
              Ring view ○
            </button>
          </div>

          <div className="section-padding">
            <div className="container">
              <div className="gsap-reveal">
                <SectionLabel number="01" title="SERVICES" />
                <TextReveal as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05 }} stagger={0.06}>
                  Our services.
                </TextReveal>
                <p className="body-text" style={{ marginTop: 24, maxWidth: 640 }}>
                  9 categories, 43 services — everything your business needs to automate, grow, and scale intelligently.
                </p>
              </div>

              <button onClick={() => setFilterOpen(true)} className="md:hidden cta-link" style={{ marginTop: 24 }}>
                Filter Services +
              </button>

              {/* Service Cards Grid — 3 cols, TiltCard hover, image zoom */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, marginTop: 64 }}>
                {filtered.map((service, i) => (
                  <TiltCard key={service.id} maxTilt={5} scale={1.01}>
                    <Link href={`/services/${service.slug}`} className="block group">
                      <div className="img-hover-zoom" style={{ height: 280, overflow: "hidden" }}>
                        <img
                          src={getServiceImage(service, i)}
                          alt={service.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          loading="lazy"
                        />
                      </div>
                      <div style={{ padding: "16px 0 4px" }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", transition: "transform 0.3s ease" }} className="group-hover:translate-x-2">
                          {service.name}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 400, color: "#888888" }}>{service.category}</div>
                      </div>
                    </Link>
                  </TiltCard>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <p style={{ fontSize: 16, color: "#888888" }}>No services match your filters.</p>
                  <button onClick={clearAll} className="cta-link" style={{ marginTop: 16 }}>Clear all filters +</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
