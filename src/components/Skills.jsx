import { useRef, useEffect, useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './common/SectionHeader'
import { calculateTilt } from '../utils/mouseTilt'

const technologies = [
  { name: 'HTML', description: 'Semantic markup and accessibility', color: '#e34c26' },
  { name: 'CSS', description: 'Modern styling and animations', color: '#264de4' },
  { name: 'JavaScript', description: 'ES6+ and modern patterns', color: '#f7df1e' },
  { name: 'React.js', description: 'Component architecture and hooks', color: '#61dafb' },
  { name: 'Node.js', description: 'Server-side JavaScript and APIs', color: '#339933' },
  { name: 'Next.js', description: 'React framework for production', color: '#000000' },
  { name: 'Python', description: 'Versatile programming language', color: '#3776ab' },
  { name: 'C++', description: 'System programming and algorithms', color: '#00599c' },
  { name: 'FastAPI', description: 'Modern Python web framework', color: '#009688' },
]

const Skills = memo(function Skills() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const [hoveredTech, setHoveredTech] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ultra-smooth parallax scroll effect
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: 3.5, // Maximum smoothness
          },
          ease: 'power1.out',
        }
      )

      // Cinematic section header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
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

      // Smooth content animation with gentle stagger
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.2,
          stagger: 0.08,
          ease: 'power2.out',
          force3D: true,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleTechHover = (name) => {
    setHoveredTech(name)
  }

  const handleTechLeave = () => {
    setHoveredTech(null)
  }

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full min-h-screen py-32 px-4 md:px-16 flex items-center justify-center overflow-hidden"
    >
      <div ref={sectionRef} className="relative z-10 max-w-[1400px] w-full">
        <SectionHeader number="03" title="Skills & Technologies" ref={headerRef} />

        {/* Technology Grid */}
        <div ref={contentRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {technologies.map((tech, index) => {
            const isHovered = hoveredTech === tech.name
            return (
              <motion.div
                key={tech.name}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="glass-card rounded-3xl p-6 text-center depth-2 cursor-pointer relative overflow-visible"
                  style={{
                    borderColor: isHovered ? tech.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isHovered
                      ? `0 20px 60px ${tech.color}40, 0 0 40px ${tech.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                      : undefined,
                  }}
                  whileHover={{ scale: 1.05, y: -4, rotateY: 3 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                  onHoverStart={() => handleTechHover(tech.name)}
                  onHoverEnd={handleTechLeave}
                >
                  <div
                    className="text-4xl mb-3 font-bold"
                    style={{
                      color: tech.color,
                      textShadow: isHovered ? `0 0 20px ${tech.color}` : undefined,
                      filter: isHovered ? 'brightness(1.3)' : undefined,
                    }}
                  >
                    {tech.name}
                  </div>
                  <div className="text-xs text-text-secondary/70 font-light">
                    {tech.description}
                  </div>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute -bottom-16 left-1/2 -translate-x-1/2 glass-strong rounded-xl px-4 py-2 whitespace-nowrap z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          borderColor: tech.color,
                          boxShadow: `0 10px 30px ${tech.color}50`,
                        }}
                      >
                        <div
                          className="text-sm font-semibold"
                          style={{ color: tech.color }}
                        >
                          {tech.name}
                        </div>
                        <div className="text-xs text-text-secondary/80 mt-1">
                          {tech.description}
                        </div>
                        {/* Tooltip arrow */}
                        <div
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderLeft: `1px solid ${tech.color}`,
                            borderTop: `1px solid ${tech.color}`,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Description Text */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-lg text-text-secondary/80 font-light leading-relaxed">
            Hover over the technologies above to explore. Each card represents my experience
            building production-ready applications with modern web and software technologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
})

export default Skills
