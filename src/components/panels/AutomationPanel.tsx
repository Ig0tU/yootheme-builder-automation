import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Play, Pause, Settings, Plus, Trash2 } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'

const automations = [
  {
    id: 1,
    name: 'Auto Image Optimization',
    description: 'Automatically optimize images when added to the builder',
    status: 'active',
    trigger: 'Image Upload',
    actions: ['Compress', 'Resize', 'Add Alt Text']
  },
  {
    id: 2,
    name: 'SEO Meta Generator',
    description: 'Generate meta tags based on page content',
    status: 'active',
    trigger: 'Page Save',
    actions: ['Generate Title', 'Create Description', 'Add Keywords']
  },
  {
    id: 3,
    name: 'Responsive Checker',
    description: 'Check responsive design on element addition',
    status: 'paused',
    trigger: 'Element Add',
    actions: ['Check Mobile', 'Check Tablet', 'Report Issues']
  },
  {
    id: 4,
    name: 'Color Contrast Validator',
    description: 'Validate color contrast for accessibility',
    status: 'inactive',
    trigger: 'Style Change',
    actions: ['Check Contrast', 'Suggest Colors', 'Generate Report']
  }
]

const AutomationPanel: React.FC = () => {
  const [newAutomationName, setNewAutomationName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleToggleAutomation = (id: number) => {
    console.log(`Toggling automation ${id}`)
  }

  const handleDeleteAutomation = (id: number) => {
    console.log(`Deleting automation ${id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'inactive': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Automation Hub</h2>
              <p className="text-white/70">Automate repetitive tasks and workflows</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Create New Automation */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card gradient className="p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Create New Automation</h3>
              <div className="space-y-4">
                <Input
                  label="Automation Name"
                  placeholder="Enter automation name..."
                  value={newAutomationName}
                  onChange={(e) => setNewAutomationName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <div className="flex space-x-2">
                  <Button size="sm">Create Automation</Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowCreateForm(false)}
                    className="text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Automation List */}
        <div className="space-y-4">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card gradient className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(automation.status)}`} />
                      <h3 className="text-white font-semibold text-lg">{automation.name}</h3>
                      <span className="text-white/60 text-sm capitalize">{automation.status}</span>
                    </div>
                    <p className="text-white/70 mb-4">{automation.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Trigger</h4>
                        <div className="bg-white/10 rounded-lg p-3">
                          <span className="text-white/80">{automation.trigger}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Actions</h4>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex flex-wrap gap-2">
                            {automation.actions.map((action, actionIndex) => (
                              <span
                                key={actionIndex}
                                className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                              >
                                {action}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleAutomation(automation.id)}
                      className="text-white hover:bg-white/10"
                    >
                      {automation.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAutomation(automation.id)}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
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

export default AutomationPanel