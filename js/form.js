"use strict";

const ROOM_OPTIONS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const HOUSING_OPTIONS = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.querySelectorAll(`fieldset`);
const roomNumberInput = adForm.querySelector(`#room_number`);
const capacityInput = adForm.querySelector(`#capacity`);
const capacityOptions = capacityInput.querySelectorAll(`option`);
const adTypeInput = adForm.querySelector(`#type`);
const adPriceInput = adForm.querySelector(`#price`);
const checkinInput = adForm.querySelector(`#timein`);
const checkoutInput = adForm.querySelector(`#timeout`);

// Валидация кол-ва гостей/комнат
const roomsChecker = (peopleAmount) => {
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });

  ROOM_OPTIONS[peopleAmount].forEach((maximumPeople) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === maximumPeople) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};
roomNumberInput.addEventListener(`change`, (evt) => {
  roomsChecker(evt.target.value);
});

// Валидация заголовка объявления
const adHeadingInput = adForm.querySelector(`#title`);
adHeadingInput.addEventListener(`input`, () => {
  adHeadingInput.reportValidity();
});

// Валидация Типа Жилья
const typeChecker = (housingType) => {
  adPriceInput.setAttribute(`min`, HOUSING_OPTIONS[housingType]);
  adPriceInput.setAttribute(`placeholder`, HOUSING_OPTIONS[housingType]);
};

adTypeInput.addEventListener(`change`, (evt) => {
  typeChecker(evt.target.value);
});

adPriceInput.addEventListener(`input`, () => {
  adPriceInput.reportValidity();
});

// Валидация времени заезда/выезда
const timeChecker = (evt) => {
  checkinInput.value = evt.target.value;
  checkoutInput.value = evt.target.value;
};

checkinInput.addEventListener(`change`, (evt) => {
  timeChecker(evt);
});
checkoutInput.addEventListener(`change`, (evt) => {
  timeChecker(evt);
});
// Сброс формы
const resetForm = () => {
  adForm.reset();
  window.preview.imageDeleter();
};
// Отправка формы
const onSuccesSubmit = () => {
  window.message.successHandler();
  window.page.disable();
};
const onErrorSubmit = () => {
  adForm.reportValidity();
  window.message.errorHandler();
};

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.ajax.upload(new FormData(adForm), onSuccesSubmit, onErrorSubmit);
});
// Активация формы
const enableForm = () => {
  adForm.disabled = true;
  window.page.toggleFields(adFormFields, false);
  adForm.classList.remove(`ad-form--disabled`);
};
// Блокировка формы
const disableForm = () => {
  adForm.classList.add(`ad-form--disabled`);
  window.page.toggleFields(adFormFields, true);
};

window.form = {
  roomsChecker,
  reset: resetForm,
  enable: enableForm,
  disable: disableForm
};
