const HASHTAGS_REGEXP = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;
const CAPTION_MAX_LENGTH = 140;

const INVALID_HASHTAG_UNIQUE = 'Пожалуйста, убедитесь, что каждый хэш-тег уникален.';
const INVALID_HASHTAG_SYMBOLS = 'Хэш-тег должен начинаться с # и содержать только буквы и цифры (до 20 символов).';
const INVALID_HASHTAG_COUNT = 'Вы можете использовать не более 5 хэш-тегов.';
const INVALID_CAPTION = 'Комментарий не должен превышать 140 символов.';
