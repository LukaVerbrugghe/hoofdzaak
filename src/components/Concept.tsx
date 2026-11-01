import ScrollReveal from './reactbits/ScrollReveal'
import SectionLabel from './SectionLabel'
import { concept } from '../data/site'

export default function Concept() {
  return (
    <section id="concept" className="gutter relative py-32 lg:py-48">
      <SectionLabel index="I" label="Concept" />

      <ScrollReveal
        enableBlur
        baseOpacity={0.12}
        blurStrength={6}
        baseRotation={0}
        containerClassName="mt-14 max-w-6xl"
        textClassName="font-display text-[clamp(1.9rem,4.4vw,4.4rem)] font-light leading-[1.12] tracking-[-0.01em]"
      >
        {concept}
      </ScrollReveal>

      <div className="mt-24 grid gap-12 lg:mt-36 lg:grid-cols-12 lg:gap-6">
        <figure className="lg:col-span-5 lg:col-start-2">
          <div data-parallax className="aspect-[4/5] overflow-hidden bg-sand">
            <img
              src="./images/interieur.jpg"
              alt="Rustig en licht salon-interieur met kappersstoelen"
              loading="lazy"
              className="h-[120%] w-full object-cover"
            />
          </div>
          <figcaption className="eyebrow mt-4 text-taupe">Het salon — Torhoutse Steenweg</figcaption>
        </figure>

        <div className="flex flex-col justify-end gap-14 lg:col-span-4 lg:col-start-8">
          <div data-parallax-soft className="aspect-square overflow-hidden bg-sand lg:w-3/4 lg:self-end">
            <img
              src="./images/wassen.jpg"
              alt="Haar wordt verzorgd aan de wastafel"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div data-reveal>
            <h3 className="font-display text-4xl font-light leading-tight">
              Persoonlijke aanpak, <em className="text-brass">persoonlijk advies.</em>
            </h3>
            <p className="mt-6 leading-relaxed text-umber">
              Bij ons bent u geen nummer. We nemen de tijd om te luisteren, geven eerlijk advies over wat bij u en uw
              haar past, en verwennen u met uitsluitend hoogwaardige verzorgingsproducten.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
