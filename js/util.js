// Получает целое число в заданном диапазоне
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let scrollPosition = 0; // Текущая позиция прокрутки страницы

// Функция для блокировки и разблокировки прокрутки страницы
function toggleBodyScroll(isLocked) {
  if (isLocked) {
    scrollPosition = window.scrollY;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.classList.add('modal-open');
  } else {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, scrollPosition);
    document.body.classList.remove('modal-open');
  }
}

// Обработчик для клавиши Escape
function handleEscapeKey(event, callback) {
  if (event.key === 'Escape') {
    callback();
  }
}

// Обработчик для клика вне области изображения
function handleOutsideClick(event, callback) {
  if (!event.target.closest('.big-picture__img') && !event.target.closest('.big-picture__social')) {
    callback();
  }
}

// Функция для инициализации селекторов
const initializeSelectors = (selectorsConfig) => {
  const selectors = {};
  for (const key in selectorsConfig) {
    if (Object.prototype.hasOwnProperty.call(selectorsConfig, key)) {
      selectors[key] = document.querySelector(selectorsConfig[key]);
    }
  }
  return selectors;
};


export {
  getRandomInteger,
  toggleBodyScroll,
  handleEscapeKey,
  handleOutsideClick,
  initializeSelectors
};
