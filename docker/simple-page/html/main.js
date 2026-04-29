
/* ════════════════════════════════════════
   ПЕРЕКЛЮЧЕНИЕ ГЛАВНЫХ ВКЛАДОК
════════════════════════════════════════ */
function switchTab(tabName, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    btn.classList.add('active');
}

/* ════════════════════════════════════════
   ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ПАНЕЛИ
════════════════════════════════════════ */
function switchPanelTab(tabName, btn) {
    document.querySelectorAll('.panel-tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + tabName).classList.add('active');
    btn.classList.add('active');

    /* Показываем кнопку "Открыть" только на вкладке "О приложении" */
    const footer = document.getElementById('panelFooter');
    if (tabName === 'about') {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}

/* ════════════════════════════════════════
   ТЕКУЩЕЕ ПРИЛОЖЕНИЕ
════════════════════════════════════════ */
let currentApp = null;

/* ════════════════════════════════════════
   ОТКРЫТЬ БОКОВУЮ ПАНЕЛЬ
════════════════════════════════════════ */
function openPanel(title, stage) {
    currentApp = title;

    document.getElementById('panelTitle').textContent = title;
    document.getElementById('panelStage').textContent = stage;

    /* Сбрасываем на первую вкладку */
    switchPanelTab('about', document.querySelectorAll('.panel-tab-btn')[0]);

    document.getElementById('overlay').classList.add('open');
    document.getElementById('sidePanel').classList.add('open');
    document.body.style.overflow = 'hidden';
}

/* ════════════════════════════════════════
   ЗАКРЫТЬ БОКОВУЮ ПАНЕЛЬ
════════════════════════════════════════ */
function closePanel() {
    document.getElementById('overlay').classList.remove('open');
    document.getElementById('sidePanel').classList.remove('open');
    document.body.style.overflow = '';
}

/* ════════════════════════════════════════
   ЗАКРЫТИЕ ПО ESCAPE
════════════════════════════════════════ */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePanel();
});

/* ════════════════════════════════════════
   ОТКРЫТЬ ПРИЛОЖЕНИЕ
════════════════════════════════════════ */
function launchApp() {
    if (currentApp) {
        window.location.href = 'search.html';
    }
}
