// js/about.js

export function render() {
    return `
        <div class="about-content">
            <div class="about-header">
                <div class="about-avatar">👩‍💻</div>
                <div class="about-title">
                    <h1>Kateryna Havryliuk</h1>
                    <p class="about-subtitle">UX Writer & AI Product Writer · Developer · SEO</p>
                    <div class="about-status"><span class="status-dot"></span> Open for work · Remote worldwide</div>
                </div>
            </div>

            <div class="about-grid">
                <div class="about-section">
                    <h3>🎓 Education</h3>
                    <div class="about-item">
                        <strong>Lesya Ukrainka Volyn National University</strong>
                        <span>GPA: 4.87/5.0 · Diploma with Distinction</span>
                        <p>B.Sc. in Computer Science & Information Technology · 2022–2026</p>
                        <p>🏆 1st Place — University Scientific Research Competition, 2026</p>
                    </div>
                </div>

                <div class="about-section">
                    <h3>📜 Certifications & Training</h3>
                    <div class="about-item">
                        <strong>GCI World — University of Tokyo</strong>
                        <span>Data Science & Machine Learning · 3-month intensive</span>
                    </div>
                    <div class="about-item">
                        <strong>HarvardX: Data Science — Machine Learning</strong>
                    </div>
                    <div class="about-item">
                        <strong>IBM: Introduction to Generative AI</strong>
                    </div>
                    <div class="about-item">
                        <strong>Data Engineering & Security Summer School</strong>
                        <span>Ivan Franko National University of Lviv · 120 hrs</span>
                    </div>
                    <div class="about-item">
                        <strong>Linux Foundation — Git</strong>
                    </div>
                </div>

                <div class="about-section">
                    <h3>💼 Experience</h3>
                    <div class="about-item">
                        <strong>Founder & UX Writer — KORstudy</strong>
                        <span>2024 – Present</span>
                        <p>· Ukrainian-language Korean-learning platform</p>
                        <p>· 100% of interface copy, 10+ pages</p>
                        <p>· Technical SEO audit (Screaming Frog, Schema.org, JSON-LD)</p>
                        <p>· GA4 + Consent Mode v2 · GDPR-compliant</p>
                    </div>
                    <div class="about-item">
                        <strong>AI Product Writer & Developer — Safe Place</strong>
                        <span>2025–2026</span>
                        <p>· Full-stack AI web app (Flask, Google Gemini API)</p>
                        <p>· Multimodal emotion recognition: text + voice</p>
                        <p>· Wrote every UI string, system prompt, 10 techniques, 4 articles</p>
                    </div>
                    <div class="about-item">
                        <strong>Technical Writer & Developer — Manufacturing Co.</strong>
                        <span>2026</span>
                        <p>· 3D warehouse visualization system documentation</p>
                        <p>· User guides for non-technical staff</p>
                    </div>
                </div>

                <div class="about-section">
                    <h3>🚀 Featured Projects</h3>
                    <div class="about-item">
                        <strong>Safe Place — Emotion-Aware AI Web App</strong>
                        <span>2025–2026 · Flagship</span>
                        <p>· Flask · Google Gemini API · 18 REST endpoints · JWT auth</p>
                        <p>· Multimodal emotion recognition (text + voice)</p>
                        <p>· +17% accuracy vs text-only · 4 critical cases, zero false positives</p>
                        <p>· 2 published papers · 1st place research award</p>
                    </div>
                    <div class="about-item">
                        <strong>KORstudy — Korean Learning Platform</strong>
                        <span>2024 – Present</span>
                        <p>· UX Writing · Content Strategy · Technical SEO · Frontend</p>
                        <p>· 10+ pages, fully in Ukrainian</p>
                        <p>· JSON-LD, Open Graph, sitemap, robots · GA4 + GDPR</p>
                    </div>
                    <div class="about-item">
                        <strong>3D Warehouse Visualization System</strong>
                        <span>2026</span>
                        <p>· 3D navigation for warehouse staff · 1C + Excel integration</p>
                        <p>· Full technical documentation for non-technical users</p>
                    </div>
                    <div class="about-item">
                        <strong>Portfolio OS — this project</strong>
                        <span>2025–2026</span>
                        <p>· Retro OS interface · draggable windows · terminal · AI assistant</p>
                        <p>· Vanilla JS, ES modules, no frameworks</p>
                    </div>
                    <div class="about-item">
                        <strong>Pixel Pet — Virtual Companion</strong>
                        <span>2024</span>
                        <p>· Tamagotchi-style game · bilingual (EN/UA) · animations</p>
                        <p>· Embedded as iframe inside Portfolio OS</p>
                    </div>
                </div>

                <div class="about-section">
                    <h3>🛠️ Tech Stack</h3>
                    <div class="tech-tags">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">Flask</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">HTML/CSS</span>
                        <span class="tech-tag">Bootstrap</span>
                        <span class="tech-tag">SQL</span>
                        <span class="tech-tag">C++</span>
                        <span class="tech-tag">Git/GitHub</span>
                        <span class="tech-tag">Figma</span>
                        <span class="tech-tag">Google Gemini API</span>
                        <span class="tech-tag">OpenAI API</span>
                        <span class="tech-tag">NLP</span>
                        <span class="tech-tag">Emotion Recognition</span>
                        <span class="tech-tag">Prompt Engineering</span>
                        <span class="tech-tag">Screaming Frog</span>
                        <span class="tech-tag">Schema.org</span>
                        <span class="tech-tag">JSON-LD</span>
                        <span class="tech-tag">Google Analytics 4</span>
                        <span class="tech-tag">1C</span>
                        <span class="tech-tag">Excel</span>
                    </div>
                </div>

                <div class="about-section">
                    <h3>🌍 Languages</h3>
                    <div class="language-item">
                        <span>🇺🇦 Ukrainian</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:100%"></div></div>
                        <span>Native</span>
                    </div>
                    <div class="language-item">
                        <span>🇬🇧 English</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:70%"></div></div>
                        <span>B1–B2</span>
                    </div>
                    <div class="language-item">
                        <span>🇵🇱 Polish</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:60%"></div></div>
                        <span>B1</span>
                    </div>
                    <div class="language-item">
                        <span>🇰🇷 Korean</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:20%"></div></div>
                        <span>A1–A2</span>
                    </div>
                    <div class="language-item">
                        <span>🇯🇵 Japanese</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:15%"></div></div>
                        <span>A1–A2</span>
                    </div>
                    <div class="language-item">
                        <span>🇨🇳 Chinese</span>
                        <div class="lang-bar"><div class="lang-fill" style="width:15%"></div></div>
                        <span>A1–A2</span>
                    </div>
                </div>
            </div>

            <div class="about-footer">
                <span class="about-uptime" id="systemUptime">🟢 Uptime: 0h 0m</span>
                <span>📧 katyagko2004@gmail.com</span>
                <span>🔗 <a href="https://github.com/Kateryna-Havryliuk" target="_blank">GitHub</a></span>
            </div>
        </div>
    `;
}

export function init(container) {
    // Uptime is handled globally
}
