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

function toggleHandlers(selectors, addHandlers) {
  const method = addHandlers ? 'addEventListener' : 'removeEventListener';

  // для клавиши ESC
  document[method]('keydown', keydownHandler);

  // для кнопки закрытия формы
  selectors.cancel[method]('click', closeButtonHandler);

  // для хэштегов и комментариев
  selectors.hashtags[method]('keydown', stopEscPropagation);
  selectors.comments[method]('keydown', stopEscPropagation);

  // для ввода хэштегов
  if (addHandlers) {
    selectors.hashtags.addEventListener('input', handleHashtagsInput);
  } else {
    selectors.hashtags.removeEventListener('input', handleHashtagsInput);
  }
}

// Функции для работы с формой
function initializeForm(selectors) {
  toggleHandlers(selectors, true);
  toggleBodyScroll(true);
  selectors.element.scrollTop = 0;
  selectors.element.classList.remove('hidden');
}

function closeForm(selectors) {
  toggleHandlers(selectors, false);
  toggleBodyScroll(false);
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

export {
  imageEditingSelectors
};
