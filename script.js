/* ============================================
   МАТЕМАТИКА В ИГРЕ — JavaScript
   Воспитатель: Хоменкова Юлия Сергеевна
   ГУО «Детский сад №84 г. Витебска»
   ============================================ */

'use strict';

// ===== КОНФИГУРАЦИЯ ИГР (Всего 31) =====
const GAMES = {
  kolichestvo: [
    {
      title: "Сосчитай до 10",
      url: "https://learningapps.org/watch?v=pe9276i2c26"
    },
    {
      title: "Найди соседей чисел",
      url: "https://learningapps.org/watch?v=pwjyr0byc26"
    },
    {
      title: "Больше, меньше или равно?",
      url: "https://learningapps.org/watch?v=pymgqfkz226"
    },
    {
      title: "Соотнеси количество предметов с цифрой",
      url: "https://learningapps.org/watch?v=p94k7pdnv26"
    },
    {
      title: "Посчитай-ка",
      url: "https://learningapps.org/watch?v=ptowczxk526"
    },
    {
      title: "Счёт предметов",
      url: "https://learningapps.org/watch?v=pq42949rn26"
    }
  ],
  velichina: [
    {
      title: "От маленького к большому",
      url: "https://learningapps.org/watch?v=p7tam8w0k26"
    },
    {
      title: "Выше, ниже, фрукты ближе.",
      url: "https://learningapps.org/watch?v=pwkei8cqk26"
    },
    {
      title: "«Башни» (Сериация по высоте)",
      url: "https://learningapps.org/watch?v=p1saih2e526"
    },
    {
      title: "Расставь матрёшек по высоте",
      url: "https://learningapps.org/watch?v=pw17eoiac26"
    },
    {
      title: "Какого размера животное?",
      url: "https://learningapps.org/watch?v=pvwjmd88n26"
    },
    {
      title: "Три медведя",
      url: "https://learningapps.org/watch?v=p0w7p8bz326"
    },
    {
      title: "Животные: от меньшего к большему",
      url: "https://learningapps.org/watch?v=ph1pgkqo326"
    }
  ],
  vremya: [
    {
      title: "Время суток: помоги Солнышку",
      url: "https://learningapps.org/watch?v=pxfr6e9jt26"
    },
    {
      title: "Части суток: найди пару",
      url: "https://learningapps.org/watch?v=pmi7g5thj26"
    },
    {
      title: "Каждому времени суток свои дела",
      url: "https://learningapps.org/watch?v=pum3zn77t26"
    },
    {
      title: "Время года",
      url: "https://learningapps.org/watch?v=pevvcbj6k26"
    },
    {
      title: "Времена года: Волшебное дерево",
      url: "https://learningapps.org/watch?v=pdmu0q61a26"
    },
    {
      title: "Когда это бывает? Времена года",
      url: "https://learningapps.org/watch?v=p8xetf3ft26"
    }
  ],
  prostranstvo: [
    { title: "Верх и низ",       url: null },
    { title: "Лево — право",     url: null },
    { title: "Найди по карте",   url: null }
  ],
  logika: [
    {
      title: "Логические связи",
      url: "https://learningapps.org/watch?v=py0onxm4t26"
    },
    {
      title: "Четвёртый лишний",
      url: "https://learningapps.org/watch?v=p5nvfwu2t26"
    },
    {
      title: "Из какого гнезда цыплята?",
      url: "https://learningapps.org/watch?v=pfjr2xwj326"
    },
    {
      title: "Что сначала, что потом",
      url: "https://learningapps.org/watch?v=pst3dwo5526"
    },
    {
      title: "Продолжи ряд...",
      url: "https://learningapps.org/watch?v=pzu7quynj26"
    },
    {
      title: "Что лишнее?",
      url: "https://learningapps.org/watch?v=p6ri82g6a26"
    }
  ],
  figury: [
    {
      title: "Круг и квадрат: на что похоже?",
      url: "https://learningapps.org/watch?v=p4fpa9yq326"
    },
    {
      title: "Какой формы предмет?",
      url: "https://learningapps.org/watch?v=paivm8crj26"
    },
    {
      title: "Геометрические формы: найди пару",
      url: "https://learningapps.org/watch?v=pykjttfyc26"
    },
    {
      title: "Многоугольники и фигуры без углов",
      url: "https://learningapps.org/watch?v=pkats1w8k26"
    },
    {
      title: "Плоские и объёмные фигуры",
      url: "https://learningapps.org/watch?v=ps7s457tc26"
    },
    {
      title: "Найди лишнюю фигуру",
      url: "https://learningapps.org/watch?v=pjwnhfbv526"
    }
  ]
};

let TOTAL_GAMES = 34;
const STORAGE_COMPLETED_KEY      = 'matematika_completed_games_v1';
const STORAGE_NAME_KEY           = 'matematika_child_name_v1';
const STORAGE_PROFILES_KEY       = 'matematika_profiles_list_v2';
const STORAGE_ACTIVE_PROFILE_KEY = 'matematika_active_profile_v2';

// ===== СОСТОЯНИЕ ПРОФИЛЕЙ И ИГР =====
let profiles        = [];
let activeProfileId = null;
let completedGames  = new Set();
let currentGameId   = null;

// ===== DOM ЭЛЕМЕНТЫ ПРОФИЛЕЙ =====
const profileSelect    = document.getElementById('profile-select');
const addProfileBtn    = document.getElementById('add-profile-btn');
const deleteProfileBtn = document.getElementById('delete-profile-btn');
const resetProfileBtn  = document.getElementById('reset-profile-btn');

// ===== МЕНЕДЖЕР ПРОФИЛЕЙ ДЕТЕЙ =====
function getProfileStorageKey(profileId) {
  return `matematika_profile_progress_${profileId}`;
}

