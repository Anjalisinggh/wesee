import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearch } from "wouter";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { services, categories } from "@/data/services";
import SectionLabel from "@/components/SectionLabel";
import CircularGallery from "@/components/CircularGallery";
import RotorGallery from "@/components/RotorGallery";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import ParticleWrapper from "@/components/ParticleWrapper";
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

type ColumnProps = {
  images: Array<{ src: string; title?: string; subtitle?: string }>;
  y: MotionValue<number>;
  isMobile?: boolean;
};

const Column = ({ images, y, isMobile = false }: ColumnProps) => {
  return (
    <motion.div
      className={`relative flex h-full flex-col ${isMobile ? '-top-[45%] first:top-[-45%] [&:nth-child(2)]:top-[-95%]' : '-top-[45%] flex-1 min-w-[280px] gap-[1.5vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]'}`}
      style={{ 
        y,
        ...(isMobile && { width: "49%", flex: "0 0 49%", gap: "8px" })
      }}
    >
      {images.map((item, i) => {
        const minHeight = isMobile ? "600px" : "500px";
        return (
          <div key={i} className={`relative w-full overflow-hidden group ${isMobile ? '' : 'flex-1'}`} style={{ minHeight: isMobile ? undefined : undefined, flex: isMobile ? "0 0 auto" : "1 1 auto", display: isMobile ? "block" : "flex", alignItems: isMobile ? "normal" : "center", justifyContent: isMobile ? "normal" : "center", marginBottom: isMobile ? "0" : undefined }}>
            <img
              src={item.src}
              alt="image"
              className={`pointer-events-none w-full ${isMobile ? "object-contain" : "object-cover"}`}
              style={{ height: isMobile ? "auto" : "100%", minHeight: isMobile ? undefined : undefined, maxHeight: isMobile ? "none" : "none", display: "block", width: "100%" }}
            />
            {item.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                  {item.subtitle && <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.9 }}>{item.subtitle}</div>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const ServicesParallaxGallery = ({ services }: { services: Array<{ image: string; name: string; category: string }> }) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Distribute all services evenly across columns
  // For mobile: 2 columns with all images
  // For desktop: 4 columns with all images
  const totalServices = services.length;
  
  // Create columns by distributing services evenly
  const col1: Array<{ src: string; title: string; subtitle: string }> = [];
  const col2: Array<{ src: string; title: string; subtitle: string }> = [];
  const col3: Array<{ src: string; title: string; subtitle: string }> = [];
  const col4: Array<{ src: string; title: string; subtitle: string }> = [];
  
  // Mobile columns (2 columns with all images)
  const mobileCol1: Array<{ src: string; title: string; subtitle: string }> = [];
  const mobileCol2: Array<{ src: string; title: string; subtitle: string }> = [];
  
  services.forEach((service, index) => {
    const item = { src: service.image, title: service.name, subtitle: service.category };
    
    // Desktop: Distribute evenly across 4 columns
    const columnIndex = index % 4;
    if (columnIndex === 0) col1.push(item);
    else if (columnIndex === 1) col2.push(item);
    else if (columnIndex === 2) col3.push(item);
    else col4.push(item);
    
    // Mobile: Distribute images with more in column 2
    // Use a 3-item cycle: 2 items go to col2, 1 item goes to col1
    // This gives approximately 33% to col1 and 67% to col2
    const cyclePosition = index % 3;
    if (cyclePosition === 0) {
      mobileCol1.push(item);
    } else {
      mobileCol2.push(item);
    }
  });
  
  // Ensure column 2 has more images - move any extras from col1 to col2
  while (mobileCol1.length >= mobileCol2.length && mobileCol1.length > 0) {
    const extraImage = mobileCol1.pop();
    if (extraImage) {
      mobileCol2.push(extraImage);
    }
  }
  
  // Duplicate images to fill columns for better parallax effect (ensure each column has at least 5-6 images)
  const imagesPerColumn = Math.ceil(totalServices / 4);
  const minImagesPerColumn = Math.max(imagesPerColumn, 6);
  const duplicateIfNeeded = (col: typeof col1) => {
    if (col.length < minImagesPerColumn) {
      const needed = minImagesPerColumn - col.length;
      const duplicated = [...col];
      for (let i = 0; i < needed; i++) {
        duplicated.push(col[i % col.length]);
      }
      return duplicated;
    }
    return col;
  };
  
  // Desktop columns
  const finalCol1 = duplicateIfNeeded(col1);
  const finalCol2 = duplicateIfNeeded(col2);
  const finalCol3 = duplicateIfNeeded(col3);
  const finalCol4 = duplicateIfNeeded(col4);
  
  // Mobile columns - duplicate to ensure smooth parallax scrolling
  // Each mobile column should have enough images for smooth scrolling
  const mobileImagesPerColumn = Math.ceil(totalServices / 2);
  const minMobileImagesPerColumn = Math.max(mobileImagesPerColumn, 10);
  const duplicateMobileIfNeeded = (col: typeof mobileCol1) => {
    if (col.length < minMobileImagesPerColumn) {
      const needed = minMobileImagesPerColumn - col.length;
      const duplicated = [...col];
      for (let i = 0; i < needed; i++) {
        duplicated.push(col[i % col.length]);
      }
      return duplicated;
    }
    return col;
  };
  
  const finalMobileCol1 = duplicateMobileIfNeeded(mobileCol1);
  const finalMobileCol2 = duplicateMobileIfNeeded(mobileCol2);

  return (
    <div className="w-full bg-[#eee] text-black rounded-3xl overflow-hidden mt-6">
      <div className="font-geist flex h-[25vh] items-center justify-center gap-2 relative">
        <div className="absolute left-0 top-[50%] -translate-y-1/2 w-full max-w-6xl px-4 container mx-auto">
          <div className="text-left">
            <div style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, marginBottom: "clamp(16px, 2vw, 24px)" }}>
              Our services.
            </div>
            <p className="body-text" style={{ maxWidth: "min(640px, 100%)", fontSize: "clamp(14px, 1.8vw, 16px)", color: "#3A3A3A", lineHeight: 1.6 }}>
              9 categories, 43 services — everything your business needs to automate, grow, and scale intelligently.
            </p>
          </div>
        </div>
        <div className="absolute left-1/2 bottom-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll down to see
          </span>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex overflow-hidden bg-white"
        style={{ 
          height: isMobile ? "350vh" : "300vh",
          gap: isMobile ? "1vw" : "1vw",
          padding: isMobile ? "0" : "1.5vw"
        }}
      >
        {isMobile ? (
          <>
            <Column images={finalMobileCol1} y={y} isMobile={isMobile} />
            <Column images={finalMobileCol2} y={y2} isMobile={isMobile} />
          </>
        ) : (
          <>
            <Column images={finalCol1} y={y} isMobile={isMobile} />
            <Column images={finalCol2} y={y2} isMobile={isMobile} />
            <Column images={finalCol3} y={y3} isMobile={isMobile} />
            <Column images={finalCol4} y={y4} isMobile={isMobile} />
          </>
        )}
      </div>
    </div>
  );
};

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

  // Prepare ring items - duplicate to reach 90 items
  const ringItems = useMemo(() => {
    const baseItems = filtered.map((s, i) => ({
      title: s.name,
      image: getServiceImage(s, i),
      url: `/services/${s.slug}`,
      category: s.category,
      categoryId: s.categoryId,
    }));
    
    // Duplicate items to reach 90 total
    const targetCount = 90;
    const repeatedItems: typeof baseItems = [];
    for (let i = 0; i < targetCount; i++) {
      repeatedItems.push(baseItems[i % baseItems.length]);
    }
    
    return repeatedItems;
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
        className="w-full sm:w-80 lg:w-96"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          background: "#FFFFFF",
          borderRight: "1px solid #EEEEEE",
          zIndex: 100,
          transform: filterOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          overflowY: "auto",
          padding: "clamp(20px, 3vw, 32px) clamp(16px, 2vw, 24px)",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "clamp(24px, 3vw, 32px)" }}>
          <div>
            <div style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 600, color: "#1A1A1A" }}>Filter Services ({filtered.length})</div>
            <ParticleWrapper>
              <button onClick={clearAll} className="cta-link" style={{ fontSize: "clamp(11px, 2vw, 13px)", color: "#888888", marginTop: "clamp(2px, 0.5vw, 4px)" }}>
                Clear all
              </button>
            </ParticleWrapper>
          </div>
          <ParticleWrapper>
            <button
              onClick={() => setFilterOpen(false)}
              style={{ fontSize: "clamp(20px, 4vw, 24px)", color: "#1A1A1A", padding: "clamp(6px, 1.5vw, 8px)", transition: "transform 0.3s ease", cursor: "none" }}
              onMouseEnter={e => e.currentTarget.style.transform = "rotate(90deg)"}
              onMouseLeave={e => e.currentTarget.style.transform = "rotate(0)"}
            >
              ×
            </button>
          </ParticleWrapper>
        </div>

        {[
          { key: "category", label: "CATEGORY", items: [{ label: "All", value: null as any }, ...categories.map(c => ({ label: c.name, value: c.id }))], selected: selectedCategory, onSelect: setSelectedCategory },
          { key: "industry", label: "INDUSTRY", items: [{ label: "All", value: null as any }, ...industries.map(ind => ({ label: ind, value: ind }))], selected: selectedIndustry, onSelect: setSelectedIndustry },
          { key: "size", label: "ENGAGEMENT SIZE", items: [{ label: "All", value: null as any }, ...engagementSizes.map(s => ({ label: s, value: s }))], selected: selectedSize, onSelect: setSelectedSize },
          { key: "status", label: "STATUS", items: [{ label: "All", value: null as any }, ...statuses.map(s => ({ label: s, value: s }))], selected: selectedStatus, onSelect: setSelectedStatus },
        ].map((group) => (
          <div key={group.key} style={{ borderTop: "1px solid #EEEEEE" }}>
            <ParticleWrapper>
              <button
                onClick={() => setExpandedFilter(expandedFilter === group.key ? null : group.key)}
                className="w-full flex items-center justify-between"
                style={{ padding: "clamp(12px, 2vw, 16px) 0", fontSize: "clamp(10px, 1.8vw, 11px)", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888", cursor: "none" }}
              >
                {group.label}
                <span style={{ fontSize: "clamp(14px, 2.5vw, 16px)", transition: "transform 0.3s ease", transform: expandedFilter === group.key ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
            </ParticleWrapper>
            <div
              style={{
                maxHeight: expandedFilter === group.key ? "clamp(400px, 80vh, 600px)" : 0,
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div style={{ paddingBottom: "clamp(12px, 2vw, 16px)" }}>
                {group.items.map((item, i) => (
                  <ParticleWrapper key={i}>
                    <button
                      onClick={() => group.onSelect(item.value)}
                      className="block w-full text-left service-row-hover"
                      style={{
                        padding: "clamp(6px, 1.5vw, 8px) 0",
                        fontSize: "clamp(12px, 2.2vw, 14px)",
                        fontWeight: group.selected === item.value ? 600 : 400,
                        color: group.selected === item.value ? "#1A1A1A" : "#3A3A3A",
                        transition: "all 0.3s ease",
                        cursor: "none",
                      }}
                    >
                      {item.label}
                      {group.selected === item.value && <span style={{ marginLeft: "clamp(6px, 1.5vw, 8px)", fontSize: "clamp(10px, 1.8vw, 11px)" }}>●</span>}
                    </button>
                  </ParticleWrapper>
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
          <div className="fixed top-12 sm:top-16 md:top-20 left-3 sm:left-4 md:left-6 lg:left-8 z-[60]">
            <ParticleWrapper>
              <button
                onClick={() => setFilterOpen(true)}
                className="font-medium text-[var(--ink)] tracking-[0.02em] bg-[rgba(248,248,246,0.88)] backdrop-blur-md border border-[rgba(17,19,23,0.12)] rounded-[20px]"
                style={{ 
                  fontSize: "clamp(10px, 2vw, 13px)",
                  padding: "clamp(4px, 1vw, 6px) clamp(10px, 2.5vw, 16px)",
                  cursor: "none"
                }}
              >
                Filter Services +
              </button>
            </ParticleWrapper>
          </div>
          <div className="fixed top-12 sm:top-16 md:top-20 right-3 sm:right-4 md:right-6 lg:right-8 z-[60]">
            <ParticleWrapper>
              <button
                onClick={() => setViewMode("grid")}
                className="font-medium text-[var(--ink)] tracking-[0.02em] bg-[rgba(248,248,246,0.88)] backdrop-blur-md border border-[rgba(17,19,23,0.12)] rounded-[20px]"
                style={{ 
                  fontSize: "clamp(10px, 2vw, 13px)",
                  padding: "clamp(4px, 1vw, 6px) clamp(10px, 2.5vw, 16px)",
                  cursor: "none"
                }}
              >
                Grid view ⊞
              </button>
            </ParticleWrapper>
          </div>
          <ParticleWrapper>
            <RotorGallery 
              items={ringItems} 
              gapPx={500}
              speedSec={31}
              camY={5}
              categoryLabels={ringCategoryLabels}
            />
          </ParticleWrapper>
        </div>
      )}

      {/* ═══ GRID VIEW — Enhanced with TiltCard and stagger ═══ */}
      {viewMode === "grid" && (
        <div className="pt-10 sm:pt-12 md:pt-16 lg:pt-20">
          <div className="fixed top-12 sm:top-16 md:top-20 right-3 sm:right-4 md:right-6 lg:right-8 z-[60]">
            <ParticleWrapper>
              <button
                onClick={() => setViewMode("ring")}
                className="font-medium text-[var(--ink)] tracking-[0.02em] bg-[rgba(248,248,246,0.88)] backdrop-blur-md border border-[rgba(17,19,23,0.12)] rounded-[20px]"
                style={{ 
                  fontSize: "clamp(10px, 2vw, 13px)",
                  padding: "clamp(4px, 1vw, 6px) clamp(10px, 2.5vw, 16px)",
                  cursor: "none"
                }}
              >
                Ring view ○
              </button>
            </ParticleWrapper>
          </div>

          <div className="section-padding">
            <div className="container">
              <div className="gsap-reveal">
                <SectionLabel number="01" title="SERVICES" />
              </div>

              <ParticleWrapper>
                <button onClick={() => setFilterOpen(true)} className="md:hidden cta-link" style={{ marginTop: "clamp(16px, 3vw, 24px)", fontSize: "clamp(12px, 2.2vw, 14px)" }}>
                  Filter Services +
                </button>
              </ParticleWrapper>

              {/* Parallax gallery with service images */}
              <ServicesParallaxGallery services={filtered.map((service, i) => ({
                image: getServiceImage(service, i),
                name: service.name,
                category: service.category
              }))} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
