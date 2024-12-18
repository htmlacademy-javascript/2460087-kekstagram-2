const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureElement.querySelector('.big-picture__social .social__likes span');
const bigPictureCommentsCount = bigPictureElement.querySelector('.big-picture__social .social__comment-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.big-picture__social .social__comments');
const commentsLoader = bigPictureElement.querySelector('.big-picture__social .comments-loader');
const bigPictureCaption = bigPictureElement.querySelector('.big-picture__social .social__caption');

function openBigPicture(photo) {
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

  // обработчик для закрытия при клике вне контента
  bigPictureElement.addEventListener('click', handleOutsideClick);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // удаление обработчика
  bigPictureElement.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
  if (!event.target.closest('.big-picture__img') &&
    !event.target.closest('.big-picture__social')) {
    closeBigPicture();
  }
}

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
    if (event.target.closest('.picture')) {
      const pictureElement = event.target.closest('.picture');
      const pictureImg = pictureElement.querySelector('.picture__img');

      const pictureSrc = pictureImg.src.split('/').pop();
      const picture = photos.find((photo) => photo.url === `photos/${pictureSrc}`);
      openBigPicture(picture);
    }
  });
}

function initPicturesContainer(photos) {
  const container = document.querySelector('.pictures');
  initGallery(container, photos);
}

export { initPicturesContainer };
