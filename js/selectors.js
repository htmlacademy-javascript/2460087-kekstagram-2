// Функция для инициализации селекторов
function initializeSelectors() {
  return {
    bigPictureElement: document.querySelector('.big-picture'),
    bigPictureImg: document.querySelector('.big-picture__img img'),
    bigPictureLikes: document.querySelector('.big-picture__social .social__likes span'),
    bigPictureCommentsCount: document.querySelector('.big-picture__social .social__comment-count'),
    bigPictureCommentsList: document.querySelector('.big-picture__social .social__comments'),
    commentsLoader: document.querySelector('.big-picture__social .comments-loader'),
    bigPictureCaption: document.querySelector('.big-picture__social .social__caption'),
  };
}


// Функция для обновления селекторов в случае изменения DOM
function refreshSelectors() {
  return initializeSelectors();
}

export { initializeSelectors, refreshSelectors };