function initProfiles() {
  try {
    const savedProfiles = localStorage.getItem(STORAGE_PROFILES_KEY);
    if (savedProfiles) {
      profiles = JSON.parse(savedProfiles);
    }
  } catch (e) {
    profiles = [];
  }

  // Если список пустой — мигрируем старое сохранённое имя или создаём Сашу по умолчанию
  if (!Array.isArray(profiles) || profiles.length === 0) {
    let initialName = 'Саша';
    try {
      const legacyName = localStorage.getItem(STORAGE_NAME_KEY);
      if (legacyName && legacyName.trim()) {
        initialName = legacyName.trim();
      }
    } catch (e) {}

    profiles = [{ id: 'child_1', name: initialName }];
    try {
      localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    } catch (e) {}
  }

  // Активный выбранный профиль
  try {
    activeProfileId = localStorage.getItem(STORAGE_ACTIVE_PROFILE_KEY);
  } catch (e) {}

  if (!activeProfileId || !profiles.some(p => p.id === activeProfileId)) {
    activeProfileId = profiles[0].id;
    try {
      localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, activeProfileId);
    } catch (e) {}
  }

  // Однократная миграция старого прогресса в первый профиль при инициализации
  const firstProfileKey = getProfileStorageKey(profiles[0].id);
  if (localStorage.getItem(firstProfileKey) === null) {
    try {
      const legacy = localStorage.getItem(STORAGE_COMPLETED_KEY);
      if (legacy) {
        localStorage.setItem(firstProfileKey, legacy);
      } else {
        localStorage.setItem(firstProfileKey, JSON.stringify([]));
      }
    } catch (e) {}
  }

  loadActiveProfileProgress();
  renderProfilesUI();
  setupProfilesEvents();
}

function loadActiveProfileProgress() {
  completedGames.clear();
  if (!activeProfileId) return;

  try {
    const profileKey = getProfileStorageKey(activeProfileId);
    const saved = localStorage.getItem(profileKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        completedGames = new Set(parsed);
      }
    }
  } catch (e) {
    console.warn('Ошибка загрузки прогресса профиля:', e);
  }

  // Синхронизируем имя в поле ввода диплома
  const active = profiles.find(p => p.id === activeProfileId);
  if (active && childNameInput) {
    childNameInput.value = active.name;
    try {
      localStorage.setItem(STORAGE_NAME_KEY, active.name);
    } catch (e) {}
  }

  // Зеркалируем в STORAGE_COMPLETED_KEY для обратной совместимости
  try {
    localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify([...completedGames]));
  } catch (e) {}
}

function saveActiveProfileProgress() {
  if (!activeProfileId) return;
  const arr = [...completedGames];
  try {
    localStorage.setItem(getProfileStorageKey(activeProfileId), JSON.stringify(arr));
    localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn('Ошибка сохранения прогресса профиля:', e);
  }
}

function renderProfilesUI() {
  if (!profileSelect) return;
  profileSelect.innerHTML = '';
  profiles.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    if (p.id === activeProfileId) {
      opt.selected = true;
    }
    profileSelect.appendChild(opt);
  });
}

function setupProfilesEvents() {
  if (profileSelect && !profileSelect.dataset.eventsBound) {
    profileSelect.dataset.eventsBound = 'true';
    profileSelect.addEventListener('change', (e) => {
      const newId = e.target.value;
      if (newId === activeProfileId) return;
      activeProfileId = newId;
      try {
        localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, activeProfileId);
      } catch (e) {}
      loadActiveProfileProgress();
      updateProgressUI();
      const current = profiles.find(p => p.id === activeProfileId);
      if (current) {
        showToast(`👤 Выбран ребёнок: ${current.name}`);
      }
    });
  }

  if (addProfileBtn && !addProfileBtn.dataset.eventsBound) {
    addProfileBtn.dataset.eventsBound = 'true';
    addProfileBtn.addEventListener('click', () => {
      const name = prompt('Введите имя нового ребёнка (например, Маша, Артём, София):');
      if (!name || !name.trim()) return;
      const cleanName = name.trim();
      const newId = 'child_' + Date.now();
      profiles.push({ id: newId, name: cleanName });
      activeProfileId = newId;
      try {
        localStorage.setItem(getProfileStorageKey(newId), JSON.stringify([]));
        localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
        localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, activeProfileId);
      } catch (e) {}
      loadActiveProfileProgress();
      renderProfilesUI();
      updateProgressUI();
      showToast(`✨ Добавлен ребёнок: ${cleanName}! Можно собирать звёздочки!`);
    });
  }

  if (deleteProfileBtn && !deleteProfileBtn.dataset.eventsBound) {
    deleteProfileBtn.dataset.eventsBound = 'true';
    deleteProfileBtn.addEventListener('click', () => {
      if (profiles.length <= 1) {
        showToast('⚠️ Нельзя удалить единственный профиль. Добавьте другой или измените имя!');
        return;
      }
      const current = profiles.find(p => p.id === activeProfileId);
      const name = current ? current.name : 'этого ребёнка';
      if (confirm(`Удалить профиль ребёнка «${name}» и все его звёздочки?`)) {
        try {
          localStorage.removeItem(getProfileStorageKey(activeProfileId));
        } catch (e) {}
        profiles = profiles.filter(p => p.id !== activeProfileId);
        activeProfileId = profiles[0].id;
        try {
          localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
          localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, activeProfileId);
        } catch (e) {}
        loadActiveProfileProgress();
        renderProfilesUI();
        updateProgressUI();
        showToast(`🗑️ Профиль «${name}» удалён.`);
      }
    });
  }

  if (resetProfileBtn && !resetProfileBtn.dataset.eventsBound) {
    resetProfileBtn.dataset.eventsBound = 'true';
    resetProfileBtn.addEventListener('click', () => {
      const current = profiles.find(p => p.id === activeProfileId);
      const name = current ? current.name : 'ребёнка';
      if (confirm(`Сбросить прогресс и звёздочки для «${name}», чтобы пройти игры заново?`)) {
        completedGames.clear();
        saveActiveProfileProgress();
        updateProgressUI();
        showToast(`↻ Прогресс для ${name} сброшен. Можно играть заново!`);
      }
    });
  }
}

// ===== DOM ЭЛЕМЕНТЫ МОДАЛЬНОГО ОКНА ИГРЫ =====
const overlay             = document.getElementById('modal-overlay');
const gameIframe          = document.getElementById('game-iframe');
const modalTitle          = document.getElementById('modal-title');
const modalSubtitle       = document.getElementById('modal-subtitle');
const modalGameIcon       = document.getElementById('modal-game-icon');
const modalClose          = document.getElementById('modal-close');
const soundToggleBtn      = document.getElementById('sound-toggle-btn');
const modalFinishBtn        = document.getElementById('modal-finish-game-btn');
const modalSolvedBanner   = document.getElementById('modal-solved-banner');
const modalSolvedBtn      = document.getElementById('modal-solved-btn');
const nativeGameContainer = document.getElementById('native-game-container');
const toast               = document.getElementById('toast');

// Всплывающие уведомления (Toast)
let toastTimer = null;
function showToast(message, duration = 3000) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
const navBtns             = document.querySelectorAll('.nav-btn');
const navBar              = document.getElementById('nav-bar');

