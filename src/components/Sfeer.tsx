import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import { ScrollTrigger, gsap, useGSAP } from '../lib/motion'

const shots = [
  { src: './images/fohnen.jpg', alt: 'Föhnen met ronde borstel', caption: 'Brushing', ratio: 'aspect-[4/3]' },
  { src: './images/krullen.jpg', alt: 'Krullen met een krultang', caption: 'Styling', ratio: 'aspect-[3/4]' },
  { src: './images/kleur.jpg', alt: 'Lang haar met warme highlights', caption: 'Kleur', ratio: 'aspect-[3/4]' },
  { src: './images/opsteken.jpg', alt: 'Kapster steekt het haar op in het salon', caption: 'Opsteken', ratio: 'aspect-[3/4]' },
  { src: './images/wassen.jpg', alt: 'Haarverzorging aan de wastafel', caption: 'Verzorging', ratio: 'aspect-[4/3]' },
]

/** Horizontal, scroll-driven gallery on desktop; a simple swipeable row on small screens. */
export default function Sfeer() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => (track.current ? track.current.scrollWidth - window.innerWidth : 0)
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        gsap.utils.toArray<HTMLElement>('[data-shot] img').forEach(img => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
        ScrollTrigger.refresh()
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="sfeer" className="relative overflow-hidden bg-sand py-24 lg:flex lg:h-svh lg:items-center lg:py-0">
      <div
        ref={track}
        className="gutter flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:snap-none lg:items-center lg:gap-16 lg:overflow-visible lg:pb-0"
      >
        <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center sm:w-[50vw] lg:w-[34vw]">
          <SectionLabel index="IV" label="Sfeer" />
          <h2 className="mt-10 font-display text-[clamp(2.6rem,5vw,5.4rem)] font-light leading-[1.02] tracking-[-0.015em]">
            Vakmanschap <em className="text-brass">in alle rust.</em>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-umber">
            Van knippen en kleuren tot brushing en opsteken: elke behandeling krijgt de tijd en aandacht die ze
            verdient.
          </p>
          <span className="eyebrow mt-10 hidden items-center gap-3 text-taupe lg:flex">
            Scroll <span className="h-px w-10 bg-taupe/50" />
          </span>
        </div>

        {shots.map((shot, i) => (
          <figure
            key={shot.src}
            className={`w-[75vw] shrink-0 snap-start sm:w-[45vw] ${
              shot.ratio === 'aspect-[4/3]' ? 'lg:w-[44vw]' : 'lg:w-[26vw]'
            } ${i % 2 ? 'lg:mt-32' : 'lg:-mt-24'}`}
          >
            <div data-shot className={`${shot.ratio} overflow-hidden bg-cream`}>
              <img src={shot.src} alt={shot.alt} loading="lazy" className="h-full w-[116%] max-w-none -ml-[8%] object-cover" />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between text-taupe">
              <span className="eyebrow">{shot.caption}</span>
              <span className="font-display italic">0{i + 1}</span>
            </figcaption>
          </figure>
        ))}
        <div className="w-px shrink-0 lg:w-[8vw]" aria-hidden="true" />
      </div>
    </section>
  )
}
