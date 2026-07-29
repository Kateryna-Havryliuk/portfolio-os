# 🖥️ Portfolio OS — Retro Operating System Style Portfolio

> **Kateryna Havryliuk** — Computer Science Graduate · Python & AI Developer

This is an interactive, single-page portfolio website designed as a retro operating system (Windows 95-inspired). It includes a desktop with draggable windows, a functional terminal, an AI assistant, and multiple mini-applications. The project showcases my technical skills, projects, certifications, and experience in a playful yet professional manner.

---

## ✨ Features

- 🖥️ **Retro OS Interface** — Desktop with draggable, resizable windows, taskbar, start menu, and system tray.
- ⌨️ **Interactive Terminal** — Custom terminal with commands like `whoami`, `projects`, `skills`, `theme`, `matrix`, and more.
- 🤖 **AI Assistant** — A simple chat assistant that answers questions about me (demo mode or OpenAI API integration).
- 📊 **System Monitor** — Displays simulated CPU, RAM, and process usage.
- 📝 **Notepad** — A simple text editor with save/load functionality.
- 🧮 **Calculator** — Basic calculator with history.
- 🍅 **Pomodoro Timer** — Focus timer with work/break modes.
- 🎵 **Music Player** — Playlist with play/pause, shuffle, repeat, and progress bar.
- 📸 **Photobooth** — Take photos with your camera and save them locally.
- 📅 **Calendar** — Add, view, and delete events for any date.
- 🎮 **Pixel Pet** — A virtual pet game (via iframe).
- 🌙 **Themes** — Classic (Windows 95), Matrix, Dark, and Willow (green).

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES Modules) |
| **Styling** | Custom CSS with retro UI, responsive design |
| **State Management** | LocalStorage (for settings, notes, events, etc.) |
| **APIs** | OpenAI API (optional, for AI assistant) |
| **Tools** | Git, GitHub, Vercel (for deployment) |

---

## 📁 Project Structure
portfolio-os/
├── index.html # Main entry point
├── style.css # All styles (retro theme, components, responsive)
├── assets/ # Icons, favicon, etc.
├── game.html # Pixel Pet game (iframe source)
├── resume_Kateryna_Havryliuk.pdf
├── js/
│ ├── main.js # Boot sequence, initialization
│ ├── boot.js # Boot screen animation
│ ├── windows.js # Window manager (open, close, drag, resize)
│ ├── about.js # About me content
│ ├── projects.js # Projects list with filtering
│ ├── skills.js # Technical skills with categories
│ ├── terminal.js # Terminal commands
│ ├── assistant.js # AI assistant (demo + OpenAI)
│ ├── contact.js # Contact information
│ ├── calculator.js # Calculator logic
│ ├── calendar.js # Calendar with events
│ ├── camera.js # Photobooth (webcam)
│ ├── music.js # Music player
│ ├── pomodoro.js # Pomodoro timer
│ ├── notes.js # Notepad (save/load)
│ ├── monitor.js # System monitor (simulated)
│ ├── explorer.js # File explorer (simulated)
│ ├── clock.js # Taskbar clock
│ ├── theme.js # Theme switching
│ ├── controls.js # CRT toggle, font size controls
│ └── utils.js # Helpers (toast, clipboard, storage)
└── README.md

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser
- (Optional) Node.js for local development server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kateryna-havryliuk/portfolio-os.git
   cd portfolio-os
Run locally

Open index.html directly in your browser, or

Use a local server:

bash
npx serve .
or

bash
python -m http.server
(Optional) Configure OpenAI API

Open js/assistant.js

Set useDemo: false and add your apiKey

---

🎮 Commands in Terminal
help – Show all available commands
whoami – About Kateryna
education – Education details
experience – Work experience
projects – List of projects
skills – Technical skills with progress bars
publications – Publications & conferences
contact – Contact information
github – GitHub link
linkedin – LinkedIn link
open [window] – Open a window (e.g., open about)
theme [name] – Change theme (classic, matrix, dark, willow)
matrix – Matrix rain effect
clear – Clear terminal
date – Current date/time
uptime – System uptime
joke – Tell a programming joke

🎨 Themes
Classic – Windows 95 retro look
Matrix – Green-on-black terminal style
Dark – Dark mode with muted colors
Willow – Soft green/nature theme
Switch themes via the tray icon (🎨) or terminal command.

📦 Deployment
This project is static and can be deployed anywhere:

Vercel — vercel --prod

GitHub Pages — push to gh-pages branch

Netlify — drag-and-drop the project folder

🤝 Contributing
This is a personal portfolio project, but suggestions and feedback are always welcome. Feel free to open an issue or submit a pull request.

📄 License
This project is open source and available under the MIT License.

📬 Contact
Email: katyagko2004@gmail.com

GitHub: github.com/Kateryna-Havryliuk

LinkedIn: linkedin.com/in/kateryna-havryliuk