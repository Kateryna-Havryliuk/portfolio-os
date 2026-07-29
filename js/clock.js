// js/clock.js
export function initClock() {
    const clock = document.getElementById('taskbarClock');
    if (!clock) return;
    function update() {
        clock.textContent = new Date().toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    update();
    setInterval(update, 1000);
}