import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';
import { IMAGE_EDITING_SELECTORS } from './selector-config.js';
import { initializeValidators } from './validate.js';
import { scaleSelectors, updateScale, handleSmallerButtonClick, handleBiggerButtonClick, START_SCALE } from './scale.js';
import { initializeApp } from './slider.js';
import { sendData } from './server.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

// Функция для обработки хэштегов
const processHashtags = (input) => {
  const hashtags = input.split(' ');

  const processedHashtags = hashtags.map((tag) => {
    const cleanedTag = tag.trim();
    if (cleanedTag && cleanedTag[0] !== '#') {
      return `#${cleanedTag}`;
    }
    return cleanedTag;
  });

  return processedHashtags.join(' ');
};

const handleHashtagsInput = (event) => {
  const processedValue = processHashtags(event.target.value);
  event.target.value = processedValue;
};

// Функция для предотвращения закрытия формы при нажатии ESC
const stopEscPropagation = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

// Функция закрытия формы
const closeForm = (selectors, handleFormClose) => {
  document.removeEventListener('keydown', handleFormClose);
  selectors.cancel.removeEventListener('click', () => closeForm(selectors, handleFormClose));
  selectors.effectLevel.classList.add('hidden');
  selectors.hashtags.removeEventListener('keydown', stopEscPropagation);
  selectors.comments.removeEventListener('keydown', stopEscPropagation);
  selectors.hashtags.removeEventListener('input', handleHashtagsInput);
  toggleBodyScroll(false);
  selectors.element.classList.add('hidden');
  selectors.input.value = '';
  selectors.element.querySelector('#upload-select-image')?.reset();
  scaleSelectors.smallerButton.removeEventListener('click', handleSmallerButtonClick);
  scaleSelectors.biggerButton.removeEventListener('click', handleBiggerButtonClick);

  // Сброс всех данных и состояний формы
  selectors.input.value = '';
  selectors.form.reset();
  updateScale(START_SCALE);
  selectors.effectLevel.classList.add('hidden');
  // Сброс эффектов на оригинал
  const effectRadioButtons = document.querySelectorAll('.effect-level__radio');
  effectRadioButtons.forEach((radio) => {
    if (radio.value === 'original') {
      radio.checked = true;
    }
  });
  // хэштеги и комментарии
  selectors.hashtags.value = '';
  selectors.comments.value = '';
  // Скрыть форму
  selectors.element.classList.add('hidden');
  toggleBodyScroll(false);
};


// Функция для обновления уровня эффекта
const updateEffectLevelInForm = () => {
  const effectLevelInput = document.querySelector('input[name="effect-level"]');
  const effectSlider = document.querySelector('.effect-level__slider');
  if (effectSlider.noUiSlider) {
    const effectLevelValue = effectSlider.noUiSlider.get();
    effectLevelInput.value = effectLevelValue;
  }
};

// Функция предварительного просмотра изображения
const setupImagePreview = (selectors) => {
  selectors.input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        selectors.preview.src = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  });
};

// Функция инициализации формы редактирования изображения
const initializeImageEditingForm = (selectors) => {
  const handleFormClose = (event) => handleEscapeKey(event, () => closeForm(selectors));

  document.addEventListener('keydown', handleFormClose);

  selectors.cancel.addEventListener('click', () => {
    closeForm(selectors, handleFormClose);
  });

  initializeApp();
  selectors.hashtags.addEventListener('keydown', stopEscPropagation);
  selectors.comments.addEventListener('keydown', stopEscPropagation);
  selectors.hashtags.addEventListener('input', handleHashtagsInput);
  toggleBodyScroll(true);
  selectors.element.classList.remove('hidden');
  updateScale(START_SCALE);
  scaleSelectors.smallerButton.addEventListener('click', handleSmallerButtonClick);
  scaleSelectors.biggerButton.addEventListener('click', handleBiggerButtonClick);
};

const removeMessage = (messageClass) => {
  const message = document.querySelector(messageClass);
  if (message) {
    message.remove();
  }
};

const handleMessageRemove = (event) => {
  if (
    event.key === 'Escape' ||
    event.target.closest('.success__button') ||
    event.target.closest('.data-error__button') ||
    (!event.target.closest('.success') && !event.target.closest('.data-error'))
  ) {
    removeMessage('.success');
    removeMessage('.data-error');
  }
};

document.addEventListener('keydown', handleMessageRemove);
document.body.addEventListener('click', handleMessageRemove);

// Обработчик отправки формы
const handleFormSubmit = (event, selectors, pristine) => {
  event.preventDefault(); // Отмена стандартного поведения формы

  updateEffectLevelInForm(); // Обновить уровень эффекта в форме

  const submitButton = selectors.submit;
  submitButton.disabled = true; // Блок кнопки

  if (pristine.validate()) {
    const formData = new FormData(selectors.form); // Собрать данные формы
    sendData(
      () => {
        submitButton.disabled = false; // Разблокировать кнопку после успешной отправки
        showSuccessMessage(); // Показать успешное сообщение
        closeForm(selectors); // Закрыть форму и сбросить данные
      },
      () => {
        submitButton.disabled = false; // Разблокировать кнопку при ошибке
        showErrorMessage(); // Показать сообщение об ошибке
      },
      formData // Отправить данные формы
    );
  } else {
    submitButton.disabled = false; // Разблокировать кнопку, если форма не прошла валидацию
  }
};

// Инициализация формы загрузки изображения
const initializeImageUpload = () => {
  const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);

  const pristine = initializeValidators(
    imageEditingSelectors.form,
    imageEditingSelectors.hashtags,
    imageEditingSelectors.comments
  );

  imageEditingSelectors.input.addEventListener('change', () => {
    if (imageEditingSelectors.input.files.length > 0) {
      initializeImageEditingForm({ ...imageEditingSelectors });
    }
  });

  imageEditingSelectors.form.addEventListener('submit', (event) =>
    handleFormSubmit(event, { ...imageEditingSelectors, ...imageEditingSelectors }, pristine)
  );

  setupImagePreview(imageEditingSelectors);
};

export { initializeImageUpload };
