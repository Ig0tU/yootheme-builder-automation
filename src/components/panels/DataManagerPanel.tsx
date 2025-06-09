import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Upload, Download, RefreshCw as Refresh, Search } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'

const dataConnections = [
  {
    id: 1,
    name: 'WordPress Database',
    type: 'MySQL',
    status: 'connected',
    lastSync: '2 minutes ago',
    records: 1247
  },
  {
    id: 2,
    name: 'External API',
    type: 'REST API',
    status: 'connected',
    lastSync: '5 minutes ago',
    records: 856
  },
  {
    id: 3,
    name: 'CSV Import',
    type: 'File',
    status: 'pending',
    lastSync: 'Never',
    records: 0
  },
  {
    id: 4,
    name: 'Google Sheets',
    type: 'API',
    status: 'error',
    lastSync: '1 hour ago',
    records: 432
  }
]

const DataManagerPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const handleSync = (id: number) => {
    console.log(`Syncing data source ${id}`)
  }

  const handleExport = (id: number) => {
    console.log(`Exporting data from source ${id}`)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Data Manager</h2>
              <p className="text-white/70">Manage data sources and content imports</p>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <Upload className="w-4 h-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Search and Filters */}
        <Card gradient className="p-4">
          <Input
            placeholder="Search data sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4 text-gray-400" />}
            className="bg-white/10 border-white/20 text-white placeholder-white/50"
          />
        </Card>

        {/* Data Sources */}
        <div className="space-y-4">
          {dataConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card gradient className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(connection.status)}`} />
                    <div>
                      <h3 className="text-white font-semibold text-lg">{connection.name}</h3>
                      <div className="flex items-center space-x-4 text-white/60 text-sm">
                        <span>Type: {connection.type}</span>
                        <span>•</span>
                        <span>Records: {connection.records.toLocaleString()}</span>
                        <span>•</span>
                        <span>Last sync: {connection.lastSync}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSync(connection.id)}
                      className="text-white hover:bg-white/10"
                    >
                      <Refresh className="w-4 h-4 mr-1" />
                      Sync
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleExport(connection.id)}
                      className="text-white hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Data Statistics */}
        <Card gradient className="p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Data Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">2,535</div>
              <div className="text-white/70 text-sm">Total Records</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">4</div>
              <div className="text-white/70 text-sm">Data Sources</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">98.5%</div>
              <div className="text-white/70 text-sm">Sync Success Rate</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DataManagerPanel