// js/projects.js

import { showToast } from './utils.js';

const PROJECTS = [
    {
        id: 'safe-place',
        icon: '🧠',
        name: 'Safe Place — Emotion-Aware AI Web App',
        year: '2025–2026',
        type: 'AI / Full Stack',
        desc: 'Multimodal emotion-aware AI web app. Analyzes text + voice to understand emotional state. Full-stack with Google Gemini API, 18 REST endpoints, JWT auth. +17% accuracy vs text-only. Zero false positives on 4 critical cases. 2 published papers.',
        tags: ['Python', 'Flask', 'Google Gemini API', 'NLP', 'Emotion Recognition', 'JWT'],
        github: 'https://github.com/Kateryna-Havryliuk',
        demo: null,
        featured: true
    },
    {
        id: 'korstudy',
        icon: '🇰🇷',
        name: 'KORstudy — Korean Learning Platform',
        year: '2024–Present',
        type: 'UX Writing · SEO · Frontend',
        desc: 'Ukrainian-language Korean-learning platform: courses, lessons, Hangul guide, blog, news. Wrote 100% of interface copy. Ran full technical SEO audit (Screaming Frog, Schema.org, JSON-LD, sitemap). GA4 + Consent Mode v2 + GDPR-compliant.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO', 'Screaming Frog', 'GA4', 'GDPR'],
        github: 'https://github.com/Kateryna-Havryliuk',
        demo: 'https://easy-korean-learning.netlify.app/',
        featured: true
    },
    {
        id: 'portfolio-os',
        icon: '🖥️',
        name: 'Portfolio OS — Retro OS Portfolio',
        year: '2025–2026',
        type: 'Portfolio / Interactive',
        desc: 'Interactive portfolio built as a retro operating system. Draggable windows, functional terminal, AI assistant, and 12+ mini-apps (calculator, calendar, camera, pomodoro, music player). Vanilla JS, ES modules, no frameworks.',
        tags: ['JavaScript', 'CSS3', 'HTML5', 'ES Modules', 'Responsive'],
        github: 'https://github.com/Kateryna-Havryliuk',
        demo: 'https://kateryna-havryliuk.github.io/portfolio-os',
        featured: true
    },
    {
        id: 'pixel-pet',
        icon: '🎮',
        name: 'Pixel Pet — Virtual Companion',
        year: '2024',
        type: 'Interactive Game',
        desc: 'Tamagotchi-style virtual pet game with three pet types (bunny, cat, bear), need system, food selection, day/night mode, animations, and bilingual UI (EN/UA). Embedded as iframe inside Portfolio OS.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'i18n', 'Animation'],
        github: 'https://github.com/Kateryna-Havryliuk',
        demo: null,
        featured: true
    },
    {
        id: '3d-warehouse',
        icon: '📦',
        name: '3D Warehouse Visualization System',
        year: '2026',
        type: 'Technical Documentation',
        desc: '3D warehouse visualization system integrated with 1C and Excel for inventory management. Wrote technical documentation and user guides for non-technical warehouse staff. Tool adopted for daily use.',
        tags: ['Technical Writing', '3D', '1C', 'Excel', 'Documentation'],
        github: null,
        demo: null,
        featured: true
    },
    {
        id: 'bank-budget',
        icon: '📊',
        name: 'Bank Budget Plan 2026',
        year: '2026',
        type: 'Analytical Writing',
        desc: 'Full bank budget model covering income, expenses, inventory, and supply chain. Applied optimization methods. Turned complex financial data into a clear document for non-specialists. Approved with distinction.',
        tags: ['Analytical Writing', 'Excel', 'Optimization', 'Data Analysis'],
        github: null,
        demo: null,
        featured: false
    }
];

export function render() {
    return `
        <div class="projects-content">
            <div class="projects-header">
                <div class="projects-title">
                    <h2>💾 Projects</h2>
                    <p>${PROJECTS.length} projects — ${PROJECTS.filter(p => p.featured).length} featured</p>
                </div>
                <div class="projects-filter">
                    <button class="filter-btn active" data-filter="all">📋 All</button>
                    <button class="filter-btn" data-filter="featured">⭐ Featured</button>
                    <button class="filter-btn" data-filter="AI">🧠 AI</button>
                    <button class="filter-btn" data-filter="SEO">🔍 SEO</button>
                    <button class="filter-btn" data-filter="Writing">✍️ Writing</button>
                    <button class="filter-btn" data-filter="Web">🌐 Web</button>
                </div>
            </div>
            <div class="projects-grid" id="projectsGrid">
                ${renderProjects('all')}
            </div>
            <div class="projects-footer">
                <span>🔗 All projects on <a href="https://github.com/Kateryna-Havryliuk" target="_blank">GitHub</a></span>
            </div>
        </div>
    `;
}

function renderProjects(filter) {
    let filtered = PROJECTS;
    
    if (filter === 'featured') {
        filtered = PROJECTS.filter(p => p.featured);
    } else if (filter !== 'all') {
        const filterMap = {
            'AI': ['AI', 'NLP', 'Emotion Recognition'],
            'SEO': ['SEO', 'Screaming Frog', 'GA4'],
            'Writing': ['Technical Writing', 'Analytical Writing', 'UX Writing'],
            'Web': ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
        };
        const keywords = filterMap[filter] || [filter];
        filtered = PROJECTS.filter(p => p.tags.some(tag => keywords.some(k => tag.includes(k))));
    }
    
    if (filtered.length === 0) {
        return `<div class="projects-empty">No projects found for this filter</div>`;
    }

    return filtered.map(p => `
        <div class="project-card" data-project="${p.id}">
            <div class="project-card-icon">${p.icon}</div>
            <div class="project-card-content">
                <div class="project-card-header">
                    <h3>${p.name}</h3>
                    ${p.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
                </div>
                <div class="project-card-meta">
                    <span>${p.year}</span>
                    <span>${p.type}</span>
                </div>
                <p class="project-card-desc">${p.desc}</p>
                <div class="project-card-tags">
                    ${p.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-card-links">
                    ${p.github ? `<a href="${p.github}" target="_blank" class="project-link">📂 GitHub</a>` : ''}
                    ${p.demo ? `<a href="${p.demo}" target="_blank" class="project-link">🚀 Demo</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

export function init(container) {
    const grid = container.querySelector('#projectsGrid');
    const buttons = container.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            grid.innerHTML = renderProjects(filter);
            
            grid.querySelectorAll('.project-card').forEach((card, i) => {
                card.style.animationDelay = (i * 0.1) + 's';
                card.classList.add('fade-in');
            });
        });
    });
}
