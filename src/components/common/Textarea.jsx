import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Textarea = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <motion.div
      className="flex flex-col gap-2"
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="text-sm font-medium text-text-primary/70 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-text-primary text-base font-light transition-all duration-300 focus:outline-none focus:border-primary/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)] placeholder:text-text-secondary/40 resize-none ${error ? 'border-accent/50' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-accent">{error}</span>
      )}
    </motion.div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
