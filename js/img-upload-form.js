import { IMAGE_EDITING_SELECTORS } from './selectorConfig.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey } from './util.js';

const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
const keydownHandler = (event) => handleEscapeKey(event, closeForm);
const closeButtonHandler = () => closeForm();

// Открытие формы после выбора файла
imageEditingSelectors.input.addEventListener('change', () => {
  if (imageEditingSelectors.input.files.length > 0) {
    initializeForm();
  }
});

// Блокировка клавиши esc
function stopEscPropagation(event) {
  if (event.key === 'Escape') {
    event.stopPropagation(); // Блокируем всплытие события
  }
}

// Инициализация формы
function initializeForm() {
  document.addEventListener('keydown', keydownHandler);
  toggleBodyScroll(true);
  imageEditingSelectors.element.scrollTop = 0;
  imageEditingSelectors.element.classList.remove('hidden');

  // Обработчики событий
  document.addEventListener('keydown', keydownHandler);
  imageEditingSelectors.cancel.addEventListener('click', closeButtonHandler);
  imageEditingSelectors.hashtags.addEventListener('keydown', stopEscPropagation);
  imageEditingSelectors.comments.addEventListener('keydown', stopEscPropagation);
}

// Закрытие формы
function closeForm() {
  toggleBodyScroll(false);
  imageEditingSelectors.element.classList.add('hidden');

  // Сброс значения поля выбора файла
  imageEditingSelectors.input.value = '';

  // Сброс значений других полей формы
  const form = imageEditingSelectors.element.querySelector('form');
  if (form) {
    form.reset();
  }

  // Удаление обработчиков
  document.removeEventListener('keydown', keydownHandler);
  imageEditingSelectors.cancel.removeEventListener('click', closeButtonHandler);
  imageEditingSelectors.hashtags.removeEventListener('keydown', stopEscPropagation);
  imageEditingSelectors.comments.removeEventListener('keydown', stopEscPropagation);
}

// ВАЛИДАЦИЯ


function validateForm() {
  const imgUploadForm = document.querySelector('#upload-select-image');
  const pristine = new Pristine(imgUploadForm);

  imgUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = pristine.validate();
    console.log(`Результат валидации: ${valid}`);

    if (valid) {
      console.log('Форма прошла валидацию. Отправляем...');
      imgUploadForm.submit();
    } else {
      console.log('Форма не прошла валидацию. Проверьте поля.');
    }
  });
}


validateForm();

// // Отправка данных на сервер
// function submitFormData(params) {
// }


// 6. ПОДКЛЮЧИТЬ ПРИСТИН
// Настроить валидацию для полей
// Хэштеги: разделить строку на массив используя метод .split(), проверить каждый элемент на соответствие требованиям
// Комментарии: проверить что комментарий не пустой и соответствует правилам

// 7. ЛОГИКА ПРЕДОТВРАЩЕНИЯ ОТПРАВКИ ФОРМЫ
// Валидация должна запускаться при попытке отправить форму. Если данные некорректны, отправка формы должна быть отменена.
//  метод Pristine для каждого поля формы, чтобы корректно отловить ошибки.

