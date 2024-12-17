// Создаёт DOM-элемент для одной фотографии

function createThumbnail({ url, description, likes, comments }, template) {
  const pictureElement = template.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return pictureElement;
}

// Добавляет все миниатюры в контейнер
function appendThumbnails(thumbnails, container) {
  const fragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => fragment.appendChild(thumbnail));
  container.appendChild(fragment);
}

// Функция рендера
function renderThumbnails(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;

  const thumbnails = photos.map((photo) => createThumbnail(photo, template));
  appendThumbnails(thumbnails, picturesContainer);
}
export { renderThumbnails };
