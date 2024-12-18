// Элементы для работы с модальным окном
const bigPictureElement = document.querySelector('.big-picture'); // Основной элемент модального окна
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img'); // Изображение в модальном окне
const bigPictureLikes = bigPictureElement.querySelector('.big-picture__social .social__likes span'); // Количество лайков
const bigPictureCommentsCount = bigPictureElement.querySelector('.big-picture__social .social__comment-count'); // Количество комментариев
const bigPictureCommentsList = bigPictureElement.querySelector('.big-picture__social .social__comments'); // Список комментариев
const commentsLoader = bigPictureElement.querySelector('.big-picture__social .comments-loader'); // Кнопка для подгрузки комментариев
const bigPictureCaption = bigPictureElement.querySelector('.big-picture__social .social__caption'); // Подпись под изображением

let scrollPosition = 0; // Переменная для хранения текущей позиции прокрутки

// Функция для блокировки прокрутки страницы при открытии модального окна
function lockBodyScroll() {
  scrollPosition = window.scrollY; // сохранить текущую позицию прокрутки
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // вычисление ширины полосы прокрутки

  // Блок прокрутки страницы
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.width = '100%';
  document.body.style.paddingRight = `${scrollBarWidth}px`; // Учесть ширину полосы прокрутки
  document.body.classList.add('modal-open'); // Добавить класс для открытия модального окна
}

// Функция для разблокировки прокрутки страницы при закрытии модального окна
function unlockBodyScroll() {
  document.body.style.position = ''; // Сбросить стили для разблокировки
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';
  window.scrollTo(0, scrollPosition); // Возвращает на место позицию прокрутки
  document.body.classList.remove('modal-open'); // Убирает класс закрытия модального окна
}

// Функция для очистки модального окна перед заполнением новыми данными
function clearModal() {
  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  bigPictureLikes.textContent = '';
  bigPictureCommentsCount.innerHTML = '';
  bigPictureCaption.textContent = '';
  bigPictureCommentsList.innerHTML = '';
}

// Функция для заполнения модального окна данными о фотографии
function populateBigPicture(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;

  const commentsCount = photo.comments.length;
  bigPictureCommentsCount.innerHTML = `${commentsCount} из ${commentsCount} комментариев`; // Обновление информацию о комментариях

  bigPictureCaption.textContent = photo.description;

  // Создание комментариев для фотографии
  photo.comments.forEach(createComment);
}

// Функция для создания комментария в модальном окне
// Вопрос: нельзя ли изменить разметку, чтобы добавить шаблон, а не создавать новый элемент для каждого комментария?
function createComment(comment) {
  const commentElement = document.createElement('li'); // Создает элемент списка
  commentElement.classList.add('social__comment'); // Добавляет класс для стилизации комментария

  const commentAvatar = document.createElement('img'); // Создает элемент для аватара
  commentAvatar.classList.add('social__picture'); // Добавляет класс для аватара
  commentAvatar.src = comment.avatar; // Устанавливает ссылку на аватар
  commentAvatar.alt = comment.name; // Устанавливает имя для alt

  const commentText = document.createElement('p'); // Создает элемент для текста комментария
  commentText.classList.add('social__text'); // Добавляет класс для текста
  commentText.textContent = comment.message; // Устанавливает текст комментария

  // Добавляет аватар и текст в элемент комментария
  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);
  bigPictureCommentsList.appendChild(commentElement); // Добавляет комментарий в список
}

// Функция для открытия модального окна с фотографией
function openBigPicture(photo) {
  lockBodyScroll(); // Блок прокрутку страницы
  bigPictureElement.classList.remove('hidden'); // Убирает скрытие модального окна
  bigPictureElement.scrollTop = 0; // Старт окна от начала страницы
  bigPictureCommentsCount.classList.add('hidden'); // Скрыть счетчик комментариев
  commentsLoader.classList.add('hidden'); // Скрыть кнопку подгрузки комментариев
  clearModal(); // Очистка модальное окно перед заполнением
  populateBigPicture(photo); // Заполнение модальное окно данными фотографии

  // обработчики событий для закрытия окна
  document.addEventListener('keydown', handleEscapeKey);
  bigPictureElement.addEventListener('click', handleOutsideClick);
}

// Функция для закрытия модального окна
function closeBigPicture() {
  unlockBodyScroll(); // Разблокировать прокрутку страницы
  bigPictureElement.classList.add('hidden'); // Скрыть модальное окно

  // убрать обработчики событий
  document.removeEventListener('keydown', handleEscapeKey);
  bigPictureElement.removeEventListener('click', handleOutsideClick);
}

// Функция для обработки нажатия клавиши Escape
function handleEscapeKey(event) {
  if (event.key === 'Escape') { // Если нажата клавиша Escape
    closeBigPicture(); // Закрыть модальное окно
  }
}

// Функция для обработки клика вне модального окна
function handleOutsideClick(event) {
  if (!event.target.closest('.big-picture__img') &&
    !event.target.closest('.big-picture__social')) { // Если клик был вне изображения
    closeBigPicture(); // Закрыть модальное окно
  }
}

// Функция для инициализации галереи и обработки кликов на фотографии
function initGallery(container, photos) {
  container.addEventListener('click', (event) => {
    if (event.target.closest('.picture')) { // Если клик был на миниатюре фотографии
      const pictureElement = event.target.closest('.picture');
      const pictureImg = pictureElement.querySelector('.picture__img');
      const pictureSrc = pictureImg.src.split('/').pop(); // Извлекаем имя файла фотографии
      const picture = photos.find((photo) => photo.url === `photos/${pictureSrc}`); // найти фотографию по URL
      openBigPicture(picture); // Открыть модальное окно с выбранной фотографией
    }
  });
}

// Функция для инициализации контейнера с фотографиями
function initPicturesContainer(photos) {
  const container = document.querySelector('.pictures'); // Найти контейнер с фотографиями
  initGallery(container, photos); // Запустить галерею
}

export { initPicturesContainer };
