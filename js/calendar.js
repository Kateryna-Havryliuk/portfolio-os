// js/calendar.js

import { showToast, storageGet, storageSet } from './utils.js';

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

export function render() {
    return `
        <div class="calendar-content">
            <div class="calendar-header">
                <button id="prevMonth">◀</button>
                <h3 id="currentMonthYear">${currentYear}年 ${(currentMonth + 1).toString().padStart(2, '0')}月</h3>
                <button id="nextMonth">▶</button>
                <button id="todayBtn">📅 Today</button>
            </div>
            <div class="calendar-grid" id="calendarGrid"></div>
            <div class="events-section">
                <div class="events-header">📝 Події на <span id="selectedDateDisplay">сьогодні</span></div>
                <div class="events-list" id="eventsList"></div>
                <div class="add-event">
                    <input type="text" id="eventInput" placeholder="Нова подія..." maxlength="50">
                    <input type="date" id="eventDate">
                    <button id="addEventBtn">➕ Додати</button>
                </div>
            </div>
        </div>
    `;
}

export function init(container) {
    renderCalendar(container);
    renderEvents(container);
    setupEventHandlers(container);
}

function getEvents() {
    return storageGet('calendarEvents', {});
}

function saveEvents(events) {
    storageSet('calendarEvents', events);
}

function renderCalendar(container) {
    const grid = container.querySelector('#calendarGrid');
    const monthYear = container.querySelector('#currentMonthYear');
    
    if (!grid) return;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const events = getEvents();

    monthYear.textContent = `${currentYear}年 ${(currentMonth + 1).toString().padStart(2, '0')}月`;

    const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];
    let html = weekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('');

    const startOffset = startDay === 0 ? 6 : startDay - 1;

    // Previous month days
    for (let i = 0; i < startOffset; i++) {
        const dayNum = prevMonthDays - startOffset + i + 1;
        const dateKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
        html += `<div class="calendar-day other-month" data-date="${dateKey}">
            <div class="day-number">${dayNum}</div>
        </div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
        const dayEvents = events[dateKey] || [];
        
        html += `<div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateKey}">
            <div class="day-number">${day}</div>
            ${dayEvents.length > 0 ? `<div class="day-dot">•</div>` : ''}
            <div class="day-events">
                ${dayEvents.slice(0, 2).map(e => `<div class="day-event" title="${e}">📌 ${e.substring(0, 12)}${e.length > 12 ? '...' : ''}</div>`).join('')}
                ${dayEvents.length > 2 ? `<div class="day-event more">+${dayEvents.length - 2} more</div>` : ''}
            </div>
        </div>`;
    }

    // Next month days
    const totalCells = 42;
    const remainingCells = totalCells - (startOffset + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        const dateKey = `${currentYear}-${(currentMonth + 2).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        html += `<div class="calendar-day other-month" data-date="${dateKey}">
            <div class="day-number">${i}</div>
        </div>`;
    }

    grid.innerHTML = html;

    // Click on day
    grid.querySelectorAll('.calendar-day').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            const date = dayEl.dataset.date;
            if (date && !dayEl.classList.contains('other-month')) {
                grid.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                dayEl.classList.add('selected');
                selectedDate = date;
                renderEvents(container);
                
                const displayEl = container.querySelector('#selectedDateDisplay');
                if (displayEl) {
                    const parts = date.split('-');
                    displayEl.textContent = `${parts[2]}.${parts[1]}.${parts[0]}`;
                }
            }
        });
    });
}

function renderEvents(container) {
    const list = container.querySelector('#eventsList');
    if (!list) return;

    const events = getEvents();
    const date = selectedDate || Object.keys(events)[0] || null;
    
    if (!date || !events[date] || events[date].length === 0) {
        list.innerHTML = '<div class="event-item empty">📭 Немає подій на цей день</div>';
        return;
    }

    list.innerHTML = events[date].map((event, index) => `
        <div class="event-item" data-event-index="${index}">
            <span>📌 ${event}</span>
            <button class="event-delete" data-date="${date}" data-index="${index}">✕</button>
        </div>
    `).join('');

    // Delete events
    list.querySelectorAll('.event-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = btn.dataset.date;
            const idx = parseInt(btn.dataset.index);
            const allEvents = getEvents();
            if (allEvents[d]) {
                allEvents[d].splice(idx, 1);
                if (allEvents[d].length === 0) delete allEvents[d];
                saveEvents(allEvents);
                renderCalendar(container);
                renderEvents(container);
                showToast('🗑 Подію видалено');
            }
        });
    });
}

function setupEventHandlers(container) {
    // Month navigation
    const prevBtn = container.querySelector('#prevMonth');
    const nextBtn = container.querySelector('#nextMonth');
    const todayBtn = container.querySelector('#todayBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            selectedDate = null;
            renderCalendar(container);
            renderEvents(container);
            const displayEl = container.querySelector('#selectedDateDisplay');
            if (displayEl) displayEl.textContent = 'сьогодні';
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            selectedDate = null;
            renderCalendar(container);
            renderEvents(container);
            const displayEl = container.querySelector('#selectedDateDisplay');
            if (displayEl) displayEl.textContent = 'сьогодні';
        });
    }

    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            const now = new Date();
            currentMonth = now.getMonth();
            currentYear = now.getFullYear();
            const todayStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
            selectedDate = todayStr;
            renderCalendar(container);
            renderEvents(container);
            const displayEl = container.querySelector('#selectedDateDisplay');
            if (displayEl) displayEl.textContent = 'сьогодні';
        });
    }

    // Add event
    const addBtn = container.querySelector('#addEventBtn');
    const eventInput = container.querySelector('#eventInput');
    const eventDate = container.querySelector('#eventDate');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const event = eventInput.value.trim();
            const date = eventDate.value || selectedDate;
            
            if (!event) {
                showToast('❌ Введіть текст події');
                return;
            }
            if (!date) {
                showToast('❌ Оберіть дату');
                return;
            }

            const allEvents = getEvents();
            if (!allEvents[date]) allEvents[date] = [];
            allEvents[date].push(event);
            saveEvents(allEvents);
            
            eventInput.value = '';
            selectedDate = date;
            renderCalendar(container);
            renderEvents(container);
            showToast(`✅ Подію додано на ${date}`);
        });
    }

    // Enter key
    if (eventInput) {
        eventInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addBtn.click();
        });
    }

    // Set default date
    if (eventDate) {
        const now = new Date();
        eventDate.value = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    }
}