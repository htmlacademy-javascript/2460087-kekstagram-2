import { renderThumbnails } from './render-thumbnails.js';
import { debounce, getRandomInteger } from './util.js';
import { getData } from './server.js';
import { showErrorMessage } from './messages.js';

// Константы
const RANDOM_PHOTO_COUNT = 10;
const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

// Переменные
let photos = []; // Массив всех фотографий

// Функции фильтров
const filterDefault = () => photos;

const filterRandom = () => {
  const randomPhotos = [...photos];

  // Перемешиваем массив случайным образом
  for (let i = randomPhotos.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [randomPhotos[i], randomPhotos[j]] = [randomPhotos[j], randomPhotos[i]];
  }

  return randomPhotos.slice(0, RANDOM_PHOTO_COUNT);
};

const filterDiscussed = () => [...photos].sort((a, b) => b.comments.length - a.comments.length);

// Обновление массива фотографий
const updatePhotos = (newPhotos) => {
  photos = newPhotos;
};

// Установка активного фильтра
const setActiveFilter = (evt) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (activeButton && !activeButton.isEqualNode(evt.target)) {
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

// Обработчик изменения фильтра
const onFilterChange = (event) => {
  const filter = event.target.id;
  let filteredPhotos = [];

  // Применить выбранный фильтр
  switch (filter) {
    case FILTER_DEFAULT:
      filteredPhotos = filterDefault();
      break;
    case FILTER_RANDOM:
      filteredPhotos = filterRandom();
      break;
    case FILTER_DISCUSSED:
      filteredPhotos = filterDiscussed();
      break;
  }

  // Отрисовать фотографии
  renderThumbnails(filteredPhotos);
};

// Обработчик с задержкой для фильтрации
const debounceRender = debounce((evt) => {
  onFilterChange(evt); // Обработка фильтрации с задержкой
}, 300);

// Обработчик события на кнопку фильтра
const filterButtonClickHandler = (evt) => {
  setActiveFilter(evt);
  debounceRender(evt);
};

// Получаем элементы фильтров
const filterButtons = document.querySelectorAll('.img-filters__button');

// Добавляем обработчики событий для всех кнопок фильтров
filterButtons.forEach((button) => {
  button.addEventListener('click', filterButtonClickHandler); // Обработчик с немедленным обновлением стилей
});

// Блок фильтров
const filtersBlock = document.querySelector('.img-filters');

// Показать блок фильтров
const showFilters = () => {
  filtersBlock.classList.remove('img-filters--inactive');
};

// Загрузить данные и показать фотографии
getData(
  (photosData) => {
    updatePhotos(photosData); // Обновить список фотографий
    showFilters(); // Показать блок фильтров
    renderThumbnails(photos); // Отрисовать фотографии по умолчанию
  },
  () => showErrorMessage()
);

export { updatePhotos };
