import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const containerRef = useRef(null)
  const profileRef = useRef(null)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const subTitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ultra-smooth parallax effect on scroll with increased scrub
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 4, // Maximum smoothness
        },
        opacity: 0,
        scale: 0.98,
        y: -30,
        ease: 'power1.out',
      })

      // Cinematic entrance animations with premium easing
      const tl = gsap.timeline({ 
        defaults: { 
          ease: 'expo.out',
          duration: 1.4,
        } 
      })
      
      tl.fromTo(
        profileRef.current,
        { opacity: 0, y: 30, scale: 0.8, rotation: -10 },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.2, delay: 0.2, ease: 'back.out(1.2)' }
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.1)' },
        '-=0.8'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'expo.out' },
        '-=0.6'
      )
      .fromTo(
        subTitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] px-4 md:px-16 text-center">
        {/* Profile Picture */}
        <motion.div
          ref={profileRef}
          className="mb-6 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="relative">
            {/* Glowing Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50 blur-xl animate-pulse" />
            
            {/* Profile Image Container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 glass-strong shadow-2xl" style={{ borderRadius: '50%' }}>
              <img
                src="/portfolio_Image.png"
                alt="Abuzar Sial"
                className="w-full h-full object-cover object-top rounded-full"
                style={{ objectPosition: 'center top', borderRadius: '50%' }}
                onError={(e) => {
                  // Fallback to initials if image not found
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span class="text-4xl md:text-5xl font-bold gradient-text">AS</span>
                    </div>
                  `
                }}
              />
            </div>
            
            {/* Decorative Ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-primary/30 animate-spin-slow" />
          </div>
        </motion.div>

        <motion.div
          ref={badgeRef}
          className="inline-block px-6 py-2.5 mb-8 glass rounded-full glow-primary"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wider">
            Junior Software Engineer
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-[clamp(2.2rem,6.5vw,5rem)] font-extrabold leading-[1.1] mb-6 tracking-[-0.02em]"
        >
          <span className="block gradient-text-subtle">
            Hi, I'm
          </span>
          <span className="block gradient-text mt-2">
            Abuzar Sial
          </span>
          <span className="block gradient-text-subtle mt-2">
            I Build Immersive Web Experiences
          </span>
        </h1>

        <p
          ref={subTitleRef}
          className="text-[clamp(1rem,2vw,1.3rem)] text-text-secondary/90 leading-relaxed mb-12 max-w-[800px] mx-auto font-light tracking-wide"
        >
          Junior Software Engineer | React | Three.js | Modern Web Development
        </p>

        <div
          ref={ctaRef}
          className="flex gap-6 justify-center flex-wrap mb-16"
        >
          <motion.a
            href="#projects"
            className="px-10 py-4 text-base font-semibold rounded-full btn-primary text-white no-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            View Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-10 py-4 text-base font-semibold rounded-full btn-secondary text-text-primary no-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Get In Touch
          </motion.a>
        </div>

        <motion.div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center gap-4 text-text-secondary/80 text-sm"
        >
          <motion.div
            className="w-[30px] h-[50px] border-2 border-white/20 rounded-[20px] flex justify-center pt-2 glass"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: [0.25, 0.1, 0.25, 1],
              repeatType: 'loop'
            }}
          >
            <div className="w-1.5 h-3 bg-primary rounded-sm glow-primary" />
          </motion.div>
          <span className="font-light">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}
