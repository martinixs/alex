
/* ════════════════════════════════════════
   ОСНОВНЫЕ ВКЛАДКИ СТРАНИЦЫ
════════════════════════════════════════ */
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('active');
}

/* ════════════════════════════════════════
   ПЕРЕКЛЮЧЕНИЕ ЮЛ / ФЛ
════════════════════════════════════════ */
function switchPersonType(type) {
    document.querySelectorAll('.form-block').forEach(f => f.classList.remove('active'));
    document.getElementById('form-' + type).classList.add('active');

    const residencyBlock = document.getElementById('residency-block');
    if (type === 'fl') {
        residencyBlock.classList.add('hidden');
    } else {
        residencyBlock.classList.remove('hidden');
    }
}

/* ════════════════════════════════════════
   ПОИСК / ОЧИСТКА
════════════════════════════════════════ */
function handleSearch() {
    const countEl = document.getElementById('resultsCount');
    const body    = document.getElementById('resultsBody');

    const demoData = [
        { n: 1, name: 'ООО «Ромашка»',        type: 'ЮЛ', inn: '7701234567',   ogrn: '1027700123456',  kode: 'RU001', res: 'Резидент', acc: '№ 100001', ufr: 'Тип 1', status: 'Активен' },
        { n: 2, name: 'Иванов Иван Иванович',  type: 'ФЛ', inn: '526317898760', ogrn: '123-456-789 00', kode: 'RU002', res: 'Резидент', acc: '№ 100002', ufr: 'Тип 2', status: 'Активен' },
        { n: 3, name: 'ИП Петров П.П.',        type: 'ФЛ', inn: '503456789012', ogrn: '987-654-321 00', kode: 'RU003', res: 'Резидент', acc: '№ 100003', ufr: 'Тип 1', status: 'Закрыт'  },
    ];

    body.innerHTML = demoData.map(r => `
        <tr>
            <td>${r.n}</td>
            <td>${r.name}</td>
            <td>${r.type}</td>
            <td>${r.inn}</td>
            <td>${r.ogrn}</td>
            <td>${r.kode}</td>
            <td>${r.res}</td>
            <td>${r.acc}</td>
            <td>${r.ufr}</td>
            <td><span class="status-badge ${r.status === 'Активен' ? 'status-active' : 'status-closed'}">${r.status}</span></td>
        </tr>
    `).join('');

    countEl.textContent = `Найдено записей: ${demoData.length}`;
}

function handleClear() {
    document.querySelectorAll('.form-input').forEach(i => i.value = '');
    document.querySelectorAll('.form-select').forEach(s => s.selectedIndex = 0);
    document.querySelectorAll('.checkbox-row input[type="checkbox"]').forEach(c => c.checked = false);

    const body    = document.getElementById('resultsBody');
    const countEl = document.getElementById('resultsCount');

    body.innerHTML = `
        <tr>
            <td colspan="10">
                <div class="table-empty">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
                         stroke="#cbd5e0" stroke-width="1.5"
                         stroke-linecap="round" stroke-linejoin="round"
                         style="margin-bottom:8px;">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <div class="table-empty-text">Нет данных для отображения</div>
                    <div class="table-empty-hint">Введите параметры поиска и нажмите «Найти»</div>
                </div>
            </td>
        </tr>`;

    countEl.textContent = 'Записей не найдено';
}

/* ════════════════════════════════════════
   МОДАЛЬНОЕ ОКНО — ОТКРЫТИЕ / ЗАКРЫТИЕ
════════════════════════════════════════ */
function openModalFL() {
    const overlay = document.getElementById('modalOverlayFL');
    overlay.classList.add('open');
    // Всегда открываем с первой вкладки
    switchMyTab(1);
    // Сбрасываем поля проверки
    ['verify-surname','verify-name','verify-midname','verify-inn','verify-snils'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('verify-history').checked = false;
    document.getElementById('verify-rufr').checked    = false;
}

function closeModalFL() {
    document.getElementById('modalOverlayFL').classList.remove('open');
}

function handleOverlayClickFL(event) {
    if (event.target === document.getElementById('modalOverlayFL')) {
        closeModalFL();
    }
}

/* ════════════════════════════════════════
   ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК МОДАЛЬНОГО ОКНА
════════════════════════════════════════ */
function switchMyTab(num) {
    // Активируем нужную вкладку в сайдбаре
    document.querySelectorAll('.my-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.my-tab-content').forEach(c => c.classList.remove('active'));

    document.getElementById('my-tab-btn-' + num).classList.add('active');
    document.getElementById('my-tab-content-' + num).classList.add('active');

    // Переключаем футер
    const footer1 = document.getElementById('modal-footer-1');
    const footer2 = document.getElementById('modal-footer-2');

    if (num === 1) {
        footer1.classList.remove('hidden');
        footer2.classList.add('hidden');
    } else {
        footer1.classList.add('hidden');
        footer2.classList.remove('hidden');
        // Переносим данные из формы проверки в форму создания
        fillCreateFormFromVerify();
    }
}

/* ════════════════════════════════════════
   ПЕРЕНОС ДАННЫХ: ПРОВЕРКА → СОЗДАНИЕ
════════════════════════════════════════ */
function fillCreateFormFromVerify() {
    const surname  = document.getElementById('verify-surname').value.trim();
    const name     = document.getElementById('verify-name').value.trim();
    const midname  = document.getElementById('verify-midname').value.trim();
    const inn      = document.getElementById('verify-inn').value.trim();
    const snils    = document.getElementById('verify-snils').value.trim();

    if (surname)  document.getElementById('fl-surname').value  = surname;
    if (name)     document.getElementById('fl-name').value     = name;
    if (midname)  document.getElementById('fl-midname').value  = midname;
    if (inn)      document.getElementById('fl-inn').value      = inn;
    if (snils)    document.getElementById('fl-snils').value    = snils;
}

/* ════════════════════════════════════════
   СОХРАНЕНИЕ ФЛ → ПЕРЕХОД НА person.html
════════════════════════════════════════ */
function saveFL() {
    const surname = document.getElementById('fl-surname').value.trim();
    const name    = document.getElementById('fl-name').value.trim();
    const midname = document.getElementById('fl-midname').value.trim();
    const inn     = document.getElementById('fl-inn').value.trim();
    const snils   = document.getElementById('fl-snils').value.trim();
    const dob     = document.getElementById('fl-dob').value;
    const place   = document.getElementById('fl-place').value.trim();
    const gender  = document.querySelector('input[name="fl-gender"]:checked')?.value || 'none';

    if (!surname || !name) {
        alert('Заполните обязательные поля: Фамилия и Имя');
        return;
    }

    const personData = {
        surname, name, midname, inn, snils, dob, place, gender,
        createdAt: new Date().toLocaleDateString('ru-RU')
    };

    sessionStorage.setItem('newPerson', JSON.stringify(personData));
    window.location.href = 'person.html';
}
