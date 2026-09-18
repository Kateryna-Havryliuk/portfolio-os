// js/contact.js
export function render() {
    return `
        <div class="contact-retro">
            <div class="contact-item">
                <span class="contact-icon">📧</span>
                <a href="mailto:katyagko2004@gmail.com">katyagko2004@gmail.com</a>
                <span class="copy-hint" data-copy="katyagko2004@gmail.com">[copy]</span>
            </div>
            <div class="contact-item">
                <span class="contact-icon">⌨️</span>
                <a href="https://github.com/kateryna-havryliuk" target="_blank">github.com/kateryna-havryliuk</a>
                <span class="copy-hint" data-copy="https://github.com/kateryna-havryliuk">[copy]</span>
            </div>
            <div class="contact-item">
                <span class="contact-icon">⎔</span>
                <a href="https://linkedin.com/in/kateryna-havryliuk-link" target="_blank">linkedin.com/in/kateryna-havryliuk-link</a>
                <span class="copy-hint" data-copy="https://linkedin.com/in/kateryna-havryliuk-link">[copy]</span>
            </div>
            <div class="retro-divider"></div>
            <div class="status-line"><span class="led led-green"></span> STATUS: ONLINE · OPEN FOR WORK</div>
            <div class="status-line"><span class="led led-blue"></span> LOCATION: Lutsk, Ukraine</div>
            <div class="status-line"><span class="led led-yellow"></span> RESPONSE: &lt; 24h</div>
        </div>
    `;
}

export function init(container) {
    container.querySelectorAll('.copy-hint').forEach(el => {
        el.addEventListener('click', async () => {
            const text = el.dataset.copy;
            if (text) {
                try {
                    await navigator.clipboard.writeText(text);
                    const toast = document.getElementById('clipboardToast');
                    if (toast) {
                        toast.textContent = '📋 Copied!';
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 1500);
                    }
                } catch(e) {}
            }
        });
    });
}
