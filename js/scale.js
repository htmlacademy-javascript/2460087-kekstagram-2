import { IMAGE_EDITING_SELECTORS } from './selector-config.js';
import { initializeSelectors } from './util.js';

const MIN_SCALE = 25; // Минимальное значение масштаба
const MAX_SCALE = 100; // Максимальное значение масштаба
const START_SCALE = 100; // Стартовое значение масштаба
const SCALE_STEP = 25; // Шаг изменения масштаба

const scaleSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);

// Функция для обновления масштаба
const updateScale = (scaleValue) => {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scaleValue));
  scaleSelectors.valueInput.value = `${scale}%`;
  scaleSelectors.previewImage.style.transform = `scale(${scale / 100})`;
};

// Обработчик для уменьшения масштаба
const handleSmallerButtonClick = () => {
  const currentScale = parseInt(scaleSelectors.valueInput.value, 10);
  updateScale(currentScale - SCALE_STEP);
};

// Обработчик для увеличения масштаба
const handleBiggerButtonClick = () => {
  const currentScale = parseInt(scaleSelectors.valueInput.value, 10);
  updateScale(currentScale + SCALE_STEP);
};

export {
  scaleSelectors,
  updateScale,
  handleSmallerButtonClick,
  handleBiggerButtonClick,
  START_SCALE
};
