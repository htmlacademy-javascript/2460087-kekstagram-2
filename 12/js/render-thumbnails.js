import { generatedPhotos } from './content-generator.js';

// Селекторы
const picturesContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;

// Функции

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

// Функция рендера
const renderThumbnails = (photos) => {
  const thumbnails = photos.map((photo) => createThumbnail(photo, template));
  appendThumbnails(thumbnails, picturesContainer);
};

// Вызов рендера
renderThumbnails(generatedPhotos);

export { picturesContainer };
