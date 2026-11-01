import { useRef } from 'react'
import SplitText from './reactbits/SplitText'
import CircularText from './reactbits/CircularText'
import BlurText from './reactbits/BlurText'
import { contact } from '../data/site'
import { gsap, prefersReducedMotion, scrollToSection, useGSAP } from '../lib/motion'

const titleClass = 'font-display font-light leading-[0.9] tracking-[-0.02em]'

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap
        .timeline()
        .fromTo(
          '[data-hero-image]',
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut' },
        )
        .from('[data-hero-image] img', { scale: 1.35, duration: 2.2, ease: 'expo.out' }, 0.2)
        .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: 0.1 }, 0.7)

      gsap.to('[data-hero-image] img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-title]', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root, dependencies: [ready] },
  )

  const line = (text: string, extra = '') =>
    ready ? (
      <SplitText
        text={text}
        tag="span"
        splitType="chars"
        effect="rise"
        mask
        trigger="load"
        delay={35}
        duration={1.3}
        ease="expo.out"
        textAlign="left"
        className={`${titleClass} ${extra}`}
      />
    ) : (
      <span className={`${titleClass} ${extra} invisible`}>{text}</span>
    )

  return (
    <section ref={root} id="top" className="gutter relative min-h-svh overflow-hidden pt-28 pb-16 lg:pt-32">
      <div className="flex items-center justify-between text-taupe" data-hero-fade>
        <span className="eyebrow">Kapsalon · Brugge</span>
        <span className="eyebrow hidden sm:inline">{contact.street}</span>
      </div>

      <div className="relative mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-6">
        <h1
          data-hero-title
          className="relative z-10 text-[clamp(3.6rem,12vw,12rem)] leading-[0.9] lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:pt-16"
          aria-label="Uw haar, onze hoofdzaak."
        >
          <span className="block" aria-hidden="true">
            {line('Uw haar,')}
          </span>
          <span className="block pl-[8vw]" aria-hidden="true">
            {line('onze')}{' '}
            {line('hoofdzaak.', 'italic text-brass')}
          </span>
        </h1>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div data-hero-image className="relative aspect-[4/5] overflow-hidden bg-sand lg:aspect-[3/4]">
            <img
              src="./images/hero.jpg"
              alt="Portret met wapperend haar in zwart-wit"
              className="h-[115%] w-full object-cover object-top grayscale-[30%]"
              fetchPriority="high"
            />
          </div>
          <button
            onClick={() => scrollToSection('afspraak')}
            className="absolute -bottom-12 -left-8 hidden text-espresso sm:block lg:-left-20"
            aria-label="Maak een afspraak"
            data-hero-fade
          >
            <CircularText
              text="OP AFSPRAAK • DE HOOFDZAAK • BRUGGE • "
              size={150}
              fontSize={11}
              fontWeight={500}
              letterSpacing={3}
              spinDuration={24}
              onHover="speedUp"
              className="rounded-full bg-cream"
            >
              <span className="font-display text-3xl italic text-brass">↓</span>
            </CircularText>
          </button>
        </div>

        <div className="max-w-md lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:-mt-4" data-hero-fade>
          {ready && (
            <BlurText
              text="Een kappersbeurt die voelt als een aangenaam moment: persoonlijk advies, de nieuwste technieken en 100% natuurlijke verzorging."
              animateBy="words"
              trigger="load"
              delay={40}
              className="text-base leading-relaxed text-umber sm:text-lg"
            />
          )}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={contact.phoneHref}
              className="eyebrow group inline-flex items-center gap-4 rounded-full bg-espresso px-7 py-4 text-cream transition-colors hover:bg-brass"
            >
              Bel {contact.phone}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <button
              onClick={() => scrollToSection('concept')}
              className="eyebrow border-b border-espresso/30 pb-1 text-umber hover:border-brass hover:text-brass"
            >
              Ontdek het salon
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
