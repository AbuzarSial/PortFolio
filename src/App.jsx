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
    
    // For mobile: use native browser scrolling (normal scrolling)
    // For desktop: use Lenis for ultra-smooth cinematic scrolling
    if (isMobile) {
      // Native scrolling for mobile - just sync ScrollTrigger
      const handleScroll = () => {
        ScrollTrigger.update()
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    } else {
      // Ultra-smooth cinematic scroll setup with Lenis for desktop
      const lenis = new Lenis({
        duration: 2.4, // Ultra-smooth for desktop
        easing: (t) => {
          // Ultra-smooth cubic bezier easing (ease-out-cubic) - very gentle
          return 1 - Math.pow(1 - t, 3);
        },
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.45, // Ultra-smooth, more controlled for desktop
        smoothTouch: false, // Disable for desktop
        infinite: false,
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
