import { updatePhotos } from './filters.js';
import { getData } from './server.js';
import { showErrorMessage } from './messages.js';

const picturesContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;

// Создаёт DOM-элемент для одной фотографии
const createThumbnail = ({ url, description, likes, comments }, thumbnailTemplate) => {
  const pictureElement = thumbnailTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return pictureElement;
};

// Добавляет все миниатюры в контейнер
const appendThumbnails = (thumbnails, container) => {
  const fragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => fragment.appendChild(thumbnail));
  container.appendChild(fragment);
};

// Функция для очистки контейнера с фотографиями
const clearThumbnails = () => {
  const photos = picturesContainer.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

// Функция рендеринга
const renderThumbnails = (photos) => {
  clearThumbnails();
  const thumbnails = photos.map((photo) => createThumbnail(photo, template));
  appendThumbnails(thumbnails, picturesContainer);
};

// Загрузка данных и рендеринг
getData(
  (photosData) => {
    updatePhotos(photosData);
    renderThumbnails(photosData);
  },
  () => showErrorMessage()
);

export { picturesContainer, renderThumbnails };