// Прогресс
const progressBarFill    = document.getElementById('progress-bar-fill');
const progressPercent    = document.getElementById('progress-percent');
const progressSubtitle   = document.getElementById('progress-subtitle');
const progressHint       = document.getElementById('progress-hint');

// Диплом
const openDiplomaBtn     = document.getElementById('open-diploma-btn');
const diplomaOverlay     = document.getElementById('diploma-modal-overlay');
const diplomaClose       = document.getElementById('diploma-modal-close');
const childNameInput     = document.getElementById('child-name-input');
const updateDiplomaBtn   = document.getElementById('update-diploma-btn');
const downloadDiplomaBtn = document.getElementById('download-diploma-btn');
const printDiplomaBtn    = document.getElementById('print-diploma-btn');
const diplomaCanvas      = document.getElementById('diploma-canvas');

// Холст конфетти
const confettiCanvas     = document.getElementById('confetti-canvas');


// ============================================
// ЗВУКОВОЙ ДВИЖОК (Web Audio API)
// ============================================
const STORAGE_SOUND_KEY = 'matematika_sound_muted_v1';
let isSoundMuted = false;
try {
  isSoundMuted = localStorage.getItem(STORAGE_SOUND_KEY) === 'true';
} catch(e) {}

let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const SoundEffects = {
  playTone(freq, duration, type = 'sine', startTimeOffset = 0, gainLevel = 0.15) {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTimeOffset);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime + startTimeOffset);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTimeOffset + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + startTimeOffset);
      osc.stop(ctx.currentTime + startTimeOffset + duration);
    } catch (e) {}
  },
  correct() {
    this.playTone(523.25, 0.16, 'triangle', 0, 0.14);
    this.playTone(659.25, 0.16, 'triangle', 0.08, 0.14);
    this.playTone(783.99, 0.28, 'triangle', 0.16, 0.16);
  },
  wrong() {
    this.playTone(280, 0.15, 'sine', 0, 0.15);
    this.playTone(220, 0.22, 'sine', 0.10, 0.15);
  },
  victory() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.2, 'triangle', idx * 0.1, 0.14);
    });
    setTimeout(() => {
      this.playTone(1046.50, 0.5, 'sine', 0, 0.16);
      this.playTone(1318.51, 0.5, 'triangle', 0, 0.14);
    }, 450);
  },
  click() {
    this.playTone(440, 0.04, 'sine', 0, 0.08);
  }
};

function updateSoundButtonUI() {
  if (!soundToggleBtn) return;
  soundToggleBtn.textContent = isSoundMuted ? '🔇' : '🔊';
  soundToggleBtn.title = isSoundMuted ? 'Включить звук' : 'Выключить звук';
}

if (soundToggleBtn) {
  updateSoundButtonUI();
  soundToggleBtn.addEventListener('click', () => {
    isSoundMuted = !isSoundMuted;
    try {
      localStorage.setItem(STORAGE_SOUND_KEY, isSoundMuted);
    } catch (e) {}
    updateSoundButtonUI();
    if (!isSoundMuted) SoundEffects.correct();
  });
}


// ============================================
// 1. ИНИЦИАЛИЗАЦИЯ КАРТОЧЕК И ПРОГРЕССА
// ============================================
function initCards() {
  const sections = {
    kolichestvo:  document.getElementById('kolichestvo'),
    velichina:    document.getElementById('velichina'),
    vremya:       document.getElementById('vremya'),
    prostranstvo: document.getElementById('prostranstvo'),
    logika:       document.getElementById('logika'),
    figury:       document.getElementById('figury')
  };

  Object.entries(sections).forEach(([key, section]) => {
    if (!section) return;
    const cards = section.querySelectorAll('.game-card');
    const games = GAMES[key] || [];

    cards.forEach((card, i) => {
      const game = games[i];
      if (!game) return;

      const gameId = `${key}_${i}`;
      card.dataset.gameId = gameId;
      card.dataset.iframe = game.url || 'PLACEHOLDER';

      const titleEl = card.querySelector('.game-title');
      if (titleEl && game.title) titleEl.textContent = game.title;
    });
  });

  // Восстанавливаем имя ребёнка
  try {
    const savedName = localStorage.getItem(STORAGE_NAME_KEY);
    if (savedName && childNameInput) {
      childNameInput.value = savedName;
    }
  } catch (e) {}

  updateProgressUI();
}

// Обновление шкалы прогресса и бейджей на карточках
function updateProgressUI() {
  const allCards = document.querySelectorAll('.game-card');
  if (allCards.length > 0) TOTAL_GAMES = allCards.length;

  const count = completedGames.size;
  const percent = Math.min(100, Math.round((count / TOTAL_GAMES) * 100));

  if (progressPercent)  progressPercent.textContent  = `${percent}%`;
  if (progressBarFill)  progressBarFill.style.width  = `${percent}%`;
  if (progressSubtitle) progressSubtitle.textContent = `Пройдено ${count} из ${TOTAL_GAMES} игр`;

  if (progressHint) {
    if (count === 0) {
      progressHint.textContent = '🎯 Проходи игры по очереди, чтобы заполнить шкалу и открыть диплом!';
    } else if (count < TOTAL_GAMES) {
      progressHint.textContent = `🔥 Отличный темп! Пройдено: ${count} из ${TOTAL_GAMES}. Осталось: ${TOTAL_GAMES - count}`;
    } else {
      progressHint.textContent = '🏆 УРА! Все игры пройдены! Твой диплом разблокирован!';
    }
  }

  // Блокировка/разблокировка кнопки диплома
  if (openDiplomaBtn) {
    if (count < TOTAL_GAMES) {
      openDiplomaBtn.classList.remove('unlocked');
      openDiplomaBtn.classList.add('locked');
      openDiplomaBtn.innerHTML = `<span>🔒</span> Диплом (${count}/${TOTAL_GAMES})`;
    } else {
      openDiplomaBtn.classList.remove('locked');
      openDiplomaBtn.classList.add('unlocked');
      openDiplomaBtn.innerHTML = `<span>🏆</span> Получить диплом!`;
    }
  }

  // Обновляем карточки игр
  document.querySelectorAll('.game-card').forEach(card => {
    const gameId = card.dataset.gameId;
    const isDone = completedGames.has(gameId);
    const topBar = card.querySelector('.game-card-top');
    const numSpan = topBar ? topBar.querySelector('.game-number') : null;
    const playBtn = card.querySelector('.play-btn');

    if (numSpan) {
      const originalText = numSpan.dataset.originalText || numSpan.textContent.replace('✓', '').trim();
      numSpan.dataset.originalText = originalText;

      if (isDone) {
        card.classList.add('completed');
        numSpan.innerHTML = `<span class="done-check">✓</span> ${originalText}`;
        if (playBtn) playBtn.textContent = '↻ Играть снова';
      } else {
        card.classList.remove('completed');
        numSpan.textContent = originalText;
        if (playBtn) playBtn.textContent = '▶ Играть';
      }
    }
  });
}


