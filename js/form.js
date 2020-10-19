"use strict";

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const roomNumberInput = adForm.querySelector(
    `#room_number`
  );
  const capacityInput = adForm.querySelector(`#capacity`);
  const capacityOptions = capacityInput.querySelectorAll(`option`);

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

  // Заголовок объявления
  const adHeadingInput = adForm.querySelector(`#title`);
  adHeadingInput.addEventListener(`input`, () => {
    adHeadingInput.reportValidity();
  });

  // Валидация Типа Жилья
  const adTypeInput = adForm.querySelector(`#type`);
  const adPriceInput = adForm.querySelector(`#price`);

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
  const checkinInput = adForm.querySelector(`#timein`);
  const checkoutInput = adForm.querySelector(`#timeout`);

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

  const formResetButton = adForm.querySelector(`.ad-form__reset`);

  // Сброс формы
  const resetForm = () => {
    adForm.reset();
  };
  // Очистка формы
  formResetButton.addEventListener(`click`, resetForm);

  // Отправка формы
  const onSuccesSubmit = (data) => {
    window.message.successMessageHandler();
    window.pageState.disablePage();
    console.log(data);
  };
  const onErrorSubmit = (error) => {
    adForm.reportValidity();
    window.message.errorMessageHandler();
    console.log(error);
  };

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.ajax.upload(new FormData(adForm), onSuccesSubmit, onErrorSubmit);
  });

  window.form = {
    roomsChecker,
    adForm,
    resetForm,
  };
})();
