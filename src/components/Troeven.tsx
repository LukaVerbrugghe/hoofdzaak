import { useRef, useState } from 'react'
import SectionLabel from './SectionLabel'
import SplitText from './reactbits/SplitText'
import { troeven } from '../data/site'
import { gsap, useGSAP } from '../lib/motion'

export default function Troeven() {
  const root = useRef<HTMLElement>(null)
  const follower = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  useGSAP(
    () => {
      move.current = {
        x: gsap.quickTo(follower.current, 'x', { duration: 0.7, ease: 'expo.out' }),
        y: gsap.quickTo(follower.current, 'y', { duration: 0.7, ease: 'expo.out' }),
      }
      gsap.from('[data-troef-rule]', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-troef-list]', start: 'top 80%' },
      })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      gsap.to(follower.current, {
        autoAlpha: active === null ? 0 : 1,
        scale: active === null ? 0.85 : 1,
        duration: 0.5,
        ease: 'expo.out',
      })
    },
    { dependencies: [active], scope: root },
  )

  const onMove = (e: React.PointerEvent) => {
    const box = root.current?.getBoundingClientRect()
    if (!box || !move.current) return
    move.current.x(e.clientX - box.left)
    move.current.y(e.clientY - box.top)
  }

  return (
    <section
      ref={root}
      id="troeven"
      className="gutter relative overflow-hidden bg-espresso py-32 text-cream lg:py-48"
      onPointerMove={onMove}
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="II" label="Onze troeven" tone="light" />
          <SplitText
            text="Vier redenen om even tot rust te komen."
            tag="h2"
            splitType="words"
            effect="rise"
            mask
            delay={60}
            duration={1.2}
            ease="expo.out"
            textAlign="left"
            className="mt-10 font-display text-[clamp(2.4rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.015em]"
          />
        </div>
      </div>

      <ul data-troef-list className="mt-20 lg:mt-28" onPointerLeave={() => setActive(null)}>
        {troeven.map((troef, i) => (
          <li key={troef.title} className="relative" onPointerEnter={() => setActive(i)}>
            <span data-troef-rule className="absolute inset-x-0 top-0 h-px bg-cream/15" />
            <div
              className={`grid gap-6 py-10 transition-opacity duration-500 lg:grid-cols-12 lg:items-baseline lg:py-14 ${
                active !== null && active !== i ? 'lg:opacity-35' : ''
              }`}
            >
              <span className="font-display text-xl italic text-brass lg:col-span-1">0{i + 1}</span>
              <h3 className="font-display text-[clamp(2.4rem,6vw,6rem)] font-light leading-none tracking-[-0.02em] lg:col-span-6">
                {troef.title}
              </h3>
              <div className="lg:col-span-4 lg:col-start-9" data-reveal>
                <p className="font-display text-2xl italic text-brass-light">{troef.lead}</p>
                <p className="mt-3 leading-relaxed text-cream/65">{troef.body}</p>
              </div>
              <img
                src={troef.image}
                alt=""
                loading="lazy"
                className="aspect-[16/10] w-full object-cover lg:hidden"
              />
            </div>
          </li>
        ))}
        <li aria-hidden="true" className="h-px bg-cream/15" data-troef-rule />
      </ul>

      <div
        ref={follower}
        className="pointer-events-none absolute top-0 left-0 z-10 hidden h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-0 lg:block"
        aria-hidden="true"
      >
        {troeven.map((troef, i) => (
          <img
            key={troef.image}
            src={troef.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[var(--ease-expo)] ${
              active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
