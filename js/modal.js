import { BIG_PICTURE_SELECTORS } from './selector-config.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey, handleOutsideClick } from './util.js';

const bigPictureSelectors = initializeSelectors(BIG_PICTURE_SELECTORS);

let currentPhoto = null;
let displayedCommentsCount = 0;
const keydownHandler = (event) => handleEscapeKey(event, closeBigPicture);

const outsideClickHandler = (event) => {
  handleOutsideClick(event, [
    '.big-picture__img',
    '.social',
    '.big-picture__cancel'
  ], closeBigPicture);
};

const closeButtonHandler = () => closeBigPicture();

// Обработчики событий для открытия и закрытия
function toggleBigPictureHandlers(selectors, addHandlers) {
  const method = addHandlers ? 'addEventListener' : 'removeEventListener';

  // для клавиши ESC
  document[method]('keydown', keydownHandler);

  // для клика по изображению
  selectors.element[method]('click', outsideClickHandler);

  // для кнопки закрытия
  selectors.cancel[method]('click', closeButtonHandler);
}


function openBigPicture(photo) {
  currentPhoto = photo;
  toggleBodyScroll(true);
  bigPictureSelectors.element.classList.remove('hidden');
  bigPictureSelectors.element.scrollTop = 0;
  clearModal();
  populateBigPicture(photo);
  bigPictureSelectors.element.focus();

  // Добавление обработчиков
  toggleBigPictureHandlers(bigPictureSelectors, true);
}

function closeBigPicture() {
  toggleBodyScroll(false);
  bigPictureSelectors.element.classList.add('hidden');

  // Удаление обработчиков
  toggleBigPictureHandlers(bigPictureSelectors, false);
}

// Функция для заполнения окна данными
function populateBigPicture(photo) {
  bigPictureSelectors.img.src = photo.url;
  bigPictureSelectors.img.alt = photo.description;
  bigPictureSelectors.likes.textContent = photo.likes;
  const commentsCount = photo.comments.length;
  displayedCommentsCount = Math.min(commentsCount, 5);
  bigPictureSelectors.commentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;
  bigPictureSelectors.caption.textContent = photo.description;
  photo.comments.slice(0, displayedCommentsCount).forEach(createComment);
  toggleCommentsLoader(photo);
}

// Функция для отображения кнопки "Загрузить комментарии"
function toggleCommentsLoader(photo) {
  const commentsCount = photo.comments.length;
  if (commentsCount > displayedCommentsCount) {
    bigPictureSelectors.loader.classList.remove('hidden');
  } else {
    bigPictureSelectors.loader.classList.add('hidden');
  }
}

// Функция для загрузки следующих 5 комментариев
function loadMoreComments() {
  const commentsCount = currentPhoto.comments.length;
  const nextComments = currentPhoto.comments.slice(displayedCommentsCount, displayedCommentsCount + 5);
  nextComments.forEach(createComment);
  displayedCommentsCount += nextComments.length;
  bigPictureSelectors.commentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;
  toggleCommentsLoader(currentPhoto);
}

// Функция для создания одного комментария и добавления его в DOM
function createComment(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);
  bigPictureSelectors.commentsList.appendChild(commentElement);
}

// Функция для очистки модального окна
function clearModal() {
  bigPictureSelectors.img.src = '';
  bigPictureSelectors.likes.textContent = '';
  bigPictureSelectors.commentsCount.textContent = '';
  bigPictureSelectors.caption.textContent = '';
  bigPictureSelectors.commentsList.innerHTML = '';
  bigPictureSelectors.loader.classList.add('hidden');
}

export {
  openBigPicture, loadMoreComments, bigPictureSelectors
};
