import { initializeValidators } from './validate.js';
import { IMAGE_EDITING_SELECTORS } from './selectorConfig.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';

const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
const keydownHandler = (event) => handleEscapeKey(event, closeForm);
const closeButtonHandler = () => closeForm();

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const captionInput = document.querySelector('.text__description');

const pristine = initializeValidators(form, hashtagsInput, captionInput);

// Валидация формы при попытке отправить
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

// Открытие формы после выбора файла
imageEditingSelectors.input.addEventListener('change', () => {
  if (imageEditingSelectors.input.files.length > 0) {
    initializeForm();
  }
});

// Блокировка клавиши esc
function stopEscPropagation(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
}

// Инициализация формы
function initializeForm() {
  document.addEventListener('keydown', keydownHandler);
  toggleBodyScroll(true);
  imageEditingSelectors.element.scrollTop = 0;
  imageEditingSelectors.element.classList.remove('hidden');

  // Обработчики событий
  imageEditingSelectors.cancel.addEventListener('click', closeButtonHandler);
  imageEditingSelectors.hashtags.addEventListener('keydown', stopEscPropagation);
  imageEditingSelectors.comments.addEventListener('keydown', stopEscPropagation);
}

// Закрытие формы
function closeForm() {
  toggleBodyScroll(false);
  imageEditingSelectors.element.classList.add('hidden');

  // Сброс значения поля выбора файла
  imageEditingSelectors.input.value = '';

  // Сброс значений других полей формы
  const resetForm = imageEditingSelectors.element.querySelector('#upload-select-image');
  if (resetForm) {
    resetForm.reset();
  }

  // Удаление обработчиков
  document.removeEventListener('keydown', keydownHandler);
  imageEditingSelectors.cancel.removeEventListener('click', closeButtonHandler);
  imageEditingSelectors.hashtags.removeEventListener('keydown', stopEscPropagation);
  imageEditingSelectors.comments.removeEventListener('keydown', stopEscPropagation);
}
