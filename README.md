# 🖥️ Portfolio OS — Retro Operating System Style Portfolio

> **Kateryna Havryliuk** — Bachelor of Science Graduate · Developer · UX Writer & AI Product Writer · SEO

An interactive, single-page portfolio website designed as a retro operating system (Windows 95-inspired). It includes a desktop with draggable windows, a functional terminal, an AI assistant, and multiple mini-applications. The project showcases my skills, projects, certifications, and experience in a playful yet professional manner.

**🔗 Live:** [kateryna-havryliuk.github.io/portfolio-os](https://kateryna-havryliuk.github.io/portfolio-os)

---

## ✨ Features

- 🖥️ **Retro OS Interface** — Desktop with draggable, resizable windows, taskbar, start menu, and system tray
- ⌨️ **Interactive Terminal** — Custom terminal with commands like `whoami`, `projects`, `skills`, `seo`, `korstudy`, `safeplace`, `theme`, `matrix`, and more
- 🤖 **AI Assistant** — A chat assistant that answers questions about me (demo mode or OpenAI API integration)
- 📊 **System Monitor** — Displays simulated CPU, RAM, and process usage
- 📝 **Notepad** — Text editor with save/load functionality
- 🧮 **Calculator** — Basic calculator with history
- 🍅 **Pomodoro Timer** — Focus timer with work/break modes
- 🎵 **Music Player** — Playlist with play/pause, shuffle, repeat, and progress bar
- 📸 **Photobooth** — Take photos with your camera and save them locally
- 📅 **Calendar** — Add, view, and delete events for any date
- 🎮 **Pixel Pet** — Virtual pet game (embedded via iframe)
- 🌙 **Themes** — Classic (Windows 95), Matrix, Dark, and Willow
- 🎨 **Accessibility** — CRT effects toggle, font size controls (A-, A, A+, A++)
- 📱 **Responsive** — Mobile-friendly layout with adapted windows

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES Modules) |
| **Styling** | Custom CSS with retro UI, CSS variables, responsive design |
| **State Management** | LocalStorage (settings, notes, events, theme, font size) |
| **APIs** | OpenAI API (optional, for AI assistant), MediaDevices API (camera) |
| **Tools** | Git, GitHub, GitHub Pages (deployment) |
| **No frameworks** | Pure vanilla JS — no React, Vue, or jQuery |

---

## 📁 Project Structure

