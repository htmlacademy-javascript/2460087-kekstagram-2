import { initializeValidators } from './validate.js';
import { IMAGE_EDITING_SELECTORS } from './selector-config.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';

const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
const keydownHandler = (event) => handleEscapeKey(event, () => closeForm(imageEditingSelectors));
const closeButtonHandler = () => closeForm(imageEditingSelectors);

// Инициализация валидатора
const pristine = initializeValidators(
  imageEditingSelectors.form,
  imageEditingSelectors.hashtagsInput,
  imageEditingSelectors.captionInput
);

// Функции для обработки хэштегов
function processHashtags(input) {
  const hashtags = input.split(' ');

  const processedHashtags = hashtags.map((tag) => {
    const cleanedTag = tag.trim();
    if (cleanedTag && cleanedTag[0] !== '#') {
      return `#${cleanedTag}`;
    }
    return cleanedTag;
  });

  return processedHashtags.join(' ');
}

function handleHashtagsInput(event) {
  const processedValue = processHashtags(event.target.value);
  event.target.value = processedValue;
}

// Функции для обработки событий
function stopEscPropagation(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
}

// Открыть форму
function initializeForm(selectors) {
  // для клавиши ESC
  document.addEventListener('keydown', keydownHandler);
  // для кнопки закрытия формы
  selectors.cancel.addEventListener('click', closeButtonHandler);
  // для хэштегов и комментариев
  selectors.hashtags.addEventListener('keydown', stopEscPropagation);
  selectors.comments.addEventListener('keydown', stopEscPropagation);
  // для ввода хэштегов
  selectors.hashtags.addEventListener('input', handleHashtagsInput);
  // отключить прокрутку страницы
  toggleBodyScroll(true);
  // Сбросить скролл и показать форму
  selectors.element.classList.remove('hidden');
}

// Функция закрытия формы
function closeForm(selectors) {
  // для клавиши ESC
  document.removeEventListener('keydown', keydownHandler);
  // для кнопки закрытия формы
  selectors.cancel.removeEventListener('click', closeButtonHandler);
  // для хэштегов и комментариев
  selectors.hashtags.removeEventListener('keydown', stopEscPropagation);
  selectors.comments.removeEventListener('keydown', stopEscPropagation);
  // для ввода хэштегов
  selectors.hashtags.removeEventListener('input', handleHashtagsInput);
  // Прокрутка страницы
  toggleBodyScroll(false);
  // Скрыть форму
  selectors.element.classList.add('hidden');
  // Сброс значения поля выбора файла
  selectors.input.value = '';
  // Сброс значений других полей формы
  const resetForm = selectors.element.querySelector('#upload-select-image');
  if (resetForm) {
    resetForm.reset();
  }
}

// Обработчики событий
imageEditingSelectors.form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    imageEditingSelectors.form.submit();
  }
});

imageEditingSelectors.input.addEventListener('change', () => {
  if (imageEditingSelectors.input.files.length > 0) {
    initializeForm(imageEditingSelectors);
  }
});
