import { initializeSelectors } from './util';
import { SLIDER_SELECTORS } from './selector-config';

// Вспомогательные функции
const initializeSlider = (slider) => {
  if (slider.noUiSlider) { // Проверка, был ли слайдер уже инициализирован
    return;
  }
  noUiSlider.create(slider, {
    start: 1,
    range: { min: 0, max: 1 },
    step: 0.1,
  });
};

const getSelectedEffect = () => document.querySelector('input[name="effect"]:checked').value;

const getFilterValue = (effect, value) => {
  switch (effect) {
    case 'chrome': return `grayscale(${value})`;
    case 'sepia': return `sepia(${value})`;
    case 'marvin': return `invert(${value * 100}%)`;
    case 'phobos': return `blur(${value * 3}px)`;
    case 'heat': return `brightness(${value * 3})`;
    default: return '';
  }
};

const applyFilter = (selectors, filterValue) => {
  selectors.previewImage.style.filter = filterValue;
  selectors.effectLevelValue.textContent = filterValue;
};

const onSliderUpdate = (selectors) => (values, handle) => {
  const value = values[handle];
  const currentEffect = getSelectedEffect();
  const filterValue = getFilterValue(currentEffect, value);

  applyFilter(selectors, filterValue);
};

const onEffectChange = (selectors) => () => {
  const selectedEffect = getSelectedEffect();
  if (selectedEffect === 'original') {
    selectors.previewImage.style.filter = '';
    selectors.effectLevel.classList.add('hidden');
  } else {
    selectors.effectLevel.classList.remove('hidden');
    selectors.effectLevelSlider.noUiSlider.set(1);
  }
};

// Инициализация функции
const initializeApp = () => {
  const selectors = initializeSelectors(SLIDER_SELECTORS);
  selectors.previewImage = document.querySelector('.img-upload__preview img');
  selectors.effectRadioButtons = document.querySelectorAll(SLIDER_SELECTORS.effectRadioButtons);

  // Инициализация слайдера
  initializeSlider(selectors.effectLevelSlider);

  // Обработчики событий
  selectors.effectLevelSlider.noUiSlider.on('update', onSliderUpdate(selectors));
  selectors.effectRadioButtons.forEach((radio) => {
    radio.addEventListener('change', onEffectChange(selectors));
  });

  // Сброс значений при закрытии формы
  selectors.effectLevel.classList.add('hidden');
};

// Запуск инициализации
document.addEventListener('DOMContentLoaded', initializeApp);


export {
  initializeApp
};
