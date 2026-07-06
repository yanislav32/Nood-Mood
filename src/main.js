const menuItems = [
  {
    id: 'home',
    title: 'Главная',
    subtitle: 'ホーム',
    eyebrow: 'NØØD / старт',
    headline: 'Лапша для тех, кто в движении',
    text: 'Инстант-лапша нового поколения: густой сырный бульон, курица, чистый визуальный код и быстрый ритуал на 3–5 минут.',
  },
  {
    id: 'product',
    title: 'Продукт',
    subtitle: 'プロダクト',
    eyebrow: 'флагманский SKU',
    headline: 'Cheese Chicken — сырный бульон, который держит форму',
    text: 'Один сильный флагман вместо размытой линейки: сырно-куриный вкус, густота, белок и ощущение полноценного горячего блюда.',
  },
  {
    id: 'philosophy',
    title: 'Философия',
    subtitle: '哲学',
    eyebrow: 'быстрый ритуал',
    headline: 'Не копия. Собственный код.',
    text: 'NØØD не продаёт лапшу от безысходности. Это доступный премиум, который не стыдно поставить в кадр и хочется повторять ради вкуса.',
  },
  {
    id: 'world',
    title: 'Мир Nood',
    subtitle: '世界',
    eyebrow: 'nood ∞ mood',
    headline: 'Япония, Y2K и ночной город в одной чашке',
    text: 'Катакана, неон, техно-урбанизм, мемы, дропы, микро-инфлюенсеры и UGC: вокруг продукта должен появиться движ.',
  },
  {
    id: 'contacts',
    title: 'Контакты',
    subtitle: 'コンタクト',
    eyebrow: 'маркетплейсы и связь',
    headline: 'Ozon, WB, Telegram — пока заглушки, дальше подключим реальные ссылки',
    text: 'Сайт уже подготовлен под маркетплейсы, соцсети, подписку, предзаказы и будущую D2C-воронку. Ссылки оставлены как placeholders.',
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
  }, 130);
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
