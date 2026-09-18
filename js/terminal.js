// js/terminal.js

import { showToast, escapeHtml } from './utils.js';
import { openWindow } from './windows.js';

const COMMANDS = {
    help: () => `
Available commands:
  whoami        - About Kateryna
  education     - Education info
  experience    - Work & projects
  projects      - List all projects
  skills        - Technical skills (with bars)
  seo           - SEO & tools
  publications  - Publications & conferences
  contact       - Contact information
  github        - GitHub link
  linkedin      - LinkedIn link
  korstudy      - KORstudy info
  safeplace     - Safe Place info
  open [win]    - Open a window
  theme [name]  - Change theme (classic, matrix, dark, willow)
  matrix        - Matrix rain effect
  clear         - Clear terminal
  echo [text]   - Print text
  date          - Current date/time
  uptime        - System uptime
  joke          - Tell a joke
  `,

    whoami: () => 'Kateryna Havryliuk — UX Writer & AI Product Writer. Honors CS graduate (GPA 4.87/5.0). Creator of Safe Place & KORstudy. GCI World — University of Tokyo.',

    education: () => `
🎓 Education:
  Lesya Ukrainka Volyn National University
  B.Sc. in Computer Science & Information Technology
  GPA: 4.87/5.0 · Diploma with Distinction
  🏆 1st Place — University Scientific Research Competition (2026)
  `,

    experience: () => `
💼 Experience:
  Founder & UX Writer — KORstudy (2024–Present)
    → Ukrainian Korean-learning platform, SEO, GDPR
  AI Product Writer & Developer — Safe Place (2025–2026)
    → Emotion-aware AI, Flask + Gemini API, NLP
  Technical Writer — Manufacturing Co. (2026)
    → 3D warehouse docs for non-technical staff
  `,

    projects: () => `
💾 Projects:
  🧠 Safe Place          — Emotion-aware AI web app (2025–2026)
  🇰🇷 KORstudy           — Korean learning platform (2024–Present)
  🖥️ Portfolio OS        — Retro OS portfolio (2025–2026)
  🎮 Pixel Pet           — Virtual pet game (2024)
  📦 3D Warehouse        — Documentation (2026)
  📊 Bank Budget 2026    — Analytical writing (2026)
  `,

    skills: () => `
⚡ Skills (top):
  UX Writing             ██████████ 90%
  Copywriting            █████████░ 88%
  HTML5/CSS3             █████████░ 88%
  Python                 ████████░░ 85%
  System Prompt Design   ████████░░ 85%
  Prompt Engineering     ████████░░ 85%
  JavaScript             ███████░░░ 75%
  On-Page SEO            ████████░░ 80%
  Screaming Frog         ███████░░░ 78%
  Schema.org / JSON-LD   ████████░░ 80%
  NLP                    ███████░░░ 72%
  Emotion Recognition    ███████░░░ 78%

  Type 'skills' in Skills window for the full list.
  `,

    seo: () => `
🔍 SEO & Analytics:
  On-Page SEO · Screaming Frog · Google Search Console
  Schema.org · JSON-LD · Open Graph · Twitter Cards
  sitemap.xml · robots.txt · canonical URLs
  Google Analytics 4 · Consent Mode v2 · GDPR
  CookieYes (consent banner)

  Full case: KORstudy — 'korstudy' command.
  `,

    publications: () => `
📄 Publications & Conferences:
  1. Interpreted Rule-Based Multimodal Fusion for Emotion Recognition
     III International Conference, 2026 — Oral presentation
  2. Safe Place: Generative AI for Mental Health
     XI Interuniversity Seminar, 2026 — Oral presentation
  3. Analysis of Dark Mode & Brutalism Aesthetics Impact
     III International Conference, 2026
  4. Cyber Hackathons in Education
     II International Conference, 2025
  `,

    contact: () => '📧 katyagko2004@gmail.com\n🔗 github.com/Kateryna-Havryliuk\n🔗 linkedin.com/in/kateryna-havryliuk\n🌐 easy-korean-learning.netlify.app',

    github: () => '🔗 github.com/Kateryna-Havryliuk',

    linkedin: () => '🔗 linkedin.com/in/kateryna-havryliuk',

    korstudy: () => `
🇰🇷 KORstudy:
  Ukrainian-language Korean-learning platform
  Live: https://easy-korean-learning.netlify.app/
  Since: 2024
  Stack: HTML5, CSS3, Vanilla JS, Bootstrap 5.3
  SEO: Screaming Frog, Schema.org, JSON-LD, GA4, GDPR
  `,

    safeplace: () => `
🧠 Safe Place:
  Emotion-aware AI web app (2025–2026)
  Stack: Flask, Google Gemini API, 18 REST endpoints, JWT auth
  Multimodal emotion recognition (text + voice)
  +17% accuracy vs text-only · 2 published papers
  `,

    date: () => new Date().toLocaleString('uk-UA'),

    uptime: () => {
        const diff = Math.floor((window._bootTime ? Date.now() - window._bootTime : 0) / 1000);
        return `Uptime: ${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m ${diff % 60}s`;
    },

    joke: () => {
        const jokes = [
            'Why do UX writers hate dark mode? Because users keep asking "where is the button?" 🌙',
            'What did the SEO specialist say at the party? "I crawled here." 🕷️',
            'How many prompt engineers does it take to change a light bulb? Just one — but first let me add the right context. 💡',
            'Why did the copywriter bring a ladder? To reach the higher engagement. 📈',
            'What is a code reviewer\'s favorite drink? Commit-tea. ☕'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    },

    echo: (args) => args.join(' ') || '',

    open: (args) => {
        if (args[0]) {
            openWindow(args[0]);
            return `Opening ${args[0]}...`;
        }
        return 'Usage: open [window]  (about, projects, skills, terminal, assistant, contact, game, notes, explorer, calendar, calculator)';
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
            <div class="term-line">│  KATERYNA OS/CS v2.0                    │</div>
            <div class="term-line">│  UX Writer · AI Product Writer · SEO    │</div>
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
