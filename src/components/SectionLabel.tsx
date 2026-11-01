type Props = { index: string; label: string; tone?: 'dark' | 'light'; className?: string }

/** Roman-numeral section marker with a hairline rule. */
export default function SectionLabel({ index, label, tone = 'dark', className = '' }: Props) {
  const color = tone === 'dark' ? 'text-taupe' : 'text-cream/60'
  const rule = tone === 'dark' ? 'bg-espresso/20' : 'bg-cream/20'
  return (
    <div className={`flex items-center gap-4 ${color} ${className}`} data-reveal>
      <span className="font-display text-lg italic text-brass">{index}</span>
      <span className={`h-px w-12 ${rule}`} />
      <span className="eyebrow">{label}</span>
    </div>
  )
}
