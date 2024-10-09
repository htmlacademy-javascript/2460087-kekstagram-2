let photos = [];
const photoCount = 25;

for (let i = 1; i <= photoCount; i++) {
  const currentPhoto = {
    id: i, // ID
    url: `photos/${i}.jpg`, // URL совпадает с ID
    description: `Описание фотографии ${i}`,
    likes: 0,
    comments: []
  };

  photos.push(currentPhoto);
}

console.log(photos);
