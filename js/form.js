"use strict";

(() => {
  const adForm = document.querySelector(`.ad-form`); /* Повторяется */
  const roomNumberInput = adForm.querySelector(`#room_number`); /* Повторяется */
  const capacityInput = adForm.querySelector(`#capacity`);
  const capacityOptions = capacityInput.querySelectorAll(`option`);

  const ROOM_OPTIONS = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  const HOUSING_OPTIONS = {
    "bungalow": 0,
    "flat": 1000,
    "house": 5000,
    "palace": 10000,
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
  const adHeadingInput = adForm.querySelector("#title");
  adHeadingInput.addEventListener("input", (evt) => {
    adHeadingInput.reportValidity();
  });

  // Валидация Типа Жилья
  const adTypeInput = adForm.querySelector("#type");
  const adPriceInput = adForm.querySelector("#price");

  const typeChecker = (housingType) => {
    adPriceInput.setAttribute("min", HOUSING_OPTIONS[housingType]);
    adPriceInput.setAttribute("placeholder", HOUSING_OPTIONS[housingType]);
  };

  adTypeInput.addEventListener(`change`, (evt) => {
    typeChecker(evt.target.value);
  });

  adPriceInput.addEventListener(`input`, (evt) => {
    adPriceInput.reportValidity();
  });

  // Валидация времени заезда/выезда
  const checkinInput = adForm.querySelector("#timein");
  const checkinOptions = adForm.querySelectorAll("option");
  const checkoutInput = adForm.querySelector("#timeout");
  const checkoutOptions = adForm.querySelectorAll("option");

  const timeChecker = (evt) => {
    checkinInput.value = evt.target.value;
    checkoutInput.value = evt.target.value;
  };

  checkinInput.addEventListener("change", (evt) => {
    timeChecker(evt);
  });
  checkoutInput.addEventListener("change", (evt) => {
    timeChecker(evt);
  });


  window.form = {
    roomsChecker,
    adForm
  };
})();
