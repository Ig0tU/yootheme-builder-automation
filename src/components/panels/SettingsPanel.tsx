import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, RotateCcw, Shield, Zap, Palette } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    apiEndpoint: 'https://your-site.com/builder.json',
    autoSave: true,
    darkMode: false,
    notifications: true,
    maxRetries: 5,
    timeout: 30000
  })

  const handleSave = () => {
    localStorage.setItem('yootheme-builder-settings', JSON.stringify(settings))
    console.log('Settings saved:', settings)
  }

  const handleReset = () => {
    const defaultSettings = {
      apiEndpoint: 'https://your-site.com/builder.json',
      autoSave: true,
      darkMode: false,
      notifications: true,
      maxRetries: 5,
      timeout: 30000
    }
    setSettings(defaultSettings)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <p className="text-white/70">Configure your YOOtheme Builder automation</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Connection Settings */}
        <Card gradient className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-white font-semibold text-lg">Connection Settings</h3>
          </div>
          
          <div className="space-y-4">
            <Input
              label="API Endpoint"
              value={settings.apiEndpoint}
              onChange={(e) => setSettings({...settings, apiEndpoint: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Max Retries"
                type="number"
                value={settings.maxRetries}
                onChange={(e) => setSettings({...settings, maxRetries: parseInt(e.target.value)})}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
              <Input
                label="Timeout (ms)"
                type="number"
                value={settings.timeout}
                onChange={(e) => setSettings({...settings, timeout: parseInt(e.target.value)})}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
            </div>
          </div>
        </Card>

        {/* UI Preferences */}
        <Card gradient className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold text-lg">UI Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Auto Save</label>
                <p className="text-white/60 text-sm">Automatically save changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Dark Mode</label>
                <p className="text-white/60 text-sm">Use dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Notifications</label>
                <p className="text-white/60 text-sm">Show system notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card gradient className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-green-400" />
            <h3 className="text-white font-semibold text-lg">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">API Security</h4>
              <p className="text-white/70 text-sm mb-3">
                Ensure your API endpoints are secure and use HTTPS connections.
              </p>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                Test Connection
              </Button>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Data Privacy</h4>
              <p className="text-white/70 text-sm mb-3">
                All data is processed locally. No information is sent to external servers.
              </p>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                View Privacy Policy
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPanel