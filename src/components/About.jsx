import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './common/SectionHeader'
import { calculateTilt } from '../utils/mouseTilt'

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const translateZ = useMotionValue(0)
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 })
  const translateZSpring = useSpring(translateZ, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const tilt = calculateTilt(e, cardRef.current, 4)
      rotateX.set(tilt.rotateX)
      rotateY.set(tilt.rotateY)
      translateZ.set(tilt.translateZ)
    }
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    translateZ.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="p-8 glass-card rounded-3xl depth-2 group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        translateZ: translateZSpring,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{feature.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary mb-2 gradient-text-subtle">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary/80 font-light">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({ stat, index }) {
  const statRef = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const translateZ = useMotionValue(0)
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 })
  const translateZSpring = useSpring(translateZ, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (statRef.current) {
      const tilt = calculateTilt(e, statRef.current, 3)
      rotateX.set(tilt.rotateX)
      rotateY.set(tilt.rotateY)
      translateZ.set(tilt.translateZ)
    }
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    translateZ.set(0)
  }

  return (
    <motion.div
      ref={statRef}
      className="p-8 glass-card rounded-3xl depth-2 text-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        translateZ: translateZSpring,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
    >
      <div className="text-[2.5rem] font-extrabold gradient-text mb-2">
        {stat.number}
      </div>
      <div className="text-sm text-text-secondary/80 font-medium">{stat.label}</div>
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const profileRef = useRef(null)
  const bioRef = useRef(null)
  const cardsRef = useRef(null)
  const statsRef = useRef(null)

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

      // Profile picture animation
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, scale: 0.8, rotation: -15 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          scrollTrigger: {
            trigger: profileRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.2,
          delay: 0.2,
          ease: 'back.out(1.2)',
          force3D: true,
        }
      )

      // Smooth bio text animation
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.2,
          delay: 0.3,
          ease: 'power2.out',
          force3D: true,
        }
      )

      // Gentle feature cards animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { 
          opacity: 0, 
          y: 40, 
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.2,
          stagger: 0.12,
          ease: 'power2.out',
          force3D: true,
        }
      )

      // Smooth stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.1,
          stagger: 0.1,
          ease: 'back.out(1.1)',
          force3D: true,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: '⚡',
      title: 'Performance First',
      description: 'Optimized code that loads fast and runs smoothly, even with complex 3D animations.',
    },
    {
      icon: '🧩',
      title: 'Problem Solving',
      description: 'Transforming complex challenges into elegant, maintainable solutions that scale.',
    },
    {
      icon: '✨',
      title: 'Clean Code',
      description: 'Well-structured, documented code that\'s easy to understand and extend.',
    },
  ]

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full min-h-screen py-32 px-4 md:px-16 flex items-center justify-center overflow-hidden"
    >
      <div ref={sectionRef} className="relative z-10 max-w-[1400px] w-full">
        <SectionHeader number="01" title="About Me" ref={headerRef} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-start">
          {/* Bio Section */}
          <div className="flex flex-col gap-6">
            {/* Profile Picture for About Section */}
            <motion.div
              ref={profileRef}
              className="mb-6 flex justify-center lg:justify-start"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                {/* Glowing Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-40 blur-lg" />
                
                {/* Profile Image Container */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-white/20 glass-strong shadow-xl" style={{ borderRadius: '50%' }}>
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
                          <span class="text-3xl md:text-4xl font-bold gradient-text">AS</span>
                        </div>
                      `
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            <div ref={bioRef} className="flex flex-col gap-6">
            <p className="text-xl leading-relaxed text-text-primary/90 font-light">
              I'm <span className="text-primary font-semibold">Abuzar Sial</span>, a <span className="text-primary font-semibold">Junior Software Engineer</span> passionate about
              building <span className="text-primary font-semibold">modern web applications</span> that
              solve real problems with clean, maintainable code.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary/90 font-light">
              My approach centers on <span className="text-primary/80 font-medium">continuous learning</span> and{' '}
              <span className="text-primary/80 font-medium">problem-solving</span>. I write code that's not just
              functional, but efficient, scalable, and easy to maintain. Every line is crafted with
              attention to detail, ensuring applications run smoothly and are easy to understand.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary/90 font-light">
              Whether it's building React applications, implementing interactive 3D experiences with Three.js, or
              learning new technologies, I focus on writing <span className="text-primary/80 font-medium">clean code</span> and
              following best practices. I'm always eager to take on new challenges and grow as a developer.
            </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div ref={cardsRef} className="flex flex-col gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { number: '10+', label: 'Projects Built' },
            { number: '1+', label: 'Years Experience' },
            { number: '100%', label: 'Dedication' },
            { number: '∞', label: 'Learning Mindset' },
          ].map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
