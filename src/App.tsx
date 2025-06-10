import React from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import ParticleBackground from './components/ui/ParticleBackground'
import { useAppStore } from './store/appStore'

function App() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Enhanced Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }
          },
          loading: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }
          }
        }}
      />
      
      <div className="flex h-screen relative z-10">
        <motion.div
          initial={false}
          animate={{
            width: sidebarOpen ? '320px' : '0px',
            opacity: sidebarOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="relative z-30 overflow-hidden"
        >
          <Sidebar />
        </motion.div>
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <MainContent />
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}

export default App