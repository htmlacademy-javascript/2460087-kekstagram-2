import { initializeSelectors } from './util';
import { SLIDER_SELECTORS } from './selector-config';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация селекторов
  const selectors = initializeSelectors(SLIDER_SELECTORS);
  selectors.previewImage = document.querySelector('.img-upload__preview img');
  selectors.effectRadioButtons = document.querySelectorAll(SLIDER_SELECTORS.effectRadioButtons);

  // Инициализация слайдера
  noUiSlider.create(selectors.effectLevelSlider, {
    start: 1,
    range: { min: 0, max: 1 },
    step: 0.1,
  });

  // Применение фильтра
  const applyFilter = (filterValue) => {
    selectors.previewImage.style.filter = filterValue;
  };

  // Обработчик обновления значения слайдера
  selectors.effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = values[handle]; // Получить текущее значение
    const currentEffect = document.querySelector('input[name="effect"]:checked').value;

    let filterValue = '';
    switch (currentEffect) {
      case 'chrome':
        filterValue = `grayscale(${value})`;
        break;
      case 'sepia':
        filterValue = `sepia(${value})`;
        break;
      case 'marvin':
        filterValue = `invert(${value * 100}%)`;
        break;
      case 'phobos':
        filterValue = `blur(${value * 3}px)`;
        break;
      case 'heat':
        filterValue = `brightness(${value * 3})`;
        break;
      default:
        filterValue = '';
        break;
    }

    // Применяет фильтр
    applyFilter(filterValue);

    // Обновить значение в поле
    selectors.effectLevelValue.textContent = value;
  });

  // Обработчик изменения радиокнопок эффектов
  selectors.effectRadioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      const selectedEffect = document.querySelector('input[name="effect"]:checked').value;

      // Фильтр по умолчанию
      if (selectedEffect === 'original') {
        selectors.previewImage.style.filter = '';
        selectors.effectLevel.classList.add('hidden');
      } else {
        selectors.effectLevel.classList.remove('hidden');
        // Сброс к начальному значению
        selectors.effectLevelSlider.noUiSlider.set(1);
      }
    });
  });

  // Сброс значений при закрытии формы
  selectors.effectLevel.classList.add('hidden');
});
