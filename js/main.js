import { createPhotos } from './content-generator.js';

const PHOTO_COUNT = 25;

// Генерирует массив объектов с данными фотографий
const generatedPhotos = createPhotos(PHOTO_COUNT);

//Проверка
console.log(generatedPhotos);
console.log(JSON.stringify(generatedPhotos, null, 2));
