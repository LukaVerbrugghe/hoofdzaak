import { useEffect, useRef, useState } from 'react'
import FlowingMenu from './reactbits/FlowingMenu'
import Magnet from './reactbits/Magnet'
import { contact, nav } from '../data/site'
import { ScrollTrigger, getLenis, gsap, scrollToSection, useGSAP } from '../lib/motion'

export default function Nav() {
  const bar = useRef<HTMLElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useGSAP(() => {
    const slide = gsap.quickTo(bar.current, 'yPercent', { duration: 0.6, ease: 'expo.out' })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        setScrolled(self.scroll() > 40)
        slide(self.direction === 1 && self.scroll() > 400 ? -110 : 0)
      },
    })
  })

  useGSAP(
    () => {
      gsap.to(overlay.current, {
        clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
        duration: 0.9,
        ease: 'expo.inOut',
      })
    },
    { dependencies: [open] },
  )

  useEffect(() => {
    if (open) getLenis()?.stop()
    else getLenis()?.start()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    getLenis()?.start()
    scrollToSection(id)
  }

  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? 'bg-cream/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className={`gutter flex h-20 items-center justify-between ${open ? 'text-cream' : 'text-espresso'}`}>
          <button onClick={() => go('top')} className="font-display text-2xl leading-none whitespace-nowrap" aria-label="Naar boven">
            De <em className="text-brass">Hoofdzaak</em>
          </button>

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Hoofdmenu">
            {nav.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`eyebrow transition-opacity hover:opacity-100 ${open ? 'pointer-events-none opacity-0' : 'opacity-60'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
            <Magnet padding={40} magnetStrength={3}>
              <a
                href={contact.phoneHref}
                className={`eyebrow inline-flex items-center gap-3 rounded-full border px-5 py-3 transition-colors duration-300 ${
                  open
                    ? 'border-cream/30 hover:bg-cream hover:text-espresso'
                    : 'border-espresso/25 hover:bg-espresso hover:text-cream'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                Afspraak
              </a>
            </Magnet>
            </div>
            <button
              onClick={() => setOpen(o => !o)}
              className="eyebrow flex items-center gap-3"
              aria-expanded={open}
              aria-controls="menu-overlay"
            >
              <span>{open ? 'Sluiten' : 'Menu'}</span>
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                    open ? 'top-1/2 -rotate-45' : 'top-full'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        id="menu-overlay"
        className="fixed inset-0 z-40 flex flex-col bg-espresso pt-20 text-cream"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
      >
        <div className="min-h-0 flex-1">
          {open && (
            <FlowingMenu
              items={nav.map(item => ({ text: item.label, image: item.image }))}
              onItemClick={(_, index) => go(nav[index].id)}
              textColor="#F4EFE8"
              bgColor="#1C1714"
              marqueeBgColor="#B08D57"
              marqueeTextColor="#1C1714"
              borderColor="rgba(244, 239, 232, 0.12)"
              showIndex
              showArrow
              speed={45}
              ariaLabel="Menu"
              className="font-display"
            />
          )}
        </div>
        <div className="gutter flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 py-6 text-cream/60">
          <span className="eyebrow">
            {contact.street}, {contact.city}
          </span>
          <div className="flex flex-wrap gap-6">
            <a href={contact.phoneHref} className="eyebrow hover:text-cream">
              {contact.phone}
            </a>
            <a href={contact.emailHref} className="eyebrow hover:text-cream">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
