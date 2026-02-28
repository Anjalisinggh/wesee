/*
 * Services / Projects Page — Modeled after CLOU Architects Projects page
 * Features: Filter panel, category tabs, service cards grid
 */

import { useState, useMemo, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ArrowUpRight } from "lucide-react";
import { services, categories, serviceTypes, industryFilters, statusFilters, engagementFilters } from "@/data/services";
import SectionLabel from "@/components/SectionLabel";

const categoryColors: Record<number, string> = {
  1: "bg-blue-50 text-blue-700",
  2: "bg-emerald-50 text-emerald-700",
  3: "bg-orange-50 text-orange-700",
  4: "bg-green-50 text-green-700",
  5: "bg-purple-50 text-purple-700",
  6: "bg-pink-50 text-pink-700",
  7: "bg-amber-50 text-amber-700",
  8: "bg-indigo-50 text-indigo-700",
  9: "bg-slate-50 text-slate-700",
};

export default function Services() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    params.get("category") ? parseInt(params.get("category")!) : null
  );
  const [activeType, setActiveType] = useState<string | null>(params.get("type") || null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [activeEngagement, setActiveEngagement] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (activeCategory && s.categoryId !== activeCategory) return false;
      if (activeType && s.serviceType !== activeType) return false;
      if (activeIndustry && !s.industries.some(ind => ind.toLowerCase().includes(activeIndustry.toLowerCase()))) return false;
      if (activeStatus && s.status !== activeStatus) return false;
      if (activeEngagement && s.engagementSize !== activeEngagement) return false;
      return true;
    });
  }, [activeCategory, activeType, activeIndustry, activeStatus, activeEngagement]);

  const activeFilterCount = [activeCategory, activeType, activeIndustry, activeStatus, activeEngagement].filter(Boolean).length;

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveType(null);
    setActiveIndustry(null);
    setActiveStatus(null);
    setActiveEngagement(null);
  };

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [filterOpen]);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <div className="container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="P" title="Services" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a]">
            Our services.
          </h1>
          <p className="mt-4 text-lg text-[#555] max-w-2xl">
            9 categories, 43 services — everything your business needs to
            automate, grow, and scale intelligently.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="mt-10 flex items-center justify-between border-b border-[#eee] pb-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 text-sm font-medium px-3 py-1.5 rounded-sm transition-colors ${
                !activeCategory ? "bg-[#1a1a1a] text-white" : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`flex-shrink-0 text-sm font-medium px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
                  activeCategory === cat.id ? "bg-[#1a1a1a] text-white" : "text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                {cat.name.split(" & ")[0].split(",")[0]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex-shrink-0 ml-4 flex items-center gap-2 text-sm font-medium text-[#666] hover:text-[#1a1a1a] transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 bg-[#2563EB] text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Results count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[#999]">
            {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""}
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#2563EB] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Service Cards Grid */}
        <div className="mt-8 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block p-6 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-all duration-300 h-full"
                >
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-sm ${categoryColors[service.categoryId] || "bg-gray-50 text-gray-700"}`}>
                      {service.category.split(" & ")[0].split(",")[0]}
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
                      service.status === "Live" ? "bg-green-50 text-green-600" :
                      service.status === "In Progress" ? "bg-amber-50 text-amber-600" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {service.status}
                    </span>
                  </div>

                  {/* Service thumbnail placeholder */}
                  <div className="w-full aspect-[16/9] rounded-sm mb-4 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${
                        service.categoryId <= 3 ? '#e0e7ff, #dbeafe' :
                        service.categoryId <= 6 ? '#d1fae5, #ecfdf5' :
                        '#fef3c7, #fef9c3'
                      })`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-heading text-4xl font-bold text-white/40">
                        {String(service.id).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#666] leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-[#999]">
                    <span>{service.serviceType}</span>
                    <span>·</span>
                    <span>{service.engagementSize}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                    Learn more
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredServices.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-[#999]">No services match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-sm text-[#2563EB] hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Slide-out Panel */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-50"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-heading text-lg font-semibold">Filters</h3>
                  <button onClick={() => setFilterOpen(false)}>
                    <X className="w-5 h-5 text-[#666]" />
                  </button>
                </div>

                {/* Service Type */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-3">
                    Service Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {serviceTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setActiveType(activeType === type ? null : type)}
                        className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                          activeType === type
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-[#eee] text-[#666] hover:border-[#ccc]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-3">
                    Industry
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {industryFilters.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setActiveIndustry(activeIndustry === ind ? null : ind)}
                        className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                          activeIndustry === ind
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-[#eee] text-[#666] hover:border-[#ccc]"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-3">
                    Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map((status) => (
                      <button
                        key={status}
                        onClick={() => setActiveStatus(activeStatus === status ? null : status)}
                        className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                          activeStatus === status
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-[#eee] text-[#666] hover:border-[#ccc]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engagement Size */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-3">
                    Engagement Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {engagementFilters.map((eng) => (
                      <button
                        key={eng}
                        onClick={() => setActiveEngagement(activeEngagement === eng ? null : eng)}
                        className={`text-sm px-3 py-1.5 rounded-sm border transition-colors ${
                          activeEngagement === eng
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-[#eee] text-[#666] hover:border-[#ccc]"
                        }`}
                      >
                        {eng}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 border border-[#eee] text-sm font-medium rounded-sm hover:border-[#ccc] transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="flex-1 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm hover:bg-[#2563EB] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
