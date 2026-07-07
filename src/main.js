const menuItems = [
  {
    id: 'home',
    title: 'Главная',
    subtitle: 'ホーム',
    eyebrow: '',
    headline: 'Инстант-лапша нового поколения',
    text: 'Полноценный горячий обед на каждый день в знакомом, но переосмысленном формате быстрого приготовления. Яркий вкус, натуральный состав и визуальный код, который превращает привычный стакан в предмет желания.',
  },
  {
    id: 'product',
    title: 'Продукт',
    subtitle: 'プロダクト',
    eyebrow: 'Раздел продукта',
    headline: 'Product content zone',
    text: 'Здесь позже будут вкусы, состав, преимущества, фото лапши и карточки маркетплейсов.',
  },
  {
    id: 'philosophy',
    title: 'Философия',
    subtitle: '哲学',
    eyebrow: 'Раздел философии',
    headline: 'Philosophy content zone',
    text: 'Здесь позже будет бренд-идея, позиционирование и короткая история NØØD.',
  },
  {
    id: 'world',
    title: 'Мир Nood',
    subtitle: '世界',
    eyebrow: 'Раздел мира',
    headline: 'World content zone',
    text: 'Здесь позже будут mood-фото, дропы, UGC, контентные рубрики и визуальный мир.',
  },
  {
    id: 'contacts',
    title: 'Контакты',
    subtitle: 'コンタクト',
    eyebrow: 'Раздел контактов',
    headline: 'Contacts content zone',
    text: 'Здесь позже будут реальные ссылки, маркетплейсы, соцсети, Telegram и форма связи.',
  },
];

const nav = document.querySelector('.main-nav');
const heroCopy = document.querySelector('.hero-copy');
const fields = {
  eyebrow: document.querySelector('[data-field="eyebrow"]'),
  headline: document.querySelector('[data-field="headline"]'),
  text: document.querySelector('[data-field="text"]'),
};
let activeId = 'home';

function renderNav() {
  nav.innerHTML = menuItems.map((item) => `
    <button class="nav-link${item.id === activeId ? ' active' : ''}" type="button" data-id="${item.id}">
      <span data-title="${item.title}">${item.title}</span>
      <small>${item.subtitle}</small>
    </button>
  `).join('');
}

function setActive(id) {
  activeId = id;
  const current = menuItems.find((item) => item.id === id) ?? menuItems[0];
  heroCopy.classList.remove('is-visible');

  window.setTimeout(() => {
    if (activeNavGlitchButton) stopNavGlitch(activeNavGlitchButton);
    fields.eyebrow.textContent = current.eyebrow;
    fields.headline.textContent = current.headline;
    fields.text.textContent = current.text;
    heroCopy.classList.add('is-visible');
    renderNav();
  }, 90);
}

nav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]');
  if (button) setActive(button.dataset.id);
});

document.querySelectorAll('[data-open]').forEach((card) => {
  card.addEventListener('click', () => setActive(card.dataset.open));
});


const glitchGlyphs = ['ヌ', 'オ', 'ム', 'メ', 'ラ', 'ン', 'リ', 'Ø', '零', '麺', 'ノ', 'ド'];
const marketTimers = new WeakMap();
let activeNavGlitchButton = null;
let activeNavGlitchTimer = 0;
let activeNavPauseTimer = 0;

function randomGlyphLine(length) {
  return Array.from({ length }, () => glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)]).join('');
}

function restoreMarketButton(button) {
  const span = button.querySelector('span');
  const icon = button.querySelector('i');
  if (!span || !icon) return;

  span.innerHTML = `${span.dataset.top}<br>${span.dataset.bottom}`;
  icon.textContent = icon.dataset.glyph;
}

function glitchMarketButton(button) {
  const span = button.querySelector('span');
  const icon = button.querySelector('i');
  if (!span || !icon) return;

  span.innerHTML = `${randomizeWordParts(span.dataset.top)}<br>${randomizeWordParts(span.dataset.bottom)}`;
  icon.textContent = glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
}

