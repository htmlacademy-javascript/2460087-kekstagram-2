import { BIG_PICTURE_SELECTORS } from './selectorConfig.js';

// Функция для инициализации селекторов
const initializeSelectors = () => ({
  bigPictureElement: document.querySelector(BIG_PICTURE_SELECTORS.element),
  bigPictureImg: document.querySelector(BIG_PICTURE_SELECTORS.img),
  bigPictureLikes: document.querySelector(BIG_PICTURE_SELECTORS.likes),
  bigPictureCommentsCount: document.querySelector(BIG_PICTURE_SELECTORS.commentsCount),
  bigPictureCommentsList: document.querySelector(BIG_PICTURE_SELECTORS.commentsList),
  commentsLoader: document.querySelector(BIG_PICTURE_SELECTORS.loader),
  bigPictureCaption: document.querySelector(BIG_PICTURE_SELECTORS.caption),
  bigPictureCancel: document.querySelector(BIG_PICTURE_SELECTORS.cancel),
});


const selectors = initializeSelectors();

export { selectors };
