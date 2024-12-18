import { selectors, refreshSelectors } from './selectors.js';
import { populateBigPicture, clearModal } from './gallery.js';

let scrollPosition = 0; // Текущая позиция прокрутки страницы
let currentPhoto = null;

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

// Функция для открытия полноразмерного изображения
function openBigPicture(photo) {
  if (!selectors.bigPictureElement) {
    refreshSelectors();
  }

  currentPhoto = photo;
  toggleBodyScroll(true);
  selectors.bigPictureElement.classList.remove('hidden');
  selectors.bigPictureElement.scrollTop = 0;
  clearModal();
  populateBigPicture(photo);

  document.addEventListener('keydown', handleEscapeKey);
  selectors.bigPictureElement.addEventListener('click', handleOutsideClick);
}

// Функция для закрытия полноразмерного изображения
function closeBigPicture() {
  toggleBodyScroll(false);
  selectors.bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', handleEscapeKey);
  selectors.bigPictureElement.removeEventListener('click', handleOutsideClick);
}

// Обработчик клавиши Escape для закрытия окна
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
}

// Обработчик клика по области вне изображения и комментариев для закрытия окна
function handleOutsideClick(event) {
  if (!event.target.closest('.big-picture__img') && !event.target.closest('.big-picture__social')) {
    closeBigPicture();
  }
}

export {
  closeBigPicture, currentPhoto, openBigPicture
};

