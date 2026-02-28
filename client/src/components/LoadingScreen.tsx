import { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("wesee-loaded")) {
      setVisible(false);
      onComplete();
      return;
    }

    const totalSteps = 100;
    const intervalTime = 1800 / totalSteps;
    let current = 0;

    const timer = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        window.clearInterval(timer);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("wesee-loaded", "true");
            onComplete();
          }, 600);
        }, 200);
      }
    }, intervalTime);

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        setVisibleWords((prev) => prev + 1);
      }, 300 + i * 150);
    }

    return () => window.clearInterval(timer);
  }, []);

  if (!visible) return null;

  const line1 = ["We", "are", "builders."];
  const line2 = ["We", "are", "WeSee."];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div style={{ position: "absolute", top: 32, left: 32, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888888" }}>
          Loading
        </span>
        <span style={{ fontSize: 11, fontWeight: 300, color: "#888888" }}>
          ({count})
        </span>
      </div>

      <div style={{ textAlign: "center" }}>
        <div>
          <div style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15, minHeight: "1.2em" }}>
            {line1.map((word, i) => (
              <span
                key={`l1-${i}`}
                style={{
                  display: "inline-block",
                  marginRight: 12,
                  opacity: visibleWords > i ? 1 : 0,
                  transform: visibleWords > i ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15, minHeight: "1.2em", marginTop: 4 }}>
            {line2.map((word, i) => (
              <span
                key={`l2-${i}`}
                style={{
                  display: "inline-block",
                  marginRight: 12,
                  opacity: visibleWords > i + 3 ? 1 : 0,
                  transform: visibleWords > i + 3 ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
