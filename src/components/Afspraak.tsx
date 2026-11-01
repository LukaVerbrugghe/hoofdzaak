import SplitText from './reactbits/SplitText'
import Magnet from './reactbits/Magnet'
import { contact } from '../data/site'

const channels = [
  { label: 'Bel ons', value: contact.phone, href: contact.phoneHref },
  { label: 'Mail ons', value: contact.email, href: contact.emailHref },
]

export default function Afspraak() {
  return (
    <section id="afspraak" className="gutter relative overflow-hidden bg-espresso py-32 text-cream lg:py-44">
      <p className="eyebrow text-cream/50" data-reveal>
        Graag op afspraak
      </p>
      <h2 className="mt-10 font-display text-[clamp(3.4rem,11vw,11rem)] font-light leading-[0.92] tracking-[-0.025em]">
        {['Maak een', 'afspraak.'].map((text, i) => (
          <span key={text} className={`block ${i ? 'pl-[10vw]' : ''}`}>
            <SplitText
              text={text}
              tag="span"
              splitType="chars"
              effect="rise"
              mask
              delay={30}
              textAlign="left"
              duration={1.3}
              ease="expo.out"
              className={i ? 'italic text-brass-light' : ''}
            />
          </span>
        ))}
      </h2>

      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:mt-28 lg:max-w-4xl">
        {channels.map(channel => (
          <Magnet key={channel.href} padding={60} magnetStrength={6} wrapperClassName="block" innerClassName="block">
            <a
              href={channel.href}
              className="group flex flex-col gap-6 rounded-full border border-cream/20 px-8 py-7 transition-colors duration-500 hover:border-brass hover:bg-brass hover:text-espresso sm:px-10"
            >
              <span className="flex items-center justify-between">
                <span className="eyebrow opacity-60">{channel.label}</span>
                <span className="text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>
              </span>
              <span className="font-display text-2xl break-all sm:text-3xl">{channel.value}</span>
            </a>
          </Magnet>
        ))}
      </div>

      <p className="mt-12 max-w-lg leading-relaxed text-cream/55" data-reveal>
        U kunt ook altijd een berichtje sturen via Facebook of Instagram. Wij zorgen dat uw afspraak stipt wordt
        nageleefd.
      </p>
    </section>
  )
}
