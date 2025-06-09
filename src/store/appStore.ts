import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  // UI State
  sidebarOpen: boolean
  activeTab: string
  theme: 'light' | 'dark'
  
  // YooController State
  isConnected: boolean
  isVueReady: boolean
  elementsData: Record<string, any>
  
  // Builder State
  selectedTemplate: string | null
  generatedCode: string
  isGenerating: boolean
  
  // Actions
  setSidebarOpen: (open: boolean) => void
  setActiveTab: (tab: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setConnected: (connected: boolean) => void
  setVueReady: (ready: boolean) => void
  setElementsData: (data: Record<string, any>) => void
  setSelectedTemplate: (template: string | null) => void
  setGeneratedCode: (code: string) => void
  setIsGenerating: (generating: boolean) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      sidebarOpen: true,
      activeTab: 'builder',
      theme: 'light',
      isConnected: false,
      isVueReady: false,
      elementsData: {},
      selectedTemplate: null,
      generatedCode: '',
      isGenerating: false,
      
      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setTheme: (theme) => set({ theme }),
      setConnected: (connected) => set({ isConnected: connected }),
      setVueReady: (ready) => set({ isVueReady: ready }),
      setElementsData: (data) => set({ elementsData: data }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setGeneratedCode: (code) => set({ generatedCode: code }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
    }),
    {
      name: 'yootheme-builder-store',
    }
  )
)