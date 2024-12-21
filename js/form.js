import { IMAGE_EDITING_SELECTORS } from './selectorConfig.js';
import { initializeSelectors, toggleBodyScroll, handleEscapeKey, handleOutsideClick } from './util.js';

const imageEditingSelectors = initializeSelectors(IMAGE_EDITING_SELECTORS);
const keydownHandler = (event) => handleEscapeKey(event, closeForm);
const outsideClickHandler = (event) => handleOutsideClick(event, closeForm);
const closeButtonHandler = () => closeForm();

// РАБОЧИЕ ОБЛАСТИ
// форма с id="upload-select-image" , которая включает поле для выбора файла (input с id="upload-file") и кнопку для отправки изображения
// img-upload__overlay — контейнер, который появляется, когда изображение загружено. Включает элементы для изменения размера, применения фильтров и ввода хэштегов/комментария
// Для хэштегов используется поле input с классом text__hashtags, и для комментария — textarea с классом text__description
// Кнопка с id="upload-submit" отвечает за отправку данных формы.
// Кнопка с id="upload-cancel" — для закрытия формы редактирования и сброса значений полей
// шаблоны для сообщений об ошибке и успешной загрузке: error, success, data-error
//

// Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла.img - upload__input, который стилизован под букву «О» в логотипе.После выбора изображения(изменения значения поля.img - upload__input), показывается форма редактирования изображения.У элемента.img - upload__overlay удаляется класс hidden, а body задаётся класс modal - open.

// После выбора изображения пользователем с помощью стандартного контрола загрузки файла.img - upload__input, нужно подставить его в форму редактирования вместо тестового изображения в блок предварительного просмотра и в превью эффектов.

// 1.3 Закрытие формы редактирования изображения производится либо нажатием на кнопку.img - upload__cancel, либо нажатием клавиши Esc.Элементу.img - upload__overlay возвращается класс hidden.У элемента body удаляется класс modal - open.

// Открытие формы после выбора файла
imageEditingSelectors.input.addEventListener('change', () => {
  if (imageEditingSelectors.input.files.length > 0) {
    initializeForm();
  }
});

// Инициализация формы
function initializeForm() {
  toggleBodyScroll(true);
  imageEditingSelectors.element.scrollTop = 0;
  imageEditingSelectors.element.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Обработчики событий
  document.addEventListener('keydown', keydownHandler);
  imageEditingSelectors.element.addEventListener('click', outsideClickHandler);
  imageEditingSelectors.cancel.addEventListener('click', closeButtonHandler);
}

// Закрытие формы
function closeForm() {
  toggleBodyScroll(false);
  imageEditingSelectors.element.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаление обработчиков
  document.removeEventListener('keydown', keydownHandler);
  imageEditingSelectors.element.removeEventListener('click', outsideClickHandler);
  imageEditingSelectors.cancel.removeEventListener('click', closeButtonHandler);
}

// // Валидация данных
// function validateFormData(params) {
// }

// // Отправка данных на сервер
// function submitFormData(params) {
// }

// 2. ПРОПИСАТЬ АТРИБУТЫ

// method —  метод отправки данных на сервер(GET, POST).
// enctype — тип кодировки данных
// action — URL на сервере

// 3. ОБРАБОТЧИКИ СОБЫТИЙ
// submit — для выполнения валидации перед отправкой данных.
// change для сброса значений при закрытии формы.
// Обработчики для закрытия формы.

// 4. ИЗОБРАЖЕНИЕ
//  элемент <input type="file"> для выбора файла
// Отображать форму редактирования изображения, используя уже написанный код для открытия окна с полноразмерной фотографией
// ???

// 5. ЗАКРЫТИЕ ФОРМЫ
// сбросить значение поля выбора файла (.img-upload__input).
// сбросить все другие поля формы (тексты, комментарии, хэштеги и т. д.).
// использовать событие change для корректного закрытия

// 6. ПОДКЛЮЧИТЬ ПРИСТИН
// Настроить валидацию для полей
// Хэштеги: разделить строку на массив используя метод .split(), проверить каждый элемент на соответствие требованиям
// Комментарии: проверить что комментарий не пустой и соответствует правилам

// 7. ЛОГИКА ПРЕДОТВРАЩЕНИЯ ОТПРАВКИ ФОРМЫ
// Валидация должна запускаться при попытке отправить форму. Если данные некорректны, отправка формы должна быть отменена.
//  метод Pristine для каждого поля формы, чтобы корректно отловить ошибки.

//8. метод stopPropagation для события клавиш в поле формы при фокусе предотвратит закрытие от случайного нажатия клавиши esc

// 9. ТЕСТИРОВАНИЕ
// Проверить корректность работы отправки данных
