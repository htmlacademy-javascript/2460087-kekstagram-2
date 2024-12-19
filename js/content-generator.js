import { descriptionsPhotos, usernames, messages } from './data.js';
import { getRandomInteger } from './util.js';

// Константы
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;
const MAX_COMMENTS = 30;
const PHOTO_COUNT = 25;

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

const generatedPhotos = createPhotos(PHOTO_COUNT);

export { createPhotos, generatedPhotos };
