import { useCallback, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Concept from './components/Concept'
import Marquee from './components/Marquee'
import Troeven from './components/Troeven'
import Producten from './components/Producten'
import Sfeer from './components/Sfeer'
import Openingsuren from './components/Openingsuren'
import Ligging from './components/Ligging'
import Afspraak from './components/Afspraak'
import Footer from './components/Footer'
import Noise from './components/reactbits/Noise'
import { ScrollTrigger, gsap, initLenis, prefersReducedMotion, useGSAP } from './lib/motion'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaded = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const lenis = initLenis()
    lenis.scrollTo(0, { immediate: true })
    lenis.stop()
  }, [])

  useEffect(() => {
    if (!loaded) return
    initLenis().start()
    ScrollTrigger.refresh()
  }, [loaded])

  // Site-wide scroll effects driven by data attributes.
  useGSAP(
    () => {
      if (!loaded || prefersReducedMotion()) return
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: els =>
          gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08 }),
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
        gsap.fromTo(
          el.querySelector('img'),
          { yPercent: -10 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax-soft]').forEach(el => {
        gsap.fromTo(el, { y: 80 }, { y: -40, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { dependencies: [loaded] },
  )

  return (
    <>
      {!loaded && <Preloader onDone={onLoaded} />}
      <Nav />
      <main>
        <Hero ready={loaded} />
        <Concept />
        <Marquee />
        <Troeven />
        <Producten />
        <Sfeer />
        <Openingsuren />
        <Ligging />
        <Afspraak />
      </main>
      <Footer />
      <Noise opacity={0.05} fixed zIndex={60} blendMode="multiply" fps={12} />
    </>
  )
}
