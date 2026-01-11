import { useRef, useEffect, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SectionHeader = forwardRef(function SectionHeader({ number, title }, ref) {
  const internalRef = useRef(null)
  const headerRef = ref || internalRef

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, x: -30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.4,
          ease: 'expo.out',
          force3D: true,
        }
      )
    }
  }, [headerRef])

  return (
    <div ref={headerRef} className="flex items-center gap-4 md:gap-8 mb-12 md:mb-20">
      <span className="text-xl md:text-2xl font-bold text-primary/40">{number}</span>
      <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold gradient-text-subtle">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
    </div>
  )
})

export default SectionHeader
