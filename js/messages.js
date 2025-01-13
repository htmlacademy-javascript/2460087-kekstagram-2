// Показ сообщения об успешной загрузке
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(successTemplate);

  setTimeout(() => {
    const successMessage = document.querySelector('.success');
    successMessage?.remove();
  }, 5000);
};

// Показ сообщения об ошибке загрузки
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  document.body.appendChild(errorTemplate);

  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    errorMessage?.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage };
