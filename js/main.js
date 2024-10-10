// Временные данные
const descriptionsPhotos = [
  'Нет людей — нет проблем!',
  'На пляж — это туда.',
  'Лазурное море, волшебное море, прекрасное море, хочу тебя понять...',
  'Согласия на эту фотографию я не получал',
  'Счастливы, потому что не знают, какая участь их ждет.',
  'Эта машина такая черная, что даже солнцу стыдно светить на неё.',
  'Типичный завтрак в отеле 5 звезд.',
  'В этом напитке нет ничего, кроме надежд, разбитых в хлам!',
  'Я пыталась его поймать, но он оказался быстрее.',
  'Это мы у пляжников спёрли.',
  'Поиграла с эстетикой. Проиграла',
  'Продам гараж.',
  'Рыба с огурцами: еда для тех, кто ненавидит себя и все вокруг!',
  'Фото для истинных ценителей неуместного кулинарного юмора.',
  'Вот гири к ним привяжу, соседи порадуются.',
  'Здесь мы видим небесный лайнер на фоне… ничего!',
  'Вам, наверное, интересно зачем я вас здесь собрал?',
  'Что древнее: эта тачка или эта стена?',
  'Иду к холодильнику в три часа ночи.',
  'Вы когда-нибудь видели, как природа отыгралась на пальмах? Теперь видели.',
  'Эта еда настолько невзрачна, что даже фотосессия не спасла!',
  'Детям до 18 лет запрещено смотреть в левый угол фотографии.',
  'Этот краб знает: лучше быть смешным, чем съеденным!',
  'Забудь о музыке — послушай, как все вокруг шумят!',
  'В последний раз видел такое на "Нашествии 2002"'
];

const usernames = [
  'Шерлок Холмс',
  'Эркюль Пуаро',
  'Джеймс Бонд',
  'Лисбет Саландер',
  'Нэнси Дрю',
  'Квентин Тарантино',
  'Дик Трейси',
  'Инспектор Гаджет',
  'Кристофер Нолан',
  'Хантер С. Томпсон'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

// Константы
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;
const MAX_COMMENTS = 30;
const PHOTO_COUNT = 25;

// Получает целое число в заданном диапазоне
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Создает один комментарий
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX)}.svg`,
  message: messages[getRandomInteger(0, messages.length - 1)],
  name: usernames[getRandomInteger(0, usernames.length - 1)]
});

// Создает массив комментариев
const createComments = (count, startId) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment(startId + i));
  }
  return comments;
};

// Создает одну фотографию
const createPhoto = (id, nextCommentId) => ({
  id,
  url: `photos/${id}.jpg`,
  description: descriptionsPhotos[id - 1],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(getRandomInteger(0, MAX_COMMENTS), nextCommentId)
});

// Создает массив фотографий
const createPhotos = (count) => {
  const photos = [];
  let nextCommentId = 1;

  for (let i = 1; i <= count; i++) {
    const photo = createPhoto(i, nextCommentId);
    nextCommentId += photo.comments.length;
    photos.push(photo);
  }

  return photos;
};

// Генерирует массив объектов с данными фотографий
const generatedPhotos = createPhotos(PHOTO_COUNT);

//Проверка
console.log(generatedPhotos);
console.log(JSON.stringify(generatedPhotos, null, 2));
