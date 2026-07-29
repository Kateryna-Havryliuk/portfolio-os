// js/pomodoro.js

import { showToast, storageGet, storageSet } from './utils.js';

let time = 25 * 60;
let mode = 'pomodoro';
let running = false;
let interval = null;
let count = 0;

const MODES = {
    pomodoro: { label: '🍅 Pomodoro', time: 25 * 60 },
    short: { label: '☕ Short Break', time: 5 * 60 },
    long: { label: '🌿 Long Break', time: 15 * 60 }
};

export function render() {
    count = storageGet('pomodoroCount', 0);
    
    return `
        <div class="pomodoro-content">
            <div class="pomodoro-mode">
                ${Object.entries(MODES).map(([key, m]) => `
                    <button class="pomo-mode ${key === mode ? 'active' : ''}" data-mode="${key}">
                        ${m.label}
                    </button>
                `).join('')}
            </div>
            <div class="pomodoro-timer" id="pomodoroTimer">${formatTime(time)}</div>
            <div class="pomodoro-controls">
                <button class="pomo-btn" id="pomoStart">▶ Start</button>
                <button class="pomo-btn" id="pomoPause">⏸ Pause</button>
                <button class="pomo-btn" id="pomoReset">🔄 Reset</button>
                <button class="pomo-btn" id="pomoSkip">⏭ Skip</button>
            </div>
            <div class="pomodoro-session">
                Session: <span id="pomoCount">${count}</span> pomodoros completed
            </div>
            <div class="pomodoro-stats">
                <div class="pomo-stat">
                    <span>📊 Today</span>
                    <strong id="pomoToday">${count}</strong>
                </div>
                <div class="pomo-stat">
                    <span>⏱️ Focus time</span>
                    <strong id="pomoFocusTime">${formatTime(count * 25 * 60)}</strong>
                </div>
            </div>
        </div>
    `;
}

export function init(container) {
    const timerEl = container.querySelector('#pomodoroTimer');
    const countEl = container.querySelector('#pomoCount');
    const startBtn = container.querySelector('#pomoStart');
    const pauseBtn = container.querySelector('#pomoPause');
    const resetBtn = container.querySelector('#pomoReset');
    const skipBtn = container.querySelector('#pomoSkip');
    const modeBtns = container.querySelectorAll('.pomo-mode');

    function updateDisplay() {
        timerEl.textContent = formatTime(time);
        countEl.textContent = count;
        document.getElementById('pomoToday').textContent = count;
        document.getElementById('pomoFocusTime').textContent = formatTime(count * 25 * 60);
    }

    function getModeTime() {
        return MODES[mode].time;
    }

    function startTimer() {
        if (running) return;
        if (time === 0) {
            time = getModeTime();
        }
        running = true;
        startBtn.textContent = '⏳ Running';
        startBtn.disabled = true;
        
        interval = setInterval(() => {
            time--;
            updateDisplay();

            if (time === 0) {
                clearInterval(interval);
                interval = null;
                running = false;
                startBtn.textContent = '▶ Start';
                startBtn.disabled = false;
                
                if (mode === 'pomodoro') {
                    count++;
                    storageSet('pomodoroCount', count);
                    showToast('🍅 Time is up! Take a break! 🎉');
                } else {
                    showToast('☕ Break is over! Back to work! 💪');
                }
                
                // Play sound effect (visual feedback)
                timerEl.style.animation = 'pulse 0.5s ease 3';
                setTimeout(() => timerEl.style.animation = '', 1500);
                
                updateDisplay();
            }
        }, 1000);
    }

    function pauseTimer() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            running = false;
            startBtn.textContent = '▶ Start';
            startBtn.disabled = false;
            showToast('⏸ Paused at ' + formatTime(time));
        }
    }

    function resetTimer() {
        pauseTimer();
        time = getModeTime();
        updateDisplay();
        startBtn.textContent = '▶ Start';
        startBtn.disabled = false;
        timerEl.style.animation = '';
        showToast('🔄 Reset to ' + formatTime(time));
    }

    function skipTimer() {
        if (running) {
            pauseTimer();
        }
        time = 0;
        updateDisplay();
        
        if (mode === 'pomodoro') {
            count++;
            storageSet('pomodoroCount', count);
            showToast('⏭ Skipped! +1 pomodoro');
        } else {
            showToast('⏭ Skipped break');
        }
        updateDisplay();
        startBtn.textContent = '▶ Start';
        startBtn.disabled = false;
    }

    function changeMode(newMode) {
        if (running) pauseTimer();
        mode = newMode;
        time = getModeTime();
        updateDisplay();
        modeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
        startBtn.textContent = '▶ Start';
        startBtn.disabled = false;
        timerEl.style.animation = '';
        showToast('📋 Mode: ' + MODES[mode].label);
    }

    // Events
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    skipBtn.addEventListener('click', skipTimer);

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => changeMode(btn.dataset.mode));
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            if (running) pauseTimer();
            else startTimer();
        }
        if (e.key === 'r' || e.key === 'R') resetTimer();
    });

    // Initial display
    updateDisplay();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}