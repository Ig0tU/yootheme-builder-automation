#!/bin/bash

# This script will overwrite media/yootheme/yoo-controller.js with the updated YooController implementation

cat > media/yootheme/yoo-controller.js << 'EOF'
// V4.x - Backend YooController
const YooController = (() => {

    let elementsData = {}; // Stores all element definitions
    let jsonLoaded = false; // Track if JSON is loaded
    let vueReady = false; // Track if Vue instance is found
    let retryCount = 0;
    const MAX_RETRIES = 40; // Increased retries, builder can take time to load (e.g., 2s * 40 = 80s)

    let rootVueInstance = null; // Store the found root Vue instance

    /** 🛠 Convert JSON Array to Object on Load */
    function loadElementsData(data) {
        elementsData = {}; // Reset

        // Convert [{name: 'accordion', ...}] → {accordion: {...}, alert: {...}}
        data.forEach(element => {
            if (element.name) {
                // Store both the simple name (e.g., 'image') and the full builder name (e.g., 'yootheme/builder-image')
                const simpleName = element.name.replace(/^yootheme\/builder-/, '');
                elementsData[simpleName] = element;
                elementsData[element.name] = element; // Also store the full name
            }
        });

        jsonLoaded = true;
        console.log("✅ YOOtheme elements data restructured & loaded:", elementsData);
        waitForVueInstance();
    }

    /** 🔍 Deep Vue Scan: Find the root Vue instance managing the layout children */
    function findRootVueInstance() {
        // Attempt to find a common container element that likely holds the root Vue app for the builder
        // These selectors are common but might need adjustment based on the specific YOOtheme version/setup
        let rootElement = document.querySelector('.uk-container > [data-v-app], #yootheme-builder');

        if (!rootElement) {
             // console.warn("⚠️ Could not find potential root builder element (e.g., .uk-container > [data-v-app] or #yootheme-builder).");
             return null; // No element found, retry
        }

        let instance = rootElement.__vue__;

        // Traverse up the component tree from the found element's instance
        // until we find a component instance that has a 'node' prop with a 'children' array.
        // This 'children' array is where top-level sections are typically added.
        // Look for an instance that has a 'node' object with an array 'children' property.
        while (instance && (!instance._props || !instance._props.node || !Array.isArray(instance._props.node.children))) {
             instance = instance.$parent;
        }

        if (instance && Array.isArray(instance._props.node?.children)) {
             console.log("✅ Vue instance managing root children found!", instance);
             vueReady = true;
             rootVueInstance = instance; // Store the instance
             return instance;
        } else {
             // console.warn("⚠️ Found root Vue app element, but could not find instance managing root children via parent traversal.");
             return null; // Found root element but not the specific instance, retry
        }
    }

    /** 🔄 Wait for Vue to Initialize Before Running */
    function waitForVueInstance() {
        if (vueReady && rootVueInstance) {
            console.log("✅ Vue is ready and root instance found! System initialized.");
            return; // Already ready
        }

        if (retryCount >= MAX_RETRIES) {
            console.error("❌ Vue instance managing root children not detected after multiple attempts. Stopping retries.");
            vueReady = false; // Explicitly set to false if retries exhausted
            rootVueInstance = null;
            return;
        }

        retryCount++;
        // console.warn(`⏳ Vue not ready yet. Retrying root instance scan in 2s (${retryCount}/${MAX_RETRIES})...`);

        setTimeout(() => {
            let instance = findRootVueInstance();
            if (instance) {
                // State updated inside findRootVueInstance
                 console.log("✅ Root Vue instance successfully detected after retry!");
            } else {
                waitForVueInstance(); // Retry if not found
            }
        }, 2000); // Wait 2 seconds before each retry
    }

    /** 🆔 Generate a unique ID for an element */
    function generateId(type) {
        // Using a timestamp and a random suffix for better uniqueness
        // YOOtheme often uses lowercase type names for IDs
        const idType = type ? type.toLowerCase().replace(/^yootheme\/builder-/, '') : 'node';
        return `${idType}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    }

     /**
      * 🛠 Recursively add missing IDs to elements in a structure
      * YOOtheme builder expects unique IDs for all nodes (sections, rows, columns, elements)
      * @param {Object|Array} nodeOrArray - The structure to traverse (a node object or an array of nodes).
      */
     function ensureIds(nodeOrArray) {
         if (Array.isArray(nodeOrArray)) {
             nodeOrArray.forEach(item => ensureIds(item));
         } else if (typeof nodeOrArray === 'object' && nodeOrArray !== null) {
             const node = nodeOrArray;
             // Add ID if missing and it's a node with a type
             if (!node.id && node.type) {
                 node.id = generateId(node.type);
             }

             // Recursively process children if it's an array
             if (Array.isArray(node.children)) {
                 ensureIds(node.children);
             }
             // Note: YOOtheme layout children are typically arrays.
             // Handling object children is less common for the main layout structure.
         }
         // Do nothing for primitive types
     }


    /**
     * 📦 Create an element dynamically from JSON
     * This function is primarily for internal use if you were manually building
     * a structure piece by piece. The AI approach will likely provide the structure.
     * @param {string} type - The simple element type name (e.g., 'image', 'section').
     * @param {Object} options - Props to merge with defaults.
     * @returns {Object|null} The created element object or null if type not found.
     */
    function createElement(type, options = {}) {
        if (!jsonLoaded) {
            console.error("❌ JSON data is not loaded yet. Cannot create element.");
            return null;
        }

        // Check for the element definition using both simple name and full builder name
        const elementDef = elementsData[type] || elementsData[`yootheme/builder-${type}`];

        if (!elementDef) {
            console.warn(`⚠️ Element type "${type}" not found in loaded elements data.`);
            return null;
        }

        let defaults = elementDef.defaults || {};
        return {
            type: elementDef.name, // Use the full name from the definition for consistency
            props: { ...defaults, ...options },
            id: generateId(type), // Generate ID based on the simple name
            children: [] // Start with empty children array
        };
    }

    /**
     * ➕ Add a single element wrapped in a new section/row/column to the builder
     * NOTE: This is the original function. The AI integration should use addSectionsToBuilder.
     * Kept for backward compatibility or manual use, but logs a warning.
     * @param {Object} element - The element object to wrap and add.
     */
    function addElementToBuilder(element) {
         console.warn("⚠️ addElementToBuilder called. This function wraps a single element. For AI output, use addSectionsToBuilder.");
        if (!vueReady || !rootVueInstance) {
            console.warn("⏳ Vue instance or root instance not ready. Cannot add wrapped element. Retrying in 1s...");
            setTimeout(() => addElementToBuilder(element), 1000);
            return;
        }

        let rootChildren = rootVueInstance._props.node.children;
        if (!Array.isArray(rootChildren)) {
            console.error('Root children array not found or not accessible on the root Vue instance.');
            return;
        }

        // Ensure structure: Section > Row > Column > Element
        // Use createElement to get default props and correct type name
        let newSection = createElement('section');
        let newRow = createElement('row');
        let newColumn = createElement('column');

        if (!newSection || !newRow || !newColumn) {
             console.error("❌ Failed to create wrapper elements (section, row, column) using createElement. Cannot add wrapped element.");
             return;
        }

        // Ensure the element itself has an ID if it doesn't
        ensureIds(element);

        // Add the element to the column's children
        if (!Array.isArray(newColumn.children)) newColumn.children = []; // Ensure children is array
        newColumn.children.push(element);

        // Add the column to the row's children
        if (!Array.isArray(newRow.children)) newRow.children = []; // Ensure children is array
        newRow.children.push(newColumn);

        // Add the row to the section's children
        if (!Array.isArray(newSection.children)) newSection.children = []; // Ensure children is array
        newSection.children.push(newRow);

        // Ensure all new wrapper nodes have IDs
        ensureIds(newSection); // This will recursively add IDs to row and column too

        // Add the new section to the root children
        rootChildren.push(newSection);

        console.log(`✅ Added wrapped element "${element.type}" within a new section/row/column structure to the builder.`, newSection);
    }

    /**
     * ➕ Add one or more pre-built sections to the builder's root children.
     * This is intended for injecting structures like those from AI.
     * @param {Array<Object>|Object} sections - An array of section objects or a single section object.
     */
    function addSectionsToBuilder(sections) {
        if (!vueReady || !rootVueInstance) {
            console.warn("⏳ Vue instance or root instance not ready. Cannot add sections. Retrying in 1s...");
            setTimeout(() => addSectionsToBuilder(sections), 1000);
            return;
        }

        let rootChildren = rootVueInstance._props.node.children;
        if (!Array.isArray(rootChildren)) {
             console.error('Root children array not found or not accessible on the root Vue instance. Cannot add sections.');
             return;
         }

        const sectionsToAdd = Array.isArray(sections) ? sections : [sections]; // Ensure it's an array

        let addedCount = 0;
        sectionsToAdd.forEach(section => {
            // Basic validation: Check if it's an object and looks like a section
            if (typeof section === 'object' && section !== null && section.type && section.type.includes('section')) {
                 // Ensure all nodes within the section have IDs before adding
                 ensureIds(section);
                 rootChildren.push(section);
                 console.log(`✅ Added section "${section.id || 'N/A'}" (type: ${section.type}) to the builder.`, section);
                 addedCount++;
            } else {
                console.warn("⚠️ Attempted to add an invalid item as a section, skipping:", section);
            }
        });

        console.log(`✅ Finished processing ${sectionsToAdd.length} item(s) for adding. Added ${addedCount} section(s).`);
    }


    return {
        loadElementsData,
        createElement, // Keep for potential manual use
        addElementToBuilder, // Keep for potential manual use, but warn
        addSectionsToBuilder, // New method for AI integration
        getElementsData: () => elementsData, // Expose element data for AI_Builder validation
        isVueReady: () => vueReady // Expose readiness state
    };
})();

/** 🚀 Load JSON Data */
// Assuming builder.json is available at the root of your YOOtheme installation
fetch('/builder.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => YooController.loadElementsData(data))
    .catch(error => console.error("❌ Error loading elements JSON:", error));
EOF

echo "YooController.js updated successfully."
