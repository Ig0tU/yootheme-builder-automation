# YOOtheme Builder Automation with YooController

This guide will walk you through the entire process of setting up and using the YooController script to automate element creation and insertion in the YOOtheme Builder for Joomla. The instructions are clear and straightforward, designed to save you time and effort.

---

## What You Will Achieve

- Load the `builder.json` file into your Joomla site.
- Add the YooController JavaScript to your YOOtheme Builder admin panel.
- Use YooController to create and insert elements or sections automatically.
- Understand where to place files and how to trigger the script.

---

## Step 1: Prepare the `builder.json` File

1. **Export or obtain your `builder.json` file** from YOOtheme Builder. This file contains all the element definitions needed by YooController.

2. **Upload `builder.json` to your Joomla site root directory** (the public root folder where your site is hosted).

   - The file should be accessible via:  
     `https://yourdomain.com/builder.json`

3. **Verify the file is accessible** by visiting the URL in your browser. You should see the JSON content.

---

## Step 2: Create the YooController JavaScript File

1. Copy the complete YooController JavaScript code (provided separately or from the previous instructions).

2. Save it as a file named, for example:  
   `/media/yootheme/yoo-controller.js`

3. Upload this file to your Joomla site under the `/media/yootheme/` folder.  
   - If the folder does not exist, create it.

---

## Step 3: Load YooController in YOOtheme Builder Admin Panel

1. Log in to your Joomla Administrator panel.

2. Navigate to:  
   `YOOtheme Pro` → `Settings` → `Custom Code`

3. In the **Custom JavaScript** section, add the following line to load your YooController script:

   ```html
   <script src="/media/yootheme/yoo-controller.js"></script>
   ```

4. Save the settings.

---

## Step 4: Verify Setup and Use YooController

1. Open the **YOOtheme Builder editor** in Joomla (where you build your pages).

2. Open your browser's **Developer Console** (usually F12 or right-click → Inspect → Console).

3. You should see logs like:  
   `✅ YOOtheme builder app detected and ready:`  
   `✅ Loaded & restructured builder elements:`

4. Now you can run YooController commands in the console or add your own scripts to create and insert elements.

---

## Step 5: Example Usage

Here is a simple example you can run in the browser console to add an image element automatically:

```javascript
const waitForReady = setInterval(() => {
    if (YooController.isVueReady()) {
        clearInterval(waitForReady);
        console.log("🎯 Builder is ready!");

        const img = YooController.createElement('image', {
            image: {
                src: 'https://via.placeholder.com/400x300',
                alt: 'Auto Inserted Image'
            }
        });

        YooController.addElementToBuilder(img);
    }
}, 1000);
```

---

## Optional: Load YooController Only in Builder Admin

If you want to be extra clean, you can conditionally load the script only in the builder admin page by wrapping the script tag in PHP:

```php
<?php if (app()->request->get('option') == 'com_yootheme' && app()->request->get('view') == 'builder') : ?>
<script src="/media/yootheme/yoo-controller.js"></script>
<?php endif; ?>
```

---

## Troubleshooting

- **`builder.json` not found or not loading?**  
  Make sure the file is uploaded to the correct location and accessible via URL.

- **YooController not ready?**  
  Wait a few seconds for the builder app to initialize. Check console for errors.

- **Elements not inserting?**  
  Verify the element types exist in your `builder.json`. Use `YooController.getElementsData()` in console to inspect.

---

## Summary Checklist

- [x] Upload `builder.json` to Joomla root.
- [x] Upload `yoo-controller.js` to `/media/yootheme/`.
- [x] Add script tag in YOOtheme Pro Custom Code.
- [x] Open YOOtheme Builder and verify console logs.
- [x] Use YooController API to create and add elements.

---

## Final Notes

This setup allows you to automate page building, insert templates, and bulk add UI components in YOOtheme Builder with ease. Use the provided API methods to customize your workflow.

If you want more advanced usage or help, feel free to ask!

---

Thank you for your time and trust. This guide respects your time and aims to get you productive quickly.
