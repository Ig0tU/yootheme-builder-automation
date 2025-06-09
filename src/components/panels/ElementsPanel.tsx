import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Grid, List, Filter } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'

const elements = [
  { id: 'heading', name: 'Heading', category: 'Typography', icon: '📝', color: 'bg-blue-500' },
  { id: 'text', name: 'Text', category: 'Typography', icon: '📄', color: 'bg-blue-500' },
  { id: 'image', name: 'Image', category: 'Media', icon: '🖼️', color: 'bg-green-500' },
  { id: 'gallery', name: 'Gallery', category: 'Media', icon: '🖼️', color: 'bg-green-500' },
  { id: 'video', name: 'Video', category: 'Media', icon: '🎥', color: 'bg-green-500' },
  { id: 'button', name: 'Button', category: 'Interactive', icon: '🔘', color: 'bg-purple-500' },
  { id: 'form', name: 'Form', category: 'Interactive', icon: '📋', color: 'bg-purple-500' },
  { id: 'map', name: 'Map', category: 'Interactive', icon: '🗺️', color: 'bg-purple-500' },
  { id: 'accordion', name: 'Accordion', category: 'Layout', icon: '📁', color: 'bg-orange-500' },
  { id: 'tabs', name: 'Tabs', category: 'Layout', icon: '📑', color: 'bg-orange-500' },
  { id: 'grid', name: 'Grid', category: 'Layout', icon: '⚏', color: 'bg-orange-500' },
  { id: 'slider', name: 'Slider', category: 'Layout', icon: '🎚️', color: 'bg-orange-500' },
]

const categories = ['All', 'Typography', 'Media', 'Interactive', 'Layout']

const ElementsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredElements = elements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || element.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddElement = (elementId: string) => {
    // Add element to builder
    console.log(`Adding element: ${elementId}`)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Elements Library</h2>
        
        {/* Search and Filters */}
        <div className="space-y-4">
          <Input
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4 text-gray-400" />}
            className="bg-white/10 border-white/20 text-white placeholder-white/50"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory !== category ? 'text-white hover:bg-white/10' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode !== 'grid' ? 'text-white hover:bg-white/10' : ''}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode !== 'list' ? 'text-white hover:bg-white/10' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient hover className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 ${element.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {element.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{element.name}</h3>
                      <p className="text-white/60 text-sm">{element.category}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddElement(element.id)}
                    size="sm"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Element
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card gradient className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${element.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                        {element.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{element.name}</h3>
                        <p className="text-white/60 text-sm">{element.category}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddElement(element.id)}
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ElementsPanel