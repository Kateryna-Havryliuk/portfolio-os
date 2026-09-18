// js/skills.js

const SKILLS = {
    // Writing
    'UX Writing': 90,
    'Copywriting': 88,
    'Technical Documentation': 85,
    'Content Strategy': 82,
    'System Prompt Design': 85,
    
    // SEO
    'On-Page SEO': 80,
    'Screaming Frog': 78,
    'Schema.org / JSON-LD': 80,
    'Google Search Console': 75,
    'Google Analytics 4': 75,
    
    // Development
    'HTML5/CSS3': 88,
    'JavaScript': 75,
    'Python': 85,
    'Flask': 78,
    'SQL': 75,
    'Bootstrap': 80,
    'Git/GitHub': 82,
    'REST APIs': 75,
    'JWT Auth': 70,
    
    // AI & Data
    'NLP': 72,
    'Emotion Recognition': 78,
    'Prompt Engineering': 85,
    'Google Gemini API': 80,
    'Multimodal AI': 70,
    'Pandas/NumPy': 68,
    
    // Other
    'Figma': 65,
    'Excel': 80,
    '1C': 60,
    'C++': 55
};

const CATEGORIES = {
    'Writing': ['UX Writing', 'Copywriting', 'Technical Documentation', 'Content Strategy', 'System Prompt Design'],
    'SEO': ['On-Page SEO', 'Screaming Frog', 'Schema.org / JSON-LD', 'Google Search Console', 'Google Analytics 4'],
    'Development': ['HTML5/CSS3', 'JavaScript', 'Python', 'Flask', 'SQL', 'Bootstrap', 'Git/GitHub', 'REST APIs', 'JWT Auth'],
    'AI & Data': ['NLP', 'Emotion Recognition', 'Prompt Engineering', 'Google Gemini API', 'Multimodal AI', 'Pandas/NumPy'],
    'Other': ['Figma', 'Excel', '1C', 'C++']
};

export function render() {
    const total = Object.keys(SKILLS).length;
    const top = Object.entries(SKILLS).sort((a,b) => b[1] - a[1])[0][0];
    const avg = Math.round(Object.values(SKILLS).reduce((a,b) => a+b, 0) / total);
    
    return `
        <div class="skills-content">
            <div class="skills-header">
                <h2>⚡ Technical Skills</h2>
                <p>Click a category to filter</p>
            </div>

            <div class="skills-categories">
                <button class="skill-cat-btn active" data-category="all">📊 All</button>
                ${Object.keys(CATEGORIES).map(cat => `
                    <button class="skill-cat-btn" data-category="${cat}">${cat}</button>
                `).join('')}
            </div>

            <div class="skills-list" id="skillsList">
                ${renderSkills('all')}
            </div>

            <div class="skills-summary">
                <div class="skill-stat">
                    <span>📚 Total skills</span>
                    <strong>${total}</strong>
                </div>
                <div class="skill-stat">
                    <span>🏆 Top skill</span>
                    <strong>${top}</strong>
                </div>
                <div class="skill-stat">
                    <span>📈 Average</span>
                    <strong>${avg}%</strong>
                </div>
            </div>
        </div>
    `;
}

function renderSkills(category) {
    let skills = Object.entries(SKILLS);
    if (category !== 'all') {
        const catSkills = CATEGORIES[category] || [];
        skills = skills.filter(([name]) => catSkills.includes(name));
    }
    skills.sort((a,b) => b[1] - a[1]);

    return skills.map(([name, level]) => `
        <div class="skill-item" data-skill="${name}">
            <div class="skill-info">
                <span class="skill-name">${name}</span>
                <span class="skill-level">${level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-fill" style="width:${level}%"></div>
            </div>
        </div>
    `).join('');
}

export function init(container) {
    const buttons = container.querySelectorAll('.skill-cat-btn');
    const list = container.querySelector('#skillsList');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            list.innerHTML = renderSkills(category);
            
            list.querySelectorAll('.skill-fill').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 100);
            });
        });
    });

    setTimeout(() => {
        list.querySelectorAll('.skill-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = width; }, 200);
        });
    }, 300);
}
