import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';
import { IMAGE_EDITING_SELECTORS } from './selector-config.js';
import { initializeValidators } from './validate.js';
import { scaleSelectors, updateScale, handleSmallerButtonClick, handleBiggerButtonClick, START_SCALE } from './scale.js';
import { initializeApp } from './slider.js';

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
const closeForm = (selectors) => {
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
  document.addEventListener('keydown', (event) => handleEscapeKey(event, () => closeForm(selectors)));
  selectors.cancel.addEventListener('click', () => closeForm(selectors));
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

// Функция обработки отправки формы
const handleFormSubmit = (event, selectors, pristine) => {
  event.preventDefault();
  updateEffectLevelInForm();
  if (pristine.validate()) {
    selectors.form.submit();
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
