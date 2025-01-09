const HASHTAGS_REGEXP = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;
const CAPTION_MAX_LENGTH = 140;

const INVALID_HASHTAG_UNIQUE = 'Пожалуйста, убедитесь, что каждый хэш-тег уникален.';
const INVALID_HASHTAG_SYMBOLS = 'Хэш-тег должен начинаться с # и содержать только буквы и цифры (до 20 символов).';
const INVALID_HASHTAG_COUNT = 'Вы можете использовать не более 5 хэш-тегов.';
const INVALID_CAPTION = 'Комментарий не должен превышать 140 символов.';

// Приводит хэш-теги к единому формату
const formatsHashtags = (value) =>
  value.trim().toLowerCase().split(' ').filter((hashtag) => hashtag);

// Проверяет уникальность хэш-тегов
const isUniqueHashtags = (value) => {
  const hashtags = formatsHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

// Проверяет правильность хэш-тегов
const isRightHashtags = (value) =>
  formatsHashtags(value).every((hashtag) => HASHTAGS_REGEXP.test(hashtag));

// Проверяет количество хэш-тегов
const isMaxCountHashtags = (value) =>
  formatsHashtags(value).length <= HASHTAGS_MAX_COUNT;

// Проверяет длину комментария
const isValidCaption = (value) => value.length < CAPTION_MAX_LENGTH;

// Инициализация валидаторов
const initializeValidators = (form, hashtagsInput, captionInput) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(
    hashtagsInput,
    isUniqueHashtags,
    INVALID_HASHTAG_UNIQUE,
    true
  );
  pristine.addValidator(
    hashtagsInput,
    isRightHashtags,
    INVALID_HASHTAG_SYMBOLS,
    true
  );
  pristine.addValidator(
    hashtagsInput,
    isMaxCountHashtags,
    INVALID_HASHTAG_COUNT,
    true
  );
  pristine.addValidator(
    captionInput,
    isValidCaption,
    INVALID_CAPTION,
    true
  );

  return pristine;
};

export { initializeValidators };
