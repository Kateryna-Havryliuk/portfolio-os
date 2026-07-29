// js/main.js

import { bootSystem, initUptime } from './boot.js';
import { initWindows } from './windows.js';
import { initClock } from './clock.js';
import { initTheme } from './theme.js';
import { initQualityAndFontControls } from './controls.js';
import { initClipboard, showToast } from './utils.js';

// Store boot time
window._bootTime = Date.now();

// Start the system
async function main() {
    console.log('🖥️ Portfolio OS v2.0 booting...');
    
    // Boot sequence
    await bootSystem();
    
    // Init subsystems
    initUptime();
    initWindows();
    initClock();
    initTheme();
    initQualityAndFontControls();
    initClipboard();
    
    console.log('✅ Portfolio OS v2.0 ready!');
    showToast('🖥️ Welcome to Portfolio OS!');
}

// Start everything
main();

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust windows if needed
});

// Prevent context menu on desktop
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.desktop') || e.target.closest('.desktop-icons')) {
        e.preventDefault();
    }
});