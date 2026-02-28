/*
 * Service Detail Page — Individual service deep-dive
 * Layout: Back link → Header → Content grid (2/3 + 1/3 sidebar) → Related
 */

import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { services, categories } from "@/data/services";

const categoryGradients: Record<number, string> = {
  1: "from-blue-100 via-indigo-50 to-sky-50",
  2: "from-emerald-100 via-teal-50 to-green-50",
  3: "from-orange-100 via-amber-50 to-yellow-50",
  4: "from-green-100 via-lime-50 to-emerald-50",
  5: "from-purple-100 via-violet-50 to-fuchsia-50",
  6: "from-pink-100 via-rose-50 to-red-50",
  7: "from-amber-100 via-yellow-50 to-orange-50",
  8: "from-indigo-100 via-blue-50 to-cyan-50",
  9: "from-slate-100 via-gray-50 to-zinc-50",
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="font-heading text-3xl font-bold">Service not found</h1>
        <Link href="/services" className="mt-4 inline-block text-[#2563EB] hover:underline">
          Back to services
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === service.categoryId);
  const relatedServices = services
    .filter((s) => s.categoryId === service.categoryId && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#2563EB] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to services
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 bg-[#f5f5f5] rounded-sm text-[#666]">
              {category?.name}
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
              service.status === "Live" ? "bg-green-50 text-green-600" :
              service.status === "In Progress" ? "bg-amber-50 text-amber-600" :
              "bg-blue-50 text-blue-600"
            }`}>
              {service.status}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1a1a1a]">
            {service.name}
          </h1>
          <p className="mt-4 text-lg text-[#555] max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </motion.div>

        {/* Hero gradient banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-10 w-full aspect-[16/5] rounded-sm overflow-hidden bg-gradient-to-br ${categoryGradients[service.categoryId] || "from-gray-100 to-gray-50"}`}
        >
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-center">
              <span className="font-mono text-xs tracking-widest text-[#999] block mb-2">
                SERVICE {String(service.id).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
              <span className="font-heading text-2xl md:text-3xl font-bold text-[#1a1a1a]/20">
                {category?.name.split(" & ")[0]}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-4">
                What it is
              </h2>
              <p className="text-base text-[#555] leading-relaxed">
                {service.fullDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-4">
                How it benefits you
              </h2>
              <p className="text-base text-[#555] leading-relaxed">
                {service.benefits}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-4">
                What automation brings
              </h2>
              <ul className="space-y-3">
                {service.automationPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#555]">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-4">
                Key deliverables
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-[#eee] rounded-sm">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full flex-shrink-0" />
                    <span className="text-sm text-[#555]">{del}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-28"
            >
              {/* Quick Info */}
              <div className="p-6 bg-[#fafafa] rounded-sm mb-6">
                <h3 className="font-heading text-sm font-semibold tracking-widest uppercase text-[#999] mb-4">
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-[#999]">Service Type</span>
                    <p className="text-sm font-medium text-[#1a1a1a]">{service.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#999]">Engagement Size</span>
                    <p className="text-sm font-medium text-[#1a1a1a]">{service.engagementSize}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#999]">Industries</span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {service.industries.map((ind) => (
                        <span key={ind} className="text-xs px-2 py-0.5 bg-white border border-[#eee] rounded-sm text-[#666]">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 bg-[#1a1a1a] rounded-sm text-white">
                <h3 className="font-heading text-lg font-semibold">
                  Interested in this service?
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Book a free discovery call and we'll show you exactly how this
                  can work for your business.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-sm hover:bg-[#1d4ed8] transition-colors w-full justify-center"
                >
                  Book a Call <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-24 border-t border-[#eee] pt-16">
            <h2 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-8">
              Related services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.id}
                  href={`/services/${rs.slug}`}
                  className="group p-6 border border-[#eee] rounded-sm hover:border-[#2563EB] transition-colors"
                >
                  <span className="text-xs font-mono text-[#999]">
                    {String(rs.id).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                    {rs.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#666] line-clamp-2">
                    {rs.shortDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:text-[#2563EB] transition-colors">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
