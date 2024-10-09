// Генерация 25 объектов с фотографиями
let photos = []

for (let i = 0; i <= 25; i++) {
  let currentPhoto = {
    id: null,
    url: '',
    description: '',
    likes: null,
    comments: []
  };

  photos.push(currentPhoto);
}

console.log(photos)
