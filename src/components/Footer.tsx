import CircularText from './reactbits/CircularText'
import { contact, hours, formatTime, nav } from '../data/site'
import { scrollToSection } from '../lib/motion'

const socials = [
  { label: 'Facebook', href: contact.facebook },
  { label: 'Instagram', href: contact.instagram },
].filter(s => s.href)

const openDays = hours.filter(h => h.slots.length)

export default function Footer() {
  return (
    <footer className="gutter relative bg-espresso pt-24 pb-10 text-cream/70">
      <div className="grid gap-14 border-t border-cream/10 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <p className="font-display text-4xl text-cream">
            De <em className="text-brass-light">Hoofdzaak</em>
          </p>
          <p className="mt-4 max-w-xs leading-relaxed">Kapsalon in Brugge. Uw kappersbeurt, een aangenaam moment.</p>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-cream/40">Menu</p>
          <ul className="mt-5 space-y-2">
            {nav.map(item => (
              <li key={item.id}>
                <button onClick={() => scrollToSection(item.id)} className="hover:text-brass-light">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-cream/40">Contact</p>
          <ul className="mt-5 space-y-2">
            <li>
              {contact.street}, {contact.city}
            </li>
            <li>
              <a href={contact.phoneHref} className="hover:text-brass-light">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="hover:text-brass-light">
                {contact.email}
              </a>
            </li>
            {socials.map(s => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-brass-light">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-cream/40">Open</p>
          <ul className="mt-5 space-y-2 tabular-nums">
            {openDays.map(day => (
              <li key={day.label} className="flex justify-between gap-4">
                <span>{day.label.slice(0, 2)}</span>
                <span>{day.slots.map(([o, c]) => `${formatTime(o)}–${formatTime(c)}`).join(' · ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
        <button onClick={() => scrollToSection('top')} aria-label="Terug naar boven" className="text-cream/60">
          <CircularText
            text="TERUG NAAR BOVEN • DE HOOFDZAAK • "
            size={120}
            fontSize={10}
            letterSpacing={3}
            spinDuration={30}
            onHover="speedUp"
          >
            <span className="font-display text-2xl text-brass-light">↑</span>
          </CircularText>
        </button>
        <div className="space-y-1 text-xs text-cream/35 sm:text-right">
          <p>© {new Date().getFullYear()} Kapsalon De Hoofdzaak · Brugge</p>
          <p>Foto's: Unsplash</p>
        </div>
      </div>
    </footer>
  )
}
