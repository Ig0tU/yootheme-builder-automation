import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, Download, Copy, Play, Zap, Brain, Rocket } from 'lucide-react'
import Button from '../ui/Button'
import GlowButton from '../ui/GlowButton'
import Card from '../ui/Card'
import Input from '../ui/Input'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useAppStore } from '../../store/appStore'
import toast from 'react-hot-toast'

const templates = [
  {
    id: 'landing',
    name: 'AI Landing Page',
    description: 'Modern landing page with hero, features, and CTA',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    elements: ['hero', 'features', 'testimonials', 'cta'],
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Stunning portfolio with gallery and about section',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    elements: ['header', 'gallery', 'about', 'contact'],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    description: 'Clean blog layout with sidebar and featured posts',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    elements: ['header', 'featured', 'posts', 'sidebar'],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Product showcase with shopping features',
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    elements: ['products', 'cart', 'checkout', 'reviews'],
    gradient: 'from-orange-500 to-red-600'
  }
]

const aiFeatures = [
  {
    icon: Brain,
    title: 'Neural Processing',
    description: 'Advanced AI understands your requirements'
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Creates complete pages in seconds'
  },
  {
    icon: Rocket,
    title: 'Smart Optimization',
    description: 'Automatically optimizes for performance'
  }
]

const AIBuilderPanel: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const { isGenerating, setIsGenerating, setGeneratedCode, generatedCode } = useAppStore()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your page')
      return
    }

    setIsGenerating(true)
    
    try {
      // Enhanced AI generation simulation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const generatedCode = `
// 🤖 AI-Generated YOOtheme Builder Structure
// Generated for: "${prompt}"
// Timestamp: ${new Date().toISOString()}

const aiGeneratedStructure = {
  type: "yootheme/builder-section",
  id: "ai-section-${Date.now()}",
  props: {
    style: "primary",
    padding: "xlarge",
    background: {
      color: "#667eea",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
      overlay: "rgba(102, 126, 234, 0.8)"
    },
    animation: "fade"
  },
  children: [
    {
      type: "yootheme/builder-row",
      id: "ai-row-${Date.now()}",
      props: {
        gutter: "large",
        alignment: "center"
      },
      children: [
        {
          type: "yootheme/builder-column",
          id: "ai-column-${Date.now()}",
          props: {
            width: "1-1",
            animation: "slide-bottom-small"
          },
          children: [
            {
              type: "yootheme/builder-heading",
              id: "ai-heading-${Date.now()}",
              props: {
                content: "${prompt}",
                tag: "h1",
                style: "h1",
                color: "white",
                text_align: "center",
                margin: "default",
                font_weight: "bold"
              }
            },
            {
              type: "yootheme/builder-text",
              id: "ai-text-${Date.now()}",
              props: {
                content: "Experience the future of web development with our AI-powered solutions. Transform your ideas into stunning reality with just a few words.",
                color: "white",
                text_align: "center",
                margin: "default",
                font_size: "large"
              }
            },
            {
              type: "yootheme/builder-button",
              id: "ai-button-${Date.now()}",
              props: {
                content: "Get Started Now",
                style: "primary",
                size: "large",
                margin: "default",
                text_align: "center",
                animation: "scale-up"
              }
            }
          ]
        }
      ]
    }
  ]
};

// 🚀 Enhanced Features Section
const featuresSection = {
  type: "yootheme/builder-section",
  id: "features-section-${Date.now()}",
  props: {
    style: "default",
    padding: "large",
    background: { color: "#ffffff" }
  },
  children: [
    {
      type: "yootheme/builder-row",
      id: "features-row-${Date.now()}",
      children: [
        {
          type: "yootheme/builder-column",
          id: "feature-col-1-${Date.now()}",
          props: { width: "1-3" },
          children: [{
            type: "yootheme/builder-heading",
            id: "feature-heading-1-${Date.now()}",
            props: {
              content: "⚡ Lightning Fast",
              tag: "h3",
              style: "h3",
              text_align: "center"
            }
          }]
        },
        {
          type: "yootheme/builder-column",
          id: "feature-col-2-${Date.now()}",
          props: { width: "1-3" },
          children: [{
            type: "yootheme/builder-heading",
            id: "feature-heading-2-${Date.now()}",
            props: {
              content: "🔒 Secure & Reliable",
              tag: "h3",
              style: "h3",
              text_align: "center"
            }
          }]
        },
        {
          type: "yootheme/builder-column",
          id: "feature-col-3-${Date.now()}",
          props: { width: "1-3" },
          children: [{
            type: "yootheme/builder-heading",
            id: "feature-heading-3-${Date.now()}",
            props: {
              content: "🎨 Beautiful Design",
              tag: "h3",
              style: "h3",
              text_align: "center"
            }
          }]
        }
      ]
    }
  ]
};

// 🎯 Execute AI Generation
if (window.YooController && window.YooController.isVueReady()) {
  // Add main section
  window.YooController.addSectionsToBuilder(aiGeneratedStructure);
  
  // Add features section
  window.YooController.addSectionsToBuilder(featuresSection);
  
  console.log("✅ AI-generated content added successfully!");
  console.log("🎨 Sections created:", 2);
  console.log("🚀 Elements generated:", 6);
} else {
  console.warn("⚠️ YooController not ready - please wait and try again");
}
      `.trim()
      
      setGeneratedCode(generatedCode)
      toast.success('🤖 AI content generated successfully!')
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
      eval(generatedCode)
      toast.success('🚀 Code executed successfully!')
    } catch (error) {
      toast.error('Failed to execute code')
    }
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 neural-network opacity-30" />
      
      <div className="p-6 border-b border-white/10 relative z-10">
        <motion.div 
          className="flex items-center space-x-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">AI Page Builder</h2>
            <p className="text-white/70">Generate stunning pages with artificial intelligence</p>
          </div>
        </motion.div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="glass-card p-4 rounded-lg"
            >
              <feature.icon className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="text-white font-medium text-sm">{feature.title}</h3>
              <p className="text-white/60 text-xs">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6 relative z-10 custom-scrollbar">
        {/* AI Prompt Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card gradient className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
            <div className="relative z-10">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <Wand2 className="w-5 h-5 mr-2" />
                Describe Your Vision
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="e.g., Create a modern landing page for a tech startup with hero section, features, and contact form"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-purple-500"
                />
                <GlowButton
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  variant="holographic"
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">AI is thinking...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate with AI
                    </>
                  )}
                </GlowButton>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card gradient className="p-6">
            <h3 className="text-white font-semibold text-lg mb-4">AI-Powered Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'border-purple-400 shadow-lg shadow-purple-400/25'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${template.gradient} opacity-60`} />
                    <div className="absolute top-2 right-2">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-white/10 to-white/5">
                    <h4 className="text-white font-medium mb-1">{template.name}</h4>
                    <p className="text-white/70 text-sm mb-3">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.elements.map((element, idx) => (
                        <span
                          key={idx}
                          className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Generated Code */}
        <AnimatePresence>
          {generatedCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card gradient className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Generated Code
                  </h3>
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
                    <GlowButton
                      variant="neon"
                      size="sm"
                      onClick={handleExecuteCode}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Execute
                    </GlowButton>
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
                <div className="bg-black/30 rounded-lg p-4 overflow-auto max-h-96 custom-scrollbar">
                  <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AIBuilderPanel