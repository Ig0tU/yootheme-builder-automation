// Advanced AI Agent for YOOtheme Builder - Natural Language Interface
const YooAIAgent = (() => {
    let isActive = false
    let conversationHistory = []
    let currentContext = {}
    
    // Natural language processing patterns
    const patterns = {
        create: /(?:create|add|make|build|generate)\s+(?:a\s+)?(.+)/i,
        modify: /(?:change|modify|update|edit|alter)\s+(.+)/i,
        delete: /(?:delete|remove|clear)\s+(.+)/i,
        style: /(?:style|color|design|theme)\s+(.+)/i,
        layout: /(?:layout|arrange|organize|structure)\s+(.+)/i,
        content: /(?:content|text|copy|write)\s+(.+)/i,
        help: /(?:help|what|how|can|show)/i,
        page: /(?:page|website|site)\s+(?:for|about|with)?\s*(.+)/i
    }
    
    // Element type mapping
    const elementMap = {
        'hero': 'hero section',
        'header': 'heading',
        'title': 'heading',
        'text': 'text',
        'paragraph': 'text',
        'button': 'button',
        'cta': 'button',
        'image': 'image',
        'picture': 'image',
        'gallery': 'gallery',
        'video': 'video',
        'form': 'form',
        'contact': 'form',
        'map': 'map',
        'section': 'section',
        'row': 'row',
        'column': 'column',
        'features': 'features section',
        'testimonials': 'testimonials',
        'pricing': 'pricing table',
        'team': 'team section',
        'about': 'about section',
        'services': 'services section'
    }
    
    // Response templates
    const responses = {
        greeting: [
            "Hello! I'm your YOOtheme Builder AI assistant. What would you like to create today?",
            "Hi there! Ready to build something amazing? Just tell me what you need!",
            "Welcome! I can help you create pages, sections, and elements. What's your vision?"
        ],
        success: [
            "✅ Done! I've added that to your page.",
            "✅ Perfect! Your content has been created.",
            "✅ Great! I've built that for you.",
            "✅ Excellent! Your new element is ready."
        ],
        error: [
            "❌ I couldn't complete that request. Could you try rephrasing?",
            "❌ Something went wrong. Can you be more specific?",
            "❌ I'm having trouble with that. Could you clarify what you need?"
        ],
        clarification: [
            "🤔 Could you be more specific about what you'd like to create?",
            "🤔 I need a bit more detail. What exactly are you looking for?",
            "🤔 Can you tell me more about what you have in mind?"
        ]
    }
    
    // AI processing functions
    function processNaturalLanguage(input) {
        const normalizedInput = input.toLowerCase().trim()
        
        // Check for page generation requests
        const pageMatch = normalizedInput.match(patterns.page)
        if (pageMatch) {
            return {
                action: 'generatePage',
                target: pageMatch[1],
                confidence: 0.9
            }
        }
        
        // Check for element creation
        const createMatch = normalizedInput.match(patterns.create)
        if (createMatch) {
            const elementType = identifyElementType(createMatch[1])
            return {
                action: 'createElement',
                target: elementType,
                description: createMatch[1],
                confidence: elementType ? 0.8 : 0.4
            }
        }
        
        // Check for styling requests
        const styleMatch = normalizedInput.match(patterns.style)
        if (styleMatch) {
            return {
                action: 'applyStyle',
                target: styleMatch[1],
                confidence: 0.7
            }
        }
        
        // Check for help requests
        if (patterns.help.test(normalizedInput)) {
            return {
                action: 'showHelp',
                confidence: 0.9
            }
        }
        
        return {
            action: 'unknown',
            confidence: 0.1
        }
    }
    
    function identifyElementType(description) {
        const words = description.toLowerCase().split(/\s+/)
        
        for (const word of words) {
            if (elementMap[word]) {
                return word
            }
        }
        
        // Fuzzy matching for common variations
        if (description.includes('head') || description.includes('title')) return 'heading'
        if (description.includes('para') || description.includes('text')) return 'text'
        if (description.includes('pic') || description.includes('img')) return 'image'
        if (description.includes('click') || description.includes('link')) return 'button'
        if (description.includes('contact') || description.includes('form')) return 'form'
        
        return null
    }
    
    function generateResponse(type, context = {}) {
        const templates = responses[type] || responses.clarification
        const template = templates[Math.floor(Math.random() * templates.length)]
        
        // Add context-specific information
        if (context.elementType) {
            return template + ` I've created a ${context.elementType} for you.`
        }
        
        return template
    }
    
    // Action handlers
    const actionHandlers = {
        generatePage(intent) {
            try {
                if (!window.YooController || !window.YooController.isVueReady()) {
                    return "⚠️ YooController is not ready yet. Please wait a moment and try again."
                }
                
                const pageStructure = window.YooController.generatePage(intent.target, {
                    includeHero: true,
                    includeFeatures: true,
                    includeCTA: true
                })
                
                window.YooController.addSectionsToBuilder(pageStructure)
                
                return `✅ I've created a complete page about "${intent.target}" with hero section, features, and call-to-action!`
                
            } catch (error) {
                console.error('Page generation error:', error)
                return generateResponse('error')
            }
        },
        
        createElement(intent) {
            try {
                if (!window.YooController || !window.YooController.isVueReady()) {
                    return "⚠️ YooController is not ready yet. Please wait a moment and try again."
                }
                
                let element
                
                switch (intent.target) {
                    case 'hero':
                        const heroSection = window.YooController.structureBuilder.createHeroSection({
                            title: intent.description || 'Welcome to Our Platform'
                        })
                        window.YooController.addSectionsToBuilder(heroSection)
                        return "✅ I've created a stunning hero section for you!"
                        
                    case 'features':
                        const featuresSection = window.YooController.structureBuilder.createFeatureSection()
                        window.YooController.addSectionsToBuilder(featuresSection)
                        return "✅ I've added a features section with three key benefits!"
                        
                    default:
                        element = window.YooController.createElement(intent.target, {
                            content: window.YooController.aiHelpers.generateContent(intent.target, intent.description)
                        })
                        
                        if (element) {
                            // Wrap in section structure
                            const section = window.YooController.structureBuilder.createSection()
                            const row = window.YooController.structureBuilder.createRow()
                            const column = window.YooController.structureBuilder.createColumn()
                            
                            column.children.push(element)
                            row.children.push(column)
                            section.children.push(row)
                            
                            window.YooController.addSectionsToBuilder(section)
                            return generateResponse('success', { elementType: intent.target })
                        }
                }
                
                return generateResponse('error')
                
            } catch (error) {
                console.error('Element creation error:', error)
                return generateResponse('error')
            }
        },
        
        applyStyle(intent) {
            return "🎨 Style customization is coming soon! For now, you can modify styles in the YOOtheme Builder interface."
        },
        
        showHelp() {
            return `
🤖 **YOO AI Assistant Help**

I can help you create:
• **Pages**: "Create a landing page for my business"
• **Sections**: "Add a hero section" or "Create features section"
• **Elements**: "Add a heading", "Create a button", "Insert an image"

**Example commands:**
• "Create a page for my restaurant"
• "Add a hero section with welcome message"
• "Make a contact form"
• "Insert a gallery"
• "Create features section"

Just tell me what you want to build in natural language!
            `
        },
        
        unknown() {
            return generateResponse('clarification') + "\n\nTry commands like:\n• 'Create a landing page'\n• 'Add a hero section'\n• 'Make a contact form'"
        }
    }
    
    // Main conversation interface
    async function processMessage(message) {
        conversationHistory.push({ role: 'user', content: message, timestamp: Date.now() })
        
        const intent = processNaturalLanguage(message)
        console.log('🧠 Processed intent:', intent)
        
        let response
        
        if (intent.confidence > 0.6) {
            const handler = actionHandlers[intent.action]
            response = handler ? handler(intent) : actionHandlers.unknown()
        } else {
            response = actionHandlers.unknown()
        }
        
        conversationHistory.push({ role: 'assistant', content: response, timestamp: Date.now() })
        
        return response
    }
    
    // UI Interface
    function createChatInterface() {
        // Remove existing interface
        const existing = document.getElementById('yoo-ai-chat')
        if (existing) existing.remove()
        
        const chatContainer = document.createElement('div')
        chatContainer.id = 'yoo-ai-chat'
        chatContainer.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 400px;
                max-height: 600px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
            ">
                <div style="
                    padding: 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <div>
                        <h3 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">🤖 YOO AI Assistant</h3>
                        <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">Natural language page builder</p>
                    </div>
                    <button id="yoo-ai-close" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 16px;
                    ">×</button>
                </div>
                
                <div id="yoo-ai-messages" style="
                    height: 300px;
                    overflow-y: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                ">
                    <div style="
                        background: rgba(255,255,255,0.1);
                        padding: 15px;
                        border-radius: 15px;
                        color: white;
                        font-size: 14px;
                        line-height: 1.5;
                    ">
                        ${generateResponse('greeting')}
                    </div>
                </div>
                
                <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; gap: 10px;">
                        <input 
                            id="yoo-ai-input" 
                            type="text" 
                            placeholder="Tell me what you want to create..."
                            style="
                                flex: 1;
                                padding: 12px 16px;
                                border: 1px solid rgba(255,255,255,0.2);
                                border-radius: 25px;
                                background: rgba(255,255,255,0.1);
                                color: white;
                                font-size: 14px;
                                outline: none;
                            "
                        />
                        <button id="yoo-ai-send" style="
                            background: rgba(255,255,255,0.2);
                            border: 1px solid rgba(255,255,255,0.3);
                            color: white;
                            padding: 12px 20px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.2s;
                        ">Send</button>
                    </div>
                </div>
            </div>
        `
        
        document.body.appendChild(chatContainer)
        
        // Event listeners
        const input = document.getElementById('yoo-ai-input')
        const sendBtn = document.getElementById('yoo-ai-send')
        const closeBtn = document.getElementById('yoo-ai-close')
        const messagesContainer = document.getElementById('yoo-ai-messages')
        
        const sendMessage = async () => {
            const message = input.value.trim()
            if (!message) return
            
            // Add user message
            addMessage(message, 'user')
            input.value = ''
            
            // Show typing indicator
            const typingId = addMessage('🤖 Thinking...', 'assistant')
            
            try {
                const response = await processMessage(message)
                
                // Remove typing indicator and add response
                document.getElementById(typingId).remove()
                addMessage(response, 'assistant')
                
            } catch (error) {
                document.getElementById(typingId).remove()
                addMessage('❌ Sorry, I encountered an error. Please try again.', 'assistant')
            }
        }
        
        const addMessage = (content, role) => {
            const messageId = 'msg-' + Date.now()
            const isUser = role === 'user'
            
            const messageDiv = document.createElement('div')
            messageDiv.id = messageId
            messageDiv.style.cssText = `
                background: ${isUser ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
                padding: 15px;
                border-radius: 15px;
                color: white;
                font-size: 14px;
                line-height: 1.5;
                white-space: pre-wrap;
                ${isUser ? 'margin-left: 40px;' : 'margin-right: 40px;'}
            `
            messageDiv.textContent = content
            
            messagesContainer.appendChild(messageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight
            
            return messageId
        }
        
        sendBtn.addEventListener('click', sendMessage)
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage()
        })
        closeBtn.addEventListener('click', () => {
            chatContainer.remove()
            isActive = false
        })
        
        // Focus input
        input.focus()
    }
    
    // Public API
    return {
        start() {
            if (isActive) return
            
            isActive = true
            createChatInterface()
            console.log("🤖 YOO AI Assistant activated!")
        },
        
        stop() {
            const chatContainer = document.getElementById('yoo-ai-chat')
            if (chatContainer) chatContainer.remove()
            isActive = false
            console.log("🤖 YOO AI Assistant deactivated")
        },
        
        isActive: () => isActive,
        getHistory: () => conversationHistory,
        processMessage
    }
})()

// Auto-start when YooController is ready
if (window.YooController) {
    window.YooController.on('vueReady', () => {
        console.log("🤖 YOO AI Assistant ready!")
        window.YooAIAgent = YooAIAgent
    })
} else {
    // Fallback: start after a delay
    setTimeout(() => {
        window.YooAIAgent = YooAIAgent
        console.log("🤖 YOO AI Assistant loaded!")
    }, 3000)
}

// Global access
window.YooAIAgent = YooAIAgent