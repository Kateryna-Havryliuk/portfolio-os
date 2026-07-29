// js/skills.js

const SKILLS = {
    'Python': 90,
    'SQL': 80,
    'Flask': 75,
    'FastAPI': 70,
    'JavaScript': 65,
    'React': 55,
    'C#/.NET': 60,
    'PHP/Laravel': 60,
    'Git': 85,
    'Docker': 50,
    'OpenAI API': 75,
    'LangChain': 65,
    'Three.js': 55,
    'HTML/CSS': 85,
    'Scala': 35,
    'Prolog': 30,
    'Wireshark': 25,
    'Cisco Packet Tracer': 20,
    'Oracle DB': 40,
    'R': 50
};

const CATEGORIES = {
    'Backend': ['Python', 'Flask', 'FastAPI', 'C#/.NET', 'PHP/Laravel', 'Scala'],
    'Frontend': ['JavaScript', 'React', 'HTML/CSS', 'Three.js'],
    'AI/ML': ['OpenAI API', 'LangChain'],
    'DevOps': ['Git', 'Docker'],
    'Data': ['SQL', 'Oracle DB', 'R'],
    'Other': ['Prolog', 'Wireshark', 'Cisco Packet Tracer']
};

export function render() {
    return `
        <div class="skills-content">
            <div class="skills-header">
                <h2>⚡ Technical Skills</h2>
                <p>Click on a category to filter</p>
            </div>

            <div class="skills-categories">
                ${Object.keys(CATEGORIES).map(cat => `
                    <button class="skill-cat-btn active" data-category="${cat}">${cat}</button>
                `).join('')}
                <button class="skill-cat-btn active" data-category="all">📊 All</button>
            </div>

            <div class="skills-list" id="skillsList">
                ${renderSkills('all')}
            </div>

            <div class="skills-summary">
                <div class="skill-stat">
                    <span>📚 Total skills</span>
                    <strong>${Object.keys(SKILLS).length}</strong>
                </div>
                <div class="skill-stat">
                    <span>🏆 Top skill</span>
                    <strong>${Object.entries(SKILLS).sort((a,b) => b[1] - a[1])[0][0]}</strong>
                </div>
                <div class="skill-stat">
                    <span>📈 Average</span>
                    <strong>${Math.round(Object.values(SKILLS).reduce((a,b) => a+b, 0) / Object.values(SKILLS).length)}%</strong>
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