import { selectors } from './selectors.js';
import { openBigPicture, loadMoreComments } from './modal.js';
import { generatedPhotos } from './content-generator.js';

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

// Обработчик для кнопки "Загрузить еще"
selectors.commentsLoader?.addEventListener('click', loadMoreComments);

initPicturesContainer(generatedPhotos);
