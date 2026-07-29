// js/projects.js

import { showToast } from './utils.js';

const PROJECTS = [
    {
        id: 'safe-place',
        icon: '🧠',
        name: 'Safe Place — AI Emotional Companion',
        year: '2024',
        type: 'AI / Full Stack',
        desc: 'Web application for emotional support using generative AI with a 3D avatar interface. Provides personalized conversations and mood tracking.',
        tags: ['Python', 'OpenAI API', 'Three.js', 'Flask', 'JavaScript'],
        github: 'https://github.com/kateryna-havryliuk/safe-place',
        demo: 'https://safe-place-demo.vercel.app',
        featured: true
    },
    {
        id: '3d-warehouse',
        icon: '📦',
        name: '3D Warehouse Visualizer',
        year: '2024',
        type: '3D / C#',
        desc: 'Interactive 3D warehouse navigation system with real-time search, inventory management, and spatial data visualization.',
        tags: ['C#/.NET', 'Three.js', 'SQL', 'Excel API', 'WebGL'],
        github: 'https://github.com/kateryna-havryliuk/3d-warehouse',
        demo: 'https://3d-warehouse-demo.vercel.app',
        featured: true
    },
    {
        id: 'bank-budget',
        icon: '📊',
        name: 'Bank Budget Planning & System Analysis',
        year: '2025',
        type: 'Data Analysis',
        desc: 'Developed a comprehensive bank budget covering income, expenses, inventory, and supply chain. Applied optimization methods and presented to industry experts. Approved with distinction.',
        tags: ['Excel', 'Power BI', 'Data Analysis', 'Optimization'],
        github: null,
        demo: null,
        featured: true
    },
    {
        id: 'pixel-pet',
        icon: '🎮',
        name: 'Pixel Pet — Virtual Companion',
        year: '2024',
        type: 'Interactive Game',
        desc: 'Tamagotchi-style virtual pet with needs system, multiple pet types, feeding mechanics, and playful interactions.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
        github: 'https://github.com/kateryna-havryliuk/pixel-pet',
        demo: 'https://pixel-pet-demo.vercel.app',
        featured: true
    },
    {
        id: 'korstudy',
        icon: '🇰🇷',
        name: 'KORstudy — Korean Language Learning Platform',
        year: '2024',
        type: 'Web Development',
        desc: 'Educational website with structured Korean language courses, pricing plans, and interactive user features. Full front-end with basic back-end integration.',
        tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        github: 'https://github.com/kateryna-havryliuk/korstudy',
        demo: 'https://korstudy-demo.vercel.app',
        featured: false
    },
    {
        id: 'todo-list',
        icon: '📋',
        name: 'ToDo List Web App',
        year: '2023',
        type: 'Web Application',
        desc: 'Task management tool with persistent local storage, allowing users to add, complete, and delete tasks with data persistence across sessions.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
        github: 'https://github.com/kateryna-havryliuk/todo-list',
        demo: null,
        featured: false
    },
    {
        id: 'portfolio-os',
        icon: '🖥️',
        name: 'Portfolio OS — Retro Operating System',
        year: '2025',
        type: 'Portfolio / Interactive',
        desc: 'Complete interactive portfolio designed as a retro operating system with windows, terminal, AI assistant, and full applications suite.',
        tags: ['JavaScript', 'CSS3', 'HTML5', 'OpenAI API', 'Responsive'],
        github: 'https://github.com/kateryna-havryliuk/portfolio-os',
        demo: 'https://kateryna-havryliuk.github.io/portfolio-os',
        featured: true
    },
    {
        id: 'emotion-recognition',
        icon: '😊',
        name: 'Emotion Recognition System',
        year: '2024',
        type: 'AI / Research',
        desc: 'Research project on emotion recognition from text using NLP techniques. Includes sentiment analysis and emotion classification.',
        tags: ['Python', 'NLP', 'Transformers', 'PyTorch', 'Jupyter'],
        github: 'https://github.com/kateryna-havryliuk/emotion-recognition',
        demo: null,
        featured: false
    },
    {
        id: 'creative-experiments',
        icon: '✨',
        name: 'Creative Experiments',
        year: '2024-25',
        type: 'Research / Art',
        desc: 'Collection of mini-projects: generative art, language tools, interactive visualizations, and experimental interfaces.',
        tags: ['React', 'Canvas API', 'Node.js', 'REST', 'WebGL'],
        github: 'https://github.com/kateryna-havryliuk/creative-experiments',
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
                    <button class="filter-btn" data-filter="Data">📊 Data</button>
                    <button class="filter-btn" data-filter="Web">🌐 Web</button>
                </div>
            </div>
            <div class="projects-grid" id="projectsGrid">
                ${renderProjects('all')}
            </div>
            <div class="projects-footer">
                <span>🔗 All projects on <a href="https://github.com/kateryna-havryliuk" target="_blank">GitHub</a></span>
            </div>
        </div>
    `;
}

function renderProjects(filter) {
    let filtered = PROJECTS;
    
    if (filter === 'featured') {
        filtered = PROJECTS.filter(p => p.featured);
    } else if (filter !== 'all') {
        filtered = PROJECTS.filter(p => p.tags.some(tag => tag.includes(filter) || tag === filter));
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
            
            // Add animation
            grid.querySelectorAll('.project-card').forEach((card, i) => {
                card.style.animationDelay = (i * 0.1) + 's';
                card.classList.add('fade-in');
            });
        });
    });
}