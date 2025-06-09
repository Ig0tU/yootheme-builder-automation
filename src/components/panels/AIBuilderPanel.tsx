import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wand2, Download, Copy, Play } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'
import { useAppStore } from '../../store/appStore'
import toast from 'react-hot-toast'

const templates = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Modern landing page with hero, features, and CTA',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    elements: ['hero', 'features', 'testimonials', 'cta']
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Creative portfolio with gallery and about section',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    elements: ['header', 'gallery', 'about', 'contact']
  },
  {
    id: 'blog',
    name: 'Blog Layout',
    description: 'Clean blog layout with sidebar and featured posts',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    elements: ['header', 'featured', 'posts', 'sidebar']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Product showcase with shopping features',
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    elements: ['products', 'cart', 'checkout', 'reviews']
  }
]

const AIBuilderPanel: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const { isGenerating, setIsGenerating, setGeneratedCode } = useAppStore()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your page')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const generatedCode = `
// Generated YOOtheme Builder Structure
const pageStructure = {
  type: "yootheme/builder-section",
  id: "section-${Date.now()}",
  props: {
    style: "default",
    padding: "large",
    background: {
      color: "#ffffff"
    }
  },
  children: [
    {
      type: "yootheme/builder-row",
      id: "row-${Date.now()}",
      children: [
        {
          type: "yootheme/builder-column",
          id: "column-${Date.now()}",
          props: {
            width: "1-1"
          },
          children: [
            {
              type: "yootheme/builder-heading",
              id: "heading-${Date.now()}",
              props: {
                content: "${prompt}",
                tag: "h1",
                style: "h1",
                color: "primary"
              }
            }
          ]
        }
      ]
    }
  ]
};

// Add to YOOtheme Builder
if (window.YooController && window.YooController.isVueReady()) {
  window.YooController.addSectionsToBuilder(pageStructure);
  console.log("✅ AI-generated content added to builder");
} else {
  console.warn("⚠️ YooController not ready");
}
      `.trim()
      
      setGeneratedCode(generatedCode)
      toast.success('AI content generated successfully!')
    } catch (error) {
      toast.error('Failed to generate content')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success('Code copied to clipboard!')
  }

  const handleExecuteCode = () => {
    try {
      // Execute the generated code
      eval(generatedCode)
      toast.success('Code executed successfully!')
    } catch (error) {
      toast.error('Failed to execute code')
    }
  }

  const { generatedCode } = useAppStore()

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Page Builder</h2>
            <p className="text-white/70">Generate stunning pages with artificial intelligence</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* AI Prompt Section */}
        <Card gradient className="p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
            <Wand2 className="w-5 h-5 mr-2" />
            Describe Your Page
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="e.g., Create a modern landing page for a tech startup with hero section, features, and contact form"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            <Button
              onClick={handleGenerate}
              loading={isGenerating}
              className="w-full"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate with AI
            </Button>
          </div>
        </Card>

        {/* Template Selection */}
        <Card gradient className="p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Quick Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-purple-400 shadow-lg shadow-purple-400/25'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white font-medium">{template.name}</h4>
                  <p className="text-white/70 text-sm">{template.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Generated Code */}
        {generatedCode && (
          <Card gradient className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Generated Code</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="text-white hover:bg-white/10"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExecuteCode}
                  className="text-white hover:bg-white/10"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Execute
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                {generatedCode}
              </pre>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AIBuilderPanel