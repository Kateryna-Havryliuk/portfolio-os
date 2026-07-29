// js/assistant.js

// Конфігурація — встав свій OpenAI API ключ
// АБО використовуй безкоштовний режим з демо-відповідями
const CONFIG = {
    // Для реального API, розкоментуй:
    // apiKey: 'your-openai-api-key-here',
    // model: 'gpt-3.5-turbo',
    useDemo: true // true = безкоштовний демо-режим
};

// Демо-відповіді на часті запитання
const DEMO_RESPONSES = {
    'who': 'I am Kateryna Havryliuk — a 4th year CS student at Lesya Ukrainka University. I specialize in Python development and AI integration.',
    'skills': 'My main skills: Python, SQL, Flask, FastAPI, JavaScript, React, Git, OpenAI API, and LangChain.',
    'projects': 'I have several projects: Safe Place (AI emotional companion), 3D Warehouse Visualizer, Pixel Pet (virtual pet game), and this portfolio OS.',
    'experience': 'I have freelance experience in web development, AI integration, and Python automation. I also worked as a research assistant in AI/ML.',
    'education': 'I study Computer Science at Lesya Ukrainka University. My GPA is 4.87/5.0. I am in my 4th year.',
    'contact': 'You can reach me at katyagko2004@gmail.com or through GitHub: github.com/kateryna-havryliuk',
    'github': 'My GitHub: github.com/kateryna-havryliuk. Check out my repositories!',
    'linkedin': 'LinkedIn: linkedin.com/in/kateryna-havryliuk',
    'open': 'Yes, I am open for work! I am looking for opportunities as a Python/AI Developer.',
    'hello': 'Hello! 👋 I\'m Kateryna. How can I help you today?',
    'thank': 'You\'re welcome! 😊 Feel free to ask me anything about Kateryna.',
    'help': 'You can ask me about: who, skills, projects, experience, education, contact, github, linkedin, open, hello, thank, joke',
    'joke': 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    'default': 'I\'m not sure about that. Try asking about: who, skills, projects, experience, education, contact, github, linkedin, open, hello, thank, joke, or help.'
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
                        <p>👋 Hello! I'm Kateryna's AI assistant. Ask me anything about her skills, projects, experience, or contact information!</p>
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
                <button class="suggestion-btn" data-query="what projects did she make?">💾 Projects</button>
                <button class="suggestion-btn" data-query="contact info">📧 Contact</button>
                <button class="suggestion-btn" data-query="is she open for work?">💼 Open?</button>
            </div>
        </div>
    `;
}

export function init(container) {
    const input = container.querySelector('#assistantInput');
    const sendBtn = container.querySelector('#assistantSend');
    const clearBtn = container.querySelector('#assistantClear');
    const messages = container.querySelector('#assistantMessages');
    const statusEl = container.querySelector('#assistantStatus');

    // Suggestions
    container.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.dataset.query;
            sendMessage(input.value);
        });
    });

    // Send on Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    clearBtn.addEventListener('click', () => {
        messages.innerHTML = '';
        addMessage('bot', '👋 Chat cleared! Ask me anything about Kateryna.');
    });

    // Focus input
    setTimeout(() => input.focus(), 500);

    async function sendMessage(text) {
        const query = text.trim();
        if (!query) return;

        // Add user message
        addMessage('user', query);
        input.value = '';
        input.disabled = true;

        // Show typing indicator
        const typingId = showTyping();

        try {
            let response;
            if (CONFIG.useDemo) {
                response = await getDemoResponse(query);
            } else {
                response = await getAIResponse(query);
            }

            // Remove typing and add response
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

    // Demo response engine
    async function getDemoResponse(query) {
        const lower = query.toLowerCase();
        
        // Check for keywords
        const keywords = {
            'who': 'who',
            'skills': 'skills',
            'projects': 'projects',
            'experience': 'experience',
            'education': 'education',
            'contact': 'contact',
            'github': 'github',
            'linkedin': 'linkedin',
            'open': 'open',
            'hello': 'hello',
            'thank': 'thank',
            'help': 'help',
            'joke': 'joke'
        };

        let matched = null;
        for (const [key, value] of Object.entries(keywords)) {
            if (lower.includes(key)) {
                matched = value;
                break;
            }
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 700));

        return DEMO_RESPONSES[matched] || DEMO_RESPONSES.default;
    }

    // Real OpenAI API call
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
                    {
                        role: 'system',
                        content: `You are Kateryna's AI assistant. You help people learn about Kateryna Havryliuk — 
                            a CS student, Python/AI developer. You know her skills (Python, SQL, Flask, FastAPI, 
                            JavaScript, React, Git, OpenAI API, LangChain), projects (Safe Place, 3D Warehouse, 
                            Pixel Pet, Portfolio OS), education (Lesya Ukrainka University, GPA 4.87/5.0), 
                            and contact info (katyagko2004@gmail.com, github.com/kateryna-havryliuk). 
                            Be friendly, concise, and helpful.`
                    },
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