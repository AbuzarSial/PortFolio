import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './common/SectionHeader'
import { calculateTilt } from '../utils/mouseTilt'

function ProjectCard({ project, index, isHovered, onHoverStart, onHoverEnd }) {
  const cardRef = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const translateZ = useMotionValue(0)
  const rotateXSpring = useSpring(rotateX, { stiffness: 250, damping: 30 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 250, damping: 30 })
  const translateZSpring = useSpring(translateZ, { stiffness: 250, damping: 30 })

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const tilt = calculateTilt(e, cardRef.current, 5)
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
      className="flex-shrink-0 w-full sm:w-[400px] md:w-[450px] h-[550px] md:h-[600px]"
      initial={{ opacity: 0, y: 40, rotateY: 10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 1.2,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        ref={cardRef}
        className="glass-card rounded-3xl overflow-hidden h-full flex flex-col group relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          translateZ: translateZSpring,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0, 212, 255, 0.2), 0 0 40px rgba(0, 212, 255, 0.1)'
            : undefined,
        }}
        whileHover={{ scale: 1.01 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 30,
          mass: 1,
        }}
      >
        {/* Project Image/Preview */}
        <div
          className={`w-full h-[280px] relative overflow-hidden bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <motion.div
              className="text-6xl font-bold text-white/20"
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.name.charAt(0)}
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Project Content */}
        <div className="p-8 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-3 text-text-primary gradient-text-subtle">
            {project.name}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary/80 mb-6 font-light flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-text-secondary/60 mb-3 uppercase tracking-wider">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 glass rounded-full text-xs text-primary font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Live Demo Button */}
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3 rounded-full btn-primary text-white text-sm font-semibold text-center no-underline inline-block"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            View Live Demo →
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

const projects = [
  {
    id: 1,
    name: '3D E-Commerce Platform',
    description: 'Immersive shopping experience with WebGL-powered product visualization and real-time 3D customization. Features advanced lighting, shadows, and interactive product exploration.',
    tech: ['React', 'Three.js', 'WebGL', 'GSAP', 'Node.js'],
    gradient: 'from-[#667eea] via-[#764ba2] to-[#667eea]',
    demoUrl: '#',
  },
  {
    id: 2,
    name: 'Interactive Data Dashboard',
    description: 'Real-time analytics platform with advanced data visualization and animated transitions. Built for high-performance data processing and beautiful visualizations.',
    tech: ['React', 'D3.js', 'TypeScript', 'WebSockets', 'Node.js'],
    gradient: 'from-[#f093fb] via-[#f5576c] to-[#f093fb]',
    demoUrl: '#',
  },
  {
    id: 3,
    name: 'Cinematic Portfolio Site',
    description: 'Award-winning portfolio featuring advanced scroll animations and 3D scene compositions. Showcases premium web design with smooth 60fps animations.',
    tech: ['React', 'Framer Motion', 'Three.js', 'GLSL', 'GSAP'],
    gradient: 'from-[#4facfe] via-[#00f2fe] to-[#4facfe]',
    demoUrl: '#',
  },
  {
    id: 4,
    name: 'AR Web Experience',
    description: 'Browser-based augmented reality application with markerless tracking and 3D object placement. Pushes the boundaries of web-based AR technology.',
    tech: ['WebXR', 'Three.js', 'React', 'TensorFlow.js', 'WebGL'],
    gradient: 'from-[#43e97b] via-[#38f9d7] to-[#43e97b]',
    demoUrl: '#',
  },
  {
    id: 5,
    name: 'Real-Time Collaboration Tool',
    description: 'Multi-user collaboration platform with live synchronization, cursor tracking, and real-time updates. Optimized for low latency and high performance.',
    tech: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    gradient: 'from-[#fa709a] via-[#fee140] to-[#fa709a]',
    demoUrl: '#',
  },
  {
    id: 6,
    name: 'AI-Powered Analytics Suite',
    description: 'Advanced analytics platform with machine learning integration, predictive modeling, and intelligent data insights. Built for enterprise scale.',
    tech: ['React', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
    gradient: 'from-[#30cfd0] via-[#330867] to-[#30cfd0]',
    demoUrl: '#',
  },
]

export default function Projects() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const carouselRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const x = useMotionValue(0)
  const springConfig = { damping: 50, stiffness: 150, mass: 1.2 } // Smoother spring
  const xSpring = useSpring(x, springConfig)

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

      // Animate section header with cinematic entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.2,
          ease: 'power3.out',
          force3D: true,
        }
      )

      // Animate carousel container
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          force3D: true,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleDrag = (event, info) => {
    const container = carouselRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    const scrollWidth = container.scrollWidth
    const maxScroll = scrollWidth - containerWidth

    let newX = x.get() - info.delta.x

    // Constrain scrolling
    newX = Math.max(-maxScroll, Math.min(0, newX))
    x.set(newX)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full min-h-screen py-32 px-4 md:px-16 flex items-center justify-center overflow-hidden"
    >
      <div ref={sectionRef} className="max-w-[1800px] w-full">
        <SectionHeader number="02" title="Featured Projects" ref={headerRef} />

          {/* Horizontal Scroll Container */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={carouselRef}
              className="flex gap-6 md:gap-8 overflow-visible cursor-grab active:cursor-grabbing pb-4"
              style={{ x: xSpring }}
              drag="x"
              dragConstraints={{ left: typeof window !== 'undefined' && window.innerWidth < 768 ? -1500 : -2000, right: 0 }}
              dragElastic={0.1}
              onDrag={handleDrag}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing' }}
            >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="text-sm text-text-secondary/60 font-light">
              Drag to explore more projects
            </div>
            <motion.div
              className="w-12 h-1 bg-white/10 rounded-full overflow-hidden"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: '30%' }}
                animate={{ x: ['0%', '233%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
