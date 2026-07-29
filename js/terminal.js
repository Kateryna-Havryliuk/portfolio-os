// js/terminal.js

import { showToast, escapeHtml } from './utils.js';
import { openWindow } from './windows.js';

const COMMANDS = {
    help: () => `
Available commands:
  whoami      - About Kateryna
  education   - Education info
  experience  - Work experience
  projects    - List projects
  skills      - Technical skills
  contact     - Contact information
  publications- Show publications & conferences
  papers      - Same as publications
  github      - GitHub link
  linkedin    - LinkedIn link
  open [win]  - Open a window (about, work, skills, terminal, assistant, contact, game)
  theme [name]- Change theme (classic, matrix, dark, willow)
  matrix      - Matrix rain effect
  clear       - Clear terminal
  echo [text] - Print text
  date        - Current date/time
  uptime      - System uptime
  joke        - Tell a joke
  `,

    whoami: () => 'Kateryna Havryliuk — Computer Science graduate, Python & AI Developer. GPA: 4.87/5.0.',
    
    education: () => `
🎓 Education:
  Lesya Ukrainka Volyn National University
  Bachelor's Degree in Computer Science & Information Technology
  GPA: 4.87/5.0
  Graduated: 2026
  `,

    experience: () => `
💼 Experience:
  Freelance Developer (2023–Present)
    - Web development, AI integration, Python automation
  Research Assistant (2024–Present)
    - AI/ML research, data analysis, publication co-author
  Conference Participant & Author (2024–2026)
    - Academic conferences, peer-reviewed publications
  `,

    projects: () => `
💾 Projects:
  Safe Place          - AI emotional support web app (Python, Flask, NLP)
  Bank Budget         - Financial planning & analysis (Excel, Optimization)
  KORstudy            - Korean language learning platform (HTML, CSS, JS, PHP)
  ToDo List           - Task management tool (JS, Local Storage)
  `,

    skills: () => `
⚡ Skills:
  Python     ██████████ 90%
  SQL        ████████░░ 80%
  Flask      ███████░░░ 75%
  FastAPI    ██████░░░░ 70%
  JavaScript ██████░░░░ 65%
  React      █████░░░░░ 55%
  Git        ████████░░ 85%
  OpenAI API ███████░░░ 75%
  Scala      ███░░░░░░░ 35%
  Prolog     ███░░░░░░░ 30%
  `,

    publications: () => `
📄 Publications & Conferences:
  Academic Conference Participant (2024–2026)
  Author of Peer-Reviewed Publications (2025)
  Research in data analysis and machine learning
  `,

    papers: () => COMMANDS.publications(),

    contact: () => '📧 Email: katyagko2004@gmail.com\n🔗 GitHub: github.com/Kateryna-Havryliuk\n🔗 LinkedIn: linkedin.com/in/kateryna-havryliuk',

    github: () => '🔗 github.com/Kateryna-Havryliuk',

    linkedin: () => '🔗 linkedin.com/in/kateryna-havryliuk',

    date: () => new Date().toLocaleString('uk-UA'),

    uptime: () => {
        const diff = Math.floor((window._bootTime ? Date.now() - window._bootTime : 0) / 1000);
        return `Uptime: ${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m ${diff % 60}s`;
    },

    joke: () => {
        const jokes = [
            'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
            'What is a programmer\'s favorite place? The cloud ☁️',
            'Why did the developer go broke? Because he used up all his cache 💸',
            'What do you call a snake that codes? A Python 🐍',
            'Why do programmers hate nature? Too many bugs! 🌿'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    },

    echo: (args) => args.join(' ') || '',

    open: (args) => {
        if (args[0]) {
            openWindow(args[0]);
            return `Opening ${args[0]}...`;
        }
        return 'Usage: open [window]  (about, work, skills, terminal, assistant, contact, game, notes, explorer)';
    },

    theme: (args) => {
        const themes = ['classic', 'matrix', 'dark', 'willow'];
        if (args[0] && themes.includes(args[0])) {
            document.body.setAttribute('data-system-theme', args[0]);
            localStorage.setItem('systemTheme', args[0]);
            return `Theme changed to: ${args[0]}`;
        }
        return `Themes: ${themes.join(', ')}`;
    },

    matrix: () => {
        startMatrixEffect();
        return '🌌 Matrix mode activated!';
    },

    clear: () => ''
};

// (Matrix effect function remains unchanged)
function startMatrixEffect() {
    if (window._matrixActive) return;
    window._matrixActive = true;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;opacity:0.85;pointer-events:none';
    document.body.appendChild(overlay);

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:10000;pointer-events:none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const drops = [];
    const cols = Math.floor(canvas.width / 14);

    for (let i = 0; i < cols; i++) drops[i] = Math.random() * -100;

    let frame = 0;
    const draw = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = '14px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 14, drops[i] * 14);
            if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }

        frame++;
        if (frame < 120) requestAnimationFrame(draw);
        else {
            clearInterval();
            overlay.remove();
            canvas.remove();
            window._matrixActive = false;
        }
    };

    draw();
}

export function render() {
    return `
        <div class="terminal-window-retro" id="terminalOutput">
            <div class="term-line">┌─────────────────────────────────────────┐</div>
            <div class="term-line">│  KATERINA OS/CS v2.0                    │</div>
            <div class="term-line">│  Type 'help' for available commands     │</div>
            <div class="term-line">└─────────────────────────────────────────┘</div>
            <div id="terminalMessages"></div>
        </div>
        <div class="terminal-input-line-retro">
            <span class="term-prompt">C:\\Users\\kateryna&gt;</span>
            <input type="text" id="terminalInput" autocomplete="off">
            <span class="cursor-block">█</span>
        </div>
    `;
}

export function init(container) {
    const input = container.querySelector('#terminalInput');
    const messages = container.querySelector('#terminalMessages');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if (val) {
                addLine(`C:\\Users\\kateryna&gt; ${escapeHtml(val)}`, 'cmd');
                processCommand(val, messages);
                input.value = '';
                messages.scrollTop = messages.scrollHeight;
            }
        }
    });

    container.addEventListener('click', () => input.focus());

    function addLine(text, type) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = `<span class="${type}">${text}</span>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function processCommand(cmd, msgContainer) {
        const [command, ...args] = cmd.split(' ');
        const lowerCmd = command.toLowerCase();

        if (COMMANDS[lowerCmd]) {
            const result = COMMANDS[lowerCmd](args);
            if (result) {
                const lines = result.split('\n');
                lines.forEach(line => {
                    if (line.trim()) {
                        const div = document.createElement('div');
                        div.className = 'term-line';
                        div.innerHTML = `<span class="output">${escapeHtml(line)}</span>`;
                        msgContainer.appendChild(div);
                    }
                });
            }
            if (lowerCmd === 'clear') {
                msgContainer.innerHTML = '';
            }
        } else {
            addLine(`❌ '${command}' not recognized. Type 'help'`, 'output');
        }
    }

    setTimeout(() => input.focus(), 300);
}