import React from 'react'
import { motion } from 'framer-motion'
import { Menu, Settings, Zap, Wifi, WifiOff, Activity, Cpu } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import Button from './ui/Button'
import GlowButton from './ui/GlowButton'
import StatusIndicator from './ui/StatusIndicator'

const Header: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, isConnected, isVueReady } = useAppStore()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 glass border-b border-white/20 flex items-center justify-between px-6 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      
      <div className="flex items-center space-x-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10 transition-all duration-200"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-white font-bold text-xl gradient-text-primary">
              YOOtheme Builder Studio
            </h1>
            <p className="text-white/70 text-xs">
              Advanced AI-Powered Automation Platform
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6 relative z-10">
        {/* System Status */}
        <div className="flex items-center space-x-4">
          <StatusIndicator
            status={isConnected ? 'online' : 'offline'}
            label={isConnected ? 'Connected' : 'Disconnected'}
            animated
          />
          
          <StatusIndicator
            status={isVueReady ? 'online' : 'loading'}
            label={isVueReady ? 'Vue Ready' : 'Initializing'}
            animated
          />
        </div>

        {/* Performance Metrics */}
        <div className="hidden md:flex items-center space-x-3 text-white/80 text-sm">
          <div className="flex items-center space-x-1">
            <Activity className="w-4 h-4" />
            <span>98.5%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Cpu className="w-4 h-4" />
            <span>2.1ms</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Settings className="w-5 h-5" />
          </Button>
          
          <GlowButton
            variant="holographic"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Launch AI
          </GlowButton>
        </div>
      </div>
    </motion.header>
  )
}

export default Header