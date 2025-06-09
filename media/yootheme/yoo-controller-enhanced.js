// Enhanced YooController V5.0 - Advanced YOOtheme Builder Automation
const YooController = (() => {
    let elementsData = {}
    let jsonLoaded = false
    let vueReady = false
    let retryCount = 0
    const MAX_RETRIES = 50
    let rootVueInstance = null
    
    // Enhanced event system
    const eventBus = {
        events: {},
        on(event, callback) {
            if (!this.events[event]) this.events[event] = []
            this.events[event].push(callback)
        },
        emit(event, data) {
            if (this.events[event]) {
                this.events[event].forEach(callback => callback(data))
            }
        }
    }

    // Performance monitoring
    const performance = {
        metrics: {},
        start(operation) {
            this.metrics[operation] = { start: Date.now() }
        },
        end(operation) {
            if (this.metrics[operation]) {
                this.metrics[operation].duration = Date.now() - this.metrics[operation].start
                console.log(`⚡ ${operation} completed in ${this.metrics[operation].duration}ms`)
            }
        }
    }

    // Enhanced element validation
    const validator = {
        validateElement(element) {
            const errors = []
            
            if (!element.type) errors.push('Element type is required')
            if (!element.id) errors.push('Element ID is required')
            if (element.type && !elementsData[element.type] && !elementsData[element.type.replace(/^yootheme\/builder-/, '')]) {
                errors.push(`Unknown element type: ${element.type}`)
            }
            
            return {
                valid: errors.length === 0,
                errors
            }
        },
        
        validateStructure(structure) {
            const errors = []
            
            const validateNode = (node, path = '') => {
                const validation = this.validateElement(node)
                if (!validation.valid) {
                    errors.push(...validation.errors.map(error => `${path}: ${error}`))
                }
                
                if (node.children && Array.isArray(node.children)) {
                    node.children.forEach((child, index) => {
                        validateNode(child, `${path}[${index}]`)
                    })
                }
            }
            
            if (Array.isArray(structure)) {
                structure.forEach((item, index) => validateNode(item, `[${index}]`))
            } else {
                validateNode(structure, 'root')
            }
            
            return {
                valid: errors.length === 0,
                errors
            }
        }
    }

    // AI-powered content generation helpers
    const aiHelpers = {
        generateId(type, context = '') {
            const timestamp = Date.now()
            const random = Math.random().toString(36).substr(2, 5)
            const contextHash = context ? context.slice(0, 3) : ''
            return `${type}-${contextHash}${timestamp}-${random}`.toLowerCase()
        },
        
        generateContent(type, prompt) {
            const templates = {
                heading: {
                    h1: ['Welcome to Our Amazing Platform', 'Transform Your Business Today', 'Innovation Starts Here'],
                    h2: ['Discover New Possibilities', 'Built for the Future', 'Your Success Story Begins'],
                    h3: ['Key Features', 'Why Choose Us', 'Get Started Today']
                },
                text: [
                    'Experience the next generation of digital solutions designed to elevate your business.',
                    'Our innovative approach combines cutting-edge technology with user-centric design.',
                    'Join thousands of satisfied customers who have transformed their operations with our platform.'
                ],
                button: ['Get Started', 'Learn More', 'Contact Us', 'Try Free', 'Download Now']
            }
            
            if (prompt && prompt.length > 10) {
                return prompt
            }
            
            const typeTemplates = templates[type] || templates.text
            if (Array.isArray(typeTemplates)) {
                return typeTemplates[Math.floor(Math.random() * typeTemplates.length)]
            } else {
                const subType = Object.keys(typeTemplates)[0]
                return typeTemplates[subType][Math.floor(Math.random() * typeTemplates[subType].length)]
            }
        }
    }

    // Enhanced structure builder
    const structureBuilder = {
        createSection(props = {}) {
            return {
                type: 'yootheme/builder-section',
                id: aiHelpers.generateId('section'),
                props: {
                    style: 'default',
                    padding: 'large',
                    background: { color: '#ffffff' },
                    ...props
                },
                children: []
            }
        },
        
        createRow(props = {}) {
            return {
                type: 'yootheme/builder-row',
                id: aiHelpers.generateId('row'),
                props: {
                    gutter: 'default',
                    ...props
                },
                children: []
            }
        },
        
        createColumn(width = '1-1', props = {}) {
            return {
                type: 'yootheme/builder-column',
                id: aiHelpers.generateId('column'),
                props: {
                    width,
                    ...props
                },
                children: []
            }
        },
        
        createHeroSection(content = {}) {
            const section = this.createSection({
                style: 'primary',
                padding: 'xlarge',
                background: {
                    color: '#667eea'
                }
            })
            
            const row = this.createRow()
            const column = this.createColumn('1-1')
            
            // Add heading
            column.children.push({
                type: 'yootheme/builder-heading',
                id: aiHelpers.generateId('heading'),
                props: {
                    content: content.title || aiHelpers.generateContent('heading', content.title),
                    tag: 'h1',
                    style: 'h1',
                    color: 'white',
                    text_align: 'center'
                }
            })
            
            // Add description
            if (content.description !== false) {
                column.children.push({
                    type: 'yootheme/builder-text',
                    id: aiHelpers.generateId('text'),
                    props: {
                        content: content.description || aiHelpers.generateContent('text'),
                        color: 'white',
                        text_align: 'center',
                        margin: 'default'
                    }
                })
            }
            
            // Add CTA button
            if (content.cta !== false) {
                column.children.push({
                    type: 'yootheme/builder-button',
                    id: aiHelpers.generateId('button'),
                    props: {
                        content: content.ctaText || aiHelpers.generateContent('button'),
                        style: 'primary',
                        size: 'large',
                        margin: 'default'
                    }
                })
            }
            
            row.children.push(column)
            section.children.push(row)
            
            return section
        },
        
        createFeatureSection(features = []) {
            const section = this.createSection({
                padding: 'large'
            })
            
            const row = this.createRow()
            
            if (features.length === 0) {
                features = [
                    { title: 'Fast Performance', description: 'Lightning-fast loading times' },
                    { title: 'Secure & Reliable', description: 'Enterprise-grade security' },
                    { title: '24/7 Support', description: 'Round-the-clock assistance' }
                ]
            }
            
            const columnWidth = features.length <= 2 ? '1-2' : features.length === 3 ? '1-3' : '1-4'
            
            features.forEach(feature => {
                const column = this.createColumn(columnWidth)
                
                column.children.push({
                    type: 'yootheme/builder-heading',
                    id: aiHelpers.generateId('heading'),
                    props: {
                        content: feature.title,
                        tag: 'h3',
                        style: 'h3',
                        text_align: 'center'
                    }
                })
                
                column.children.push({
                    type: 'yootheme/builder-text',
                    id: aiHelpers.generateId('text'),
                    props: {
                        content: feature.description,
                        text_align: 'center'
                    }
                })
                
                row.children.push(column)
            })
            
            section.children.push(row)
            return section
        }
    }

    // Enhanced loading and initialization
    function loadElementsData(data) {
        performance.start('loadElementsData')
        
        elementsData = {}
        
        data.forEach(element => {
            if (element.name) {
                const simpleName = element.name.replace(/^yootheme\/builder-/, '')
                elementsData[simpleName] = element
                elementsData[element.name] = element
            }
        })

        jsonLoaded = true
        console.log("✅ YOOtheme elements data loaded:", Object.keys(elementsData).length, "elements")
        
        performance.end('loadElementsData')
        eventBus.emit('elementsLoaded', elementsData)
        
        waitForVueInstance()
    }

    function findRootVueInstance() {
        const selectors = [
            '.uk-container > [data-v-app]',
            '#yootheme-builder',
            '[data-yootheme-builder]',
            '.yo-builder'
        ]
        
        for (const selector of selectors) {
            const rootElement = document.querySelector(selector)
            if (rootElement && rootElement.__vue__) {
                let instance = rootElement.__vue__
                
                while (instance && (!instance._props || !instance._props.node || !Array.isArray(instance._props.node.children))) {
                    instance = instance.$parent
                }

                if (instance && Array.isArray(instance._props.node?.children)) {
                    console.log("✅ Vue instance found with selector:", selector)
                    vueReady = true
                    rootVueInstance = instance
                    eventBus.emit('vueReady', instance)
                    return instance
                }
            }
        }
        
        return null
    }

    function waitForVueInstance() {
        if (vueReady && rootVueInstance) {
            console.log("✅ System ready!")
            return
        }

        if (retryCount >= MAX_RETRIES) {
            console.error("❌ Vue instance not found after", MAX_RETRIES, "attempts")
            eventBus.emit('initializationFailed')
            return
        }

        retryCount++
        
        setTimeout(() => {
            const instance = findRootVueInstance()
            if (!instance) {
                waitForVueInstance()
            }
        }, 2000)
    }

    function ensureIds(nodeOrArray) {
        if (Array.isArray(nodeOrArray)) {
            nodeOrArray.forEach(item => ensureIds(item))
        } else if (typeof nodeOrArray === 'object' && nodeOrArray !== null) {
            const node = nodeOrArray
            if (!node.id && node.type) {
                node.id = aiHelpers.generateId(node.type.replace(/^yootheme\/builder-/, ''))
            }

            if (Array.isArray(node.children)) {
                ensureIds(node.children)
            }
        }
    }

    function createElement(type, options = {}) {
        if (!jsonLoaded) {
            console.error("❌ JSON data not loaded yet")
            return null
        }

        const elementDef = elementsData[type] || elementsData[`yootheme/builder-${type}`]

        if (!elementDef) {
            console.warn(`⚠️ Element type "${type}" not found`)
            return null
        }

        const defaults = elementDef.defaults || {}
        return {
            type: elementDef.name,
            props: { ...defaults, ...options },
            id: aiHelpers.generateId(type),
            children: []
        }
    }

    function addSectionsToBuilder(sections) {
        performance.start('addSectionsToBuilder')
        
        if (!vueReady || !rootVueInstance) {
            console.warn("⏳ System not ready, queuing sections...")
            setTimeout(() => addSectionsToBuilder(sections), 1000)
            return
        }

        const rootChildren = rootVueInstance._props.node.children
        if (!Array.isArray(rootChildren)) {
            console.error('❌ Root children array not accessible')
            return
        }

        const sectionsToAdd = Array.isArray(sections) ? sections : [sections]
        
        // Validate all sections before adding
        const validation = validator.validateStructure(sectionsToAdd)
        if (!validation.valid) {
            console.error('❌ Structure validation failed:', validation.errors)
            return
        }

        let addedCount = 0
        sectionsToAdd.forEach(section => {
            if (typeof section === 'object' && section !== null && section.type && section.type.includes('section')) {
                ensureIds(section)
                rootChildren.push(section)
                console.log(`✅ Added section "${section.id}"`)
                addedCount++
                eventBus.emit('sectionAdded', section)
            } else {
                console.warn("⚠️ Invalid section skipped:", section)
            }
        })

        console.log(`✅ Added ${addedCount}/${sectionsToAdd.length} sections`)
        performance.end('addSectionsToBuilder')
        eventBus.emit('sectionsAdded', { added: addedCount, total: sectionsToAdd.length })
    }

    // AI Page Generation
    function generatePage(prompt, options = {}) {
        performance.start('generatePage')
        
        const sections = []
        const config = {
            includeHero: true,
            includeFeatures: true,
            includeCTA: true,
            ...options
        }
        
        // Generate hero section
        if (config.includeHero) {
            sections.push(structureBuilder.createHeroSection({
                title: prompt,
                description: config.heroDescription,
                cta: config.includeCTA
            }))
        }
        
        // Generate features section
        if (config.includeFeatures) {
            sections.push(structureBuilder.createFeatureSection(config.features))
        }
        
        performance.end('generatePage')
        return sections
    }

    // Public API
    return {
        // Core functions
        loadElementsData,
        createElement,
        addSectionsToBuilder,
        
        // Enhanced functions
        generatePage,
        structureBuilder,
        aiHelpers,
        validator,
        
        // State getters
        getElementsData: () => elementsData,
        isVueReady: () => vueReady,
        isJsonLoaded: () => jsonLoaded,
        getMetrics: () => performance.metrics,
        
        // Event system
        on: eventBus.on.bind(eventBus),
        emit: eventBus.emit.bind(eventBus),
        
        // Utilities
        ensureIds,
        findRootVueInstance
    }
})()

// Enhanced initialization with better error handling
async function initializeYooController() {
    try {
        console.log("🚀 Initializing Enhanced YooController...")
        
        const response = await fetch('/builder.json')
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        YooController.loadElementsData(data)
        
        // Set up global access
        window.YooController = YooController
        
        console.log("✅ Enhanced YooController initialized successfully!")
        
    } catch (error) {
        console.error("❌ Failed to initialize YooController:", error)
        
        // Fallback: try to initialize without JSON data
        console.log("🔄 Attempting fallback initialization...")
        YooController.loadElementsData([])
    }
}

// Auto-initialize
initializeYooController()

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YooController
}