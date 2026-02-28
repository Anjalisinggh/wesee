interface SectionLabelProps {
  number: string;
  title: string;
}

export default function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="section-number">({number})</span>
      <span className="text-xs font-medium tracking-widest uppercase text-[#999]">
        {title}
      </span>
    </div>
  );
}
