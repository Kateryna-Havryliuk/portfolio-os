// js/utils.js

// Toast notification
export function showToast(message) {
    const toast = document.getElementById('clipboardToast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

// Generate unique ID
export function generateId() { 
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); 
}

// Escape HTML
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// LocalStorage helpers
export function storageGet(key, fallback) {
    try { 
        const val = localStorage.getItem(key); 
        return val ? JSON.parse(val) : fallback; 
    } catch { 
        return fallback; 
    }
}

export function storageSet(key, value) { 
    localStorage.setItem(key, JSON.stringify(value)); 
}

// Copy to clipboard
export async function copyToClipboard(text) {
    try { 
        await navigator.clipboard.writeText(text); 
        showToast('📋 Copied!');
    } catch { 
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        showToast('📋 Copied!');
    }
}

// ⭐ ДОДАЄМО ЦЮ ФУНКЦІЮ
export function initClipboard() {
    document.querySelectorAll('[data-copy]').forEach(el => {
        el.addEventListener('click', () => {
            const text = el.dataset.copy;
            if (text) copyToClipboard(text);
        });
    });
}