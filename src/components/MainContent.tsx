import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import AIBuilderPanel from './panels/AIBuilderPanel'
import ElementsPanel from './panels/ElementsPanel'
import TemplatesPanel from './panels/TemplatesPanel'
import CodeEditorPanel from './panels/CodeEditorPanel'
import StylesPanel from './panels/StylesPanel'
import AutomationPanel from './panels/AutomationPanel'
import DataManagerPanel from './panels/DataManagerPanel'
import SettingsPanel from './panels/SettingsPanel'

const panels = {
  builder: AIBuilderPanel,
  elements: ElementsPanel,
  templates: TemplatesPanel,
  code: CodeEditorPanel,
  styles: StylesPanel,
  automation: AutomationPanel,
  data: DataManagerPanel,
  settings: SettingsPanel,
}

const MainContent: React.FC = () => {
  const { activeTab } = useAppStore()
  const ActivePanel = panels[activeTab as keyof typeof panels] || AIBuilderPanel

  return (
    <div className="flex-1 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <ActivePanel />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MainContent