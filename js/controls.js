// js/controls.js
export function initQualityAndFontControls() {
    // Quality toggle
    const qualityBtn = document.getElementById('qualityBtn');
    const qualityText = document.getElementById('qualityText');
    const crtOff = localStorage.getItem('crtOff') === 'true';
    
    if (crtOff) {
        document.body.classList.add('crt-off');
        if (qualityText) qualityText.textContent = 'SD';
    }
    
    if (qualityBtn) {
        qualityBtn.addEventListener('click', () => {
            const isOff = document.body.classList.toggle('crt-off');
            localStorage.setItem('crtOff', isOff);
            if (qualityText) qualityText.textContent = isOff ? 'SD' : 'HD';
            showToast(isOff ? '📺 CRT effects OFF' : '📺 CRT effects ON');
        });
    }
    
    // Font size
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    document.body.classList.add(`font-${savedSize}`);
    
    document.querySelectorAll('.font-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === savedSize);
        
        btn.addEventListener('click', () => {
            const size = btn.dataset.size;
            document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
            document.body.classList.add(`font-${size}`);
            localStorage.setItem('fontSize', size);
            document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function showToast(msg) {
    const toast = document.getElementById('clipboardToast');
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}