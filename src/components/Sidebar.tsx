import React from 'react'
import { motion } from 'framer-motion'
import { 
  Layers, 
  Code, 
  Palette, 
  Zap, 
  FileText, 
  Settings,
  Sparkles,
  Database
} from 'lucide-react'
import { useAppStore } from '../store/appStore'
import { cn } from '../utils/cn'

const sidebarItems = [
  { id: 'builder', label: 'AI Builder', icon: Sparkles, color: 'text-purple-400' },
  { id: 'elements', label: 'Elements', icon: Layers, color: 'text-blue-400' },
  { id: 'templates', label: 'Templates', icon: FileText, color: 'text-green-400' },
  { id: 'code', label: 'Code Editor', icon: Code, color: 'text-orange-400' },
  { id: 'styles', label: 'Styles', icon: Palette, color: 'text-pink-400' },
  { id: 'automation', label: 'Automation', icon: Zap, color: 'text-yellow-400' },
  { id: 'data', label: 'Data Manager', icon: Database, color: 'text-cyan-400' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-400' },
]

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore()

  return (
    <motion.div
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-80 h-full glass border-r border-white/20 flex flex-col"
    >
      <div className="p-6 border-b border-white/10">
        <h2 className="text-white font-semibold text-lg mb-2">Control Panel</h2>
        <p className="text-white/70 text-sm">
          Manage your YOOtheme Builder automation
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200',
                'hover:bg-white/10 hover:transform hover:scale-105',
                isActive 
                  ? 'bg-white/20 shadow-lg border border-white/30' 
                  : 'hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-5 h-5', item.color)} />
              <span className="text-white font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 bg-white rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass-dark rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/70">
              <span>Elements Available</span>
              <span className="text-white">47</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Templates</span>
              <span className="text-white">12</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Automations</span>
              <span className="text-white">8</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar