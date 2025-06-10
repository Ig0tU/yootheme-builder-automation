import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'holographic' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  children: React.ReactNode
}

const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = true,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700',
    holographic: 'holographic text-white',
    neon: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const glowClasses = {
    primary: glow ? 'shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40' : '',
    secondary: glow ? 'shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40' : '',
    holographic: glow ? 'shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40' : '',
    neon: glow ? 'shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40' : ''
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        glowClasses[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'holographic' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}

export default GlowButton