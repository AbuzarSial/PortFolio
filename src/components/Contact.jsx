import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import SectionHeader from './common/SectionHeader'
import Input from './common/Input'
import Textarea from './common/Textarea'

export default function Contact() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const formRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_y63ke3j'
  
  // TODO: Replace these with your actual EmailJS credentials
  // Get them from: https://www.emailjs.com/
  // 1. Go to Email Templates → Create/Select template
  // 2. Set "To Email" to: abuzar.sial24@gmail.com
  // 3. Use template variables: {{name}}, {{email}}, {{message}}
  //    These MUST match the form input 'name' attributes exactly:
  //    - Form input name="name" → Template variable {{name}}
  //    - Form input name="email" → Template variable {{email}}
  //    - Form input name="message" → Template variable {{message}}
  // 4. Copy Template ID and Public Key from dashboard
  const EMAILJS_TEMPLATE_ID = 'template_4oqioka'
  const EMAILJS_PUBLIC_KEY = 'Fu1rJv-HHs1I74ia8'

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  // GSAP animations for scroll effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth parallax scroll effect
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

      // Section header animation
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

      // Form elements animation
      const formElements = formRef.current?.querySelectorAll('.form-element') || []
      gsap.fromTo(
        formElements,
        { opacity: 0, y: 25, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.1,
          stagger: 0.08,
          ease: 'power2.out',
          force3D: true,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSubmitted(false)

    // Validate EmailJS configuration
    if (
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      setError('Email service is not fully configured. Please contact the site owner.')
      setIsSubmitting(false)
      return
    }

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.')
      setIsSubmitting(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    try {
      // Prepare template parameters for EmailJS
      // IMPORTANT: Variable names must match EmailJS template variables exactly
      // The form input 'name' attributes are: name, email, message
      // These map to EmailJS template variables: {{name}}, {{email}}, {{message}}
      const templateParams = {
        name: formData.name.trim(),        // Maps to {{name}} in EmailJS template
        email: formData.email.trim(),      // Maps to {{email}} in EmailJS template
        message: formData.message.trim(),  // Maps to {{message}} in EmailJS template
        website_url: typeof window !== 'undefined' ? window.location.origin : 'Portfolio Website', // Website URL
        timestamp: new Date().toLocaleString(), // Submission timestamp
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      // Check if email was sent successfully
      if (response.status === 200 || response.text === 'OK') {
        // Success - reset form and show success message
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (err) {
      // Error handling with user-friendly messages
      console.error('EmailJS Error:', err)
      
      let errorMessage = 'Failed to send message. Please try again later.'
      
      if (err.text) {
        errorMessage = err.text
      } else if (err.status === 0) {
        errorMessage = 'Network error. Please check your connection and try again.'
      } else if (err.status >= 400 && err.status < 500) {
        errorMessage = 'Invalid request. Please check your information and try again.'
      } else if (err.status >= 500) {
        errorMessage = 'Server error. Please try again later.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen py-32 px-4 md:px-16 flex items-center justify-center"
    >
      <div ref={sectionRef} className="max-w-[900px] w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionHeader number="05" title="Get In Touch" ref={headerRef} />
          <p className="text-base md:text-lg text-text-secondary/80 font-light max-w-2xl mx-auto px-4">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
        </div>

        {/* Form */}
        <motion.form
          ref={formRef}
          className="relative"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          noValidate
        >
          {/* Form Container with Glassmorphism */}
          <div className="relative glass-card rounded-2xl p-8 md:p-12 depth-2">
            {/* Soft Glowing Border on Hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 44, 191, 0.1))',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.2), inset 0 0 40px rgba(123, 44, 191, 0.1)',
                }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Name Input */}
              <div className="form-element">
                <Input
                  label="Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Input */}
              <div className="form-element">
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Textarea */}
              <div className="form-element">
                <Textarea
                  label="Message"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <motion.div className="form-element pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="relative w-full px-8 py-4 rounded-xl text-white text-base font-semibold border-0 cursor-pointer overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%)',
                    boxShadow: '0 8px 24px rgba(0, 212, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                  }}
                  whileHover={
                    !isSubmitting && !submitted
                      ? {
                          scale: 1.02,
                          y: -2,
                          boxShadow: '0 12px 32px rgba(0, 212, 255, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
                        }
                      : {}
                  }
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                >
                  {/* Animated Background Shine Effect */}
                  {!isSubmitting && !submitted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'linear',
                      }}
                    />
                  )}

                  {/* Button Content */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          ✓
                        </motion.span>
                        <span>Message Sent</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-primary font-medium text-lg">
                  ✓ Thank you! I'll get back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-accent font-medium text-lg">
                  ⚠ {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
