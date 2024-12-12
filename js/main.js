import { createPhotos } from './content-generator.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initGallery, closedBigPicture } from './gallery.js';

const PHOTO_COUNT = 25;
const generatedPhotos = createPhotos(PHOTO_COUNT);
renderThumbnails(generatedPhotos);


document.addEventListener('DOMContentLoaded', () => {
  const picturesContainer = document.querySelector('.pictures');

  initGallery(picturesContainer, generatedPhotos);
});

closedBigPicture();