```
portfolio-os/
├── index.html                  # Main entry point
├── style.css                   # All styles (retro theme, components, responsive)
├── game.html                   # Pixel Pet game (iframe source)
├── package.json                # Local dev server script
├── README.md
├── assets/
│   └── favicon.ico
├── js/
│   ├── main.js                 # Boot sequence, initialization
│   ├── boot.js                 # Boot screen animation
│   ├── windows.js              # Window manager (open, close, drag, resize)
│   ├── about.js                # About me content
│   ├── projects.js             # Projects list with filtering
│   ├── skills.js               # Technical skills with categories
│   ├── terminal.js             # Terminal commands
│   ├── assistant.js            # AI assistant (demo + OpenAI)
│   ├── contact.js              # Contact information
│   ├── calculator.js           # Calculator logic
│   ├── calendar.js             # Calendar with events
│   ├── camera.js               # Photobooth (webcam)
│   ├── music.js                # Music player
│   ├── pomodoro.js             # Pomodoro timer
│   ├── notes.js                # Notepad (save/load)
│   ├── monitor.js              # System monitor (simulated)
│   ├── explorer.js             # File explorer (simulated)
│   ├── clock.js                # Taskbar clock
│   ├── theme.js                # Theme switching
│   ├── controls.js             # CRT toggle, font size controls
│   └── utils.js                # Helpers (toast, clipboard, storage)
```

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser
- (Optional) Node.js for local development server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kateryna-Havryliuk/portfolio-os.git
   cd portfolio-os
   ```

2. **Run locally**

   Option A — Open `index.html` directly in your browser.

   Option B — Use a local server (recommended, because of ES modules):
   ```bash
   npx serve .
   # or
   python -m http.server
   ```

3. **(Optional) Configure OpenAI API**
   - Open `js/assistant.js`
   - Set `useDemo: false` and add your `apiKey`
   - ⚠️ Warning: never commit real API keys to a public repo

---

## 🎮 Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `whoami` | About Kateryna |
| `education` | Education details |
| `experience` | Work experience |
| `projects` | List of all projects |
| `skills` | Technical skills with progress bars |
| `seo` | SEO & analytics tools |
| `publications` | Publications & conferences |
| `korstudy` | KORstudy project info |
| `safeplace` | Safe Place project info |
| `contact` | Contact information |
| `github` | GitHub link |
| `linkedin` | LinkedIn link |
| `open [window]` | Open a window (e.g., `open about`) |
| `theme [name]` | Change theme (`classic`, `matrix`, `dark`, `willow`) |
| `matrix` | Matrix rain effect |
| `clear` | Clear terminal |
| `date` | Current date/time |
| `uptime` | System uptime |
| `joke` | Tell a programming joke |

---

## 🎨 Themes

- **Classic** — Windows 95 retro look
- **Matrix** — Green-on-black terminal style
- **Dark** — Dark mode with muted colors
- **Willow** — Soft green/nature theme

Switch themes via the tray icon (🎨), the terminal command, or the theme menu.

---

## 📦 Featured Projects (in this portfolio)

- 🧠 **Safe Place** — Emotion-aware AI web app · Flask + Google Gemini API · NLP · 2025–2026
- 🇰🇷 **KORstudy** — Ukrainian-language Korean-learning platform · UX Writing · SEO · 2024–Present
- 🖥️ **Portfolio OS** — This project · Vanilla JS · ES Modules · 2025–2026
- 🎮 **Pixel Pet** — Virtual pet game · Bilingual (EN/UA) · 2024
- 📦 **3D Warehouse** — Technical documentation for non-technical staff · 2026
- 📊 **Bank Budget 2026** — Analytical writing · Approved with distinction · 2026

---

## 🚀 Deployment

This project is static and can be deployed anywhere:

- **GitHub Pages** — push to `main` branch, enable Pages in Settings
- **Netlify** — drag-and-drop the project folder, or connect the repo
- **Vercel** — `vercel --prod`

Current live version: [kateryna-havryliuk.github.io/portfolio-os](https://kateryna-havryliuk.github.io/portfolio-os)

---

## ♿ Accessibility

- CRT effects toggle for users who prefer reduced motion
- Font size controls (Small / Medium / Large / Extra Large)
- Keyboard shortcuts in terminal, calculator, pomodoro, music player, camera
- Semantic HTML where possible
- ARIA-friendly controls

---

## 🎓 About Me

**Kateryna Havryliuk** — Developer, UX Writer & AI Product Writer with Honors degree in Computer Science (GPA 4.87/5.0). Creator of Safe Place and KORstudy. Published 4 research papers. GCI World — University of Tokyo.

I design, build, and write for AI and web products — from system prompts and conversational flows to UX microcopy, technical documentation, and technical SEO.

📌 Available for remote work worldwide.

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are always welcome. Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 📬 Contact

- **Email:** [katyagko2004@gmail.com](mailto:katyagko2004@gmail.com)
- **GitHub:** [github.com/Kateryna-Havryliuk](https://github.com/Kateryna-Havryliuk)
- **LinkedIn:** [linkedin.com/in/kateryna-havryliuk](https://linkedin.com/in/kateryna-havryliuk-link)
- **Copywriting Portfolio:** [github.com/Kateryna-Havryliuk/AI-Product-Writing-Copywriting-Portfolio](https://github.com/Kateryna-Havryliuk/AI-Product-Writing-Copywriting-Portfolio)

---

*Built by hand, edited by hand.*