function clearMarketTimers(button) {
  const timers = marketTimers.get(button);
  if (!timers) return;

  window.clearInterval(timers.interval);
  window.clearTimeout(timers.timeout);
}

function startMarketGlitch(button) {
  clearMarketTimers(button);
  button.dataset.glitching = 'true';

  const runBurst = () => {
    if (button.dataset.glitching !== 'true') return;

    button.classList.add('is-glitching');
    button.classList.remove('is-paused');
    glitchMarketButton(button);

    const interval = window.setInterval(() => glitchMarketButton(button), 55);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      restoreMarketButton(button);
      button.classList.remove('is-glitching');
      button.classList.add('is-paused');

      const pauseTimeout = window.setTimeout(runBurst, 620);
      marketTimers.set(button, { interval: 0, timeout: pauseTimeout });
    }, 720);

    marketTimers.set(button, { interval, timeout });
  };

  runBurst();
}

function stopMarketGlitch(button) {
  button.dataset.glitching = 'false';
  clearMarketTimers(button);
  button.classList.remove('is-glitching', 'is-paused');
  restoreMarketButton(button);
}

function randomizeWordParts(word) {
  return Array.from(word).map((letter) => {
    if (letter === ' ' || Math.random() > 0.34) return letter;
    return glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
  }).join('');
}

function restoreNavButton(button) {
  const label = button.querySelector('[data-title]');
  if (!label) return;

  label.textContent = label.dataset.title;
}

function glitchNavButton(button) {
  const label = button.querySelector('[data-title]');
  if (!label) return;

  label.textContent = randomizeWordParts(label.dataset.title);
}

function startNavGlitch(button) {
  if (button.classList.contains('active')) return;

  if (activeNavGlitchButton && activeNavGlitchButton !== button) {
    stopNavGlitch(activeNavGlitchButton);
  }

  activeNavGlitchButton = button;

  const runBurst = () => {
    if (activeNavGlitchButton !== button || button.classList.contains('active')) return;

    button.classList.add('is-glitching');
    button.classList.remove('is-paused');
    glitchNavButton(button);
    activeNavGlitchTimer = window.setInterval(() => glitchNavButton(button), 44);

    activeNavPauseTimer = window.setTimeout(() => {
      window.clearInterval(activeNavGlitchTimer);
      restoreNavButton(button);
      button.classList.remove('is-glitching');
      button.classList.add('is-paused');
      activeNavPauseTimer = window.setTimeout(runBurst, 560);
    }, 760);
  };

  window.clearInterval(activeNavGlitchTimer);
  window.clearTimeout(activeNavPauseTimer);
  runBurst();
}

function stopNavGlitch(button) {
  window.clearInterval(activeNavGlitchTimer);
  window.clearTimeout(activeNavPauseTimer);
  activeNavGlitchTimer = 0;
  activeNavPauseTimer = 0;
  activeNavGlitchButton = null;
  button.classList.remove('is-glitching', 'is-paused');
  restoreNavButton(button);
}

nav.addEventListener('mouseover', (event) => {
  const button = event.target.closest('.nav-link');
  if (!button || button.classList.contains('active') || activeNavGlitchButton === button) return;
  startNavGlitch(button);
});

nav.addEventListener('mouseout', (event) => {
  const button = event.target.closest('.nav-link');
  if (!button || button.contains(event.relatedTarget)) return;
  stopNavGlitch(button);
});

document.querySelectorAll('[data-market-button]').forEach((button) => {
  button.addEventListener('mouseenter', () => startMarketGlitch(button));
  button.addEventListener('mouseleave', () => stopMarketGlitch(button));
  button.addEventListener('focus', () => startMarketGlitch(button));
  button.addEventListener('blur', () => stopMarketGlitch(button));
});

setActive(activeId);
