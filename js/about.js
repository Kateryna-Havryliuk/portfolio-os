// js/about.js

export function render() {
    return `
        <div class="about-content">
            <div class="about-header">
                <div class="about-avatar">👩‍💻</div>
                <div class="about-title">
                    <h1>Kateryna Havryliuk</h1>
                    <p class="about-subtitle">Computer Science Graduate · Python & AI Developer</p>
                    <div class="about-status"><span class="status-dot"></span> Open for work · Seeking MLH Fellowship</div>
                </div>
            </div>

            <div class="about-grid">
                <div class="about-section">
                    <h3>🎓 Education</h3>
                    <div class="about-item">
                        <strong>Lesya Ukrainka Volyn National University</strong>
                        <span>GPA: 4.87/5.0</span>
                        <p>Bachelor's Degree in Computer Science & Information Technology · 2022–2026</p>
                    </div>
                </div>

                <div class="about-section">
                    <h3>📜 Certifications & Training</h3>
                    <div class="about-item">
                        <strong>HarvardX: Data Science — Machine Learning</strong>
                    </div>
                    <div class="about-item">
                        <strong>IBM: Introduction to Generative AI</strong>
                    </div>
                    <div class="about-item">
                        <strong>Data Engineering and Security Summer School</strong>
                        <span>Ivan Franko University of Lviv · 120 hrs</span>
                    </div>
                    <div class="about-item">
                        <strong>GlobalLogic Education: IT Choice Course</strong>
                    </div>
                    <div class="about-item">
                        <strong>Oracle Academy — Database Programming</strong>
                    </div>
                    <div class="about-item">
                        <strong>GoIT · Campster · AIT 2023</strong>
                        <span>Various programming bootcamps & summer schools</span>
                    </div>
                </div>

                <div class="about-section">
                    <h3>💼 Experience</h3>
                    <div class="about-item">
                        <strong>Freelance Developer</strong>
                        <span>2023 – Present</span>
                        <p>Web development, AI integration, Python automation, full-stack solutions</p>
                    </div>
                    <div class="about-item">
                        <strong>Research Assistant</strong>
                        <span>2024 – Present</span>
                        <p>· AI/ML research at university lab</p>
                        <p>· data analysis</p>
                        <p>· publication co-author</p>
                    </div>
                    <div class="about-item">
                        <strong>Conference Participant & Author</strong>
                        <span>2024–2026</span>
                        <p>· Active participant in academic conferences</p>
                        <p>· Author of peer-reviewed publications</p>
                    </div>
                </div>

                <div class="about-section">
                    <h3>🚀 Projects</h3>
                    <div class="about-item">
                        <strong>Safe Place — Emotional Support Web App</strong>
                        <span>2025–2026</span>
                        <p>· Generative AI, Python, Flask, NLP</p>
                        <p>· Full web app with crisis detection and analytics dashboard</p>
                    </div>
                    <div class="about-item">
                        <strong>Bank Budget Planning & System Analysis</strong>
                        <span>2025</span>
                        <p>· Data Analysis, Excel, Optimization</p>
                        <p>· Approved with distinction, presented to industry experts</p>
                    </div>
                    <div class="about-item">
                        <strong>KORstudy — Korean Language Learning Platform</strong>
                        <span>2024</span>
                        <p>· HTML, CSS, JavaScript, PHP</p>
                        <p>· Educational website with structured courses and interactive features</p>
                    </div>
                    <div class="about-item">
                        <strong>ToDo List Web App</strong>
                        <span>2023</span>
                        <p>· HTML, CSS, JavaScript, Local Storage · Task management tool with persistent data</p>
                        <p>· Task management tool with persistent data</p>
                    </div>
                </div>

                <div class="about-section">
                    <h3>🛠️ Tech Stack</h3>
                    <div class="tech-tags">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">HTML/CSS</span>
                        <span class="tech-tag">PHP</span>
                        <span class="tech-tag">C++</span>
                        <span class="tech-tag">R</span>
                        <span class="tech-tag">SQL</span>
                        <span class="tech-tag">Scala</span>
                        <span class="tech-tag">Prolog</span>
                        <span class="tech-tag">Git/GitHub</span>
                        <span class="tech-tag">Figma</span>
                        <span class="tech-tag">Oracle DB</span>
                        <span class="tech-tag">Wireshark</span>
                        <span class="tech-tag">Cisco Packet Tracer</span>
                    </div>
                </div>

                <div class="about-section">
                    <h3>🌍 Languages</h3>
                    <div class="language-item">
                        <span>🇺🇦 Ukrainian</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:100%"></div></div>
                        <span>C2</span>
                    </div>
                    <div class="language-item">
                        <span>🇬🇧 English</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:65%"></div></div>
                        <span>B1+</span>
                    </div>
                    <div class="language-item">
                        <span>🇵🇱 Polish</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:65%"></div></div>
                        <span>B1+</span>
                    </div>
                    <div class="language-item">
                        <span>🇰🇷 Korean</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:20%"></div></div>
                        <span>A1+</span>
                    </div>
                    <div class="language-item">
                        <span>🇨🇳 Chinese</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:15%"></div></div>
                        <span>A1</span>
                    </div>
                    <div class="language-item">
                        <span>🇩🇪 German</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:15%"></div></div>
                        <span>A1</span>
                    </div>
                    <div class="language-item">
                        <span>🇯🇵 Japanese</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:10%"></div></div>
                        <span>A1</span>
                    </div>
                </div>
            </div>

            <div class="about-footer">
                <span class="about-uptime" id="systemUptime">🟢 Uptime: 0h 0m</span>
                <span>📧 katyagko2004@gmail.com</span>
                <span>🔗 github.com/Kateryna-Havryliuk</span>
                <span>📄 <a href="/resume_Kateryna_Havryliuk.pdf" target="_blank">View Resume</a></span>
            </div>
        </div>
    `;
}

export function init(container) {
    // Uptime is handled globally
}