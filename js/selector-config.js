const BIG_PICTURE_SELECTORS = {
  element: '.big-picture',
  img: '.big-picture__img img',
  likes: '.big-picture__social .social__likes span',
  commentsCount: '.big-picture__social .social__comment-count',
  commentsList: '.big-picture__social .social__comments',
  loader: '.big-picture__social .comments-loader',
  caption: '.big-picture__social .social__caption',
  cancel: '#picture-cancel',
  input: '.social__footer-text'
};

const IMAGE_EDITING_SELECTORS = {
  element: '.img-upload__overlay',
  input: '.img-upload__input',
  preview: '.img-upload__preview',
  controls: '.img-upload__controls',
  hashtags: '.text__hashtags',
  comments: '.text__description',
  cancel: '.img-upload__cancel',
  submit: '.img-upload__submit',
  form: '.img-upload__form',
  hashtagsInput: '.text__hashtags',
  captionInput: '.text__description',
};

const SCALE_SELECTORS = {
  smallerButton: '.scale__control--smaller',
  biggerButton: '.scale__control--bigger',
  valueInput: '.scale__control--value',
  previewImage: '.img-upload__preview img',
};

const SLIDER_SELECTORS = {
  effectLevel: '.img-upload__effect-level', // Контейнер слайдера
  effectLevelValue: '.effect-level__value', // Поле для записи значения
  effectLevelSlider: '.effect-level__slider', // Сам слайдер
  effectsList: '.effects__list', // Список эффектов
  effectRadioButtons: '.effects__radio', // Радиокнопки для переключения эффектов
};

export { BIG_PICTURE_SELECTORS, IMAGE_EDITING_SELECTORS, SCALE_SELECTORS, SLIDER_SELECTORS };
