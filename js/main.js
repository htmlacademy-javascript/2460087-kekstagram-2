import { generatedPhotos } from './content-generator.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initGallery } from './gallery.js';

renderThumbnails(generatedPhotos);
initGallery();
