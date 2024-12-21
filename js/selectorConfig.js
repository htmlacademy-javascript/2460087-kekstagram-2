const BIG_PICTURE_SELECTORS = {
  element: '.big-picture',
  img: '.big-picture__img img',
  likes: '.big-picture__social .social__likes span',
  commentsCount: '.big-picture__social .social__comment-count',
  commentsList: '.big-picture__social .social__comments',
  loader: '.big-picture__social .comments-loader',
  caption: '.big-picture__social .social__caption',
  cancel: '#picture-cancel',
};

const IMAGE_EDITING_SELECTORS = {
  element: '.img-upload__overlay',
  input: '.img-upload__input',
  preview: '.img-upload__preview',
  controls: '.img-upload__controls',
  hashtags: '.img-upload__hashtags',
  comments: '.img-upload__comments',
  cancel: '.img-upload__cancel',
  submit: '.img-upload__submit',
};


export { BIG_PICTURE_SELECTORS, IMAGE_EDITING_SELECTORS };
