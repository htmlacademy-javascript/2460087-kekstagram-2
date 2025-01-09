import { initializeSelectors } from './util';
import { IMAGE_EDITING_SELECTORS } from './selector-config';

const EFFECTS = {
  default: { filter: null, range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '' },
  chrome: { filter: 'grayscale', range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', range: { min: 0, max: 100 }, start: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', range: { min: 0, max: 3 }, start: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', range: { min: 1, max: 3 }, start: 3, step: 0.1, unit: '' },
};

const setSliderEffect = (effectName) => EFFECTS[effectName] || EFFECTS.default;

// Обновление отображения ползунка
const updateSlider = (selectors, effect) => {
  selectors.effectLevelSlider.noUiSlider.off();
  selectors.effectLevelSlider.noUiSlider.on('update', () => {
    const value = +selectors.effectLevelSlider.noUiSlider.get();
    selectors.effectLevelValue.value = value;
    selectors.previewImage.style.filter = effect.filter
      ? `${effect.filter}(${value}${effect.unit})`
      : '';
  });
};

// Создание слайдера
const createSlider = (selectors, effect) => {
  noUiSlider.create(selectors.effectLevelSlider, {
    range: effect.range,
    start: effect.start,
    step: effect.step,
    connect: 'lower',
  });
  updateSlider(selectors, effect);
};

// Обновление параметров
const updateSliderOptions = (selectors, effect) => {
  selectors.effectLevelSlider.noUiSlider.updateOptions({
    range: effect.range,
    start: effect.start,
    step: effect.step,
  });
  updateSlider(selectors, effect);
};

// Показать или скрыть
const setSliderStatus = (selectors, effect) => {
  selectors.effectLevel.classList.toggle('hidden', effect.filter === null);
};

// Обработчик изменения эффекта
const onEffectChange = (selectors) => (event) => {
  const effectName = event.target.value;
  const effect = setSliderEffect(effectName);
  setSliderStatus(selectors, effect);
  if (!selectors.effectLevelSlider.noUiSlider) {
    createSlider(selectors, effect);
  } else {
    updateSliderOptions(selectors, effect);
  }
};

// Инициализация слайдера
const initializeApp = () => {
  const selectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
  selectors.previewImage = document.querySelector('.img-upload__preview img');
  selectors.effectRadioButtons = document.querySelectorAll(IMAGE_EDITING_SELECTORS.effectRadioButtons);

  selectors.effectRadioButtons.forEach((radio) => {
    radio.addEventListener('change', onEffectChange(selectors));
  });

  selectors.effectLevel.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', initializeApp);

export { initializeApp };
