// js/assistant.js

const CONFIG = {
    useDemo: true
};

const DEMO_RESPONSES = {
    'who': 'Kateryna Havryliuk — UX Writer & AI Product Writer with an Honors CS degree (GPA 4.87/5.0). Creator of Safe Place and KORstudy.',
    'skills': 'Writing (UX, copy, technical docs, system prompts), SEO (Screaming Frog, Schema.org, GA4), Development (Python, Flask, JS, HTML/CSS), and AI (NLP, emotion recognition, prompt engineering).',
    'projects': 'Main projects: Safe Place (emotion-aware AI), KORstudy (Korean-learning platform with SEO), Portfolio OS (this retro interface), Pixel Pet (game), 3D Warehouse docs, Bank Budget 2026.',
    'experience': 'Founder & UX Writer at KORstudy (2024–Present), AI Product Writer & Developer at Safe Place (2025–2026), Technical Writer at a manufacturing company (2026).',
    'education': 'B.Sc. in Computer Science & IT from Lesya Ukrainka Volyn National University. GPA 4.87/5.0, with Distinction. 1st place in University Scientific Research Competition (2026).',
    'contact': 'Email: katyagko2004@gmail.com · GitHub: github.com/Kateryna-Havryliuk · LinkedIn: linkedin.com/in/kateryna-havryliuk',
    'github': 'github.com/Kateryna-Havryliuk — check out my repositories!',
    'linkedin': 'linkedin.com/in/kateryna-havryliuk',
    'korstudy': 'KORstudy is a Ukrainian-language Korean-learning platform. I built the entire project end-to-end: UX copy, frontend, technical SEO, GA4 + GDPR. Live at easy-korean-learning.netlify.app',
    'safeplace': 'Safe Place is an emotion-aware AI web app that analyzes text and voice. Full-stack Flask + Google Gemini API, multimodal emotion recognition, +17% accuracy vs text-only, 2 published papers.',
    'seo': 'I ran a full technical SEO audit of KORstudy with Screaming Frog: fixed broken links, meta tags, canonical issues. Implemented JSON-LD, Open Graph, sitemap, robots, GA4 with Consent Mode v2.',
    'open': 'Yes! Available for remote work worldwide. Open to UX Writing, AI Product Writing, Content Design, SEO, and frontend roles.',
    'hello': 'Hello! 👋 I\'m Kateryna\'s AI assistant. Ask me about her skills, projects, or contact info!',
    'thank': 'You\'re welcome! 😊',
    'help': 'Ask me about: who, skills, projects, experience, education, contact, github, linkedin, korstudy, safeplace, seo, open, hello, thank, joke.',
    'joke': 'Why do UX writers hate dark mode? Because users keep asking "where is the button?" 🌙',
    'default': 'I\'m not sure about that. Try: who, skills, projects, experience, education, contact, korstudy, safeplace, seo, open, hello, thank, joke, help.'
};

export function render() {
    return `
        <div class="assistant-content">
            <div class="assistant-header">
                <div class="assistant-avatar">🤖</div>
                <div>
                    <h3>AI Assistant</h3>
                    <p class="assistant-sub">Ask me about Kateryna</p>
                </div>
                <div class="assistant-status">
                    <span class="status-dot online"></span>
                    <span id="assistantStatus">Online</span>
                </div>
            </div>

            <div class="assistant-messages" id="assistantMessages">
                <div class="assistant-message bot">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>👋 Hi! I'm Kateryna's AI assistant. Ask me anything — skills, projects, experience, or contact info!</p>
                        <span class="message-time">${new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>

            <div class="assistant-input-area">
                <input type="text" id="assistantInput" placeholder="Ask me something..." autocomplete="off">
                <button id="assistantSend">➤</button>
                <button id="assistantClear" title="Clear chat">🗑</button>
            </div>

            <div class="assistant-suggestions">
                <button class="suggestion-btn" data-query="who is Kateryna?">👤 Who</button>
                <button class="suggestion-btn" data-query="what skills does she have?">⚡ Skills</button>
                <button class="suggestion-btn" data-query="what is KORstudy?">🇰🇷 KORstudy</button>
                <button class="suggestion-btn" data-query="tell me about Safe Place">🧠 Safe Place</button>
                <button class="suggestion-btn" data-query="contact info">📧 Contact</button>
            </div>
        </div>
    `;
}

export function init(container) {
    const input = container.querySelector('#assistantInput');
    const sendBtn = container.querySelector('#assistantSend');
    const clearBtn = container.querySelector('#assistantClear');
    const messages = container.querySelector('#assistantMessages');

    container.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.dataset.query;
            sendMessage(input.value);
        });
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    clearBtn.addEventListener('click', () => {
        messages.innerHTML = '';
        addMessage('bot', '👋 Chat cleared! Ask me anything about Kateryna.');
    });

    setTimeout(() => input.focus(), 500);

    async function sendMessage(text) {
        const query = text.trim();
        if (!query) return;

        addMessage('user', query);
        input.value = '';
        input.disabled = true;

        const typingId = showTyping();

        try {
            let response;
            if (CONFIG.useDemo) {
                response = await getDemoResponse(query);
            } else {
                response = await getAIResponse(query);
            }
            removeTyping(typingId);
            addMessage('bot', response);
        } catch (error) {
            removeTyping(typingId);
            addMessage('bot', '❌ Oops! Something went wrong. Please try again.');
            console.error('Assistant error:', error);
        }

        input.disabled = false;
        input.focus();
        scrollToBottom();
    }

    function addMessage(type, content) {
        const div = document.createElement('div');
        div.className = `assistant-message ${type}`;
        div.innerHTML = `
            <div class="message-avatar">${type === 'bot' ? '🤖' : '👤'}</div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        messages.appendChild(div);
        scrollToBottom();
    }

    function showTyping() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'assistant-message bot typing';
        div.id = id;
        div.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messages.appendChild(div);
        scrollToBottom();
        return id;
    }

    function removeTyping(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    async function getDemoResponse(query) {
        const lower = query.toLowerCase();
        
        const keywords = ['who', 'skills', 'projects', 'experience', 'education', 'contact', 'github', 'linkedin', 'korstudy', 'safeplace', 'seo', 'open', 'hello', 'thank', 'help', 'joke'];

        let matched = null;
        for (const key of keywords) {
            if (lower.includes(key)) {
                matched = key;
                break;
            }
        }

        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 700));
        return DEMO_RESPONSES[matched] || DEMO_RESPONSES.default;
    }

    async function getAIResponse(query) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: CONFIG.model,
                messages: [
                    { role: 'system', content: 'You are Kateryna\'s AI assistant. Kateryna Havryliuk is a UX Writer & AI Product Writer with an Honors CS degree. Creator of Safe Place and KORstudy. Be friendly, concise, and helpful.' },
                    { role: 'user', content: query }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t process that.';
    }
}
