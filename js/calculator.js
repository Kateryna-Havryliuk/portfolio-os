// js/calculator.js

import { showToast, storageGet, storageSet } from './utils.js';

let current = '0';
let prev = null;
let op = null;
let waiting = false;
let history = [];

export function render() {
    return `
        <div class="calc-content">
            <div class="calc-display" id="calcDisplay">0</div>
            <div class="calc-buttons">
                <div class="calc-btn" data-calc="7">7</div>
                <div class="calc-btn" data-calc="8">8</div>
                <div class="calc-btn" data-calc="9">9</div>
                <div class="calc-btn calc-op" data-calc="/">÷</div>
                
                <div class="calc-btn" data-calc="4">4</div>
                <div class="calc-btn" data-calc="5">5</div>
                <div class="calc-btn" data-calc="6">6</div>
                <div class="calc-btn calc-op" data-calc="*">×</div>
                
                <div class="calc-btn" data-calc="1">1</div>
                <div class="calc-btn" data-calc="2">2</div>
                <div class="calc-btn" data-calc="3">3</div>
                <div class="calc-btn calc-op" data-calc="-">−</div>
                
                <div class="calc-btn" data-calc="0">0</div>
                <div class="calc-btn" data-calc="00">00</div>
                <div class="calc-btn" data-calc=".">.</div>
                <div class="calc-btn calc-op" data-calc="+">+</div>
                
                <div class="calc-btn calc-clear" data-calc="C">C</div>
                <div class="calc-btn calc-clear" data-calc="CE">CE</div>
                <div class="calc-btn calc-equal" data-calc="=">=</div>
            </div>
            <div class="calc-history" id="calcHistory"></div>
        </div>
    `;
}

export function init(container) {
    const display = container.querySelector('#calcDisplay');
    const historyEl = container.querySelector('#calcHistory');
    
    // Load history
    history = storageGet('calcHistory', []);
    updateHistory();

    container.querySelectorAll('[data-calc]').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.dataset.calc;
            handleInput(val);
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        const key = e.key;
        if (key >= '0' && key <= '9') handleInput(key);
        else if (key === '.') handleInput('.');
        else if (key === '+') handleInput('+');
        else if (key === '-') handleInput('-');
        else if (key === '*') handleInput('*');
        else if (key === '/') handleInput('/');
        else if (key === 'Enter' || key === '=') handleInput('=');
        else if (key === 'Escape' || key === 'c' || key === 'C') handleInput('C');
        else if (key === 'Backspace') handleInput('CE');
    });

    function handleInput(val) {
        if (val === 'C') {
            current = '0';
            prev = null;
            op = null;
            waiting = false;
            updateDisplay();
            return;
        }

        if (val === 'CE') {
            current = '0';
            updateDisplay();
            return;
        }

        if (val === '=') {
            if (op && prev !== null) {
                calculate();
            }
            return;
        }

        if (val === '+' || val === '-' || val === '*' || val === '/') {
            if (op && !waiting) {
                calculate();
            }
            prev = current;
            op = val;
            waiting = true;
            return;
        }

        // Number or decimal
        if (waiting) {
            current = val === '.' ? '0.' : val;
            waiting = false;
        } else {
            if (val === '.' && current.includes('.')) return;
            if (val === '00' && current === '0') return;
            current = current === '0' && val !== '.' ? val : current + val;
        }
        updateDisplay();
    }

    function calculate() {
        const a = parseFloat(prev);
        const b = parseFloat(current);
        let result;
        let symbol;

        switch (op) {
            case '+': result = a + b; symbol = '+'; break;
            case '-': result = a - b; symbol = '−'; break;
            case '*': result = a * b; symbol = '×'; break;
            case '/': 
                if (b === 0) {
                    result = 'Error';
                    showToast('❌ Division by zero!');
                } else {
                    result = a / b;
                }
                symbol = '÷';
                break;
            default: result = b;
        }

        const calcStr = `${prev} ${symbol} ${current} = ${result}`;
        addToHistory(calcStr);

        current = result.toString();
        prev = null;
        op = null;
        waiting = true;
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = current;
        display.scrollLeft = display.scrollWidth;
    }

    function addToHistory(calc) {
        history.unshift(calc);
        if (history.length > 20) history.pop();
        storageSet('calcHistory', history);
        updateHistory();
    }

    function updateHistory() {
        if (historyEl) {
            if (history.length === 0) {
                historyEl.innerHTML = '<div class="history-item empty">📭 No history</div>';
            } else {
                historyEl.innerHTML = history.map(h => 
                    `<div class="history-item">${h}</div>`
                ).join('');
            }
        }
    }
}