// ============================================
// 2. ДАННЫЕ И ЛОГИКА НАТИВНЫХ ИГР
// ============================================

// --- ИГРА 1: «ВЕСЁЛЫЙ СЧЁТ» ---
const GAME1_DATA = {
  id: 'kolichestvo_0',
  title: 'Весёлый счёт',
  task: 'Посмотри на картинку и выбери правильное количество предметов. Считай внимательно!',
  questions: [
    { img: 'assets/games/game1/q1.jpg', correct: 6,  options: [8, 6, 7, 5] },
    { img: 'assets/games/game1/q2.jpg', correct: 8,  options: [4, 7, 9, 8] },
    { img: 'assets/games/game1/q3.jpg', correct: 5,  options: [5, 1, 3, 6] },
    { img: 'assets/games/game1/q4.jpg', correct: 9,  options: [8, 9, 2, 7] },
    { img: 'assets/games/game1/q5.jpg', correct: 2,  options: [4, 1, 2, 6] },
    { img: 'assets/games/game1/q6.jpg', correct: 10, options: [8, 5, 9, 10] },
    { img: 'assets/games/game1/q7.jpg', correct: 7,  options: [5, 9, 7, 1] },
    { img: 'assets/games/game1/q8.jpg', correct: 1,  options: [1, 3, 4, 2] },
    { img: 'assets/games/game1/q9.jpg', correct: 3,  options: [7, 9, 3, 2] },
    { img: 'assets/games/game1/q10.jpg', correct: 4, options: [6, 5, 4, 1] }
  ]
};

let game1State = {
  currentIdx: 0
};

function startNativeGame1() {
  game1State.currentIdx = 0;
  renderNativeGame1Question();
}

function renderNativeGame1Question() {
  if (!nativeGameContainer) return;
  const q = GAME1_DATA.questions[game1State.currentIdx];
  const total = GAME1_DATA.questions.length;
  const qNum = game1State.currentIdx + 1;

  // Точки прогресса вопросов
  let dotsHtml = '';
  for (let i = 0; i < total; i++) {
    let cls = 'quiz-dot';
    if (i < game1State.currentIdx) cls += ' done';
    else if (i === game1State.currentIdx) cls += ' active';
    dotsHtml += `<div class="${cls}"></div>`;
  }

  // Кнопки вариантов ответа
  const optionsHtml = q.options.map(opt => `
    <button class="quiz-opt-btn" data-val="${opt}">${opt}</button>
  `).join('');

  nativeGameContainer.innerHTML = `
    <div class="quiz-top-bar">
      <div class="quiz-step-label">
        <span>Вопрос ${qNum} из ${total}</span>
        <span class="quiz-step-badge">Счёт до 10</span>
      </div>
      <div class="quiz-dots-row">
        ${dotsHtml}
      </div>
    </div>

    <div class="quiz-task-box">
      <span>💡 ${GAME1_DATA.task}</span>
    </div>

    <div class="quiz-image-box">
      <img src="${q.img}" alt="Задание ${qNum}" class="quiz-image" />
    </div>

    <div class="quiz-options-grid">
      ${optionsHtml}
    </div>
  `;

  const optionBtns = nativeGameContainer.querySelectorAll('.quiz-opt-btn');
  let isAnswered = false;

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswered) return;
      const val = parseInt(btn.dataset.val, 10);

      if (val === q.correct) {
        isAnswered = true;
        btn.classList.add('correct-pick');
        SoundEffects.correct();

        setTimeout(() => {
          game1State.currentIdx++;
          if (game1State.currentIdx < total) {
            renderNativeGame1Question();
          } else {
            renderVictoryView('kolichestvo_0', 'Молодец, ты решил все 10 заданий верно!');
          }
        }, 650);
      } else {
        SoundEffects.wrong();
        btn.classList.add('wrong-pick');
        showToast('Попробуй ещё раз! Посчитай внимательнее 😊');
        setTimeout(() => {
          btn.classList.remove('wrong-pick');
        }, 500);
      }
    });
  });
}


// --- ИГРА 2: «НАЙДИ СОСЕДЕЙ ЧИСЕЛ» ---
const GAME2_DATA = {
  id: 'kolichestvo_1',
  title: 'Найди соседей чисел',
  task: 'Впиши пропущенные числа в числовой ряд. Вспомни, какое число идет после каждого числа.',
  bgImage: 'assets/games/game2/bg.jpg',
  slots: [2, 4, 6, 8, 10], // Числа, которые нужно вставить
  choices: [0, 2, 4, 5, 6, 7, 8, 9, 10] // Выбор цифр (исправлен баг LearningApps: 10 теперь есть!)
};

let game2State = {
  answers: {},
  activeSlot: 2
};

function startNativeGame2() {
  game2State.answers = {};
  game2State.activeSlot = 2;
  renderNativeGame2();
}

