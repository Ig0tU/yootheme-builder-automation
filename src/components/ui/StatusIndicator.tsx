import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'loading' | 'error' | 'warning'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md',
  animated = true
}) => {
  const statusConfig = {
    online: { color: 'bg-green-400', label: 'Online' },
    offline: { color: 'bg-red-400', label: 'Offline' },
    loading: { color: 'bg-yellow-400', label: 'Loading' },
    error: { color: 'bg-red-500', label: 'Error' },
    warning: { color: 'bg-orange-400', label: 'Warning' }
  }

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center space-x-2">
      <motion.div
        className={cn(
          'rounded-full',
          config.color,
          sizeClasses[size]
        )}
        animate={animated && status === 'loading' ? {
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {label && (
        <span className="text-sm text-white/80">
          {label || config.label}
        </span>
      )}
    </div>
  )
}

export default StatusIndicator