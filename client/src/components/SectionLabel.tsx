interface SectionLabelProps {
  number: string;
  title: string;
  dark?: boolean;
}

export default function SectionLabel({ number, title, dark = false }: SectionLabelProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18,
      }}
    >
      <span style={{
        display: "inline-block",
        width: 24,
        height: 1,
        background: "#C9A84C",
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: dark ? "rgba(255,255,255,0.35)" : "#999999",
      }}>
        ({number}) {title}
      </span>
    </div>
  );
}
