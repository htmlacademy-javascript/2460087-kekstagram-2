import { BIG_PICTURE_SELECTORS } from './selector-config.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey, handleOutsideClick } from './util.js';

const NUMBER_OF_COMMENTS_UPLOADED = 5;

const bigPictureSelectors = initializeSelectors(BIG_PICTURE_SELECTORS);

let displayedCommentsCount = 0;
let currentPhoto;
let handleOutsideClickCallback;
let handleEscapeKeyCallback;

// Функция для очистки модального окна
const clearModal = () => {
  bigPictureSelectors.img.src = '';
  bigPictureSelectors.likes.textContent = '';
  bigPictureSelectors.commentsCount.textContent = '';
  bigPictureSelectors.caption.textContent = '';
  bigPictureSelectors.commentsList.innerHTML = '';
  bigPictureSelectors.loader.classList.add('hidden');
  bigPictureSelectors.input.value = '';
};

// Функция для создания одного комментария и добавления его в DOM
const createComment = (comment) => {
  const commentHTML = `
    <li class="social__comment">
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}">
      <p class="social__text">${comment.message}</p>
    </li>
  `;
  bigPictureSelectors.commentsList.insertAdjacentHTML('beforeend', commentHTML);
};

// Функция для отображения кнопки "Загрузить комментарии"
const toggleCommentsLoader = (photo) => {
  const commentsCount = photo.comments.length;
  if (commentsCount > displayedCommentsCount) {
    bigPictureSelectors.loader.classList.remove('hidden');
  } else {
    bigPictureSelectors.loader.classList.add('hidden');
  }
};

// Функция для заполнения окна данными
const populateBigPicture = (photo) => {
  bigPictureSelectors.img.src = photo.url;
  bigPictureSelectors.img.alt = photo.description;
  bigPictureSelectors.likes.textContent = photo.likes;
  const commentsCount = photo.comments.length;
  displayedCommentsCount = Math.min(commentsCount, NUMBER_OF_COMMENTS_UPLOADED);
  bigPictureSelectors.commentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;
  bigPictureSelectors.caption.textContent = photo.description;
  photo.comments.slice(0, displayedCommentsCount).forEach(createComment);
  toggleCommentsLoader(photo);
};

// Функция для загрузки следующих 5 комментариев
const loadMoreComments = () => {
  const commentsCount = currentPhoto.comments.length;
  const nextComments = currentPhoto.comments.slice(displayedCommentsCount, displayedCommentsCount + NUMBER_OF_COMMENTS_UPLOADED);
  nextComments.forEach(createComment);
  displayedCommentsCount += nextComments.length;
  bigPictureSelectors.commentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;
  toggleCommentsLoader(currentPhoto);
};

// Функция закрытия полноразмерной картинки
const closeBigPicture = () => {
  toggleBodyScroll(false);
  bigPictureSelectors.element.classList.add('hidden');

  // Удаление обработчиков
  bigPictureSelectors.element.removeEventListener('click', handleOutsideClickCallback);
  document.removeEventListener('keydown', handleEscapeKeyCallback);
  bigPictureSelectors.cancel.removeEventListener('click', closeBigPicture);
};

// Функция открытия полноразмерной картинки
const openBigPicture = (photo) => {
  currentPhoto = photo;
  toggleBodyScroll(true);
  bigPictureSelectors.element.classList.remove('hidden');
  bigPictureSelectors.element.scrollTop = 0;
  clearModal();
  populateBigPicture(photo);
  bigPictureSelectors.element.focus();

  // Присваивание значений коллбэкам
  handleOutsideClickCallback = (event) => {
    handleOutsideClick(event, [
      '.big-picture__img',
      '.social',
      '.big-picture__cancel'
    ], closeBigPicture);
  };

  handleEscapeKeyCallback = (event) => {
    handleEscapeKey(event, closeBigPicture);
  };

  // Добавление обработчиков
  bigPictureSelectors.element.addEventListener('click', handleOutsideClickCallback);
  document.addEventListener('keydown', handleEscapeKeyCallback);
  bigPictureSelectors.cancel.addEventListener('click', closeBigPicture);
};

export {
  openBigPicture, loadMoreComments, bigPictureSelectors
};