function renderNativeGame2() {
  if (!nativeGameContainer) return;

  // 10 ячеек числового ряда
  let cellsHtml = '';
  for (let num = 1; num <= 10; num++) {
    const isSlot = GAME2_DATA.slots.includes(num);

    if (!isSlot) {
      cellsHtml += `<div class="seq-cell fixed">${num}</div>`;
    } else {
      const isFilled = game2State.answers[num] !== undefined;
      const isActive = (game2State.activeSlot === num) && !isFilled;

      let cls = 'seq-cell slot';
      if (isFilled) cls += ' filled';
      else if (isActive) cls += ' active';

      const content = isFilled ? game2State.answers[num] : '?';
      cellsHtml += `<div class="${cls}" data-slot="${num}">${content}</div>`;
    }
  }

  // Кнопки банка выбора чисел
  const bankHtml = GAME2_DATA.choices.map(c => `
    <button class="seq-bank-btn" data-choice="${c}">${c}</button>
  `).join('');

  const filledCount = Object.keys(game2State.answers).length;
  const currentTarget = game2State.activeSlot;
  const prevNumber = currentTarget ? currentTarget - 1 : null;

  nativeGameContainer.innerHTML = `
    <div class="seq-game-wrapper">
      <div class="quiz-top-bar">
        <div class="quiz-step-label">
          <span>Числовой ряд: 1 — 10</span>
          <span class="quiz-step-badge">Заполнено: ${filledCount} из 5</span>
        </div>
      </div>

      <div class="quiz-task-box">
        <span>💡 ${GAME2_DATA.task}</span>
      </div>

      <div class="seq-visual-card">
        <div class="seq-bg-art" style="background-image: url('${GAME2_DATA.bgImage}');"></div>
        <div class="seq-prompt-line">
          ${currentTarget ? `Какое число идёт сразу после <strong>${prevNumber}</strong>?` : 'Все числа ряда верно расставлены!'}
        </div>
        <div class="seq-track-grid">
          ${cellsHtml}
        </div>
      </div>

      <div class="seq-bank-card">
        <div class="seq-bank-header">Нажми нужную цифру для ячейки [ ? ]:</div>
        <div class="seq-bank-grid">
          ${bankHtml}
        </div>
      </div>
    </div>
  `;

  // Клик по слотам для ручного переключения фокуса
  nativeGameContainer.querySelectorAll('.seq-cell.slot').forEach(cell => {
    cell.addEventListener('click', () => {
      const slotNum = parseInt(cell.dataset.slot, 10);
      game2State.activeSlot = slotNum;
      SoundEffects.click();
      renderNativeGame2();
    });
  });

  // Клик по кнопкам банка чисел
  nativeGameContainer.querySelectorAll('.seq-bank-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosen = parseInt(btn.dataset.choice, 10);
      const target = game2State.activeSlot;

      if (!target) return;

      if (chosen === target) {
        SoundEffects.correct();
        game2State.answers[target] = chosen;

        // Ищем следующий свободный слот
        const nextSlot = GAME2_DATA.slots.find(s => game2State.answers[s] === undefined);

        if (!nextSlot) {
          // ВСЕ 5 СЛОТОВ ЗАПОЛНЕНЫ ВЕРНО!
          game2State.activeSlot = null;
          renderNativeGame2();
          setTimeout(() => {
            renderVictoryView('kolichestvo_1', 'Отлично, верное решение! Весь числовой ряд собран правильно!');
          }, 600);
        } else {
          game2State.activeSlot = nextSlot;
          renderNativeGame2();
        }
      } else {
        SoundEffects.wrong();
        btn.classList.add('shake-wrong');
        showToast(`Какое число идёт после ${target - 1}? Попробуй ещё раз!`);
        setTimeout(() => {
          btn.classList.remove('shake-wrong');
        }, 450);
      }
    });
  });
}


// --- ЭКРАН ПОБЕДЫ (ВИКТОРИЯ) ---
// Кнопка «Завершить тест и забрать звезду!» появляется ТОЛЬКО ЗДЕСЬ,
// строго после правильного решения последнего задания!
function renderVictoryView(gameId, feedbackMsg) {
  if (!nativeGameContainer) return;
  SoundEffects.victory();
  launchConfetti();

  nativeGameContainer.innerHTML = `
    <div class="quiz-victory-view">
      <div class="victory-trophy-icon">🏆</div>
      <h2 class="victory-title">УРА! ТЕСТ ПРОЙДЕН!</h2>
      <p class="victory-desc">${feedbackMsg}</p>

      <button class="quiz-complete-finish-btn" id="quiz-complete-finish-btn">
        <span>🎉</span> Завершить тест и забрать звезду! <span>⭐</span>
      </button>

      <button class="quiz-replay-link" id="quiz-replay-link">
        ↻ Пройти задание ещё раз
      </button>
    </div>
  `;

  // Обработчик единственной кнопки завершения теста
  const finishBtn = nativeGameContainer.querySelector('#quiz-complete-finish-btn');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      completedGames.add(gameId);
      saveActiveProfileProgress();

      updateProgressUI();
      launchConfetti();
      closeModal();
      showToast('🎉 Звезда получена! Твой прогресс увеличился!');

      if (completedGames.size === TOTAL_GAMES) {
        setTimeout(() => {
          openDiplomaModal(true);
        }, 1200);
      }
    });
  }

  // Повторить задание
  const replayBtn = nativeGameContainer.querySelector('#quiz-replay-link');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      if (gameId === 'kolichestvo_0') startNativeGame1();
      else if (gameId === 'kolichestvo_1') startNativeGame2();
    });
  }
}


// ============================================
// 3. ОТКРЫТИЕ И ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
// ============================================
let isCurrentGameSolved = false;
let currentGameStartTime = 0;

// Слушаем сообщения об успешном прохождении от LearningApps (postMessage)
window.addEventListener('message', (event) => {
  if (typeof event.data !== 'string') return;
  const data = event.data;

  // Реагируем СТРОГО на AppSolved.
  // ВНИМАНИЕ: AppCompleted намеренно НЕ используется!
  // В шаблонах LearningApps (например, шаблон 70 "Простой порядок" — "Расставь матрёшек", "Башни",
  // "Времена года: Волшебное дерево", а также в шаблоне 86 "Классификация") событие AppCompleted
  // отправляется сразу при открытии игры, первой расстановке или первом касании карточки!
  // Только событие AppSolved отправляется исключительно тогда, когда задача действительно РЕШЕНА ВЕРНО (solutionOk === true).
  if (!data.startsWith('AppSolved|') && !data.includes('AppSolved|')) return;

  // Если модальное окно не открыто или открыта нативная игра — игнорируем
  if (!overlay || !overlay.classList.contains('open')) return;
  if (!gameIframe || gameIframe.style.display === 'none' || !gameIframe.src) return;

  // Извлекаем ID решённой игры из сообщения: AppSolved|<appId>|...
  const match = data.match(/AppSolved\|([a-zA-Z0-9]+)/);
  const solvedAppId = match ? match[1] : null;

  // Проверяем, что полученное сообщение относится именно к текущей открытой игре
  const matrixSubApps = ['p7as0d4kc17', 'pe3cx545k17', 'pctyxpo4k17', 'pqrjjv61t17'];
  const isMatch = gameIframe.src.includes(solvedAppId) ||
                  (gameIframe.src.includes('pst3dwo5526') && matrixSubApps.includes(solvedAppId));

  if (solvedAppId && !isMatch) {
    console.warn('Игнорируем AppSolved от сторонней/предыдущей игры:', solvedAppId);
    return;
  }

  // Защита от моментальных ложных срабатываний:
  // ребёнок не может решить интерактивное задание менее чем за 3 секунды
  if (Date.now() - currentGameStartTime < 3000) {
    console.warn('Слишком быстрое событие (< 3 сек), игнорируем ложный сигнал');
    return;
  }

  onGameSolvedSuccess();
});

