import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './common/SectionHeader'

const processSteps = [
  {
    id: 1,
    phase: 'Planning',
    title: 'Research & Strategy',
    description: 'Deep dive into requirements, user needs, and technical constraints. Create detailed specifications, wireframes, and architecture plans. Define success metrics and performance targets.',
    icon: '📋',
    color: '#00d4ff',
    details: [
      'Requirements analysis',
      'Technical architecture design',
      'Performance benchmarks',
      'User experience mapping',
    ],
  },
  {
    id: 2,
    phase: 'Building',
    title: 'Development & Implementation',
    description: 'Write clean, maintainable code following best practices. Build with scalability in mind, implement robust error handling, and ensure cross-browser compatibility. Focus on component reusability and code organization.',
    icon: '⚡',
    color: '#7b2cbf',
    details: [
      'Component architecture',
      'State management',
      'API integration',
      'Responsive design',
    ],
  },
  {
    id: 3,
    phase: 'Optimizing',
    title: 'Performance & Refinement',
    description: 'Optimize bundle sizes, implement code splitting, and fine-tune rendering performance. Conduct thorough testing, fix bugs, and optimize for Core Web Vitals. Ensure smooth 60fps animations and fast load times.',
    icon: '🚀',
    color: '#ff006e',
    details: [
      'Performance optimization',
      'Code splitting',
      'Lighthouse optimization',
      'Animation refinement',
    ],
  },
]

export default function Process() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)

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

      // Smooth timeline line fill
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1.5,
            },
            ease: 'power1.out',
            force3D: true,
          }
        )
      }

      // Animate each process step
      const steps = timelineRef.current?.querySelectorAll('.process-step') || []
      steps.forEach((step, index) => {
        const stepContent = step.querySelector('.step-content')
        const stepIcon = step.querySelector('.step-icon')
        const stepLine = step.querySelector('.step-line')

        // Smooth step content animation
        gsap.fromTo(
          stepContent,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            duration: 1.2,
            delay: index * 0.12,
            ease: 'power2.out',
            force3D: true,
          }
        )

        // Gentle step icon animation
        gsap.fromTo(
          stepIcon,
          { opacity: 0, scale: 0.8, rotation: -90 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            duration: 1,
            delay: index * 0.12 + 0.15,
            ease: 'back.out(1.2)',
            force3D: true,
          }
        )

        // Step line animation
        if (stepLine) {
          gsap.fromTo(
            stepLine,
            { scaleY: 0, transformOrigin: 'top' },
            {
              scaleY: 1,
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              duration: 0.6,
              delay: index * 0.15 + 0.3,
              ease: 'power2.out',
              force3D: true,
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full min-h-screen py-32 px-4 md:px-16 flex items-center justify-center"
    >
      <div ref={sectionRef} className="max-w-[1400px] w-full">
        <SectionHeader number="04" title="Development Process" ref={headerRef} />

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Process Steps */}
          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="process-step relative"
                style={{
                  paddingLeft: index % 2 === 0 ? '0' : 'auto',
                  paddingRight: index % 2 === 0 ? 'auto' : '0',
                }}
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node & Icon */}
                  <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className="absolute inset-0 rounded-full glass-strong border-2 z-10"
                      style={{
                        borderColor: step.color,
                        boxShadow: `0 0 20px ${step.color}40, inset 0 0 20px ${step.color}20`,
                      }}
                    >
                      <motion.div
                        className="step-icon w-full h-full flex items-center justify-center text-3xl md:text-4xl"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                    {/* Connecting Line */}
                    {index < processSteps.length - 1 && (
                      <div
                        className="step-line absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b origin-top"
                        style={{
                          background: `linear-gradient(to bottom, ${step.color}, ${processSteps[index + 1].color})`,
                          transform: 'scaleY(0)',
                        }}
                      />
                    )}
                  </div>

                  {/* Step Content */}
                  <motion.div
                    className={`step-content flex-1 glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 depth-2 ${
                      index % 2 === 0 ? 'md:ml-auto md:max-w-[500px]' : 'md:mr-auto md:max-w-[500px]'
                    }`}
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{
                          color: step.color,
                          backgroundColor: `${step.color}20`,
                          border: `1px solid ${step.color}40`,
                        }}
                      >
                        {step.phase}
                      </span>
                      <span className="text-2xl font-extrabold gradient-text-subtle">
                        {step.title}
                      </span>
                    </div>

                    <p className="text-base leading-relaxed text-text-secondary/90 mb-6 font-light">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <div className="grid grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          className="flex items-center gap-2 text-sm text-text-secondary/80"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: detailIndex * 0.1 }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: step.color }}
                          />
                          <span className="font-light">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          className="mt-24 text-center max-w-3xl mx-auto glass-card rounded-3xl p-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text-subtle">
            From Concept to Launch
          </h3>
          <p className="text-lg leading-relaxed text-text-secondary/90 font-light">
            Every project follows this structured approach, ensuring quality, performance,
            and maintainability at every stage. The result? Production-ready applications
            that scale beautifully and perform flawlessly.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
