interface SectionLabelProps {
  number: string;
  title: string;
}

export default function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888888" }}>
        ({number})
      </span>
      <span style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888888" }}>
        {title}
      </span>
    </div>
  );
}
