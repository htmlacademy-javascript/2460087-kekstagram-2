// Селекторы для элементов страницы
const selectors = {
  bigPictureElement: document.querySelector('.big-picture'),
  bigPictureImg: document.querySelector('.big-picture__img img'),
  bigPictureLikes: document.querySelector('.big-picture__social .social__likes span'),
  bigPictureCommentsCount: document.querySelector('.big-picture__social .social__comment-count'),
  bigPictureCommentsList: document.querySelector('.big-picture__social .social__comments'),
  commentsLoader: document.querySelector('.big-picture__social .comments-loader'),
  bigPictureCaption: document.querySelector('.big-picture__social .social__caption'),
};

// Переменные для хранения состояния прокрутки страницы и комментариев
let scrollPosition = 0; // Текущая позиция прокрутки страницы
let displayedCommentsCount = 0; // Счётчик отображенных комментариев
let currentPhoto = null; // Текущая фотография, отображаемая в модальном окне

// Функция для блокировки и разблокировки прокрутки страницы
function toggleBodyScroll(isLocked) {
  // Блокировка прокрутки страницы
  if (isLocked) {
    scrollPosition = window.scrollY; // Запомнить текущую позицию прокрутки
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // Ширина скролл-бара

    // Изменяем стиль body, чтобы заблокировать прокрутку
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`; // Чтобы странца не двигалась
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollBarWidth}px`; // Вычислить ширину с учётом скролл-бара
    document.body.classList.add('modal-open'); // Добавить класс для стилизации модального окна
  } else {
    // Разблокировка прокрутки
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, scrollPosition); // Восстановить позицию прокрутки
    document.body.classList.remove('modal-open'); // Убрать класс
  }
}

// Функция для очистки модального окна перед загрузкой нового изображения
function clearModal() {
  // Массив элементов, которые нужно очистить
  const elementsToClear = [
    selectors.bigPictureImg,
    selectors.bigPictureLikes,
    selectors.bigPictureCommentsCount,
    selectors.bigPictureCaption,
    selectors.bigPictureCommentsList
  ];

  // Очисить текстовое содержимое элементов
  elementsToClear.forEach((element) => {
    element.textContent = ''; // Убрать текст из каждого элемента
  });

  // Очистить списка комментариев
  selectors.bigPictureCommentsList.innerHTML = '';

  // Сбросить счетчик комментариев
  displayedCommentsCount = 0;

  // Убрать кнопку загрузки комментариев
  selectors.commentsLoader.classList.add('hidden');
}

// Функция для отображения кнопки "Загрузить комментарии"
function toggleCommentsLoader(photo) {
  const commentsCount = photo.comments.length; // Количество комментариев у фотографии
  if (commentsCount > displayedCommentsCount) {
    // Если есть комментарии, которые можно загрузить, показать кнопку
    selectors.commentsLoader.classList.remove('hidden');
  } else {
    // Если все комментарии загружены, убрать кнопку
    selectors.commentsLoader.classList.add('hidden');
  }
}

// Функция для заполнения окна полноразмерного изображения данными
function populateBigPicture(photo) {
  // Заполнение данными изображения, лайков, описания
  selectors.bigPictureImg.src = photo.url;
  selectors.bigPictureImg.alt = photo.description;
  selectors.bigPictureLikes.textContent = photo.likes;

  const commentsCount = photo.comments.length; // Общее количество комментариев
  displayedCommentsCount = Math.min(commentsCount, 5); // Показать максимум 5 комментариев

  // Обновить счетчик комментариев
  selectors.bigPictureCommentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;

  // Показать описание фотографии
  selectors.bigPictureCaption.textContent = photo.description;

  // Показать первые 5 комментариев
  photo.comments.slice(0, displayedCommentsCount).forEach(createComment);

  // Проверка, нужно ли показывать кнопку для загрузки дополнительных комментариев
  toggleCommentsLoader(photo);
}

// Функция для загрузки следующих 5 комментариев
function loadMoreComments() {
  if (!currentPhoto) {
    return; // Если нет текущей фотографии, выход
  }

  const commentsCount = currentPhoto.comments.length; // Общее количество комментариев
  const nextComments = currentPhoto.comments.slice(displayedCommentsCount, displayedCommentsCount + 5); // Взять следующие 5 комментариев
  nextComments.forEach(createComment); // Добавляем комментарии в DOM

  // Обновить счетчик показанных комментариев
  displayedCommentsCount += nextComments.length;
  selectors.bigPictureCommentsCount.textContent = `${displayedCommentsCount} из ${commentsCount} комментариев`;

  // Обновить кнопку для загрузки комментариев
  toggleCommentsLoader(currentPhoto);
}

// Функция для создания одного комментария и добавления его в DOM
function createComment(comment) {
  // Создать элемент списка для комментария
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  // Создать элемент для аватарки комментария
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;

  // Создать элемент для текста комментария
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  // Добавить аватар и текст в элемент комментария
  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);

  // Добавить комментарий в список
  selectors.bigPictureCommentsList.appendChild(commentElement);
}

// Функция для открытия полноразмерного изображения
function openBigPicture(photo) {
  currentPhoto = photo; // Запомнить текущую фотографию
  toggleBodyScroll(true); // Заблокировать прокрутку страницы
  selectors.bigPictureElement.classList.remove('hidden'); // Показать модальное окно с изображением
  selectors.bigPictureElement.scrollTop = 0; // Установить скролл в верхнюю часть окна
  selectors.bigPictureCommentsCount.classList.remove('hidden'); // Показать счетчик комментариев
  selectors.commentsLoader.classList.remove('hidden'); // Показать кнопку для загрузки комментариев
  clearModal(); // Очистить модальное окно
  populateBigPicture(photo); // Заполнить окно изображением и комментариями

  // Добавить обработчики для закрытия окна
  document.addEventListener('keydown', handleEscapeKey);
  selectors.bigPictureElement.addEventListener('click', handleOutsideClick);
}

// Функция для закрытия полноразмерного изображения
function closeBigPicture() {
  toggleBodyScroll(false); // Разблокировать прокрутку
  selectors.bigPictureElement.classList.add('hidden'); // Скрываем окно

  // Убрать обработчики для закрытия окна
  document.removeEventListener('keydown', handleEscapeKey);
  selectors.bigPictureElement.removeEventListener('click', handleOutsideClick);
}

// Обработчик клавиши Escape для закрытия окна
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeBigPicture(); // Если нажата клавиша Escape, закрыть окно
  }
}

// Обработчик клика по области вне изображения и комментариев для закрытия окна
function handleOutsideClick(event) {
  if (!event.target.closest('.big-picture__img') && !event.target.closest('.big-picture__social')) {
    closeBigPicture(); // Если клик за пределы, закрыть окно
  }
}

// Инициализация галереи, обработка кликов по миниатюрам
function initGallery(container, photos) {
  container.addEventListener('click', (event) => {
    const pictureElement = event.target.closest('.picture'); // Найти миниатюру
    if (pictureElement) {
      const pictureSrc = pictureElement.querySelector('.picture__img').src.split('/').pop(); // Получить имя изображения
      const picture = photos.find((photo) => photo.url === `photos/${pictureSrc}`); // Найти фотографию по URL
      openBigPicture(picture);
    }
  });
}

// Инициализация контейнера фотографий
function initPicturesContainer(photos) {
  const container = document.querySelector('.pictures'); // Поиск контейнера для фотографий
  initGallery(container, photos);
}

// Обработчик для кнопки "Загрузить ещё"
selectors.commentsLoader.addEventListener('click', loadMoreComments);

export { initPicturesContainer };
