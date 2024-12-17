import { generatedPhotos } from './content-generator.js';

// проверить названия по критериям
// решить проблему со "скачком" окна

let scrollPosition = 0; // Сохраняет позицию скролла

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureElement.querySelector('.big-picture__social .social__likes span');
const bigPictureCommentsCount = bigPictureElement.querySelector('.big-picture__social .social__comment-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.big-picture__social .social__comments');
const commentsLoader = bigPictureElement.querySelector('.big-picture__social .comments-loader');
const bigPictureCaption = bigPictureElement.querySelector('.big-picture__social .social__caption');

function openBigPicture(photo) {
  scrollPosition = window.scrollY;

  bigPictureElement.classList.remove('hidden');

  // Скрывает блоки с комментами и загрузкой
  bigPictureCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Запрет прокрутки
  document.body.classList.add('modal-open');

  // Заполнение данными
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  bigPictureLikes.textContent = photo.likes;

  const commentsCount = photo.comments.length;
  bigPictureCommentsCount.innerHTML = `${commentsCount} из ${commentsCount} комментариев`;

  bigPictureCaption.textContent = photo.description;

  bigPictureCommentsList.innerHTML = '';

  // Генерация и добавление комментариев
  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = `${comment.name}`;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentText);

    bigPictureCommentsList.appendChild(commentElement);
  });
}

function closeBigPicture() {
  const bigPictureElements = document.querySelector('.big-picture'); // особенно над этим названием подумать
  bigPictureElements.classList.add('hidden');
  window.scrollTo(0, scrollPosition);
  document.body.classList.remove('modal-open');
}
// где-то здесь удаляются другие обработчики
function closedBigPicture() {
  document.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeBigPicture();
    }
  });
}

closedBigPicture();

function initGallery(container, photos) {
  container.addEventListener('click', (event) => {
    // Проверка клика
    if (event.target.closest('.picture')) {
      const pictureElement = event.target.closest('.picture');
      const pictureImg = pictureElement.querySelector('.picture__img');

      // Получение имени файла изображения
      const pictureSrc = pictureImg.src.split('/').pop();

      // Поиск фотографии по URL
      const picture = photos.find((photo) => photo.url === `photos/${pictureSrc}`);
      openBigPicture(picture);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const picturesContainer = document.querySelector('.pictures');

  initGallery(picturesContainer, generatedPhotos);
});


export { initGallery, closedBigPicture };
