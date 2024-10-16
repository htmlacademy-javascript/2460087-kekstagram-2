// Получает целое число в заданном диапазоне
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


export { getRandomInteger };
