import React from 'react'
import { motion } from 'framer-motion'
import { Menu, Settings, Zap, Wifi, WifiOff } from 'lucide-react'
import { useAppStore } from '../store/appStore'
import Button from './ui/Button'

const Header: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, isConnected, isVueReady } = useAppStore()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 glass border-b border-white/20 flex items-center justify-between px-6"
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">
              YOOtheme Builder Studio
            </h1>
            <p className="text-white/70 text-xs">
              Advanced Automation & AI Generation
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="text-white/80 text-sm">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isVueReady ? 'bg-blue-400' : 'bg-yellow-400'}`} />
          <span className="text-white/80 text-sm">
            {isVueReady ? 'Vue Ready' : 'Initializing'}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </motion.header>
  )
}

export default Header