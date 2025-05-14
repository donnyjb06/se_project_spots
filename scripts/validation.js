const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visibility_shown',
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleSubmitButton = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const hideInputError = (form, input, config) => {
  const inputName = input.getAttribute('name');
  const errorElement = form.querySelector(`.form__error_type_${inputName}`);

  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const showInputError = (form, input, errorMessage, config) => {
  const inputName = input.getAttribute('name');
  const errorElement = form.querySelector(`.form__error_type_${inputName}`);

  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
    return;
  }

  hideInputError(form, input, config);
};

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleSubmitButton(inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleSubmitButton(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector),
  );

  formElements.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(form, config);
  });
};

enableValidation(settings);
