import { useRef } from 'react'
import SectionLabel from './SectionLabel'
import SplitText from './reactbits/SplitText'
import CountUp from './reactbits/CountUp'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion'

const pillars = [
  { title: 'Plantaardig', body: 'Formules op basis van natuurlijke, biologische ingrediënten.' },
  { title: 'Zacht voor uw haar', body: 'Verzorging die uw haar en hoofdhuid respecteert, ook bij kleuren.' },
  { title: 'Ook voor thuis', body: 'Neem de verzorging mee: de producten zijn te koop in het salon.' },
]

export default function Producten() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-product-image]',
        { clipPath: 'inset(12% 12% 12% 12%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: '[data-product-image]', start: 'top 90%', end: 'center center', scrub: true },
        },
      )
      gsap.fromTo(
        '[data-product-image] img',
        { scale: 1.25 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-product-image]', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} id="producten" className="gutter relative py-32 lg:py-48">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <SectionLabel index="III" label="Onze producten" />
          <SplitText
            text="Verzorgd met O Way."
            tag="h2"
            splitType="chars"
            effect="rise"
            mask
            delay={25}
            duration={1.2}
            ease="expo.out"
            textAlign="left"
            className="mt-10 font-display text-[clamp(2.8rem,6vw,6rem)] font-light leading-none tracking-[-0.02em]"
          />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-umber" data-reveal>
            Ecologisch werken is voor ons vanzelfsprekend. Daarom wordt u bij De Hoofdzaak verzorgd met de
            100% natuurlijke producten van O Way: zuivere haarverzorging, zonder compromissen op resultaat.
          </p>

          <div className="mt-14 flex items-end gap-6" data-reveal>
            <CountUp
              to={100}
              duration={2.4}
              suffix="%"
              className="font-display text-[clamp(4.5rem,9vw,8rem)] font-light leading-none text-brass"
            />
            <span className="eyebrow mb-4 max-w-[10rem] text-taupe">natuurlijke verzorging</span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-product-image className="relative aspect-[4/5] overflow-hidden bg-sand">
            <img
              src="./images/producten.jpg"
              alt="Natuurlijk verzorgingsproduct met groene bladeren"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <ul className="mt-24 grid gap-px bg-espresso/10 sm:grid-cols-3 lg:mt-32">
        {pillars.map((pillar, i) => (
          <li key={pillar.title} className="bg-cream p-8 lg:p-12" data-reveal>
            <span className="font-display text-lg italic text-brass">0{i + 1}</span>
            <h3 className="mt-6 font-display text-3xl font-light">{pillar.title}</h3>
            <p className="mt-3 leading-relaxed text-umber">{pillar.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
