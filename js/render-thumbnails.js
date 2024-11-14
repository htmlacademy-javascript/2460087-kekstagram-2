function renderThumbnails(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
}

export { renderThumbnails };