function onGameSolvedSuccess() {
  if (isCurrentGameSolved) return;
  isCurrentGameSolved = true;

  // Кнопка появляется ТОЛЬКО ТЕПЕРЬ — строго после успешного решения!
  if (modalFinishBtn) {
    modalFinishBtn.style.display = 'inline-flex';
    modalFinishBtn.classList.add('pulse-anim');
    modalFinishBtn.textContent = '⭐ Завершить игру!';
  }

  // Праздничный баннер внизу модального окна
  if (modalSolvedBanner) {
    modalSolvedBanner.style.display = 'block';
  }

  SoundEffects.victory();
  launchConfetti();
  showToast('🎉 Задание выполнено верно! Нажми «Завершить игру», чтобы забрать звезду ⭐');
}

function openGame(url, title, gameId) {
  modalTitle.textContent = title;

  // При открытии игры кнопка завершения ВСЕГДА СКРЫТА!
  isCurrentGameSolved = false;
  currentGameStartTime = Date.now();
  if (modalFinishBtn) {
    modalFinishBtn.style.display = 'none';
    modalFinishBtn.classList.remove('pulse-anim');
  }
  if (modalSolvedBanner) {
    modalSolvedBanner.style.display = 'none';
  }

  const card = document.querySelector(`.game-card[data-game-id="${gameId}"]`);
  const emoji = card?.querySelector('.game-emoji')?.textContent || '🎯';
  if (modalGameIcon) modalGameIcon.textContent = emoji;

  const isGame1 = (url === 'native_game1');
  const isGame2 = (url === 'native_game2');

  if (isGame1) {
    currentGameId = 'kolichestvo_0';
    if (modalSubtitle) modalSubtitle.textContent = 'Интерактивный тест: Счёт предметов';
    gameIframe.style.display = 'none';
    gameIframe.src = '';
    nativeGameContainer.style.display = 'flex';
    startNativeGame1();
  } else if (isGame2) {
    currentGameId = 'kolichestvo_1';
    if (modalSubtitle) modalSubtitle.textContent = 'Интерактивный тест: Соседи чисел';
    gameIframe.style.display = 'none';
    gameIframe.src = '';
    nativeGameContainer.style.display = 'flex';
    startNativeGame2();
  } else {
    currentGameId = gameId;
    if (modalSubtitle) modalSubtitle.textContent = 'Обучающая онлайн-игра';
    nativeGameContainer.style.display = 'none';
    nativeGameContainer.innerHTML = '';
    gameIframe.style.display = 'block';
    gameIframe.src = url;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  isCurrentGameSolved = false;
  if (modalFinishBtn) modalFinishBtn.style.display = 'none';
  if (modalSolvedBanner) modalSolvedBanner.style.display = 'none';

  setTimeout(() => {
    gameIframe.src = '';
    if (nativeGameContainer) nativeGameContainer.innerHTML = '';
    currentGameId = null;
  }, 300);
}

// Завершение игры и начисление звезды
function handleCompleteGame() {
  if (!currentGameId) return;
  const wasAlreadyDone = completedGames.has(currentGameId);
  completedGames.add(currentGameId);
  saveActiveProfileProgress();

  updateProgressUI();
  SoundEffects.victory();
  launchConfetti();
  closeModal();
  showToast(`🎉 Молодец! Задание «${modalTitle.textContent}» пройдено! ⭐`);

  if (completedGames.size === TOTAL_GAMES && !wasAlreadyDone) {
    setTimeout(() => {
      openDiplomaModal();
      launchConfetti();
      showToast('🏆 УРА! Все игры пройдены! Твой диплом готов!');
    }, 1200);
  }
}

if (modalFinishBtn) {
  modalFinishBtn.addEventListener('click', handleCompleteGame);
}

if (modalSolvedBtn) {
  modalSolvedBtn.addEventListener('click', handleCompleteGame);
}

// ============================================
// 3. САЛЮТ / КОНФЕТТИ (Canvas)
// ============================================
let confettiAnimationId = null;

function launchConfetti() {
  if (!confettiCanvas) return;
  const ctx = confettiCanvas.getContext('2d');
  const width = (confettiCanvas.width = window.innerWidth);
  const height = (confettiCanvas.height = window.innerHeight);

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#FCD34D', '#06B6D4'];
  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 18,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      opacity: 1
    });
  }

  const startTime = Date.now();
  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);

  function animate() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - elapsed / 3200);

      if (p.opacity > 0 && p.y < height + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (activeCount > 0 && elapsed < 3500) {
      confettiAnimationId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  animate();
}


// ============================================
// 4. ГЕНЕРАТОР ДИПЛОМА НА CANVAS
// ============================================
function drawDiploma(childName) {
  if (!diplomaCanvas) return;
  const ctx = diplomaCanvas.getContext('2d');
  const w = diplomaCanvas.width;   // 1200
  const h = diplomaCanvas.height;  // 840

  const name = (childName || 'Юный математик').trim();

  // 1. Фон — мягкий благородный градиент слоновой кости
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#FCFDFE');
  bgGrad.addColorStop(0.5, '#FDFBF7');
  bgGrad.addColorStop(1, '#F7FAFC');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Двойная декоративная золотая рамка
  ctx.save();
  // Внешняя рамка
  ctx.lineWidth = 14;
  const goldGrad = ctx.createLinearGradient(0, 0, w, h);
  goldGrad.addColorStop(0, '#D97706');
  goldGrad.addColorStop(0.3, '#F59E0B');
  goldGrad.addColorStop(0.5, '#FDE68A');
  goldGrad.addColorStop(0.7, '#F59E0B');
  goldGrad.addColorStop(1, '#B45309');
  ctx.strokeStyle = goldGrad;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // Внутренняя тонкая золотая рамка
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#D97706';
  ctx.strokeRect(44, 44, w - 88, h - 88);

  // Угловые декоративные элементы
  const corners = [
    [44, 44], [w - 44, 44], [44, h - 44], [w - 44, h - 44]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // 3. Шапка диплома
  ctx.textAlign = 'center';

  // Иконка
  ctx.font = '48px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
  ctx.fillText('🎓', w / 2, 115);

  // Название учреждения
  ctx.font = 'bold 19px "Nunito", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.letterSpacing = '1px';
  ctx.fillText('ГУО «ДЕТСКИЙ САД № 84 г. ВИТЕБСКА»', w / 2, 155);

  // Золотая разделительная линия
  ctx.beginPath();
  ctx.moveTo(w / 2 - 160, 175);
  ctx.lineTo(w / 2 + 160, 175);
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Слово «ДИПЛОМ»
  ctx.font = '900 68px "Baloo 2", "Nunito", sans-serif';
  const titleGrad = ctx.createLinearGradient(w / 2 - 150, 0, w / 2 + 150, 0);
  titleGrad.addColorStop(0, '#1E3A8A');
  titleGrad.addColorStop(0.5, '#2563EB');
  titleGrad.addColorStop(1, '#1E3A8A');
  ctx.fillStyle = titleGrad;
  ctx.shadowColor = 'rgba(37, 99, 235, 0.2)';
  ctx.shadowBlur = 10;
  ctx.fillText('ДИПЛОМ', w / 2, 255);
  ctx.shadowBlur = 0;

  // Подзаголовок
  ctx.font = '800 22px "Nunito", sans-serif';
  ctx.fillStyle = '#D97706';
  ctx.fillText('МАЛЕНЬКОГО МАТЕМАТИКА', w / 2, 295);

  // «Награждается»
  ctx.font = '600 20px "Nunito", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('НАГРАЖДАЕТСЯ', w / 2, 345);

  // ИМЯ РЕБЁНКА
  ctx.font = '900 52px "Baloo 2", "Nunito", sans-serif';
  ctx.fillStyle = '#1E293B';
  ctx.fillText(name, w / 2, 415);

  // Красивое подчёркивание имени
  ctx.beginPath();
  const nameWidth = Math.max(340, ctx.measureText(name).width + 60);
  ctx.moveTo(w / 2 - nameWidth / 2, 435);
  ctx.lineTo(w / 2 + nameWidth / 2, 435);
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Описание заслуг
  ctx.font = '600 21px "Nunito", sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText('за любознательность, старание и успешное прохождение', w / 2, 485);
  ctx.fillText('интерактивных развивающих игр по математике для старших дошкольников', w / 2, 518);

  ctx.font = '800 25px "Baloo 2", "Nunito", sans-serif';
  ctx.fillStyle = '#2563EB';
  ctx.fillText('«МАТЕМАТИКА В ИГРЕ»', w / 2, 560);

  // Декоративные звёздочки
  ctx.font = '24px "Segoe UI Emoji", sans-serif';
  ctx.fillText('⭐   🔢   ⭐   📐   ⭐   ⏰   ⭐', w / 2, 605);

  // Нижняя часть: Воспитатель и Печать
  ctx.beginPath();
  ctx.moveTo(120, 645);
  ctx.lineTo(w - 120, 645);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Слева: Воспитатель
  ctx.textAlign = 'left';
  ctx.font = '700 17px "Nunito", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Воспитатель дошкольного образования:', 120, 685);
  ctx.font = '800 22px "Nunito", sans-serif';
  ctx.fillStyle = '#1E293B';
  ctx.fillText('Хоменкова Юлия Сергеевна', 120, 718);

  // Справа: Город и год
  ctx.textAlign = 'right';
  ctx.font = '700 17px "Nunito", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('г. Витебск', w - 120, 685);
  ctx.font = '800 22px "Nunito", sans-serif';
  ctx.fillStyle = '#1E293B';
  ctx.fillText('2026 год', w - 120, 718);

  // Золотая круглая печать по центру внизу
  ctx.save();
  const stampX = w / 2;
  const stampY = 705;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 44, 0, Math.PI * 2);
  ctx.fillStyle = '#FEF3C7';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#B45309';
  ctx.font = '900 28px sans-serif';
  ctx.fillText('★', stampX, stampY + 8);
  ctx.font = '800 10px "Nunito", sans-serif';
  ctx.fillText('ОТЛИЧНО', stampX, stampY + 24);
  ctx.restore();
}

