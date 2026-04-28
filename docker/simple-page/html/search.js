
/* ════════════════════════════════════════
   ГЕНЕРАЦИЯ КОДА ЕРУФР
════════════════════════════════════════ */
function generateErufr() {
    const chars  = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let suffix   = '';
    for (let i = 0; i < 8; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'P' + suffix;
}

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
/* ════════════════════════════════════════
   ХРАНИЛИЩЕ ФЛ в sessionStorage
════════════════════════════════════════ */

/** Читает всех сохранённых ФЛ из sessionStorage */
function getAllFL() {
    try {
        return JSON.parse(sessionStorage.getItem('fl_list') || '[]');
    } catch(e) {
        return [];
    }
}

/** Сохраняет массив ФЛ в sessionStorage */
function saveAllFL(list) {
    sessionStorage.setItem('fl_list', JSON.stringify(list));
}

/** Загружает поля текущего ФЛ из отдельных ключей (для обратной совместимости) */
function getCurrentFL() {
    const surname   = sessionStorage.getItem('fl_surname');
    if (!surname) return null;
    return {
        id        : sessionStorage.getItem('fl_id')        || Date.now().toString(),
        surname   : surname,
        name      : sessionStorage.getItem('fl_name')      || '',
        midname   : sessionStorage.getItem('fl_midname')   || '',
        inn       : sessionStorage.getItem('fl_inn')       || '—',
        snils     : sessionStorage.getItem('fl_snils')     || '—',
        dob       : sessionStorage.getItem('fl_dob')       || '—',
        place     : sessionStorage.getItem('fl_place')     || '—',
        gender    : sessionStorage.getItem('fl_gender')    || '',
        createdAt : sessionStorage.getItem('fl_createdAt') || '',
        status    : 'Активен',
    };
}

/* ════════════════════════════════════════
   ПОИСК / ОЧИСТКА
════════════════════════════════════════ */
function handleSearch() {
    const countEl = document.getElementById('resultsCount');
    const body    = document.getElementById('resultsBody');

    /* ── Получаем фильтры ── */
    const filterSurname = (document.getElementById('search-surname')?.value || '').trim().toLowerCase();
    const filterName    = (document.getElementById('search-name')?.value    || '').trim().toLowerCase();
    const filterMidname = (document.getElementById('search-midname')?.value || '').trim().toLowerCase();
    const filterInn     = (document.getElementById('search-inn')?.value     || '').trim();
    const filterSnils   = (document.getElementById('search-snils')?.value   || '').trim();

    /* ── Список сохранённых ФЛ ── */
    const list = getAllFL();

    /* ── Фильтрация ── */
    const filtered = list.filter(p => {
        if (filterSurname && !p.surname.toLowerCase().includes(filterSurname)) return false;
        if (filterName    && !p.name.toLowerCase().includes(filterName))       return false;
        if (filterMidname && !p.midname.toLowerCase().includes(filterMidname)) return false;
        if (filterInn     && !(p.inn || '').includes(filterInn))               return false;
        if (filterSnils   && !(p.snils || '').includes(filterSnils))           return false;
        return true;
    });

    if (filtered.length === 0) {
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
                        <div class="table-empty-text">Ничего не найдено</div>
                        <div class="table-empty-hint">Попробуйте изменить параметры поиска</div>
                    </div>
                </td>
            </tr>`;
        countEl.textContent = 'Записей не найдено';
        return;
    }

    body.innerHTML = filtered.map((p, i) => {
        const fullName = [p.surname, p.name, p.midname].filter(v => v && v !== '—').join(' ');
        const snilsFmt = p.snils !== '—' ? p.snils : '—';
        return `
        <tr class="result-row" style="cursor:pointer;" onclick="openPerson('${p.id}')">
            <td>${i + 1}</td>
            <td><span class="link-like">${fullName}</span></td>
            <td>ФЛ</td>
            <td>${p.inn    || '—'}</td>
            <td>${snilsFmt}</td>
            <td>${p.erufr  || '—'}</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td><span class="status-badge ${p.status === 'Активен' ? 'status-active' : 'status-closed'}">${p.status}</span></td>
        </tr>`;
    }).join('');

    countEl.textContent = `Найдено записей: ${filtered.length}`;
}

/** Открывает карточку ФЛ по id */
function openPerson(id) {
    const list   = getAllFL();
    const person = list.find(p => p.id === id);
    if (!person) return;

    /* Кладём поля в sessionStorage — person.html их читает */
    sessionStorage.setItem('fl_id',        person.id);
    sessionStorage.setItem('fl_erufr',     person.erufr  || '—');
    sessionStorage.setItem('fl_surname',   person.surname);
    sessionStorage.setItem('fl_name',      person.name);
    sessionStorage.setItem('fl_midname',   person.midname);
    sessionStorage.setItem('fl_inn',       person.inn);
    sessionStorage.setItem('fl_snils',     person.snils);
    sessionStorage.setItem('fl_dob',       person.dob);
    sessionStorage.setItem('fl_place',     person.place);
    sessionStorage.setItem('fl_gender',    person.gender);
    sessionStorage.setItem('fl_createdAt', person.createdAt);

    window.location.href = 'person.html';
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
    switchMyTab(1);
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
    document.querySelectorAll('.my-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.my-tab-content').forEach(c => c.classList.remove('active'));

    document.getElementById('my-tab-btn-' + num).classList.add('active');
    document.getElementById('my-tab-content-' + num).classList.add('active');

    const footer1 = document.getElementById('modal-footer-1');
    const footer2 = document.getElementById('modal-footer-2');

    if (num === 1) {
        footer1.classList.remove('hidden');
        footer2.classList.add('hidden');
    } else {
        footer1.classList.add('hidden');
        footer2.classList.remove('hidden');
        fillCreateFormFromVerify();
    }
}

/* ════════════════════════════════════════
   ПЕРЕНОС ДАННЫХ: ПРОВЕРКА → СОЗДАНИЕ
════════════════════════════════════════ */
function fillCreateFormFromVerify() {
    const surname = document.getElementById('verify-surname').value.trim();
    const name    = document.getElementById('verify-name').value.trim();
    const midname = document.getElementById('verify-midname').value.trim();
    const inn     = document.getElementById('verify-inn').value.trim();
    const snils   = document.getElementById('verify-snils').value.trim();

    if (surname) document.getElementById('fl-surname').value = surname;
    if (name)    document.getElementById('fl-name').value    = name;
    if (midname) document.getElementById('fl-midname').value = midname;
    if (inn)     document.getElementById('fl-inn').value     = inn;
    if (snils)   document.getElementById('fl-snils').value   = snils;
}

/* ════════════════════════════════════════
   СОХРАНЕНИЕ ФЛ → sessionStorage → person.html
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

    /* ── Формируем объект нового ФЛ ── */
    const newPerson = {
        id        : Date.now().toString(),
        erufr     : generateErufr(),
        surname   : surname,
        name      : name,
        midname   : midname   || '',
        inn       : inn       || '—',
        snils     : snils     || '—',
        dob       : dob       || '—',
        place     : place     || '—',
        gender    : gender,
        createdAt : new Date().toLocaleDateString('ru-RU'),
        status    : 'Активен',
    };

    /* ── Добавляем в общий список ── */
    const list = getAllFL();
    list.push(newPerson);
    saveAllFL(list);

    /* ── Также пишем в отдельные ключи — person.html их читает ── */
    sessionStorage.setItem('fl_id',        newPerson.id);
    sessionStorage.setItem('fl_erufr',     newPerson.erufr);
    sessionStorage.setItem('fl_surname',   newPerson.surname);
    sessionStorage.setItem('fl_name',      newPerson.name);
    sessionStorage.setItem('fl_midname',   newPerson.midname);
    sessionStorage.setItem('fl_inn',       newPerson.inn);
    sessionStorage.setItem('fl_snils',     newPerson.snils);
    sessionStorage.setItem('fl_dob',       newPerson.dob);
    sessionStorage.setItem('fl_place',     newPerson.place);
    sessionStorage.setItem('fl_gender',    newPerson.gender);
    sessionStorage.setItem('fl_createdAt', newPerson.createdAt);

    window.location.href = 'person.html';
}
