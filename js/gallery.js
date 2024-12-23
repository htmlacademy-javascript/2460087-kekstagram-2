import { openBigPicture, loadMoreComments, bigPictureSelectors } from './modal.js';
import { generatedPhotos } from './content-generator.js';
import { picturesContainer } from './render-thumbnails.js';

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
  initGallery(picturesContainer, photos);
}

// Обработчик для кнопки "Загрузить еще"
function initLoadMoreCommentsHandler() {
  bigPictureSelectors.loader?.addEventListener('click', loadMoreComments);
}

// Инициализация всех обработчиков
function init() {
  initPicturesContainer(generatedPhotos);
  initLoadMoreCommentsHandler();
}

init();
