const menuItems = [
  {
    id: 'home',
    title: 'Главная',
    subtitle: 'ホーム',
    eyebrow: 'NØØD / старт',
    headline: 'Лапша для тех, кто в движении',
    text: 'Пока фиксируем зоны как в референсе: заголовок, короткое описание, CTA, фон, вывеска и продукт справа.',
  },
  {
    id: 'product',
    title: 'Продукт',
    subtitle: 'プロダクト',
    eyebrow: 'продукт',
    headline: 'Зона продукта',
    text: 'Сюда позже встанут фото лапши, вкус Cheese Chicken, состав, преимущества и карточки маркетплейсов.',
  },
  {
    id: 'philosophy',
    title: 'Философия',
    subtitle: '哲学',
    eyebrow: 'философия',
    headline: 'Зона философии',
    text: 'Здесь будет короткая история бренда: доступный премиум, быстрый ритуал и собственный визуальный код NØØD.',
  },
  {
    id: 'world',
    title: 'Мир Nood',
    subtitle: '世界',
    eyebrow: 'мир nood',
    headline: 'Зона мира NØØD',
    text: 'Здесь будут mood-фото, город, Y2K, японские детали, UGC-механики, дропы и контентные рубрики.',
  },
  {
    id: 'contacts',
    title: 'Контакты',
    subtitle: 'コンタクト',
    eyebrow: 'контакты',
    headline: 'Зона контактов',
    text: 'Ozon, Wildberries, соцсети, Telegram, форма подписки и будущие реальные ссылки. Сейчас всё оставлено заглушками.',
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
  }, 120);
}

nav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]');
  if (button) setActive(button.dataset.id);
});

document.querySelectorAll('[data-open]').forEach((card) => {
  card.addEventListener('click', () => setActive(card.dataset.open));
});

document.querySelectorAll('.rail-logo, .mobile-logo').forEach((logo) => {
  logo.addEventListener('click', (event) => {
    event.preventDefault();
    setActive('home');
  });
});

setActive(activeId);
