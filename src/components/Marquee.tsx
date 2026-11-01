import ScrollVelocity from './reactbits/ScrollVelocity'

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-espresso/10 py-8 lg:py-12" aria-hidden="true">
      <ScrollVelocity
        texts={['Op afspraak · Natuurlijk · Persoonlijk · Rustig ·', 'De Hoofdzaak · Brugge · O Way ·']}
        velocity={40}
        numCopies={4}
        gap={32}
        outlineAlternate
        className="font-display text-[clamp(3rem,8vw,8rem)] font-light italic leading-none tracking-[-0.02em] text-espresso"
      />
    </div>
  )
}
