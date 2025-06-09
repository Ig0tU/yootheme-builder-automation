import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Eye, Download } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const colorSchemes = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#60A5FA',
    colors: ['#3B82F6', '#1E40AF', '#60A5FA', '#DBEAFE', '#1F2937']
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    primary: '#F97316',
    secondary: '#EA580C',
    accent: '#FB923C',
    colors: ['#F97316', '#EA580C', '#FB923C', '#FED7AA', '#1F2937']
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#047857',
    accent: '#34D399',
    colors: ['#059669', '#047857', '#34D399', '#A7F3D0', '#1F2937']
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primary: '#7C3AED',
    secondary: '#5B21B6',
    accent: '#A78BFA',
    colors: ['#7C3AED', '#5B21B6', '#A78BFA', '#DDD6FE', '#1F2937']
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    primary: '#E11D48',
    secondary: '#BE185D',
    accent: '#FB7185',
    colors: ['#E11D48', '#BE185D', '#FB7185', '#FECDD3', '#1F2937']
  },
  {
    id: 'ocean-teal',
    name: 'Ocean Teal',
    primary: '#0891B2',
    secondary: '#0E7490',
    accent: '#22D3EE',
    colors: ['#0891B2', '#0E7490', '#22D3EE', '#A5F3FC', '#1F2937']
  }
]

const StylesPanel: React.FC = () => {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null)

  const handleApplyScheme = (scheme: any) => {
    // Apply color scheme to YOOtheme Builder
    console.log('Applying color scheme:', scheme)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Style Manager</h2>
            <p className="text-white/70">Customize colors, fonts, and design elements</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Color Schemes */}
        <Card gradient className="p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Color Schemes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedScheme(scheme.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedScheme === scheme.id
                    ? 'border-white/40 bg-white/10'
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{scheme.name}</h4>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 p-1"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApplyScheme(scheme)}
                      className="text-white hover:bg-white/10 p-1"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {scheme.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Typography */}
        <Card gradient className="p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Typography</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-medium mb-2">Headings</h4>
                <div className="space-y-2">
                  <div className="text-white text-2xl font-bold">Heading 1</div>
                  <div className="text-white text-xl font-semibold">Heading 2</div>
                  <div className="text-white text-lg font-medium">Heading 3</div>
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-medium mb-2">Body Text</h4>
                <div className="space-y-2">
                  <p className="text-white">Regular paragraph text with normal weight and spacing.</p>
                  <p className="text-white/70 text-sm">Small text for captions and secondary information.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Spacing & Layout */}
        <Card gradient className="p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Spacing & Layout</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <h4 className="text-white font-medium mb-2">Padding</h4>
              <div className="space-y-2">
                <div className="bg-white/20 p-2 rounded text-white text-sm">Small (8px)</div>
                <div className="bg-white/20 p-4 rounded text-white text-sm">Medium (16px)</div>
                <div className="bg-white/20 p-6 rounded text-white text-sm">Large (24px)</div>
              </div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <h4 className="text-white font-medium mb-2">Margins</h4>
              <div className="space-y-2">
                <div className="bg-white/20 rounded text-white text-sm p-2">Auto spacing</div>
                <div className="bg-white/20 rounded text-white text-sm p-2">Fixed spacing</div>
                <div className="bg-white/20 rounded text-white text-sm p-2">Responsive</div>
              </div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <h4 className="text-white font-medium mb-2">Borders</h4>
              <div className="space-y-2">
                <div className="border border-white/40 rounded p-2 text-white text-sm">Solid border</div>
                <div className="border-2 border-dashed border-white/40 rounded p-2 text-white text-sm">Dashed</div>
                <div className="border border-white/40 rounded-lg p-2 text-white text-sm">Rounded</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StylesPanel