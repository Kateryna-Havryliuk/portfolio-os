// js/music.js

import { showToast } from './utils.js';

const PLAYLIST = [
    { name: 'Retro Wave', artist: 'Synthwave Dreams', duration: 180 },
    { name: 'Pixel Sky', artist: 'Chip Tune Heroes', duration: 200 },
    { name: 'Midnight Coding', artist: 'Kateryna Mix', duration: 220 },
    { name: 'Floppy Disk', artist: '8-bit Journey', duration: 165 },
    { name: 'Neon Lights', artist: 'Cyber Pulse', duration: 210 },
    { name: 'Data Stream', artist: 'Binary Beats', duration: 190 }
];

let currentTrack = 0;
let isPlaying = false;
let currentTime = 0;
let interval = null;
let shuffle = false;
let volume = 50;

export function render() {
    return `
        <div class="player-content">
            <div class="player-display">
                <div class="player-track" id="playerTrack">${PLAYLIST[0].name}</div>
                <div class="player-artist" id="playerArtist">${PLAYLIST[0].artist}</div>
            </div>
            <div class="player-controls">
                <button class="player-btn" id="playerPrev">⏮</button>
                <button class="player-btn" id="playerPlay">▶</button>
                <button class="player-btn" id="playerNext">⏭</button>
                <button class="player-btn" id="playerShuffle" style="opacity:0.5">🔀</button>
                <button class="player-btn" id="playerRepeat">🔁</button>
            </div>
            <div class="player-progress" id="playerProgressBar">
                <div class="player-progress-bar">
                    <div class="player-progress-fill" id="playerProgressFill" style="width:0%"></div>
                </div>
            </div>
            <div class="player-time">
                <span id="playerCurrent">0:00</span>
                <span id="playerDuration">${formatTime(PLAYLIST[0].duration)}</span>
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
                            <span>${formatTime(track.duration)}</span>
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

    let repeat = false;

    function loadTrack(index) {
        currentTrack = (index + PLAYLIST.length) % PLAYLIST.length;
        const track = PLAYLIST[currentTrack];
        trackEl.textContent = track.name;
        artistEl.textContent = track.artist;
        durationEl.textContent = formatTime(track.duration);
        currentTime = 0;
        progressFill.style.width = '0%';
        currentEl.textContent = '0:00';
        
        // Update playlist
        container.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === currentTrack);
        });
    }

    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function play() {
        isPlaying = true;
        playBtn.textContent = '⏸';
        if (!interval) {
            interval = setInterval(updateProgress, 1000);
        }
        showToast('▶ ' + PLAYLIST[currentTrack].name);
    }

    function pause() {
        isPlaying = false;
        playBtn.textContent = '▶';
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function updateProgress() {
        const track = PLAYLIST[currentTrack];
        currentTime++;
        const percent = (currentTime / track.duration) * 100;
        progressFill.style.width = Math.min(percent, 100) + '%';
        currentEl.textContent = formatTime(currentTime);

        if (currentTime >= track.duration) {
            if (repeat) {
                currentTime = 0;
                progressFill.style.width = '0%';
                currentEl.textContent = '0:00';
            } else if (shuffle) {
                let newTrack;
                do {
                    newTrack = Math.floor(Math.random() * PLAYLIST.length);
                } while (newTrack === currentTrack && PLAYLIST.length > 1);
                loadTrack(newTrack);
            } else {
                if (currentTrack < PLAYLIST.length - 1) {
                    loadTrack(currentTrack + 1);
                } else {
                    pause();
                    currentTime = 0;
                    progressFill.style.width = '0%';
                    currentEl.textContent = '0:00';
                    showToast('⏹ Playlist finished');
                }
            }
        }
    }

    function nextTrack() {
        if (shuffle) {
            let newTrack;
            do {
                newTrack = Math.floor(Math.random() * PLAYLIST.length);
            } while (newTrack === currentTrack && PLAYLIST.length > 1);
            loadTrack(newTrack);
        } else {
            loadTrack(currentTrack + 1);
        }
        if (isPlaying) {
            if (interval) clearInterval(interval);
            interval = setInterval(updateProgress, 1000);
        }
    }

    function prevTrack() {
        loadTrack(currentTrack - 1);
        if (isPlaying) {
            if (interval) clearInterval(interval);
            interval = setInterval(updateProgress, 1000);
        }
    }

    // Play button
    playBtn.addEventListener('click', togglePlay);

    // Prev/Next
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);

    // Shuffle
    shuffleBtn.addEventListener('click', () => {
        shuffle = !shuffle;
        shuffleBtn.style.opacity = shuffle ? '1' : '0.5';
        showToast(shuffle ? '🔀 Shuffle ON' : '🔀 Shuffle OFF');
    });

    // Repeat
    repeatBtn.addEventListener('click', () => {
        repeat = !repeat;
        repeatBtn.style.opacity = repeat ? '1' : '0.5';
        showToast(repeat ? '🔁 Repeat ON' : '🔁 Repeat OFF');
    });

    // Progress bar click
    progressBar.addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const track = PLAYLIST[currentTrack];
        currentTime = Math.floor(percent * track.duration);
        progressFill.style.width = (percent * 100) + '%';
        currentEl.textContent = formatTime(currentTime);
    });

    // Volume
    volumeSlider.addEventListener('input', (e) => {
        volume = parseInt(e.target.value);
        volumeDisplay.textContent = volume + '%';
        // In real app, this would control audio volume
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
            if (isPlaying) {
                if (interval) clearInterval(interval);
                interval = null;
                isPlaying = false;
                playBtn.textContent = '▶';
            }
            loadTrack(index);
            play();
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

    // Load initial
    loadTrack(0);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}