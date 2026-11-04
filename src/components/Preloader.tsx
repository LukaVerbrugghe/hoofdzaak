import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion'
import Logo from './Logo'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onDone()
        return
      }
      const counter = { value: 0 }
      gsap
        .timeline({ onComplete: onDone })
        .from('[data-pl-line]', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
        .to(
          counter,
          {
            value: 100,
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
            },
          },
          0.2,
        )
        .to('[data-pl-bar]', { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .to('[data-pl-line]', { yPercent: -110, duration: 0.8, ease: 'expo.in', stagger: 0.05 }, '+=0.15')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.35')
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso text-cream"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <p data-pl-line className="eyebrow text-cream/50">
          Kapsalon · Brugge
        </p>
      </div>
      <div className="mt-4 overflow-hidden pb-2">
        <div data-pl-line>
          <Logo className="h-20 w-auto sm:h-28" />
        </div>
      </div>
      <div className="gutter absolute inset-x-0 bottom-0 pb-8">
        <div className="flex items-end justify-between">
          <span className="eyebrow text-cream/40">Een aangenaam moment</span>
          <span ref={count} className="font-display text-4xl font-light tabular-nums text-cream/80">
            000
          </span>
        </div>
        <div className="mt-4 h-px bg-cream/10">
          <div data-pl-bar className="h-full origin-left scale-x-0 bg-brass" />
        </div>
      </div>
    </div>
  )
}
