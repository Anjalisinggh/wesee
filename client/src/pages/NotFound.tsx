import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <span className="font-mono text-sm text-[#999] tracking-wider">(404)</span>
        <h1 className="mt-4 font-heading text-5xl md:text-7xl font-bold text-[#1a1a1a]">
          Page not found.
        </h1>
        <p className="mt-4 text-base text-[#666]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm hover:bg-[#2563EB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}
