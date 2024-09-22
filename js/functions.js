//Проверяет длину строки

const checkLength = (line = '', maxLendth = 1) => (line.length <= maxLendth);

checkLength('');


//Проверяет на палиндромы

const checkPalindrome = (string) => {

  if (string) {
    return false;
  }

  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  let reverseLine = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseLine += string[i];
  }

  return string === reverseLine;
};

checkPalindrome('');

// Вывод целых положительных чисел

const extractsNumbers = (incomingData) => {
  const string = incomingData.toString(); //преобразование данных в строку
  let result = ''; // Переменная для результата

  for (let i = 0; i < string.length; i++) {
    const symbol = string[i]; //Получение текущего символа
    if (!Number.isNaN(parseInt(symbol, 10))) {
      result += symbol; // Если полученный символ — цифра, добавление его к результату
    }
  }
  return parseInt(result, 10);
};


extractsNumbers('2023 год');
extractsNumbers('ECMAScript 2022');
extractsNumbers('1 кефир, 0.5 батона');
extractsNumbers('агент 007');
extractsNumbers('а я томат');
