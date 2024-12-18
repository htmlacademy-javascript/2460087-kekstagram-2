const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureElement.querySelector('.big-picture__social .social__likes span');
const bigPictureCommentsCount = bigPictureElement.querySelector('.big-picture__social .social__comment-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.big-picture__social .social__comments');
const commentsLoader = bigPictureElement.querySelector('.big-picture__social .comments-loader');
const bigPictureCaption = bigPictureElement.querySelector('.big-picture__social .social__caption');

let scrollPosition = 0;

function lockBodyScroll() {
  scrollPosition = window.scrollY;
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.width = '100%';
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.body.classList.add('modal-open');
}

function unlockBodyScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';
  window.scrollTo(0, scrollPosition);
  document.body.classList.remove('modal-open');
}

function clearModal() {
  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  bigPictureLikes.textContent = '';
  bigPictureCommentsCount.innerHTML = '';
  bigPictureCaption.textContent = '';
  bigPictureCommentsList.innerHTML = '';
}

function populateBigPicture(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;

  const commentsCount = photo.comments.length;
  bigPictureCommentsCount.innerHTML = `${commentsCount} из ${commentsCount} комментариев`;

  bigPictureCaption.textContent = photo.description;

  photo.comments.forEach(createComment);
}

function createComment(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);
  bigPictureCommentsList.appendChild(commentElement);
}

function openBigPicture(photo) {
  lockBodyScroll();
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.scrollTop = 0;
  bigPictureCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  clearModal();
  populateBigPicture(photo);
  bigPictureElement.addEventListener('click', handleOutsideClick);
}

function closeBigPicture() {
  unlockBodyScroll();
  bigPictureElement.classList.add('hidden');
  bigPictureElement.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
  if (!event.target.closest('.big-picture__img') &&
    !event.target.closest('.big-picture__social')) {
    closeBigPicture();
  }
}

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
