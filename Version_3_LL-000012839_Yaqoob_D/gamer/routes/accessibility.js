// Function to load and apply accessibility settings from localStorage
function loadAccessibilitySettings() {
    try {
        console.log("Loading accessibility settings");
        
        // Check for saved settings
        const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
        console.log("Found settings:", savedSettings);
        
        // Apply saved settings
        if (savedSettings.darkMode) {
            document.body.classList.add('dark-mode');
            console.log("Applied dark mode");
        }
        
        if (savedSettings.highContrast) {
            document.body.classList.add('high-contrast');
            console.log("Applied high contrast");
        }
        
        if (savedSettings.largeText) {
            document.body.classList.add('large-text');
            console.log("Applied large text");
        }
        
        if (savedSettings.dyslexicFont) {
            document.body.classList.add('dyslexic-font');
            console.log("Applied dyslexic font");
        }
        
        if (savedSettings.reduceMotion) {
            document.body.classList.add('reduced-motion');
            console.log("Applied reduced motion");
        }
        
        if (savedSettings.pauseAnimations) {
            // Implementation for pausing animations would go here
            console.log("Applied pause animations");
        }
        
        if (savedSettings.keyboardFocus) {
            // Implementation for enhanced keyboard focus would go here
            console.log("Applied keyboard focus");
        }
        
        if (savedSettings.extendedTime) {
            // Implementation for extended time interactions would go here
            console.log("Applied extended time");
        }
    } catch (error) {
        console.error("Error loading accessibility settings:", error);
    }
}

// Make sure the function runs after the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAccessibilitySettings);
} else {
    // DOM already loaded, run the function
    loadAccessibilitySettings();
}

// Also make the function available globally
window.loadAccessibilitySettings = loadAccessibilitySettings;