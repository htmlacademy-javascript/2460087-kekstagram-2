import { selectors } from './selectors.js';
import { toggleBodyScroll, handleEscapeKey, handleOutsideClick } from './util.js';

let currentPhoto = null;
let displayedCommentsCount = 0; // Счётчик отображенных комментариев
const keydownHandler = (event) => handleEscapeKey(event, closeBigPicture);
const outsideClickHandler = (event) => handleOutsideClick(event, closeBigPicture);
const closeButtonHandler = () => closeBigPicture();

// Функция для открытия полноразмерного изображения
function openBigPicture(photo) {
  currentPhoto = photo;
  toggleBodyScroll(true);
  selectors.bigPictureElement.classList.remove('hidden');
  selectors.bigPictureElement.scrollTop = 0;
  clearModal();
  populateBigPicture(photo);

  // Добавляем обработчики событий
  document.addEventListener('keydown', keydownHandler);
  selectors.bigPictureElement.addEventListener('click', outsideClickHandler);
  selectors.bigPictureCancel.addEventListener('click', closeButtonHandler);
}

// Функция для закрытия полноразмерного изображения
function closeBigPicture() {
  toggleBodyScroll(false);
  selectors.bigPictureElement.classList.add('hidden');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', keydownHandler);
  selectors.bigPictureElement.removeEventListener('click', outsideClickHandler);
  selectors.bigPictureCancel.removeEventListener('click', closeButtonHandler);
}

// Функция для заполнения окна полноразмерного изображения данными
function populateBigPicture(photo) {

  selectors.bigPictureImg.src = photo.url;
  selectors.bigPictureImg.alt = photo.description;
  selectors.bigPictureLikes.textContent = photo.likes;
  const commentsCount = photo.comments.length;
  displayedCommentsCount = Math.min(commentsCount, 5);
  selectors.bigPictureCommentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;
  selectors.bigPictureCaption.textContent = photo.description;
  photo.comments.slice(0, displayedCommentsCount).forEach(createComment);
  toggleCommentsLoader(photo);
}


// Функция для отображения кнопки "Загрузить комментарии"
function toggleCommentsLoader(photo) {

  const commentsCount = photo.comments.length;
  if (commentsCount > displayedCommentsCount) {
    selectors.commentsLoader.classList.remove('hidden');
  } else {
    selectors.commentsLoader.classList.add('hidden');
  }
}


// Функция для загрузки следующих 5 комментариев
function loadMoreComments() {

  const commentsCount = currentPhoto.comments.length;
  const nextComments = currentPhoto.comments.slice(displayedCommentsCount, displayedCommentsCount + 5);
  nextComments.forEach(createComment);
  displayedCommentsCount += nextComments.length;
  selectors.bigPictureCommentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;
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
  selectors.bigPictureCommentsList.appendChild(commentElement);
}

function clearModal() {

  selectors.bigPictureImg.src = '';
  selectors.bigPictureLikes.textContent = '';
  selectors.bigPictureCommentsCount.textContent = '';
  selectors.bigPictureCaption.textContent = '';
  selectors.bigPictureCommentsList.innerHTML = '';
  selectors.commentsLoader.classList.add('hidden');
}

export {
  openBigPicture, loadMoreComments
};

