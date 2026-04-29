
/* ════════════════════════════════════════
   ОБРАБОТКА ВХОДА
════════════════════════════════════════ */
function handleLogin(e) {
    e.preventDefault();

    const login    = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();
    const btn      = document.querySelector('.btn-login');

    if (!login || !password) {
        shakeCard();
        showError('Заполните все поля');
        return;
    }

    /* Состояние загрузки */
    btn.disabled = true;
    btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
             style="animation: spin 0.8s linear infinite;">
            <line x1="12" y1="2" x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
            <line x1="2" y1="12" x2="6" y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
        </svg>
        Вход...`;

    /* Добавляем CSS анимацию спиннера */
    if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    /* Переход на главную */
    setTimeout(() => {
        window.location.href = 'main.html';
    }, 800);
}

/* Анимация тряски при ошибке */
function shakeCard() {
    const card = document.querySelector('.login-card');
    card.style.animation = 'none';

    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%       { transform: translateX(-8px); }
                40%       { transform: translateX(8px); }
                60%       { transform: translateX(-5px); }
                80%       { transform: translateX(5px); }
            }`;
        document.head.appendChild(style);
    }

    requestAnimationFrame(() => {
        card.style.animation = 'shake 0.4s ease';
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        }, { once: true });
    });
}

/* Показ ошибки под формой */
function showError(msg) {
    let err = document.getElementById('login-error');
    if (!err) {
        err = document.createElement('div');
        err.id = 'login-error';
        err.style.cssText = `
            margin-top: 14px;
            padding: 10px 14px;
            background: #fff5f5;
            border: 1px solid #fed7d7;
            border-radius: 6px;
            font-size: 13px;
            color: #c53030;
            display: flex;
            align-items: center;
            gap: 8px;`;
        err.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg><span>${msg}</span>`;
        document.querySelector('form').appendChild(err);
    } else {
        err.querySelector('span').textContent = msg;
        err.style.display = 'flex';
    }

    setTimeout(() => { if (err) err.style.display = 'none'; }, 3000);
}

/* Скрываем ошибку при вводе */
document.addEventListener('DOMContentLoaded', () => {
    ['login', 'password'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const err = document.getElementById('login-error');
            if (err) err.style.display = 'none';
        });
    });
});
