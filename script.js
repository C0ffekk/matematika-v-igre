/* ============================================
   МАТЕМАТИКА В ИГРЕ — JavaScript
   ============================================ */

'use strict';

// ===== КОНФИГУРАЦИЯ ИГР =====
// Чтобы добавить/заменить ссылку на игру — просто измените поле "url"
// Если url === null — карточка будет отображаться как «скоро», с уведомлением
const GAMES = {
  kolichestvo: [
    {
      title: "Весёлый счёт",
      url: "https://learningapps.org/watch?v=pe9276i2c26"
    },
    {
      title: "Больше, меньше, равно",
      url: null // ← сюда вставить ссылку
    },
    {
      title: "Считалочка",
      url: null // ← сюда вставить ссылку
    }
  ],
  velichina: [
    { title: "Длинный — короткий", url: null },
    { title: "Тяжелее или легче?",  url: null },
    { title: "Высокий — низкий",    url: null }
  ],
  vremya: [
    { title: "Части суток",   url: null },
    { title: "Дни недели",    url: null },
    { title: "Времена года",  url: null }
  ],
  prostranstvo: [
    { title: "Верх и низ",       url: null },
    { title: "Лево — право",     url: null },
    { title: "Найди по карте",   url: null }
  ],
  logika: [
    { title: "Найди лишнее",    url: null },
    { title: "Продолжи ряд",    url: null },
    { title: "Логические задачки", url: null }
  ],
  figury: [
    { title: "Знакомые фигуры", url: null },
    { title: "Фигура в жизни",  url: null },
    { title: "Собери картинку", url: null }
  ]
};

// ===== ЭЛЕМЕНТЫ =====
const overlay     = document.getElementById('modal-overlay');
const gameIframe  = document.getElementById('game-iframe');
const modalTitle  = document.getElementById('modal-title');
const modalClose  = document.getElementById('modal-close');
const toast       = document.getElementById('toast');
const navBtns     = document.querySelectorAll('.nav-btn');
const navBar      = document.getElementById('nav-bar');

// ===== ИНИЦИАЛИЗАЦИЯ КАРТОЧЕК =====
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

      // Проставляем data-url из конфига
      card.dataset.iframe = game.url || 'PLACEHOLDER';

      // Обновляем заголовок карточки (на случай если изменится в конфиге)
      const titleEl = card.querySelector('.game-title');
      if (titleEl && game.title) titleEl.textContent = game.title;
    });
  });
}

// ===== ОТКРЫТИЕ ИГРЫ =====
function openGame(url, title) {
  modalTitle.textContent = title;
  gameIframe.src = url;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ===== ЗАКРЫТИЕ ИГРЫ =====
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  // Небольшая задержка, чтобы анимация закрытия завершилась
  setTimeout(() => { gameIframe.src = ''; }, 300);
}

// ===== ПОКАЗ TOAST =====
let toastTimer = null;
function showToast(msg) {
  if (msg) toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ===== ДЕЛЕГИРОВАНИЕ КЛИКОВ =====
document.addEventListener('click', (e) => {
  // Клик по кнопке "Играть" или по карточке
  const playBtn = e.target.closest('.play-btn');
  const card    = e.target.closest('.game-card');

  if (!playBtn && !card) return;

  const targetCard = playBtn ? playBtn.closest('.game-card') : card;
  if (!targetCard) return;

  const url   = targetCard.dataset.iframe;
  const title = targetCard.querySelector('.game-title')?.textContent || 'Игра';

  if (!url || url === 'PLACEHOLDER') {
    showToast('🔜 Эта игра скоро появится! Воспитатель готовит ссылку.');
    return;
  }

  openGame(url, title);
});

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
modalClose.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== НАВИГАЦИЯ =====
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

    const navHeight = navBar.offsetHeight || 60;
    const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 24;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveNav(targetId);
  });
});

// ===== INTERSECTION OBSERVER для активного пункта меню =====
const sectionIds = ['kolichestvo','velichina','vremya','prostranstvo','logika','figury'];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}, {
  rootMargin: `-${navBar.offsetHeight + 20}px 0px -55% 0px`,
  threshold: 0
});

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ===== СТАРТ =====
document.addEventListener('DOMContentLoaded', () => {
  initCards();
});

// Если DOM уже готов (скрипт в конце body)
if (document.readyState !== 'loading') {
  initCards();
}
