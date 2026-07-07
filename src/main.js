const menuItems = [
  {
    id: 'home',
    title: 'Главная',
    subtitle: 'ホーム',
    eyebrow: 'Главный текст',
    headline: 'Hero headline zone',
    text: 'Короткое описание и CTA. Здесь позже будет финальный оффер.',
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
      <span>${item.title}</span>
      <small>${item.subtitle}</small>
    </button>
  `).join('');
}

function setActive(id) {
  activeId = id;
  const current = menuItems.find((item) => item.id === id) ?? menuItems[0];
  heroCopy.classList.remove('is-visible');

  window.setTimeout(() => {
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

  const topLength = span.dataset.top.length;
  const bottomLength = span.dataset.bottom.length;
  span.innerHTML = `${randomGlyphLine(topLength)}<br>${randomGlyphLine(bottomLength)}`;
  icon.textContent = glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
}

document.querySelectorAll('[data-market-button]').forEach((button) => {
  button.addEventListener('mouseenter', () => {
    window.clearInterval(marketTimers.get(button));
    glitchMarketButton(button);
    marketTimers.set(button, window.setInterval(() => glitchMarketButton(button), 38));
  });

  button.addEventListener('mouseleave', () => {
    window.clearInterval(marketTimers.get(button));
    restoreMarketButton(button);
  });

  button.addEventListener('focus', () => glitchMarketButton(button));
  button.addEventListener('blur', () => restoreMarketButton(button));
});

setActive(activeId);
