// js/camera.js

import { showToast } from './utils.js';

let stream = null;
let isActive = false;

export function render() {
    return `
        <div class="camera-content">
            <div class="camera-preview">
                <video id="cameraVideo" autoplay playsinline></video>
                <canvas id="cameraCanvas" style="display:none"></canvas>
                <div class="camera-placeholder" id="cameraPlaceholder">
                    📷 Click "Start Camera" to begin
                </div>
            </div>
            <div class="camera-controls">
                <button class="camera-btn" id="cameraStart">🎥 Start Camera</button>
                <button class="camera-btn" id="cameraCapture" disabled>📸 Take Photo</button>
                <button class="camera-btn" id="cameraStop" disabled>⏹ Stop</button>
                <button class="camera-btn" id="cameraClear">🗑 Clear All</button>
            </div>
            <div class="camera-photos" id="cameraPhotos">
                <div class="photo-placeholder">📷 Photos will appear here</div>
            </div>
        </div>
    `;
}

export function init(container) {
    const video = container.querySelector('#cameraVideo');
    const canvas = container.querySelector('#cameraCanvas');
    const placeholder = container.querySelector('#cameraPlaceholder');
    const photosDiv = container.querySelector('#cameraPhotos');
    const startBtn = container.querySelector('#cameraStart');
    const captureBtn = container.querySelector('#cameraCapture');
    const stopBtn = container.querySelector('#cameraStop');
    const clearBtn = container.querySelector('#cameraClear');

    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'user', width: 640, height: 480 },
                audio: false 
            });
            video.srcObject = stream;
            video.style.display = 'block';
            placeholder.style.display = 'none';
            isActive = true;
            startBtn.disabled = true;
            captureBtn.disabled = false;
            stopBtn.disabled = false;
            showToast('🎥 Camera started');
        } catch (err) {
            showToast('❌ Camera access denied');
            console.error('Camera error:', err);
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        video.srcObject = null;
        video.style.display = 'none';
        placeholder.style.display = 'flex';
        isActive = false;
        startBtn.disabled = false;
        captureBtn.disabled = true;
        stopBtn.disabled = true;
        showToast('⏹ Camera stopped');
    }

    function takePhoto() {
        if (!isActive) return;
        
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoUrl = canvas.toDataURL('image/png');
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        photoDiv.innerHTML = `
            <img src="${photoUrl}" class="photo-img" alt="Photo">
            <div class="photo-date">${new Date().toLocaleString()}</div>
            <button class="photo-delete">✕</button>
        `;
        
        photoDiv.querySelector('.photo-delete').addEventListener('click', () => {
            photoDiv.remove();
            if (photosDiv.querySelectorAll('.photo-item').length === 0) {
                photosDiv.innerHTML = '<div class="photo-placeholder">📷 No photos yet</div>';
            }
            showToast('🗑 Photo deleted');
        });
        
        const placeholder = photosDiv.querySelector('.photo-placeholder');
        if (placeholder) placeholder.remove();
        photosDiv.insertBefore(photoDiv, photosDiv.firstChild);
        
        // Flash effect
        const flash = document.createElement('div');
        flash.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:white;opacity:0.5;pointer-events:none;transition:opacity 0.3s';
        const preview = container.querySelector('.camera-preview');
        preview.style.position = 'relative';
        preview.appendChild(flash);
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);
        }, 50);
        
        showToast('📸 Photo taken!');
    }

    function clearAll() {
        photosDiv.innerHTML = '<div class="photo-placeholder">📷 No photos yet</div>';
        showToast('🗑 All photos cleared');
    }

    // Event listeners
    startBtn.addEventListener('click', startCamera);
    stopBtn.addEventListener('click', stopCamera);
    captureBtn.addEventListener('click', takePhoto);
    clearBtn.addEventListener('click', clearAll);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        if (e.key === 'Enter' || e.key === ' ') {
            if (isActive) takePhoto();
        }
        if (e.key === 'Escape' && isActive) stopCamera();
    });

    // Clean up on window close
    return () => {
        if (stream) stopCamera();
    };
}