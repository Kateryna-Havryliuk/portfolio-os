// js/music.js

import { showToast } from './utils.js';

const PLAYLIST = [
    { 
        name: 'Retro Wave', 
        artist: 'Synthwave Dreams', 
        file: 'audio/retro-wave.mp3',
        duration: 180
    },
    { 
        name: 'Pixel Sky', 
        artist: 'Chip Tune Heroes', 
        file: 'audio/pixel-sky.mp3',
        duration: 200
    },
    { 
        name: 'Midnight Coding', 
        artist: 'Kateryna Mix', 
        file: 'audio/midnight-coding.mp3',
        duration: 220
    },
    { 
        name: 'Floppy Disk', 
        artist: '8-bit Journey', 
        file: 'audio/floppy-disk.mp3',
        duration: 165
    },
    { 
        name: 'Neon Lights', 
        artist: 'Cyber Pulse', 
        file: 'audio/neon-lights.mp3',
        duration: 210
    }
];

let currentTrack = 0;
let isPlaying = false;
let audio = null;
let interval = null;
let shuffle = false;
let repeat = false;

export function render() {
    return `
        <div class="player-content">
            <div class="player-display">
                <div class="player-track" id="playerTrack">${PLAYLIST[0].name}</div>
                <div class="player-artist" id="playerArtist">${PLAYLIST[0].artist}</div>
            </div>
            <div class="player-controls">
                <button class="player-btn" id="playerPrev" title="Previous">⏮</button>
                <button class="player-btn" id="playerPlay" title="Play/Pause">▶</button>
                <button class="player-btn" id="playerNext" title="Next">⏭</button>
                <button class="player-btn" id="playerShuffle" title="Shuffle" style="opacity:0.5">🔀</button>
                <button class="player-btn" id="playerRepeat" title="Repeat" style="opacity:0.5">🔁</button>
            </div>
            <div class="player-progress" id="playerProgressBar">
                <div class="player-progress-bar">
                    <div class="player-progress-fill" id="playerProgressFill" style="width:0%"></div>
                </div>
            </div>
            <div class="player-time">
                <span id="playerCurrent">0:00</span>
                <span id="playerDuration">0:00</span>
            </div>
            <div class="player-volume">
                <span>🔊</span>
                <input type="range" id="playerVolume" min="0" max="100" value="50">
                <span id="volumeDisplay">50%</span>
            </div>
            <div class="player-playlist">
                <div class="playlist-toggle" id="playlistToggle">📋 Show Playlist</div>
                <div class="playlist-items" id="playlistItems" style="display:none">
                    ${PLAYLIST.map((track, i) => `
                        <div class="playlist-item ${i === currentTrack ? 'active' : ''}" data-index="${i}">
                            <span>${i + 1}.</span>
                            <span>${track.name}</span>
                            <span class="playlist-artist">${track.artist}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

export function init(container) {
    const playBtn = container.querySelector('#playerPlay');
    const prevBtn = container.querySelector('#playerPrev');
    const nextBtn = container.querySelector('#playerNext');
    const shuffleBtn = container.querySelector('#playerShuffle');
    const repeatBtn = container.querySelector('#playerRepeat');
    const progressBar = container.querySelector('#playerProgressBar');
    const progressFill = container.querySelector('#playerProgressFill');
    const volumeSlider = container.querySelector('#playerVolume');
    const volumeDisplay = container.querySelector('#volumeDisplay');
    const trackEl = container.querySelector('#playerTrack');
    const artistEl = container.querySelector('#playerArtist');
    const currentEl = container.querySelector('#playerCurrent');
    const durationEl = container.querySelector('#playerDuration');
    const playlistToggle = container.querySelector('#playlistToggle');
    const playlistItems = container.querySelector('#playlistItems');

    // ===== Створення Audio об'єкта =====
    if (!audio) {
        audio = new Audio();
        audio.volume = 0.5;
        audio.preload = 'metadata';
    }

    // Обробники подій Audio
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
        currentEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
        handleTrackEnd();
    });

    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        showToast('⚠️ Не вдалося завантажити трек');
    });

    // ===== Функції =====
    function loadTrack(index, autoplay = false) {
        currentTrack = (index + PLAYLIST.length) % PLAYLIST.length;
        const track = PLAYLIST[currentTrack];
        
        trackEl.textContent = track.name;
        artistEl.textContent = track.artist;
        audio.src = track.file;
        
        // Update playlist UI
        container.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === currentTrack);
        });
        
        if (autoplay) {
            play();
        }
    }

    function play() {
        audio.play()
            .then(() => {
                isPlaying = true;
                playBtn.textContent = '⏸';
                showToast('▶ ' + PLAYLIST[currentTrack].name);
            })
            .catch(err => {
                console.error('Play error:', err);
                showToast('❌ Не вдалося відтворити');
            });
    }

    function pause() {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
    }

    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function nextTrack() {
        if (shuffle) {
            let newTrack;
            do {
                newTrack = Math.floor(Math.random() * PLAYLIST.length);
            } while (newTrack === currentTrack && PLAYLIST.length > 1);
            loadTrack(newTrack, isPlaying);
        } else {
            loadTrack(currentTrack + 1, isPlaying);
        }
    }

    function prevTrack() {
        // Якщо трек грав > 3 сек — почати спочатку
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            loadTrack(currentTrack - 1, isPlaying);
        }
    }

    function handleTrackEnd() {
        if (repeat) {
            audio.currentTime = 0;
            audio.play();
        } else if (shuffle) {
            let newTrack;
            do {
                newTrack = Math.floor(Math.random() * PLAYLIST.length);
            } while (newTrack === currentTrack && PLAYLIST.length > 1);
            loadTrack(newTrack, true);
        } else {
            if (currentTrack < PLAYLIST.length - 1) {
                loadTrack(currentTrack + 1, true);
            } else {
                pause();
                audio.currentTime = 0;
                showToast('⏹ Playlist finished');
            }
        }
    }

    // ===== Події =====
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);

    shuffleBtn.addEventListener('click', () => {
        shuffle = !shuffle;
        shuffleBtn.style.opacity = shuffle ? '1' : '0.5';
        showToast(shuffle ? '🔀 Shuffle ON' : '🔀 Shuffle OFF');
    });

    repeatBtn.addEventListener('click', () => {
        repeat = !repeat;
        repeatBtn.style.opacity = repeat ? '1' : '0.5';
        showToast(repeat ? '🔁 Repeat ON' : '🔁 Repeat OFF');
    });

    // Progress bar click (seek)
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (audio.duration) {
            audio.currentTime = percent * audio.duration;
        }
    });

    // Volume
    volumeSlider.addEventListener('input', (e) => {
        const vol = parseInt(e.target.value);
        audio.volume = vol / 100;
        volumeDisplay.textContent = vol + '%';
    });

    // Playlist toggle
    playlistToggle.addEventListener('click', () => {
        const isVisible = playlistItems.style.display !== 'none';
        playlistItems.style.display = isVisible ? 'none' : 'block';
        playlistToggle.textContent = isVisible ? '📋 Show Playlist' : '📋 Hide Playlist';
    });

    // Playlist item click
    container.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            loadTrack(index, true);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            togglePlay();
        }
        if (e.key === 'ArrowRight') nextTrack();
        if (e.key === 'ArrowLeft') prevTrack();
    });

    // ===== Завантажити перший трек =====
    loadTrack(0, false);

    // Cleanup при закритті вікна
    return () => {
        if (audio) {
            audio.pause();
            audio.src = '';
        }
    };
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
