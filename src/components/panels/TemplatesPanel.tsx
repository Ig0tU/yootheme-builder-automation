import React from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, Star } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const templates = [
  {
    id: 1,
    name: 'Modern Landing',
    category: 'Landing Pages',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    rating: 4.8,
    downloads: 1234,
    description: 'Clean and modern landing page perfect for SaaS products'
  },
  {
    id: 2,
    name: 'Creative Portfolio',
    category: 'Portfolio',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    rating: 4.9,
    downloads: 856,
    description: 'Showcase your creative work with this stunning portfolio template'
  },
  {
    id: 3,
    name: 'E-commerce Store',
    category: 'E-commerce',
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    rating: 4.7,
    downloads: 2103,
    description: 'Complete e-commerce solution with product showcase and cart'
  },
  {
    id: 4,
    name: 'Blog Magazine',
    category: 'Blog',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    rating: 4.6,
    downloads: 743,
    description: 'Magazine-style blog layout with featured articles and sidebar'
  },
  {
    id: 5,
    name: 'Corporate Business',
    category: 'Business',
    preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    rating: 4.8,
    downloads: 1567,
    description: 'Professional business website with services and team sections'
  },
  {
    id: 6,
    name: 'Restaurant Menu',
    category: 'Restaurant',
    preview: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    rating: 4.5,
    downloads: 432,
    description: 'Elegant restaurant website with menu and reservation system'
  }
]

const TemplatesPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">Template Gallery</h2>
        <p className="text-white/70">Professional templates to jumpstart your projects</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card gradient hover className="overflow-hidden">
                <div className="relative">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white text-xs font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{template.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-white/60 text-xs">
                      <span>{template.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Use Template
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplatesPanel