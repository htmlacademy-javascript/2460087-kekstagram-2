//Проверяет длину строки

const checkLength = (line = '', maxLendth = 1) => (line.length <= maxLendth);

checkLength();


//Проверяет на палиндромы

const checkPalindrome = (string = '') => {
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  let reverseLine = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reverseLine += string[i];
  }

  return string === reverseLine;
};

checkPalindrome('');
