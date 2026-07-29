// js/windows.js

import { generateId, showToast } from './utils.js';

const WINDOWS_CONFIG = {
    about: { title: '📁 about.exe', width: 480, height: 420, module: 'about' },
    projects: { title: '💾 projects.exe', width: 580, height: 460, module: 'projects' },
    skills: { title: '⚡ skills.exe', width: 480, height: 420, module: 'skills' },
    terminal: { title: '⌨️ terminal.exe', width: 580, height: 450, module: 'terminal' },
    assistant: { title: '🤖 assistant.exe', width: 500, height: 500, module: 'assistant' },
    contact: { title: '📧 contact.exe', width: 480, height: 320, module: 'contact' },
    game: { title: '🎮 pet.com', width: 620, height: 620, module: 'game' },
    notes: { title: '📝 notes.exe', width: 520, height: 480, module: 'notes' },
    explorer: { title: '🗂️ explorer.exe', width: 580, height: 450, module: 'explorer' },
    monitor: { title: '📊 sysmon.exe', width: 450, height: 400, module: 'monitor' },
    pomodoro: { title: '🍅 pomodoro.exe', width: 450, height: 420, module: 'pomodoro' },
    calculator: { title: '🧮 calc.exe', width: 360, height: 460, module: 'calculator' },
    player: { title: '🎵 player.exe', width: 420, height: 380, module: 'music' },
    camera: { title: '📸 photobooth.exe', width: 520, height: 520, module: 'camera' },
    calendar: { title: '📅 calendar.exe', width: 550, height: 520, module: 'calendar' }
};

const DESKTOP_ICONS = [
    { id: 'about', icon: '📁', label: 'about.exe' },
    { id: 'projects', icon: '💾', label: 'projects.exe' },
    { id: 'skills', icon: '⚡', label: 'skills.exe' },
    { id: 'terminal', icon: '⌨️', label: 'terminal.exe' },
    { id: 'assistant', icon: '🤖', label: 'assistant.exe' },
    { id: 'contact', icon: '📧', label: 'contact.exe' },
    { id: 'game', icon: '🎮', label: 'pet.com' },
    { id: 'notes', icon: '📝', label: 'notes.exe' },
    { id: 'explorer', icon: '🗂️', label: 'explorer.exe' },
    { id: 'monitor', icon: '📊', label: 'sysmon.exe' },
    { id: 'pomodoro', icon: '🍅', label: 'pomodoro.exe' },
    { id: 'calculator', icon: '🧮', label: 'calc.exe' },
    { id: 'player', icon: '🎵', label: 'player.exe' },
    { id: 'camera', icon: '📸', label: 'photobooth.exe' },
    { id: 'calendar', icon: '📅', label: 'calendar.exe' }
];

let windows = [];
let activeWindow = null;
let windowZIndex = 100;

export function initWindows() {
    renderDesktopIcons();
    renderStartMenu();
    openWindow('about');
}

function renderDesktopIcons() {
    const container = document.getElementById('desktopIcons');
    container.innerHTML = DESKTOP_ICONS.map(icon => `
        <div class="desktop-icon" data-window="${icon.id}">
            <div class="icon">${icon.icon}</div>
            <span>${icon.label}</span>
        </div>
    `).join('');

    container.querySelectorAll('.desktop-icon').forEach(el => {
        el.addEventListener('dblclick', () => openWindow(el.dataset.window));
        el.addEventListener('click', () => {
            container.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            el.classList.add('selected');
        });
    });
}

function renderStartMenu() {
    const container = document.getElementById('startMenuItems');
    container.innerHTML = DESKTOP_ICONS.map(icon => `
        <div class="start-menu-item" data-window="${icon.id}">
            ${icon.icon} ${icon.label}
        </div>
    `).join('');

    container.querySelectorAll('.start-menu-item').forEach(el => {
        el.addEventListener('click', () => {
            openWindow(el.dataset.window);
            document.getElementById('startMenu').classList.remove('show');
        });
    });
}

export function openWindow(id) {
    // Check if already open
    const existing = windows.find(w => w.id === id);
    if (existing) {
        bringToFront(existing.element);
        return existing.element;
    }

    const config = WINDOWS_CONFIG[id];
    if (!config) {
        showToast(`❌ Window "${id}" not found`);
        return null;
    }

    const win = document.createElement('div');
    win.className = 'window';
    win.dataset.windowId = id;
    win.style.width = config.width + 'px';
    win.style.height = config.height + 'px';
    
    // Calculate position with offset
    const offset = windows.length * 25;
    win.style.left = Math.min(60 + offset, window.innerWidth - config.width - 20) + 'px';
    win.style.top = Math.min(40 + offset * 0.6, window.innerHeight - config.height - 60) + 'px';
    win.style.zIndex = ++windowZIndex;

    win.innerHTML = `
        <div class="window-bar">
            <span class="window-title">${config.title}</span>
            <div class="window-controls">
                <span class="window-min">─</span>
                <span class="window-max">□</span>
                <span class="window-close">✕</span>
            </div>
        </div>
        <div class="window-content" id="content-${id}">
            <div class="loading-text">⏳ Loading ${config.title}...</div>
        </div>
    `;

    document.getElementById('windowsContainer').appendChild(win);
    
    const winData = { id, element: win, visible: true };
    windows.push(winData);

    setupWindowControls(win, id);
    addResizeHandles(win);
    makeDraggable(win);
    loadWindowContent(id, win);
    updateTaskbar(id, true);

    // Responsive
    if (window.innerWidth < 768) {
        win.style.left = '5vw';
        win.style.width = '90vw';
    }

    return winData;
}

