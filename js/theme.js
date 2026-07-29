// js/theme.js
export function initTheme() {
    const saved = localStorage.getItem('systemTheme') || 'classic';
    document.body.setAttribute('data-system-theme', saved);
    
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const theme = opt.dataset.theme;
            document.body.setAttribute('data-system-theme', theme);
            localStorage.setItem('systemTheme', theme);
            document.getElementById('themeMenu').classList.remove('show');
        });
    });
}