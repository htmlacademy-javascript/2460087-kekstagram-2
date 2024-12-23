import { initializeValidators } from './validate.js';
import { IMAGE_EDITING_SELECTORS } from './selector-config.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';

const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
const keydownHandler = (event) => handleEscapeKey(event, () => closeForm(imageEditingSelectors));
const closeButtonHandler = () => closeForm(imageEditingSelectors);


const pristine = initializeValidators(
  imageEditingSelectors.form,
  imageEditingSelectors.hashtagsInput,
  imageEditingSelectors.captionInput
);

// Валидация формы при попытке отправить
imageEditingSelectors.form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    imageEditingSelectors.form.submit();
  }
});

// Открытие формы после выбора файла
imageEditingSelectors.input.addEventListener('change', () => {
  if (imageEditingSelectors.input.files.length > 0) {
    initializeForm(imageEditingSelectors);
  }
});

// Блокировка клавиши esc
function stopEscPropagation(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
}

// Обработчики событий
function toggleHandlers(selectors, addHandlers) {
  const method = addHandlers ? 'addEventListener' : 'removeEventListener';

  document[method]('keydown', keydownHandler);
  selectors.cancel[method]('click', closeButtonHandler);
  selectors.hashtags[method]('keydown', stopEscPropagation);
  selectors.comments[method]('keydown', stopEscPropagation);
}


// Инициализация формы
function initializeForm(selectors) {
  toggleHandlers(selectors, true);
  toggleBodyScroll(true);
  selectors.element.scrollTop = 0;
  selectors.element.classList.remove('hidden');
}


// Закрытие формы
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

