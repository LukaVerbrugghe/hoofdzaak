import SectionLabel from './SectionLabel'
import { contact } from '../data/site'

export default function Ligging() {
  return (
    <section id="ligging" className="gutter relative pb-32 lg:pb-48">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col justify-between gap-12 lg:col-span-4">
          <div>
            <SectionLabel index="VI" label="Ligging" />
            <h2 className="mt-10 font-display text-[clamp(2.6rem,5vw,5rem)] font-light leading-none tracking-[-0.02em]" data-reveal>
              Vlak bij <em className="text-brass">Brugge.</em>
            </h2>
          </div>
          <address className="not-italic" data-reveal>
            <p className="font-display text-3xl font-light leading-snug">
              {contact.street}
              <br />
              {contact.city}
            </p>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="eyebrow group mt-8 inline-flex items-center gap-3 border-b border-espresso/30 pb-1 hover:border-brass hover:text-brass"
            >
              Plan uw route
              <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </a>
          </address>
        </div>

        <div className="relative lg:col-span-7 lg:col-start-6" data-reveal>
          <div className="aspect-[4/3] overflow-hidden bg-sand lg:aspect-[16/11]">
            <iframe
              title="Kaart: Kapsalon De Hoofdzaak, Torhoutse Steenweg 200, Brugge"
              src={contact.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 [filter:grayscale(1)_sepia(0.25)_contrast(0.95)_brightness(1.02)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
