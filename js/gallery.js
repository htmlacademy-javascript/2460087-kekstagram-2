import { selectors, refreshSelectors } from './selectors.js';
import { currentPhoto, openBigPicture} from './modal.js';

let displayedCommentsCount = 0; // Счётчик отображенных комментариев

function clearModal() {
  if (!selectors.bigPictureElement) {
    refreshSelectors();
  }

  selectors.bigPictureImg.src = '';
  selectors.bigPictureLikes.textContent = '';
  selectors.bigPictureCommentsCount.textContent = '';
  selectors.bigPictureCaption.textContent = '';
  selectors.bigPictureCommentsList.innerHTML = '';
  selectors.commentsLoader.classList.add('hidden');
}

// Функция для отображения кнопки "Загрузить комментарии"
function toggleCommentsLoader(photo) {
  if (!selectors.commentsLoader) {
    refreshSelectors();
  }
  const commentsCount = photo.comments.length;
  if (commentsCount > displayedCommentsCount) {
    selectors.commentsLoader.classList.remove('hidden');
  } else {
    selectors.commentsLoader.classList.add('hidden');
  }
}

// Функция для заполнения окна полноразмерного изображения данными
function populateBigPicture(photo) {
  if (!selectors.bigPictureElement) {
    refreshSelectors();
  }

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

// Функция для загрузки следующих 5 комментариев
function loadMoreComments() {
  if (!currentPhoto || !selectors.bigPictureCommentsList) {
    refreshSelectors();
  }

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


// Инициализация галереи
function initGallery(container, photos) {
  container.addEventListener('click', (event) => {
    const pictureElement = event.target.closest('.picture');
    if (pictureElement) {
      const pictureSrc = pictureElement.querySelector('.picture__img').src.split('/').pop();
      const picture = photos.find((photo) => photo.url === `photos/${pictureSrc}`);
      openBigPicture(picture);
    }
  });
}

// Инициализация контейнера фотографий
function initPicturesContainer(photos) {
  const container = document.querySelector('.pictures');
  initGallery(container, photos);
}

// Обработчик для кнопки "Загрузить ещё"
selectors.commentsLoader?.addEventListener('click', loadMoreComments);

export { populateBigPicture, initPicturesContainer, clearModal };
