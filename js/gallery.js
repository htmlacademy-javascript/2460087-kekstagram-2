import { openBigPicture, loadMoreComments, bigPictureSelectors } from './modal.js';
import { renderThumbnails, picturesContainer } from './render-thumbnails.js';
import { getData } from './server.js';
import { showErrorMessage } from './messages.js';

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

// Инициализация всех обработчиков
const init = () => {
  getData(
    (photos) => {
      initPicturesContainer(photos);
      initLoadMoreCommentsHandler();
    },
    showErrorMessage
  );
};

init();
