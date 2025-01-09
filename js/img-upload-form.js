import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';
import { IMAGE_EDITING_SELECTORS } from './selector-config.js';
import { scaleSelectors, updateScale, handleSmallerButtonClick, handleBiggerButtonClick, START_SCALE } from './scale.js';
import { initializeApp } from './slider.js';
import { initializeValidators } from './validate.js';

// Функции для обработки хэштегов
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

// Функции для обработки событий
const stopEscPropagation = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

// Закрыть форму
const closeForm = (selectors) => {
  // удаление обработчиков
  document.removeEventListener('keydown', (event) => handleEscapeKey(event, () => closeForm(selectors)));
  selectors.cancel.removeEventListener('click', () => closeForm(selectors));
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
};

// Передача значения слайдера в форму
const updateEffectLevelInForm = () => {
  const effectLevelInput = document.querySelector('input[name="effect-level"]');
  const effectSlider = document.querySelector('.effect-level__slider');
  if (effectSlider.noUiSlider) {
    const effectLevelValue = effectSlider.noUiSlider.get();
    effectLevelInput.value = effectLevelValue;
  }
};

// Создание предварительного просмотра изображения
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

// Инициализация формы
const initializeForm = (selectors) => {
  // обработка клавиши ESC
  document.addEventListener('keydown', (event) => handleEscapeKey(event, () => closeForm(selectors)));
  // кнопка закрытия формы
  selectors.cancel.addEventListener('click', () => closeForm(selectors));
  // слайдер и фильтры
  initializeApp();
  // хэштеги и комментарии
  selectors.hashtags.addEventListener('keydown', stopEscPropagation);
  selectors.comments.addEventListener('keydown', stopEscPropagation);
  selectors.hashtags.addEventListener('input', handleHashtagsInput);
  // отключить прокрутку
  toggleBodyScroll(true);
  // показать форму
  selectors.element.classList.remove('hidden');

  // начальный масштаб
  updateScale(START_SCALE);

  // обработчики изменения масштаба
  scaleSelectors.smallerButton.addEventListener('click', handleSmallerButtonClick);
  scaleSelectors.biggerButton.addEventListener('click', handleBiggerButtonClick);
};

// Обработчик отправки формы
const handleFormSubmit = (event, selectors, pristine) => {
  event.preventDefault();
  updateEffectLevelInForm();
  if (pristine.validate()) {
    selectors.form.submit();
  }
};

// Инициализация формы для загрузки изображения
const initializeImageUploadForm = () => {
  const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
  const pristine = initializeValidators(
    imageEditingSelectors.form,
    imageEditingSelectors.hashtagsInput,
    imageEditingSelectors.captionInput
  );

  imageEditingSelectors.input.addEventListener('change', () => {
    if (imageEditingSelectors.input.files.length > 0) {
      initializeForm(imageEditingSelectors);
    }
  });

  imageEditingSelectors.form.addEventListener('submit', (event) => handleFormSubmit(event, imageEditingSelectors, pristine));

  setupImagePreview(imageEditingSelectors);
};

initializeImageUploadForm();
