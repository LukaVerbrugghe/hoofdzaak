import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

/** Creates the single Lenis instance and drives it from GSAP's ticker so ScrollTrigger stays in sync. */
export function initLenis() {
  if (lenis) return lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReducedMotion(),
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToSection(id: string) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (lenis) lenis.scrollTo(target, { duration: prefersReducedMotion() ? 0 : 1.6 })
  else if (target === 0) window.scrollTo({ top: 0 })
  else target.scrollIntoView()
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
