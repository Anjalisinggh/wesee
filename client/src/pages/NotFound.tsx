import { Link } from "wouter";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 64 }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 300, color: "#888888" }}>(404)</span>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, marginTop: 16 }}>
          Page not found.
        </h1>
        <p style={{ fontSize: 16, fontWeight: 400, color: "#888888", marginTop: 16 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" style={{ display: "inline-block", marginTop: 32, padding: "16px 32px", background: "#1A1A1A", color: "#FFFFFF", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
          Back to home +
        </Link>
      </div>
    </div>
  );
}