function openDiplomaModal(isCelebration = false) {
  const active = profiles.find(p => p.id === activeProfileId);
  const name = childNameInput?.value || active?.name || 'Юный математик';
  drawDiploma(name);

  diplomaOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (isCelebration) {
    launchConfetti();
  }
}

function closeDiplomaModal() {
  diplomaOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Слушатели для диплома

if (openDiplomaBtn) {
  openDiplomaBtn.addEventListener('click', () => {
    const count = completedGames.size;
    if (count < TOTAL_GAMES) {
      showToast(`🔒 Диплом заблокирован! Пройди все игры (осталось ещё ${TOTAL_GAMES - count}), чтобы открыть диплом!`);
      return;
    }
    openDiplomaModal(true);
  });
}
if (diplomaClose) {
  diplomaClose.addEventListener('click', closeDiplomaModal);
}
if (diplomaOverlay) {
  diplomaOverlay.addEventListener('click', (e) => {
    if (e.target === diplomaOverlay) closeDiplomaModal();
  });
}

// Кнопка «Обновить диплом» при вводе имени
if (updateDiplomaBtn && childNameInput) {
  const handleUpdate = () => {
    const val = childNameInput.value.trim() || 'Юный математик';
    try {
      localStorage.setItem(STORAGE_NAME_KEY, val);
    } catch (e) {}

    // Обновляем также имя в активном профиле ребёнка
    const active = profiles.find(p => p.id === activeProfileId);
    if (active) {
      active.name = val;
      try {
        localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
      } catch (e) {}
      renderProfilesUI();
    }

    drawDiploma(val);
    showToast('✨ Имя в дипломе обновлено!');
  };

  updateDiplomaBtn.addEventListener('click', handleUpdate);
  childNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUpdate();
  });
}

