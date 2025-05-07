// AI Agent for YooController - Conversational interface for user-driven development actions

const YooControllerAgent = (() => {
    // Simple NLP command keywords and corresponding actions
    const commands = {
        'add section': 'addSection',
        'create element': 'createElement',
        'show elements': 'showElements',
        'help': 'showHelp',
        'exit': 'exitAgent'
    };

    // Reference to YooController (assumed to be loaded globally)
    const controller = window.YooController || null;

    // Flag to keep agent running
    let active = false;

    // Start the agent interaction loop
    async function startAgent() {
        active = true;
        console.log("🤖 YooController AI Agent started. Type 'help' for commands.");

        while (active) {
            const input = await promptUser("What would you like to change, create, or discuss? (type 'help' for options)");

            if (!input) {
                console.log("No input detected. Exiting agent.");
                active = false;
                break;
            }

            const command = inferCommand(input.toLowerCase());

            if (command) {
                await executeCommand(command, input);
            } else {
                console.log("🤖 Sorry, I didn't understand that. Please try again or type 'help'.");
            }
        }
    }

    // Prompt user for input using browser prompt (can be replaced with UI modal)
    function promptUser(message) {
        return new Promise((resolve) => {
            const response = window.prompt(message);
            resolve(response);
        });
    }

    // Infer command from user input using keyword matching
    function inferCommand(input) {
        for (const key in commands) {
            if (input.includes(key)) {
                return commands[key];
            }
        }
        return null;
    }

    // Execute the inferred command
    async function executeCommand(command, input) {
        switch (command) {
            case 'addSection':
                console.log("🤖 Adding a new empty section to the builder...");
                if (controller && controller.isVueReady()) {
                    const section = controller.createElement('section');
                    if (section) {
                        controller.addSectionsToBuilder(section);
                        console.log("✅ Section added.");
                    } else {
                        console.log("❌ Failed to create section element.");
                    }
                } else {
                    console.log("⏳ YooController not ready yet. Please wait and try again.");
                }
                break;

            case 'createElement':
                // Extract element type from input (e.g., "create element image")
                const typeMatch = input.match(/create element (\w+)/);
                if (typeMatch && typeMatch[1]) {
                    const type = typeMatch[1];
                    console.log(`🤖 Creating element of type '${type}'...`);
                    if (controller && controller.isVueReady()) {
                        const element = controller.createElement(type);
                        if (element) {
                            controller.addElementToBuilder(element);
                            console.log(`✅ Element '${type}' added.`);
                        } else {
                            console.log(`❌ Element type '${type}' not found.`);
                        }
                    } else {
                        console.log("⏳ YooController not ready yet. Please wait and try again.");
                    }
                } else {
                    console.log("🤖 Please specify the element type. Example: 'create element image'");
                }
                break;

            case 'showElements':
                if (controller) {
                    const elements = controller.getElementsData();
                    console.log("🤖 Available elements:", elements);
                } else {
                    console.log("❌ YooController not available.");
                }
                break;

            case 'showHelp':
                console.log("🤖 Available commands:");
                console.log(" - 'add section' : Add a new empty section to the builder");
                console.log(" - 'create element [type]' : Create and add an element of the specified type");
                console.log(" - 'show elements' : List all available element types");
                console.log(" - 'exit' : Exit the agent");
                break;

            case 'exitAgent':
                console.log("🤖 Exiting YooController AI Agent. Goodbye!");
                active = false;
                break;

            default:
                console.log("🤖 Unknown command.");
                break;
        }
    }

    return {
        start: startAgent
    };
})();

// To start the agent, call YooControllerAgent.start() in the browser console or integrate with UI.
