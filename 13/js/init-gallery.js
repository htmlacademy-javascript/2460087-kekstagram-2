import { getData } from './server.js';
import { showErrorMessage } from './messages.js';
import { picturesContainer, renderThumbnails } from './render-thumbnails.js';
import { openBigPicture, loadMoreComments, bigPictureSelectors } from './modal.js';

// Инициализация галереи
const initGallery = (container, photos) => {
  container.addEventListener('click', (event) => {
    const pictureElement = event.target.closest('.picture');
    if (pictureElement) {
      const pictureSrc = pictureElement.querySelector('.picture__img').src.split('/').pop();
      const picture = photos.find((photo) => photo.url === `photos/${pictureSrc}`);
      openBigPicture(picture);
    }
  });
};

// Инициализация контейнера фотографий
const initPicturesContainer = (photos) => {
  renderThumbnails(photos);
  initGallery(picturesContainer, photos);
};

// Обработчик для кнопки "Загрузить еще"
const initLoadMoreCommentsHandler = () => {
  bigPictureSelectors.loader?.addEventListener('click', loadMoreComments);
};

// Инициализация модуля галереи
const initGalleryModule = () => {
  getData(
    (photos) => {
      initPicturesContainer(photos);
      initLoadMoreCommentsHandler();
    },
    showErrorMessage
  );
};

export { initGalleryModule };
