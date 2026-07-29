import { storageGet, storageSet } from './utils.js';

export function bootSystem() {
    return new Promise((resolve) => {
        const bootScreen = document.getElementById('bootScreen');
        const progressBar = document.getElementById('bootProgress');
        const bootText = document.getElementById('bootText');
        
        const messages = [
            'Initializing kernel...',
            'Loading system files...',
            'Checking hardware...',
            'Mounting drives...',
            'Starting GUI...',
            'Loading user profile...',
            'Welcome, Kateryna!'
        ];
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 6 + 2;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            bootText.textContent = messages[Math.floor(progress / 15)] || 'Almost ready...';
            
            if (progress >= 100) {
                clearInterval(interval);
                bootScreen.classList.add('hide');
                setTimeout(() => bootScreen.remove(), 500);
                resolve();
            }
        }, 80);
    });
}

export function initUptime() {
    const bootTime = new Date();
    const uptimeEl = document.getElementById('systemUptime');
    if (!uptimeEl) return;
    
    setInterval(() => {
        const diff = Math.floor((new Date() - bootTime) / 1000);
        uptimeEl.textContent = `Uptime: ${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`;
    }, 60000);
}