function setupWindowControls(win, id) {
    const closeBtn = win.querySelector('.window-close');
    const minBtn = win.querySelector('.window-min');
    const maxBtn = win.querySelector('.window-max');

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow(id);
    });
    minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        minimizeWindow(id);
    });
    maxBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMaximize(win);
    });
    win.addEventListener('mousedown', () => bringToFront(win));
}

export function closeWindow(id) {
    const index = windows.findIndex(w => w.id === id);
    if (index === -1) return;
    const win = windows[index].element;
    
    // Cleanup camera if open
    if (id === 'camera') {
        const video = win.querySelector('#cameraVideo');
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
    }
    
    win.remove();
    windows.splice(index, 1);
    updateTaskbar(id, false);
}

export function minimizeWindow(id) {
    const winData = windows.find(w => w.id === id);
    if (!winData) return;
    winData.element.style.display = 'none';
    winData.visible = false;
    updateTaskbar(id, false);
}

function toggleMaximize(win) {
    win.classList.toggle('maximized');
    if (win.classList.contains('maximized')) {
        win.style.position = 'fixed';
        win.style.top = '0';
        win.style.left = '0';
        win.style.width = '100%';
        win.style.height = 'calc(100% - 40px)';
        win.style.borderRadius = '0';
    } else {
        win.style.position = 'absolute';
        const saved = JSON.parse(localStorage.getItem(`window_${win.dataset.windowId}_pos`) || '{}');
        win.style.top = saved.top || '50px';
        win.style.left = saved.left || '50px';
        win.style.width = saved.width || '500px';
        win.style.height = saved.height || '400px';
        win.style.borderRadius = '';
    }
}

function bringToFront(win) {
    windows.forEach(w => w.element.classList.remove('active'));
    win.classList.add('active');
    activeWindow = win;
    win.style.zIndex = ++windowZIndex;
}

function updateTaskbar(id, visible) {
    const container = document.getElementById('taskbarItems');
    if (!container) return;
    let btn = container.querySelector(`[data-window="${id}"]`);

    if (visible && !btn) {
        btn = document.createElement('div');
        btn.className = 'taskbar-btn active';
        btn.dataset.window = id;
        const config = WINDOWS_CONFIG[id];
        btn.textContent = config?.title || id;
        btn.title = config?.title || id;
        btn.addEventListener('click', () => {
            const winData = windows.find(w => w.id === id);
            if (!winData) return;
            if (winData.visible && winData.element.classList.contains('active')) {
                winData.element.style.display = 'none';
                winData.visible = false;
                btn.classList.remove('active');
            } else if (winData.visible) {
                bringToFront(winData.element);
                btn.classList.add('active');
            } else {
                winData.element.style.display = 'block';
                winData.visible = true;
                bringToFront(winData.element);
                btn.classList.add('active');
            }
        });
        container.appendChild(btn);
    } else if (!visible && btn) {
        btn.remove();
    }
}

function addResizeHandles(win) {
    const directions = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];
    directions.forEach(dir => {
        const handle = document.createElement('div');
        handle.className = `window-resize-handle ${dir}`;
        handle.dataset.resize = dir;
        win.appendChild(handle);
    });
}

function makeDraggable(win) {
    const bar = win.querySelector('.window-bar');
    if (!bar) return;
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    bar.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (win.classList.contains('maximized')) return;
        isDragging = true;
        offset.x = e.clientX - win.offsetLeft;
        offset.y = e.clientY - win.offsetTop;
        bringToFront(win);
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const newLeft = Math.max(0, e.clientX - offset.x);
        const newTop = Math.max(0, e.clientY - offset.y);
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            saveWindowState(win);
            isDragging = false;
        }
    });
}

function saveWindowState(win) {
    const id = win.dataset.windowId;
    if (id && !win.classList.contains('maximized')) {
        localStorage.setItem(`window_${id}_pos`, JSON.stringify({
            top: win.offsetTop,
            left: win.offsetLeft,
            width: win.offsetWidth,
            height: win.offsetHeight
        }));
    }
}

function loadWindowContent(id, win) {
    const content = win.querySelector('.window-content');
    if (!content) return;

    const config = WINDOWS_CONFIG[id];
    if (!config) {
        content.innerHTML = `<div class="window-placeholder">
            <h2>❌ Window not found</h2>
            <p>${id} is not configured</p>
        </div>`;
        return;
    }

    // Special case for game - load via iframe
    if (id === 'game') {
        content.innerHTML = `
            <div class="game-window-content" style="padding:0;height:100%;">
                <iframe src="game.html" class="game-iframe-retro" style="width:100%;height:100%;border:none;"></iframe>
            </div>
        `;
        return;
    }

    // Dynamic import for other modules
    const moduleName = config.module || id;
    import(`./${moduleName}.js`)
        .then(module => {
            if (module.render) {
                content.innerHTML = module.render();
                if (module.init) {
                    setTimeout(() => module.init(content), 50);
                }
            }
        })
        .catch(err => {
            console.error(`Failed to load ${id}:`, err);
            content.innerHTML = `<div class="window-placeholder">
                <h2>⚠️ Module not found</h2>
                <p>${id}.js could not be loaded</p>
                <p style="font-size:9px;color:#666;">${err.message}</p>
            </div>`;
        });
}

// Init start menu and theme
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const themeTray = document.getElementById('themeTray');
    const themeMenu = document.getElementById('themeMenu');

    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('show');
            themeMenu?.classList.remove('show');
        });
    }

    if (themeTray) {
        themeTray.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu?.classList.toggle('show');
            startMenu?.classList.remove('show');
        });
    }

    document.addEventListener('click', () => {
        startMenu?.classList.remove('show');
        themeMenu?.classList.remove('show');
    });
});