import { renderThumbnails } from './render-thumbnails.js';
import { debounce, getRandomInteger } from './util.js';
import { getData } from './server.js';
import { showErrorMessage } from './messages.js';

let photos = []; // Массив всех фотографий

// Функция для обновления массива фотографий
const updatePhotos = (newPhotos) => {
  photos = newPhotos;
};

// Фильтр по умолчанию
const filterDefault = () => photos;

// Фильтр случайных
const filterRandom = () => {
  const randomPhotos = [...photos];
  const randomCount = 10;

  // Перемешиваем массив случайным образом
  for (let i = randomPhotos.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [randomPhotos[i], randomPhotos[j]] = [randomPhotos[j], randomPhotos[i]];
  }

  return randomPhotos.slice(0, randomCount);
};

// Фильтр по обсуждаемости
const filterDiscussed = () => [...photos].sort((a, b) => b.comments.length - a.comments.length);

// элементы фильтров
const filterButtons = document.querySelectorAll('.img-filters__button');

// Устанавливаем активный фильтр
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
    case 'filter-default':
      filteredPhotos = filterDefault();
      break;
    case 'filter-random':
      filteredPhotos = filterRandom();
      break;
    case 'filter-discussed':
      filteredPhotos = filterDiscussed();
      break;
  }

  // Отрисовать фотографии
  renderThumbnails(filteredPhotos);
};

// обработчики событий для всех кнопок фильтров
const debounceRender = debounce((evt) => {
  setActiveFilter(evt);
  onFilterChange(evt);
}, 300);

filterButtons.forEach((button) => {
  button.addEventListener('click', (evt) => debounceRender(evt)); // обработчик с задержкой
});

// блок фильтров после загрузки данных
const filtersBlock = document.querySelector('.img-filters');

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
