import { useEffect, useState } from 'react'
import SectionLabel from './SectionLabel'
import SplitText from './reactbits/SplitText'
import { formatTime, hours } from '../data/site'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Current weekday and minutes-since-midnight in Brugge, regardless of the visitor's time zone. */
function nowInBrussels() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? ''
  return { day: WEEKDAYS.indexOf(get('weekday')), minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) }
}

function status() {
  const { day, minutes } = nowInBrussels()
  const today = hours.find(h => h.day === day)
  const slot = today?.slots.find(([open, close]) => minutes >= open && minutes < close)
  return { day, open: Boolean(slot), until: slot?.[1] }
}

export default function Openingsuren() {
  const [now, setNow] = useState(status)

  useEffect(() => {
    const id = window.setInterval(() => setNow(status()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="openingsuren" className="gutter relative py-32 lg:py-48">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <SectionLabel index="V" label="Openingsuren" />
          <SplitText
            text="Graag op afspraak."
            tag="h2"
            splitType="chars"
            effect="rise"
            mask
            delay={25}
            duration={1.2}
            ease="expo.out"
            textAlign="left"
            className="mt-10 font-display text-[clamp(2.6rem,5vw,5rem)] font-light leading-none tracking-[-0.02em]"
          />
          <div
            className={`eyebrow mt-10 inline-flex items-center gap-3 rounded-full border px-5 py-3 ${
              now.open ? 'border-brass/50 text-espresso' : 'border-espresso/15 text-taupe'
            }`}
            data-reveal
          >
            <span className="relative flex h-2 w-2">
              {now.open && <span className="absolute inset-0 animate-ping rounded-full bg-brass opacity-60" />}
              <span className={`relative h-2 w-2 rounded-full ${now.open ? 'bg-brass' : 'bg-taupe/50'}`} />
            </span>
            {now.open && now.until ? `Nu open · tot ${formatTime(now.until)}` : 'Nu gesloten'}
          </div>
        </div>

        <dl className="lg:col-span-7 lg:col-start-6">
          {hours.map(row => {
            const isToday = row.day === now.day
            const closed = row.slots.length === 0
            return (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-espresso/10 py-5 first:border-t sm:py-6 ${
                  closed ? 'text-taupe/70' : ''
                }`}
                data-reveal
              >
                <dt className="flex items-baseline gap-4 font-display text-2xl font-light sm:text-3xl">
                  {row.label}
                  {isToday && <span className="eyebrow text-brass">Vandaag</span>}
                </dt>
                <dd className="text-right tabular-nums sm:text-lg">
                  {closed
                    ? 'Gesloten'
                    : row.slots.map(([open, close]) => `${formatTime(open)} – ${formatTime(close)}`).join('   ·   ')}
                  {row.note && <span className="ml-3 font-display italic text-taupe">{row.note}</span>}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