// Скачать диплом (PNG)
if (downloadDiplomaBtn && diplomaCanvas) {
  downloadDiplomaBtn.addEventListener('click', () => {
    const name = (childNameInput?.value || 'Misha').trim().replace(/[\s/\\?%*:|"<>]+/g, '_');
    const link = document.createElement('a');
    link.download = `Diplom_${name}_Matematika.png`;
    link.href = diplomaCanvas.toDataURL('image/png');
    link.click();
    showToast('📥 Диплом скачивается на ваше устройство!');
  });
}

// Распечатать диплом
if (printDiplomaBtn && diplomaCanvas) {
  printDiplomaBtn.addEventListener('click', () => {
    const dataUrl = diplomaCanvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Печать диплома</title>
          <style>
            body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; }
            img { max-width: 100%; height: auto; }
            @page { size: landscape; margin: 10mm; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${dataUrl}" />
        </body>
        </html>
      `);
      win.document.close();
    }
  });
}


// ============================================
// 5. ДЕЛЕГИРОВАНИЕ КЛИКОВ ПО КАРТОЧКАМ ИГР
// ============================================
document.addEventListener('click', (e) => {
  const playBtn = e.target.closest('.play-btn');
  const card    = e.target.closest('.game-card');

  if (!playBtn && !card) return;

  const targetCard = playBtn ? playBtn.closest('.game-card') : card;
  if (!targetCard) return;

  const url    = targetCard.dataset.iframe;
  const title  = targetCard.querySelector('.game-title')?.textContent || 'Игра';
  const gameId = targetCard.dataset.gameId;

  if (!url || url === 'PLACEHOLDER') {
    showToast('🔜 Эта игра скоро появится! Воспитатель готовит ссылку.');
    return;
  }

  openGame(url, title, gameId);
});

modalClose.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeDiplomaModal();
  }
});


// ============================================
// 6. НАВИГАЦИЯ И СКРОЛЛ
// ============================================
function setActiveNav(targetId) {
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetId);
  });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const section  = document.getElementById(targetId);
    if (!section) return;

    const navHeight = navBar?.offsetHeight || 60;
    const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 24;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveNav(targetId);
  });
});

const sectionIds = ['kolichestvo','velichina','vremya','prostranstvo','logika','figury','parents-folder'];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}, {
  rootMargin: `-80px 0px -55% 0px`,
  threshold: 0
});

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});


// ============================================
// 7. ПАПКА-ПЕРЕДВИЖКА ДЛЯ РОДИТЕЛЕЙ (ФЭМП)
// ============================================
function initParentsFolder() {
  const container   = document.getElementById('parents-cards-container');
  const tabs        = document.querySelectorAll('.p-tab-btn');
  const searchInput = document.getElementById('parents-search-input');
  const searchClear = document.getElementById('parents-search-clear');
  const emptySearch = document.getElementById('parents-empty-search');

  if (!container || typeof PARENTS_CONSULTATIONS === 'undefined') return;

  // Динамическое обновление счётчиков в кнопках категорий
  const catCounts = { all: PARENTS_CONSULTATIONS.length };
  PARENTS_CONSULTATIONS.forEach(c => {
    catCounts[c.category] = (catCounts[c.category] || 0) + 1;
  });
  tabs.forEach(tab => {
    const cat = tab.dataset.cat || 'all';
    const count = catCounts[cat] || 0;
    const match = tab.textContent.match(/^(.*?)\s*\(\d+\)$/);
    if (match) {
      tab.textContent = `${match[1]} (${count})`;
    }
  });

  let currentCategory = 'all';
  let searchQuery = '';

  function renderCards() {
    const q = searchQuery.toLowerCase().trim();

    const filtered = PARENTS_CONSULTATIONS.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category === currentCategory);
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.contentHtml.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptySearch) emptySearch.style.display = 'block';
      return;
    }

    if (emptySearch) emptySearch.style.display = 'none';

    container.innerHTML = filtered.map(item => `
      <article class="parent-card" id="card-${item.id}">
        <div class="parent-card-header" onclick="toggleParentCard('${item.id}')">
          <div class="p-card-left">
            <div class="p-card-icon-badge">${item.icon}</div>
            <div class="p-card-title-group">
              <div class="p-card-meta">
                <span class="p-card-category-tag">${item.categoryLabel}</span>
                <span class="p-card-time">⏱️ ${item.readingTime}</span>
                <span class="p-card-age">👶 ${item.age}</span>
              </div>
              <h3 class="p-card-title">${item.title}</h3>
              <p class="p-card-subtitle">${item.subtitle}</p>
              <p class="p-card-summary">${item.summary}</p>
            </div>
          </div>
          <div class="p-card-actions">
            <button class="p-btn-print" onclick="event.stopPropagation(); printConsultation('${item.id}')" title="Распечатать памятку" aria-label="Печать">🖨️</button>
            <button class="p-btn-expand" id="btn-expand-${item.id}">
              <span>Читать</span> ⬇️
            </button>
          </div>
        </div>

        <div class="parent-card-body">
          ${item.contentHtml}
          <div class="parent-card-footer">
            <button class="p-btn-print-full" onclick="printConsultation('${item.id}')">
              <span>🖨️</span> Распечатать памятку для дома
            </button>
            <button class="p-btn-collapse" onclick="toggleParentCard('${item.id}')">
              Свернуть ⬆️
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Первый рендер
  renderCards();

  // Табы фильтров
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.cat || 'all';
      renderCards();
    });
  });

  // Поиск по ключевым словам
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'flex' : 'none';
      }
      renderCards();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      renderCards();
    });
  }
}

// Раскрытие / сворачивание карточки
function toggleParentCard(id) {
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  const isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded');
  const btn = document.getElementById(`btn-expand-${id}`);
  if (btn) {
    btn.innerHTML = isExpanded ? '<span>Читать</span> ⬇️' : '<span>Свернуть</span> ⬆️';
  }
}

// Печать памятки для родителей
function printConsultation(id) {
  if (typeof PARENTS_CONSULTATIONS === 'undefined') return;
  const item = PARENTS_CONSULTATIONS.find(c => c.id === id);
  if (!item) return;

  const printArea = document.getElementById('print-area');
  if (!printArea) return;

  printArea.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; font-family: 'Times New Roman', serif; color: #000; line-height: 1.6;">
      <div style="border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; text-align: center;">
        <h4 style="margin: 0; font-size: 15px; text-transform: uppercase;">ГУО «Детский сад № 84 г. Витебска»</h4>
        <p style="margin: 4px 0; font-size: 13px;">Папка-передвижка: Консультации для родителей по ФЭМП</p>
        <p style="margin: 0; font-size: 13px; font-weight: bold;">Воспитатель: Хоменкова Юлия Сергеевна</p>
      </div>

      <h2 style="font-size: 20px; margin-bottom: 4px; text-align: center;">${item.title}</h2>
      <p style="font-size: 14px; color: #555; text-align: center; margin-bottom: 20px; font-style: italic;">${item.subtitle}</p>

      <div style="font-size: 14px; text-align: justify;">
        ${item.contentHtml}
      </div>

      <div style="border-top: 1px solid #ccc; margin-top: 30px; padding-top: 10px; font-size: 12px; display: flex; justify-content: space-between;">
        <span>Сайт «Математика в игре»</span>
        <span>г. Витебск, 2026 г.</span>
      </div>
    </div>
  `;

  window.print();
}


// ============================================
// 8. СТАРТ
// ============================================
function initAll() {
  initProfiles();
  initCards();
  initParentsFolder();
}

document.addEventListener('DOMContentLoaded', initAll);
if (document.readyState !== 'loading') initAll();
