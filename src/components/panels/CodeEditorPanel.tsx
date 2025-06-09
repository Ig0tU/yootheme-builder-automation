import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Save, Download, Copy, RotateCcw } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import toast from 'react-hot-toast'

const CodeEditorPanel: React.FC = () => {
  const [code, setCode] = useState(`// YOOtheme Builder Automation Script
const createHeroSection = () => {
  const heroSection = {
    type: "yootheme/builder-section",
    id: "hero-" + Date.now(),
    props: {
      style: "default",
      padding: "large",
      background: {
        color: "#667eea"
      }
    },
    children: [
      {
        type: "yootheme/builder-row",
        id: "row-" + Date.now(),
        children: [
          {
            type: "yootheme/builder-column",
            id: "column-" + Date.now(),
            props: {
              width: "1-1"
            },
            children: [
              {
                type: "yootheme/builder-heading",
                id: "heading-" + Date.now(),
                props: {
                  content: "Welcome to Our Amazing Product",
                  tag: "h1",
                  style: "h1",
                  color: "white",
                  text_align: "center"
                }
              },
              {
                type: "yootheme/builder-text",
                id: "text-" + Date.now(),
                props: {
                  content: "Discover the future of web development with our innovative solutions.",
                  color: "white",
                  text_align: "center"
                }
              }
            ]
          }
        ]
      }
    ]
  };
  
  return heroSection;
};

// Execute the function
const hero = createHeroSection();

// Add to YOOtheme Builder
if (window.YooController && window.YooController.isVueReady()) {
  window.YooController.addSectionsToBuilder(hero);
  console.log("✅ Hero section added successfully!");
} else {
  console.warn("⚠️ YooController not ready");
}`)

  const handleExecute = () => {
    try {
      eval(code)
      toast.success('Code executed successfully!')
    } catch (error) {
      toast.error('Error executing code: ' + error.message)
    }
  }

  const handleSave = () => {
    localStorage.setItem('yootheme-builder-code', code)
    toast.success('Code saved to local storage!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast.success('Code copied to clipboard!')
  }

  const handleReset = () => {
    const savedCode = localStorage.getItem('yootheme-builder-code')
    if (savedCode) {
      setCode(savedCode)
      toast.success('Code restored from local storage!')
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Code Editor</h2>
            <p className="text-white/70">Write and execute YOOtheme Builder automation scripts</p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-white hover:bg-white/10"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-white hover:bg-white/10"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Restore
            </Button>
            <Button
              onClick={handleExecute}
              size="sm"
            >
              <Play className="w-4 h-4 mr-1" />
              Execute
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Card gradient className="h-full">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-medium">JavaScript Editor</h3>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <span>Lines: {code.split('\n').length}</span>
                <span>•</span>
                <span>Characters: {code.length}</span>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-black/20 text-green-300 font-mono text-sm p-4 rounded-lg border border-white/10 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Write your YOOtheme Builder automation code here..."
                spellCheck={false}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CodeEditorPanel