import React from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useAppStore } from './store/appStore'

function App() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#1f2937',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      <div className="flex h-screen">
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
    </div>
  )
}

export default App