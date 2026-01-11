import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Process from './components/Process'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
    
    // Ultra-smooth cinematic scroll setup with Lenis
    const lenis = new Lenis({
      duration: isMobile ? 1.2 : 2.4, // Slower, more controlled duration for mobile, ultra-smooth for desktop
      easing: (t) => {
        // Ultra-smooth cubic bezier easing (ease-out-cubic) - very gentle
        return 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.35 : 0.45, // Ultra-smooth, more controlled for desktop
      smoothTouch: true, // Enable smooth touch for mobile
      touchMultiplier: isMobile ? 0.4 : 2.2, // Reduced touch multiplier for mobile - slower, more controlled scrolling
      infinite: false,
      syncTouch: true,
      touchInertiaMultiplier: isMobile ? 8 : 70, // Further reduced inertia for mobile - prevents fast scrolling
      normalizeWheel: true, // Normalize wheel events
    })

    // Optimized RAF loop for ultra-smooth scrolling
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Sync GSAP ScrollTrigger with Lenis for perfect animation sync
    lenis.on('scroll', ScrollTrigger.update)

    // Enhanced GSAP ticker integration
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable lag smoothing for ultra-smooth feel
    gsap.ticker.lagSmoothing(0)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      <Navigation />
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Process />
        <Contact />
      </div>
    </div>
  )
}

export default App
