import { createPhotos } from './content-generator.js';
import { renderThumbnails } from './render-thumbnails.js';

const PHOTO_COUNT = 25;

// Генерирует массив объектов с данными фотографий
const generatedPhotos = createPhotos(PHOTO_COUNT);
renderThumbnails(generatedPhotos);
