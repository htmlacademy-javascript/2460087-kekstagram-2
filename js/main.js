import { generatedPhotos } from './content-generator.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initPicturesContainer } from './gallery.js';

renderThumbnails(generatedPhotos);
initPicturesContainer(generatedPhotos);
